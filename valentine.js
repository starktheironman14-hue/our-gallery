// ===================================
// Valentine's Day Special - JavaScript
// ===================================

// ===================================
// 1. Floating Hearts Animation
// ===================================
const heartsCanvas = document.getElementById('hearts-canvas');
const heartsCtx = heartsCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Heart class
class Heart {
    constructor() {
        this.x = Math.random() * heartsCanvas.width;
        this.y = heartsCanvas.height + Math.random() * 100;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.swing = Math.random() * 2 - 1;
    }

    draw() {
        heartsCtx.save();
        heartsCtx.globalAlpha = this.opacity;
        heartsCtx.font = `${this.size}px Arial`;
        heartsCtx.fillText('❤️', this.x, this.y);
        heartsCtx.restore();
    }

    update() {
        this.y -= this.speed;
        this.x += this.swing;

        // Reset heart when it goes off screen
        if (this.y < -50) {
            this.y = heartsCanvas.height + 50;
            this.x = Math.random() * heartsCanvas.width;
        }
    }
}

// Create hearts array
const hearts = [];
for (let i = 0; i < 30; i++) {
    hearts.push(new Heart());
}

// Animate hearts
function animateHearts() {
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);

    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });

    requestAnimationFrame(animateHearts);
}
animateHearts();

// ===================================
// 2. Timeline Scroll Reveal Animation
// ===================================
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===================================
// 3. Photo Gallery Carousel
// ===================================
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
const slides = document.querySelectorAll('.carousel-slide');

let currentSlide = 0;
const totalSlides = slides.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-play carousel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// ===================================
// 4. Secret Love Message Modal
// ===================================
const secretBtn = document.getElementById('secretBtn');
const modal = document.getElementById('secretModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');

// Confetti particle class
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = ['#FFB6C1', '#FF69B4', '#FF1493', '#DDA0DD', '#DA70D6', '#9370DB'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation * Math.PI / 180);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        confettiCtx.restore();
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.speedY += 0.1; // Gravity
    }
}

let confettiParticles = [];
let confettiAnimationId;

function createConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove particles that are off screen
        if (particle.y > confettiCanvas.height) {
            confettiParticles.splice(index, 1);
        }
    });

    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    }
}

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    createConfetti();
    animateConfetti();
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    cancelAnimationFrame(confettiAnimationId);
    confettiParticles = [];
}

secretBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// ===================================
// 5. Countdown Timer
// ===================================
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Target: Valentine's Day 2027
    let valentinesDay = new Date('2027-02-14T00:00:00');

    // If current date is past this year's Valentine's Day, target next year
    if (now > valentinesDay) {
        valentinesDay = new Date(`${currentYear + 1}-02-14T00:00:00`);
    }

    const timeDiff = valentinesDay - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(3, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ===================================
// 6. Open When Cards
// ===================================
const openWhenCards = document.querySelectorAll('.open-when-card');

openWhenCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// ===================================
// 7. Background Music Toggle
// ===================================
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

// Set initial volume
bgMusic.volume = 0.3;

let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
});

// ===================================
// Smooth Scrolling for Better UX
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Prevent Right Click on Images (Optional)
// ===================================
document.querySelectorAll('.carousel-slide img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===================================
// Loading Animation (Optional Enhancement)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Console Message (Easter Egg)
// ===================================
console.log('%c❤️ Made with Love ❤️', 'color: #FF69B4; font-size: 24px; font-weight: bold;');
console.log('%cHappy Valentine\'s Day! 💕', 'color: #FF1493; font-size: 18px;');
