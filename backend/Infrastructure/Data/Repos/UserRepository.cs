using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repos
{
    public class UserRepository : IUsersRepo
    {
        private readonly DbConnectionFactory _factory;

        public UserRepository(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync(ApplicationUser user)
        {
            using var connection = _factory.CreateConnection();
            return await connection.ExecuteAsync("INSERT INTO applicationusers (id, username, passwordhash) VALUES (@Id, @UserName, @PasswordHash)", user);
        }

        public async Task<bool> ExistsAsync(string userName)
        {
            using var connection = _factory.CreateConnection();
            var count = await connection.QuerySingleAsync<int>(
                @"SELECT COUNT(*) FROM ""applicationusers"" WHERE ""username"" = @UserName",
                new { UserName = userName }
            );
            return count > 0;
        }

        public async Task<ApplicationUser?> GetByIdAsync(Guid id)
        {
            using var connection = _factory.CreateConnection();
            ApplicationUser? user = await connection.QueryFirstOrDefaultAsync<ApplicationUser>(
                @"SELECT * FROM ""applicationusers"" WHERE ""id"" = @Id",
                new { Id = id }
            );
            return user;
        }

        public async Task<ApplicationUser?> GetByUserNameAsync(string userName)
        {
            using var connection = _factory.CreateConnection();
            ApplicationUser? user = await connection.QueryFirstOrDefaultAsync<ApplicationUser>(
                @"SELECT * FROM ""applicationusers"" WHERE ""username"" = @UserName",
                new { UserName = userName }
            );
            return user;
        }
    }
}
