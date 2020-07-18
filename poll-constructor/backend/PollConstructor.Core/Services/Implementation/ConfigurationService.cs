using PollConstructor.Core.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace PollConstructor.Core.Services.Implementation
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly IConfiguration _configuration;

        public ConfigurationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string JwtIssuer => _configuration.GetSection("JWT")["Issuer"];
        public string JwtKey => _configuration.GetSection("JWT")["Secret"];
        public double JwtExpireSeconds
        {
            get
            {
                string expireString = _configuration.GetSection("JWT")["ExpireSeconds"];
                double secondsExpire;
                double.TryParse(expireString, out secondsExpire);
                return secondsExpire;
            }
        }

        public string JwtAudience => _configuration.GetSection("JWT")["Audience"];
    }
}