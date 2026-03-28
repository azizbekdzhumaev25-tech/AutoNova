// Placeholder: storage.js
/* ========================================
   AutoNova - Storage Manager
   Управление localStorage и sessionStorage
   ======================================== */

const Storage = {
    // Ключи для хранения данных
    KEYS: {
        CART: 'autonova_cart',
        FAVORITES: 'autonova_favorites',
        RECENTLY_VIEWED: 'autonova_recently_viewed',
        USER: 'autonova_user',
        CHECKOUT: 'autonova_checkout',
        SEARCH_HISTORY: 'autonova_search_history',
        SETTINGS: 'autonova_settings',
        COMPARE: 'autonova_compare'
    },

    /**
     * Проверка доступности localStorage
     */
    isAvailable() {
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
     * Получить данные из localStorage
     */
    get(key, defaultValue = null) {
        if (!this.isAvailable()) return defaultValue;

        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            
            const parsed = JSON.parse(item);
            
            // Проверяем срок действия, если есть
            if (parsed && parsed._expires && Date.now() > parsed._expires) {
                this.remove(key);
                return defaultValue;
            }
            
            return parsed._value !== undefined ? parsed._value : parsed;
        } catch (e) {
            console.error('Storage.get error:', e);
            return defaultValue;
        }
    },

    /**
     * Сохранить данные в localStorage
     */
    set(key, value, expiresIn = null) {
        if (!this.isAvailable()) return false;

        try {
            let dataToStore;
            
            if (expiresIn) {
                dataToStore = {
                    _value: value,
                    _expires: Date.now() + expiresIn
                };
            } else {
                dataToStore = value;
            }
            
            localStorage.setItem(key, JSON.stringify(dataToStore));
            
            // Отправляем событие об изменении
            window.dispatchEvent(new CustomEvent('storage:change', {
                detail: { key, value }
            }));
            
            return true;
        } catch (e) {
            console.error('Storage.set error:', e);
            
            // Если хранилище переполнено, пытаемся освободить место
            if (e.name === 'QuotaExceededError') {
                this.cleanup();
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (e2) {
                    return false;
                }
            }
            return false;
        }
    },

    /**
     * Удалить данные из localStorage
     */
    remove(key) {
        if (!this.isAvailable()) return false;

        try {
            localStorage.removeItem(key);
            
            window.dispatchEvent(new CustomEvent('storage:change', {
                detail: { key, value: null }
            }));
            
            return true;
        } catch (e) {
            console.error('Storage.remove error:', e);
            return false;
        }
    },

    /**
     * Очистить всё хранилище
     */
    clear() {
        if (!this.isAvailable()) return false;

        try {
            // Удаляем только ключи нашего приложения
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            
            window.dispatchEvent(new CustomEvent('storage:clear'));
            
            return true;
        } catch (e) {
            console.error('Storage.clear error:', e);
            return false;
        }
    },

    /**
     * Очистка устаревших данных
     */
    cleanup() {
        if (!this.isAvailable()) return;

        try {
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item && item._expires && Date.now() > item._expires) {
                        keysToRemove.push(key);
                    }
                } catch (e) {
                    // Игнорируем ошибки парсинга
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (e) {
            console.error('Storage.cleanup error:', e);
        }
    },

    /**
     * Получить размер использованного хранилища
     */
    getUsedSpace() {
        if (!this.isAvailable()) return 0;

        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            total += key.length + value.length;
        }
        return total * 2; // UTF-16
    },

    // ===== Специфичные методы для корзины =====

    /**
     * Получить корзину
     */
    getCart() {
        return this.get(this.KEYS.CART, {
            items: [],
            updatedAt: null
        });
    },

    /**
     * Сохранить корзину
     */
    setCart(cart) {
        cart.updatedAt = Date.now();
        return this.set(this.KEYS.CART, cart);
    },

    // ===== Специфичные методы для избранного =====

    /**
     * Получить избранное
     */
    getFavorites() {
        return this.get(this.KEYS.FAVORITES, []);
    },

    /**
     * Сохранить избранное
     */
    setFavorites(favorites) {
        return this.set(this.KEYS.FAVORITES, favorites);
    },

    /**
     * Добавить в избранное
     */
    addToFavorites(productId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            this.setFavorites(favorites);
        }
        return favorites;
    },

    /**
     * Удалить из избранного
     */
    removeFromFavorites(productId) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(id => id !== productId);
        this.setFavorites(favorites);
        return favorites;
    },

    /**
     * Проверить, в избранном ли товар
     */
    isFavorite(productId) {
        return this.getFavorites().includes(productId);
    },

    // ===== Недавно просмотренные =====

    /**
     * Получить недавно просмотренные
     */
    getRecentlyViewed() {
        return this.get(this.KEYS.RECENTLY_VIEWED, []);
    },

    /**
     * Добавить в недавно просмотренные
     */
    addToRecentlyViewed(productId, maxItems = 20) {
        let items = this.getRecentlyViewed();
        
        // Удаляем, если уже есть
        items = items.filter(id => id !== productId);
        
        // Добавляем в начало
        items.unshift(productId);
        
        // Ограничиваем количество
        items = items.slice(0, maxItems);
        
        this.set(this.KEYS.RECENTLY_VIEWED, items);
        return items;
    },

    // ===== История поиска =====

    /**
     * Получить историю поиска
     */
    getSearchHistory() {
        return this.get(this.KEYS.SEARCH_HISTORY, []);
    },

    /**
     * Добавить в историю поиска
     */
    addToSearchHistory(query, maxItems = 10) {
        let history = this.getSearchHistory();
        
        // Удаляем дубликаты
        history = history.filter(item => item.toLowerCase() !== query.toLowerCase());
        
        // Добавляем в начало
        history.unshift(query);
        
        // Ограничиваем
        history = history.slice(0, maxItems);
        
        this.set(this.KEYS.SEARCH_HISTORY, history);
        return history;
    },

    /**
     * Очистить историю поиска
     */
    clearSearchHistory() {
        return this.remove(this.KEYS.SEARCH_HISTORY);
    },

    // ===== Данные оформления заказа =====

    /**
     * Получить данные checkout
     */
    getCheckoutData() {
        return this.get(this.KEYS.CHECKOUT, {});
    },

    /**
     * Сохранить данные checkout
     */
    setCheckoutData(data) {
        return this.set(this.KEYS.CHECKOUT, data);
    },

    /**
     * Очистить данные checkout
     */
    clearCheckoutData() {
        return this.remove(this.KEYS.CHECKOUT);
    },

    // ===== Настройки =====

    /**
     * Получить настройки
     */
    getSettings() {
        return this.get(this.KEYS.SETTINGS, {
            theme: 'light',
            currency: 'RUB',
            viewMode: 'grid'
        });
    },

    /**
     * Сохранить настройки
     */
    setSettings(settings) {
        const current = this.getSettings();
        return this.set(this.KEYS.SETTINGS, { ...current, ...settings });
    },

    // ===== Сравнение товаров =====

    /**
     * Получить товары для сравнения
     */
    getCompare() {
        return this.get(this.KEYS.COMPARE, []);
    },

    /**
     * Добавить в сравнение
     */
    addToCompare(productId, maxItems = 4) {
        let items = this.getCompare();
        
        if (items.length >= maxItems) {
            return { success: false, message: `Максимум ${maxItems} товара для сравнения` };
        }
        
        if (!items.includes(productId)) {
            items.push(productId);
            this.set(this.KEYS.COMPARE, items);
        }
        
        return { success: true, items };
    },

    /**
     * Удалить из сравнения
     */
    removeFromCompare(productId) {
        let items = this.getCompare();
        items = items.filter(id => id !== productId);
        this.set(this.KEYS.COMPARE, items);
        return items;
    },

    /**
     * Очистить сравнение
     */
    clearCompare() {
        return this.remove(this.KEYS.COMPARE);
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}