using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Declarer tables
        public DbSet<User> Users { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Activity> Activities { get; set; }

        // Cree les relations;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User -> Trips (One to many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Trips)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Trip -> Activite (One to many)
            modelBuilder.Entity<Trip>()
                .HasMany(t => t.Activities)
                .WithOne(a => a.Trip)
                .HasForeignKey(a => a.TripId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
