// Placeholder: favorites.js
/* ========================================
   AutoNova - Favorites Module
   Модуль избранного
   ======================================== */

const Favorites = {
    /**
     * Инициализация модуля
     */
    init() {
        this.bindEvents();
        this.updateUI();
        
        console.log('Favorites module initialized');
    },

    /**
     * Привязка событий
     */
    bindEvents() {
        document.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('[data-toggle-favorite]');
            if (toggleBtn) {
                e.preventDefault();
                e.stopImmediatePropagation();
                const productId = parseInt(toggleBtn.dataset.toggleFavorite);
                this.toggle(productId);
            }
        });

        // Слушаем изменения в других вкладках
        window.addEventListener('storage', (e) => {
            if (e.key === Storage.KEYS.FAVORITES) {
                this.updateUI();
            }
        });
    },

    /**
     * Добавить/удалить из избранного
     */
    toggle(productId) {
        const isFavorite = Storage.isFavorite(productId);

        if (isFavorite) {
            this.remove(productId);
        } else {
            this.add(productId);
        }
    },

    /**
     * Добавить в избранное
     */
    add(productId) {
        const product = ProductsDB.getById(productId);
        if (!product) return false;

        Storage.addToFavorites(productId);
        this.updateUI();

        // Показываем уведомление
        if (typeof Notifications !== 'undefined') {
            Notifications.show({
                type: 'success',
                message: 'Товар добавлен в избранное',
                action: {
                    text: 'Перейти',
                    url: 'favorites.html'
                }
            });
        }

        // Отправляем событие
        window.dispatchEvent(new CustomEvent('favorites:add', {
            detail: { productId, product }
        }));

        return true;
    },

    /**
     * Удалить из избранного
     */
    remove(productId) {
        Storage.removeFromFavorites(productId);
        this.updateUI();

        // Показываем уведомление
        if (typeof Notifications !== 'undefined') {
            Notifications.show({
                type: 'info',
                message: 'Товар удалён из избранного'
            });
        }

        // Отправляем событие
        window.dispatchEvent(new CustomEvent('favorites:remove', {
            detail: { productId }
        }));

        return true;
    },

    /**
     * Получить все избранные товары
     */
    getAll() {
        const ids = Storage.getFavorites();
        return ids.map(id => ProductsDB.getById(id)).filter(p => p !== null);
    },

    /**
     * Получить количество
     */
    getCount() {
        return Storage.getFavorites().length;
    },

    /**
     * Проверить, в избранном ли товар
     */
    isFavorite(productId) {
        return Storage.isFavorite(productId);
    },

    /**
     * Очистить избранное
     */
    clear() {
        Storage.setFavorites([]);
        this.updateUI();

        window.dispatchEvent(new CustomEvent('favorites:clear'));
    },

    /**
     * Обновление UI
     */
    updateUI() {
        this.updateCount();
        this.updateButtons();
        this.updateFavoritesPage();
    },

    /**
     * Обновить счётчик в хедере
     */
    updateCount() {
        const count = this.getCount();
        const countElements = document.querySelectorAll('[data-favorites-count]');
        
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });
    },

    /**
     * Обновить состояние кнопок
     */
    updateButtons() {
        const favorites = Storage.getFavorites();

        document.querySelectorAll('[data-toggle-favorite]').forEach(btn => {
            const productId = parseInt(btn.dataset.toggleFavorite);
            const isFavorite = favorites.includes(productId);
            
            btn.classList.toggle('active', isFavorite);
            
            // Обновляем иконку
            const svg = btn.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', isFavorite ? 'currentColor' : 'none');
            }
            
            // Обновляем title
            btn.title = isFavorite ? 'Удалить из избранного' : 'В избранное';
        });
    },

    /**
     * Обновить страницу избранного
     */
    updateFavoritesPage() {
        const container = document.querySelector('.favorites-grid');
        if (!container) return;

        const products = this.getAll();

        if (products.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <h2 class="empty-state__title">В избранном пока пусто</h2>
                    <p class="empty-state__description">Добавляйте товары в избранное, чтобы не потерять их</p>
                    <a href="catalog.html" class="btn btn--primary">Перейти в каталог</a>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.renderProductCard(product)).join('');
    },

    /**
     * Рендер карточки товара для страницы избранного
     */
    renderProductCard(product) {
        const inCart = Cart.hasItem(product.id);
        
        let availabilityClass = 'out-of-stock';
        let availabilityText = 'Нет в наличии';
        
        if (product.stock > 10) {
            availabilityClass = 'in-stock';
            availabilityText = 'В наличии';
        } else if (product.stock > 0) {
            availabilityClass = 'low-stock';
            availabilityText = `Осталось ${product.stock} шт`;
        }

        return `
            <div class="favorite-card" data-product-id="${product.id}">
                <div class="favorite-card__top">
                    <a href="product.html?id=${product.id}" class="favorite-card__image">
                        <img src="${product.images[0]?.url || ''}" 
                             alt="${product.name}" 
                             loading="lazy">
                    </a>
                    <div class="favorite-card__actions">
                        <button class="favorite-card__action favorite-card__action--remove active" 
                                data-toggle-favorite="${product.id}"
                                title="Удалить из избранного">
                            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="favorite-card__content">
                    <div class="favorite-card__category">${product.category || 'Аксессуары'}</div>
                    <a href="product.html?id=${product.id}" class="favorite-card__title">
                        ${product.name}
                    </a>
                    <div class="favorite-card__rating">
                        <div class="favorite-card__stars">
                            ${Formatters.ratingStars(product.rating)}
                        </div>
                        <span class="favorite-card__reviews">${product.reviewsCount} отзывов</span>
                    </div>
                    <div class="favorite-card__availability favorite-card__availability--${availabilityClass}">
                        <div class="favorite-card__availability-dot"></div>
                        <span class="favorite-card__availability-text">${availabilityText}</span>
                    </div>
                    <div class="favorite-card__price">
                        <span class="favorite-card__price-current">${Formatters.price(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="favorite-card__price-original">${Formatters.price(product.originalPrice)}</span>
                            <span class="favorite-card__savings">- ${Formatters.price(product.originalPrice - product.price)}</span>
                        ` : ''}
                    </div>
                </div>
                <div class="favorite-card__footer">
                    <div class="product-card__cart-actions">
                        <button type="button" class="btn btn--primary btn--block ${inCart ? 'btn--success' : ''}" 
                                data-add-to-cart="${product.id}">
                            ${inCart ? 'В корзине' : 'В корзину'}
                        </button>
                        <button type="button" class="btn btn--outline btn--block cart-remove-inline" data-cart-remove="${product.id}" ${inCart ? '' : 'hidden'} aria-hidden="${inCart ? 'false' : 'true'}">Убрать из корзины</button>
                    </div>
                </div>
            </div>
        `;
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Favorites;
}
