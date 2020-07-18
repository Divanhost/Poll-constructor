using System.Collections.Generic;

namespace PollConstructor.Shared.DTO
{
    public class PollDto
    {
        public int Id {get; set; }
        public string Name {get; set; }
        public int CreatedById {get; set; }
        public List<QuestionDto> Questions {get; set; }
    }
}