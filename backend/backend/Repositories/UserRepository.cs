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
        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.Include(u => u.Trips).FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<List<string>> GetEmailsByFirebaseUids(List<string> firebaseUids)
        {
            return await _context.Users
                .Where(u => firebaseUids.Contains(u.FirebaseUid))
                .Select(u => u.Email)
                .ToListAsync();
        }
    }
}
