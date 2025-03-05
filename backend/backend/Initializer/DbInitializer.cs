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
        }
    }
}
