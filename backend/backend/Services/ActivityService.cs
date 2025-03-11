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
        public ActivityService(IActivityInterface activityInterface, IMapper mapper)
        {
            _activityInterface = activityInterface;
            _mapper = mapper;
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
