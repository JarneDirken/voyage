using backend.Dto.Trip;

namespace backend.Interfaces.Services
{
    public interface ITripService
    {
        Task CreateTrip(CreateTripDto dto, string imageFileName);
        Task<List<GetTripsDto>> GetTrips(string userUid);
        Task<GetTripDetailsDto> GetTripDetails(int tripId);
        Task UpdateTrip(UpdateTripDto dto);
        Task DeleteTrip(int tripId, string userUid);
        Task<List<GetTripsDto>> GetTripsPublic();
        Task<List<GetTripsDto>> GetSharedTrips(string userUid);
        Task InviteUser(int tripId, string email);
    }
}
