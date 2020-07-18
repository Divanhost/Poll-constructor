using System;
using AutoMapper;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.Models.Identity;
using PollConstructor.Shared.ViewModels;

namespace PollConstructor.Core.Configuration
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<User, UserView>();
            CreateMap<UserDto, User>();

            CreateMap<Poll, PollView>();
            CreateMap<PollDto, Poll>();

            CreateMap<Question, QuestionView>();
            CreateMap<QuestionDto, Question>();
            
            CreateMap<Option, OptionView>();
            CreateMap<OptionDto, Option>();
        }   
    }
}
