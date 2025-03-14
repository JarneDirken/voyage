using backend.Dto.Activity;

namespace backend.Interfaces.Services
{
    public interface IActivityService
    {
        Task<List<GetActivitiesDto>> GetActivities(int tripId);
        Task CreateActivity(CreateActivityDto dto);
        Task UpdateActivity(UpdateActivityDto dto);
        Task DeleteActivity(int activityId, string userUid);
    }
}
