
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Shared.Models
{
    public class Poll : IEntityWithId<int>
    {
        public int Id {get; set; }
        
        [Required]
        public string Name {get; set; }
        public bool IsDeleted {get; set; }
        

        [ForeignKey(nameof(CreatedBy))]
        public int CreatedById {get; set; }
        public virtual List<Question> Questions {get; set; }
        public User CreatedBy {get; set; }
    }   
}