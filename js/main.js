// ============================================
// Alma Khora - ОКОНЧАТЕЛЬНО ИСПРАВЛЕННЫЙ main.js
// ============================================

console.log('🚀 Alma Khora - Header protection guaranteed');

// ГЛОБАЛЬНАЯ ЗАЩИТА ХЕДЕРА (запускается СРАЗУ)
(function() {
    'use strict';

    console.log('🛡️  Global header protection activating...');

    // 1. Функция для жесткой фиксации хедера
    function lockHeaderInPlace() {
        const header = document.querySelector('header');
        if (!header) {
            console.log('Header not found yet, will retry...');
            return false;
        }

        // АБСОЛЮТНАЯ ФИКСАЦИЯ
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        header.style.transform = 'translateY(0)';
        header.style.transition = 'none';

        // ОТКЛЮЧАЕМ ВСЕ АНИМАЦИИ
        header.style.animation = 'none';

        // Устанавливаем отступ для body
        const height = header.offsetHeight;
        document.body.style.paddingTop = height + 'px';

        console.log(`✅ Header locked at ${height}px height`);
        return true;
    }

    // 2. Защита от любых попыток изменить хедер
    function protectHeaderFromChanges() {
        const header = document.querySelector('header');
        if (!header) return;

        // Блокируем изменение стилей
        const originalStyleSet = header.style.setProperty;
        header.style.setProperty = function(name, value, priority) {
            if (name.includes('transform') || name.includes('top') || name.includes('margin')) {
                if (value && value.toString().includes('-')) {
                    console.warn(`🚫 Blocked attempt to set ${name} to ${value}`);
                    return;
                }
            }
            return originalStyleSet.call(this, name, value, priority);
        };

        // Блокируем добавление классов, которые могут скрыть
        const originalAddClass = header.classList.add;
        header.classList.add = function() {
            const classes = Array.from(arguments);
            const dangerous = ['hide', 'hidden', 'scroll-hide', 'header-hide'];
            const filtered = classes.filter(cls => !dangerous.includes(cls));

            if (filtered.length !== classes.length) {
                console.warn('🚫 Blocked dangerous class addition');
            }

            return originalAddClass.apply(this, filtered);
        };
    }

    // 3. ПОСТОЯННЫЙ МОНИТОРИНГ
    function startHeaderMonitoring() {
        setInterval(() => {
            const header = document.querySelector('header');
            if (!header) return;

            // Проверяем ключевые свойства
            const computed = getComputedStyle(header);
            const checks = [
                { prop: 'position', expected: 'fixed', actual: computed.position },
                { prop: 'top', expected: '0px', actual: computed.top },
                { prop: 'transform', check: (val) => !val.includes('translateY(-'), actual: computed.transform }
            ];

            let needsFix = false;
            checks.forEach(check => {
                if (check.expected && check.actual !== check.expected) {
                    console.warn(`Header ${check.prop} is ${check.actual}, should be ${check.expected}`);
                    needsFix = true;
                }
                if (check.check && !check.check(check.actual)) {
                    console.warn(`Header ${check.prop} failed check: ${check.actual}`);
                    needsFix = true;
                }
            });

            if (needsFix) {
                console.log('🛠️  Fixing header...');
                lockHeaderInPlace();
            }
        }, 500); // Проверяем каждые 500ms
    }

    // 4. ЗАПУСК ЗАЩИТЫ
    function initializeProtection() {
        console.log('Initializing header protection...');

        // Пытаемся сразу
        if (lockHeaderInPlace()) {
            protectHeaderFromChanges();
            startHeaderMonitoring();
        } else {
            // Если хедер еще не загружен, ждем
            const checkInterval = setInterval(() => {
                if (lockHeaderInPlace()) {
                    clearInterval(checkInterval);
                    protectHeaderFromChanges();
                    startHeaderMonitoring();
                }
            }, 100);
        }

        // Также при полной загрузке страницы
        window.addEventListener('load', () => {
            console.log('Page loaded, reinforcing protection...');
            lockHeaderInPlace();
        });
    }

    // Запускаем немедленно
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeProtection);
    } else {
        initializeProtection();
    }

    // Дублирующая защита через 1 секунду
    setTimeout(initializeProtection, 1000);

    console.log('🛡️  Global header protection activated');
})();

// ОСНОВНОЙ КОД САЙТА
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏁 Main site code starting...');

    // 1. ОСНОВНЫЕ ПЕРЕМЕННЫЕ
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const yearSpan = document.getElementById('currentYear');
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalWorkshopTitle');

    // 2. ТЕКУЩИЙ ГОД
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. МОБИЛЬНОЕ МЕНЮ (упрощенное)
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isActive = nav.classList.toggle('active');
            const icon = this.querySelector('i');

            if (isActive) {
                icon.classList.replace('fa-bars', 'fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = 'auto';
            }
        });

        // Закрытие по клику на ссылку
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 4. ПЛАВНАЯ ПРОКРУТКА
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();

                // Закрываем меню если открыто
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    document.body.style.overflow = 'auto';
                }

                // Скроллим с учетом хедера
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;

                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. МОДАЛЬНОЕ ОКНО
    if (modal && modalTitle) {
        // Глобальные функции
        window.bookWorkshop = function(title) {
            modalTitle.textContent = title || 'мастер-класс';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            return true;
        };

        window.closeBookingModal = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        // Обработчики закрытия
        document.querySelectorAll('.close-modal, .modal-close-btn').forEach(btn => {
            btn.addEventListener('click', window.closeBookingModal);
        });

        modal.addEventListener('click', function(e) {
            if (e.target === this) window.closeBookingModal();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                window.closeBookingModal();
            }
        });

        // Кнопки "Записаться"
        document.querySelectorAll('.card-link').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                let workshopName = 'мастер-класс';
                const card = this.closest('.card');
                if (card && card.querySelector('h3')) {
                    workshopName = card.querySelector('h3').textContent;
                }

                window.bookWorkshop(workshopName);
            });

            button.href = 'javascript:void(0)';
        });
    }

    // 6. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ (опционально)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    if (sections.length > 0 && navLinks.length > 0) {
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
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightMenu);
        highlightMenu();
    }

    // 7. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ (БЕЗ ВЛИЯНИЯ НА ХЕДЕР)
    const animatedElements = document.querySelectorAll('.card, .gallery-item');
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        function checkAnimation() {
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }

        window.addEventListener('scroll', checkAnimation);
        checkAnimation();
    }

    console.log('✅ Main site code loaded successfully');
});

// УБИРАЕМ ПАРАЛЛАКС И ЛЮБЫЕ ДРУГИЕ ЭФФЕКТЫ, КОТОРЫЕ МОГУТ ВЛИЯТЬ НА ХЕДЕР
// Параллакс отключен намеренно - он конфликтует с фиксированным хедером

console.log('🎉 Alma Khora JS loaded with guaranteed header visibility');