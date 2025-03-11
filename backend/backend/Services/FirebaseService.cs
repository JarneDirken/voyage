using FirebaseAdmin.Auth;

namespace backend.Services
{
    public class FirebaseService
    {
        public static async Task<string> CreateFirebaseUser(string email, string password)
        {
            var userRecordArgs = new UserRecordArgs()
            {
                Email = email,
                Password = password,
                EmailVerified = false
            };

            UserRecord userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userRecordArgs);
            return userRecord.Uid;
        }
    }
}
