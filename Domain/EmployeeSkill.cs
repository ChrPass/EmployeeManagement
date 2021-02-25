using System;

namespace Domain
{
    public class EmployeeSkill
    {
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public Guid SkillId { get; set; }
        public Skill Skill { get; set; }
    }
}