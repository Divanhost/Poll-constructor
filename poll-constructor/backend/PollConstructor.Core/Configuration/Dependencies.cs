using System;
using AutoMapper;
using BusinessIntelligence.Core.Services.Implementation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using PollConstructor.Core.Services.Implementation;
using PollConstructor.Core.Services.Interfaces;
using PollConstructor.Data.Context;
using PollConstructor.Data.Repositories.Implementation;
using PollConstructor.Data.Repositories.Interfaces;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Core.Configuration
{
    public static class Dependencies
    {
        public static void RegisterDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration);
            services.RegisterCommonDependencies();
            AddDbContext(services, configuration);
        }

        private static void RegisterCommonDependencies(this IServiceCollection services)
        {
            RegisterHelpers(services);
            RegisterServices(services);
            AddAutoMapper(services);
            services.AddIdentity<User, Role>(options =>
                {
                    options.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
            services.AddLogging();
        }

        private static void RegisterHelpers(IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        private static void RegisterServices(IServiceCollection services)
        {
            services.AddSingleton<IConfigurationService, ConfigurationService>();
            services.AddScoped<UserManager<User>>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPollService, PollService>();
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IContextAccessor, ContextAccessor>();
        }

        private static void AddAutoMapper(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        private static void AddDbContext(IServiceCollection services, IConfiguration configuration)
        {
            var connection = configuration.GetConnectionString("DefaultConnection");
            // services.AddDbContext<AppDbContext>(
            //     options => options.UseSqlServer(connection, x => x.MigrationsAssembly("PollConstructor.Data")));
            services.AddDbContext<AppDbContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseInMemoryDatabase(databaseName: "Test");
            });
        }

        private static void AddTestDbContext(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseSqlite(new SqliteConnectionStringBuilder
                {
                    Mode = SqliteOpenMode.Memory
                }.ConnectionString);
            });
        }
    }
}