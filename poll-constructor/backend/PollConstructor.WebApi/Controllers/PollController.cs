using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PollConstructor.Core.Services.Interfaces;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.ViewModels;
using PollConstructor.Web.Controllers;

namespace BusinessIntelligence.Web.Controllers
{
    [Route("api/polls")]
    [Authorize]
    public class PollController : BaseServiceController<IPollService>
    {
        public PollController(IPollService service) : base(service) { }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetById(id);
            return ResponseModel(result);
        }
        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return ResponseModel(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] PollDto eventDto)
        {
            await _service.Update(id, eventDto);
            return ResponseModel(true);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return ResponseModel(true);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PollDto eventDto)
        {
            await _service.Create(eventDto);
            return ResponseModel(true);
        }
    }
}