using System.Collections.Generic;

namespace PollConstructor.Core.Services.Interfaces
{
    public interface IConfigurationService
    {
        string JwtIssuer
        {
            get;
        }
        string JwtAudience
        {
            get;
        }
        string JwtKey
        {
            get;
        }
        double JwtExpireSeconds
        {
            get;
        }
    }
}