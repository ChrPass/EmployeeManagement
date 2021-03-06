using System;
using System.Collections.Generic;
using Domain;

namespace API.resources
{
    public class EmployeeResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string FullName { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public ICollection<SkillResource> Skills { get; set; }
    }
}