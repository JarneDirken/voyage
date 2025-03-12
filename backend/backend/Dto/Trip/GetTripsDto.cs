namespace backend.Dto.Trip
{
    public class GetTripsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublic { get; set; }
        public int? Budget { get; set; }
        public string? ImageUrl { get; set; }
        // Mapper
        public string UserFirstName { get; set; }
        public int AmountOfActivities { get; set; }
    }
}
