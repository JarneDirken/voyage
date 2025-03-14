using backend.Dto.Trip;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TripController : Controller
    {
        private readonly ITripService _tripService;
        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        // POST: api/Trip
        [HttpPost]
        public async Task<ActionResult> PostTrip([FromForm] CreateTripDto tripDto)
        {
            string imageFileName = null;

            if (tripDto.Image != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/tripImages");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                imageFileName = $"{Guid.NewGuid()}_{tripDto.Image.FileName}"; // Unique filename
                var filePath = Path.Combine(uploadsFolder, imageFileName);
                Console.WriteLine($"Saving image to: {filePath}");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await tripDto.Image.CopyToAsync(stream);
                }
            }

            await _tripService.CreateTrip(tripDto, imageFileName);
            return Ok();
        }

        // POST: api/Trip/{id}/Invite
        [HttpPost("{tripId}/Invite")]
        public async Task<ActionResult> InviteUser(int tripId, [FromQuery] string email)
        {
            await _tripService.InviteUser(tripId, email);
            return Ok("User successfully invited");
        }

        // GET: api/Trip
        [HttpGet]
        public async Task<ActionResult<List<GetTripsDto>>> GetTrips([FromQuery] string userUid)
        {
            var trips = await _tripService.GetTrips(userUid);
            return Ok(trips);
        }

        // GET: api/Trip/Shared
        [HttpGet("Shared")]
        public async Task<ActionResult<List<GetTripsDto>>> GetSharedTrips([FromQuery] string userUid)
        {
            var trips = await _tripService.GetSharedTrips(userUid);
            return Ok(trips);
        }

        // GET: api/Trip/Public
        [HttpGet("Public")]
        [AllowAnonymous]
        public async Task<ActionResult<List<GetTripsDto>>> GetTripsPublic()
        {
            var trips = await _tripService.GetTripsPublic();
            return Ok(trips);
        }

        // GET: api/Trip/id
        [HttpGet("{tripId}")]
        public async Task<ActionResult<GetTripDetailsDto>> GetVoyageDetails(int tripId)
        {
            var trip = await _tripService.GetTripDetails(tripId);

            // If no voyage is found, return a 404 response
            if (trip == null)
            {
                return NotFound("Voyage not found.");
            }

            return Ok(trip);
        }

        // PATCH: api/Trip
        [HttpPatch]
        public async Task<ActionResult> UpdateTrip([FromBody] UpdateTripDto dto)
        {
            await _tripService.UpdateTrip(dto);
            return Ok();
        }

        // DELETE: api/Trip
        [HttpDelete("{tripId}")]
        public async Task<ActionResult> DeleteTrip(int tripId, [FromQuery] string userUid)
        {
            await _tripService.DeleteTrip(tripId, userUid);
            return Ok();
        }
    }
}
