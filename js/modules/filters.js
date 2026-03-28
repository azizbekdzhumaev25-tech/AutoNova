// Placeholder: filters.js
/* ========================================
   AutoNova - Filters Module
   РњРѕРґСѓР»СЊ С„РёР»СЊС‚СЂР°С†РёРё С‚РѕРІР°СЂРѕРІ
   ======================================== */

const Filters = {
    // Р СћР В°Р в„–Р СР ВµРЎР‚ Р С—РЎР‚Р С‘Р СР ВµР Р…Р ВµР Р…Р С‘РЎРЏ РЎвЂћР С‘Р В»РЎРЉРЎвЂљРЎР‚Р С•Р Р† (Р Т‘Р В»РЎРЏ Р С•РЎвЂљР СР ВµР Р…РЎвЂ№ РЎРѓРЎвЂљР В°РЎР‚РЎвЂ№РЎвЂ¦ Р С•РЎвЂљР В»Р С•Р В¶Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ РЎР‚Р ВµР Р…Р Т‘Р ВµРЎР‚Р С•Р Р†)
    applyTimer: null,
    applyVersion: 0,

    // РЎРѕСЃС‚РѕСЏРЅРёРµ С„РёР»СЊС‚СЂРѕРІ
    state: {
        categoryId: null,
        subcategoryId: null,
        priceMin: null,
        priceMax: null,
        rating: null,
        inStock: false,
        onSale: false,
        searchQuery: null,
        attributes: {},
        sortBy: 'popularity',
        viewMode: 'grid',
        page: 1,
        perPage: 12
    },

    // Р”РёР°РїР°Р·РѕРЅ С†РµРЅ РІ РєР°С‚РµРіРѕСЂРёРё
    priceRange: {
        min: 0,
        max: 100000
    },

    // Р­Р»РµРјРµРЅС‚С‹ DOM
    elements: {
        sidebar: null,
        productsGrid: null,
        pagination: null,
        sortSelect: null,
        viewToggle: null,
        activeFilters: null,
        mobileToggle: null,
        mobileDrawer: null
    },

    /**
     * РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РјРѕРґСѓР»СЏ
     */
    init() {
        this.cacheElements();
        this.loadStateFromUrl();
        this.loadPriceRange();
        this.syncControlsFromState();
        this.bindEvents();
        this.applyFilters();
        
        console.log('Filters module initialized');
    },

    /**
     * РљСЌС€РёСЂРѕРІР°РЅРёРµ DOM СЌР»РµРјРµРЅС‚РѕРІ
     */
    cacheElements() {
        this.elements.sidebar = document.querySelector('.catalog__sidebar');
        this.elements.productsGrid = document.querySelector('.products-grid');
        this.elements.pagination = document.querySelector('.catalog__pagination');
        this.elements.sortSelect = document.querySelector('.sort-dropdown__select');
        this.elements.viewToggle = document.querySelector('.view-toggle');
        this.elements.activeFilters = document.querySelector('.active-filters');
        this.elements.mobileToggle = document.querySelector('.filter-toggle');
        this.elements.mobileDrawer = document.querySelector('.filters-drawer');
        this.elements.perPageSelect = document.getElementById('per-page-select');
    },

    /**
     * РЎРёРЅС…СЂРѕРЅРёР·Р°С†РёСЏ Р·РЅР°С‡РµРЅРёР№ РєРѕРЅС‚СЂРѕР»РѕРІ СЃ С‚РµРєСѓС‰РёРј СЃРѕСЃС‚РѕСЏРЅРёРµРј
     */
    syncControlsFromState() {
        if (this.elements.sortSelect) {
            this.elements.sortSelect.value = this.state.sortBy;
        }

        if (this.elements.perPageSelect) {
            const perPageValue = String(this.state.perPage);
            const hasOption = Array.from(this.elements.perPageSelect.options)
                .some(option => option.value === perPageValue);
            if (hasOption) {
                this.elements.perPageSelect.value = perPageValue;
            }
        }

        if (this.elements.viewToggle) {
            this.elements.viewToggle.querySelectorAll('.view-toggle__btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === this.state.viewMode);
            });
        }
    },

    /**
     * Р—Р°РіСЂСѓР·РєР° СЃРѕСЃС‚РѕСЏРЅРёСЏ РёР· URL
     */
    loadStateFromUrl() {
        const params = Helpers.getUrlParams();

        if (params.category) {
            const category = CategoriesDB.getBySlug(params.category);
            if (category) this.state.categoryId = category.id;
        }

        if (params.subcategory) {
            const subcategory = CategoriesDB.getSubcategoryBySlug(params.subcategory);
            if (subcategory) {
                this.state.subcategoryId = subcategory.id;
                this.state.categoryId = subcategory.parentId;
            }
        }
        
        if (params.price_min) this.state.priceMin = parseInt(params.price_min);
        if (params.price_max) this.state.priceMax = parseInt(params.price_max);
        if (params.rating) this.state.rating = parseFloat(params.rating);
        if (params.in_stock === 'true') this.state.inStock = true;
        if (params.sort) this.state.sortBy = params.sort;
        if (params.view) this.state.viewMode = params.view;
        if (params.page) {
            const parsedPage = parseInt(params.page);
            if (!Number.isNaN(parsedPage) && parsedPage > 0) {
                this.state.page = parsedPage;
            }
        }
        if (params.per_page) {
            const parsedPerPage = parseInt(params.per_page);
            if (!Number.isNaN(parsedPerPage) && parsedPerPage > 0) {
                this.state.perPage = parsedPerPage;
            }
        }
        if (params.on_sale === 'true') this.state.onSale = true;
        if (params.badges) {
            const badges = params.badges.split(',').map(b => b.trim());
            if (badges.includes('sale')) this.state.onSale = true;
        }

        // РџРѕРёСЃРє
        if (params.search) {
            this.state.searchQuery = params.search;
        }
    },

    /**
     * РЎРѕС…СЂР°РЅРµРЅРёРµ СЃРѕСЃС‚РѕСЏРЅРёСЏ РІ URL
     */
    saveStateToUrl() {
        const params = {};

        if (this.state.categoryId) {
            const category = CategoriesDB.getById(this.state.categoryId);
            if (category) params.category = category.slug;
        }

        if (this.state.subcategoryId) {
            const subcategory = CategoriesDB.getSubcategoryById(this.state.subcategoryId);
            if (subcategory) params.subcategory = subcategory.slug;
        }

        if (this.state.priceMin !== null && this.state.priceMin > this.priceRange.min) {
            params.price_min = this.state.priceMin;
        }

        if (this.state.priceMax !== null && this.state.priceMax < this.priceRange.max) {
            params.price_max = this.state.priceMax;
        }

        if (this.state.rating) params.rating = this.state.rating;
        if (this.state.inStock) params.in_stock = 'true';
        if (this.state.sortBy !== 'popularity') params.sort = this.state.sortBy;
        if (this.state.viewMode !== 'grid') params.view = this.state.viewMode;
        if (this.state.page > 1) params.page = this.state.page;
        if (this.state.perPage !== 12) params.per_page = this.state.perPage;
        if (this.state.onSale) params.on_sale = 'true';
        if (this.state.searchQuery) params.search = this.state.searchQuery;

        Helpers.setUrlParams(params, true);
    },

    /**
     * Р—Р°РіСЂСѓР·РєР° РґРёР°РїР°Р·РѕРЅР° С†РµРЅ
     */
    loadPriceRange() {
        const range = ProductsDB.getPriceRange(this.state.categoryId);
        this.priceRange = range;

        // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј Р·РЅР°С‡РµРЅРёСЏ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ, РµСЃР»Рё РЅРµ Р·Р°РґР°РЅС‹
        if (this.state.priceMin === null) this.state.priceMin = range.min;
        if (this.state.priceMax === null) this.state.priceMax = range.max;
    },

    /**
     * РџСЂРёРІСЏР·РєР° СЃРѕР±С‹С‚РёР№
     */
    bindEvents() {
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-filter-rating]')) {
                this.handleRatingChange(e.target);
            }

            if (e.target.matches('[data-filter-stock]')) {
                this.state.inStock = e.target.checked;
                this.state.page = 1;
                this.applyFilters();
            }

            if (e.target.matches('[data-filter-attribute]')) {
                this.handleAttributeChange(e.target);
            }

            if (e.target.matches('[data-filter-category]')) {
                this.handleCategoryChange(e.target);
            }

            if (e.target.matches('[data-filter-discount]')) {
                this.handleDiscountChange(e.target);
            }
        });

        // Р”РёР°РїР°Р·РѕРЅ С†РµРЅ
        const priceInputs = document.querySelectorAll('[data-price-min], [data-price-max]');
        priceInputs.forEach(input => {
            input.addEventListener('change', Helpers.debounce(() => {
                this.handlePriceChange();
            }, 500));
        });

        // РЎРѕСЂС‚РёСЂРѕРІРєР°
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', (e) => {
                this.state.sortBy = e.target.value;
                this.state.page = 1;
                this.applyFilters();
            });
        }

        // РљРѕР»РёС‡РµСЃС‚РІРѕ РЅР° СЃС‚СЂР°РЅРёС†Рµ
        if (this.elements.perPageSelect) {
            this.elements.perPageSelect.addEventListener('change', (e) => {
                this.state.perPage = parseInt(e.target.value);
                this.state.page = 1;
                this.applyFilters();
            });
        }

        // РџРµСЂРµРєР»СЋС‡РµРЅРёРµ РІРёРґР°
        if (this.elements.viewToggle) {
            this.elements.viewToggle.addEventListener('click', (e) => {
                const btn = e.target.closest('.view-toggle__btn');
                if (btn) {
                    this.setViewMode(btn.dataset.view);
                }
            });
        }

        // РљР»РёРє РїРѕ Р°РєС‚РёРІРЅРѕРјСѓ С„РёР»СЊС‚СЂСѓ (СѓРґР°Р»РµРЅРёРµ)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.active-filter__remove')) {
                const filter = e.target.closest('.active-filter');
                this.removeFilter(filter.dataset.filterType, filter.dataset.filterValue);
            }

            if (e.target.matches('.active-filters__clear')) {
                this.clearAllFilters();
            }
        });

        // РџР°РіРёРЅР°С†РёСЏ
        document.addEventListener('click', (e) => {
            const pageBtn = e.target.closest('[data-page]');
            if (pageBtn && !pageBtn.classList.contains('disabled')) {
                this.goToPage(parseInt(pageBtn.dataset.page));
            }
        });

        document.addEventListener('click', (e) => {
            const quickViewBtn = e.target.closest('[data-quick-view]');
            if (!quickViewBtn) return;

            e.preventDefault();
            e.stopPropagation();

            const productId = parseInt(quickViewBtn.dataset.quickView);
            if (!Number.isNaN(productId)) {
                window.location.href = `product.html?id=${productId}`;
            }
        });

        // РњРѕР±РёР»СЊРЅС‹Рµ С„РёР»СЊС‚СЂС‹
        if (this.elements.mobileToggle) {
            this.elements.mobileToggle.addEventListener('click', () => {
                this.openMobileFilters();
            });
        }

        if (this.elements.mobileDrawer) {
            const closeBtn = this.elements.mobileDrawer.querySelector('.filters-drawer__close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeMobileFilters();
                });
            }

            const applyBtn = this.elements.mobileDrawer.querySelector('[data-apply-filters], #apply-mobile-filters');
            if (applyBtn) {
                applyBtn.addEventListener('click', () => {
                    this.closeMobileFilters();
                    this.applyFilters();
                });
            }

            const resetBtn = this.elements.mobileDrawer.querySelector('[data-reset-filters], #reset-mobile-filters');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.clearAllFilters();
                });
            }
        }

        // РЎРІРѕСЂР°С‡РёРІР°РЅРёРµ СЃРµРєС†РёР№ С„РёР»СЊС‚СЂРѕРІ
        document.addEventListener('click', (e) => {
            const header = e.target.closest('.filter-section__header');
            if (header) {
                const section = header.closest('.filter-section');
                section.classList.toggle('collapsed');
            }
        });
    },

    /**
     * РћР±СЂР°Р±РѕС‚РєР° РёР·РјРµРЅРµРЅРёСЏ РєР°С‚РµРіРѕСЂРёРё
     */
    handleCategoryChange(checkbox) {
        const categoryId = parseInt(checkbox.dataset.filterCategory);
        
        if (checkbox.checked) {
            this.state.categoryId = categoryId;
            // РЎРЅРёРјР°РµРј РѕСЃС‚Р°Р»СЊРЅС‹Рµ С‡РµРєР±РѕРєСЃС‹ РєР°С‚РµРіРѕСЂРёР№
            document.querySelectorAll('[data-filter-category]').forEach(cb => {
                if (cb !== checkbox) cb.checked = false;
            });
        } else {
            this.state.categoryId = null;
        }

        this.state.subcategoryId = null; // РЎР±СЂР°СЃС‹РІР°РµРј РїРѕРґРєР°С‚РµРіРѕСЂРёСЋ РїСЂРё СЃРјРµРЅРµ РѕСЃРЅРѕРІРЅРѕР№
        this.state.page = 1;
        this.applyFilters();
    },

    /**
     * РћР±СЂР°Р±РѕС‚РєР° РёР·РјРµРЅРµРЅРёСЏ С„РёР»СЊС‚СЂР° СЃРєРёРґРѕРє
     */
    handleDiscountChange(checkbox) {
        this.state.onSale = checkbox.checked;
        this.state.page = 1;
        this.applyFilters();
    },

    /**
     * РћР±СЂР°Р±РѕС‚РєР° РёР·РјРµРЅРµРЅРёСЏ СЂРµР№С‚РёРЅРіР°
     */
    handleRatingChange(radio) {
        this.state.rating = parseFloat(radio.value);
        this.state.page = 1;
        this.applyFilters();
    },

    /**
     * РћР±СЂР°Р±РѕС‚РєР° РёР·РјРµРЅРµРЅРёСЏ С†РµРЅС‹
     */
    handlePriceChange() {
        const minInput = document.querySelector('[data-price-min]');
        const maxInput = document.querySelector('[data-price-max]');

        if (minInput) {
            this.state.priceMin = parseInt(minInput.value) || this.priceRange.min;
        }
        if (maxInput) {
            this.state.priceMax = parseInt(maxInput.value) || this.priceRange.max;
        }

        this.state.page = 1;
        this.applyFilters();
    },

    /**
     * РћР±СЂР°Р±РѕС‚РєР° РёР·РјРµРЅРµРЅРёСЏ Р°С‚СЂРёР±СѓС‚Р°
     */
    handleAttributeChange(checkbox) {
        const attrName = checkbox.dataset.filterAttribute;
        const attrValue = checkbox.value;

        if (!this.state.attributes[attrName]) {
            this.state.attributes[attrName] = [];
        }

        if (checkbox.checked) {
            if (!this.state.attributes[attrName].includes(attrValue)) {
                this.state.attributes[attrName].push(attrValue);
            }
        } else {
            this.state.attributes[attrName] = this.state.attributes[attrName]
                .filter(v => v !== attrValue);
        }

        this.state.page = 1;
        this.applyFilters();
    },

    /**
     * РЈРґР°Р»РµРЅРёРµ С„РёР»СЊС‚СЂР°
     */
    removeFilter(type, value) {
        switch (type) {
            case 'price':
                this.state.priceMin = this.priceRange.min;
                this.state.priceMax = this.priceRange.max;
                break;
            case 'rating':
                this.state.rating = null;
                break;
            case 'stock':
                this.state.inStock = false;
                break;
            case 'sale':
                this.state.onSale = false;
                break;
            case 'search':
                this.state.searchQuery = null;
                break;
            case 'attribute':
                const [attrName, attrValue] = value.split(':');
                if (this.state.attributes[attrName]) {
                    this.state.attributes[attrName] = this.state.attributes[attrName]
                        .filter(v => v !== attrValue);
                }
                break;
        }

        this.state.page = 1;
        this.applyFilters();
    },

    /**
     * РћС‡РёСЃС‚РєР° РІСЃРµС… С„РёР»СЊС‚СЂРѕРІ
     */
    clearAllFilters() {
        this.state.categoryId = null;
        this.state.subcategoryId = null;
        this.state.priceMin = this.priceRange.min;
        this.state.priceMax = this.priceRange.max;
        this.state.rating = null;
        this.state.inStock = false;
        this.state.onSale = false;
        this.state.attributes = {};
        this.state.searchQuery = null;
        this.state.page = 1;

        this.applyFilters();
    },

    /**
     * РџСЂРёРјРµРЅРµРЅРёРµ С„РёР»СЊС‚СЂРѕРІ
     */
    applyFilters() {
        this.saveStateToUrl();
        this.showLoading();
        const currentVersion = ++this.applyVersion;

        if (this.applyTimer) {
            clearTimeout(this.applyTimer);
        }

        // РРјРёС‚Р°С†РёСЏ Р·Р°РґРµСЂР¶РєРё Р·Р°РіСЂСѓР·РєРё
        this.applyTimer = setTimeout(() => {
            if (currentVersion !== this.applyVersion) return;
            const result = this.getFilteredProducts();
            const prevPage = this.state.page;
            this.state.page = result.pagination.page;
            if (this.state.page !== prevPage) {
                this.saveStateToUrl();
            }
            this.renderProducts(result.products);
            this.renderPagination(result.pagination);
            this.renderActiveFilters();
            this.updateFilterCounts();
            this.updatePageTitle(result.pagination.total);
        }, 200);
    },

    /**
     * РџРѕР»СѓС‡РµРЅРёРµ РѕС‚С„РёР»СЊС‚СЂРѕРІР°РЅРЅС‹С… С‚РѕРІР°СЂРѕРІ
     */
    getFilteredProducts() {
        // Р•СЃР»Рё РµСЃС‚СЊ РїРѕРёСЃРєРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ, РёСЃРїРѕР»СЊР·СѓРµРј РїРѕРёСЃРє
        if (this.state.searchQuery) {
            const searchResults = ProductsDB.search(this.state.searchQuery, {
                categoryId: this.state.categoryId,
                minPrice: this.state.priceMin,
                maxPrice: this.state.priceMax,
                minRating: this.state.rating,
                inStock: this.state.inStock,
                onSale: this.state.onSale,
                sortBy: this.state.sortBy,
                limit: 100
            });

            // РџСЂРёРјРµРЅСЏРµРј РїР°РіРёРЅР°С†РёСЋ Рє СЂРµР·СѓР»СЊС‚Р°С‚Р°Рј РїРѕРёСЃРєР°
            const total = searchResults.length;
            const totalPages = Math.max(1, Math.ceil(total / this.state.perPage));
            const safePage = Math.min(Math.max(this.state.page, 1), totalPages);
            const offset = (safePage - 1) * this.state.perPage;

            return {
                products: searchResults.slice(offset, offset + this.state.perPage),
                pagination: {
                    page: safePage,
                    perPage: this.state.perPage,
                    total,
                    totalPages,
                    hasNext: safePage < totalPages,
                    hasPrev: safePage > 1
                }
            };
        }

        // РРЅР°С‡Рµ РёСЃРїРѕР»СЊР·СѓРµРј С„РёР»СЊС‚СЂР°С†РёСЋ
        return ProductsDB.filter({
            categoryId: this.state.categoryId,
            subcategoryId: this.state.subcategoryId,
            minPrice: this.state.priceMin,
            maxPrice: this.state.priceMax,
            minRating: this.state.rating,
            inStock: this.state.inStock,
            onSale: this.state.onSale,
            attributes: this.state.attributes,
            sortBy: this.state.sortBy,
            page: this.state.page,
            perPage: this.state.perPage
        });
    },

    /**
     * Р РµРЅРґРµСЂРёРЅРі С‚РѕРІР°СЂРѕРІ
     */
    renderProducts(products) {
        if (!this.elements.productsGrid) return;

        if (products.length === 0) {
            this.elements.productsGrid.innerHTML = `
                <div class="no-results">
                    <svg class="no-results__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                        <path d="M8 8l6 6"></path>
                        <path d="M14 8l-6 6"></path>
                    </svg>
                    <h3 class="no-results__title">РўРѕРІР°СЂС‹ РЅРµ РЅР°Р№РґРµРЅС‹</h3>
                    <p class="no-results__text">РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ РїР°СЂР°РјРµС‚СЂС‹ С„РёР»СЊС‚СЂР°С†РёРё РёР»Рё СЃР±СЂРѕСЃРёС‚СЊ С„РёР»СЊС‚СЂС‹</p>
                    <button type="button" class="btn btn--outline" onclick="Filters.clearAllFilters()">
                        РЎР±СЂРѕСЃРёС‚СЊ С„РёР»СЊС‚СЂС‹
                    </button>
                </div>
            `;
            return;
        }

        // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РєР»Р°СЃСЃ РІРёРґР°
        this.elements.productsGrid.className = `products-grid ${this.state.viewMode === 'list' ? 'products-grid--list' : ''}`;

        this.elements.productsGrid.innerHTML = products.map(product => 
            this.renderProductCard(product)
        ).join('');
    },

    /**
     * Р РµРЅРґРµСЂРёРЅРі РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°
     */
    renderProductCard(product) {
        const isFavorite = Storage.isFavorite(product.id);
        const inCart = Cart.hasItem(product.id);
        
        // Badges
        let badgesHtml = '';
        if (product.badges && product.badges.length > 0) {
            badgesHtml = `
                <div class="product-card__badges">
                    ${product.badges.map(badge => {
                        let badgeClass = '';
                        let badgeText = '';
                        switch (badge) {
                            case 'sale':
                                badgeClass = 'product-card__badge--sale';
                                badgeText = `-${product.discount}%`;
                                break;
                            case 'new':
                                badgeClass = 'product-card__badge--new';
                                badgeText = 'РќРѕРІРёРЅРєР°';
                                break;
                            case 'bestseller':
                                badgeClass = 'product-card__badge--bestseller';
                                badgeText = 'РҐРёС‚';
                                break;
                        }
                        return `<span class="product-card__badge ${badgeClass}">${badgeText}</span>`;
                    }).join('')}
                </div>
            `;
        }

        // Availability
        let availClass = 'in-stock';
        let availText = 'Р’ РЅР°Р»РёС‡РёРё';
        if (product.stockStatus === 'low_stock') {
            availClass = 'low-stock';
            availText = `РћСЃС‚Р°Р»РѕСЃСЊ ${product.stock} С€С‚.`;
        } else if (product.stockStatus === 'out_of_stock') {
            availClass = 'out-of-stock';
            availText = 'РќРµС‚ РІ РЅР°Р»РёС‡РёРё';
        }

        // Rating stars
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating - fullStars >= 0.5;
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<svg class="product-card__star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<svg class="product-card__star" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#e0e0e0"/></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)"/></svg>';
            } else {
                starsHtml += '<svg class="product-card__star product-card__star--empty" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>';
            }
        }

        if (this.state.viewMode === 'list') {
            return this.renderProductCardList(product, badgesHtml, starsHtml, availClass, availText, isFavorite, inCart);
        }

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-card__image-wrapper">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.images[0]?.url || ''}" 
                             alt="${product.name}" 
                             class="product-card__image"
                             loading="lazy">
                    </a>
                    ${badgesHtml}
                    <div class="product-card__actions">
                        <button type="button" class="product-card__action ${isFavorite ? 'active' : ''}" 
                                data-toggle-favorite="${product.id}"
                                title="${isFavorite ? 'РЈРґР°Р»РёС‚СЊ РёР· РёР·Р±СЂР°РЅРЅРѕРіРѕ' : 'Р’ РёР·Р±СЂР°РЅРЅРѕРµ'}">
                            <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <button type="button" class="product-card__action" 
                                data-quick-view="${product.id}"
                                title="Р‘С‹СЃС‚СЂС‹Р№ РїСЂРѕСЃРјРѕС‚СЂ">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="product-card__content">
                    <a href="product.html?id=${product.id}" class="product-card__title">
                        ${product.name}
                    </a>
                    <div class="product-card__rating">
                        <div class="product-card__stars">${starsHtml}</div>
                        <a href="product.html?id=${product.id}#reviews" class="product-card__reviews">
                            ${product.reviewsCount} ${Helpers.pluralize(product.reviewsCount, ['РѕС‚Р·С‹РІ', 'РѕС‚Р·С‹РІР°', 'РѕС‚Р·С‹РІРѕРІ'])}
                        </a>
                    </div>
                    <div class="product-card__price">
                        <span class="product-card__price-current">${Formatters.price(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="product-card__price-original">${Formatters.price(product.originalPrice)}</span>
                        ` : ''}
                    </div>
                    <div class="product-card__availability product-card__availability--${availClass}">
                        <span class="product-card__availability-dot"></span>
                        <span class="product-card__availability-text">${availText}</span>
                    </div>
                </div>
                <div class="product-card__footer">
                    <div class="product-card__cart-actions">
                        <button type="button" class="btn btn--primary btn--block ${inCart ? 'btn--success' : ''}" 
                                data-add-to-cart="${product.id}"
                                ${product.stockStatus === 'out_of_stock' ? 'disabled' : ''}>
                            ${inCart ? 'В корзине' : 'В корзину'}
                        </button>
                        <button type="button" class="btn btn--outline btn--block cart-remove-inline" data-cart-remove="${product.id}" ${inCart ? '' : 'hidden'} aria-hidden="${inCart ? 'false' : 'true'}">Убрать из корзины</button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Р РµРЅРґРµСЂРёРЅРі РєР°СЂС‚РѕС‡РєРё РІ СЂРµР¶РёРјРµ СЃРїРёСЃРєР°
     */
    renderProductCardList(product, badgesHtml, starsHtml, availClass, availText, isFavorite, inCart) {
        return `
            <div class="product-card product-card--list" data-product-id="${product.id}">
                <div class="product-card__image-wrapper">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.images[0]?.url || ''}" 
                             alt="${product.name}" 
                             class="product-card__image"
                             loading="lazy">
                    </a>
                    ${badgesHtml}
                </div>
                <div class="product-card__content">
                    <a href="product.html?id=${product.id}" class="product-card__title">
                        ${product.name}
                    </a>
                    <div class="product-card__rating">
                        <div class="product-card__stars">${starsHtml}</div>
                        <span class="product-card__rating-value">${product.rating}</span>
                        <a href="product.html?id=${product.id}#reviews" class="product-card__reviews">
                            ${product.reviewsCount} ${Helpers.pluralize(product.reviewsCount, ['РѕС‚Р·С‹РІ', 'РѕС‚Р·С‹РІР°', 'РѕС‚Р·С‹РІРѕРІ'])}
                        </a>
                    </div>
                    <p class="product-card__description">${product.shortDescription || ''}</p>
                    <div class="product-card__availability product-card__availability--${availClass}">
                        <span class="product-card__availability-dot"></span>
                        <span class="product-card__availability-text">${availText}</span>
                    </div>
                    <div class="product-card__footer">
                        <div class="product-card__price">
                            <span class="product-card__price-current">${Formatters.price(product.price)}</span>
                            ${product.originalPrice ? `
                                <span class="product-card__price-original">${Formatters.price(product.originalPrice)}</span>
                                <span class="product-card__price-discount">-${product.discount}%</span>
                            ` : ''}
                        </div>
                        <div class="product-card__buttons">
                            <div class="product-card__buttons-row">
                                <button type="button" class="btn btn--primary ${inCart ? 'btn--success' : ''}" 
                                        data-add-to-cart="${product.id}"
                                        ${product.stockStatus === 'out_of_stock' ? 'disabled' : ''}>
                                    ${inCart ? 'В корзине' : 'В корзину'}
                                </button>
                                <button type="button" class="btn btn--outline btn--icon ${isFavorite ? 'active' : ''}" 
                                        data-toggle-favorite="${product.id}">
                                    <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                            <button type="button" class="btn btn--outline btn--sm cart-remove-inline" data-cart-remove="${product.id}" ${inCart ? '' : 'hidden'} aria-hidden="${inCart ? 'false' : 'true'}">Убрать из корзины</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Р РµРЅРґРµСЂРёРЅРі РїР°РіРёРЅР°С†РёРё
     */
    renderPagination(pagination) {
        if (!this.elements.pagination) return;

        const { page, totalPages, hasNext, hasPrev } = pagination;

        if (totalPages <= 1) {
            this.elements.pagination.innerHTML = '';
            return;
        }

        let html = '<div class="pagination">';

        // РљРЅРѕРїРєР° "РќР°Р·Р°Рґ"
        html += `
            <button type="button" class="pagination__item ${!hasPrev ? 'disabled' : ''}" 
                    data-page="${page - 1}"
                    ${!hasPrev ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
        `;

        // РќРѕРјРµСЂР° СЃС‚СЂР°РЅРёС†
        const pages = this.getPaginationPages(page, totalPages);
        pages.forEach(p => {
            if (p === '...') {
                html += '<span class="pagination__ellipsis">...</span>';
            } else {
                html += `
                    <button type="button" class="pagination__item ${p === page ? 'active' : ''}" 
                            data-page="${p}">
                        ${p}
                    </button>
                `;
            }
        });

        // РљРЅРѕРїРєР° "Р’РїРµСЂС‘Рґ"
        html += `
            <button type="button" class="pagination__item ${!hasNext ? 'disabled' : ''}" 
                    data-page="${page + 1}"
                    ${!hasNext ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        `;

        html += '</div>';

        this.elements.pagination.innerHTML = html;
    },

    /**
     * РџРѕР»СѓС‡РµРЅРёРµ РјР°СЃСЃРёРІР° СЃС‚СЂР°РЅРёС† РґР»СЏ РїР°РіРёРЅР°С†РёРё
     */
    getPaginationPages(current, total) {
        const pages = [];
        const delta = 2;

        pages.push(1);

        if (current - delta > 2) {
            pages.push('...');
        }

        for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
            pages.push(i);
        }

        if (current + delta < total - 1) {
            pages.push('...');
        }

        if (total > 1) {
            pages.push(total);
        }

        return pages;
    },

    /**
     * Р РµРЅРґРµСЂРёРЅРі Р°РєС‚РёРІРЅС‹С… С„РёР»СЊС‚СЂРѕРІ
     */
    renderActiveFilters() {
        if (!this.elements.activeFilters) return;

        const filters = [];

        // РџРѕРёСЃРє
        if (this.state.searchQuery) {
            filters.push({
                type: 'search',
                value: this.state.searchQuery,
                label: `РџРѕРёСЃРє: "${this.state.searchQuery}"`
            });
        }

        // Р¦РµРЅР°
        if (this.state.priceMin > this.priceRange.min || this.state.priceMax < this.priceRange.max) {
            filters.push({
                type: 'price',
                value: 'range',
                label: `${Formatters.price(this.state.priceMin)} вЂ” ${Formatters.price(this.state.priceMax)}`
            });
        }

        // Р РµР№С‚РёРЅРі
        if (this.state.rating) {
            filters.push({
                type: 'rating',
                value: this.state.rating,
                label: `РћС‚ ${this.state.rating} в…`
            });
        }

        // Р’ РЅР°Р»РёС‡РёРё
        if (this.state.inStock) {
            filters.push({
                type: 'stock',
                value: 'true',
                label: 'Р’ РЅР°Р»РёС‡РёРё'
            });
        }

        if (this.state.onSale) {
            filters.push({
                type: 'sale',
                value: 'true',
                label: 'РЎРѕ СЃРєРёРґРєРѕР№'
            });
        }

        if (filters.length === 0) {
            this.elements.activeFilters.style.display = 'none';
            return;
        }

        this.elements.activeFilters.style.display = '';
        this.elements.activeFilters.innerHTML = `
            <span class="active-filters__label">Р¤РёР»СЊС‚СЂС‹:</span>
            ${filters.map(f => `
                <span class="active-filter" data-filter-type="${f.type}" data-filter-value="${f.value}">
                    ${f.label}
                    <button type="button" class="active-filter__remove">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </span>
            `).join('')}
            <button type="button" class="active-filters__clear">РЎР±СЂРѕСЃРёС‚СЊ РІСЃРµ</button>
        `;
    },

    /**
     * РћР±РЅРѕРІР»РµРЅРёРµ СЃС‡С‘С‚С‡РёРєРѕРІ РІ С„РёР»СЊС‚СЂР°С…
     */
    updateFilterCounts() {
        // РћР±РЅРѕРІР»СЏРµРј СЃС‡С‘С‚С‡РёРє Р°РєС‚РёРІРЅС‹С… С„РёР»СЊС‚СЂРѕРІ РЅР° РјРѕР±РёР»СЊРЅРѕР№ РєРЅРѕРїРєРµ
        if (this.elements.mobileToggle) {
            const count = this.getActiveFiltersCount();
            const badge = this.elements.mobileToggle.querySelector('.filter-toggle__count');
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? '' : 'none';
            }
        }
    },

    /**
     * РџРѕР»СѓС‡РµРЅРёРµ РєРѕР»РёС‡РµСЃС‚РІР° Р°РєС‚РёРІРЅС‹С… С„РёР»СЊС‚СЂРѕРІ
     */
    getActiveFiltersCount() {
        let count = 0;
        if (this.state.priceMin > this.priceRange.min || this.state.priceMax < this.priceRange.max) count++;
        if (this.state.rating) count++;
        if (this.state.inStock) count++;
        if (this.state.onSale) count++;
        if (this.state.searchQuery) count++;
        return count;
    },

    /**
     * РћР±РЅРѕРІР»РµРЅРёРµ Р·Р°РіРѕР»РѕРІРєР° СЃС‚СЂР°РЅРёС†С‹
     */
    updatePageTitle(totalOverride = null) {
        const titleEl = document.querySelector('.catalog__title');
        if (!titleEl) return;

        let title = 'РљР°С‚Р°Р»РѕРі';
        let count = '';

        if (this.state.searchQuery) {
            title = `Р РµР·СѓР»СЊС‚Р°С‚С‹ РїРѕРёСЃРєР°: "${this.state.searchQuery}"`;
        } else if (this.state.subcategoryId) {
            const subcategory = CategoriesDB.getSubcategoryById(this.state.subcategoryId);
            if (subcategory) title = subcategory.name;
        } else if (this.state.categoryId) {
            const category = CategoriesDB.getById(this.state.categoryId);
            if (category) title = category.name;
        }

        let total = totalOverride;
        if (typeof total !== 'number') {
            const result = this.getFilteredProducts();
            total = result.pagination.total;
        }
        count = `<span class="catalog__count">${Formatters.pluralize(total, ['С‚РѕРІР°СЂ', 'С‚РѕРІР°СЂР°', 'С‚РѕРІР°СЂРѕРІ'])}</span>`;

        titleEl.innerHTML = `${title} ${count}`;
    },

    /**
     * РџРµСЂРµС…РѕРґ РЅР° СЃС‚СЂР°РЅРёС†Сѓ
     */
    goToPage(page) {
        this.state.page = page;
        this.applyFilters();
        
        // РЎРєСЂРѕР»Р» Рє РЅР°С‡Р°Р»Сѓ СЃРїРёСЃРєР°
        if (this.elements.productsGrid) {
            Helpers.scrollTo(this.elements.productsGrid, 20);
        }
    },

    /**
     * РЈСЃС‚Р°РЅРѕРІРєР° СЂРµР¶РёРјР° РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
     */
    setViewMode(mode) {
        this.state.viewMode = mode;
        
        // РћР±РЅРѕРІР»СЏРµРј РєРЅРѕРїРєРё
        if (this.elements.viewToggle) {
            this.elements.viewToggle.querySelectorAll('.view-toggle__btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === mode);
            });
        }

        // РЎРѕС…СЂР°РЅСЏРµРј РІ РЅР°СЃС‚СЂРѕР№РєРё
        Storage.setSettings({ viewMode: mode });

        this.applyFilters();
    },

    /**
     * РџРѕРєР°Р·Р°С‚СЊ СЃРѕСЃС‚РѕСЏРЅРёРµ Р·Р°РіСЂСѓР·РєРё
     */
    showLoading() {
        if (this.elements.productsGrid) {
            // Р”РѕР±Р°РІР»СЏРµРј skeleton placeholders
            this.elements.productsGrid.innerHTML = Array(8).fill(0).map(() => `
                <div class="product-card">
                    <div class="product-card__image-wrapper">
                        <div class="skeleton skeleton--image"></div>
                    </div>
                    <div class="product-card__content">
                        <div class="skeleton skeleton--text" style="width: 80%; margin-bottom: 8px;"></div>
                        <div class="skeleton skeleton--text" style="width: 60%; margin-bottom: 8px;"></div>
                        <div class="skeleton skeleton--text" style="width: 40%;"></div>
                    </div>
                </div>
            `).join('');
        }
    },

    /**
     * РћС‚РєСЂС‹С‚СЊ РјРѕР±РёР»СЊРЅС‹Рµ С„РёР»СЊС‚СЂС‹
     */
    openMobileFilters() {
        if (this.elements.mobileDrawer) {
            this.elements.mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Р—Р°РєСЂС‹С‚СЊ РјРѕР±РёР»СЊРЅС‹Рµ С„РёР»СЊС‚СЂС‹
     */
    closeMobileFilters() {
        if (this.elements.mobileDrawer) {
            this.elements.mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
};

// Р­РєСЃРїРѕСЂС‚
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Filters;
}

