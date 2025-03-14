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
        public DbSet<TripUser> TripUsers { get; set; }

        // Cree les relations;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // One-to-Many: A user owns many trips
            modelBuilder.Entity<User>()
                .HasMany(u => u.Trips)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many: A trip can have many activities
            modelBuilder.Entity<Trip>()
                .HasMany(t => t.Activities)
                .WithOne(a => a.Trip)
                .HasForeignKey(a => a.TripId)
                .OnDelete(DeleteBehavior.Cascade);

            // Many-to-Many: Trips <-> Users (Invited Users)
            modelBuilder.Entity<TripUser>()
                .HasKey(tu => new { tu.UserId, tu.TripId }); // Composite Primary Key

            modelBuilder.Entity<TripUser>()
                .HasOne(tu => tu.User)
                .WithMany(u => u.TripUsers)
                .HasForeignKey(tu => tu.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TripUser>()
                .HasOne(tu => tu.Trip)
                .WithMany(t => t.TripUsers)
                .HasForeignKey(tu => tu.TripId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
