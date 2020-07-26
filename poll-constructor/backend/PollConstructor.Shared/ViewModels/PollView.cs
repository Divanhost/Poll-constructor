using System.Collections.Generic;

namespace PollConstructor.Shared.ViewModels
{
    public class PollView
    {
        public int Id {get; set; }
    
        
        public string Title {get; set; }
    
        
        public string CreatedBy {get; set; }
        public int CreatedById {get; set; }
    
        public List<QuestionView> Questions {get; set; }
    }
}