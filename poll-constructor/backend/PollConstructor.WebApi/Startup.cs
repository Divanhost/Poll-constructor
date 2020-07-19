using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PollConstructor.Core.Configuration;
using PollConstructor.Core.Middleware;

namespace PollConstructor.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
         public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.AddMvc(mvcOptions => mvcOptions.EnableEndpointRouting = false)
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                    builder
                    .WithOrigins(_corsOrigins.SelectMany(origin => new []
                    {
                        $"http://{origin}",
                        $"https://{origin}"
                    }).ToArray())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
            });
            services.RegisterDependencies(Configuration);
            services.SetupAuthorization(Configuration);
            services.AddHttpContextAccessor();
            services.AddRouting();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();

            app.UseEndpoints(cfg =>
            {
                cfg.MapControllers();
            });
        }
        private readonly string[] _corsOrigins = {
            "localhost:5001",
            "localhost:3000"
        };
    }
}
