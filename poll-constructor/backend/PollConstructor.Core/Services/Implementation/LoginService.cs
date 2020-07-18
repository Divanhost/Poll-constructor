using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PollConstructor.Core.Services.Interfaces;
using PollConstructor.Data.Repositories.Interfaces;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Exceptions;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Core.Services.Implementation
{
    public class LoginService : ILoginService
    {
        private readonly UserManager<User> _userManager;
        public LoginService(IUnitOfWork unitOfWork,
            IConfigurationService configuration,
            UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> LoginAsync(LoginDto user)
        {
            var appUser = await _unitOfWork.UserRepository.Filter(x => x.UserName == user.UserName && !x.IsDeleted)
                                                        .SingleOrDefaultAsync();

            if (appUser != null)
            {
                var result = await _userManager.CheckPasswordAsync(appUser, user.Password);

                if (result)
                {
                    return GenerateJwtToken(user.UserName, appUser);
                }
            }

            throw new WebsiteException("Login Failed! Incorrect login or password!");
        }
        public async Task<TokenCouple> RenewAsync(TokenCouple tokenCouple)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtObject = handler.ReadJwtToken(tokenCouple.Jwt);
            var userId = jwtObject.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.NameId).Value;
            var tokenCoupleFromDb = await _unitOfWork.TokenCoupleRepository
                .Filter(x => x.Refresh == tokenCouple.Refresh && x.Jwt == tokenCouple.Jwt)
                .FirstOrDefaultAsync();
            if (tokenCoupleFromDb != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (!user.IsDeleted)
                {
                    return await GetTokenCouple(user.UserName, user);
                }
                else
                {
                    throw new WebsiteException("Renew Failed! User has been deleted!");
                }
            }
            else
            {
                throw new WebsiteException("Renew Failed! Refresh token doesn't exist!");
            }
        }

        private async Task<TokenCouple> GetTokenCouple(string login, User appUser)
        {
            var result = new TokenCouple()
            {
                Jwt = GenerateJwtToken(login, appUser),
                Refresh = GenerateRefreshToken()
            };

            var tokenCouple = _unitOfWork.TokenCoupleRepository.Create(result);
            await _unitOfWork.Save();

            return tokenCouple;
        }

        private string GenerateRefreshToken()
        {
            var random = new Random();
            byte[] bytes = new Byte[32];
            random.NextBytes(bytes);
            var token = Convert.ToBase64String(bytes);
            return token;
        }
        private string GenerateJwtToken(string login, User appUser)
        {

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, login),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, appUser.Id.ToString())
            };

            var jwtKey = Encoding.UTF8.GetBytes(_configuration.JwtKey);

            var key = new SymmetricSecurityKey(jwtKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var configExpireSeconds = _configuration.JwtExpireSeconds;
            var expires = DateTime.Now.AddSeconds(configExpireSeconds);

            var token = new JwtSecurityToken(
                _configuration.JwtIssuer,
                _configuration.JwtAudience,
                claims,
                expires: expires,
                signingCredentials: creds,
                notBefore: DateTime.Now.Subtract(TimeSpan.FromMinutes(5))
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfigurationService _configuration;
    }
}