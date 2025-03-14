using AutoMapper;
using backend.Dto.Activity;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;
using Npgsql.EntityFrameworkCore.PostgreSQL.Storage.Internal.Mapping;

namespace backend.Services
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityInterface _activityInterface;
        private readonly IMapper _mapper;
        private readonly IUserInterface _userInterface;
        private readonly ITripInterface _tripInterface;
        public ActivityService(IActivityInterface activityInterface, IMapper mapper, IUserInterface userInterface, ITripInterface tripInterface)
        {
            _activityInterface = activityInterface;
            _mapper = mapper;
            _userInterface = userInterface;
            _tripInterface = tripInterface;
        }

        public async Task<List<GetActivitiesDto>> GetActivities(int tripId)
        {
            var activities = await _activityInterface.GetActivites(tripId);
            var mappedActivities = _mapper.Map<List<GetActivitiesDto>>(activities);
            return mappedActivities;
        }
        public async Task CreateActivity(CreateActivityDto dto)
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

            var trip = await _tripInterface.GetTripDetails(dto.TripId);
            if (trip == null)
            {
                throw new ArgumentException("Trip not found");
            }

            // Verify user ownership OR invited user
            if (trip.UserId != user.Id && !trip.UsersInvited.Contains(user.FirebaseUid))
            {
                throw new UnauthorizedAccessException("You do not have permission to create an activity.");
            }

            // Map 
            var activity = _mapper.Map<Activity>(dto);

            await _activityInterface.CreateActivity(activity);
        }
        public async Task UpdateActivity(UpdateActivityDto dto)
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

            // Get the existing activity to check ownership
            var existingActivity = await _activityInterface.GetActivityById(dto.Id);
            if (existingActivity == null)
            {
                throw new ArgumentException("Activity not found");
            }

            // Verify user ownership
            if (!user.Trips.Any(t => t.Id == existingActivity.TripId))
            {
                throw new UnauthorizedAccessException("You do not have permission to update this activity.");
            }

            // map DTO to voyage model
            var activity = _mapper.Map<Activity>(dto);

            if (activity == null)
            {
                throw new ArgumentException("Invalid trip");
            }

            await _activityInterface.UpdateActivity(activity);
        }
        public async Task DeleteActivity(int activityId, string userUid)
        {
            var user = await _userInterface.GetUserByUid(userUid);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            // Get the existing activity to check ownership
            var activity = await _activityInterface.GetActivityById(activityId);
            if (activity == null)
            {
                throw new ArgumentException("Activity not found");
            }

            // Verify user ownership
            if (!user.Trips.Any(t => t.Id == activity.TripId))
            {
                throw new UnauthorizedAccessException("You do not have permission to delete this activity.");
            }

            await _activityInterface.DeleteActivity(activityId);
        }
    }
}
