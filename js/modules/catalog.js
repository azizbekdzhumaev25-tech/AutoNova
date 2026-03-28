// Placeholder: catalog.js
/* ========================================
   AutoNova - Catalog Module
   Модуль каталога товаров
   ======================================== */

const CatalogModule = {
    /**
     * Инициализация модуля каталога
     */
    init() {
        this.renderNavCategories();
        this.renderCategoryChips();
        this.renderCategoryHero();
        this.renderBreadcrumbs();
        this.renderSidebarFilters('sidebar-filters');
        this.renderSidebarFilters('mobile-filters');

        console.log('Catalog module initialized');
    },

    /**
     * Рендеринг навигации по категориям (в шапке)
     */
    renderNavCategories() {
        const navList = document.getElementById('nav-categories-list');
        if (!navList) return;

        const categories = CategoriesDB.getAll();
        navList.innerHTML = categories.map(cat => `
            <li class="nav-categories__item">
                <a href="catalog.html?category=${cat.slug}" class="nav-categories__link">
                    <span>${cat.name}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </li>
        `).join('');
    },

    /**
     * Рендеринг чипсов категорий
     */
    renderCategoryChips() {
        const chipsContainer = document.getElementById('category-chips');
        if (!chipsContainer) return;

        const params = Helpers.getUrlParams();
        const categories = CategoriesDB.getAll();
        
        chipsContainer.innerHTML = `
            <a href="catalog.html" class="category-chip ${!params.category ? 'active' : ''}">Все товары</a>
            ${categories.map(cat => `
                <a href="catalog.html?category=${cat.slug}" class="category-chip ${params.category === cat.slug ? 'active' : ''}">
                    ${cat.name}
                    <span class="category-chip__count">${cat.productsCount}</span>
                </a>
            `).join('')}
        `;
    },

    /**
     * Рендеринг хиро-блока категории или поиска
     */
    renderCategoryHero() {
        const hero = document.getElementById('catalog-hero');
        if (!hero) return;

        const params = Helpers.getUrlParams();
        const titleEl = document.getElementById('hero-title');
        const descEl = document.getElementById('hero-description');
        const countEl = document.getElementById('hero-products-count');

        // Hide hero by default to avoid showing stale data
        hero.style.display = 'none';

        if (params.category) {
            const category = CategoriesDB.getBySlug(params.category);
            if (category) {
                hero.style.display = 'block';

                if (titleEl) titleEl.textContent = category.name;
                if (descEl) descEl.textContent = category.description || 'Категория товаров AutoNova';

                const productsInCategory = ProductsDB.getByCategory(category.id) || [];
                if (countEl) countEl.textContent = productsInCategory.length || category.productsCount || 0;
            }
        } else if (params.search) {
            hero.style.display = 'block';

            if (titleEl) titleEl.textContent = `Результаты поиска`;
            if (descEl) descEl.textContent = `По запросу «${params.search}»`;

            const searchResults = ProductsDB.search(params.search) || [];
            if (countEl) countEl.textContent = searchResults.length;
        }
    },

    /**
     * Рендеринг хлебных крошек
     */
    renderBreadcrumbs() {
        const breadcrumbs = document.getElementById('breadcrumbs');
        if (!breadcrumbs) return;

        const params = Helpers.getUrlParams();
        let crumbs = '<span class="breadcrumbs__item"><a href="index.html" class="breadcrumbs__link">Главная</a><span class="breadcrumbs__separator">/</span></span>';

        if (params.search) {
            crumbs += '<span class="breadcrumbs__item"><a href="catalog.html" class="breadcrumbs__link">Каталог</a><span class="breadcrumbs__separator">/</span></span>';
            crumbs += `<span class="breadcrumbs__item"><span class="breadcrumbs__current">Поиск: "${params.search}"</span></span>`;
        } else if (params.category) {
            const category = CategoriesDB.getBySlug(params.category);
            crumbs += '<span class="breadcrumbs__item"><a href="catalog.html" class="breadcrumbs__link">Каталог</a><span class="breadcrumbs__separator">/</span></span>';
            crumbs += `<span class="breadcrumbs__item"><span class="breadcrumbs__current">${category ? category.name : 'Категория'}</span></span>`;
        } else {
            crumbs += '<span class="breadcrumbs__item"><span class="breadcrumbs__current">Каталог</span></span>';
        }

        breadcrumbs.innerHTML = crumbs;
    },

    /**
     * Рендеринг сайдбара с фильтрами
     */
    renderSidebarFilters(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const params = Helpers.getUrlParams();
        const categories = CategoriesDB.getAll();
        const priceRange = ProductsDB.getPriceRange();

        const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        let html = '';

        // Categories
        html += `
        <div class="filter-section">
            <div class="filter-section__header" data-collapse-filter>
                <h3 class="filter-section__title">Категории</h3>
                <svg class="filter-section__toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="filter-section__content">
                ${categories.map(cat => `
                    <div class="filter-item">
                        <label class="checkbox">
                            <input type="checkbox" class="checkbox__input" data-filter-category="${cat.id}" ${params.category === cat.slug ? 'checked' : ''}>
                            <span class="checkbox__box">${checkIcon}</span>
                            <span class="checkbox__label">${cat.name}</span>
                        </label>
                        <span class="filter-item__count">${cat.productsCount}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        `;

        // Price
        html += `
        <div class="filter-section">
            <div class="filter-section__header" data-collapse-filter>
                <h3 class="filter-section__title">Цена, ₽</h3>
                <svg class="filter-section__toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="filter-section__content">
                <div class="price-range">
                    <div class="price-range__inputs">
                        <input type="number" class="price-range__input" placeholder="от ${Formatters.number(priceRange.min)}" data-price-min value="${params.price_min || ''}" min="${priceRange.min}" max="${priceRange.max}">
                        <span class="price-range__separator">—</span>
                        <input type="number" class="price-range__input" placeholder="до ${Formatters.number(priceRange.max)}" data-price-max value="${params.price_max || ''}" min="${priceRange.min}" max="${priceRange.max}">
                    </div>
                </div>
            </div>
        </div>
        `;

        // Rating
        html += `
        <div class="filter-section">
            <div class="filter-section__header" data-collapse-filter>
                <h3 class="filter-section__title">Рейтинг</h3>
                <svg class="filter-section__toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="filter-section__content">
                <div class="rating-filter">
                    ${[4, 3, 2, 1].map(rating => {
                        let stars = '';
                        for (let i = 1; i <= 5; i++) {
                            stars += `<svg class="rating-filter__star ${i > rating ? 'rating-filter__star--empty' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>`;
                        }
                        return `
                            <label class="rating-filter__item">
                                <input type="radio" name="${containerId}-rating" value="${rating}" data-filter-rating ${params.rating == rating ? 'checked' : ''}>
                                <div class="rating-filter__stars">${stars}</div>
                                <span class="rating-filter__text">от ${rating} и выше</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        `;

        // In Stock
        html += `
        <div class="filter-section">
            <div class="filter-section__header" data-collapse-filter>
                <h3 class="filter-section__title">Наличие</h3>
                <svg class="filter-section__toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="filter-section__content">
                <div class="filter-item">
                    <label class="checkbox">
                        <input type="checkbox" class="checkbox__input" data-filter-stock ${params.in_stock === 'true' ? 'checked' : ''}>
                        <span class="checkbox__box">${checkIcon}</span>
                        <span class="checkbox__label">Только в наличии</span>
                    </label>
                </div>
                <div class="filter-item">
                    <label class="checkbox">
                        <input type="checkbox" class="checkbox__input" data-filter-discount ${params.on_sale === 'true' ? 'checked' : ''}>
                        <span class="checkbox__box">${checkIcon}</span>
                        <span class="checkbox__label">Со скидкой</span>
                    </label>
                </div>
            </div>
        </div>
        `;

        // Reset
        html += `
        <div class="sidebar-reset">
            <button type="button" class="btn btn--outline btn--block btn--sm" onclick="Filters.clearAllFilters()">
                Сбросить все фильтры
            </button>
        </div>
        `;

        container.innerHTML = html;
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CatalogModule;
}
