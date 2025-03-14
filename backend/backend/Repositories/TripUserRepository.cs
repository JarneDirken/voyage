using backend.Interfaces.Repositories;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TripUserRepository : ITripUserInterface
    {
        private readonly AppDbContext _context;
        public TripUserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistingInvite(int tripId, int userId)
        {
            // Check if the user is already invited
            var tripUser = await _context.TripUsers
                .FirstOrDefaultAsync(tu => tu.TripId == tripId && tu.UserId == userId);

            return tripUser != null;
        }
        public async Task InviteUser(int tripId, int userId)
        {
            // Check if the user is already invited
            var alreadyInvited = await ExistingInvite(tripId, userId);

            if (alreadyInvited)
            {
                throw new InvalidOperationException("User is already invited.");
            }

            // Proceed with inviting the user by adding a new entry in the TripUser table
            var tripUser = new TripUser
            {
                TripId = tripId,
                UserId = userId,
                InvitedAt = DateTime.UtcNow
            };

            _context.TripUsers.Add(tripUser);
            await _context.SaveChangesAsync();
        }
    }
}
