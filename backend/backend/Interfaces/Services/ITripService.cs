using backend.Dto.Trip;

namespace backend.Interfaces.Services
{
    public interface ITripService
    {
        Task CreateTrip(CreateTripDto dto);
        Task<List<GetTripsDto>> GetTrips();
        Task<GetTripDetailsDto> GetTripDetails(int tripId);
        Task UpdateTrip(UpdateTripDto dto);
        Task DeleteTrip(int tripId);
        Task<List<GetTripsDto>> GetTripsPublic();
    }
}
