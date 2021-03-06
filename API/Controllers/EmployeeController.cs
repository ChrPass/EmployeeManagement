using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.resources;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class EmployeeController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EmployeeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeResource>> GetEmployee(Guid id)
        {
            var employeeFound = await _context.Employees
            .Include(e => e.EmployeeSkill)
            .ThenInclude(e => e.Skill).FirstOrDefaultAsync(e => e.Id == id);

            var employee = _mapper.Map<Employee, EmployeeResource>(employeeFound);

            employee.Skills = new List<SkillResource>();

            var skillIterrator = new List<EmployeeSkill>(employeeFound.EmployeeSkill);

            skillIterrator.ForEach(item =>
            {
                var tempSkill = _mapper.Map<Skill, SkillResource>(item.Skill);

                tempSkill.Value = tempSkill.Id;
                tempSkill.Label = tempSkill.Name;

                employee.Skills.Add(tempSkill);
            });

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> CreateEmployees(EmployeeResource resource)
        {
            var newEmployee = _mapper.Map<EmployeeResource, Employee>(resource);
            newEmployee.Id = Guid.NewGuid();
            newEmployee.FullName = newEmployee.Name + " " + newEmployee.Surname;
            newEmployee.CreationDate = DateTime.Now;
            newEmployee.UpdateDate = DateTime.Now;
            newEmployee.Age = DateTime.Today.Year - resource.DateOfBirth.Year;
            
             if (resource.Skills.Count > 0)
            {
                foreach (var skill in resource.Skills)
                {
                    _context.EmployeeSkills.Add(new EmployeeSkill { EmployeeId = newEmployee.Id, SkillId = skill.Id });
                }
            }

            await _context.AddAsync(newEmployee);
            await _context.SaveChangesAsync();

            return Ok(newEmployee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(Guid id, EmployeeResource resource)
        {
            Employee employee = await _context.Employees
                .Include(e => e.EmployeeSkill).ThenInclude(e => e.Skill)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
                return NotFound();

            _mapper.Map(resource, employee);
            employee.FullName = employee.Name + " " + employee.Surname;
            employee.UpdateDate = DateTime.Now;
            employee.Age = DateTime.Today.Year - employee.DateOfBirth.Year;

            if (employee.EmployeeSkill.Count > 0)
                _context.EmployeeSkills.RemoveRange(employee.EmployeeSkill);

            if (resource.Skills.Count > 0)
            {
                foreach (var skill in resource.Skills)
                {
                    _context.EmployeeSkills.Add(new EmployeeSkill { EmployeeId = employee.Id, SkillId = skill.Id });
                }
            }

            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(Guid id)
        {
            Employee employee = await _context.Employees.FindAsync(id);

            if (employee == null)
                return NotFound();

            _context.Remove(employee);

            await _context.SaveChangesAsync();
            return Ok(employee);
        }
    }
}