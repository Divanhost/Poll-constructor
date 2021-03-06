using System.Collections.Generic;
using PollConstructor.Shared.Enums;

namespace PollConstructor.Shared.ViewModels
{
     public class QuestionView
    {
        public int Id {get; set; }
        public string Title {get; set; }
        public string Description {get; set; }
        public string Type {get;set;}
        public bool isOptional {get;set;}
        public bool hasDescription {get;set;}
        public int PollId {get; set; }
        public virtual List<OptionView> Options {get; set; }
    }
}