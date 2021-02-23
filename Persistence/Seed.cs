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

            await context.Skills.AddRangeAsync(skills);

            var employees = new List<Employee>
            {
                new Employee
                {
                    Name = "Takis",
                    Surname = "Testakis",
                    FullName = "Takis Testakis",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    DateOfBirth = new DateTime(1997, 05, 09),
                    Age = 24,
                    Sex = "male",
                    Skills = new List<Skill>{
                        new Skill
                        {
                            Name = "C#",
                    Description = ".net C#",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                        },
                       new Skill {
                    Name = "Team Work",
                    Description = "The ability to work in a team",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                },
                    }
                },
                new Employee
                {
                    Name = "Takis",
                    Surname = "Testakis",
                    FullName = "Takis Testakis",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    DateOfBirth = new DateTime(1997, 05, 09),
                    Age = 24,
                    Sex = "male",
                    Skills = new List<Skill>{
                        new Skill
                        {
                            Name = "C#",
                    Description = ".net C#",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                        },
                       new Skill {
                    Name = "Team Work",
                    Description = "The ability to work in a team",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                },
                    }
                },
            };
            await context.SaveChangesAsync();
        }
    }
}