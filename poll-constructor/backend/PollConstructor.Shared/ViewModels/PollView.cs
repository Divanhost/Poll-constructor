using System.Collections.Generic;

namespace PollConstructor.Shared.ViewModels
{
    public class PollView
    {
        public int Id {get; set; }
    
        
        public string Name {get; set; }
    
        
        public string CreatedBy {get; set; }
    
        public List<QuestionView> Questions {get; set; }
    }
}