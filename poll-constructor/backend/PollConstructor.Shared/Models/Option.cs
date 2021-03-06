using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PollConstructor.Shared.Models
{
    public class Option: IEntityWithId<int>
    {
        public int Id {get; set; }
        
        [Required]
        public string Name {get;set;}

        [ForeignKey(nameof(Question))]
        public int QuestionId {get; set; }
        public virtual Question Question {get; set; }
    }
}