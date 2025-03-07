using backend.Dto.Trip;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : Controller
    {
        private readonly ITripService _tripService;
        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        // POST: api/Trip
        [HttpPost]
        public async Task<ActionResult> PostTrip([FromBody] CreateTripDto dto)
        {
            await _tripService.CreateTrip(dto);
            return Ok();
        }

        // GET: api/Trip
        [HttpGet]
        public async Task<ActionResult<List<GetTripsDto>>> GetTrips()
        {
            var trips = await _tripService.GetTrips();
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
        public async Task<ActionResult> DeleteTrip(int tripId)
        {
            await _tripService.DeleteTrip(tripId);
            return Ok();
        }
    }
}
