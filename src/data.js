const data = {
    products: [
        {
            _id: 0,
            imageUrl:
                'https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/10/pizza-3-300x300.png',
            name: 'Пепперони Фреш с перцем',
            categoryMenu: 'Pizza',
            types: [0, 1],
            sizes: [26, 30, 40],
            price: 803,
            category: 0,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 4
        },
        {
            _id: 1,
            imageUrl:
                'https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/10/pizza-3-300x300.png',
            name: 'Сырная',
            categoryMenu: 'Pizza',
            types: [0],
            sizes: [26, 40],
            price: 245,
            category: 1,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 6
        },
        {
            _id: 2,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg',
            name: 'Цыпленок барбекю',
            categoryMenu: 'Burgers',
            types: [0],
            sizes: [26, 40],
            price: 295,
            category: 1,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 4
        },
        {
            _id: 3,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg',
            name: 'Кисло-сладкий цыпленок',
            categoryMenu: 'Salads',
            types: [1],
            sizes: [26, 30, 40],
            price: 275,
            category: 2,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 2
        },
        {
            _id: 4,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg',
            name: 'Чизбургер-пицца',
            categoryMenu: 'Tacos',
            types: [0, 1],
            sizes: [26, 30, 40],
            price: 415,
            category: 3,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 8
        },
        {
            _id: 5,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg',
            name: 'Крэйзи пепперони',
            categoryMenu: 'Wraps',
            types: [0],
            sizes: [30, 40],
            price: 580,
            category: 2,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 2
        },
        {
            _id: 6,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg',
            name: 'Пепперони',
            categoryMenu: 'Fries',
            types: [0, 1],
            sizes: [26, 30, 40],
            price: 675,
            category: 1,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 9
        },
        {
            _id: 7,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg',
            name: 'Маргарита',
            categoryMenu: 'Ice-cream',
            types: [0, 1],
            sizes: [26, 30, 40],
            price: 450,
            category: 4,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 10
        },
        {
            _id: 8,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg',
            name: 'Четыре сезона',
            categoryMenu: 'Drinks',
            types: [0, 1],
            sizes: [26, 30, 40],
            price: 395,
            category: 5,
            description:
                'A mighty meaty double helping of all the reasons you love our burger.',
            rating: 10
        }
    ],
    productsAdditive: [
        {
            _id: 1,
            value: 0,
            imgUrl:
                'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
            label: 'Шампиньоны',
            price: '39 '
        },
        {
            _id: 2,
            value: 1,
            imgUrl:
                'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
            label: 'Моцарелла',
            price: '59 '
        },

        {
            _id: 3,
            value: 2,
            imgUrl:
                'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411EA083CC540F6EE',
            label: 'Острый халапеньо',
            price: '189 '
        },

        {
            _id: 4,
            value: 3,
            imgUrl:
                'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/9a8a9f378d224bf1bb091128b189edf2.png',
            label: 'Острый цыпленок',
            price: '25 '
        }
    ],
    categoryNames: [
        'Show All',
        { catName: 'Pizza', icon: 'icon-pizza' },
        { catName: 'Burqer', icon: 'icon-burgers' },
        { catName: 'Qəlyanaltı', icon: 'icon-salads' },
        { catName: 'Lahmacun', icon: 'icon-tacos' },
        { catName: 'Dönər', icon: 'icon-wraps' },
        { catName: 'Kartof-fri', icon: 'icon-fries' },
        { catName: 'Dondurma', icon: 'icon-ice' },
        { catName: 'İçkilər', icon: 'icon-drinks' }
    ],
    dataType: [
        {
            value: 0,
            label: 'Традиционное'
        },
        {
            value: 1,
            label: 'Тонкое'
        }
    ],
    dataSize: [
        {
            id: 0,
            value: 26,
            label: 'Маленькая 26sm'
        },
        {
            id: 1,
            value: 30,
            label: 'Средняя 30sm'
        },
        {
            id: 2,
            value: 40,
            label: 'Большая 40sm'
        }
    ]
};

export default data;
