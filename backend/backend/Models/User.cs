namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? FirebaseUid { get; set; }

        // Has many Trip
        public List<Trip> Trips { get; set; } = new();

        // Many-to-Many: A user can be invited to many trips
        public List<TripUser> TripUsers { get; set; } = new();
    }
}
