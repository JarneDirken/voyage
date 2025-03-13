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
        public ActivityService(IActivityInterface activityInterface, IMapper mapper, IUserInterface userInterface)
        {
            _activityInterface = activityInterface;
            _mapper = mapper;
            _userInterface = userInterface;
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

            // Verify user ownership
            if (!user.Trips.Any(t => t.Id == dto.TripId))
            {
                throw new UnauthorizedAccessException("You do not have permission to update this trip.");
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

            // map DTO to voyage model
            var activity = _mapper.Map<Activity>(dto);

            if (activity == null)
            {
                throw new ArgumentException("Invalid trip");
            }

            await _activityInterface.UpdateActivity(activity);
        }
        public async Task DeleteActivity(int activityId)
        {
            await _activityInterface.DeleteActivity(activityId);
        }
    }
}
