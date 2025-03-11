using backend.Dto.User;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/user/register
        [HttpPost("Register")]
        public async Task<ActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            await _userService.CreateUser(dto);

            return Ok("User successfully created");
        }
    }
}
