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
                    new() { FirstName="Jarne", LastName="Dirken", Email="jarnedirken@gmail.com", FirebaseUid="JXmmMcfM3bQ2upUcJ334f2VD9Uz2" },
                    new() { FirstName="Test", LastName="Test", Email="test@gmail.com", FirebaseUid="0KHGbd3hGIgjRJp9G1scmPrgtjK2" }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            if (!context.Trips.Any())
            {
                var trips = new Trip[]
                {
                    new() { Name="test trip 1", Location="Split, Croatie", StartDate=DateTime.UtcNow, EndDate=DateTime.UtcNow.AddDays(6), UserId=1, Budget=2000 },
                    new() { Name="test trip 2", Location="Barcelone, Spain", StartDate=DateTime.UtcNow, EndDate=DateTime.UtcNow.AddDays(12), UserId=2 }

                };

                context.Trips.AddRange(trips);
                context.SaveChanges();
            }
        }
    }
}
