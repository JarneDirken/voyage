namespace backend.Models
{
    public class TripUser
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int TripId { get; set; }
        public Trip Trip { get; set; }

        // Additional fields
        public DateTime InvitedAt { get; set; } = DateTime.UtcNow;
    }
}
