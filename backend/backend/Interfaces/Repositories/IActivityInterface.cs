using backend.Models;

namespace backend.Interfaces.Repositories
{
    public interface IActivityInterface
    {
        Task<List<Activity>> GetActivites(int tripId);
        Task CreateActivity(Activity activity);
        Task UpdateActivity(Activity activity);
        Task DeleteActivity(int activityId);
    }
}
