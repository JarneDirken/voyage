using backend.Interfaces.Repositories;
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

        public async Task CreateTrip(Trip trip)
        {
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Trip>> GetTrips(int userId)
        {
            var trips = await _context.Trips
                .Where(t => t.UserId == userId)
                .Include(t => t.User)
                .Include(t => t.Activities)
                .OrderByDescending(t => t.EndDate)
                .ToListAsync();
            return trips;
        }
        public async Task<List<Trip>> GetTripsPublic()
        {
            var trips = await _context.Trips
                .Where(t => t.IsPublic == true)
                .Include(t => t.User)
                .Include(t => t.Activities)
                .OrderByDescending(t => t.EndDate)
                .ToListAsync();

            return trips;
        }
        public async Task<Trip> GetTripDetails(int tripId)
        {
            var trip = await _context.Trips
                .Include(t => t.User)
                .Include(t => t.Activities)
                .FirstOrDefaultAsync(t => t.Id == tripId);

            return trip;
        }
        public async Task UpdateTrip(Trip trip)
        {
            var tripToUpdate = await _context.Trips.FirstOrDefaultAsync(t => t.Id == trip.Id);

            if (tripToUpdate == null)
            {
                throw new KeyNotFoundException("Trip not found");
            }

            tripToUpdate.Name = trip.Name;
            tripToUpdate.StartDate = trip.StartDate;
            tripToUpdate.EndDate = trip.EndDate;
            tripToUpdate.Location = trip.Location;
            tripToUpdate.IsPublic = trip.IsPublic;
            tripToUpdate.Budget = trip.Budget;

            await _context.SaveChangesAsync();
        }
        public async Task DeleteTrip(int tripId)
        {
            var trip = await _context.Trips.FirstOrDefaultAsync(t => t.Id == tripId);

            if (trip != null)
            {
                _context.Trips.Remove(trip);
                await _context.SaveChangesAsync();
            }
        }
    }
}
