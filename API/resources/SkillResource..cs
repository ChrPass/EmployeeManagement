using System;

namespace API.resources
{
    public class SkillResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Value { get; set; }
        public string Label { get; set; }
    }
}