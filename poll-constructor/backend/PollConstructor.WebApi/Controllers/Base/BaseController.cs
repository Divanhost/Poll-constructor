using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using PollConstructor.Shared.ApiModels;
using Microsoft.AspNetCore.Mvc;

namespace PollConstructor.Web.Controllers
{
    public class BaseController : Controller
    {
        public int UserId => int.Parse(User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value);

        public IActionResult JsonResult<T>(T result)
        {
            return Ok(result);
        }

        public IActionResult ResponseModel<T>(T result)
        {
            var response = new ResponseModel<T>(result);
            return JsonResult(response);
        }

    }
}