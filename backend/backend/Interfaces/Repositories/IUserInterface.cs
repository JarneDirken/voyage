using backend.Models;

namespace backend.Interfaces.Repositories
{
    public interface IUserInterface
    {
        Task CreateUser(User user);
        Task<User?> GetUserByUid(string firebaseUid);
        Task<User?> GetUserByEmail(string email);
        Task<List<string>> GetEmailsByFirebaseUids(List<string> firebaseUids);
    }
}
