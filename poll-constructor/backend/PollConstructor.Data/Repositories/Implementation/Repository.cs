using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using PollConstructor.Data.Context;
using PollConstructor.Data.Repositories.Interfaces;
using PollConstructor.Shared.Models;

namespace PollConstructor.Data.Repositories.Implementation
{
    /// <summary>
    /// Class. Implementation of IRepository. Has necessary call to interact with DB data.
    /// </summary>
    /// <typeparam name="TEntity">The type of the enitity</typeparam>
    /// <typeparam name="TId">The type of the id of the entity</typeparam>
    public class Repository<TEntity, TId> : IDisposable, IRepository<TEntity, TId> where TEntity : class, IEntity<TId>
    {
        public Repository(AppDbContext context)
        {
            _context = context;
        }

        public virtual int Count
        {
            get
            {
                return All().Count();
            }
        }

        public IQueryable<TEntity> All()
        {
            return GetAll<TEntity>();
        }

        protected IQueryable<TQuery> GetAll<TQuery>() where TQuery : class
        {
            var result = _context.Set<TQuery>().AsQueryable();
            return result;
        }

        public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var result = await _context.Set<TEntity>().AnyAsync(predicate);
            return result;
        }

        public TEntity Create(TEntity t)
        {
           // _context.Entry<TEntity>(t).State = EntityState.Added;
            _context.Add(t);
            return t;
        }

        public void Create(IEnumerable<TEntity> items)
        {
            foreach (var item in items)
            {
                // _context.Entry(item).State = EntityState.Added;
                _context.Add(item);
            }
        }

        public void Delete(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
        }

        public void Delete(Expression<Func<TEntity, bool>> predicate)
        {
            var entitiesToDelete = Filter(predicate).ToArray();

            foreach (var entity in entitiesToDelete)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public void Delete(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public TEntity Detach(TEntity entry)
        {
            _context.Entry(entry).State = EntityState.Modified;
            return entry;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate)
        {
            return _context.Set<TEntity>().Where(predicate);
        }

        public async virtual Task<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return await Filter(predicate).SingleOrDefaultAsync();
        }

        public void Update(TEntity t)
        {
            _context.Entry(t).State = EntityState.Modified;
        }

        public void Update(IEnumerable<TEntity> items)
        {
            foreach (var entity in items)
            {
                _context.Entry(entity).State = EntityState.Modified;
            }
        }

        public void Update(IEnumerable<TEntity> currentItems, IEnumerable<TEntity> newItems)
        {
             _context.Set<TEntity>().RemoveRange(currentItems.Except(newItems));
             _context.Set<TEntity>().AddRange(newItems.Except(currentItems));
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }

            if (_context == null)
            {
                return;
            }
            if (_context.Database != null && _context.Database.GetDbConnection().State != System.Data.ConnectionState.Closed)
            {
                try
                {
                    _context.Database.CloseConnection();
                }
                catch
                {
                    // Ignore
                }
            }
            _context.Dispose();
            _context = null;
        }

        protected AppDbContext _context
        {
            get;
            private set;
        }
    }
}
