using BusinessLogiclayer.Mappers;
using BusinessLogiclayer.Services;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessLogiclayerServices(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddAutoMapper(cfg => { }, typeof(ProjectMapper).Assembly);
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<FileService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<EmailService>();
            services.AddScoped<IClientService, ClientService>();





            return services;
        }
    }
}
