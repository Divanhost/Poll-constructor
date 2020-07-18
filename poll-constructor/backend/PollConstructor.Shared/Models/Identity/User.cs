using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PollConstructor.Shared.Models.Identity
{
    public class User : IdentityUser<int>, IEntity<int>
    {
        [Required]
        public string FullName
        {
            get;
            set;
        }
        public bool IsDeleted
        {
            get;
            set;
        }
        public virtual ICollection<UserRole> Roles
        {
            get;
            set;
        }

        public virtual List<Poll> Polls
        {
            get;
            set;
        }
       
    }
}
