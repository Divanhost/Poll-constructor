using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PollConstructor.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Models;

namespace PollConstructor.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class LoginController : BaseServiceController<ILoginService>
    {
        public LoginController(ILoginService tokenService) : base(tokenService)
        {}
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var result = await _service.LoginAsync(model);
            return Json(result);
        }
        [AllowAnonymous]
        [HttpPost("renew")]
        public async Task<IActionResult> Renew([FromBody] TokenCouple model)
        {
            var result = await _service.RenewAsync(model);
            return Json(result);
        }

    }
}
