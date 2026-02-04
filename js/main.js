// ============================================
// Alma Khora - МИНИМАЛЬНЫЙ И НАДЕЖНЫЙ JS
// ============================================

console.log('🚀 Alma Khora - Minimal JS loaded');

// 1. ФУНКЦИЯ АБСОЛЮТНОЙ ФИКСАЦИИ ХЕДЕРА
function lockHeaderForever() {
    console.log('🔒 Locking header permanently...');
    const header = document.querySelector('header.header');
    if (!header) {
        console.warn('Header not found!');
        return;
    }

    // ЖЕСТКОЕ ПЕРЕОПРЕДЕЛЕНИЕ СТИЛЕЙ
    header.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        z-index: 1000 !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
        box-shadow: 0 2px 15px rgba(93, 64, 55, 0.1) !important;
        background-color: rgba(249, 246, 240, 0.95) !important;
        backdrop-filter: blur(10px) !important;
    `;

    // ОТКЛЮЧАЕМ ВСЕ ВОЗМОЖНЫЕ ИЗМЕНЕНИЯ
    Object.defineProperty(header.style, 'transform', {
        get() { return 'none'; },
        set(value) { return 'none'; },
        configurable: false
    });

    Object.defineProperty(header.style, 'top', {
        get() { return '0px'; },
        set(value) { return '0px'; },
        configurable: false
    });

    // УСТАНАВЛИВАЕМ ОТСТУП ДЛЯ BODY
    const headerHeight = header.offsetHeight;
    document.body.style.cssText = `
        padding-top: ${headerHeight}px !important;
        overflow-x: hidden !important;
    `;

    console.log(`✅ Header locked at ${headerHeight}px`);

    // УБИВАЕМ ВСЕ ОБРАБОТЧИКИ СКРОЛЛА
    window.onscroll = null;
    const originalScroll = window.scroll;
    window.scroll = function() {
        header.style.transform = 'none';
        return originalScroll.apply(this, arguments);
    };

    // ДОБАВЛЯЕМ НЕУБИВАЕМЫЙ ОБРАБОТЧИК
    window.addEventListener('scroll', function() {
        header.style.transform = 'none';
        header.style.top = '0';
    }, { capture: true, passive: true });
}

// 2. ЗАПУСКАЕМ ЗАЩИТУ СРАЗУ
(function initHeaderProtection() {
    console.log('🛡️ Starting ultimate header protection');
    if (document.querySelector('header')) {
        lockHeaderForever();
    } else {
        const observer = new MutationObserver(function(mutations) {
            if (document.querySelector('header')) {
                observer.disconnect();
                lockHeaderForever();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    setTimeout(lockHeaderForever, 100);
    setTimeout(lockHeaderForever, 500);
    setTimeout(lockHeaderForever, 1000);
})();

// 3. ОСНОВНОЙ КОД
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏁 DOM loaded, starting main features');

    // A. ТЕКУЩИЙ ГОД
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // B. МОБИЛЬНОЕ МЕНЮ
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
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
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuToggle.querySelector('i')) {
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
                document.body.style.overflow = 'auto';
            });
        });
    }

    // C. МОДАЛЬНОЕ ОКНО
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalWorkshopTitle');
    if (modal && modalTitle) {
        window.bookWorkshop = function(title) {
            modalTitle.textContent = title || 'мастер-класс';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        window.closeBookingModal = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
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
        document.querySelectorAll('.card-link').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.card');
                const title = card && card.querySelector('h3')
                    ? card.querySelector('h3').textContent
                    : 'мастер-класс';
                window.bookWorkshop(title);
            });
            button.href = 'javascript:void(0)';
        });
    }

    // D. ПЛАВНАЯ ПРОКРУТКА
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle.querySelector('i')) {
                        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    }
                    document.body.style.overflow = 'auto';
                }
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✅ All features loaded');
});

// 4. ФИНАЛЬНАЯ ПРОВЕРКА
window.addEventListener('load', function() {
    console.log('📋 Final header verification');
    const header = document.querySelector('header');
    if (header) {
        const style = getComputedStyle(header);
        console.log('Header final status:', {
            position: style.position,
            top: style.top,
            transform: style.transform
        });
        if (style.position !== 'fixed' || style.top !== '0px') {
            console.warn('⚠️ Header not properly fixed! Applying emergency fix...');
            header.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                z-index: 1000 !important;
                transform: none !important;
            `;
        }
    }
    console.log('🎉 Alma Khora - Ready with guaranteed header visibility');
});
