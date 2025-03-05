using AutoMapper;
using backend.Dto.Trip;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : Controller
    {
        private readonly ITripInterface _tripInterface;
        private readonly IMapper _mapper;
        public TripController(ITripInterface tripInterface, IMapper mapper)
        {
            _tripInterface = tripInterface;
            _mapper = mapper;
        }

        // POST: api/Trip
        [HttpPost]
        public async Task<ActionResult> PostTrip([FromBody] CreateTripDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid request data");
            }

            await _tripInterface.CreateTrip(dto);
            // Return a response indicating the operation was successful
            return Ok();
        }

        [HttpGet]
        public async Task<List<GetTripDto>> GetTrips()
        {
            var trips = await _tripInterface.GetTrips();
            var mappedTrips = _mapper.Map<List<GetTripDto>>(trips);
            return mappedTrips;
        }

        [HttpGet("all")]
        public async Task<List<Trip>> GetAllTrips()
        {
            var trips = await _tripInterface.GetAllTrips();
            return trips;
        }
    }
}
