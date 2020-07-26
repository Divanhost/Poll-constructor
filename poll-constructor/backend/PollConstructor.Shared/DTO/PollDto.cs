using System.Collections.Generic;

namespace PollConstructor.Shared.DTO
{
    public class PollDto
    {
        public int Id {get; set; }
        public string Title {get; set; }
        public int CreatedById {get; set; }
        public string CreatedBy {get; set; }
        public List<QuestionDto> Questions {get; set; }
    }
}