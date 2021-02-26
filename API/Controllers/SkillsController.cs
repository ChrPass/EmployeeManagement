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
    public class SkillsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SkillsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Skill>>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(Guid id)
        {
            return await _context.Skills.FindAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Skill>> InsertSkill(SkillInsertUpdateResource resource)
        {
            var newSkill = _mapper.Map<SkillInsertUpdateResource, Skill>(resource);
            
            newSkill.Id = Guid.NewGuid();
            newSkill.CreationDate = DateTime.Now;
            newSkill.UpdateDate = DateTime.Now;

            await _context.AddAsync(newSkill);
            await _context.SaveChangesAsync();

            return Ok(newSkill);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Skill>> UpdateSkill(Guid id, SkillInsertUpdateResource resource)
        {
            var skill = await _context.Skills.FindAsync(id);

            if (skill == null)
                return NotFound();

            skill.UpdateDate = DateTime.Now;

            _mapper.Map(resource, skill);

            await _context.SaveChangesAsync();

            return Ok(skill);//(skill);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Skill>> DeleteSkill(Guid id)
        {
            // if (!ModelState.IsValid)
            //     return BadRequest(ModelState.GetErrorMessages())

            var skill = await _context.Skills.FindAsync(id);

            if (skill == null)
                return NotFound();

            _context.Remove(skill);

            await _context.SaveChangesAsync();
            return Ok(skill);
        }
    }
}