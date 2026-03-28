// Placeholder: search.js
/* ========================================
   AutoNova - Search Module
   Модуль поиска
   ======================================== */

const Search = {
    // Состояние
    state: {
        query: '',
        suggestions: [],
        isOpen: false,
        focusedIndex: -1,
        isLoading: false
    },

    // Элементы DOM
    elements: {
        form: null,
        input: null,
        suggestions: null,
        button: null
    },

    // Настройки
    config: {
        minChars: 2,
        maxSuggestions: 8,
        debounceDelay: 300
    },

    /**
     * Инициализация модуля поиска
     */
    init() {
        this.cacheElements();
        
        if (!this.elements.form) return;
        
        this.bindEvents();
        this.loadSearchHistory();
        
        console.log('Search module initialized');
    },

    /**
     * Кэширование DOM элементов
     */
    cacheElements() {
        this.elements.form = document.querySelector('.search-form');
        if (!this.elements.form) return;

        this.elements.input = this.elements.form.querySelector('.search-form__input');
        this.elements.suggestions = this.elements.form.querySelector('.search-form__suggestions');
        this.elements.button = this.elements.form.querySelector('.search-form__button');

        // Создаём контейнер для подсказок, если его нет
        if (!this.elements.suggestions) {
            this.elements.suggestions = document.createElement('div');
            this.elements.suggestions.className = 'search-form__suggestions';
            this.elements.form.querySelector('.search-form__input-wrapper').appendChild(this.elements.suggestions);
        }
    },

    /**
     * Привязка событий
     */
    bindEvents() {
        // Ввод в поле поиска
        this.elements.input.addEventListener('input', 
            Helpers.debounce((e) => this.handleInput(e), this.config.debounceDelay)
        );

        // Фокус на поле
        this.elements.input.addEventListener('focus', () => this.handleFocus());

        // Потеря фокуса
        this.elements.input.addEventListener('blur', (e) => {
            // Задержка, чтобы успеть кликнуть по подсказке
            setTimeout(() => this.closeSuggestions(), 200);
        });

        // Клавиатурная навигация
        this.elements.input.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Отправка формы
        this.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Клик по подсказке
        this.elements.suggestions.addEventListener('click', (e) => {
            const suggestion = e.target.closest('.search-suggestion');
            if (suggestion) {
                this.handleSuggestionClick(suggestion);
            }
        });

        // Закрытие по клику вне
        document.addEventListener('click', (e) => {
            if (!this.elements.form.contains(e.target)) {
                this.closeSuggestions();
            }
        });
    },

    /**
     * Обработка ввода
     */
    handleInput(e) {
        const query = e.target.value.trim();
        this.state.query = query;

        if (query.length < this.config.minChars) {
            this.showSearchHistory();
            return;
        }

        this.search(query);
    },

    /**
     * Обработка фокуса
     */
    handleFocus() {
        if (this.state.query.length >= this.config.minChars) {
            this.openSuggestions();
        } else {
            this.showSearchHistory();
        }
    },

    /**
     * Обработка клавиш
     */
    handleKeydown(e) {
        if (!this.state.isOpen) return;

        const suggestions = this.elements.suggestions.querySelectorAll('.search-suggestion');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.state.focusedIndex = Math.min(
                    this.state.focusedIndex + 1, 
                    suggestions.length - 1
                );
                this.updateFocusedSuggestion(suggestions);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.state.focusedIndex = Math.max(this.state.focusedIndex - 1, -1);
                this.updateFocusedSuggestion(suggestions);
                break;

            case 'Enter':
                if (this.state.focusedIndex >= 0) {
                    e.preventDefault();
                    this.handleSuggestionClick(suggestions[this.state.focusedIndex]);
                }
                break;

            case 'Escape':
                this.closeSuggestions();
                this.elements.input.blur();
                break;
        }
    },

    /**
     * Обновление фокуса подсказки
     */
    updateFocusedSuggestion(suggestions) {
        suggestions.forEach((s, i) => {
            s.classList.toggle('focused', i === this.state.focusedIndex);
        });

        if (this.state.focusedIndex >= 0) {
            const focused = suggestions[this.state.focusedIndex];
            const text = focused.querySelector('.search-suggestion__text')?.textContent;
            if (text) {
                this.elements.input.value = text;
            }
        } else {
            this.elements.input.value = this.state.query;
        }
    },

    /**
     * Обработка отправки формы
     */
    handleSubmit(e) {
        e.preventDefault();
        
        const query = this.elements.input.value.trim();
        
        if (query.length < this.config.minChars) return;

        // Сохраняем в историю
        Storage.addToSearchHistory(query);
        
        // Закрываем подсказки
        this.closeSuggestions();

        // Переходим на страницу результатов
        window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
    },

    /**
     * Обработка клика по подсказке
     */
    handleSuggestionClick(suggestion) {
        const type = suggestion.dataset.type;
        const id = suggestion.dataset.id;
        const text = suggestion.querySelector('.search-suggestion__text')?.textContent;

        if (type === 'product' && id) {
            // Переход на страницу товара
            window.location.href = `product.html?id=${id}`;
        } else if (type === 'history' || type === 'tag') {
            // Поиск по тексту
            this.elements.input.value = text;
            Storage.addToSearchHistory(text);
            window.location.href = `catalog.html?search=${encodeURIComponent(text)}`;
        }
    },

    /**
     * Поиск
     */
    async search(query) {
        this.state.isLoading = true;
        this.showLoadingState();

        try {
            // Имитация задержки API
            await Helpers.sleep(100);

            // Получаем подсказки
            const suggestions = ProductsDB.getSearchSuggestions(query, this.config.maxSuggestions);
            
            this.state.suggestions = suggestions;
            this.state.focusedIndex = -1;
            
            this.renderSuggestions(suggestions, query);
            this.openSuggestions();

        } catch (error) {
            console.error('Search error:', error);
            this.showErrorState();
        } finally {
            this.state.isLoading = false;
        }
    },

    /**
     * Отображение подсказок
     */
    renderSuggestions(suggestions, query) {
        if (suggestions.length === 0) {
            this.elements.suggestions.innerHTML = `
                <div class="search-suggestions__empty">
                    <p>По запросу «${Helpers.escapeHtml(query)}» ничего не найдено</p>
                </div>
            `;
            return;
        }

        // Группируем подсказки по типу
        const products = suggestions.filter(s => s.type === 'product');
        const tags = suggestions.filter(s => s.type === 'tag');

        let html = '';

        // Товары
        if (products.length > 0) {
            html += '<div class="search-suggestions__section">Товары</div>';
            html += products.map(item => `
                <div class="search-suggestion" data-type="product" data-id="${item.id}">
                    <img src="${item.image || ''}" alt="" class="search-suggestion__image">
                    <div class="search-suggestion__content">
                        <div class="search-suggestion__text">${Helpers.highlightText(item.text, query)}</div>
                    </div>
                    <div class="search-suggestion__price">${Formatters.price(item.price)}</div>
                </div>
            `).join('');
        }

        // Категории/теги
        if (tags.length > 0) {
            html += '<div class="search-suggestions__section">Категории</div>';
            html += tags.map(item => `
                <div class="search-suggestion" data-type="tag">
                    <svg class="search-suggestion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <div class="search-suggestion__content">
                        <div class="search-suggestion__text">${Helpers.highlightText(item.text, query)}</div>
                    </div>
                </div>
            `).join('');
        }

        this.elements.suggestions.innerHTML = html;
    },

    /**
     * Показать историю поиска
     */
    showSearchHistory() {
        const history = Storage.getSearchHistory();
        
        if (history.length === 0) {
            this.closeSuggestions();
            return;
        }

        let html = '<div class="search-suggestions__section">Недавние запросы</div>';
        
        html += history.slice(0, 5).map(query => `
            <div class="search-suggestion" data-type="history">
                <svg class="search-suggestion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div class="search-suggestion__content">
                    <div class="search-suggestion__text">${Helpers.escapeHtml(query)}</div>
                </div>
            </div>
        `).join('');

        html += `
            <div class="search-suggestions__footer">
                <button type="button" class="search-suggestions__clear" onclick="Search.clearHistory()">
                    Очистить историю
                </button>
            </div>
        `;

        this.elements.suggestions.innerHTML = html;
        this.openSuggestions();
    },

    /**
     * Очистить историю поиска
     */
    clearHistory() {
        Storage.clearSearchHistory();
        this.closeSuggestions();
    },

    /**
     * Показать состояние загрузки
     */
    showLoadingState() {
        this.elements.suggestions.innerHTML = `
            <div class="search-suggestions__loading">
                <div class="spinner"></div>
                <span>Поиск...</span>
            </div>
        `;
        this.openSuggestions();
    },

    /**
     * Показать состояние ошибки
     */
    showErrorState() {
        this.elements.suggestions.innerHTML = `
            <div class="search-suggestions__error">
                <p>Произошла ошибка. Попробуйте ещё раз.</p>
            </div>
        `;
    },

    /**
     * Открыть подсказки
     */
    openSuggestions() {
        this.state.isOpen = true;
        this.elements.suggestions.classList.add('active');
    },

    /**
     * Закрыть подсказки
     */
    closeSuggestions() {
        this.state.isOpen = false;
        this.state.focusedIndex = -1;
        this.elements.suggestions.classList.remove('active');
    },

    /**
     * Загрузить историю при инициализации
     */
    loadSearchHistory() {
        // Восстанавливаем запрос из URL, если есть
        const urlParams = Helpers.getUrlParams();
        if (urlParams.search) {
            this.elements.input.value = urlParams.search;
            this.state.query = urlParams.search;
        }
    },

    /**
     * Получить текущий запрос
     */
    getQuery() {
        return this.state.query;
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Search;
}