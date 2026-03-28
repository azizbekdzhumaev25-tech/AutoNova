// Placeholder: categories.js
/* ========================================
   AutoNova - Categories Database
   База данных категорий
   ======================================== */

const CategoriesDB = {
    // Основные категории
    categories: [
        {
            id: 1,
            name: "Коврики",
            slug: "kovriki",
            description: "Автомобильные коврики для салона и багажника",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`,
            productsCount: 156,
            isActive: true,
            order: 1,
            subcategories: [101, 102, 103, 104]
        },
        {
            id: 2,
            name: "Чехлы и накидки",
            slug: "chehly-i-nakidki",
            description: "Чехлы на сиденья, накидки и защита салона",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>`,
            productsCount: 234,
            isActive: true,
            order: 2,
            subcategories: [201, 202, 203, 204]
        },
        {
            id: 3,
            name: "Электроника",
            slug: "elektronika",
            description: "Видеорегистраторы, навигаторы, автомагнитолы",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
            productsCount: 189,
            isActive: true,
            order: 3,
            subcategories: [301, 302, 303, 304, 305]
        },
        {
            id: 4,
            name: "Освещение",
            slug: "osveschenie",
            description: "LED лампы, ксенон, дополнительный свет",
            image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`,
            productsCount: 278,
            isActive: true,
            order: 4,
            subcategories: [401, 402, 403, 404]
        },
        {
            id: 5,
            name: "Уход за авто",
            slug: "uhod-za-avto",
            description: "Автохимия, полироли, средства для мойки",
            image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            productsCount: 312,
            isActive: true,
            order: 5,
            subcategories: [501, 502, 503, 504, 505]
        },
        {
            id: 6,
            name: "Тюнинг",
            slug: "tuning",
            description: "Спойлеры, обвесы, накладки, стайлинг",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
            productsCount: 167,
            isActive: true,
            order: 6,
            subcategories: [601, 602, 603, 604]
        },
        {
            id: 7,
            name: "Инструменты",
            slug: "instrumenty",
            description: "Компрессоры, домкраты, наборы инструментов",
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            productsCount: 198,
            isActive: true,
            order: 7,
            subcategories: [701, 702, 703, 704]
        },
        {
            id: 8,
            name: "Аксессуары",
            slug: "aksessuary",
            description: "Держатели, органайзеры, ароматизаторы",
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
            productsCount: 423,
            isActive: true,
            order: 8,
            subcategories: [801, 802, 803, 804, 805]
        }
    ],

    // Подкатегории
    subcategories: [
        // Коврики
        { id: 101, parentId: 1, name: "Универсальные коврики", slug: "universalnye-kovriki", productsCount: 45 },
        { id: 102, parentId: 1, name: "3D коврики", slug: "3d-kovriki", productsCount: 38 },
        { id: 103, parentId: 1, name: "Коврики в багажник", slug: "kovriki-v-bagazhnik", productsCount: 52 },
        { id: 104, parentId: 1, name: "EVA коврики", slug: "eva-kovriki", productsCount: 21 },

        // Чехлы
        { id: 201, parentId: 2, name: "Универсальные чехлы", slug: "universalnye-chehly", productsCount: 67 },
        { id: 202, parentId: 2, name: "Модельные чехлы", slug: "modelnye-chehly", productsCount: 89 },
        { id: 203, parentId: 2, name: "Накидки на сиденья", slug: "nakidki-na-sidenya", productsCount: 45 },
        { id: 204, parentId: 2, name: "Массажные накидки", slug: "massazhnye-nakidki", productsCount: 33 },

        // Электроника
        { id: 301, parentId: 3, name: "Видеорегистраторы", slug: "videoregistratory", productsCount: 56 },
        { id: 302, parentId: 3, name: "Радар-детекторы", slug: "radar-detektory", productsCount: 34 },
        { id: 303, parentId: 3, name: "Автомагнитолы", slug: "avtomagnitoly", productsCount: 45 },
        { id: 304, parentId: 3, name: "GPS навигаторы", slug: "gps-navigatory", productsCount: 28 },
        { id: 305, parentId: 3, name: "Парктроники", slug: "parktroniki", productsCount: 26 },

        // Освещение
        { id: 401, parentId: 4, name: "LED лампы", slug: "led-lampy", productsCount: 123 },
        { id: 402, parentId: 4, name: "LED балки", slug: "led-balki", productsCount: 45 },
        { id: 403, parentId: 4, name: "Ксенон", slug: "ksenon", productsCount: 67 },
        { id: 404, parentId: 4, name: "ДХО", slug: "dho", productsCount: 43 },

        // Уход за авто
        { id: 501, parentId: 5, name: "Полироли и воски", slug: "poliroli-i-voski", productsCount: 78 },
        { id: 502, parentId: 5, name: "Автошампуни", slug: "avtoshampuni", productsCount: 56 },
        { id: 503, parentId: 5, name: "Очистители салона", slug: "ochistiteli-salona", productsCount: 67 },
        { id: 504, parentId: 5, name: "Очистители стёкол", slug: "ochistiteli-stekol", productsCount: 45 },
        { id: 505, parentId: 5, name: "Защитные покрытия", slug: "zaschitnye-pokrytiya", productsCount: 66 },

        // Тюнинг
        { id: 601, parentId: 6, name: "Спойлеры", slug: "spojlery", productsCount: 34 },
        { id: 602, parentId: 6, name: "Насадки на выхлоп", slug: "nasadki-na-vyhlop", productsCount: 45 },
        { id: 603, parentId: 6, name: "Накладки", slug: "nakladki", productsCount: 56 },
        { id: 604, parentId: 6, name: "Молдинги", slug: "moldingi", productsCount: 32 },

        // Инструменты
        { id: 701, parentId: 7, name: "Компрессоры", slug: "kompressory", productsCount: 34 },
        { id: 702, parentId: 7, name: "Наборы инструментов", slug: "nabory-instrumentov", productsCount: 56 },
        { id: 703, parentId: 7, name: "Домкраты", slug: "domkraty", productsCount: 45 },
        { id: 704, parentId: 7, name: "Пусковые устройства", slug: "puskovye-ustrojstva", productsCount: 63 },

        // Аксессуары
        { id: 801, parentId: 8, name: "Держатели для телефона", slug: "derzhateli-dlya-telefona", productsCount: 89 },
        { id: 802, parentId: 8, name: "Органайзеры", slug: "organajzery", productsCount: 67 },
        { id: 803, parentId: 8, name: "Ароматизаторы", slug: "aromatizatory", productsCount: 123 },
        { id: 804, parentId: 8, name: "Чехлы на руль", slug: "chehly-na-rul", productsCount: 78 },
        { id: 805, parentId: 8, name: "Подушки и подголовники", slug: "podushki-i-podgolovniki", productsCount: 66 }
    ],

    // Методы

    /**
     * Получить все категории
     */
    getAll() {
        return this.categories.filter(c => c.isActive).sort((a, b) => a.order - b.order);
    },

    /**
     * Получить категорию по ID
     */
    getById(id) {
        return this.categories.find(c => c.id === parseInt(id)) || null;
    },

    /**
     * Получить категорию по slug
     */
    getBySlug(slug) {
        return this.categories.find(c => c.slug === slug) || null;
    },

    /**
     * Получить подкатегории категории
     */
    getSubcategories(categoryId) {
        return this.subcategories.filter(s => s.parentId === parseInt(categoryId));
    },

    /**
     * Получить подкатегорию по ID
     */
    getSubcategoryById(id) {
        return this.subcategories.find(s => s.id === parseInt(id)) || null;
    },

    /**
     * Получить подкатегорию по slug
     */
    getSubcategoryBySlug(slug) {
        return this.subcategories.find(s => s.slug === slug) || null;
    },

    /**
     * Получить категорию с подкатегориями
     */
    getCategoryWithSubcategories(categoryId) {
        const category = this.getById(categoryId);
        if (!category) return null;

        return {
            ...category,
            subcategoriesList: this.getSubcategories(categoryId)
        };
    },

    /**
     * Получить все категории с подкатегориями
     */
    getAllWithSubcategories() {
        return this.getAll().map(category => ({
            ...category,
            subcategoriesList: this.getSubcategories(category.id)
        }));
    },

    /**
     * Получить хлебные крошки для категории
     */
    getBreadcrumbs(categoryId, subcategoryId = null) {
        const breadcrumbs = [
            { name: 'Главная', url: 'index.html' },
            { name: 'Каталог', url: 'catalog.html' }
        ];

        const category = this.getById(categoryId);
        if (category) {
            breadcrumbs.push({
                name: category.name,
                url: `catalog.html?category=${category.slug}`
            });
        }

        if (subcategoryId) {
            const subcategory = this.getSubcategoryById(subcategoryId);
            if (subcategory) {
                breadcrumbs.push({
                    name: subcategory.name,
                    url: `catalog.html?subcategory=${subcategory.slug}`
                });
            }
        }

        return breadcrumbs;
    },

    /**
     * Поиск категорий
     */
    search(query) {
        const queryLower = query.toLowerCase();
        
        const matchingCategories = this.categories.filter(c => 
            c.name.toLowerCase().includes(queryLower) ||
            c.description.toLowerCase().includes(queryLower)
        );

        const matchingSubcategories = this.subcategories.filter(s =>
            s.name.toLowerCase().includes(queryLower)
        );

        return {
            categories: matchingCategories,
            subcategories: matchingSubcategories
        };
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategoriesDB;
}