using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
    public class AuthService : IAuthService
    {

        private readonly IUsersRepo _repo;
        private readonly string _jwtKey;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;
        private readonly int _jwtExpireMinutes;

        public AuthService(
            IUsersRepo repo,
            IConfiguration config)
        {
            _repo = repo;

            _jwtKey = config["Jwt:Key"];
            _jwtIssuer = config["Jwt:Issuer"];
            _jwtAudience = config["Jwt:Audience"];
            _jwtExpireMinutes = int.Parse(config["Jwt:ExpireMinutes"] ?? "60");
        }
        public async Task<string?> LoginAsync(string userName, string password)
        {
            var user = await _repo.GetByUserNameAsync(userName);
            if (user == null)
                return null;
            if (!VerifyPassword(password, user.PasswordHash))
                return null;

            return GenerateToken(user);

        }

        public async Task<bool> RegisterAsync(string userName, string password)
        {
            if (await _repo.ExistsAsync(userName))
                return false;

            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = userName,
                PasswordHash = HashPassword(password)
            };

            await _repo.CreateAsync(user);
            return true;
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
        private string GenerateToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtIssuer,
                audience: _jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtExpireMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
