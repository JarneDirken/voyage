using backend.Dto.Activity;

namespace backend.Dto.Trip
{
    public class GetTripDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublic { get; set; } = false;
        public int? Budget { get; set; }
        public List<GetActivitiesDto>? Activities { get; set; }
    }
}
