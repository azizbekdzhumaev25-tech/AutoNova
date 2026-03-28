// Placeholder: reviews.js
/* ========================================
   AutoNova - Reviews Module
   Модуль отзывов
   ======================================== */

const ReviewsModule = {
    // Текущий productId
    productId: null,

    // Состояние
    state: {
        sortBy: 'newest',
        filterRating: null,
        page: 1,
        perPage: 5,
        isWriting: false
    },

    /**
     * Инициализация модуля
     */
    init(productId) {
        this.productId = productId;
        this.bindEvents();
        this.render();

        console.log('Reviews module initialized for product:', productId);
    },

    /**
     * Привязка событий
     */
    bindEvents() {
        // Сортировка отзывов
        const sortSelect = document.querySelector('.reviews-list__sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.state.sortBy = e.target.value;
                this.state.page = 1;
                this.renderReviewsList();
            });
        }

        // Фильтрация по рейтингу
        document.addEventListener('click', (e) => {
            const ratingRow = e.target.closest('.reviews-distribution__row');
            if (ratingRow) {
                const rating = parseInt(ratingRow.dataset.rating);
                if (this.state.filterRating === rating) {
                    this.state.filterRating = null;
                } else {
                    this.state.filterRating = rating;
                }
                this.state.page = 1;
                this.renderReviewsList();
                this.updateDistributionHighlight();
            }
        });

        // Кнопка "Написать отзыв"
        const writeBtn = document.querySelector('.reviews-summary__write-btn');
        if (writeBtn) {
            writeBtn.addEventListener('click', () => this.showReviewForm());
        }

        // Полезность отзыва
        document.addEventListener('click', (e) => {
            const helpfulBtn = e.target.closest('[data-review-helpful]');
            if (helpfulBtn && !helpfulBtn.classList.contains('active')) {
                this.markHelpful(parseInt(helpfulBtn.dataset.reviewHelpful), helpfulBtn);
            }
        });

        // Пагинация отзывов
        document.addEventListener('click', (e) => {
            const moreBtn = e.target.closest('[data-load-more-reviews]');
            if (moreBtn) {
                this.state.page++;
                this.loadMoreReviews();
            }
        });
    },

    /**
     * Полный рендер
     */
    render() {
        this.renderSummary();
        this.renderDistribution();
        this.renderReviewsList();
    },

    /**
     * Рендер сводки рейтинга
     */
    renderSummary() {
        const stats = ReviewsDB.getRatingStats(this.productId);

        const summaryValue = document.querySelector('.reviews-summary__value');
        const summaryCount = document.querySelector('.reviews-summary__count');
        const summaryStars = document.querySelector('.reviews-summary__rating .reviews-summary__stars');

        if (summaryValue) summaryValue.textContent = stats.average;
        if (summaryCount) summaryCount.textContent = `${stats.total} ${Helpers.pluralize(stats.total, ['отзыв', 'отзыва', 'отзывов'])}`;
        if (summaryStars) summaryStars.innerHTML = Formatters.ratingStars(parseFloat(stats.average));
    },

    /**
     * Рендер распределения по звёздам
     */
    renderDistribution() {
        const stats = ReviewsDB.getRatingStats(this.productId);
        const container = document.querySelector('.reviews-distribution');
        if (!container) return;

        container.innerHTML = [5, 4, 3, 2, 1].map(rating => `
            <div class="reviews-distribution__row ${this.state.filterRating === rating ? 'active' : ''}" 
                 data-rating="${rating}" 
                 style="cursor: pointer;">
                <span class="reviews-distribution__label">
                    ${rating}
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                    </svg>
                </span>
                <div class="reviews-distribution__bar">
                    <div class="reviews-distribution__bar-fill" 
                         style="width: ${stats.distributionPercent[rating] || 0}%">
                    </div>
                </div>
                <span class="reviews-distribution__count">${stats.distribution[rating] || 0}</span>
            </div>
        `).join('');
    },

    /**
     * Подсветка активного фильтра рейтинга
     */
    updateDistributionHighlight() {
        document.querySelectorAll('.reviews-distribution__row').forEach(row => {
            const rating = parseInt(row.dataset.rating);
            row.classList.toggle('active', this.state.filterRating === rating);
            row.style.opacity = (this.state.filterRating === null || this.state.filterRating === rating) ? '1' : '0.5';
        });
    },

    /**
     * Рендер списка отзывов
     */
    renderReviewsList() {
        const result = ReviewsDB.getByProductId(this.productId, {
            sortBy: this.state.sortBy,
            rating: this.state.filterRating,
            page: 1,
            perPage: this.state.page * this.state.perPage
        });

        const container = document.querySelector('.reviews-list__items');
        if (!container) return;

        // Обновляем заголовок
        const title = document.querySelector('.reviews-list__title');
        if (title) {
            let titleText = 'Отзывы покупателей';
            if (this.state.filterRating) {
                titleText += ` (${this.state.filterRating} ★)`;
            }
            title.textContent = titleText;
        }

        if (result.reviews.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding: var(--spacing-8);">
                    <p style="color: var(--text-secondary);">
                        ${this.state.filterRating 
                            ? `Нет отзывов с рейтингом ${this.state.filterRating} ★` 
                            : 'Пока нет отзывов. Будьте первым!'
                        }
                    </p>
                    ${this.state.filterRating ? `
                        <button class="btn btn--outline btn--sm" style="margin-top: var(--spacing-3);" 
                                onclick="ReviewsModule.state.filterRating = null; ReviewsModule.renderReviewsList(); ReviewsModule.updateDistributionHighlight();">
                            Показать все отзывы
                        </button>
                    ` : ''}
                </div>
            `;
            return;
        }

        container.innerHTML = result.reviews.map(review => this.renderReviewCard(review)).join('');

        // Кнопка "Показать ещё"
        if (result.pagination.total > result.reviews.length) {
            const remaining = result.pagination.total - result.reviews.length;
            container.innerHTML += `
                <div style="text-align: center; padding: var(--spacing-4);">
                    <button class="btn btn--outline" data-load-more-reviews>
                        Показать ещё ${remaining} ${Helpers.pluralize(remaining, ['отзыв', 'отзыва', 'отзывов'])}
                    </button>
                </div>
            `;
        }
    },

    /**
     * Загрузить ещё отзывы
     */
    loadMoreReviews() {
        this.renderReviewsList();
    },

    /**
     * Рендер карточки отзыва
     */
    renderReviewCard(review) {
        const initials = review.userName.split(' ').map(n => n[0]).join('').toUpperCase();

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            const cls = i <= review.rating ? '' : 'class="empty"';
            starsHtml += `<svg viewBox="0 0 24 24" ${cls}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>`;
        }

        return `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-card__header">
                    <div class="review-card__author">
                        <div class="review-card__avatar">${initials}</div>
                        <div class="review-card__author-info">
                            <span class="review-card__author-name">${Helpers.escapeHtml(review.userName)}</span>
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
                
                ${review.title ? `<h4 class="review-card__title">${Helpers.escapeHtml(review.title)}</h4>` : ''}
                <p class="review-card__text">${Helpers.escapeHtml(review.text)}</p>
                
                ${(review.pros?.length || review.cons?.length) ? `
                    <div class="review-card__pros-cons">
                        ${review.pros?.length ? `
                            <div class="review-card__pros">
                                <div class="review-card__pros-title">Достоинства</div>
                                <div class="review-card__pros-list">
                                    ${review.pros.map(p => `<span>+ ${Helpers.escapeHtml(p)}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${review.cons?.length ? `
                            <div class="review-card__cons">
                                <div class="review-card__cons-title">Недостатки</div>
                                <div class="review-card__cons-list">
                                    ${review.cons.map(c => `<span>− ${Helpers.escapeHtml(c)}</span>`).join('')}
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
                        <div class="review-card__reply-author">Ответ магазина AutoNova</div>
                        <p class="review-card__reply-text">${Helpers.escapeHtml(review.reply.text)}</p>
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Отметить отзыв полезным
     */
    markHelpful(reviewId, button) {
        const review = ReviewsDB.markHelpful(reviewId, true);
        if (!review) return;

        button.classList.add('active');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            ${review.helpfulCount}
        `;

        Notifications.success('Спасибо за вашу оценку!');
    },

    /**
     * Показать форму написания отзыва
     */
    showReviewForm() {
        this.state.isWriting = true;

        // Создаём модальное окно с формой
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'review-modal';
        modal.innerHTML = `
            <div class="modal__backdrop"></div>
            <div class="modal__container" style="max-width: 600px;">
                <div class="modal__header">
                    <h3 class="modal__title">Написать отзыв</h3>
                    <button class="modal__close" id="close-review-modal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal__body">
                    <form id="review-form">
                        <div class="form-group">
                            <label class="form-label form-label--required">Ваша оценка</label>
                            <div class="rating-input" id="rating-input">
                                ${[5, 4, 3, 2, 1].map(i => `
                                    <span class="rating-input__star" data-rating="${i}">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </span>
                                `).join('')}
                            </div>
                            <input type="hidden" name="rating" id="review-rating" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Ваше имя</label>
                            <input type="text" class="form-input" name="userName" placeholder="Как вас зовут?" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label form-label--required">Заголовок</label>
                            <input type="text" class="form-input" name="title" placeholder="Кратко опишите впечатление" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label form-label--required">Отзыв</label>
                            <textarea class="form-input form-textarea" name="text" placeholder="Расскажите подробнее о вашем опыте использования..." rows="4" required></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Достоинства</label>
                            <input type="text" class="form-input" name="pros" placeholder="Через запятую">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Недостатки</label>
                            <input type="text" class="form-input" name="cons" placeholder="Через запятую">
                        </div>
                    </form>
                </div>
                <div class="modal__footer">
                    <button class="btn btn--outline" id="cancel-review">Отмена</button>
                    <button class="btn btn--primary" id="submit-review">Отправить отзыв</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Привязываем события формы
        this.bindReviewFormEvents(modal);
    },

    /**
     * Привязка событий формы отзыва
     */
    bindReviewFormEvents(modal) {
        // Закрытие
        modal.querySelector('#close-review-modal').addEventListener('click', () => this.closeReviewForm(modal));
        modal.querySelector('#cancel-review').addEventListener('click', () => this.closeReviewForm(modal));
        modal.querySelector('.modal__backdrop').addEventListener('click', () => this.closeReviewForm(modal));

        // Выбор рейтинга
        let selectedRating = 0;
        const ratingInput = modal.querySelector('#review-rating');
        modal.querySelectorAll('.rating-input__star').forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                ratingInput.value = selectedRating;

                modal.querySelectorAll('.rating-input__star').forEach(s => {
                    const r = parseInt(s.dataset.rating);
                    s.classList.toggle('active', r <= selectedRating);
                    s.querySelector('svg').style.fill = r <= selectedRating ? '#ffc107' : '#e0e0e0';
                });
            });

            star.addEventListener('mouseenter', () => {
                const hoverRating = parseInt(star.dataset.rating);
                modal.querySelectorAll('.rating-input__star').forEach(s => {
                    const r = parseInt(s.dataset.rating);
                    s.querySelector('svg').style.fill = r <= hoverRating ? '#ffc107' : '#e0e0e0';
                });
            });
        });

        modal.querySelector('.rating-input')?.addEventListener('mouseleave', () => {
            modal.querySelectorAll('.rating-input__star').forEach(s => {
                const r = parseInt(s.dataset.rating);
                s.querySelector('svg').style.fill = r <= selectedRating ? '#ffc107' : '#e0e0e0';
            });
        });

        // Отправка
        modal.querySelector('#submit-review').addEventListener('click', () => {
            this.submitReview(modal);
        });
    },

    /**
     * Отправка отзыва
     */
    submitReview(modal) {
        const form = modal.querySelector('#review-form');
        const formData = new FormData(form);

        const reviewData = {
            productId: this.productId,
            userId: Date.now(),
            userName: formData.get('userName') || 'Анонимный пользователь',
            rating: parseInt(formData.get('rating')),
            title: formData.get('title'),
            text: formData.get('text'),
            pros: formData.get('pros') ? formData.get('pros').split(',').map(s => s.trim()).filter(Boolean) : [],
            cons: formData.get('cons') ? formData.get('cons').split(',').map(s => s.trim()).filter(Boolean) : [],
            isVerifiedPurchase: Cart.hasItem(this.productId),
            images: []
        };

        // Валидация
        if (!reviewData.rating) {
            Notifications.error('Пожалуйста, поставьте оценку');
            return;
        }
        if (!reviewData.title?.trim()) {
            Notifications.error('Введите заголовок отзыва');
            return;
        }
        if (!reviewData.text?.trim() || reviewData.text.length < 20) {
            Notifications.error('Отзыв должен содержать минимум 20 символов');
            return;
        }

        // Сохраняем отзыв
        const newReview = ReviewsDB.addReview(reviewData);

        // Закрываем форму
        this.closeReviewForm(modal);

        // Обновляем отображение
        this.render();

        // Уведомление
        Notifications.success('Спасибо! Ваш отзыв успешно отправлен.');
    },

    /**
     * Закрыть форму отзыва
     */
    closeReviewForm(modal) {
        this.state.isWriting = false;
        modal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            modal.remove();
        }, 300);
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsModule;
}