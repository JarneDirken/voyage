namespace backend.Dto.Trip
{
    public class CreateTripDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? Budget { get; set; }
        public int UserId { get; set; }
    }
}
