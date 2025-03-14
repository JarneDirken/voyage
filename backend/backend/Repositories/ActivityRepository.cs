using backend.Dto.Activity;
using backend.Interfaces.Repositories;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ActivityRepository : IActivityInterface
    {
        private readonly AppDbContext _context;
        public ActivityRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<List<Activity>> GetActivites(int tripId)
        {
            var trips = await _context.Activities
                .Where(a => a.TripId == tripId)
                .ToListAsync();

            return trips;
        }
        public async Task CreateActivity(Activity activity)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateActivity(Activity activity)
        {
            var activityToUpdate = await _context.Activities.FirstOrDefaultAsync(a => a.Id == activity.Id);

            if (activityToUpdate == null)
            {
                throw new KeyNotFoundException("Activity not found");
            }

            activityToUpdate.Name = activity.Name;
            activityToUpdate.StartDate = activity.StartDate;
            activityToUpdate.EndDate = activity.EndDate;
            activityToUpdate.Location = activity.Location;
            activityToUpdate.Cost = activity.Cost;
            activityToUpdate.Description = activity.Description;

            await _context.SaveChangesAsync();
        }
        public async Task DeleteActivity(int activityId)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == activityId);

            if (activity != null)
            {
                _context.Activities.Remove(activity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Activity?> GetActivityById(int id)
        {
            return await _context.Activities.Include(a => a.Trip).FirstOrDefaultAsync(a => a.Id== id);
        }
    }
}
