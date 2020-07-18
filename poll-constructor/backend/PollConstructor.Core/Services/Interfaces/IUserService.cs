using System.Collections.Generic;
using System.Threading.Tasks;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Core.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserById(int userId);
        Task<User> CreateUser(UserDto userModel);
        Task<User> UpdateUserByID(int userId, UserDto user);
        Task<bool> DeleteById(int userId);
        Task<string> CheckUserNameExists(string username);
        Task<string> CheckEmailExists(string email);
        Task<bool> CheckPasswordAsync(string userName, string password);
    }
}
