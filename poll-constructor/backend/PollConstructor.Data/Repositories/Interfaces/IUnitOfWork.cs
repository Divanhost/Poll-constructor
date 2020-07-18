using System.Threading.Tasks;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Data.Repositories.Interfaces
{
    public interface IUnitOfWork
    {

        IRepository<TEntity, TId> GetRepository<TEntity, TId>() where TEntity : class, IEntity<TId>;

        IRepository<User, int> UserRepository
        {
            get;
        }
        
        Task<int> Save();
    }
}