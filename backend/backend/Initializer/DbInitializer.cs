using backend.Models;

namespace backend.Initializer
{
    public class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // dummy data
            if (!context.Users.Any())
            {
                var users = new User[]
                {
                    new() { FirstName="Jarne", LastName="Dirken", Email="jarnedirken@gmail.com" }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            if (!context.Trips.Any())
            {
                var trips = new Trip[]
                {
                    new() { Name="test trip 1", Location="Split, Croatie", StartDate=DateTime.UtcNow, EndDate=DateTime.UtcNow.AddDays(6), UserId=1, Budget=2000 }
                };

                context.Trips.AddRange(trips);
                context.SaveChanges();
            }
        }
    }
}
