using System;
using System.Collections.Generic;
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
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            return await _context.Employees.FindAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> CreateEmployees(EmployeeResource resource)
        {
            var newEmployee =  _mapper.Map<EmployeeResource, Employee>(resource);
            newEmployee.Id = Guid.NewGuid();
            newEmployee.CreationDate = DateTime.Now;
            newEmployee.UpdateDate = DateTime.Now;
            // string fullName = resource.Name + " " + resource.Surname;
            // newEmployee.FullName = fullName;

            await _context.AddAsync(newEmployee);
            await _context.SaveChangesAsync();

            return Ok(newEmployee);
        }
    }
}