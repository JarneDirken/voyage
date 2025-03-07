using AutoMapper;
using backend.Dto.Activity;
using backend.Dto.Trip;
using backend.Models;

namespace backend.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            // We receive DTO -> Map to normal model
            CreateMap<CreateTripDto, Trip>();

            CreateMap<UpdateTripDto, Trip>();

            // -----------------------------------------------

            // Model -> Map to DTO
            CreateMap<Trip, GetTripsDto>()
                .ForMember(dest => dest.UserFirstName, act => act.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.AmountOfActivities, act => act.MapFrom(src => src.Activities.Count));

            CreateMap<Trip, GetTripDetailsDto>()
               .ForMember(dest => dest.Activities, act => act.MapFrom(src => src.Activities));

            CreateMap<Activity, GetActivitiesDto>();
        }
    }
}
