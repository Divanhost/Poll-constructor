using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Data.Context
{
    public class AppDbContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
      
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region Declare tables

            builder.Entity<Poll>().ToTable("Users");
            builder.Entity<Question>().ToTable("Users");
            builder.Entity<Option>().ToTable("Users");
            

            #endregion

            #region Declare keys

            builder.Entity<User>().HasKey(x => x.Id);

            builder.Entity<UserRole>(
                build =>
                {
                    build.HasOne(x => x.Role).WithMany(x => x.Users).HasForeignKey(a => a.RoleId).IsRequired();
                    build.HasOne(x => x.User).WithMany(x => x.Roles).HasForeignKey(a => a.UserId).IsRequired();
                });

            #endregion

           

            // SeedData(builder);
        }

        // protected virtual void SeedData(ModelBuilder builder)
        // {
        //     builder.Entity<Role>().HasDataProvider<RoleProvider, Role>();
        //     builder.Entity<CompanyType>().HasDataProvider<CompanyTypeProvider, CompanyType>();
        //     builder.Entity<ContactType>().HasDataProvider<ContactTypeProvider, ContactType>();
        //     builder.Entity<CompanyStatus>().HasDataProvider<CompanyStatusProvider, CompanyStatus>();
        //     builder.Entity<Currency>().HasDataProvider<CurrencyProvider, Currency>();
        //     builder.Entity<IntegrationScrapperType>().HasDataProvider<IntegrationScrapperTypeProvider, IntegrationScrapperType>();
        //     builder.Entity<EmployeePosition>().HasDataProvider<EmployeePositionProvider, EmployeePosition>();

        //     builder.Entity<MainExpenseCategory>().HasDataProvider<MainExpenseCategoryProvider, MainExpenseCategory>();
        //     builder.Entity<ExpenseSubCategory>().HasDataProvider<ExpenseSubCategoryProvider, ExpenseSubCategory>();
        //     builder.Entity<ExpenseChildCategory>().HasDataProvider<ExpenseChildCategoryProvider, ExpenseChildCategory>();

        //     builder.Entity<WorkflowState>().HasDataProvider<WorkflowStateProvider, WorkflowState>();

        //     builder.Entity<SubscriptionType>().HasDataProvider<SubscriptionTypeProvider, SubscriptionType>();
        //     builder.Entity<ProjectType>().HasDataProvider<ProjectTypeProvider, ProjectType>();
        // }
    }
}
