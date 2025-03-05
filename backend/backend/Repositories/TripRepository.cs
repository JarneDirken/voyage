using backend.Dto.Trip;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TripRepository : ITripInterface
    {
        // Dependency Injection
        private readonly AppDbContext _context;
        public TripRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateTrip(CreateTripDto dto)
        {
            var trip = new Trip
            {
                Name = dto.Name,
                Location = dto.Location,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Budget = dto.Budget,
                UserId = dto.UserId,
            };

            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Trip>> GetTrips()
        {
            var trips = await _context.Trips
                .Include(t => t.User)
                .ToListAsync();
            return trips;
        }

        public async Task<List<Trip>> GetAllTrips()
        {
            var trips = await _context.Trips
                .Include(t => t.User)
                .ToListAsync();
            return trips;
        }
    }
}
