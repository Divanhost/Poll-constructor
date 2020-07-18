using System.Collections.Concurrent;
using System.Threading.Tasks;
using PollConstructor.Data.Context;
using PollConstructor.Data.Repositories.Interfaces;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Data.Repositories.Implementation
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(AppDbContext dbContext)
        {
            _context = dbContext;
        }

        public IRepository<User, int> UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new Repository<User, int>(_context);
                }
                return _userRepository;
            }
        }
          public IRepository<Poll, int> PollRepository
        {
            get
            {
                if (_pollRepository == null)
                {
                    _pollRepository = new Repository<Poll, int>(_context);
                }
                return _pollRepository;
            }
        }
          public IRepository<TokenCouple, int> TokenCoupleRepository
        {
            get
            {
                if (_tokenCoupleRepository == null)
                {
                    _tokenCoupleRepository = new Repository<TokenCouple, int>(_context);
                }
                return _tokenCoupleRepository;
            }
        }
          public IRepository<Question, int> QuestionRepository
        {
            get
            {
                if (_questionRepository == null)
                {
                    _questionRepository = new Repository<Question, int>(_context);
                }
                return _questionRepository;
            }
        }
          public IRepository<Option, int> OptionRepository
        {
            get
            {
                if (_optionRepository == null)
                {
                    _optionRepository = new Repository<Option, int>(_context);
                }
                return _optionRepository;
            }
        }
        
        public async Task<int> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result;
        }

        public IRepository<TEntity, TId> GetRepository<TEntity, TId>() where TEntity : class, IEntity<TId>
        {
            string key = $"{typeof(TEntity).Name}{typeof(TId).Name}";
            object repositoryObj;
            Repository<TEntity, TId> repository;
            if (!_repositories.TryGetValue(key, out repositoryObj))
            {
                repository = new Repository<TEntity, TId>(_context);
                _repositories.TryAdd(key, repository);
                return repository;
            }
            else
            {
                repository = repositoryObj as Repository<TEntity, TId>;
            }

            return repository;
        }

        private readonly ConcurrentDictionary<string, object> _repositories = new ConcurrentDictionary<string, object>();

        private readonly AppDbContext _context;
       
        private IRepository<User, int> _userRepository;
        private IRepository<Poll, int> _pollRepository;
        private IRepository<TokenCouple, int> _tokenCoupleRepository;
        private IRepository<Question, int> _questionRepository;
        private IRepository<Option, int> _optionRepository;
        

    }
}
