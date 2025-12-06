// main.js для Alma Khora website
console.log("Alma Khora art studio website loaded");

// Текущий год в футере
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в подвале
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Меняем иконку
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // Плавное появление элементов при скролле (простая реализация)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за секциями
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Форма подписки (имитация)
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Спасибо за подписку, ${emailInput.value}! Мы отправим вам новости о мастер-классах.`);
                emailInput.value = '';
            }
        });
    }

    // Выделение активного пункта меню при скролле
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    console.log("Все скрипты инициализированы");
});