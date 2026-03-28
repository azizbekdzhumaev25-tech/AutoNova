// Placeholder: products.js
/* ========================================
   AutoNova - Products Database
   База данных товаров
   ======================================== */

const ProductsDB = {
    // Все товары
    products: [
        // ===== Коврики =====
        {
            id: 1,
            sku: "MAT-001",
            name: "Коврики автомобильные универсальные Premium",
            slug: "kovriki-avtomobilnye-universalnye-premium",
            description: "Высококачественные резиновые коврики с глубоким протектором. Защищают пол автомобиля от грязи, воды и снега. Легко моются и быстро сохнут.",
            shortDescription: "Универсальные резиновые коврики премиум-класса с глубоким протектором",
            categoryId: 1,
            subcategoryId: 101,
            brandId: 1,
            price: 2490,
            originalPrice: 3200,
            discount: 22,
            currency: "RUB",
            images: [
                {
                    id: 1,
                    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                    alt: "Коврики автомобильные Premium - основное фото",
                    isMain: true
                },
                {
                    id: 2,
                    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                    alt: "Коврики автомобильные Premium - вид сбоку",
                    isMain: false
                },
                {
                    id: 3,
                    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                    alt: "Коврики автомобильные Premium - детали",
                    isMain: false
                }
            ],
            rating: 4.7,
            reviewsCount: 234,
            stock: 45,
            stockStatus: "in_stock",
            attributes: {
                material: "Резина",
                color: "Черный",
                size: "Универсальный",
                weight: "2.5 кг",
                warranty: "2 года"
            },
            specifications: [
                { name: "Материал", value: "Термопластичная резина" },
                { name: "Комплектация", value: "4 коврика" },
                { name: "Толщина", value: "15 мм" },
                { name: "Вес комплекта", value: "2.5 кг" },
                { name: "Цвет", value: "Черный" },
                { name: "Страна производства", value: "Россия" }
            ],
            features: [
                "Глубокий протектор для сбора воды",
                "Антискользящая поверхность",
                "Легко моются",
                "Устойчивы к перепадам температур",
                "Не имеют запаха"
            ],
            tags: ["коврики", "защита салона", "универсальные", "резиновые"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [2, 3, 4, 5],
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-12-01T15:30:00Z"
        },
        {
            id: 2,
            sku: "MAT-002",
            name: "3D коврики в салон Toyota Camry XV70",
            slug: "3d-kovriki-toyota-camry-xv70",
            description: "Точная копия контуров пола Toyota Camry XV70. Изготовлены из экологичного материала EVA. Обеспечивают максимальную защиту пола от загрязнений.",
            shortDescription: "Точные 3D коврики для Toyota Camry XV70 из материала EVA",
            categoryId: 1,
            subcategoryId: 102,
            brandId: 2,
            price: 4890,
            originalPrice: null,
            discount: 0,
            currency: "RUB",
            images: [
                {
                    id: 4,
                    url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
                    alt: "3D коврики Toyota Camry",
                    isMain: true
                }
            ],
            rating: 4.9,
            reviewsCount: 89,
            stock: 12,
            stockStatus: "in_stock",
            attributes: {
                material: "EVA",
                color: "Черный",
                compatibility: "Toyota Camry XV70 (2017-2024)",
                weight: "3.2 кг"
            },
            specifications: [
                { name: "Материал", value: "EVA (этиленвинилацетат)" },
                { name: "Комплектация", value: "5 ковриков (салон + багажник)" },
                { name: "Совместимость", value: "Toyota Camry XV70 2017-2024" },
                { name: "Толщина", value: "12 мм" },
                { name: "Цвет окантовки", value: "Черный/Серый/Бежевый" }
            ],
            features: [
                "Точное повторение контуров пола",
                "Водонепроницаемый материал",
                "Простая установка",
                "Гипоаллергенный материал",
                "Не деформируется"
            ],
            tags: ["3d коврики", "toyota", "camry", "eva"],
            badges: ["new"],
            isNew: true,
            isFeatured: true,
            isBestseller: false,
            relatedProducts: [1, 3, 6],
            createdAt: "2024-11-01T10:00:00Z",
            updatedAt: "2024-12-01T15:30:00Z"
        },
        {
            id: 3,
            sku: "MAT-003",
            name: "Коврик в багажник универсальный с бортами",
            slug: "kovrik-v-bagazhnik-universalnyj-s-bortami",
            description: "Защитный коврик для багажника с высокими бортами. Предотвращает загрязнение обивки багажника. Легко режется по размеру.",
            shortDescription: "Универсальный защитный коврик в багажник с высокими бортами",
            categoryId: 1,
            subcategoryId: 103,
            brandId: 3,
            price: 1890,
            originalPrice: 2400,
            discount: 21,
            currency: "RUB",
            images: [
                {
                    id: 5,
                    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
                    alt: "Коврик в багажник",
                    isMain: true
                }
            ],
            rating: 4.5,
            reviewsCount: 156,
            stock: 78,
            stockStatus: "in_stock",
            attributes: {
                material: "Полиэтилен",
                color: "Черный",
                size: "140x100 см",
                borderHeight: "5 см"
            },
            specifications: [
                { name: "Размер", value: "140 x 100 см" },
                { name: "Высота борта", value: "5 см" },
                { name: "Материал", value: "Полиэтилен высокой плотности" },
                { name: "Вес", value: "1.8 кг" }
            ],
            features: [
                "Высокие защитные борта",
                "Легко подрезается под размер",
                "Не впитывает влагу",
                "Защита от царапин"
            ],
            tags: ["багажник", "коврик", "защита"],
            badges: ["sale"],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [1, 2],
            createdAt: "2024-06-10T10:00:00Z",
            updatedAt: "2024-11-15T12:00:00Z"
        },
        // ===== Чехлы =====
        {
            id: 4,
            sku: "COVER-001",
            name: "Чехлы на сиденья экокожа Premium Black",
            slug: "chehly-na-sidenya-ekokoha-premium-black",
            description: "Премиальные чехлы из экокожи высшего качества. Точная посадка на сиденья. Совместимы с боковыми подушками безопасности. Износостойкое покрытие.",
            shortDescription: "Премиальные универсальные чехлы из экокожи с перфорацией",
            categoryId: 2,
            subcategoryId: 201,
            brandId: 4,
            price: 8990,
            originalPrice: 12000,
            discount: 25,
            currency: "RUB",
            images: [
                {
                    id: 6,
                    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
                    alt: "Чехлы экокожа Premium",
                    isMain: true
                },
                {
                    id: 7,
                    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
                    alt: "Чехлы экокожа детали",
                    isMain: false
                }
            ],
            rating: 4.8,
            reviewsCount: 312,
            stock: 23,
            stockStatus: "in_stock",
            attributes: {
                material: "Экокожа",
                color: "Черный",
                size: "Универсальный",
                airbagCompatible: "Да"
            },
            specifications: [
                { name: "Материал", value: "Экокожа премиум-класса" },
                { name: "Комплектация", value: "Передние + задние сиденья" },
                { name: "Совместимость с Airbag", value: "Да" },
                { name: "Подголовники", value: "4 шт" },
                { name: "Страна производства", value: "Россия" }
            ],
            features: [
                "Боковые швы для раскрытия Airbag",
                "Перфорация для вентиляции",
                "Анатомическая поддержка",
                "Легкий уход",
                "5 лет гарантии"
            ],
            tags: ["чехлы", "экокожа", "премиум", "airbag"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [5, 6, 7],
            createdAt: "2024-03-20T10:00:00Z",
            updatedAt: "2024-12-01T10:00:00Z"
        },
        {
            id: 5,
            sku: "COVER-002",
            name: "Накидки на сиденья алькантара Sport",
            slug: "nakidki-na-sidenya-alkantara-sport",
            description: "Спортивные накидки из премиальной алькантары. Отличная фиксация, дышащий материал, стильный дизайн. Идеально для спортивных автомобилей.",
            shortDescription: "Спортивные накидки из алькантары с контрастной строчкой",
            categoryId: 2,
            subcategoryId: 202,
            brandId: 5,
            price: 5490,
            originalPrice: null,
            discount: 0,
            currency: "RUB",
            images: [
                {
                    id: 8,
                    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
                    alt: "Накидки алькантара Sport",
                    isMain: true
                }
            ],
            rating: 4.6,
            reviewsCount: 87,
            stock: 34,
            stockStatus: "in_stock",
            attributes: {
                material: "Алькантара",
                color: "Черный с красной строчкой",
                type: "Накидки"
            },
            specifications: [
                { name: "Материал", value: "Искусственная алькантара" },
                { name: "Комплектация", value: "2 накидки на передние сиденья" },
                { name: "Крепление", value: "Эластичные ремни + крючки" },
                { name: "Подогрев сидений", value: "Совместимы" }
            ],
            features: [
                "Антискользящая основа",
                "Дышащий материал",
                "Контрастная строчка",
                "Быстрая установка"
            ],
            tags: ["накидки", "алькантара", "спорт"],
            badges: [],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [4, 6],
            createdAt: "2024-05-15T10:00:00Z",
            updatedAt: "2024-10-20T10:00:00Z"
        },
        // ===== Электроника =====
        {
            id: 6,
            sku: "ELEC-001",
            name: "Видеорегистратор 4K Ultra HD с GPS",
            slug: "videoregistrator-4k-ultra-hd-gps",
            description: "Профессиональный видеорегистратор с записью в 4K Ultra HD. Встроенный GPS-модуль для фиксации скорости и координат. Ночной режим съёмки.",
            shortDescription: "Профессиональный 4K видеорегистратор с GPS и ночным режимом",
            categoryId: 3,
            subcategoryId: 301,
            brandId: 6,
            price: 7990,
            originalPrice: 9990,
            discount: 20,
            currency: "RUB",
            images: [
                {
                    id: 9,
                    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
                    alt: "Видеорегистратор 4K",
                    isMain: true
                }
            ],
            rating: 4.9,
            reviewsCount: 456,
            stock: 56,
            stockStatus: "in_stock",
            attributes: {
                resolution: "4K Ultra HD",
                display: "3 дюйма IPS",
                gps: "Встроенный",
                memory: "До 256 ГБ"
            },
            specifications: [
                { name: "Разрешение записи", value: "3840 x 2160 (4K)" },
                { name: "Угол обзора", value: "170°" },
                { name: "Дисплей", value: "3.0\" IPS" },
                { name: "GPS", value: "Встроенный" },
                { name: "G-сенсор", value: "Да" },
                { name: "Wi-Fi", value: "Да" },
                { name: "Память", value: "microSD до 256 ГБ" }
            ],
            features: [
                "Запись в 4K 30fps",
                "GPS-трекинг маршрута",
                "Ночной режим WDR",
                "Циклическая запись",
                "Датчик удара"
            ],
            tags: ["видеорегистратор", "4k", "gps", "электроника"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [7, 8, 9],
            createdAt: "2024-02-01T10:00:00Z",
            updatedAt: "2024-12-01T10:00:00Z"
        },
        {
            id: 7,
            sku: "ELEC-002",
            name: "Радар-детектор AntiRadar Pro X7",
            slug: "radar-detektor-antiradar-pro-x7",
            description: "Современный радар-детектор с базой камер GPS. Определяет все типы радаров и камер контроля скорости. Голосовые оповещения на русском языке.",
            shortDescription: "Премиум радар-детектор с базой камер и GPS",
            categoryId: 3,
            subcategoryId: 302,
            brandId: 7,
            price: 11990,
            originalPrice: 14990,
            discount: 20,
            currency: "RUB",
            images: [
                {
                    id: 10,
                    url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
                    alt: "Радар-детектор Pro X7",
                    isMain: true
                }
            ],
            rating: 4.7,
            reviewsCount: 234,
            stock: 28,
            stockStatus: "in_stock",
            attributes: {
                gps: "Встроенный",
                bands: "X, K, Ka, Laser, Стрелка-CT",
                updates: "Бесплатные пожизненно",
                display: "OLED"
            },
            specifications: [
                { name: "Диапазоны", value: "X, K, Ka, Laser" },
                { name: "Камеры", value: "Стрелка-CT, АВТОДОРИЯ, и др." },
                { name: "Дисплей", value: "OLED цветной" },
                { name: "GPS база камер", value: "Обновляемая" },
                { name: "Голосовые оповещения", value: "Русский язык" }
            ],
            features: [
                "Определение всех радаров",
                "База камер с GPS",
                "Голосовые подсказки",
                "Бесплатные обновления",
                "Режим \"Город/Трасса\""
            ],
            tags: ["радар-детектор", "антирадар", "gps"],
            badges: ["sale"],
            isNew: false,
            isFeatured: true,
            isBestseller: false,
            relatedProducts: [6, 8],
            createdAt: "2024-04-01T10:00:00Z",
            updatedAt: "2024-11-01T10:00:00Z"
        },
        {
            id: 8,
            sku: "ELEC-003",
            name: "Автомагнитола 2DIN Android 10 с навигацией",
            slug: "avtomagnitola-2din-android-10-navigaciya",
            description: "Мультимедийная система на Android 10. Экран 10.1 дюйма с разрешением Full HD. Поддержка Apple CarPlay и Android Auto. Встроенная навигация.",
            shortDescription: "Мультимедиа 2DIN на Android с 10.1\" экраном и навигацией",
            categoryId: 3,
            subcategoryId: 303,
            brandId: 8,
            price: 15990,
            originalPrice: 19990,
            discount: 20,
            currency: "RUB",
            images: [
                {
                    id: 11,
                    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                    alt: "Магнитола Android 2DIN",
                    isMain: true
                }
            ],
            rating: 4.5,
            reviewsCount: 178,
            stock: 15,
            stockStatus: "low_stock",
            attributes: {
                screen: "10.1\" IPS Full HD",
                os: "Android 10",
                ram: "4 ГБ",
                storage: "64 ГБ"
            },
            specifications: [
                { name: "Экран", value: "10.1\" IPS 1920x1080" },
                { name: "Процессор", value: "8-ядерный" },
                { name: "ОЗУ", value: "4 ГБ" },
                { name: "Память", value: "64 ГБ" },
                { name: "Bluetooth", value: "5.0" },
                { name: "Wi-Fi", value: "Встроенный" }
            ],
            features: [
                "Apple CarPlay / Android Auto",
                "Встроенная навигация",
                "Камера заднего вида",
                "Bluetooth hands-free",
                "Голосовое управление"
            ],
            tags: ["магнитола", "android", "навигация", "2din"],
            badges: ["sale"],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [6, 7],
            createdAt: "2024-07-01T10:00:00Z",
            updatedAt: "2024-12-01T10:00:00Z"
        },
        // ===== Освещение =====
        {
            id: 9,
            sku: "LIGHT-001",
            name: "LED лампы H7 6000K 12000LM комплект",
            slug: "led-lampy-h7-6000k-12000lm-komplekt",
            description: "Сверхъяркие LED лампы с цветовой температурой 6000K. Световой поток 12000 люмен. Срок службы 50000 часов. Plug & Play установка.",
            shortDescription: "Сверхъяркие LED лампы H7 с установкой без переделок",
            categoryId: 4,
            subcategoryId: 401,
            brandId: 9,
            price: 3490,
            originalPrice: 4500,
            discount: 22,
            currency: "RUB",
            images: [
                {
                    id: 12,
                    url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
                    alt: "LED лампы H7",
                    isMain: true
                }
            ],
            rating: 4.6,
            reviewsCount: 567,
            stock: 120,
            stockStatus: "in_stock",
            attributes: {
                type: "H7",
                colorTemp: "6000K",
                lumens: "12000 лм",
                power: "55W"
            },
            specifications: [
                { name: "Цоколь", value: "H7" },
                { name: "Световой поток", value: "12000 Лм (пара)" },
                { name: "Цветовая температура", value: "6000K (белый)" },
                { name: "Мощность", value: "55W на лампу" },
                { name: "Срок службы", value: "50000 часов" },
                { name: "Напряжение", value: "9-32V" }
            ],
            features: [
                "Plug & Play установка",
                "Встроенный драйвер",
                "Активное охлаждение",
                "IP68 защита от воды",
                "CANBUS совместимость"
            ],
            tags: ["led", "лампы", "h7", "свет"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [10, 11, 12],
            createdAt: "2024-01-10T10:00:00Z",
            updatedAt: "2024-11-20T10:00:00Z"
        },
        {
            id: 10,
            sku: "LIGHT-002",
            name: "Светодиодная балка 120W 22 дюйма",
            slug: "svetodiodnaya-balka-120w-22-dyuima",
            description: "Мощная LED балка для внедорожников. 40 светодиодов, комбинированный луч. Степень защиты IP68. Крепление в комплекте.",
            shortDescription: "Мощная LED балка для бездорожья 120W",
            categoryId: 4,
            subcategoryId: 402,
            brandId: 10,
            price: 6990,
            originalPrice: null,
            discount: 0,
            currency: "RUB",
            images: [
                {
                    id: 13,
                    url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
                    alt: "LED балка 120W",
                    isMain: true
                }
            ],
            rating: 4.8,
            reviewsCount: 123,
            stock: 45,
            stockStatus: "in_stock",
            attributes: {
                power: "120W",
                length: "22 дюйма (56 см)",
                leds: "40 шт",
                beam: "Комбо"
            },
            specifications: [
                { name: "Мощность", value: "120W" },
                { name: "Длина", value: "56 см (22\")" },
                { name: "Светодиоды", value: "40 x 3W CREE" },
                { name: "Световой поток", value: "10800 Лм" },
                { name: "Защита", value: "IP68" },
                { name: "Рабочая температура", value: "-40°C до +60°C" }
            ],
            features: [
                "Комбинированный луч",
                "Алюминиевый корпус",
                "Закалённое стекло",
                "Водонепроницаемость IP68",
                "Крепление в комплекте"
            ],
            tags: ["led балка", "offroad", "свет", "внедорожник"],
            badges: ["new"],
            isNew: true,
            isFeatured: true,
            isBestseller: false,
            relatedProducts: [9, 11],
            createdAt: "2024-10-15T10:00:00Z",
            updatedAt: "2024-11-01T10:00:00Z"
        },
        // ===== Уход за авто =====
        {
            id: 11,
            sku: "CARE-001",
            name: "Полироль для кузова с воском Carnauba",
            slug: "polirol-dlya-kuzova-s-voskom-carnauba",
            description: "Профессиональная полироль с натуральным воском карнауба. Придаёт глубокий блеск и защищает лакокрасочное покрытие до 6 месяцев.",
            shortDescription: "Премиальная полироль с воском карнауба для глубокого блеска",
            categoryId: 5,
            subcategoryId: 501,
            brandId: 11,
            price: 890,
            originalPrice: 1200,
            discount: 26,
            currency: "RUB",
            images: [
                {
                    id: 14,
                    url: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800",
                    alt: "Полироль Carnauba",
                    isMain: true
                }
            ],
            rating: 4.7,
            reviewsCount: 234,
            stock: 200,
            stockStatus: "in_stock",
            attributes: {
                volume: "500 мл",
                type: "Полироль с воском",
                protection: "До 6 месяцев"
            },
            specifications: [
                { name: "Объём", value: "500 мл" },
                { name: "Тип", value: "Полироль-защита" },
                { name: "Состав", value: "Воск карнауба, силиконы" },
                { name: "Срок защиты", value: "До 6 месяцев" }
            ],
            features: [
                "Натуральный воск карнауба",
                "Глубокий зеркальный блеск",
                "Защита от УФ-лучей",
                "Гидрофобный эффект",
                "Не оставляет разводов"
            ],
            tags: ["полироль", "воск", "уход", "защита"],
            badges: ["sale"],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [12, 13],
            createdAt: "2024-02-15T10:00:00Z",
            updatedAt: "2024-10-01T10:00:00Z"
        },
        {
            id: 12,
            sku: "CARE-002",
            name: "Автошампунь концентрат Premium 1л",
            slug: "avtoshampun-koncentrat-premium-1l",
            description: "Концентрированный автошампунь с нейтральным pH. Эффективно удаляет загрязнения, не повреждая воск и защитные покрытия. Экономичный расход.",
            shortDescription: "Концентрированный автошампунь с нейтральным pH",
            categoryId: 5,
            subcategoryId: 502,
            brandId: 11,
            price: 590,
            originalPrice: null,
            discount: 0,
            currency: "RUB",
            images: [
                {
                    id: 15,
                    url: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800",
                    alt: "Автошампунь Premium",
                    isMain: true
                }
            ],
            rating: 4.5,
            reviewsCount: 456,
            stock: 350,
            stockStatus: "in_stock",
            attributes: {
                volume: "1000 мл",
                concentration: "1:100",
                ph: "Нейтральный"
            },
            specifications: [
                { name: "Объём", value: "1000 мл" },
                { name: "Разбавление", value: "1:100" },
                { name: "pH", value: "7.0 (нейтральный)" },
                { name: "Пенообразование", value: "Высокое" }
            ],
            features: [
                "Нейтральный pH",
                "Не смывает воск",
                "Обильная пена",
                "Приятный аромат",
                "Экономичный расход"
            ],
            tags: ["шампунь", "мойка", "уход"],
            badges: [],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [11, 13],
            createdAt: "2024-03-01T10:00:00Z",
            updatedAt: "2024-09-01T10:00:00Z"
        },
        // ===== Тюнинг =====
        {
            id: 13,
            sku: "TUNE-001",
            name: "Спойлер универсальный карбон-лук",
            slug: "spojler-universalnyj-karbon-luk",
            description: "Универсальный спойлер с текстурой под карбон. Подходит для большинства седанов. Крепление на двусторонний скотч 3M.",
            shortDescription: "Универсальный спойлер под карбон для седанов",
            categoryId: 6,
            subcategoryId: 601,
            brandId: 12,
            price: 4290,
            originalPrice: 5500,
            discount: 22,
            currency: "RUB",
            images: [
                {
                    id: 16,
                    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
                    alt: "Спойлер карбон",
                    isMain: true
                }
            ],
            rating: 4.4,
            reviewsCount: 89,
            stock: 25,
            stockStatus: "in_stock",
            attributes: {
                material: "ABS пластик",
                finish: "Карбон-лук",
                length: "135 см",
                mounting: "Скотч 3M"
            },
            specifications: [
                { name: "Материал", value: "ABS пластик" },
                { name: "Покрытие", value: "Текстура карбон" },
                { name: "Длина", value: "135 см" },
                { name: "Высота", value: "7 см" },
                { name: "Крепление", value: "Двусторонний скотч 3M" }
            ],
            features: [
                "Реалистичная текстура карбона",
                "UV-стойкое покрытие",
                "Простая установка",
                "Скотч 3M в комплекте",
                "Универсальный размер"
            ],
            tags: ["спойлер", "карбон", "тюнинг"],
            badges: ["sale"],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [14, 15],
            createdAt: "2024-04-10T10:00:00Z",
            updatedAt: "2024-11-01T10:00:00Z"
        },
        {
            id: 14,
            sku: "TUNE-002",
            name: "Насадки на выхлоп нержавейка 2шт",
            slug: "nasadki-na-vyhlop-nerzhavejka-2sht",
            description: "Стильные насадки на выхлопные трубы из нержавеющей стали. Диаметр входа 58-76мм (универсальный). Придают автомобилю спортивный вид.",
            shortDescription: "Парные насадки из нержавейки с регулируемым креплением",
            categoryId: 6,
            subcategoryId: 602,
            brandId: 12,
            price: 2490,
            originalPrice: null,
            discount: 0,
            currency: "RUB",
            images: [
                {
                    id: 17,
                    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
                    alt: "Насадки на выхлоп",
                    isMain: true
                }
            ],
            rating: 4.6,
            reviewsCount: 156,
            stock: 67,
            stockStatus: "in_stock",
            attributes: {
                material: "Нержавеющая сталь 304",
                inlet: "58-76 мм",
                outlet: "93 мм",
                quantity: "2 шт"
            },
            specifications: [
                { name: "Материал", value: "Нержавеющая сталь AISI 304" },
                { name: "Входной диаметр", value: "58-76 мм" },
                { name: "Выходной диаметр", value: "93 мм" },
                { name: "Длина", value: "170 мм" },
                { name: "Комплект", value: "2 штуки" }
            ],
            features: [
                "Зеркальная полировка",
                "Устойчивость к коррозии",
                "Универсальное крепление",
                "Болт фиксации в комплекте"
            ],
            tags: ["выхлоп", "насадки", "тюнинг", "нержавейка"],
            badges: [],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [13, 15],
            createdAt: "2024-05-20T10:00:00Z",
            updatedAt: "2024-10-15T10:00:00Z"
        },
        // ===== Инструменты =====
        {
            id: 15,
            sku: "TOOL-001",
            name: "Компрессор автомобильный цифровой 12V",
            slug: "kompressor-avtomobilnyj-cifrovoj-12v",
            description: "Мощный автомобильный компрессор с цифровым манометром. Автоматическое отключение при достижении заданного давления. LED подсветка.",
            shortDescription: "Цифровой компрессор с автоотключением и LED подсветкой",
            categoryId: 7,
            subcategoryId: 701,
            brandId: 13,
            price: 2990,
            originalPrice: 3990,
            discount: 25,
            currency: "RUB",
            images: [
                {
                    id: 18,
                    url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
                    alt: "Компрессор цифровой",
                    isMain: true
                }
            ],
            rating: 4.8,
            reviewsCount: 345,
            stock: 89,
            stockStatus: "in_stock",
            attributes: {
                voltage: "12V DC",
                maxPressure: "10 атм",
                performance: "35 л/мин",
                cable: "3 м"
            },
            specifications: [
                { name: "Напряжение", value: "12V DC" },
                { name: "Макс. давление", value: "10 атм (150 PSI)" },
                { name: "Производительность", value: "35 л/мин" },
                { name: "Длина шнура", value: "3 м" },
                { name: "Дисплей", value: "Цифровой с подсветкой" },
                { name: "Автоотключение", value: "Да" }
            ],
            features: [
                "Цифровой манометр",
                "Автоматическое отключение",
                "LED подсветка",
                "Сумка для хранения",
                "Набор насадок"
            ],
            tags: ["компрессор", "инструмент", "накачка шин"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [16, 17],
            createdAt: "2024-01-25T10:00:00Z",
            updatedAt: "2024-11-10T10:00:00Z"
        },
        {
            id: 16,
            sku: "TOOL-002",
            name: "Набор инструментов автомобильный 150 предметов",
            slug: "nabor-instrumentov-avtomobilnyj-150-predmetov",
            description: "Профессиональный набор инструментов в удобном кейсе. 150 предметов для обслуживания автомобиля. Хром-ванадиевая сталь.",
            shortDescription: "Профессиональный набор из 150 инструментов в кейсе",
            categoryId: 7,
            subcategoryId: 702,
            brandId: 14,
            price: 8990,
            originalPrice: 12990,
            discount: 31,
            currency: "RUB",
            images: [
                {
                    id: 19,
                    url: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
                    alt: "Набор инструментов 150 предметов",
                    isMain: true
                }
            ],
            rating: 4.9,
            reviewsCount: 234,
            stock: 32,
            stockStatus: "in_stock",
            attributes: {
                pieces: "150 шт",
                material: "CrV сталь",
                case: "Пластиковый кейс",
                warranty: "Пожизненная"
            },
            specifications: [
                { name: "Количество предметов", value: "150 шт" },
                { name: "Материал", value: "Хром-ванадиевая сталь" },
                { name: "Трещотка", value: "72 зуба" },
                { name: "Головки", value: "1/4\", 3/8\", 1/2\"" },
                { name: "Кейс", value: "Усиленный пластик" },
                { name: "Гарантия", value: "Пожизненная" }
            ],
            features: [
                "Профессиональное качество",
                "Хром-ванадиевая сталь",
                "Пожизненная гарантия",
                "Удобный кейс",
                "Полный комплект размеров"
            ],
            tags: ["инструменты", "набор", "ремонт"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [15, 17],
            createdAt: "2024-02-10T10:00:00Z",
            updatedAt: "2024-11-01T10:00:00Z"
        },
        // ===== Аксессуары =====
        {
            id: 17,
            sku: "ACC-001",
            name: "Держатель для телефона магнитный MagSafe",
            slug: "derzhatel-dlya-telefona-magnitnyj-magsafe",
            description: "Универсальный магнитный держатель с поддержкой MagSafe. Вращение 360°. Крепление на вентиляционную решётку или приборную панель.",
            shortDescription: "Магнитный держатель с MagSafe и креплением 2-в-1",
            categoryId: 8,
            subcategoryId: 801,
            brandId: 15,
            price: 1490,
            originalPrice: 1990,
            discount: 25,
            currency: "RUB",
            images: [
                {
                    id: 20,
                    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                    alt: "Держатель MagSafe",
                    isMain: true
                }
            ],
            rating: 4.7,
            reviewsCount: 567,
            stock: 156,
            stockStatus: "in_stock",
            attributes: {
                type: "Магнитный MagSafe",
                rotation: "360°",
                mounting: "Вентиляция / Панель",
                compatibility: "Все смартфоны"
            },
            specifications: [
                { name: "Тип крепления", value: "Магнитное MagSafe" },
                { name: "Вращение", value: "360°" },
                { name: "Варианты установки", value: "Дефлектор / Торпедо" },
                { name: "Совместимость", value: "iPhone 12+, Android с магнитом" }
            ],
            features: [
                "Сильные магниты N52",
                "Поворот на 360°",
                "Быстросъёмное крепление",
                "Не перекрывает дефлектор",
                "Совместим с чехлами"
            ],
            tags: ["держатель", "телефон", "magsafe", "магнитный"],
            badges: ["sale", "bestseller"],
            isNew: false,
            isFeatured: true,
            isBestseller: true,
            relatedProducts: [18, 19],
            createdAt: "2024-03-05T10:00:00Z",
            updatedAt: "2024-12-01T10:00:00Z"
        },
        {
            id: 18,
            sku: "ACC-002",
            name: "Органайзер в багажник складной",
            slug: "organajzer-v-bagazhnik-skladnoj",
            description: "Многофункциональный складной органайзер для багажника. 3 отделения + боковые карманы. Жёсткие стенки, удобные ручки для переноски.",
            shortDescription: "Складной органайзер с жёсткими стенками и карманами",
            categoryId: 8,
            subcategoryId: 802,
            brandId: 3,
            price: 1890,
            originalPrice: null,
            discount: 0,
            currency: "RUB",
            images: [
                {
                    id: 21,
                    url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
                    alt: "Органайзер в багажник",
                    isMain: true
                }
            ],
            rating: 4.5,
            reviewsCount: 234,
            stock: 78,
            stockStatus: "in_stock",
            attributes: {
                material: "Оксфорд 600D",
                dimensions: "60x35x30 см",
                compartments: "3 + карманы",
                foldable: "Да"
            },
            specifications: [
                { name: "Материал", value: "Ткань Оксфорд 600D" },
                { name: "Размер", value: "60 x 35 x 30 см" },
                { name: "Отделения", value: "3 основных + 4 кармана" },
                { name: "Дно", value: "Водонепроницаемое" },
                { name: "В сложенном виде", value: "60 x 35 x 5 см" }
            ],
            features: [
                "Жёсткие стенки",
                "Складная конструкция",
                "Водонепроницаемое дно",
                "Ручки для переноски",
                "Регулируемые перегородки"
            ],
            tags: ["органайзер", "багажник", "хранение"],
            badges: [],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [3, 19],
            createdAt: "2024-04-15T10:00:00Z",
            updatedAt: "2024-10-01T10:00:00Z"
        },
        {
            id: 19,
            sku: "ACC-003",
            name: "Ароматизатор премиум \"Luxury Wood\"",
            slug: "aromatizator-premium-luxury-wood",
            description: "Премиальный ароматизатор с запахом дорогой древесины. Элегантный металлический корпус. Регулируемая интенсивность аромата. До 90 дней работы.",
            shortDescription: "Премиальный ароматизатор в металлическом корпусе",
            categoryId: 8,
            subcategoryId: 803,
            brandId: 16,
            price: 790,
            originalPrice: 990,
            discount: 20,
            currency: "RUB",
            images: [
                {
                    id: 22,
                    url: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800",
                    alt: "Ароматизатор Luxury Wood",
                    isMain: true
                }
            ],
            rating: 4.4,
            reviewsCount: 178,
            stock: 245,
            stockStatus: "in_stock",
            attributes: {
                scent: "Luxury Wood",
                duration: "До 90 дней",
                material: "Алюминий",
                mounting: "На дефлектор"
            },
            specifications: [
                { name: "Аромат", value: "Древесный (Luxury Wood)" },
                { name: "Срок действия", value: "До 90 дней" },
                { name: "Корпус", value: "Алюминий с анодированием" },
                { name: "Крепление", value: "Клипса на дефлектор" },
                { name: "Регулировка", value: "Интенсивность аромата" }
            ],
            features: [
                "Премиальный аромат",
                "Металлический корпус",
                "Регулируемая интенсивность",
                "Элегантный дизайн",
                "Долгое время работы"
            ],
            tags: ["ароматизатор", "запах", "салон"],
            badges: ["sale"],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [17, 18],
            createdAt: "2024-06-01T10:00:00Z",
            updatedAt: "2024-11-15T10:00:00Z"
        },
        {
            id: 20,
            sku: "ACC-004",
            name: "Чехол на руль кожаный перфорированный M",
            slug: "chehol-na-rul-kozhanyj-perforirovannyj-m",
            description: "Качественная оплётка на руль из натуральной кожи. Перфорация для вентиляции. Анатомическая форма обеспечивает удобный хват.",
            shortDescription: "Кожаная оплётка с перфорацией размер M (37-38 см)",
            categoryId: 8,
            subcategoryId: 804,
            brandId: 4,
            price: 1290,
            originalPrice: 1690,
            discount: 24,
            currency: "RUB",
            images: [
                {
                    id: 23,
                    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
                    alt: "Чехол на руль кожаный",
                    isMain: true
                }
            ],
            rating: 4.6,
            reviewsCount: 345,
            stock: 112,
            stockStatus: "in_stock",
            attributes: {
                material: "Натуральная кожа",
                size: "M (37-38 см)",
                color: "Черный",
                perforation: "Да"
            },
            specifications: [
                { name: "Материал", value: "Натуральная кожа" },
                { name: "Размер", value: "M (диаметр руля 37-38 см)" },
                { name: "Цвет", value: "Черный" },
                { name: "Перфорация", value: "Да, для вентиляции" },
                { name: "Установка", value: "Со шнуровкой" }
            ],
            features: [
                "Натуральная кожа",
                "Перфорация для рук",
                "Анатомическая форма",
                "Нитки и игла в комплекте",
                "Не скользит"
            ],
            tags: ["руль", "чехол", "кожа", "оплётка"],
            badges: ["sale"],
            isNew: false,
            isFeatured: false,
            isBestseller: false,
            relatedProducts: [4, 5],
            createdAt: "2024-03-20T10:00:00Z",
            updatedAt: "2024-11-01T10:00:00Z"
        }
    ],

    // Методы работы с данными
    
    /**
     * Получить все товары
     */
    getAll() {
        return [...this.products];
    },

    /**
     * Получить товар по ID
     */
    getById(id) {
        return this.products.find(p => p.id === parseInt(id)) || null;
    },

    /**
     * Получить товар по slug
     */
    getBySlug(slug) {
        return this.products.find(p => p.slug === slug) || null;
    },

    /**
     * Получить товары по категории
     */
    getByCategory(categoryId) {
        return this.products.filter(p => p.categoryId === parseInt(categoryId));
    },

    /**
     * Получить товары по подкатегории
     */
    getBySubcategory(subcategoryId) {
        return this.products.filter(p => p.subcategoryId === parseInt(subcategoryId));
    },

    /**
     * Получить товары по бренду
     */
    getByBrand(brandId) {
        return this.products.filter(p => p.brandId === parseInt(brandId));
    },

    /**
     * Получить избранные товары
     */
    getFeatured(limit = 8) {
        return this.products
            .filter(p => p.isFeatured)
            .slice(0, limit);
    },

    /**
     * Получить новинки
     */
    getNew(limit = 8) {
        return this.products
            .filter(p => p.isNew)
            .slice(0, limit);
    },

    /**
     * Получить бестселлеры
     */
    getBestsellers(limit = 8) {
        return this.products
            .filter(p => p.isBestseller)
            .slice(0, limit);
    },

    /**
     * Получить товары со скидкой
     */
    getOnSale(limit = 8) {
        return this.products
            .filter(p => p.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, limit);
    },

    /**
     * Поиск товаров
     */
    search(query, options = {}) {
        const {
            limit = 20,
            categoryId = null,
            minPrice = null,
            maxPrice = null,
            minRating = null,
            inStock = null,
            onSale = null,
            sortBy = 'relevance'
        } = options;

        const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 0);
        
        let results = this.products.filter(product => {
            // Поиск по названию, описанию и тегам
            const searchText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
            const matchesSearch = searchTerms.every(term => searchText.includes(term));
            
            if (!matchesSearch) return false;
            
            // Фильтр по категории
            if (categoryId && product.categoryId !== parseInt(categoryId)) return false;
            
            // Фильтр по цене
            if (minPrice && product.price < minPrice) return false;
            if (maxPrice && product.price > maxPrice) return false;
            
            // Фильтр по рейтингу
            if (minRating && product.rating < minRating) return false;
            
            // Фильтр по наличию
            if (inStock && product.stockStatus !== 'in_stock') return false;

            // Фильтр по скидке
            if (onSale && product.discount <= 0) return false;
            
            return true;
        });

        // Сортировка
        results = this.sortProducts(results, sortBy);

        return results.slice(0, limit);
    },

    /**
     * Фильтрация товаров
     */
    filter(filters = {}) {
        const {
            categoryId = null,
            subcategoryId = null,
            minPrice = null,
            maxPrice = null,
            minRating = null,
            inStock = false,
            onSale = false,
            badges = [],
            attributes = {},
            sortBy = 'popularity',
            page = 1,
            perPage = 12
        } = filters;

        let results = [...this.products];

        // Фильтр по категории
        if (categoryId) {
            results = results.filter(p => p.categoryId === parseInt(categoryId));
        }

        // Фильтр по подкатегории
        if (subcategoryId) {
            results = results.filter(p => p.subcategoryId === parseInt(subcategoryId));
        }

        // Фильтр по цене
        if (minPrice !== null) {
            results = results.filter(p => p.price >= minPrice);
        }
        if (maxPrice !== null) {
            results = results.filter(p => p.price <= maxPrice);
        }

        // Фильтр по рейтингу
        if (minRating !== null) {
            results = results.filter(p => p.rating >= minRating);
        }

        // Фильтр по наличию
        if (inStock) {
            results = results.filter(p => p.stockStatus === 'in_stock');
        }

        // Фильтр по скидке
        if (onSale) {
            results = results.filter(p => p.discount > 0);
        }

        // Фильтр по бейджам
        if (badges.length > 0) {
            results = results.filter(p => 
                badges.some(badge => p.badges.includes(badge))
            );
        }

        // Фильтр по атрибутам
        Object.entries(attributes).forEach(([key, values]) => {
            if (values.length > 0) {
                results = results.filter(p => 
                    p.attributes[key] && values.includes(p.attributes[key])
                );
            }
        });

        // Сортировка
        results = this.sortProducts(results, sortBy);

        // Пагинация
        const total = results.length;
        const safePerPage = perPage > 0 ? perPage : 12;
        const totalPages = Math.max(1, Math.ceil(total / safePerPage));
        const safePage = Math.min(Math.max(page, 1), totalPages);
        const offset = (safePage - 1) * safePerPage;
        const paginatedResults = results.slice(offset, offset + safePerPage);

        return {
            products: paginatedResults,
            pagination: {
                page: safePage,
                perPage: safePerPage,
                total,
                totalPages,
                hasNext: safePage < totalPages,
                hasPrev: safePage > 1
            }
        };
    },

    /**
     * Сортировка товаров
     */
    sortProducts(products, sortBy) {
        const sorted = [...products];

        switch (sortBy) {
            case 'price_asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'reviews':
                return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
                            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'discount':
                return sorted.sort((a, b) => b.discount - a.discount);
            case 'popularity':
            case 'relevance':
            default:
                // Сортировка по популярности (рейтинг * количество отзывов)
                return sorted.sort((a, b) => {
                    const scoreA = a.rating * Math.log(a.reviewsCount + 1);
                    const scoreB = b.rating * Math.log(b.reviewsCount + 1);
                    return scoreB - scoreA;
                });
        }
    },

    /**
     * Получить похожие товары
     */
    getRelated(productId, limit = 4) {
        const product = this.getById(productId);
        if (!product) return [];

        // Сначала берём товары из relatedProducts
        let related = product.relatedProducts
            .map(id => this.getById(id))
            .filter(p => p !== null);

        // Если не хватает, добавляем из той же категории
        if (related.length < limit) {
            const sameCategory = this.products
                .filter(p => 
                    p.categoryId === product.categoryId && 
                    p.id !== product.id &&
                    !product.relatedProducts.includes(p.id)
                )
                .slice(0, limit - related.length);
            
            related = [...related, ...sameCategory];
        }

        return related.slice(0, limit);
    },

    /**
     * Получить товары, которые часто покупают вместе
     */
    getFrequentlyBoughtTogether(productId, limit = 3) {
        const product = this.getById(productId);
        if (!product) return [];

        // Имитация: товары из той же категории с хорошим рейтингом
        return this.products
            .filter(p => 
                p.categoryId === product.categoryId && 
                p.id !== product.id &&
                p.rating >= 4.5
            )
            .sort((a, b) => b.reviewsCount - a.reviewsCount)
            .slice(0, limit);
    },

    /**
     * Получить диапазон цен
     */
    getPriceRange(categoryId = null) {
        let products = categoryId 
            ? this.getByCategory(categoryId) 
            : this.products;

        if (products.length === 0) {
            return { min: 0, max: 0 };
        }

        const prices = products.map(p => p.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    },

    /**
     * Получить доступные атрибуты для фильтрации
     */
    getAvailableAttributes(categoryId = null) {
        let products = categoryId 
            ? this.getByCategory(categoryId) 
            : this.products;

        const attributes = {};

        products.forEach(product => {
            Object.entries(product.attributes).forEach(([key, value]) => {
                if (!attributes[key]) {
                    attributes[key] = new Set();
                }
                attributes[key].add(value);
            });
        });

        // Преобразуем Set в массивы
        const result = {};
        Object.entries(attributes).forEach(([key, values]) => {
            result[key] = Array.from(values).sort();
        });

        return result;
    },

    /**
     * Получить количество товаров по брендам в категории
     */
    getBrandCounts(categoryId = null) {
        let products = categoryId 
            ? this.getByCategory(categoryId) 
            : this.products;

        const counts = {};
        products.forEach(product => {
            counts[product.brandId] = (counts[product.brandId] || 0) + 1;
        });

        return counts;
    },

    /**
     * Проверить наличие товара
     */
    checkStock(productId, quantity = 1) {
        const product = this.getById(productId);
        if (!product) return { available: false, message: 'Товар не найден' };

        if (product.stockStatus === 'out_of_stock' || product.stock === 0) {
            return { available: false, message: 'Нет в наличии' };
        }

        if (product.stock < quantity) {
            return { 
                available: false, 
                message: `Доступно только ${product.stock} шт.`,
                maxQuantity: product.stock
            };
        }

        return { available: true, message: 'В наличии' };
    },

    /**
     * Получить поисковые подсказки
     */
    getSearchSuggestions(query, limit = 8) {
        if (!query || query.length < 2) return [];

        const queryLower = query.toLowerCase();
        const suggestions = [];

        // Поиск по названиям товаров
        this.products.forEach(product => {
            if (product.name.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'product',
                    id: product.id,
                    text: product.name,
                    image: product.images[0]?.url,
                    price: product.price,
                    category: product.categoryId
                });
            }
        });

        // Поиск по тегам
        const tagSuggestions = new Set();
        this.products.forEach(product => {
            product.tags.forEach(tag => {
                if (tag.toLowerCase().includes(queryLower)) {
                    tagSuggestions.add(tag);
                }
            });
        });

        tagSuggestions.forEach(tag => {
            suggestions.push({
                type: 'tag',
                text: tag
            });
        });

        // Сортируем: сначала точные совпадения в начале
        suggestions.sort((a, b) => {
            const aStarts = a.text.toLowerCase().startsWith(queryLower);
            const bStarts = b.text.toLowerCase().startsWith(queryLower);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return 0;
        });

        return suggestions.slice(0, limit);
    }
};

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsDB;
}
