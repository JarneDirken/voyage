namespace backend.Dto.Activity
{
    public class CreateActivityDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double? Cost { get; set; }
        public string? Location { get; set; }
        public int TripId { get; set; }
    }
}
