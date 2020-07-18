using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PollConstructor.Shared.Models;

namespace PollConstructor.Data.Repositories.Interfaces
{
    /// <summary>
    /// Base repository interface which contains CRUD methods for entity
    /// </summary>
    /// <typeparam name="TEntity">IEntity implementation - MarketCount database entity</typeparam>
    public interface IRepository<TEntity, TId> where TEntity : class, IEntity<TId>
    {
        /// <summary>
        /// Returns all entities of this type from database.
        /// </summary>
        /// <returns>IQueryable entities</returns>
        IQueryable<TEntity> All();

        /// <summary>
        /// Creates entity in database.
        /// </summary>
        /// <param name="t">Saving entity object</param>
        /// <returns>Template Entity with id</returns>
        TEntity Create(TEntity t);

        /// <summary>
        /// Creates many entities in database
        /// </summary>
        /// <param name="items"></param>
        void Create(IEnumerable<TEntity> items);

        /// <summary>
        /// Updates existing entity in database and returns it
        /// </summary>
        /// <param name="t"></param>
        void Update(TEntity t);

        /// <summary>
        /// Update existing entities in database
        /// </summary>
        /// <param name="items"></param>
        void Update(IEnumerable<TEntity> items);
        void Update(IEnumerable<TEntity> currentItems, IEnumerable<TEntity> newItems);

        /// <summary>
        /// Deletes entity by entity object
        /// </summary>
        /// <param name="entity">Existing entity</param>
        void Delete(TEntity entity);

        /// <summary>
        /// Deletes entities by specified expression
        /// </summary>
        /// <param name="predicate">LINQ expression</param>
        void Delete(Expression<Func<TEntity, bool>> predicate);

        void Delete(IEnumerable<TEntity> entities);

        /// <summary>
        /// Gets objects from database by filter
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns>IQuarible Template entities</returns>
        IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Find first object filtered by given predicate.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns>First founded</returns>
        Task<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Indicates if there are objects in database which 
        /// </summary>
        /// <param name="predicate">LINQ expression</param>
        /// <returns>true if there are one or more objects filtered by given predicate</returns>
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Returns total count of stored objects.
        /// </summary>
        int Count { get; }

        /// <summary>
        /// Force entity state to Detached
        /// </summary>
        /// <param name="entry">Db entry</param>
        /// <returns>Detached entry</returns>
        TEntity Detach(TEntity entry);

    }
}
