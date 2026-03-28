// Placeholder: header.js
/* ========================================
   AutoNova - Header Module
   Модуль шапки сайта
   ======================================== */

const Header = {
    // Элементы
    elements: {
        header: null,
        mobileToggle: null,
        mobileMenu: null,
        mobileClose: null,
        searchToggle: null,
        searchContainer: null,
        categoriesToggle: null,
        categoriesMenu: null,
        overlay: null
    },

    // Состояние
    state: {
        isMobileMenuOpen: false,
        isSearchOpen: false,
        isCategoriesOpen: false,
        isSticky: false,
        lastScrollY: 0,
        isHidden: false
    },

    /**
     * Инициализация модуля
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateCartCount();
        this.updateFavoritesCount();
        this.handleScroll();

        console.log('Header module initialized');
    },

    /**
     * Кэширование элементов
     */
    cacheElements() {
        this.elements.header = document.querySelector('.header');
        this.elements.mobileToggle = document.querySelector('.header__mobile-toggle');
        this.elements.mobileMenu = document.querySelector('.mobile-menu');
        this.elements.mobileClose = document.querySelector('.mobile-menu__close');
        this.elements.searchToggle = document.querySelector('.header__search-toggle');
        this.elements.searchContainer = document.querySelector('.header__search');
        this.elements.categoriesToggle = document.querySelector('.nav-categories__toggle');
        this.elements.categoriesMenu = document.querySelector('.nav-categories__menu');
        this.elements.overlay = document.querySelector('.overlay');

        // Создаём overlay если нет
        if (!this.elements.overlay) {
            this.elements.overlay = document.createElement('div');
            this.elements.overlay.className = 'overlay';
            document.body.appendChild(this.elements.overlay);
        }
    },

    /**
     * Привязка событий
     */
    bindEvents() {
        // Мобильное меню
        this.elements.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.elements.mobileClose?.addEventListener('click', () => this.closeMobileMenu());

        // Оверлей
        this.elements.overlay?.addEventListener('click', () => this.closeAll());

        // Мобильный поиск
        this.elements.searchToggle?.addEventListener('click', () => this.toggleSearch());

        // Скролл
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
            scrollTimeout = requestAnimationFrame(() => this.handleScroll());
        }, { passive: true });

        // Resize
        window.addEventListener('resize', Helpers.debounce(() => {
            this.handleResize();
        }, 250));

        // Escape закрывает всё
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });

        // Мобильные подменю
        document.querySelectorAll('.mobile-menu__link[data-submenu]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const submenu = document.getElementById(link.dataset.submenu);
                if (submenu) {
                    submenu.classList.toggle('active');
                    const icon = link.querySelector('svg');
                    if (icon) {
                        icon.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : '';
                    }
                }
            });
        });

        // Обновление при изменении корзины/избранного
        window.addEventListener('cart:add', () => this.updateCartCount());
        window.addEventListener('cart:remove', () => this.updateCartCount());
        window.addEventListener('cart:update', () => this.updateCartCount());
        window.addEventListener('cart:clear', () => this.updateCartCount());
        window.addEventListener('favorites:add', () => this.updateFavoritesCount());
        window.addEventListener('favorites:remove', () => this.updateFavoritesCount());
        window.addEventListener('favorites:clear', () => this.updateFavoritesCount());
    },

    /**
     * Открыть/закрыть мобильное меню
     */
    toggleMobileMenu() {
        if (this.state.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    /**
     * Открыть мобильное меню
     */
    openMobileMenu() {
        this.state.isMobileMenuOpen = true;
        this.elements.mobileMenu?.classList.add('active');
        this.elements.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    /**
     * Закрыть мобильное меню
     */
    closeMobileMenu() {
        this.state.isMobileMenuOpen = false;
        this.elements.mobileMenu?.classList.remove('active');
        this.elements.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    },

    /**
     * Переключить мобильный поиск
     */
    toggleSearch() {
        this.state.isSearchOpen = !this.state.isSearchOpen;
        this.elements.searchContainer?.classList.toggle('active', this.state.isSearchOpen);

        if (this.state.isSearchOpen) {
            const input = this.elements.searchContainer?.querySelector('.search-form__input');
            input?.focus();
        }
    },

    /**
     * Закрыть все открытые элементы
     */
    closeAll() {
        this.closeMobileMenu();

        this.state.isSearchOpen = false;
        this.elements.searchContainer?.classList.remove('active');

        this.state.isCategoriesOpen = false;
        this.elements.categoriesMenu?.classList.remove('active');

        document.body.style.overflow = '';
    },

    /**
     * Обработка скролла
     */
    handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = this.elements.header?.offsetHeight || 0;

        // Sticky header
        if (scrollY > 0) {
            this.elements.header?.classList.add('header--scrolled');
        } else {
            this.elements.header?.classList.remove('header--scrolled');
        }

        // Auto-hide header on scroll down (на мобильных)
        if (Helpers.isMobile() || window.innerWidth < 992) {
            if (scrollY > this.state.lastScrollY && scrollY > headerHeight) {
                // Скролл вниз — прячем
                if (!this.state.isHidden) {
                    this.state.isHidden = true;
                    this.elements.header?.classList.add('header--hidden');
                }
            } else {
                // Скролл вверх — показываем
                if (this.state.isHidden) {
                    this.state.isHidden = false;
                    this.elements.header?.classList.remove('header--hidden');
                }
            }
        }

        this.state.lastScrollY = scrollY;
    },

    /**
     * Обработка ресайза
     */
    handleResize() {
        // Закрываем мобильное меню при переходе на десктоп
        if (window.innerWidth >= 992 && this.state.isMobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Закрываем мобильный поиск
        if (window.innerWidth >= 768 && this.state.isSearchOpen) {
            this.state.isSearchOpen = false;
            this.elements.searchContainer?.classList.remove('active');
        }
    },

    /**
     * Обновить счётчик корзины
     */
    updateCartCount() {
        const count = typeof Cart !== 'undefined' ? Cart.getItemsCount() : 0;
        document.querySelectorAll('[data-cart-count]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });
    },

    /**
     * Обновить счётчик избранного
     */
    updateFavoritesCount() {
        const count = typeof Favorites !== 'undefined' ? Favorites.getCount() : 0;
        document.querySelectorAll('[data-favorites-count]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });
    },

    /**
     * Установить активный пункт навигации
     */
    setActiveNavItem(pageName) {
        document.querySelectorAll('.nav-main__link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(pageName)) {
                link.classList.add('active');
            }
        });
    },

    /**
     * Показать промо-баннер в хедере
     */
    showPromo(text, link = null) {
        const promo = document.querySelector('.header__promo-text');
        if (promo) {
            if (link) {
                promo.innerHTML = `<a href="${link}">${text}</a>`;
            } else {
                promo.textContent = text;
            }
        }
    },

    /**
     * Скрыть промо-баннер
     */
    hidePromo() {
        const topBar = document.querySelector('.header__top-bar');
        if (topBar) {
            topBar.style.display = 'none';
        }
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}