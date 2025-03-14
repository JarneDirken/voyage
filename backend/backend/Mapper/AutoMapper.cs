using AutoMapper;
using backend.Dto.Activity;
using backend.Dto.Trip;
using backend.Dto.User;
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

            CreateMap<CreateUserDto, User>();

            CreateMap<CreateActivityDto, Activity>();

            CreateMap<UpdateActivityDto, Activity>();

            // -----------------------------------------------

            // Model -> Map to DTO
            CreateMap<Trip, GetTripsDto>()
                .ForMember(dest => dest.UserFirstName, act => act.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.AmountOfActivities, act => act.MapFrom(src => src.Activities != null ? src.Activities.Count : 0))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src =>
                    src.ImagePath != null ? $"/tripImages/{src.ImagePath}" : null));

            CreateMap<Trip, GetTripDetailsDto>()
               .ForMember(dest => dest.Activities, act => act.MapFrom(src => src.Activities))
               .ForMember(dest => dest.UserUid, act => act.MapFrom(src => src.User.FirebaseUid))
                .ForMember(dest => dest.TotalActivityCost,
                    act => act.MapFrom(src => src.Activities != null ? src.Activities.Sum(a => a.Cost ?? 0) : 0))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src =>
                    src.ImagePath != null ? $"/tripImages/{src.ImagePath}" : null))
                .ForMember(dest => dest.UsersInvited, opt => opt.MapFrom(src =>
                        src.TripUsers.Select(tu => tu.User.FirebaseUid).ToList()))
                .ForMember(dest => dest.UsersInvitedEmail, opt => opt.MapFrom(src =>
                        src.TripUsers.Select(tu => tu.User.Email).ToList()));

            CreateMap<Activity, GetActivitiesDto>();
        }
    }
}
