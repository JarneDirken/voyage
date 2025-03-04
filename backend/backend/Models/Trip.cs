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

        // User
        public int UserId { get; set; }
        public User User { get; set; }

        // Has Many activities
        public List<Activite> Activites { get; set; }
    }
}
