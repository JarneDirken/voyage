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
        public TripService(ITripInterface tripInterface, IMapper mapper)
        {
            _tripInterface = tripInterface;
            _mapper = mapper;
        }

        public async Task CreateTrip(CreateTripDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentException("Invalid data");
            }

            // map DTO to voyage model
            var trip = _mapper.Map<Trip>(dto);

            // checks Budget peut pas etre negative
            if (trip.Budget < 0)
            {
                throw new ArgumentException("Budget cannot be negative");
            }

            await _tripInterface.CreateTrip(trip);
        }
        public async Task<List<GetTripsDto>> GetTrips()
        {
            var trips = await _tripInterface.GetTrips();
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
            return mappedTrip;
        }
        public async Task UpdateTrip(UpdateTripDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentException("Invalid data");
            }

            // map DTO to voyage model
            var trip = _mapper.Map<Trip>(dto);

            if (trip == null)
            {
                throw new ArgumentException("Invalid trip");
            }

            await _tripInterface.UpdateTrip(trip);
        }
        public async Task DeleteTrip(int tripId)
        {
            if (tripId <= 0)
            {
                throw new ArgumentException("Invalid data.");
            }

            await _tripInterface.DeleteTrip(tripId);
        }
    }
}
