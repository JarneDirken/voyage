namespace backend.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double? Cost { get; set; }
        public string? Location { get; set; }

        // FK Trip
        public int TripId { get; set; }
        public Trip Trip { get; set; }
    }
}
