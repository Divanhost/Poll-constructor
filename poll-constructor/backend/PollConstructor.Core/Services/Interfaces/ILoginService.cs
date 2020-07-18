using System.Threading.Tasks;
using PollConstructor.Shared.DTO;

namespace PollConstructor.Core.Services.Interfaces
{
    public interface ILoginService
    {
        Task<string> LoginAsync(LoginDto user);
    }
}