using backend.Dto.Trip;
using backend.Models;

namespace backend.Interfaces
{
    public interface ITripInterface
    {
        Task CreateTrip(CreateTripDto dto);
        Task<List<Trip>> GetTrips();
        Task<List<Trip>> GetAllTrips();
    }
}
