using backend.Models;

namespace backend.Initializer
{
    public class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {

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
