// Placeholder: helpers.js
/* ========================================
   AutoNova - Helper Utilities
   Вспомогательные функции
   ======================================== */

const Helpers = {
    /**
     * Форматирование цены
     */
    formatPrice(price, currency = 'RUB') {
        const formatter = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(price);
    },

    /**
     * Форматирование числа с разделителями
     */
    formatNumber(number) {
        return new Intl.NumberFormat('ru-RU').format(number);
    },

    /**
     * Склонение слов
     */
    pluralize(count, words) {
        // words = ['товар', 'товара', 'товаров']
        const cases = [2, 0, 1, 1, 1, 2];
        const index = (count % 100 > 4 && count % 100 < 20) 
            ? 2 
            : cases[Math.min(count % 10, 5)];
        return words[index];
    },

    /**
     * Форматирование даты
     */
    formatDate(dateString, options = {}) {
        const {
            format = 'long', // 'long', 'short', 'relative'
            locale = 'ru-RU'
        } = options;

        const date = new Date(dateString);
        const now = new Date();

        if (format === 'relative') {
            const diff = now - date;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 30) {
                return date.toLocaleDateString(locale, { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                });
            } else if (days > 0) {
                return `${days} ${this.pluralize(days, ['день', 'дня', 'дней'])} назад`;
            } else if (hours > 0) {
                return `${hours} ${this.pluralize(hours, ['час', 'часа', 'часов'])} назад`;
            } else if (minutes > 0) {
                return `${minutes} ${this.pluralize(minutes, ['минуту', 'минуты', 'минут'])} назад`;
            } else {
                return 'Только что';
            }
        }

        if (format === 'short') {
            return date.toLocaleDateString(locale);
        }

        return date.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    },

    /**
     * Генерация уникального ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Debounce функция
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle функция
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Глубокое копирование объекта
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof Array) {
            return obj.map(item => this.deepClone(item));
        }
        
        if (typeof obj === 'object') {
            const cloned = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cloned[key] = this.deepClone(obj[key]);
                }
            }
            return cloned;
        }
    },

    /**
     * Получение параметров URL
     */
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },

    /**
     * Установка параметров URL без перезагрузки
     */
    setUrlParams(params, replace = false) {
        const url = new URL(window.location.href);
        
        if (replace) {
            url.search = '';
        }
        
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }
        });
        
        if (replace) {
            window.history.replaceState({}, '', url.toString());
        } else {
            window.history.pushState({}, '', url.toString());
        }
    },

    /**
     * Транслитерация для URL
     */
    slugify(text) {
        const ru = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
            'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
            'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
            'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        
        return text
            .toLowerCase()
            .split('')
            .map(char => ru[char] || char)
            .join('')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /**
     * Проверка мобильного устройства
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Проверка touch-устройства
     */
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    /**
     * Получение размера viewport
     */
    getViewport() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
    },

    /**
     * Проверка breakpoint
     */
    isBreakpoint(breakpoint) {
        const breakpoints = {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400
        };
        
        return this.getViewport().width >= (breakpoints[breakpoint] || 0);
    },

    /**
     * Scroll to element
     */
    scrollTo(element, offset = 0, behavior = 'smooth') {
        let target;
        
        if (typeof element === 'string') {
            target = document.querySelector(element);
        } else {
            target = element;
        }
        
        if (!target) return;
        
        const headerHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')) || 0;
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: behavior
        });
    },

    /**
     * Копирование в буфер обмена
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (e) {
                document.body.removeChild(textarea);
                return false;
            }
        }
    },

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Truncate text
     */
    truncate(text, length = 100, suffix = '...') {
        if (text.length <= length) return text;
        return text.substring(0, length).trim() + suffix;
    },

    /**
     * Highlight search query in text
     */
    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${this.escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    },

    /**
     * Escape RegExp special characters
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Создание элемента из HTML строки
     */
    createElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    },

    /**
     * Ожидание (Promise-based setTimeout)
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Генерация случайного числа в диапазоне
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Генерация случайного цвета
     */
    randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    },

    /**
     * Проверка email
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Проверка телефона (российский формат)
     */
    isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8'));
    },

    /**
     * Форматирование телефона
     */
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length !== 11) return phone;
        
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    },

    /**
     * Получение cookie
     */
    getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    /**
     * Установка cookie
     */
    setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        for (const optionKey in options) {
            updatedCookie += '; ' + optionKey;
            const optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }

        document.cookie = updatedCookie;
    },

    /**
     * Удаление cookie
     */
    deleteCookie(name) {
        this.setCookie(name, '', { 'max-age': -1 });
    },

    /**
     * Проверка поддержки localStorage
     */
    isLocalStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Безопасное получение из localStorage
     */
    getFromStorage(key, defaultValue = null) {
        if (!this.isLocalStorageAvailable()) return defaultValue;
        
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    /**
     * Безопасная запись в localStorage
     */
    setToStorage(key, value) {
        if (!this.isLocalStorageAvailable()) return false;
        
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Удаление из localStorage
     */
    removeFromStorage(key) {
        if (!this.isLocalStorageAvailable()) return false;
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Группировка массива по ключу
     */
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const group = item[key];
            if (!result[group]) {
                result[group] = [];
            }
            result[group].push(item);
            return result;
        }, {});
    },

    /**
     * Уникальные значения массива
     */
    unique(array, key = null) {
        if (key) {
            const seen = new Set();
            return array.filter(item => {
                const k = item[key];
                return seen.has(k) ? false : seen.add(k);
            });
        }
        return [...new Set(array)];
    },

    /**
     * Сортировка массива объектов
     */
    sortBy(array, key, direction = 'asc') {
        return [...array].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];
            
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            if (direction === 'asc') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });
    },

    /**
     * Chunk array
     */
    chunk(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    },

    /**
     * Flatten array
     */
    flatten(array, depth = 1) {
        return depth > 0
            ? array.reduce((acc, val) => 
                acc.concat(Array.isArray(val) ? this.flatten(val, depth - 1) : val), [])
            : array.slice();
    },

    /**
     * Pick properties from object
     */
    pick(object, keys) {
        return keys.reduce((result, key) => {
            if (object.hasOwnProperty(key)) {
                result[key] = object[key];
            }
            return result;
        }, {});
    },

    /**
     * Omit properties from object
     */
    omit(object, keys) {
        return Object.keys(object)
            .filter(key => !keys.includes(key))
            .reduce((result, key) => {
                result[key] = object[key];
                return result;
            }, {});
    },

    /**
     * Merge objects deep
     */
    mergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    },

    /**
     * Check if value is object
     */
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    },

    /**
     * Check if object is empty
     */
    isEmpty(obj) {
        if (obj == null) return true;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
        if (typeof obj === 'object') return Object.keys(obj).length === 0;
        return false;
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Helpers;
}
