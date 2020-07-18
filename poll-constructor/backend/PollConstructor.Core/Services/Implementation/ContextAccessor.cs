using PollConstructor.Core.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PollConstructor.Core.Services.Implementation
{
    public class ContextAccessor : IContextAccessor
    {
        public ContextAccessor(IHttpContextAccessor httpAccessor, IHostingEnvironment environment)
        {
            _httpAccessor = httpAccessor;
            _environment = environment;
        }

        public string RootPath => _environment.WebRootPath;

        public int GetUserId()
        {
            var userId = Convert.ToInt32(_httpAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.NameId));
            return userId;
        }

        public bool IsUserInRole(string role)
        {
            bool result = _httpAccessor.HttpContext.User.IsInRole(role);
            return result;
        }

        private readonly IHttpContextAccessor _httpAccessor;
        private readonly IHostingEnvironment _environment;
    }
}
