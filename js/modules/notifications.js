// Placeholder: notifications.js
/* ========================================
   AutoNova - Notifications Module
   Модуль уведомлений (тостов)
   ======================================== */

const Notifications = {
    // Контейнер для уведомлений
    container: null,

    // Очередь уведомлений
    queue: [],

    // Настройки
    config: {
        duration: 4000,
        maxVisible: 5,
        position: 'top-right'
    },

    // Счётчик для ID
    counter: 0,

    /**
     * Инициализация модуля
     */
    init() {
        this.createContainer();
        console.log('Notifications module initialized');
    },

    /**
     * Создание контейнера для уведомлений
     */
    createContainer() {
        if (this.container) return;

        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Уведомления');
        document.body.appendChild(this.container);
    },

    /**
     * Показать уведомление
     */
    show(options) {
        const {
            type = 'info', // success, error, warning, info
            title = '',
            message = '',
            duration = this.config.duration,
            action = null, // { text, url, callback }
            closeable = true
        } = options;

        const id = ++this.counter;

        // Создаём элемент уведомления
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.dataset.toastId = id;
        toast.setAttribute('role', 'alert');

        // Иконка
        const icon = this.getIcon(type);

        // HTML уведомления
        toast.innerHTML = `
            <div class="toast__icon">${icon}</div>
            <div class="toast__content">
                ${title ? `<div class="toast__title">${title}</div>` : ''}
                <div class="toast__message">${message}</div>
                ${action ? `
                    <div class="toast__action">
                        ${action.url ? `
                            <a href="${action.url}" class="btn btn--link btn--sm">${action.text}</a>
                        ` : `
                            <button class="btn btn--link btn--sm" data-toast-action>${action.text}</button>
                        `}
                    </div>
                ` : ''}
            </div>
            ${closeable ? `
                <button class="toast__close" aria-label="Закрыть">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            ` : ''}
            ${duration > 0 ? `
                <div class="toast__progress">
                    <div class="toast__progress-bar" style="transition: width ${duration}ms linear;"></div>
                </div>
            ` : ''}
        `;

        // Привязываем события
        const closeBtn = toast.querySelector('.toast__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide(id));
        }

        const actionBtn = toast.querySelector('[data-toast-action]');
        if (actionBtn && action && action.callback) {
            actionBtn.addEventListener('click', () => {
                action.callback();
                this.hide(id);
            });
        }

        // Добавляем в контейнер
        this.container.appendChild(toast);

        // Запускаем анимацию прогресс-бара
        if (duration > 0) {
            requestAnimationFrame(() => {
                const progressBar = toast.querySelector('.toast__progress-bar');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            });
        }

        // Автоматическое закрытие
        if (duration > 0) {
            setTimeout(() => this.hide(id), duration);
        }

        // Ограничиваем количество видимых уведомлений
        this.enforceMaxVisible();

        return id;
    },

    /**
     * Скрыть уведомление
     */
    hide(id) {
        const toast = this.container.querySelector(`[data-toast-id="${id}"]`);
        if (!toast) return;

        toast.classList.add('removing');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    },

    /**
     * Скрыть все уведомления
     */
    hideAll() {
        const toasts = this.container.querySelectorAll('.toast');
        toasts.forEach(toast => {
            const id = parseInt(toast.dataset.toastId);
            this.hide(id);
        });
    },

    /**
     * Ограничение количества видимых уведомлений
     */
    enforceMaxVisible() {
        const toasts = this.container.querySelectorAll('.toast:not(.removing)');
        
        if (toasts.length > this.config.maxVisible) {
            const toRemove = toasts.length - this.config.maxVisible;
            for (let i = 0; i < toRemove; i++) {
                const id = parseInt(toasts[i].dataset.toastId);
                this.hide(id);
            }
        }
    },

    /**
     * Получить иконку по типу
     */
    getIcon(type) {
        const icons = {
            success: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `,
            error: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            `,
            warning: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            `,
            info: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            `
        };

        return icons[type] || icons.info;
    },

    // Shortcut методы
    success(message, options = {}) {
        return this.show({ type: 'success', message, ...options });
    },

    error(message, options = {}) {
        return this.show({ type: 'error', message, ...options });
    },

    warning(message, options = {}) {
        return this.show({ type: 'warning', message, ...options });
    },

    info(message, options = {}) {
        return this.show({ type: 'info', message, ...options });
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Notifications;
}