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
         IRepository<Poll, int> PollRepository
        {
            get;
        }
         IRepository<Question, int> QuestionRepository
        {
            get;
        }

         IRepository<Option, int> OptionRepository
        {
            get;
        }
         IRepository<TokenCouple, int> TokenCoupleRepository
        {
            get;
        }
        
        Task<int> Save();
    }
}