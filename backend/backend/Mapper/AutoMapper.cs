using AutoMapper;
using backend.Dto.Trip;
using backend.Models;

namespace backend.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Trip - GetTripDto
            CreateMap<Trip, GetTripDto>()
                .ForMember(dest => dest.UserFirstName, opt => opt.MapFrom(src => src.User.FirstName));

            CreateMap<GetTripDto, Trip>();
        }
    }
}
