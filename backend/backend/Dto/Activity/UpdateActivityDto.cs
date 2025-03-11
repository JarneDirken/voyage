namespace backend.Dto.Activity
{
    public class UpdateActivityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double? Cost { get; set; }
        public string? Location { get; set; }
    }
}
