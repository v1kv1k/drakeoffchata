// Плавная навигация
document.addEventListener('DOMContentLoaded', function() {
    // Обработка клика по навигационным ссылкам
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Удаляем активный класс со всех ссылок
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                // Добавляем активный класс к текущей ссылке
                this.classList.add('active');
                
                // Плавная прокрутка к секции
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Обновление активной ссылки при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Изменение прозрачности навбара при прокрутке
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        }
    });
    
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animateElements = document.querySelectorAll('.stat, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Добавляем уникальные задержки и эффекты для карточек гостей
    const guestCards = document.querySelectorAll('.guest-card');
    guestCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.style.setProperty('--animation-order', index);
        
        // Добавляем интерактивность при наведении
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            createParticleEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Эффект параллакса для hero секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Анимация счетчиков
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Форматирование чисел
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }
    
    // Запуск анимации счетчиков при появлении в viewport
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(statNumber => {
                    const text = statNumber.textContent;
                    let target = 0;
                    
                    if (text.includes('1.2M+')) {
                        target = 1200000;
                    } else if (text.includes('28M+')) {
                        target = 28000000;
                    } else if (text.includes('5')) {
                        target = 5;
                    }
                    
                    if (target > 0) {
                        animateCounter(statNumber, target);
                    }
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Добавляем интерактивность к кнопкам
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Эффект печатной машинки для заголовка
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Запуск эффекта печатной машинки для заголовка после загрузки
    setTimeout(() => {
        const titleDrake = document.querySelector('.title-drake');
        const titleMain = document.querySelector('.title-main');
        
        if (titleDrake && titleMain) {
            const originalDrake = titleDrake.textContent;
            const originalMain = titleMain.textContent;
            
            typeWriter(titleDrake, originalDrake, 150);
            setTimeout(() => {
                typeWriter(titleMain, originalMain, 100);
            }, originalDrake.length * 150 + 300);
        }
    }, 1000);
    
    // Добавляем эффект ripple для карточек гостей
    function createRipple(event) {
        const card = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(139, 92, 246, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Добавляем CSS для анимации ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Применяем эффект ripple к карточкам гостей
    const guestCardsForRipple = document.querySelectorAll('.guest-card');
    guestCardsForRipple.forEach(card => {
        card.addEventListener('click', createRipple);
    });
    
    // Добавляем курсор-указатель для интерактивных элементов
    const interactiveElements = document.querySelectorAll('.guest-card, .gallery-item, .stat');
    interactiveElements.forEach(element => {
        element.style.cursor = 'pointer';
    });
    
    // Эффект наведения для галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
});

// Функция для плавного появления элементов
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);

// Предзагрузка изображений (если будут добавлены)
function preloadImages() {
    const imageUrls = [
        // Здесь можно добавить URL изображений для предзагрузки
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Запуск предзагрузки после загрузки DOM
document.addEventListener('DOMContentLoaded', preloadImages);

// Обратный отсчет до события
function initCountdown() {
    // Устанавливаем дату события (21 августа 2024, 18:00 по московскому времени)
    const eventDate = new Date('2024-08-21T18:00:00+03:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // Если событие уже прошло, показываем "00"
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Вычисляем время
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Обновляем отображение с нулями в начале
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Обновляем каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Запускаем обратный отсчет
document.addEventListener('DOMContentLoaded', initCountdown);

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Блокируем скролл при открытом меню
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Закрываем меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Закрываем меню при изменении размера экрана
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Горизонтальный скролл для гостей
document.addEventListener('DOMContentLoaded', function() {
    const guestsGrid = document.getElementById('guestsGrid');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (guestsGrid && scrollProgressBar) {
        // Обновление прогресс бара при скролле
        guestsGrid.addEventListener('scroll', function() {
            const scrollLeft = this.scrollLeft;
            const scrollWidth = this.scrollWidth - this.clientWidth;
            const scrollPercent = (scrollLeft / scrollWidth) * 100;
            
            scrollProgressBar.style.width = scrollPercent + '%';
            
            // Скрываем подсказку после первого скролла
            if (scrollLeft > 10 && scrollHint) {
                scrollHint.style.opacity = '0';
                scrollHint.style.transform = 'translateY(-20px)';
            } else if (scrollLeft <= 10 && scrollHint) {
                scrollHint.style.opacity = '0.8';
                scrollHint.style.transform = 'translateY(0)';
            }
        });
        
        // Плавный скролл колесиком мыши
        guestsGrid.addEventListener('wheel', function(e) {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
        
        // Touch скролл оптимизация
        let isScrolling = false;
        let startX = 0;
        let scrollStart = 0;
        
        guestsGrid.addEventListener('touchstart', function(e) {
            isScrolling = true;
            startX = e.touches[0].clientX;
            scrollStart = this.scrollLeft;
        });
        
        guestsGrid.addEventListener('touchmove', function(e) {
            if (!isScrolling) return;
            
            e.preventDefault();
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            this.scrollLeft = scrollStart + diff;
        });
        
        guestsGrid.addEventListener('touchend', function() {
            isScrolling = false;
        });
        
        // Автоскролл при hover (только на desktop)
        if (window.innerWidth > 768) {
            guestsGrid.addEventListener('mouseenter', function() {
                // Показываем прогресс бар при наведении
                if (scrollProgressBar.parentElement) {
                    scrollProgressBar.parentElement.style.opacity = '1';
                }
            });
            
            guestsGrid.addEventListener('mouseleave', function() {
                // Скрываем прогресс бар
                setTimeout(() => {
                    if (scrollProgressBar.parentElement) {
                        scrollProgressBar.parentElement.style.opacity = '0.7';
                    }
                }, 2000);
            });
        }
        
        // Клавиатурная навигация
        document.addEventListener('keydown', function(e) {
            if (guestsGrid.matches(':hover') || document.activeElement === guestsGrid) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    guestsGrid.scrollBy({ left: -300, behavior: 'smooth' });
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    guestsGrid.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        });
        
        // Добавляем tabindex для фокуса
        guestsGrid.setAttribute('tabindex', '0');
    }
});

// Функция создания эффекта частиц
function createParticleEffect(element) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `linear-gradient(45deg, 
            rgba(212, 175, 55, ${Math.random() * 0.8 + 0.2}), 
            rgba(255, 107, 107, ${Math.random() * 0.8 + 0.2}))`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '20';
        
        const rect = element.getBoundingClientRect();
        particle.style.left = Math.random() * rect.width + 'px';
        particle.style.top = Math.random() * rect.height + 'px';
        
        particle.style.animation = `floatingParticles ${Math.random() * 2 + 1}s ease-out forwards`;
        
        element.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
}

// Создание волнового эффекта при клике
function createWaveEffect(event) {
    const wave = document.createElement('div');
    const size = Math.max(window.innerWidth, window.innerHeight);
    
    wave.style.position = 'fixed';
    wave.style.width = size + 'px';
    wave.style.height = size + 'px';
    wave.style.left = (event.clientX - size / 2) + 'px';
    wave.style.top = (event.clientY - size / 2) + 'px';
    wave.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)';
    wave.style.borderRadius = '50%';
    wave.style.transform = 'scale(0)';
    wave.style.pointerEvents = 'none';
    wave.style.zIndex = '1000';
    wave.style.animation = 'waveExpand 1.5s ease-out forwards';
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 1500);
}

// Функция морфинга текста
function morphText(element, newText, duration = 2000) {
    const originalText = element.textContent;
    const chars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789';
    
    let frame = 0;
    const totalFrames = duration / 16;
    
    function animate() {
        let output = '';
        
        for (let i = 0; i < newText.length; i++) {
            if (frame >= totalFrames * (i / newText.length)) {
                output += newText[i];
            } else {
                output += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        
        element.textContent = output;
        
        if (frame < totalFrames) {
            frame++;
            requestAnimationFrame(animate);
        } else {
            element.textContent = newText;
        }
    }
    
    animate();
}

// Создание плавающих элементов на фоне
function createFloatingElements() {
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = Math.random() * 40 + 10 + 'px';
        element.style.height = element.style.width;
        element.style.background = `linear-gradient(${Math.random() * 360}deg, 
            rgba(212, 175, 55, ${Math.random() * 0.1 + 0.05}), 
            rgba(78, 205, 196, ${Math.random() * 0.1 + 0.05}))`;
        element.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animation = `floatingParticles ${Math.random() * 10 + 5}s ease-in-out infinite`;
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        
        container.appendChild(element);
    }
}

// Добавляем CSS для новых анимаций
const additionalStyles = document.createElement('style');
additionalStyles.textContent = \`
@keyframes waveExpand {
    to {
        transform: scale(1);
        opacity: 0;
    }
}

.guest-card:nth-child(even) {
    animation-direction: reverse;
}

.guest-card:nth-child(3n) {
    animation-delay: 0.3s;
}

.section-title {
    position: relative;
    overflow: hidden;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100%;
    width: 100%;
    height: 3px;
    background: var(--gradient-primary);
    animation: slideInTitle 1.5s ease-out 0.5s forwards;
}

@keyframes slideInTitle {
    to {
        left: 0;
    }
}

.hero-subtitle {
    opacity: 1;
    animation: textReveal 1s ease-out 1.5s forwards;
}

.hero-buttons {
    opacity: 1;
    animation: textReveal 1s ease-out 2s forwards;
}

.coming-soon-content {
    perspective: 1000px;
    transform-style: preserve-3d;
}

.countdown-item {
    animation: morphIn 0.8s ease-out forwards;
    animation-delay: calc(var(--index, 0) * 0.2s);
}

.countdown-item:nth-child(1) { --index: 0; }
.countdown-item:nth-child(2) { --index: 1; }
.countdown-item:nth-child(3) { --index: 2; }
.countdown-item:nth-child(4) { --index: 3; }
\`;
document.head.appendChild(additionalStyles);

// Инициализация всех эффектов
document.addEventListener('DOMContentLoaded', function() {
    // Создаем плавающие элементы
    setTimeout(createFloatingElements, 1000);
    
    // Добавляем волновой эффект при клике
    document.addEventListener('click', createWaveEffect);
    
    // Морфинг для заголовка "СКОРО"
    setTimeout(() => {
        const comingSoonTitle = document.querySelector('.coming-soon-title');
        if (comingSoonTitle) {
            morphText(comingSoonTitle, 'СКОРО', 1500);
        }
    }, 3000);
    
    // Добавляем глитч-эффект к дате
    const dateText = document.querySelector('.date-text');
    if (dateText) {
        setInterval(() => {
            dateText.style.textShadow = \`
                \${Math.random() * 4 - 2}px \${Math.random() * 4 - 2}px 0 rgba(212, 175, 55, 0.7),
                \${Math.random() * 4 - 2}px \${Math.random() * 4 - 2}px 0 rgba(255, 107, 107, 0.7)
            \`;
            
            setTimeout(() => {
                dateText.style.textShadow = '0 0 50px rgba(212, 175, 55, 0.3)';
            }, 100);
        }, 5000);
    }
});
