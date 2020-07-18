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
            result.Roles = userRoles.ToArray();
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
                Email = userModel.Email,
                UserName = userModel.UserName
            };

            var dbUser = await _userManager.FindByNameAsync(userToCreate.UserName);
            var userFromDb = await _userManager.FindByEmailAsync(userToCreate.Email);
            if (userFromDb != null || dbUser != null)
            {
                throw new WebsiteException(ExistingUserMessage);
            }
            else
            {
                var creationResult = await _userManager.CreateAsync(userToCreate, userModel.NewPassword);
                if (!creationResult.Succeeded)
                    throw new WebsiteException("Cannot create a default user.");
                userFromDb = userToCreate;

                foreach (var role in userModel.Roles)
                {
                    var isInRole = await _userManager.IsInRoleAsync(userFromDb, role);
                    if (!isInRole)
                    {
                        var addingToRoleResult = await _userManager.AddToRoleAsync(userFromDb, role);
                        if (!addingToRoleResult.Succeeded)
                            throw new WebsiteException("Can not set the role.");
                    }
                }
                await _unitOfWork.Save();
            }
            return userFromDb;
        }

        public async Task<string> CheckUserNameExists(string username)
        {
            var result = await _unitOfWork.UserRepository.Filter(x => x.UserName == username)
                .ProjectTo<UserView>(_mapper.ConfigurationProvider)
                .Select(x => x.UserName)
                .SingleOrDefaultAsync();
            return result;
        }

        public async Task<string> CheckEmailExists(string email)
        {
            var result = await _unitOfWork.UserRepository.Filter(x => x.Email == email)
                .ProjectTo<UserView>(_mapper.ConfigurationProvider)
                .Select(x => x.Email)
                .SingleOrDefaultAsync();
            return result;
        }

        public async Task<bool> CheckPasswordAsync(string userName, string password)
        {
            var dbuser = await _unitOfWork.UserRepository.Filter(x => x.UserName == userName).SingleOrDefaultAsync();
            var result = await _userManager.CheckPasswordAsync(dbuser, password);
            return result;
        }

        public async Task<User> UpdateUserByID(int userId, UserDto user)
        {
            if (user != null)
            {
                var userFromDb = await _userManager.FindByIdAsync(userId.ToString());
                if (userFromDb != null)
                {
                    userFromDb.UserName = user.UserName;
                    userFromDb.Email = user.Email;

                    await _userManager.UpdateAsync(userFromDb);

                    var currentUserId = _contextAccessor.GetUserId();
                    bool isEditCurrentUser = currentUserId == userId;
                    if (!String.IsNullOrEmpty(user.NewPassword) && !isEditCurrentUser)
                    {
                        await _userManager.RemovePasswordAsync(userFromDb);
                        await _userManager.AddPasswordAsync(userFromDb, user.NewPassword);
                    }
                    else if (!String.IsNullOrEmpty(user.OldPassword) && !String.IsNullOrEmpty(user.NewPassword))
                    {
                        await _userManager.ChangePasswordAsync(userFromDb, user.OldPassword, user.NewPassword);
                    }

                    var userRoles = await _userManager.GetRolesAsync(userFromDb);
                    await _userManager.RemoveFromRolesAsync(userFromDb, userRoles);

                    await _userManager.AddToRolesAsync(userFromDb, user.Roles);

                    await _unitOfWork.Save();
                    return userFromDb;
                }
                else
                {
                    throw new WebsiteException("The user does not exists");
                }
            }
            else
            {
                throw new WebsiteException("Invalid user input model");
            }
        }

        public async Task<bool> DeleteById(int userId)
        {
            var user = await _unitOfWork.UserRepository.Filter(x => x.Id == userId && !x.IsDeleted).FirstOrDefaultAsync();
            bool result = false;
            if (user != null)
            {
                user.IsDeleted = true;
                _unitOfWork.UserRepository.Update(user);
                result = Convert.ToBoolean(await _unitOfWork.Save());
            }
            return result;
        }

        private Expression<Func<User, bool>> FilterUsers(string searchString)
        {
            Expression<Func<User, bool>> result = x =>
            (EF.Functions.Like(x.UserName, $"%{searchString}%") ||
            EF.Functions.Like(x.Email, $"%{searchString}%") ||
            x.Roles.Any(y => EF.Functions.Like(y.Role.Name, $"%{searchString}%"))) &&
            !x.IsDeleted;
            return result;
        }

        public async Task<List<UserView>> GetAllUsers()
        {
            var users = await _unitOfWork.UserRepository
                .Filter(x => !x.IsDeleted)
                .ToListAsync();
            var result = new List<UserView>();
            foreach (var user in users)
            {   
                var roles = await _userManager.GetRolesAsync(user);
                var userView = _mapper.Map<UserView>(user);
                result.Add(userView);
            }
            return result;
        }
    }
}
