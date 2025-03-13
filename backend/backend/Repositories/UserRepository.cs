using backend.Interfaces.Repositories;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace backend.Repositories
{
    public class UserRepository : IUserInterface
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User?> GetUserByUid(string firebaseUid)
        {
            return await _context.Users.Include(u => u.Trips).FirstOrDefaultAsync(u => u.FirebaseUid == firebaseUid);
        }
    }
}
