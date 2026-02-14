using Dapper;
using System.Data;
using BusinessLogiclayer.RepoContracts;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Infrastructure.Data.Repos
{
    public class GenericRepository<T> : IGenericRepo<T> where T : class
    {
        private readonly DbConnectionFactory _factory;
        private readonly string _tableName;

        public GenericRepository(DbConnectionFactory factory)
        {
            _factory = factory;
            _tableName = typeof(T).Name.ToLower() + "s";
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            using var connection = _factory.CreateConnection();
            var sql = $"SELECT * FROM {_tableName}";
            return await connection.QueryAsync<T>(sql);
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            using var connection = _factory.CreateConnection();
            var sql = $"SELECT * FROM {_tableName} WHERE id = @Id";
            return await connection.QueryFirstOrDefaultAsync<T>(sql, new { Id = id });
        }

        public async Task<int> AddAsync(T entity)
        {
            using var connection = _factory.CreateConnection();
            var insertProps = string.Join(",", typeof(T).GetProperties()
                                        .Where(p => p.Name.ToLower() != "id")
                                        .Select(p => p.Name.ToLower()));

            var insertValues = string.Join(",", typeof(T).GetProperties()
                                        .Where(p => p.Name.ToLower() != "id")
                                        .Select(p => "@" + p.Name));
            var sql = $"INSERT INTO {_tableName} ({insertProps}) VALUES ({insertValues})";
            return await connection.ExecuteAsync(sql, entity);
        }

        public async Task<int> UpdateAsync(T entity)
        {
            using var connection = _factory.CreateConnection();
            var updateProps = string.Join(",", typeof(T).GetProperties()
                                        .Where(p => p.Name.ToLower() != "id")
                                        .Select(p => $"{p.Name.ToLower()} = @{p.Name}"));

            var sql = $"UPDATE {_tableName} SET {updateProps} WHERE id = @Id";
            return await connection.ExecuteAsync(sql, entity);
        }

        public async Task<int> RemoveAsync(int id)
        {
            using var connection = _factory.CreateConnection();
            var sql = $"DELETE FROM {_tableName} WHERE id = @Id";
            return await connection.ExecuteAsync(sql, new { Id = id });
        }
    }
}