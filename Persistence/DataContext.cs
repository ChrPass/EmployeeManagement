using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeSkill> EmployeeSkills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeSkill>()
                .HasKey(es => new { es.EmployeeId, es.SkillId });

             modelBuilder.Entity<EmployeeSkill>()
                .HasOne(e => e.Employee)
                .WithMany(e => e.EmployeeSkill)
                .HasForeignKey(e => e.EmployeeId);

            modelBuilder.Entity<EmployeeSkill>()
                .HasOne(e => e.Skill)
                .WithMany(e => e.EmployeeSkill)
                .HasForeignKey(e => e.SkillId);
        }
    }
}