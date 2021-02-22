using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Skill
    {
        public Guid Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]

        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}