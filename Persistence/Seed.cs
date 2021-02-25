using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Skills.Any()) return;

            var skills = new List<Skill>
            {
                new Skill
                {
                    Name = "Team Work",
                    Description = "The ability to work in a team",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                },
                new Skill
                {
                    Name = "C#",
                    Description = ".net C#",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                }
            };

            var employee = new Employee
            {
                Name = "Takis",
                Surname = "Testakis",
                FullName = "Takis Testakis",
                JobTitle = null,
                JobDescription = null,
                DateOfBirth = DateTime.Now,
                Age = 24,
                Sex = "male",
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                EmployeeSkill = new List<EmployeeSkill>()
            };

            skills.ForEach(item =>
            {
                employee.EmployeeSkill.Add(new EmployeeSkill
                {
                    Employee = employee,
                    Skill = item
                });
            });


            await context.Skills.AddRangeAsync(skills);
            await context.Employees.AddRangeAsync(employee);
            await context.SaveChangesAsync();
        }
    }
}