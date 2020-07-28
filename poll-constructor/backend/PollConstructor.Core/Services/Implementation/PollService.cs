using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using PollConstructor.Core.Services.Implementation;
using PollConstructor.Core.Services.Interfaces;
using PollConstructor.Data.Repositories.Interfaces;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessIntelligence.Core.Services.Implementation
{
    public class PollService : ServiceBase, IPollService
    {   IContextAccessor _httpContext { get; set; }
        public PollService(IUnitOfWork unitOfWork, IMapper mapper,IContextAccessor httpContext) : base(unitOfWork, mapper)
        {
            _httpContext = httpContext;
        }

        public async Task Create(PollDto eventDto)
        {
            var eventDb = _mapper.Map<Poll>(eventDto);
            var userId = _httpContext.GetUserId();
            eventDb.CreatedById = userId;
            _unitOfWork.GetRepository<Poll, int>().Create(eventDb);
            await _unitOfWork.Save();
        }

        public async Task Delete(int id)
        {
            var pollDb = await _unitOfWork.GetRepository<Poll, int>().Filter(x => x.Id == id).FirstOrDefaultAsync();
            pollDb.IsDeleted = true;
            _unitOfWork.GetRepository<Poll, int>().Update(pollDb);
            await _unitOfWork.Save();
        }

        public async Task<PollView> GetById(int id)
        {
            var result = await _unitOfWork.GetRepository<Poll, int>()
                        .Filter(x => x.Id == id)
                        .ProjectTo<PollView>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<PollView>> GetAll()
        {
            var eventViews = await _unitOfWork.GetRepository<Poll, int>()
                       .Filter(x => !x.IsDeleted)
                       .ProjectTo<PollView>(_mapper.ConfigurationProvider)
                       .ToListAsync();
            return eventViews;
        }

        public async Task Update(int id, PollDto eventDto)
        {
            var oldPoll = _mapper.Map<Poll>(eventDto);

            await UpdateQuestions(id, oldPoll.Questions);

            _unitOfWork.GetRepository<Poll, int>().Update(oldPoll);

            await _unitOfWork.Save();
        }

        private async Task UpdateQuestions(int eventId, List<Question> newQuestions)
        {
            var existingIds = await GetPollQuestions(eventId);

            var questionsForDelete = existingIds
                .Where(sl => !newQuestions.Any(c => c.Id == sl)).ToList();
            _unitOfWork.GetRepository<Question, int>().Delete(x => questionsForDelete.Contains(x.Id));

            var questionsForUpdate = newQuestions.Where(x => x.Id != 0).ToList();

            var optionsForUpdate = questionsForUpdate.SelectMany(x=>x.Options).ToList();
            await UpdateOptions(questionsForUpdate, optionsForUpdate);

            _unitOfWork.GetRepository<Question, int>().Update(questionsForUpdate);

            var questionsForCreate = newQuestions.Where(x => x.Id == 0).ToList();
            _unitOfWork.GetRepository<Question, int>().Create(questionsForCreate);

        }

        private async Task UpdateOptions(List<Question> questionsForUpdate, List<Option> newOptions)
        {
            var existingIds = await GetOptions(questionsForUpdate);

            var optionsForDelete = existingIds
                .Where(sl => !newOptions.Any(c => c.Id == sl)).ToList();
            _unitOfWork.GetRepository<Option, int>().Delete(x => optionsForDelete.Contains(x.Id));

            var optionsForUpdate = newOptions.Where(x => x.Id != 0).ToList();
            _unitOfWork.GetRepository<Option, int>().Update(optionsForUpdate);

            var optionsForCreate = newOptions.Where(x => x.Id == 0).ToList();
            _unitOfWork.GetRepository<Option, int>().Create(optionsForCreate);
        }
        private async Task<List<int>> GetPollQuestions(int id)
        {
            var result = await _unitOfWork.GetRepository<Poll, int>()
                .Filter(x => x.Id == id)
                .SelectMany(x => x.Questions)
                .Select(x => x.Id)
                .ToListAsync();
            return result;
        }
        private async Task<List<int>> GetOptions(List<Question> questionsForUpdate)
        {
            var ids = questionsForUpdate.Select(x=>x.Id).ToList();
            var result = await _unitOfWork.GetRepository<Question, int>()
                .Filter(x => ids.Contains(x.Id))
                .SelectMany(x => x.Options)
                .Select(x => x.Id)
                .ToListAsync();
            return result;
        }
    }
}
