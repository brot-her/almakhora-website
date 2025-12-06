// Alma Khora Art Studio - Main JavaScript
console.log('Alma Khora website loaded successfully');

document.addEventListener('DOMContentLoaded', function() {
    // ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const yearSpan = document.getElementById('currentYear');
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalWorkshopTitle');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

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

                    const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;

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

    // 9. ФИКСИРОВАННЫЙ ХЕДЕР ПРИ СКРОЛЛЕ
    function initFixedHeader() {
        const header = document.querySelector('header');
        if (!header) return;

        const headerHeight = header.offsetHeight;

        // Устанавливаем начальный отступ для body
        document.body.style.paddingTop = headerHeight + 'px';

        // Просто добавляем тень при скролле (без скрытия хедера)
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Обновляем отступ при изменении размера окна
        window.addEventListener('resize', function() {
            document.body.style.paddingTop = header.offsetHeight + 'px';
        });
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

    // ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
    function initAll() {
        console.log('Initializing all features...');

        initMobileMenu();
        initSmoothScroll();
        initMenuHighlight();
        initScrollAnimation();
        initParallax();
        initModal();
        initBookingButtons();
        initFixedHeader();
        initImagePreload();

        console.log('All features initialized successfully');
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