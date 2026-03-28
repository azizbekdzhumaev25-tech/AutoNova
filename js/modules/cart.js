// Placeholder: cart.js
/* ========================================
   AutoNova - Cart Module
   Модуль корзины покупок
   ======================================== */

const Cart = {
    // Состояние корзины
    state: {
        items: [],
        promoCode: null,
        promoDiscount: 0,
        isLoading: false
    },

    // Настройки
    config: {
        maxQuantity: 99,
        minQuantity: 1
    },

    /**
     * Инициализация модуля корзины
     */
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateUI();
        
        console.log('Cart module initialized');
    },

    /**
     * Загрузка корзины из localStorage
     */
    loadFromStorage() {
        const savedCart = Storage.getCart();
        if (savedCart && savedCart.items) {
            this.state.items = savedCart.items;
            this.state.promoCode = savedCart.promoCode || null;
            this.state.promoDiscount = savedCart.promoDiscount || 0;
        }
    },

    /**
     * Сохранение корзины в localStorage
     */
    saveToStorage() {
        Storage.setCart({
            items: this.state.items,
            promoCode: this.state.promoCode,
            promoDiscount: this.state.promoDiscount
        });
    },

    /**
     * Привязка событий
     */
    bindEvents() {
        document.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('[data-cart-remove]');
            if (removeBtn) {
                e.preventDefault();
                const productId = parseInt(removeBtn.dataset.cartRemove, 10);
                if (productId) {
                    this.removeItem(productId);
                }
                return;
            }

            const addToCartBtn = e.target.closest('[data-add-to-cart]');
            if (addToCartBtn) {
                e.preventDefault();
                e.stopImmediatePropagation();
                const productId = parseInt(addToCartBtn.dataset.addToCart, 10);
                if (!productId) return;
                const quantity = parseInt(addToCartBtn.dataset.quantity, 10) || 1;
                this.addItem(productId, quantity);
                return;
            }

            const quantityBtn = e.target.closest('[data-cart-quantity]');
            if (quantityBtn) {
                e.preventDefault();
                const productId = parseInt(quantityBtn.dataset.productId);
                const action = quantityBtn.dataset.cartQuantity;
                
                if (action === 'increase') {
                    this.updateQuantity(productId, this.getItemQuantity(productId) + 1);
                } else if (action === 'decrease') {
                    this.updateQuantity(productId, this.getItemQuantity(productId) - 1);
                }
            }
        });

        // Изменение количества через input
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-cart-quantity-input]')) {
                const productId = parseInt(e.target.dataset.productId);
                const quantity = parseInt(e.target.value) || 1;
                this.updateQuantity(productId, quantity);
            }
        });

        // Слушаем изменения в других вкладках
        window.addEventListener('storage', (e) => {
            if (e.key === Storage.KEYS.CART) {
                this.loadFromStorage();
                this.updateUI();
            }
        });
    },

    /**
     * Добавить товар в корзину
     */
    addItem(productId, quantity = 1, options = {}) {
        const product = ProductsDB.getById(productId);
        
        if (!product) {
            this.showNotification('error', 'Товар не найден');
            return false;
        }

        // Проверяем наличие
        const stockCheck = ProductsDB.checkStock(productId, quantity);
        if (!stockCheck.available) {
            this.showNotification('warning', stockCheck.message);
            return false;
        }

        // Ищем существующий товар в корзине
        const existingIndex = this.state.items.findIndex(item => 
            item.productId === productId &&
            JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingIndex > -1) {
            // Обновляем количество
            const newQuantity = this.state.items[existingIndex].quantity + quantity;
            
            // Проверяем лимит
            if (newQuantity > this.config.maxQuantity) {
                this.showNotification('warning', `Максимум ${this.config.maxQuantity} шт.`);
                this.state.items[existingIndex].quantity = this.config.maxQuantity;
            } else if (newQuantity > product.stock) {
                this.showNotification('warning', `Доступно только ${product.stock} шт.`);
                this.state.items[existingIndex].quantity = product.stock;
            } else {
                this.state.items[existingIndex].quantity = newQuantity;
            }
        } else {
            // Добавляем новый товар
            this.state.items.push({
                productId: productId,
                quantity: Math.min(quantity, product.stock, this.config.maxQuantity),
                options: options,
                addedAt: Date.now()
            });
        }

        this.saveToStorage();
        this.updateUI();
        this.showNotification('success', 'Товар добавлен в корзину', {
            action: {
                text: 'Перейти в корзину',
                url: 'cart.html'
            }
        });

        // Отправляем событие
        window.dispatchEvent(new CustomEvent('cart:add', {
            detail: { productId, quantity, product }
        }));

        return true;
    },

    /**
     * Удалить товар из корзины
     */
    removeItem(productId) {
        const index = this.state.items.findIndex(item => item.productId === productId);
        
        if (index > -1) {
            const removed = this.state.items.splice(index, 1)[0];
            this.saveToStorage();
            this.updateUI();
            
            this.showNotification('info', 'Товар удалён из корзины', {
                action: {
                    text: 'Отменить',
                    callback: () => this.addItem(productId, removed.quantity, removed.options)
                }
            });

            window.dispatchEvent(new CustomEvent('cart:remove', {
                detail: { productId }
            }));

            return true;
        }
        return false;
    },

    /**
     * Обновить количество товара
     */
    updateQuantity(productId, quantity) {
        const index = this.state.items.findIndex(item => item.productId === productId);
        
        if (index === -1) return false;

        const product = ProductsDB.getById(productId);
        
        if (quantity < this.config.minQuantity) {
            this.removeItem(productId);
            return true;
        }

        if (quantity > this.config.maxQuantity) {
            quantity = this.config.maxQuantity;
            this.showNotification('warning', `Максимум ${this.config.maxQuantity} шт.`);
        }

        if (product && quantity > product.stock) {
            quantity = product.stock;
            this.showNotification('warning', `Доступно только ${product.stock} шт.`);
        }

        this.state.items[index].quantity = quantity;
        this.saveToStorage();
        this.updateUI();

        window.dispatchEvent(new CustomEvent('cart:update', {
            detail: { productId, quantity }
        }));

        return true;
    },

    /**
     * Получить количество товара в корзине
     */
    getItemQuantity(productId) {
        const item = this.state.items.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    },

    /**
     * Проверить, есть ли товар в корзине
     */
    hasItem(productId) {
        return this.state.items.some(item => item.productId === productId);
    },

    /**
     * Очистить корзину
     */
    clear() {
        this.state.items = [];
        this.state.promoCode = null;
        this.state.promoDiscount = 0;
        this.saveToStorage();
        this.updateUI();

        window.dispatchEvent(new CustomEvent('cart:clear'));
    },

    /**
     * Получить все товары корзины с данными
     */
    getItems() {
        return this.state.items.map(item => {
            const product = ProductsDB.getById(item.productId);
            return {
                ...item,
                product: product,
                subtotal: product ? product.price * item.quantity : 0
            };
        }).filter(item => item.product !== null);
    },

    /**
     * Получить количество товаров
     */
    getItemsCount() {
        return this.state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    /**
     * Получить количество позиций
     */
    getUniqueItemsCount() {
        return this.state.items.length;
    },

    /**
     * Расчёт стоимости
     */
    calculateTotals() {
        const items = this.getItems();
        
        let subtotal = 0;
        let originalTotal = 0;
        
        items.forEach(item => {
            subtotal += item.product.price * item.quantity;
            const originalPrice = item.product.originalPrice || item.product.price;
            originalTotal += originalPrice * item.quantity;
        });

        const productDiscount = originalTotal - subtotal;
        const promoDiscount = this.state.promoDiscount;
        const deliveryFee = subtotal >= 5000 ? 0 : 350;
        const total = subtotal - promoDiscount + deliveryFee;

        return {
            subtotal,
            originalTotal,
            productDiscount,
            promoDiscount,
            promoCode: this.state.promoCode,
            deliveryFee,
            total,
            itemsCount: this.getItemsCount(),
            freeDeliveryThreshold: 5000,
            freeDeliveryRemaining: Math.max(0, 5000 - subtotal)
        };
    },

    /**
     * Применить промокод
     */
    applyPromoCode(code) {
        // Имитация проверки промокода
        const promoCodes = {
            'WELCOME10': { discount: 10, type: 'percent' },
            'SAVE500': { discount: 500, type: 'fixed' },
            'AUTO20': { discount: 20, type: 'percent' }
        };

        const promo = promoCodes[code.toUpperCase()];
        
        if (!promo) {
            this.showNotification('error', 'Промокод не найден');
            return false;
        }

        const totals = this.calculateTotals();
        let discount;

        if (promo.type === 'percent') {
            discount = Math.round(totals.subtotal * promo.discount / 100);
        } else {
            discount = promo.discount;
        }

        this.state.promoCode = code.toUpperCase();
        this.state.promoDiscount = discount;
        this.saveToStorage();
        this.updateUI();

        this.showNotification('success', `Промокод применён! Скидка: ${Formatters.price(discount)}`);

        return true;
    },

    /**
     * Удалить промокод
     */
    removePromoCode() {
        this.state.promoCode = null;
        this.state.promoDiscount = 0;
        this.saveToStorage();
        this.updateUI();
    },

    /**
     * Обновление UI
     */
    updateUI() {
        this.updateCartCount();
        this.updateCartDropdown();
        this.updateCartPage();
        this.updateCheckoutSummary();
        this.syncAddToCartButtons();
    },

    /**
     * Синхронизация кнопок «В корзину» / «Убрать из корзины» на карточках и странице товара
     */
    syncAddToCartButtons() {
        const cartIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;
        const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            const productId = parseInt(btn.dataset.addToCart, 10);
            if (!productId) return;

            const inCart = this.hasItem(productId);

            if (btn.id === 'product-add-to-cart-btn') {
                if (btn.hasAttribute('data-product-unavailable')) {
                    return;
                }
                btn.classList.toggle('btn--success', inCart);
                if (inCart) {
                    btn.innerHTML = `${checkSvg} В корзине`;
                } else {
                    btn.innerHTML = `${cartIconSvg} Добавить в корзину`;
                }
                return;
            }

            btn.classList.toggle('btn--success', inCart);
            const inLabel = btn.dataset.inCartLabel || 'В корзине';
            const notInLabel = btn.dataset.notInCartLabel || 'В корзину';
            btn.textContent = inCart ? inLabel : notInLabel;
        });

        document.querySelectorAll('.cart-remove-inline').forEach(btn => {
            const productId = parseInt(btn.dataset.cartRemove, 10);
            if (!productId) return;
            const inCart = this.hasItem(productId);
            btn.hidden = !inCart;
            btn.setAttribute('aria-hidden', inCart ? 'false' : 'true');
        });
    },

    /**
     * Обновить счётчик в хедере
     */
    updateCartCount() {
        const countElements = document.querySelectorAll('[data-cart-count]');
        const count = this.getItemsCount();
        
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });

        const totalElements = document.querySelectorAll('[data-cart-total]');
        const totals = this.calculateTotals();
        
        totalElements.forEach(el => {
            el.textContent = Formatters.price(totals.total);
        });
    },

    /**
     * Обновить мини-корзину в хедере
     */
    updateCartDropdown() {
        const dropdown = document.querySelector('.cart-mini__items');
        if (!dropdown) return;

        const items = this.getItems();

        if (items.length === 0) {
            dropdown.innerHTML = `
                <div class="cart-mini__empty">
                    <svg class="cart-mini__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p class="cart-mini__empty-text">Корзина пуста</p>
                </div>
            `;
            return;
        }

        dropdown.innerHTML = items.slice(0, 5).map(item => `
            <div class="cart-mini__item">
                <a href="product.html?id=${item.productId}">
                    <img src="${item.product.images[0]?.url || ''}" 
                         alt="${item.product.name}" 
                         class="cart-mini__item-image">
                </a>
                <div class="cart-mini__item-content">
                    <a href="product.html?id=${item.productId}" class="cart-mini__item-name">
                        ${item.product.name}
                    </a>
                    <div class="cart-mini__item-meta">
                        <span class="cart-mini__item-price">${Formatters.price(item.product.price)}</span>
                        <span class="cart-mini__item-qty">× ${item.quantity}</span>
                    </div>
                </div>
                <button class="cart-mini__item-remove" data-cart-remove="${item.productId}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `).join('');

        // Обновляем футер мини-корзины
        const footer = document.querySelector('.cart-mini__footer');
        if (footer) {
            const totals = this.calculateTotals();
            const subtotalEl = footer.querySelector('.cart-mini__subtotal-value');
            if (subtotalEl) {
                subtotalEl.textContent = Formatters.price(totals.subtotal);
            }
        }
    },

    /**
     * Обновить страницу корзины
     */
    updateCartPage() {
        const cartContainer = document.querySelector('.cart-items__list');
        if (!cartContainer) return;

        const items = this.getItems();

        if (items.length === 0) {
            // Показываем пустую корзину
            const cartLayout = document.querySelector('.cart-layout');
            if (cartLayout) {
                cartLayout.innerHTML = `
                    <div class="cart-empty">
                        <svg class="cart-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <h2 class="cart-empty__title">Ваша корзина пуста</h2>
                        <p class="cart-empty__text">Загляните в каталог, чтобы найти интересные товары для вашего автомобиля</p>
                        <a href="catalog.html" class="btn btn--primary btn--lg cart-empty__btn">
                            Перейти в каталог
                        </a>
                    </div>
                `;
            }
            return;
        }

        // Рендерим товары
        cartContainer.innerHTML = items.map(item => this.renderCartItem(item)).join('');

        // Обновляем summary
        this.updateCartSummary();
    },

    /**
     * Рендер элемента корзины
     */
    renderCartItem(item) {
        const { product, quantity, subtotal } = item;
        const originalPrice = product.originalPrice || product.price;
        const hasDiscount = originalPrice > product.price;

        let availabilityClass = 'in-stock';
        let availabilityText = 'В наличии';
        
        if (product.stockStatus === 'low_stock') {
            availabilityClass = 'low-stock';
            availabilityText = `Осталось ${product.stock} шт.`;
        } else if (product.stockStatus === 'out_of_stock') {
            availabilityClass = 'out-of-stock';
            availabilityText = 'Нет в наличии';
        }

        return `
            <div class="cart-item" data-product-id="${product.id}">
                <div class="cart-item__checkbox">
                    <label class="checkbox">
                        <input type="checkbox" class="checkbox__input" checked data-cart-select="${product.id}">
                        <span class="checkbox__box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </span>
                    </label>
                </div>
                <div class="cart-item__image">
                    <a href="product.html?id=${product.id}" class="cart-item__image-link">
                        <img src="${product.images[0]?.url || ''}" alt="${product.name}">
                    </a>
                </div>
                <div class="cart-item__content">
                    <div class="cart-item__header">
                        <a href="product.html?id=${product.id}" class="cart-item__title">
                            ${product.name}
                        </a>
                        <button class="cart-item__remove" data-cart-remove="${product.id}" title="Удалить">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="cart-item__meta">Артикул: ${product.sku}</div>
                    <div class="cart-item__availability cart-item__availability--${availabilityClass}">
                        <span class="cart-item__availability-dot"></span>
                        <span class="cart-item__availability-text">${availabilityText}</span>
                    </div>
                    <div class="cart-item__footer">
                        <div class="cart-item__actions">
                            <div class="quantity-control">
                                <button class="quantity-control__btn" 
                                        data-cart-quantity="decrease" 
                                        data-product-id="${product.id}"
                                        ${quantity <= 1 ? 'disabled' : ''}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <input type="number" 
                                       class="quantity-control__input" 
                                       value="${quantity}" 
                                       min="1" 
                                       max="${Math.min(product.stock, 99)}"
                                       data-cart-quantity-input
                                       data-product-id="${product.id}">
                                <button class="quantity-control__btn" 
                                        data-cart-quantity="increase" 
                                        data-product-id="${product.id}"
                                        ${quantity >= product.stock ? 'disabled' : ''}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                            <button class="cart-item__action ${Storage.isFavorite(product.id) ? 'active' : ''}" 
                                    data-toggle-favorite="${product.id}">
                                <svg viewBox="0 0 24 24" fill="${Storage.isFavorite(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span>В избранное</span>
                            </button>
                        </div>
                        <div class="cart-item__price">
                            <div class="cart-item__price-current">${Formatters.price(subtotal)}</div>
                            ${hasDiscount ? `
                                <div class="cart-item__price-original">${Formatters.price(originalPrice * quantity)}</div>
                            ` : ''}
                            ${quantity > 1 ? `
                                <div class="cart-item__price-per">${Formatters.price(product.price)} / шт.</div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Обновить summary на странице корзины
     */
    updateCartSummary() {
        const summary = document.querySelector('.cart-summary__content');
        if (!summary) return;

        const totals = this.calculateTotals();

        // Обновляем значения
        const updateElement = (selector, value) => {
            const el = summary.querySelector(selector);
            if (el) el.textContent = value;
        };

        updateElement('[data-summary-subtotal]', Formatters.price(totals.subtotal));
        updateElement('[data-summary-discount]', `-${Formatters.price(totals.productDiscount)}`);
        updateElement('[data-summary-delivery]', totals.deliveryFee === 0 ? 'Бесплатно' : Formatters.price(totals.deliveryFee));
        updateElement('[data-summary-total]', Formatters.price(totals.total));
        updateElement('[data-summary-count]', Formatters.pluralize(totals.itemsCount, ['товар', 'товара', 'товаров']));

        // Показываем/скрываем блок скидки
        const discountRow = summary.querySelector('[data-summary-discount-row]');
        if (discountRow) {
            discountRow.style.display = totals.productDiscount > 0 ? '' : 'none';
        }

        // Показываем/скрываем промокод
        const promoRow = summary.querySelector('[data-summary-promo-row]');
        if (promoRow) {
            promoRow.style.display = totals.promoDiscount > 0 ? '' : 'none';
            const promoValue = promoRow.querySelector('[data-summary-promo]');
            if (promoValue) promoValue.textContent = `-${Formatters.price(totals.promoDiscount)}`;
        }
    },

    /**
     * Обновить summary на странице checkout
     */
    updateCheckoutSummary() {
        const summary = document.querySelector('.checkout-summary');
        if (!summary) return;

        const items = this.getItems();
        const totals = this.calculateTotals();

        // Обновляем список товаров
        const itemsContainer = summary.querySelector('.checkout-summary__items');
        if (itemsContainer) {
            itemsContainer.innerHTML = items.map(item => `
                <div class="checkout-summary__item">
                    <div class="checkout-summary__item-image">
                        <img src="${item.product.images[0]?.url || ''}" alt="${item.product.name}">
                    </div>
                    <div class="checkout-summary__item-info">
                        <div class="checkout-summary__item-name">${item.product.name}</div>
                        <div class="checkout-summary__item-qty">Кол-во: ${item.quantity}</div>
                    </div>
                    <div class="checkout-summary__item-price">${Formatters.price(item.subtotal)}</div>
                </div>
            `).join('');
        }

        // Обновляем итоги
        const content = summary.querySelector('.checkout-summary__content');
        if (content) {
            const updateElement = (selector, value) => {
                const el = content.querySelector(selector);
                if (el) el.textContent = value;
            };

            updateElement('[data-checkout-subtotal]', Formatters.price(totals.subtotal));
            updateElement('[data-checkout-discount]', `-${Formatters.price(totals.productDiscount)}`);
            updateElement('[data-checkout-delivery]', totals.deliveryFee === 0 ? 'Бесплатно' : Formatters.price(totals.deliveryFee));
            updateElement('[data-checkout-total]', Formatters.price(totals.total));
        }
    },

    /**
     * Показать уведомление
     */
    showNotification(type, message, options = {}) {
        if (typeof Notifications !== 'undefined') {
            Notifications.show({
                type,
                message,
                ...options
            });
        } else {
            console.log(`[${type}] ${message}`);
        }
    },

    /**
     * Отправить заказ в Telegram
     */
    sendToTelegram() {
        const items = this.getItems();
        if (items.length === 0) {
            alert("Ваша корзина пуста!");
            return;
        }

        // Важно: бот распознаёт начало заказа по строке.
        // Telegram иногда отправляет текст без символов разметки `*`,
        // поэтому заголовок делаем "чистым" без `*`.
        const appConfig = window.AUTONOVA_CONFIG || {};
        const orderKeyword = appConfig.orderKeyword || "🚀 Новый заказ из магазина AutoNova";

        let message = `${orderKeyword}\n\n`;
        
        message += "ТОВАРЫ В ЗАКАЗЕ:\n";
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.product.name}\n`;
            message += `   Артикул: ${item.product.sku}\n`;
            message += `   Кол-во: ${item.quantity} шт.\n`;
            message += `   Цена за шт: ${item.product.price} ₽\n`;
            message += `   Сумма: ${item.subtotal} ₽\n\n`;
        });

        const totals = this.calculateTotals();
        
        message += "РАСЧЁТ:\n";
        message += `Товары: ${Formatters.price(totals.subtotal)}\n`;
        if (totals.productDiscount > 0) {
            message += `Скидка: -${Formatters.price(totals.productDiscount)}\n`;
        }
        message += `Доставка: ${totals.deliveryFee === 0 ? 'БЕСПЛАТНО ✨' : Formatters.price(totals.deliveryFee)}\n`;
        message += `\n💰 ИТОГО К ОПЛАТЕ: ${Formatters.price(totals.total)} ₽\n\n`;
        
        message += `📱 Товаров в заказе: ${totals.itemsCount}`;

        const botUsername = appConfig.telegramBot || "shopte123_bot"; // Ваш Telegram бот
        const url = `https://t.me/${botUsername}?text=${encodeURIComponent(message)}`;
        
        window.location.href = url;
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}
