using backend.Models;

namespace backend.Interfaces.Repositories
{
    public interface IUserInterface
    {
        Task CreateUser(User user);
    }
}
