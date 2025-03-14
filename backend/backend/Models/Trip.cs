namespace backend.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublic { get; set; } = false;
        public int? Budget { get; set; }
        public string? ImagePath { get; set; }

        // Foreign Key for the owner
        public int UserId { get; set; }
        public User User { get; set; }

        // Many-to-Many: A trip can have many invited users
        public List<TripUser> TripUsers { get; set; } = new();

        // One-to-Many: A trip can have many activities
        public List<Activity> Activities { get; set; } = new();
    }
}
