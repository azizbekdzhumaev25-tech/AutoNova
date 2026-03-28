// Placeholder: formatters.js
/* ========================================
   AutoNova - Formatters
   Функции форматирования данных
   ======================================== */

const Formatters = {
    /**
     * Форматирование цены
     */
    price(amount, options = {}) {
        const {
            currency = 'RUB',
            locale = 'ru-RU',
            showCurrency = true,
            decimals = 0
        } = options;

        if (showCurrency) {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(amount);
        }

        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(amount);
    },

    /**
     * Форматирование числа с разделителями
     */
    number(value, decimals = 0) {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    },

    /**
     * Форматирование процентов
     */
    percent(value, decimals = 0) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    },

    /**
     * Склонение числительных
     */
    pluralize(count, forms) {
        // forms = ['товар', 'товара', 'товаров']
        const cases = [2, 0, 1, 1, 1, 2];
        const index = (count % 100 > 4 && count % 100 < 20) 
            ? 2 
            : cases[Math.min(count % 10, 5)];
        return `${count} ${forms[index]}`;
    },

    /**
     * Форматирование даты
     */
    date(dateInput, format = 'long') {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        
        const formats = {
            short: { day: '2-digit', month: '2-digit', year: 'numeric' },
            medium: { day: 'numeric', month: 'short', year: 'numeric' },
            long: { day: 'numeric', month: 'long', year: 'numeric' },
            full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        };

        return date.toLocaleDateString('ru-RU', formats[format] || formats.long);
    },

    /**
     * Форматирование времени
     */
    time(dateInput, showSeconds = false) {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: showSeconds ? '2-digit' : undefined
        });
    },

    /**
     * Форматирование даты и времени
     */
    dateTime(dateInput, options = {}) {
        const { dateFormat = 'medium', showSeconds = false } = options;
        return `${this.date(dateInput, dateFormat)}, ${this.time(dateInput, showSeconds)}`;
    },

    /**
     * Относительное время
     */
    relativeTime(dateInput) {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        const now = new Date();
        const diff = now - date;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return this.pluralize(years, ['год', 'года', 'лет']) + ' назад';
        }
        if (months > 0) {
            return this.pluralize(months, ['месяц', 'месяца', 'месяцев']) + ' назад';
        }
        if (weeks > 0) {
            return this.pluralize(weeks, ['неделю', 'недели', 'недель']) + ' назад';
        }
        if (days > 0) {
            if (days === 1) return 'Вчера';
            return this.pluralize(days, ['день', 'дня', 'дней']) + ' назад';
        }
        if (hours > 0) {
            return this.pluralize(hours, ['час', 'часа', 'часов']) + ' назад';
        }
        if (minutes > 0) {
            return this.pluralize(minutes, ['минуту', 'минуты', 'минут']) + ' назад';
        }
        
        return 'Только что';
    },

    /**
     * Форматирование телефона
     */
    phone(phone) {
        const cleaned = String(phone).replace(/\D/g, '');
        
        if (cleaned.length === 11) {
            return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
        }
        
        if (cleaned.length === 10) {
            return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
        }
        
        return phone;
    },

    /**
     * Маскирование телефона
     */
    maskPhone(phone) {
        const cleaned = String(phone).replace(/\D/g, '');
        if (cleaned.length < 10) return phone;
        
        return `+7 (${cleaned.slice(1, 4)}) ***-**-${cleaned.slice(-2)}`;
    },

    /**
     * Форматирование номера карты
     */
    cardNumber(number, masked = false) {
        const cleaned = String(number).replace(/\D/g, '');
        
        if (masked) {
            return `**** **** **** ${cleaned.slice(-4)}`;
        }
        
        return cleaned.match(/.{1,4}/g)?.join(' ') || number;
    },

    /**
     * Форматирование размера файла
     */
    fileSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Байт';

        const k = 1024;
        const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    },

    /**
     * Форматирование веса
     */
    weight(grams, precision = 0) {
        if (grams >= 1000) {
            return this.number(grams / 1000, precision) + ' кг';
        }
        return this.number(grams, 0) + ' г';
    },

    /**
     * Форматирование размеров
     */
    dimensions(width, height, depth, unit = 'см') {
        return `${width} × ${height} × ${depth} ${unit}`;
    },

    /**
     * Форматирование рейтинга
     */
    rating(value, maxValue = 5) {
        return `${value.toFixed(1)} из ${maxValue}`;
    },

    /**
     * Генерация звёзд рейтинга (HTML)
     */
    ratingStars(value, maxValue = 5) {
        const fullStars = Math.floor(value);
        const hasHalfStar = value - fullStars >= 0.5;
        const emptyStars = maxValue - fullStars - (hasHalfStar ? 1 : 0);

        let html = '';

        // Полные звёзды
        for (let i = 0; i < fullStars; i++) {
            html += `<svg class="rating__star rating__star--filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>`;
        }

        // Половина звезды
        if (hasHalfStar) {
            html += `<svg class="rating__star rating__star--half" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="half-star-${value}">
                        <stop offset="50%" stop-color="currentColor"/>
                        <stop offset="50%" stop-color="#e0e0e0"/>
                    </linearGradient>
                </defs>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half-star-${value})"/>
            </svg>`;
        }

        // Пустые звёзды
        for (let i = 0; i < emptyStars; i++) {
            html += `<svg class="rating__star rating__star--empty" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e0e0e0"/></svg>`;
        }

        return html;
    },

    /**
     * Форматирование статуса наличия
     */
    stockStatus(status, quantity = 0) {
        const statuses = {
            'in_stock': { text: 'В наличии', class: 'success' },
            'low_stock': { text: `Осталось ${quantity} шт.`, class: 'warning' },
            'out_of_stock': { text: 'Нет в наличии', class: 'error' },
            'preorder': { text: 'Предзаказ', class: 'info' }
        };

        return statuses[status] || { text: status, class: '' };
    },

    /**
     * Форматирование статуса заказа
     */
    orderStatus(status) {
        const statuses = {
            'pending': { text: 'Ожидает подтверждения', class: 'warning', icon: 'clock' },
            'confirmed': { text: 'Подтверждён', class: 'info', icon: 'check' },
            'processing': { text: 'Собирается', class: 'info', icon: 'package' },
            'shipped': { text: 'Отправлен', class: 'info', icon: 'truck' },
            'delivered': { text: 'Доставлен', class: 'success', icon: 'check-circle' },
            'cancelled': { text: 'Отменён', class: 'error', icon: 'x-circle' },
            'refunded': { text: 'Возврат', class: 'error', icon: 'rotate-ccw' }
        };

        return statuses[status] || { text: status, class: '', icon: 'help-circle' };
    },

    /**
     * Форматирование скидки
     */
    discount(originalPrice, salePrice) {
        const discount = Math.round((1 - salePrice / originalPrice) * 100);
        return `-${discount}%`;
    },

    /**
     * Экономия
     */
    savings(originalPrice, salePrice) {
        const savings = originalPrice - salePrice;
        return this.price(savings);
    },

    /**
     * Форматирование ИНН
     */
    inn(value) {
        const cleaned = String(value).replace(/\D/g, '');
        return cleaned;
    },

    /**
     * Форматирование КПП
     */
    kpp(value) {
        const cleaned = String(value).replace(/\D/g, '');
        return cleaned;
    },

    /**
     * Форматирование ОГРН
     */
    ogrn(value) {
        const cleaned = String(value).replace(/\D/g, '');
        return cleaned;
    },

    /**
     * Форматирование адреса
     */
    address(addressObj) {
        const parts = [];
        
        if (addressObj.postalCode) parts.push(addressObj.postalCode);
        if (addressObj.country) parts.push(addressObj.country);
        if (addressObj.region) parts.push(addressObj.region);
        if (addressObj.city) parts.push('г. ' + addressObj.city);
        if (addressObj.street) parts.push(addressObj.street);
        if (addressObj.building) parts.push('д. ' + addressObj.building);
        if (addressObj.apartment) parts.push('кв. ' + addressObj.apartment);
        
        return parts.join(', ');
    },

    /**
     * Краткий адрес
     */
    shortAddress(addressObj) {
        const parts = [];
        
        if (addressObj.city) parts.push(addressObj.city);
        if (addressObj.street) parts.push(addressObj.street);
        if (addressObj.building) parts.push('д. ' + addressObj.building);
        
        return parts.join(', ');
    },

    /**
     * ФИО
     */
    fullName(firstName, lastName, middleName = '') {
        return [lastName, firstName, middleName].filter(Boolean).join(' ');
    },

    /**
     * Инициалы
     */
    initials(firstName, lastName) {
        const first = firstName ? firstName.charAt(0).toUpperCase() : '';
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return first + last;
    },

    /**
     * Маскирование email
     */
    maskEmail(email) {
        const [name, domain] = email.split('@');
        if (name.length <= 2) {
            return `${name[0]}***@${domain}`;
        }
        return `${name.slice(0, 2)}***@${domain}`;
    },

    /**
     * Номер заказа
     */
    orderNumber(id) {
        return String(id).padStart(8, '0');
    },

    /**
     * Артикул товара
     */
    sku(sku) {
        return String(sku).toUpperCase();
    },

    /**
     * HTML в текст
     */
    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    },

    /**
     * Обрезка текста
     */
    truncate(text, maxLength = 100, suffix = '...') {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - suffix.length).trim() + suffix;
    },

    /**
     * Первая буква заглавная
     */
    capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    /**
     * Каждое слово с заглавной
     */
    titleCase(text) {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Formatters;
}