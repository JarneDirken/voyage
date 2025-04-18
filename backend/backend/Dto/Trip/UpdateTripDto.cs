﻿namespace backend.Dto.Trip
{
    public class UpdateTripDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsPublic { get; set; }
        public int? Budget { get; set; }
        public string UserUid { get; set; }
    }
}
