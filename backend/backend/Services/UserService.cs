using AutoMapper;
using backend.Dto.User;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;
using FirebaseAdmin.Auth;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserInterface _userInterface;
        private readonly IMapper _mapper;
        public UserService(IUserInterface userInterface, IMapper mapper)
        {
            _userInterface = userInterface;
            _mapper = mapper;
        }

        // Business logic for creating a user
        public async Task CreateUser(CreateUserDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentException("Invalid data");
            }

            // Map
            var user = _mapper.Map<User>(dto);

            try
            {
                string firebaseUid = await FirebaseService.CreateFirebaseUser(dto.Email, dto.Password);

                user.FirebaseUid = firebaseUid;

                await _userInterface.CreateUser(user);
            }
            catch (FirebaseAuthException ex)
            {
                throw new Exception($"Firebase error: ${ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating user: ${ex.Message}");
            }
        }
    }
}
