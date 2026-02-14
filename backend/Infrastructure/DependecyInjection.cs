using BusinessLogiclayer.RepoContracts;
using Infrastructure.Data;
using Infrastructure.Data.Repos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddInfrastrctureServcies(this IServiceCollection services ,IConfiguration _conf)
        {
            services.AddSingleton<DbConnectionFactory>();
            services.AddScoped<IUsersRepo, UserRepository>();
            services.AddScoped(typeof(IGenericRepo<>), typeof(GenericRepository<>));


            return services;
        }
    }
}
