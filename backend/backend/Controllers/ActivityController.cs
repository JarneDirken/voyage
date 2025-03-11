using backend.Dto.Activity;
using backend.Dto.Trip;
using backend.Interfaces.Services;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ActivityController : Controller
    {
        private readonly IActivityService _activityService;
        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        // GET: api/Activity
        [HttpGet("{tripId}")]
        public async Task<ActionResult<List<GetActivitiesDto>>> GetActivities(int tripId)
        {
            var activities = await _activityService.GetActivities(tripId);
            return Ok(activities);
        }

        // POST: api/Activity
        [HttpPost]
        public async Task<ActionResult> CreateActivity([FromBody] CreateActivityDto dto)
        {
            await _activityService.CreateActivity(dto);
            return Ok("Activity created!");
        }

        // PATCH: api/Trip
        [HttpPatch]
        public async Task<ActionResult> UpdateActivity([FromBody] UpdateActivityDto dto)
        {
            await _activityService.UpdateActivity(dto);
            return Ok("Activity updated!");
        }

        // DELETE: api/Activity
        [HttpDelete("{activityId}")]
        public async Task<ActionResult> DeleteActivity(int activityId)
        {
            await _activityService.DeleteActivity(activityId);
            return Ok("Activity deleted!");
        }
    }
}
