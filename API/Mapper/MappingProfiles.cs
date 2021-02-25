using API.resources;
using AutoMapper;
using Domain;

namespace API.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<SkillResource, Skill>();
            CreateMap<Skill, SkillResource>();
            CreateMap<EmployeeResource, Employee>();
            CreateMap<Employee, EmployeeResource>();
        }
    }
}