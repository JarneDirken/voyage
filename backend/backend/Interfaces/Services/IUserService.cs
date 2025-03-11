using backend.Dto.User;

namespace backend.Interfaces.Services
{
    public interface IUserService
    {
        Task CreateUser(CreateUserDto dto);
    }
}
