using System.Collections.Generic;
using PollConstructor.Shared.Enums;
using PollConstructor.Shared.Models;
using PollConstructor.Shared.Models.Identity;

namespace PollConstructor.Shared
{
    public static class SeedEntities
    {

        public const int AdminUserId = 1;
        public const int PollId = 1;
       
        public static User AdminUser => new User
        {
            Id = AdminUserId,
            UserName = "admin",
            Email = "qwe@qwe.qwe",
            FullName = "Alexandro Bibulis",
            Roles = new List<UserRole>()
        };
        public static Poll SeedPoll => new Poll
        {
            Title = "Кто ты из Винкс",
            CreatedById = 1,
            Questions = SeedQuestions
        };
        public static List<Question> SeedQuestions => new List<Question>
        {
                new Question{
                    Type= PollType.Rating,
                    Title= "Сколько звезд на небе",
                    Description= "Я в благородство играть не буду",
                    IsOptional= false,
                    HasDescription= true,
                }
                // {
                //     id= 2,
                //     type= "List",
                //     title= "Выбери жителей конохи",
                //     description= "",
                //     isOptional= false,
                //     hasDescription= false,
                //     options= [
                //         {
                //             id=1,
                //             name= "Нарута"
                //         },
                //         {
                //             id=2,
                //             name= "Сасаке"
                //         },
                //         {
                //             id=3,
                //             name= "Сакура"
                //         },
                //         {
                //             id=4,
                //             name= "Саня"
                //         },
                //         {
                //             id=5,
                //             name= "Вэлик"
                //         }
                //     ]
                // },
                // {
                //     id= 3,
                //     type= "List",
                //     title= "Какие нравятся цвета",
                //     description= "Выбирай несколько",
                //     isOptional= true,
                //     hasDescription= true,
                //     options= [
                //         {
                //             id=6,
                //             name= "Синий"
                //         },
                //         {
                //             id=7,
                //             name= "Зеленый"
                //         },
                //         {
                //             id=8,
                //             name= "Красный"
                //         },
                //         {
                //             id=9,
                //             name= "Оранжевый"
                //         },
                //         {
                //             id=10,
                //             name= "Белый"
                //         }
                //     ]
                // }
        };
      
    }
}

