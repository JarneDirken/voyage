using backend.Interfaces.Repositories;
using backend.Models;

namespace backend.Repositories
{
    public class UserRepository : IUserInterface
    {
        private readonly AppDbContext _appDbContext;
        public UserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task CreateUser(User user)
        {
            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
