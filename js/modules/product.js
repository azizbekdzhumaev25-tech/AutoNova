// Placeholder: product.js
/* ========================================
   AutoNova - Product Page Module
   Модуль страницы товара
   ======================================== */

const ProductPage = {
    // Текущий товар
    product: null,
    
    // Выбранные опции
    selectedOptions: {
        color: null,
        size: null,
        quantity: 1
    },

    // Текущее изображение
    currentImageIndex: 0,

    /**
     * Инициализация модуля
     */
    init() {
        const productId = this.getProductIdFromUrl();
        
        if (!productId) {
            this.showError('Товар не найден');
            return;
        }

        this.product = ProductsDB.getById(productId);
        
        if (!this.product) {
            this.showError('Товар не найден');
            return;
        }

        // Добавляем в недавно просмотренные
        Storage.addToRecentlyViewed(productId);

        // Рендерим страницу
        this.render();
        this.bindEvents();

        console.log('Product page initialized:', this.product.name);
    },

    /**
     * Получить ID товара из URL
     */
    getProductIdFromUrl() {
        const params = Helpers.getUrlParams();
        return parseInt(params.id) || null;
    },

    /**
     * Показать ошибку
     */
    showError(message) {
        const container = document.querySelector('.product-page');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <h2 class="empty-state__title">${message}</h2>
                    <p class="empty-state__description">Возможно, товар был удалён или ссылка некорректна</p>
                    <a href="catalog.html" class="btn btn--primary">Перейти в каталог</a>
                </div>
            `;
        }
    },

    /**
     * Рендер страницы товара
     */
    render() {
        // Обновляем title
        document.title = `${this.product.name} - AutoNova`;

        // Рендерим компоненты
        this.renderGallery();
        this.renderInfo();
        this.renderTabs();
        this.renderRelated();
        this.renderRecentlyViewed();
        this.updateBreadcrumbs();
    },

    /**
     * Рендер галереи
     */
    renderGallery() {
        const mainImage = document.querySelector('.product-gallery__main-image');
        const thumbnails = document.querySelector('.product-gallery__thumbnails');
        const badges = document.querySelector('.product-gallery__badges');

        if (mainImage && this.product.images.length > 0) {
            mainImage.src = this.product.images[0].url;
            mainImage.alt = this.product.images[0].alt || this.product.name;
        }

        // Бейджи
        if (badges && this.product.badges) {
            badges.innerHTML = this.product.badges.map(badge => {
                let badgeClass = '', badgeText = '';
                switch (badge) {
                    case 'sale':
                        badgeClass = 'product-gallery__badge--sale';
                        badgeText = `-${this.product.discount}%`;
                        break;
                    case 'new':
                        badgeClass = 'product-gallery__badge--new';
                        badgeText = 'Новинка';
                        break;
                    case 'bestseller':
                        badgeClass = 'product-gallery__badge--bestseller';
                        badgeText = 'Хит продаж';
                        break;
                }
                return `<span class="product-gallery__badge ${badgeClass}">${badgeText}</span>`;
            }).join('');
        }

        // Миниатюры
        if (thumbnails && this.product.images.length > 1) {
            thumbnails.innerHTML = this.product.images.map((img, index) => `
                <button class="product-gallery__thumbnail ${index === 0 ? 'active' : ''}" 
                        data-image-index="${index}">
                    <img src="${img.url}" alt="${img.alt || ''}">
                </button>
            `).join('');
        }

        // Кнопка избранного в галерее
        const favoriteBtn = document.querySelector('.product-gallery__actions [data-toggle-favorite]');
        if (favoriteBtn) {
            favoriteBtn.dataset.toggleFavorite = this.product.id;
            if (Storage.isFavorite(this.product.id)) {
                favoriteBtn.classList.add('active');
                favoriteBtn.querySelector('svg').setAttribute('fill', 'currentColor');
            }
        }
    },

    /**
     * Рендер информации о товаре
     */
    renderInfo() {
        // Категория
        const categoryEl = document.querySelector('.product-info__category');
        if (categoryEl) {
            const category = CategoriesDB.getById(this.product.categoryId);
            if (category) {
                categoryEl.textContent = category.name;
                categoryEl.href = `catalog.html?category=${category.slug}`;
            }
        }

        // Название
        const titleEl = document.querySelector('.product-info__title');
        if (titleEl) titleEl.textContent = this.product.name;

        // Артикул
        const skuEl = document.querySelector('.product-info__sku span');
        if (skuEl) skuEl.textContent = this.product.sku;

        // Рейтинг
        this.renderRating();

        // Цена
        this.renderPrice();

        // Наличие
        this.renderAvailability();

        // Описание
        const descEl = document.querySelector('.product-info__description p');
        if (descEl) descEl.textContent = this.product.shortDescription || this.product.description;

        // Преимущества
        this.renderFeatures();

        // Кнопки
        this.updateButtons();
    },

    /**
     * Рендер рейтинга
     */
    renderRating() {
        const starsEl = document.querySelector('.product-info__rating .product-rating__stars');
        const valueEl = document.querySelector('.product-rating__value');
        const countEl = document.querySelector('.product-rating__count');

        if (starsEl) {
            starsEl.innerHTML = Formatters.ratingStars(this.product.rating);
        }

        if (valueEl) valueEl.textContent = this.product.rating;
        if (countEl) countEl.textContent = `${this.product.reviewsCount} отзывов`;
    },

    /**
     * Рендер цены
     */
    renderPrice() {
        const currentEl = document.querySelector('.product-price__current');
        const originalEl = document.querySelector('.product-price__original');
        const discountEl = document.querySelector('.product-price__discount');

        if (currentEl) currentEl.textContent = Formatters.price(this.product.price);

        if (originalEl) {
            if (this.product.originalPrice) {
                originalEl.textContent = Formatters.price(this.product.originalPrice);
                originalEl.style.display = '';
            } else {
                originalEl.style.display = 'none';
            }
        }

        if (discountEl) {
            if (this.product.discount) {
                discountEl.textContent = `-${this.product.discount}%`;
                discountEl.style.display = '';
            } else {
                discountEl.style.display = 'none';
            }
        }
    },

    /**
     * Рендер наличия
     */
    renderAvailability() {
        const container = document.querySelector('.product-info__availability .product-availability');
        if (!container) return;

        let statusClass = 'in-stock';
        let statusText = 'В наличии';

        if (this.product.stockStatus === 'low_stock') {
            statusClass = 'low-stock';
            statusText = `Осталось ${this.product.stock} шт.`;
        } else if (this.product.stockStatus === 'out_of_stock') {
            statusClass = 'out-of-stock';
            statusText = 'Нет в наличии';
        }

        container.className = `product-availability product-availability--${statusClass}`;
        container.querySelector('.product-availability__text').textContent = statusText;
    },

    /**
     * Рендер преимуществ
     */
    renderFeatures() {
        const container = document.querySelector('.product-features__list');
        if (!container || !this.product.features) return;

        container.innerHTML = this.product.features.map(feature => `
            <div class="product-features__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${feature}</span>
            </div>
        `).join('');
    },

    /**
     * Обновление кнопок
     */
    updateButtons() {
        // Кнопка "В корзину"
        const addToCartBtn = document.querySelector('.product-actions__add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.dataset.addToCart = this.product.id;
            
            if (Cart.hasItem(this.product.id)) {
                addToCartBtn.classList.add('btn--success');
                addToCartBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    В корзине
                `;
            }
            
            if (this.product.stockStatus === 'out_of_stock') {
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Нет в наличии';
            }
        }

        // Кнопка "В избранное"
        const favoriteBtn = document.querySelector('.product-actions__secondary [data-toggle-favorite]');
        if (favoriteBtn) {
            favoriteBtn.dataset.toggleFavorite = this.product.id;
            if (Storage.isFavorite(this.product.id)) {
                favoriteBtn.classList.add('active');
            }
        }
    },

    /**
     * Рендер табов
     */
    renderTabs() {
        this.renderDescription();
        this.renderSpecifications();
        this.renderReviews();
    },

    /**
     * Рендер описания
     */
    renderDescription() {
        const container = document.querySelector('#description .product-description__text');
        if (container) {
            container.innerHTML = `<p>${this.product.description}</p>`;
        }
    },

    /**
     * Рендер характеристик
     */
    renderSpecifications() {
        const container = document.querySelector('#specifications .specifications-table tbody');
        if (!container || !this.product.specifications) return;

        container.innerHTML = this.product.specifications.map(spec => `
            <tr>
                <th>${spec.name}</th>
                <td>${spec.value}</td>
            </tr>
        `).join('');
    },

    /**
     * Рендер отзывов
     */
    renderReviews() {
        const result = ReviewsDB.getByProductId(this.product.id);
        const stats = ReviewsDB.getRatingStats(this.product.id);

        // Счётчик в табе
        const tabCount = document.querySelector('.product-tabs__tab-count');
        if (tabCount) tabCount.textContent = `(${stats.total})`;

        // Статистика
        const summaryValue = document.querySelector('.reviews-summary__value');
        const summaryCount = document.querySelector('.reviews-summary__count');
        const summaryStars = document.querySelector('.reviews-summary__rating .reviews-summary__stars');

        if (summaryValue) summaryValue.textContent = stats.average;
        if (summaryCount) summaryCount.textContent = `${stats.total} отзывов`;
        if (summaryStars) summaryStars.innerHTML = Formatters.ratingStars(parseFloat(stats.average));

        // Распределение
        const distribution = document.querySelector('.reviews-distribution');
        if (distribution) {
            distribution.innerHTML = [5, 4, 3, 2, 1].map(rating => `
                <div class="reviews-distribution__row" data-rating="${rating}">
                    <span class="reviews-distribution__label">
                        ${rating}
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>
                    </span>
                    <div class="reviews-distribution__bar">
                        <div class="reviews-distribution__bar-fill" style="width: ${stats.distributionPercent[rating] || 0}%"></div>
                    </div>
                    <span class="reviews-distribution__count">${stats.distribution[rating] || 0}</span>
                </div>
            `).join('');
        }

        // Список отзывов
        const listItems = document.querySelector('.reviews-list__items');
        if (listItems) {
            if (result.reviews.length === 0) {
                listItems.innerHTML = `
                    <div class="empty-state">
                        <p>Пока нет отзывов. Будьте первым!</p>
                    </div>
                `;
            } else {
                listItems.innerHTML = result.reviews.map(review => this.renderReviewCard(review)).join('');
            }
        }
    },

    /**
     * Рендер карточки отзыва
     */
    renderReviewCard(review) {
        const initials = review.userName.split(' ').map(n => n[0]).join('').toUpperCase();

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<svg viewBox="0 0 24 24" ${i <= review.rating ? '' : 'class="empty"'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>`;
        }

        return `
            <div class="review-card">
                <div class="review-card__header">
                    <div class="review-card__author">
                        <div class="review-card__avatar">${initials}</div>
                        <div class="review-card__author-info">
                            <span class="review-card__author-name">${review.userName}</span>
                            <div class="review-card__author-meta">
                                <span>${Formatters.relativeTime(review.createdAt)}</span>
                                ${review.isVerifiedPurchase ? `
                                    <span class="review-card__verified">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        Покупка подтверждена
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="review-card__rating">${starsHtml}</div>
                </div>
                ${review.title ? `<h4 class="review-card__title">${review.title}</h4>` : ''}
                <p class="review-card__text">${review.text}</p>
                ${(review.pros?.length || review.cons?.length) ? `
                    <div class="review-card__pros-cons">
                        ${review.pros?.length ? `
                            <div class="review-card__pros">
                                <div class="review-card__pros-title">Достоинства</div>
                                <div class="review-card__pros-list">
                                    ${review.pros.map(p => `<span>+ ${p}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${review.cons?.length ? `
                            <div class="review-card__cons">
                                <div class="review-card__cons-title">Недостатки</div>
                                <div class="review-card__cons-list">
                                    ${review.cons.map(c => `<span>− ${c}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                <div class="review-card__footer">
                    <div class="review-card__helpful">
                        <span>Полезен отзыв?</span>
                        <button class="review-card__helpful-btn" data-review-helpful="${review.id}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            ${review.helpfulCount}
                        </button>
                    </div>
                </div>
                ${review.reply ? `
                    <div class="review-card__reply">
                        <div class="review-card__reply-author">Ответ магазина</div>
                        <p class="review-card__reply-text">${review.reply.text}</p>
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Рендер похожих товаров
     */
    renderRelated() {
        const container = document.querySelector('.related-products__grid');
        if (!container) return;

        const related = ProductsDB.getRelated(this.product.id, 4);
        
        if (related.length === 0) {
            document.querySelector('.related-products')?.remove();
            return;
        }

        container.innerHTML = related.map(product => this.renderProductCard(product)).join('');
    },

    /**
     * Рендер недавно просмотренных
     */
    renderRecentlyViewed() {
        const container = document.querySelector('.recently-viewed__grid');
        if (!container) return;

        const ids = Storage.getRecentlyViewed().filter(id => id !== this.product.id).slice(0, 5);
        const products = ids.map(id => ProductsDB.getById(id)).filter(p => p !== null);

        if (products.length === 0) {
            document.querySelector('.recently-viewed')?.remove();
            return;
        }

        container.innerHTML = products.map(product => this.renderProductCard(product)).join('');
    },

    /**
     * Рендер карточки товара
     */
    renderProductCard(product) {
        const isFavorite = Storage.isFavorite(product.id);
        const inCart = Cart.hasItem(product.id);

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-card__image-wrapper">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.images[0]?.url || ''}" 
                             alt="${product.name}" 
                             class="product-card__image"
                             loading="lazy">
                    </a>
                    <div class="product-card__actions">
                        <button class="product-card__action ${isFavorite ? 'active' : ''}" 
                                data-toggle-favorite="${product.id}">
                            <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="product-card__content">
                    <a href="product.html?id=${product.id}" class="product-card__title">${product.name}</a>
                    <div class="product-card__rating">
                        <div class="product-card__stars">${Formatters.ratingStars(product.rating)}</div>
                        <span class="product-card__reviews">${product.reviewsCount}</span>
                    </div>
                    <div class="product-card__price">
                        <span class="product-card__price-current">${Formatters.price(product.price)}</span>
                        ${product.originalPrice ? `<span class="product-card__price-original">${Formatters.price(product.originalPrice)}</span>` : ''}
                    </div>
                </div>
                <div class="product-card__footer">
                    <div class="product-card__cart-actions">
                        <button type="button" class="btn btn--primary btn--sm btn--block ${inCart ? 'btn--success' : ''}" 
                                data-add-to-cart="${product.id}">
                            ${inCart ? 'В корзине' : 'В корзину'}
                        </button>
                        <button type="button" class="btn btn--outline btn--sm btn--block cart-remove-inline" data-cart-remove="${product.id}" ${inCart ? '' : 'hidden'} aria-hidden="${inCart ? 'false' : 'true'}">Убрать из корзины</button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Обновление хлебных крошек
     */
    updateBreadcrumbs() {
        const container = document.querySelector('.breadcrumbs');
        if (!container) return;

        const category = CategoriesDB.getById(this.product.categoryId);

        container.innerHTML = `
            <span class="breadcrumbs__item">
                <a href="index.html" class="breadcrumbs__link">Главная</a>
                <span class="breadcrumbs__separator">/</span>
            </span>
            <span class="breadcrumbs__item">
                <a href="catalog.html" class="breadcrumbs__link">Каталог</a>
                <span class="breadcrumbs__separator">/</span>
            </span>
            ${category ? `
                <span class="breadcrumbs__item">
                    <a href="catalog.html?category=${category.slug}" class="breadcrumbs__link">${category.name}</a>
                    <span class="breadcrumbs__separator">/</span>
                </span>
            ` : ''}
            <span class="breadcrumbs__item">
                <span class="breadcrumbs__current">${this.product.name}</span>
            </span>
        `;
    },

    /**
     * Привязка событий
     */
    bindEvents() {
        // Переключение изображений
        document.querySelector('.product-gallery__thumbnails')?.addEventListener('click', (e) => {
            const thumb = e.target.closest('.product-gallery__thumbnail');
            if (!thumb) return;

            const index = parseInt(thumb.dataset.imageIndex);
            this.switchImage(index);
        });

        // Переключение табов
        document.querySelectorAll('.product-tabs__tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;
                
                document.querySelectorAll('.product-tabs__tab').forEach(t => {
                    t.classList.toggle('active', t === tab);
                });
                
                document.querySelectorAll('.product-tabs__panel').forEach(p => {
                    p.classList.toggle('active', p.id === targetId);
                });

                // Если клик по отзывам, скроллим к табам
                if (targetId === 'reviews' && window.location.hash === '#reviews') {
                    Helpers.scrollTo('.product-tabs', 20);
                }
            });
        });

        // Проверяем хеш для автоматического переключения на отзывы
        if (window.location.hash === '#reviews') {
            const reviewsTab = document.querySelector('.product-tabs__tab[data-tab="reviews"]');
            if (reviewsTab) {
                reviewsTab.click();
                setTimeout(() => {
                    Helpers.scrollTo('.product-tabs', 20);
                }, 100);
            }
        }

        // Количество товара
        const quantityInput = document.getElementById('product-quantity');
        const decreaseBtn = document.querySelector('[data-quantity-decrease]');
        const increaseBtn = document.querySelector('[data-quantity-increase]');

        if (quantityInput && decreaseBtn && increaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                const current = parseInt(quantityInput.value) || 1;
                if (current > 1) {
                    quantityInput.value = current - 1;
                    this.selectedOptions.quantity = current - 1;
                }
            });

            increaseBtn.addEventListener('click', () => {
                const current = parseInt(quantityInput.value) || 1;
                const max = Math.min(this.product.stock, 99);
                if (current < max) {
                    quantityInput.value = current + 1;
                    this.selectedOptions.quantity = current + 1;
                }
            });

            quantityInput.addEventListener('change', () => {
                let value = parseInt(quantityInput.value) || 1;
                value = Math.max(1, Math.min(value, this.product.stock, 99));
                quantityInput.value = value;
                this.selectedOptions.quantity = value;
            });
        }

        // Обновляем data-quantity при клике на "В корзину"
        const addToCartBtn = document.querySelector('.product-actions__add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                addToCartBtn.dataset.quantity = this.selectedOptions.quantity;
            });
        }

        // Полезность отзыва
        document.addEventListener('click', (e) => {
            const helpfulBtn = e.target.closest('[data-review-helpful]');
            if (helpfulBtn) {
                const reviewId = parseInt(helpfulBtn.dataset.reviewHelpful);
                this.markReviewHelpful(reviewId, helpfulBtn);
            }
        });
    },

    /**
     * Переключение изображения
     */
    switchImage(index) {
        if (index < 0 || index >= this.product.images.length) return;

        this.currentImageIndex = index;

        const mainImage = document.querySelector('.product-gallery__main-image');
        if (mainImage) {
            mainImage.src = this.product.images[index].url;
            mainImage.alt = this.product.images[index].alt || this.product.name;
        }

        document.querySelectorAll('.product-gallery__thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    },

    /**
     * Отметить отзыв полезным
     */
    markReviewHelpful(reviewId, button) {
        if (button.classList.contains('active')) return;

        const review = ReviewsDB.markHelpful(reviewId, true);
        if (review) {
            button.classList.add('active');
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                ${review.helpfulCount}
            `;
            Notifications.success('Спасибо за отзыв!');
        }
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductPage;
}