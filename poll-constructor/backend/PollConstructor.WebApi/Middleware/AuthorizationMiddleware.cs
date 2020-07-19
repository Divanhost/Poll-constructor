using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace PollConstructor.Core.Middleware
{
    public static class AuthorizationMiddleware
    {
        public static IServiceCollection SetupAuthorization(this IServiceCollection services, IConfiguration configuration)
        {
            // services.AddSingleton<IAuthorizationHandler, UserAuthorizationHandler>();
            services.AddAuthentication();
            services.AddIdentityAndConfigure();

            ConfigureJwt(services, configuration);

            return services;
        }

        private static void ConfigureJwt(IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthorization(cfg =>
            {
                cfg.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .Build());
            });

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })

                .AddJwtBearer(cfg =>
                {
                    cfg.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = ctx =>
                        {
                            if (ctx.Request.Method.Equals("GET") && ctx.Request.Query.ContainsKey("token"))
                                ctx.Token = ctx.Request.Query["token"];
                            return Task.CompletedTask;
                        }
                    };
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = false;
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        RequireExpirationTime = true,
                        ValidateLifetime = true,
                        ValidateIssuer = true,
                        ValidIssuer = configuration.GetSection("JWT") ["Issuer"],
                        ValidateAudience = true,
                        ValidAudience = configuration.GetSection("JWT") ["Audience"],
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(configuration.GetSection("JWT") ["Secret"])),
                        RoleClaimType = "roles",
                        ClockSkew = TimeSpan.Zero
                    };
                });
        }

        public static void AddIdentityAndConfigure(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // // User settings
                // options.User.RequireUniqueEmail = true;
            });
        }

    }
}
