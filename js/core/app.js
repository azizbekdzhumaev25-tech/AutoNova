// Placeholder: app.js
/* ========================================
   AutoNova - Main Application
   Главный файл приложения
   ======================================== */

const App = {
    // Состояние приложения
    state: {
        isInitialized: false,
        currentPage: null
    },

    /**
     * Инициализация приложения
     */
    init() {
        if (this.state.isInitialized) return;

        // Определяем текущую страницу
        this.detectCurrentPage();

        // Инициализируем базовые модули
        this.initCoreModules();

        // Инициализируем модули страницы
        this.initPageModules();

        // Привязываем глобальные события
        this.bindGlobalEvents();

        this.state.isInitialized = true;
        console.log('AutoNova App initialized');
    },

    /**
     * Определение текущей страницы
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        this.state.currentPage = page;
        document.body.dataset.page = page;
    },

    /**
     * Инициализация базовых модулей
     */
    initCoreModules() {
        // Уведомления
        if (typeof Notifications !== 'undefined') {
            Notifications.init();
        }

        // Корзина
        if (typeof Cart !== 'undefined') {
            Cart.init();
        }

        // Избранное
        if (typeof Favorites !== 'undefined') {
            Favorites.init();
        }

        // Поиск
        if (typeof Search !== 'undefined') {
            Search.init();
        }
    },

    /**
     * Инициализация модулей страницы
     */
    initPageModules() {
        switch (this.state.currentPage) {
            case 'index':
                this.initHomePage();
                break;
            case 'catalog':
                this.initCatalogPage();
                break;
            case 'product':
                this.initProductPage();
                break;
            case 'cart':
                this.initCartPage();
                break;
            case 'checkout':
                this.initCheckoutPage();
                break;
            case 'favorites':
                this.initFavoritesPage();
                break;
        }
    },

    /**
     * Инициализация главной страницы
     */
    initHomePage() {
        console.log('Home page initialized');
        
        // Рендерим секции главной страницы
        this.renderHomeSections();
    },

    /**
     * Рендеринг секций главной страницы
     */
    renderHomeSections() {
        // Популярные товары
        const featuredContainer = document.querySelector('[data-products="featured"]');
        if (featuredContainer) {
            const products = ProductsDB.getFeatured(8);
            this.renderProductsGrid(featuredContainer, products);
        }

        // Новинки
        const newContainer = document.querySelector('[data-products="new"]');
        if (newContainer) {
            const products = ProductsDB.getNew(8);
            this.renderProductsGrid(newContainer, products);
        }

        // Распродажа
        const saleContainer = document.querySelector('[data-products="sale"]');
        if (saleContainer) {
            const products = ProductsDB.getOnSale(8);
            this.renderProductsGrid(saleContainer, products);
        }

        // Бестселлеры
        const bestsellersContainer = document.querySelector('[data-products="bestsellers"]');
        if (bestsellersContainer) {
            const products = ProductsDB.getBestsellers(8);
            this.renderProductsGrid(bestsellersContainer, products);
        }
    },

    /**
     * Рендеринг сетки товаров
     */
    renderProductsGrid(container, products) {
        if (!container || !products.length) return;

        container.innerHTML = products.map(product => {
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
                        ${product.badges?.length ? `
                            <div class="product-card__badges">
                                ${product.badges.map(badge => {
                                    let cls = '', text = '';
                                    if (badge === 'sale') { cls = 'product-card__badge--sale'; text = `-${product.discount}%`; }
                                    if (badge === 'new') { cls = 'product-card__badge--new'; text = 'Новинка'; }
                                    if (badge === 'bestseller') { cls = 'product-card__badge--bestseller'; text = 'Хит'; }
                                    return `<span class="product-card__badge ${cls}">${text}</span>`;
                                }).join('')}
                            </div>
                        ` : ''}
                        <div class="product-card__actions">
                            <button type="button" class="product-card__action ${isFavorite ? 'active' : ''}" 
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
        }).join('');
    },

    /**
     * Инициализация страницы каталога
     */
    initCatalogPage() {
        if (typeof CatalogModule !== 'undefined') {
            CatalogModule.init();
        }
        if (typeof Filters !== 'undefined') {
            Filters.init();
        }
        console.log('Catalog page initialized');
    },

    /**
     * Инициализация страницы товара
     */
    initProductPage() {
        const params = Helpers.getUrlParams();
        const productId = parseInt(params.id);

        if (!productId) {
            window.location.href = 'catalog.html';
            return;
        }

        const product = ProductsDB.getById(productId);
        
        if (!product) {
            this.show404();
            return;
        }

        // Добавляем в недавно просмотренные
        Storage.addToRecentlyViewed(productId);

        // Рендерим страницу товара
        this.renderProductPage(product);

        console.log('Product page initialized:', product.name);
    },

    /**
     * Рендеринг страницы товара
     */
    renderProductPage(product) {
        // Обновляем title страницы
        document.title = `${product.name} - AutoNova`;

        // Рендерим галерею
        this.renderProductGallery(product);

        // Рендерим информацию
        this.renderProductInfo(product);

        // Рендерим табы
        this.initProductTabs(product);

        // Рендерим похожие товары
        this.renderRelatedProducts(product);

        // Рендерим недавно просмотренные
        this.renderRecentlyViewed(product.id);
    },

    /**
     * Рендеринг галереи товара
     */
    renderProductGallery(product) {
        const galleryMain = document.querySelector('.product-gallery__main-image');
        const thumbnails = document.querySelector('.product-gallery__thumbnails');

        if (galleryMain && product.images.length > 0) {
            galleryMain.src = product.images[0].url;
            galleryMain.alt = product.images[0].alt || product.name;
        }

        if (thumbnails && product.images.length > 1) {
            thumbnails.innerHTML = product.images.map((img, index) => `
                <button type="button" class="product-gallery__thumbnail ${index === 0 ? 'active' : ''}" 
                        data-image-index="${index}">
                    <img src="${img.url}" alt="${img.alt || ''}">
                </button>
            `).join('');

            // События для переключения изображений
            thumbnails.addEventListener('click', (e) => {
                const thumb = e.target.closest('.product-gallery__thumbnail');
                if (!thumb) return;

                const index = parseInt(thumb.dataset.imageIndex);
                galleryMain.src = product.images[index].url;

                thumbnails.querySelectorAll('.product-gallery__thumbnail').forEach(t => {
                    t.classList.toggle('active', t === thumb);
                });
            });
        }
    },

    /**
     * Рендеринг информации о товаре
     */
    renderProductInfo(product) {
        // Название
        const titleEl = document.querySelector('.product-info__title');
        if (titleEl) titleEl.textContent = product.name;

        // Рейтинг
        const ratingValue = document.querySelector('.product-rating__value');
        const ratingCount = document.querySelector('.product-rating__count');
        if (ratingValue) ratingValue.textContent = product.rating;
        if (ratingCount) ratingCount.textContent = `${product.reviewsCount} отзывов`;

        // Цена
        const priceCurrentEl = document.querySelector('.product-price__current');
        const priceOriginalEl = document.querySelector('.product-price__original');
        const priceDiscountEl = document.querySelector('.product-price__discount');

        if (priceCurrentEl) priceCurrentEl.textContent = Formatters.price(product.price);
        if (priceOriginalEl) {
            if (product.originalPrice) {
                priceOriginalEl.textContent = Formatters.price(product.originalPrice);
                priceOriginalEl.style.display = '';
            } else {
                priceOriginalEl.style.display = 'none';
            }
        }
        if (priceDiscountEl) {
            if (product.discount) {
                priceDiscountEl.textContent = `-${product.discount}%`;
                priceDiscountEl.style.display = '';
            } else {
                priceDiscountEl.style.display = 'none';
            }
        }

        // Описание
        const descriptionEl = document.querySelector('.product-info__description p');
        if (descriptionEl) descriptionEl.textContent = product.shortDescription || product.description;

        // Характеристики
        const featuresEl = document.querySelector('.product-features__list');
        if (featuresEl && product.features) {
            featuresEl.innerHTML = product.features.map(feature => `
                <div class="product-features__item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>${feature}</span>
                </div>
            `).join('');
        }

        // Кнопка "В корзину"
        const addToCartBtn = document.querySelector('.product-info__actions [data-add-to-cart]');
        if (addToCartBtn) {
            addToCartBtn.dataset.addToCart = product.id;
            if (Cart.hasItem(product.id)) {
                addToCartBtn.classList.add('btn--success');
                addToCartBtn.textContent = 'В корзине';
            }
        }

        // Кнопка "В избранное"
        const favoriteBtn = document.querySelector('.product-info__actions [data-toggle-favorite]');
        if (favoriteBtn) {
            favoriteBtn.dataset.toggleFavorite = product.id;
            if (Storage.isFavorite(product.id)) {
                favoriteBtn.classList.add('active');
            }
        }
    },

    /**
     * Инициализация табов на странице товара
     */
    initProductTabs(product) {
        const tabs = document.querySelectorAll('.product-tabs__tab');
        const panels = document.querySelectorAll('.product-tabs__panel');

        if (!tabs.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;

                tabs.forEach(t => t.classList.toggle('active', t === tab));
                panels.forEach(p => p.classList.toggle('active', p.id === targetId));
            });
        });

        // Рендерим контент табов
        this.renderProductDescription(product);
        this.renderProductSpecifications(product);
        this.renderProductReviews(product);
    },

    /**
     * Рендеринг описания товара
     */
    renderProductDescription(product) {
        const container = document.querySelector('#description .product-description__text');
        if (container) {
            container.innerHTML = `<p>${product.description}</p>`;
        }
    },

    /**
     * Рендеринг характеристик товара
     */
    renderProductSpecifications(product) {
        const container = document.querySelector('#specifications .specifications-table tbody');
        if (container && product.specifications) {
            container.innerHTML = product.specifications.map(spec => `
                <tr>
                    <th>${spec.name}</th>
                    <td>${spec.value}</td>
                </tr>
            `).join('');
        }
    },

    /**
     * Рендеринг отзывов товара
     */
    renderProductReviews(product) {
        const result = ReviewsDB.getByProductId(product.id);
        const stats = ReviewsDB.getRatingStats(product.id);

        // Рендерим статистику
        const summaryValue = document.querySelector('.reviews-summary__value');
        const summaryCount = document.querySelector('.reviews-summary__count');

        if (summaryValue) summaryValue.textContent = stats.average;
        if (summaryCount) summaryCount.textContent = `${stats.total} отзывов`;

        // Рендерим распределение
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

        // Рендерим список отзывов
        const listItems = document.querySelector('.reviews-list__items');
        if (listItems) {
            listItems.innerHTML = result.reviews.map(review => this.renderReviewCard(review)).join('');
        }
    },

    /**
     * Рендеринг карточки отзыва
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
                        <button type="button" class="review-card__helpful-btn" data-review-helpful="${review.id}">
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
     * Рендеринг похожих товаров
     */
    renderRelatedProducts(product) {
        const container = document.querySelector('.related-products__grid');
        if (!container) return;

        const related = ProductsDB.getRelated(product.id, 4);
        this.renderProductsGrid(container, related);
    },

    /**
     * Рендеринг недавно просмотренных
     */
    renderRecentlyViewed(excludeId) {
        const container = document.querySelector('.recently-viewed__grid');
        if (!container) return;

        const ids = Storage.getRecentlyViewed().filter(id => id !== excludeId).slice(0, 5);
        const products = ids.map(id => ProductsDB.getById(id)).filter(p => p !== null);

        if (products.length === 0) {
            document.querySelector('.recently-viewed')?.remove();
            return;
        }

        this.renderProductsGrid(container, products);
    },

    /**
     * Инициализация страницы корзины
     */
    initCartPage() {
        Cart.updateCartPage();
        console.log('Cart page initialized');
    },

    /**
     * Инициализация страницы оформления заказа
     */
    initCheckoutPage() {
        if (typeof Checkout !== 'undefined') {
            Checkout.init();
        }
        console.log('Checkout page initialized');
    },

    /**
     * Инициализация страницы избранного
     */
    initFavoritesPage() {
        Favorites.updateFavoritesPage();
        console.log('Favorites page initialized');
    },

    /**
     * Привязка глобальных событий
     */
    bindGlobalEvents() {
        // Мобильное меню
        const mobileToggle = document.querySelector('.header__mobile-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileClose = document.querySelector('.mobile-menu__close');

        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            mobileClose?.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Закрытие модалок по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Закрываем модальные окна
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
                // Закрываем мобильное меню
                mobileMenu?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Lazy loading изображений
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },

    /**
     * Показать 404
     */
    show404() {
        document.body.innerHTML = `
            <div class="error-page">
                <h1>404</h1>
                <p>Страница не найдена</p>
                <a href="index.html" class="btn btn--primary">На главную</a>
            </div>
        `;
    }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
