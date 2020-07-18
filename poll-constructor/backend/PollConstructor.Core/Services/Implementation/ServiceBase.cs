using PollConstructor.Data.Repositories.Interfaces;
using AutoMapper;

namespace PollConstructor.Core.Services.Implementation
{
    public class ServiceBase
    {

        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;

        protected ServiceBase(IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    }
}
