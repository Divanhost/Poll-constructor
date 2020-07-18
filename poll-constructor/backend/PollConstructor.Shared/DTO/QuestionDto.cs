using System.Collections.Generic;
using PollConstructor.Shared.Enums;

namespace PollConstructor.Shared.DTO
{
     public class QuestionDto
    {
        public int Id {get; set; }
        public string Title {get; set; }
        public string Description {get; set; }
        public PollType Type {get;set;}
        public bool isOptional {get;set;}
        public bool hasDescription {get;set;}
        public int PollId {get; set; }
        public virtual List<OptionDto> Options {get; set; }
    }
}