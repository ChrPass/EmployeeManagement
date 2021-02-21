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
                    Details = "The ability to work in a team",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                },
                new Skill
                {
                    Name = "C#",
                    Details = ".net C#",
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                }
            };

            await context.Skills.AddRangeAsync(skills);
            await context.SaveChangesAsync();
        }
    }
}