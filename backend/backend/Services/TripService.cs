using AutoMapper;
using backend.Dto.Trip;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;

namespace backend.Services
{
    public class TripService : ITripService
    {
        private readonly ITripInterface _tripInterface;
        private readonly IMapper _mapper;
        private readonly IUserInterface _userInterface;
        public TripService(ITripInterface tripInterface, IMapper mapper, IUserInterface userInterface)
        {
            _tripInterface = tripInterface;
            _mapper = mapper;
            _userInterface = userInterface;
        }

        public async Task CreateTrip(CreateTripDto dto, string imageFileName)
        {
            if (dto == null)
            {
                throw new ArgumentException("Invalid data");
            }

            var user = await _userInterface.GetUserByUid(dto.UserUid);

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            // map DTO to voyage model
            var trip = _mapper.Map<Trip>(dto);

            trip.UserId = user.Id;
            trip.ImagePath = imageFileName;

            // checks Budget peut pas etre negative
            if (trip.Budget < 0)
            {
                throw new ArgumentException("Budget cannot be negative");
            }

            await _tripInterface.CreateTrip(trip);
        }
        public async Task<List<GetTripsDto>> GetTrips(string userUid)
        {
            if (userUid == null || userUid.Length <= 0)
            {
                throw new ArgumentNullException("Invalid data.");
            }

            var user = await _userInterface.GetUserByUid(userUid);

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            var trips = await _tripInterface.GetTrips(user.Id);
            var mappedTrips = _mapper.Map<List<GetTripsDto>>(trips);

            return mappedTrips;
        }
        public async Task<List<GetTripsDto>> GetTripsPublic()
        {
            var trips = await _tripInterface.GetTripsPublic();
            var mappedTrips = _mapper.Map<List<GetTripsDto>>(trips);
            return mappedTrips;
        }
        public async Task<GetTripDetailsDto> GetTripDetails(int tripId)
        {
            var trip = await _tripInterface.GetTripDetails(tripId);
            var mappedTrip = _mapper.Map<GetTripDetailsDto>(trip);
            mappedTrip.ImageUrl = trip.ImagePath != null ? $"/tripImages/{trip.ImagePath}" : null;
            return mappedTrip;
        }
        public async Task UpdateTrip(UpdateTripDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentException("Invalid data");
            }

            var trip = await _tripInterface.GetTripDetails(dto.Id);

            if (trip == null)
            {
                throw new KeyNotFoundException("Trip not found");
            }

            // Verify user ownership
            var user = await _userInterface.GetUserByUid(dto.UserUid);
            if (user == null || trip.UserId != user.Id)
            {
                throw new UnauthorizedAccessException("You do not have permission to update this trip.");
            }

            // Only update the fields that are not null in the DTO
            if (!string.IsNullOrEmpty(dto.Name))
            {
                trip.Name = dto.Name;
            }

            if (!string.IsNullOrEmpty(dto.Location))
            {
                trip.Location = dto.Location;
            }

            if (dto.StartDate.HasValue)
            {
                trip.StartDate = dto.StartDate.Value;
            }

            if (dto.EndDate.HasValue)
            {
                trip.EndDate = dto.EndDate.Value;
            }

            if (dto.IsPublic.HasValue)
            {
                trip.IsPublic = dto.IsPublic.Value;
            }

            if (dto.Budget.HasValue)
            {
                trip.Budget = dto.Budget.Value;
            }

            await _tripInterface.UpdateTrip(trip);
        }

        public async Task DeleteTrip(int tripId, string userUid)
        {
            if (tripId <= 0)
            {
                throw new ArgumentException("Invalid data.");
            }

            var trip = await _tripInterface.GetTripDetails(tripId);

            if (trip == null)
            {
                throw new KeyNotFoundException("Trip not found.");
            }

            var user = await _userInterface.GetUserByUid(userUid);
            if (user == null || trip.UserId != user.Id)
            {
                throw new UnauthorizedAccessException("You do not have permission to delete this trip.");
            }

            await _tripInterface.DeleteTrip(tripId);
        }

    }
}
