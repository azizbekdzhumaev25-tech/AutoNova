// Placeholder: reviews.js
/* ========================================
   AutoNova - Reviews Database
   База данных отзывов
   ======================================== */

const ReviewsDB = {
    reviews: [
        // Отзывы для товара 1 (Коврики универсальные Premium)
        {
            id: 1,
            productId: 1,
            userId: 101,
            userName: "Александр К.",
            userAvatar: null,
            rating: 5,
            title: "Отличные коврики!",
            text: "Купил на свою Camry, подошли идеально. Качество материала на высоте, не воняют, легко моются. Бортики высокие, вода не проливается. Рекомендую!",
            pros: ["Качество материала", "Высокие бортики", "Легко мыть"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 24,
            notHelpfulCount: 2,
            createdAt: "2024-11-15T10:30:00Z",
            reply: null
        },
        {
            id: 2,
            productId: 1,
            userId: 102,
            userName: "Мария С.",
            userAvatar: null,
            rating: 4,
            title: "Хорошие коврики, но есть нюанс",
            text: "Коврики в целом хорошие, держат воду отлично. Но на моей машине немного сдвигаются, пришлось подрезать. В остальном всё супер.",
            pros: ["Качество", "Водонепроницаемость"],
            cons: ["Немного сдвигаются"],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 15,
            notHelpfulCount: 1,
            createdAt: "2024-11-10T14:20:00Z",
            reply: {
                author: "AutoNova",
                text: "Спасибо за отзыв! Для лучшей фиксации рекомендуем использовать штатные крепления или приобрести дополнительные фиксаторы.",
                createdAt: "2024-11-11T09:00:00Z"
            }
        },
        {
            id: 3,
            productId: 1,
            userId: 103,
            userName: "Дмитрий В.",
            userAvatar: null,
            rating: 5,
            title: "Лучшие коврики за эти деньги",
            text: "Перепробовал много разных ковриков, эти - лучшие в своей ценовой категории. Плотные, не гнутся на морозе, запаха нет вообще. Жена довольна, что в салоне чисто.",
            pros: ["Цена/качество", "Без запаха", "Морозостойкость"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 31,
            notHelpfulCount: 0,
            createdAt: "2024-10-28T18:45:00Z",
            reply: null
        },
        // Отзывы для товара 4 (Чехлы экокожа Premium)
        {
            id: 4,
            productId: 4,
            userId: 104,
            userName: "Сергей Н.",
            userAvatar: null,
            rating: 5,
            title: "Премиальное качество!",
            text: "Чехлы сели как родные, строчка ровная, кожа приятная на ощупь. Установка заняла около часа с перекурами. Салон преобразился, выглядит дорого. Airbag работает - проверял, шов разошёлся как надо (шутка, не проверял конечно).",
            pros: ["Качество материала", "Точная посадка", "Внешний вид", "Совместимость с Airbag"],
            cons: ["Цена выше средней"],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 45,
            notHelpfulCount: 3,
            createdAt: "2024-11-20T11:15:00Z",
            reply: null
        },
        {
            id: 5,
            productId: 4,
            userId: 105,
            userName: "Андрей П.",
            userAvatar: null,
            rating: 4,
            title: "Хорошие чехлы, рекомендую",
            text: "За такую цену ожидал большего. Чехлы неплохие, но на задних сиденьях немного морщат. Возможно, со временем растянутся. Перфорация работает, летом не потеешь.",
            pros: ["Перфорация", "Качество пошива"],
            cons: ["Морщат на задних сиденьях"],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 18,
            notHelpfulCount: 4,
            createdAt: "2024-11-05T16:30:00Z",
            reply: {
                author: "AutoNova",
                text: "Благодарим за обратную связь! Небольшое натяжение на задних сиденьях - это нормально, через 2-3 недели использования материал адаптируется под форму сидений.",
                createdAt: "2024-11-06T10:00:00Z"
            }
        },
        // Отзывы для товара 6 (Видеорегистратор 4K)
        {
            id: 6,
            productId: 6,
            userId: 106,
            userName: "Игорь М.",
            userAvatar: null,
            rating: 5,
            title: "Топовый регистратор!",
            text: "4K реально работает, картинка чёткая, номера читаются даже на ходу. GPS пишет координаты и скорость, потом можно посмотреть маршрут. Wi-Fi для скачивания видео на телефон - очень удобно. Ночью снимает отлично благодаря WDR.",
            pros: ["4K качество", "GPS", "Wi-Fi", "Ночная съёмка"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 67,
            notHelpfulCount: 2,
            createdAt: "2024-11-18T09:45:00Z",
            reply: null
        },
        {
            id: 7,
            productId: 6,
            userId: 107,
            userName: "Владимир Т.",
            userAvatar: null,
            rating: 5,
            title: "Лучший в своей категории",
            text: "Долго выбирал регистратор, остановился на этом и не пожалел. Качество записи превосходное, G-сенсор работает корректно - при резком торможении сразу сохраняет файл. Приложение на телефоне удобное.",
            pros: ["Качество видео", "G-сенсор", "Приложение"],
            cons: ["Хотелось бы карту памяти в комплекте"],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 42,
            notHelpfulCount: 1,
            createdAt: "2024-10-30T14:20:00Z",
            reply: null
        },
        // Отзывы для товара 9 (LED лампы H7)
        {
            id: 8,
            productId: 9,
            userId: 108,
            userName: "Николай Ф.",
            userAvatar: null,
            rating: 5,
            title: "Свет как днём!",
            text: "Поставил вместо штатных галогенок - небо и земля. Светят ярко, не слепят встречку (проверял с друзьями). Установка простая, Plug & Play как и обещали. За 3 месяца полётов нормально.",
            pros: ["Яркость", "Простая установка", "Не слепят"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 89,
            notHelpfulCount: 5,
            createdAt: "2024-11-12T20:10:00Z",
            reply: null
        },
        {
            id: 9,
            productId: 9,
            userId: 109,
            userName: "Павел Д.",
            userAvatar: null,
            rating: 4,
            title: "Хорошие лампы, но нужна адаптация",
            text: "Лампы яркие, но на моей машине не совсем подошёл цоколь - пришлось немного подпилить фиксатор. В остальном всё отлично, свет белый, приятный.",
            pros: ["Яркость", "Цвет"],
            cons: ["Может потребоваться адаптация"],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 23,
            notHelpfulCount: 2,
            createdAt: "2024-10-25T17:30:00Z",
            reply: {
                author: "AutoNova",
                text: "Спасибо за отзыв! На некоторых моделях авто действительно может потребоваться минимальная адаптация. Рады, что в целом лампы оправдали ожидания!",
                createdAt: "2024-10-26T11:00:00Z"
            }
        },
        // Отзывы для товара 15 (Компрессор)
        {
            id: 10,
            productId: 15,
            userId: 110,
            userName: "Олег С.",
            userAvatar: null,
            rating: 5,
            title: "Незаменимая вещь в машине",
            text: "Компрессор мощный, колесо R17 накачивает за 2 минуты. Цифровой манометр показывает точно, автоотключение работает. LED подсветка выручала уже дважды ночью. Сумка для хранения в комплекте - приятный бонус.",
            pros: ["Мощность", "Автоотключение", "LED подсветка", "Комплектация"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 56,
            notHelpfulCount: 1,
            createdAt: "2024-11-08T08:15:00Z",
            reply: null
        },
        // Отзывы для товара 16 (Набор инструментов)
        {
            id: 11,
            productId: 16,
            userId: 111,
            userName: "Виктор К.",
            userAvatar: null,
            rating: 5,
            title: "Профессиональный набор за разумные деньги",
            text: "Давно искал нормальный набор. Этот превзошёл ожидания - сталь качественная, трещотка мягко ходит (72 зуба!), все размеры на месте. Кейс крепкий, всё лежит на своих местах. Пожизненная гарантия - вообще огонь.",
            pros: ["Качество стали", "Трещотка 72 зуба", "Комплектация", "Гарантия"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 78,
            notHelpfulCount: 2,
            createdAt: "2024-11-01T12:40:00Z",
            reply: null
        },
        // Отзывы для товара 17 (Держатель MagSafe)
        {
            id: 12,
            productId: 17,
            userId: 112,
            userName: "Максим Р.",
            userAvatar: null,
            rating: 5,
            title: "Лучший магнитный держатель",
            text: "Магниты очень сильные, iPhone 15 Pro Max держит намертво даже на кочках. Крепление на дефлектор не перекрывает поток воздуха. Поворот на 360° - можно и горизонтально, и вертикально. Советую!",
            pros: ["Сила магнитов", "Не перекрывает дефлектор", "Поворот 360°"],
            cons: [],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 34,
            notHelpfulCount: 0,
            createdAt: "2024-11-22T15:55:00Z",
            reply: null
        },
        {
            id: 13,
            productId: 17,
            userId: 113,
            userName: "Елена В.",
            userAvatar: null,
            rating: 4,
            title: "Хороший держатель, но с оговоркой",
            text: "Держит хорошо, но только если чехол тонкий или с MagSafe. Мой обычный чехол пришлось заменить. В остальном - отличная вещь, навигатор всегда на виду.",
            pros: ["Надёжное крепление", "Удобство"],
            cons: ["Нужен чехол с MagSafe или тонкий"],
            images: [],
            isVerifiedPurchase: true,
            helpfulCount: 19,
            notHelpfulCount: 1,
            createdAt: "2024-11-10T11:20:00Z",
            reply: null
        }
    ],

    // Методы

    /**
     * Получить все отзывы товара
     */
    getByProductId(productId, options = {}) {
        const {
            sortBy = 'newest',
            rating = null,
            verified = null,
            page = 1,
            perPage = 10
        } = options;

        let reviews = this.reviews.filter(r => r.productId === parseInt(productId));

        // Фильтр по рейтингу
        if (rating !== null) {
            reviews = reviews.filter(r => r.rating === parseInt(rating));
        }

        // Фильтр по верифицированным покупкам
        if (verified !== null) {
            reviews = reviews.filter(r => r.isVerifiedPurchase === verified);
        }

        // Сортировка
        reviews = this.sortReviews(reviews, sortBy);

        // Пагинация
        const total = reviews.length;
        const totalPages = Math.ceil(total / perPage);
        const offset = (page - 1) * perPage;
        const paginatedReviews = reviews.slice(offset, offset + perPage);

        return {
            reviews: paginatedReviews,
            pagination: {
                page,
                perPage,
                total,
                totalPages
            }
        };
    },

    /**
     * Сортировка отзывов
     */
    sortReviews(reviews, sortBy) {
        const sorted = [...reviews];

        switch (sortBy) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'oldest':
                return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'highest':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'lowest':
                return sorted.sort((a, b) => a.rating - b.rating);
            case 'helpful':
                return sorted.sort((a, b) => b.helpfulCount - a.helpfulCount);
            default:
                return sorted;
        }
    },

    /**
     * Получить статистику рейтинга товара
     */
    getRatingStats(productId) {
        const reviews = this.reviews.filter(r => r.productId === parseInt(productId));
        
        if (reviews.length === 0) {
            return {
                average: 0,
                total: 0,
                distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            };
        }

        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let sum = 0;

        reviews.forEach(review => {
            distribution[review.rating]++;
            sum += review.rating;
        });

        // Преобразуем в проценты
        const distributionPercent = {};
        Object.keys(distribution).forEach(key => {
            distributionPercent[key] = Math.round((distribution[key] / reviews.length) * 100);
        });

        return {
            average: (sum / reviews.length).toFixed(1),
            total: reviews.length,
            distribution: distribution,
            distributionPercent: distributionPercent
        };
    },

    /**
     * Добавить отзыв
     */
    addReview(reviewData) {
        const newReview = {
            id: this.reviews.length + 1,
            ...reviewData,
            helpfulCount: 0,
            notHelpfulCount: 0,
            createdAt: new Date().toISOString(),
            reply: null
        };

        this.reviews.push(newReview);
        return newReview;
    },

    /**
     * Отметить отзыв полезным
     */
    markHelpful(reviewId, isHelpful = true) {
        const review = this.reviews.find(r => r.id === parseInt(reviewId));
        if (!review) return null;

        if (isHelpful) {
            review.helpfulCount++;
        } else {
            review.notHelpfulCount++;
        }

        return review;
    },

    /**
     * Получить последние отзывы
     */
    getRecent(limit = 5) {
        return [...this.reviews]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsDB;
}