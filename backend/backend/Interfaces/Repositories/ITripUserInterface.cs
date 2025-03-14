namespace backend.Interfaces.Repositories
{
    public interface ITripUserInterface
    {
        Task<bool> ExistingInvite(int tripId, int userId);
        Task InviteUser(int tripId, int userId);
    }
}
