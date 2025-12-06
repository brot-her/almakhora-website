// Alma Khora Art Studio - Main JavaScript (Исправленная версия)
console.log('Alma Khora website loaded successfully - Header fixed version');

document.addEventListener('DOMContentLoaded', function() {
    // ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const yearSpan = document.getElementById('currentYear');
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalWorkshopTitle');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Переменные для управления хедером
    let isHeaderFixed = false;
    let headerHeight = 0;

    // 1. ТЕКУЩИЙ ГОД В ФУТЕРЕ
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        console.log(`Year updated to: ${yearSpan.textContent}`);
    }

    // 2. МОБИЛЬНОЕ МЕНЮ
    function initMobileMenu() {
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');

            if (nav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
                document.body.style.overflow = 'hidden';
                console.log('Mobile menu opened');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = 'auto';
                console.log('Mobile menu closed');
            }
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = 'auto';
            });
        });

        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 3. ПЛАВНАЯ ПРОКРУТКА
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                // Пропускаем ссылки без якоря
                if (targetId === '#' || !targetId.startsWith('#')) return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    // Закрываем мобильное меню если оно открыто
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                        document.body.style.overflow = 'auto';
                    }

                    const currentHeaderHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : headerHeight;
                    const targetPosition = targetElement.offsetTop - currentHeaderHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    console.log(`Smooth scroll to: ${targetId}`);
                }
            });
        });
    }

    // 4. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ
    function initMenuHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        function highlightMenu() {
            let current = '';
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightMenu);
        highlightMenu(); // Инициализация при загрузке
    }

    // 5. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
    function initScrollAnimation() {
        const animatedElements = document.querySelectorAll('.card, .gallery-item, .contact-item');

        if (animatedElements.length === 0) return;

        // Устанавливаем начальные стили
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        function checkElements() {
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight * 0.85;

                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        window.addEventListener('scroll', checkElements);
        checkElements(); // Проверяем сразу
    }

    // 6. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ ГЕРОЯ
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxValue = scrolled * 0.5;

            hero.style.transform = `translateY(${parallaxValue}px)`;
            hero.style.transition = 'transform 0.1s ease-out';
        });
    }

    // 7. МОДАЛЬНОЕ ОКНО ДЛЯ ЗАПИСИ
    function initModal() {
        if (!modal || !modalTitle) {
            console.warn('Modal elements not found');
            return;
        }

        // Функция закрытия модального окна
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Modal closed');
        }

        // Обработчики закрытия
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        // Закрытие по клику вне модалки
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });

        // Закрытие по клавише ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // 8. КНОПКИ ЗАПИСИ НА МАСТЕР-КЛАССЫ
    function initBookingButtons() {
        const bookingButtons = document.querySelectorAll('.card-link');

        bookingButtons.forEach(button => {
            // Удалим все существующие обработчики
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });

        // Добавим новые обработчики после небольшой задержки
        setTimeout(() => {
            document.querySelectorAll('.card-link').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Получаем название мастер-класса
                    let workshopName = 'мастер-класс';
                    const card = this.closest('.card');

                    if (card && card.querySelector('h3')) {
                        workshopName = card.querySelector('h3').textContent;
                    }

                    console.log('Opening modal for:', workshopName);

                    // Открываем модальное окно
                    if (typeof window.bookWorkshop === 'function') {
                        window.bookWorkshop(workshopName);
                    } else {
                        // Fallback: прямое открытие
                        const modal = document.getElementById('bookingModal');
                        const modalTitle = document.getElementById('modalWorkshopTitle');

                        if (modal && modalTitle) {
                            modalTitle.textContent = workshopName;
                            modal.style.display = 'block';
                            document.body.style.overflow = 'hidden';
                        }
                    }
                });

                // Меняем href чтобы не скроллило наверх
                button.href = 'javascript:void(0)';
            });

            console.log('Booking buttons initialized:', document.querySelectorAll('.card-link').length);
        }, 100);
    }

    // 9. ФИКСИРОВАННЫЙ ХЕДЕР ПРИ СКРОЛЛЕ (ИСПРАВЛЕННАЯ ВЕРСИЯ)
    function initFixedHeader() {
        const header = document.querySelector('header');
        if (!header) {
            console.error('Header element not found');
            return;
        }

        console.log('Initializing fixed header...');

        // 1. Сбрасываем все возможные трансформации
        header.style.transform = 'translateY(0) !important';
        header.style.transition = 'transform 0.3s ease';

        // 2. Добавляем CSS класс для дополнительной защиты
        header.classList.add('fixed-header');

        // 3. Получаем высоту хедера
        headerHeight = header.offsetHeight;
        console.log('Header height:', headerHeight);

        // 4. Устанавливаем отступ для body
        document.body.style.paddingTop = headerHeight + 'px';
        document.body.classList.add('has-fixed-header');

        // 5. Добавляем CSS переменную для высоты хедера
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');

        // 6. Защита от скрытия хедера
        const protectHeader = function() {
            // Гарантируем что хедер всегда виден
            header.style.transform = 'translateY(0)';

            // Добавляем/убираем тень при скролле (опционально)
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        // 7. Устанавливаем обработчик скролла
        window.addEventListener('scroll', protectHeader, { passive: true });

        // 8. Защита от других скриптов, которые могут скрывать хедер
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const currentTransform = header.style.transform || '';
                    if (currentTransform.includes('translateY(-') || currentTransform.includes('translateY( -')) {
                        console.warn('Header was hidden by another script, restoring...');
                        header.style.transform = 'translateY(0)';
                    }
                }
            });
        });

        observer.observe(header, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // 9. Обновляем высоту при ресайзе
        window.addEventListener('resize', function() {
            const newHeight = header.offsetHeight;
            document.body.style.paddingTop = newHeight + 'px';
            document.documentElement.style.setProperty('--header-height', newHeight + 'px');
            headerHeight = newHeight;
            console.log('Header height updated to:', newHeight);
        });

        isHeaderFixed = true;
        console.log('Fixed header initialized successfully');
    }

    // 10. ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ
    function initImagePreload() {
        const images = document.querySelectorAll('img[data-src]');

        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // 11. ОЧИСТКА СТАРЫХ ОБРАБОТЧИКОВ СКРОЛЛА (дополнительная защита)
    function cleanupOldScrollHandlers() {
        console.log('Cleaning up old scroll handlers...');

        // Создаем чистую функцию без логики скрытия
        const cleanScrollHandler = function() {
            // Минимальная логика только для тени
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };

        // Заменяем window.onscroll
        window.onscroll = cleanScrollHandler;

        // Удаляем все обработчики через клонирование window (нельзя напрямую)
        // Вместо этого установим наш обработчик с самым высоким приоритетом
        window.addEventListener('scroll', function(e) {
            // Останавливаем всплытие только для хедера
            const header = document.querySelector('header');
            if (header) {
                header.style.transform = 'translateY(0)';
            }
        }, { capture: true });
    }

    // ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
    function initAll() {
        console.log('Initializing all features...');

        // Сначала фиксируем хедер
        initFixedHeader();
        cleanupOldScrollHandlers();

        // Затем остальные функции
        initMobileMenu();
        initSmoothScroll();
        initMenuHighlight();
        initScrollAnimation();
        initParallax();
        initModal();
        initBookingButtons();
        initImagePreload();

        console.log('All features initialized successfully');

        // Финальная проверка через 1 секунду
        setTimeout(() => {
            const header = document.querySelector('header');
            if (header) {
                const transform = getComputedStyle(header).transform;
                console.log('Final header check - Transform:', transform);
                if (transform !== 'matrix(1, 0, 0, 1, 0, 0)' && transform !== 'none') {
                    console.warn('Header has unexpected transform, fixing...');
                    header.style.transform = 'translateY(0)';
                }
            }
        }, 1000);
    }

    // ЗАПУСК ИНИЦИАЛИЗАЦИИ
    initAll();

    // ОБРАБОТЧИК ОШИБОК
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
    });
});

// ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ИСПОЛЬЗОВАНИЯ В HTML
if (typeof window.bookWorkshop === 'undefined') {
    window.bookWorkshop = function(workshopTitle) {
        console.log('bookWorkshop called with:', workshopTitle);

        const modal = document.getElementById('bookingModal');
        const modalTitle = document.getElementById('modalWorkshopTitle');

        if (modal && modalTitle) {
            modalTitle.textContent = workshopTitle || 'мастер-класс';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully');
            return true;
        } else {
            console.error('Modal elements not found');
            return false;
        }
    };
}

if (typeof window.closeBookingModal === 'undefined') {
    window.closeBookingModal = function() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Modal closed');
        }
    };
}

// ДОПОЛНИТЕЛЬНАЯ ЗАЩИТА ДЛЯ ХЕДЕРА
(function() {
    // Запускаем после полной загрузки страницы
    window.addEventListener('load', function() {
        console.log('Page fully loaded, applying header protection...');

        const header = document.querySelector('header');
        if (!header) return;

        // 1. Устанавливаем фиксированное положение
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';

        // 2. Гарантируем видимость
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease';

        // 3. Добавляем важные стили через CSSOM
        const style = document.createElement('style');
        style.textContent = `
            /* ЗАЩИТА ХЕДЕРА ОТ СКРЫТИЯ */
            header.fixed-header {
                transform: translateY(0) !important;
                transition: transform 0.3s ease !important;
            }

            body.has-fixed-header {
                padding-top: var(--header-height, 80px) !important;
            }

            @media (max-width: 768px) {
                body.has-fixed-header {
                    padding-top: var(--header-height-mobile, 70px) !important;
                }
            }

            /* Отключаем любые анимации скрытия */
            header.hide-on-scroll,
            header[style*="transform: translateY(-"],
            header[style*="transform:translateY(-"] {
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);

        // 4. Защита от попыток скрыть хедер
        const originalSetAttribute = header.setAttribute.bind(header);
        header.setAttribute = function(name, value) {
            if (name === 'style' && value.includes('translateY(-')) {
                console.warn('Attempt to hide header blocked');
                value = value.replace(/transform\s*:\s*translateY\([^)]+\)/g, 'transform: translateY(0)');
            }
            originalSetAttribute(name, value);
        };

        console.log('Header protection applied');
    });
})();