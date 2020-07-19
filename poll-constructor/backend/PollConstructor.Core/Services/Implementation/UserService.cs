using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PollConstructor.Core.Services.Interfaces;
using PollConstructor.Data.Repositories.Interfaces;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Exceptions;
using PollConstructor.Shared.Models.Identity;
using PollConstructor.Shared.ViewModels;

namespace PollConstructor.Core.Services.Implementation
{
    public class UserService : ServiceBase, IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IContextAccessor _contextAccessor;
        private readonly RoleManager<Role> _roleManager;

        public UserService(IUnitOfWork unitOfWork,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IMapper mapper,
            IContextAccessor contextAccessor) : base(unitOfWork, mapper)
        {
            _userManager = userManager;
            _contextAccessor = contextAccessor;
            _roleManager = roleManager;
        }

        public const string ExistingUserMessage = "User already exists";

        public async Task<UserDto> GetUserById(int userId)
        {
            var user = await _unitOfWork.UserRepository.Filter(x => x.Id == userId)
                .SingleOrDefaultAsync();
            var userRoles = await _userManager.GetRolesAsync(user);
            var result = _mapper.Map<UserDto>(user);
            if (result == null)
            {
                throw new NotFoundWebsiteException("Пользователь не найден");
            }

            return result;
        }
        

        public async Task<User> CreateUser(UserDto userModel)
        {
            var userToCreate = new User()
            {
                UserName = userModel.UserName,
                FullName = userModel.FullName,
                Email = userModel.Email,
                Roles = new List<UserRole>()
            };

            var dbUser = await _userManager.FindByNameAsync(userToCreate.UserName);
            if (dbUser != null)
            {
                throw new WebsiteException(ExistingUserMessage);
            }
            else
            {
                var creationResult = await _userManager.CreateAsync(userToCreate, userModel.Password);
                if (!creationResult.Succeeded)
                    throw new WebsiteException("Cannot create a default user.");
                await _unitOfWork.Save();
            }
            return userToCreate;
        }

        public async Task<string> CheckUserNameExists(string username)
        {
            var result = await _unitOfWork.UserRepository.Filter(x => x.UserName == username)
                .ProjectTo<UserView>(_mapper.ConfigurationProvider)
                .Select(x => x.UserName)
                .SingleOrDefaultAsync();
            return result;
        }
    }
}
