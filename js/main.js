/* ============================================
   ТРЕНИНГ "ВОЗВРАЩЕНИЕ СИЛЫ" - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // АНИМАЦИЯ ПРИ СКРОЛЛЕ
    // ============================================
    const revealElements = document.querySelectorAll('.program-card, .result-card, .for-whom__content, .author__content, .atmosphere__item');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                // Добавляем небольшую задержку для каждого элемента
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };

    // Инициализация стилей для анимации
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Запускаем анимацию при загрузке и скролле
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    setTimeout(revealOnScroll, 100);

    // ============================================
    // ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO
    // ============================================
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = (scrolled * parallaxSpeed) + 'px';
            }
        });
    }

    // ============================================
    // ЭФФЕКТ ПОДСВЕТКИ КАРТОЧЕК ПРОГРАММЫ
    // ============================================
    const programCards = document.querySelectorAll('.program-card');

    programCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 20px 60px rgba(74, 93, 68, 0.15)';
        });
    });

    // ============================================
    // АНИМАЦИЯ ЧИСЕЛ В БЛОКЕ ОБ АВТОРЕ
    // ============================================
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.author__stat-number');
        const observerOptions = {
            threshold: 0.5
        };

        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.textContent);
                    let currentNumber = 0;
                    const duration = 2000;
                    const stepTime = duration / finalNumber;

                    const counter = setInterval(() => {
                        currentNumber++;
                        target.textContent = currentNumber;

                        if (currentNumber >= finalNumber) {
                            clearInterval(counter);
                        }
                    }, stepTime);

                    numberObserver.unobserve(target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(num => numberObserver.observe(num));
    };

    // Запускаем анимацию чисел
    if ('IntersectionObserver' in window) {
        animateNumbers();
    }

    // ============================================
    // ФИКСАЦИЯ КНОПКИ НА МОБИЛЬНЫХ
    // ============================================
    // ============================================
    // ФИКСАЦИЯ КНОПКИ НА МОБИЛЬНЫХ (Перенесено в CSS/HTML)
    // ============================================
    // Logic removed in favor of .mobile-sticky-btn in CSS

    // ============================================
    // ПРЕЛОАДЕР
    // ============================================
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader__spinner">
            <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#C87556" stroke-width="2"/>
            </svg>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #F5F2EA;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    const preloaderSpinner = preloader.querySelector('.preloader__spinner');
    preloaderSpinner.style.cssText = `
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    `;

    // Добавляем анимацию спиннера
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 500);
        }, 500);
    });

});

// ============================================
// МОДАЛЬНОЕ ОКНО - ГЛОБАЛЬНЫЕ ФУНКЦИИ
// ============================================

function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы

        // Фокус на первое поле
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
    }
}

// Закрытие по Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Закрытие по клику вне модального окна
document.addEventListener('click', function (e) {
    const modal = document.getElementById('modal');
    if (modal && modal.classList.contains('active')) {
        const content = modal.querySelector('.modal__content');
        if (!content.contains(e.target) && !e.target.closest('.btn')) {
            closeModal();
        }
    }
});

// ============================================
// ВАЛИДАЦИЯ ЧЕКБОКСА (152-ФЗ)
// ============================================
document.addEventListener('change', function (e) {
    if (e.target.name === 'agreement_legal') {
        const form = e.target.closest('form');
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = !e.target.checked;
    }
});

// Проверка при загрузке (если браузер запомнил состояние)
document.addEventListener('DOMContentLoaded', () => {
    const legalCheckbox = document.querySelector('input[name="agreement_legal"]');
    if (legalCheckbox) {
        const form = legalCheckbox.closest('form');
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = !legalCheckbox.checked;
    }
    initCarousel();
});

// ============================================
// CAROUSEL LOGIC
// ============================================
let currentSlide = 0;

function initCarousel() {
    showSlide(0);
}

function moveCarousel(direction) {
    const track = document.querySelector('.carousel__track');
    const slides = document.querySelectorAll('.carousel__slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function setSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function showSlide(index) {
    const track = document.querySelector('.carousel__track');
    const dots = document.querySelectorAll('.carousel__dot');

    if (!track) return;

    // Shift track
    track.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// ============================================
// ОБРАБОТКА ФОРМЫ
// ============================================

function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const submitBtn = form.querySelector('.modal__submit');

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    // Реальная отправка на будущий бэкенд
    fetch('/api/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                form.innerHTML = `
                <div style="text-align: center; padding: 30px 0;">
                    <div style="font-size: 3rem; color: #4A5D44; margin-bottom: 20px;">✓</div>
                    <h3 style="font-family: 'Forum', serif; font-size: 1.5rem; color: #2C2C2C; margin-bottom: 15px;">Заявка отправлена!</h3>
                    <p style="color: #6B6B6B;">Мы свяжемся с вами в ближайшее время.</p>
                </div>
            `;
                setTimeout(() => {
                    // TODO: Замените ссылку на актуальную (сообщение в Telegram)
                    window.location.href = 'https://t.me/mariettamirranika';
                }, 2000);
            } else {
                throw new Error('Ошибка сервера');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Извините, произошла ошибка. Попробуйте еще раз или свяжитесь с нами напрямую.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// ============================================
// МАСКА ДЛЯ ТЕЛЕФОНА
// ============================================

document.addEventListener('input', function (e) {
    if (e.target.matches('input[type="tel"]')) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }

            let formattedValue = '+7';

            if (value.length > 0) {
                formattedValue += ' (' + value.substring(0, 3);
            }
            if (value.length >= 3) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length >= 6) {
                formattedValue += '-' + value.substring(6, 8);
            }
            if (value.length >= 8) {
                formattedValue += '-' + value.substring(8, 10);
            }

            e.target.value = formattedValue;
        }
    }
});
