using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController:ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        [Authorize]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.UserName) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Username and password are required.");

            var result = await _authService.RegisterAsync(dto.UserName, dto.Password);

            if (!result)
                return BadRequest("User already exists.");

            return Ok("Registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.UserName) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Username and password are required.");

            var token = await _authService.LoginAsync(dto.UserName, dto.Password);

            if (token == null)
                return Unauthorized("Invalid username or password.");

            return Ok(new { token });
        }
    }
}
