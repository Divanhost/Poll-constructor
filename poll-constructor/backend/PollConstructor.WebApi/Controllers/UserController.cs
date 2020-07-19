using System.Threading.Tasks;
using PollConstructor.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PollConstructor.Shared.DTO;

namespace PollConstructor.Web.Controllers.Configuration
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : BaseServiceController<IUserService>
    {

        public UserController(IUserService userService) : base(userService)
        { }
       
        [HttpGet("{userId}")]

        public async Task<IActionResult> GetUserById(int userId)
        {
            var result = await _service.GetUserById(userId);
            return ResponseModel(result);
        }
        [HttpGet("check_username/{username}")]

        public async Task<IActionResult> CheckUserNameExists([FromQuery] string username)
        {
            var result = await _service.CheckUserNameExists(username);
            return ResponseModel(result);
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto user)
        {
            var result = await _service.CreateUser(user);
            return ResponseModel(result);
        }
    }
}
