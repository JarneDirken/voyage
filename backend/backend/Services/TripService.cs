using AutoMapper;
using backend.Dto.Trip;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class TripService : ITripService
    {
        private readonly ITripInterface _tripInterface;
        private readonly IMapper _mapper;
        private readonly IUserInterface _userInterface;
        private readonly ITripUserInterface _tripUserInterface;
        public TripService(ITripInterface tripInterface, IMapper mapper, IUserInterface userInterface, ITripUserInterface tripUserInterface)
        {
            _tripInterface = tripInterface;
            _mapper = mapper;
            _userInterface = userInterface;
            _tripUserInterface = tripUserInterface;
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
        public async Task InviteUser(int tripId, string email)
        {
            if (tripId <= 0 || email == null)
            {
                throw new ArgumentException("Invalid data.");
            }

            var trip = await _tripInterface.GetTripDetails(tripId);

            if (trip == null)
            {
                throw new KeyNotFoundException("Trip not found.");
            }

            var user = await _userInterface.GetUserByEmail(email);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            // Check if the user is already invited
            var alreadyInvited = await _tripUserInterface.ExistingInvite(tripId, user.Id);

            if (alreadyInvited)
            {
                throw new InvalidOperationException("User is already invited.");
            }

            // Invite the user
            await _tripUserInterface.InviteUser(tripId, user.Id);
        }
        public async Task<List<GetTripsDto>> GetSharedTrips(string userUid)
        {
            if (userUid == null)
            {
                throw new ArgumentException("Invalid data.");
            }

            var trips = await _tripInterface.GetSharedTrips(userUid);
            return _mapper.Map<List<GetTripsDto>>(trips);
        }
    }
}
