using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.ViewModels;

namespace PollConstructor.Core.Services.Interfaces
{
    public interface IPollService
    {
        Task Create(PollDto eventDto);
        Task Update(int id, PollDto eventDto);
        Task Delete(int id);
        Task<PollView> GetById(int id);
        Task<List<PollView>> GetAll();
    }
}
