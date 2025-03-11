using backend.Models;

namespace backend.Interfaces.Repositories
{
    public interface ITripInterface
    {
        Task CreateTrip(Trip trip);
        Task<List<Trip>> GetTrips();
        Task<Trip> GetTripDetails(int tripId);
        Task UpdateTrip(Trip trip);
        Task DeleteTrip(int tripId);
        Task<List<Trip>> GetTripsPublic();
    }
}
