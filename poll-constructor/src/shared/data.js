const data = {
    poll:{
        id: 1,
        title: 'Кто ты из Винкс',
        createdById: 1,
        questions: [
            {
                id: 1,
                type: 'Rating',
                title: 'Сколько звезд на небе',
                description: 'Я в благородство играть не буду',
                isOptional: false,
                hasDescription: true,
                options: []
            },
            {
                id: 2,
                type: 'List',
                title: 'Выбери жителей конохи',
                description: '',
                isOptional: false,
                hasDescription: false,
                options: [
                    {
                        id:1,
                        name: 'Нарута'
                    },
                    {
                        id:2,
                        name: 'Сасаке'
                    },
                    {
                        id:3,
                        name: 'Сакура'
                    },
                    {
                        id:4,
                        name: 'Саня'
                    },
                    {
                        id:5,
                        name: 'Вэлик'
                    }
                ]
            },
            {
                id: 3,
                type: 'List',
                title: 'Какие нравятся цвета',
                description: 'Выбирай несколько',
                isOptional: true,
                hasDescription: true,
                options: [
                    {
                        id:6,
                        name: 'Синий'
                    },
                    {
                        id:7,
                        name: 'Зеленый'
                    },
                    {
                        id:8,
                        name: 'Красный'
                    },
                    {
                        id:9,
                        name: 'Оранжевый'
                    },
                    {
                        id:10,
                        name: 'Белый'
                    }
                ]
            },
        ],
        answers:[]
    }
}
export default data; 