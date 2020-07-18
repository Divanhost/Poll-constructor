
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PollConstructor.Shared.Enums;

namespace PollConstructor.Shared.Models
{
    public class Question : IEntityWithId<int>
    {
        public int Id {get; set; }

        [Required]
        public string Title {get; set; }
        public string Description {get; set; }

        [Required]
        public PollType Type {get;set;}
        public bool IsOptional {get;set;}
        public bool HasDescription {get;set;}

        [ForeignKey(nameof(Poll))]
        public int PollId {get; set; }
        
        public virtual List<Option> Options {get; set; }
        public virtual Poll Poll {get; set; }
    }   
}