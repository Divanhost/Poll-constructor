using System.Threading.Tasks;
using PollConstructor.Shared.DTO;
using PollConstructor.Shared.Models;

namespace PollConstructor.Core.Services.Interfaces
{
    public interface ILoginService
    {
        Task<string> LoginAsync(LoginDto user);
        Task<TokenCouple> RenewAsync(TokenCouple tokenCouple);
    }
}