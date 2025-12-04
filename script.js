/* ============================================
   HARIS SOHAIL PORTFOLIO - REVOLUTIONARY SCRIPTS
   Advanced Animations & Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all modules
    initPreloader();
    initCustomCursor();
    initMagneticElements();
    initNavbar();
    initHeroAnimations();
    initTypingEffect();
    initCounterAnimation();
    initScrollAnimations();
    initParticleCanvas();
    initSkillBars();
    initMobileMenu();
    initSmoothScroll();
    initCardEffects();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    if (!preloader) return;

    document.body.classList.add('loading');

    // Simulate loading and then hide preloader
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');

        // Start hero animations after preloader
        setTimeout(() => {
            animateHeroElements();
        }, 300);
    }, 2200);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursorDot || !cursorRing || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Dot follows immediately
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;

        // Ring follows with delay
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hover-lift, .magnetic-element, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hovering');
            cursorRing.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hovering');
            cursorRing.classList.remove('hovering');
        });
    });
}

/* ============================================
   MAGNETIC ELEMENTS
   ============================================ */
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-element');

    if (window.innerWidth < 768) return;

    magneticElements.forEach(element => {
        const strength = element.dataset.strength || 20;

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x / strength * 2,
                y: y / strength * 2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ============================================
   HERO ANIMATIONS
   ============================================ */
function initHeroAnimations() {
    // Initial state - elements hidden
    gsap.set('.hero-badge, .hero-greeting, .hero-subtitle, .hero-description, .hero-cta, .stat', {
        opacity: 0,
        y: 30
    });

    gsap.set('.name-char', {
        opacity: 0,
        y: 100,
        rotateX: -90
    });
}

function animateHeroElements() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate badge
    tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8
    });

    // Animate greeting
    tl.to('.hero-greeting', {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, '-=0.4');

    // Animate name characters with stagger
    tl.to('.name-char', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        onComplete: () => {
            document.querySelectorAll('.name-char').forEach(char => {
                char.classList.add('revealed');
            });
        }
    }, '-=0.3');

    // Animate subtitle
    tl.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, '-=0.5');

    // Animate description
    tl.to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, '-=0.4');

    // Animate CTA buttons
    tl.to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, '-=0.4');

    // Animate stats with stagger
    tl.to('.stat', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15
    }, '-=0.3');
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
    const typedElement = document.querySelector('.typed-text');

    if (!typedElement) return;

    const phrases = [
        'Electrical Design Engineer',
        'CAD Specialist',
        'Technical Documentation Expert',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2500;
            isDeleting = true;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after hero animations
    setTimeout(type, 3000);
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 2500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOut;

            counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = isDecimal ? target.toFixed(2) : target;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Trigger when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate skill categories
    gsap.utils.toArray('.skill-category').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });

    // Animate education cards
    gsap.utils.toArray('.edu-card').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate contact cards
    gsap.utils.toArray('.contact-card').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate project card
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.project-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out'
    });

    // Animate resume card
    gsap.from('.resume-card', {
        scrollTrigger: {
            trigger: '.resume-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Reveal text animations
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Parallax effect for blobs
    gsap.utils.toArray('.blob').forEach(blob => {
        gsap.to(blob, {
            scrollTrigger: {
                trigger: blob.closest('section'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: 'none'
        });
    });
}

/* ============================================
   PARTICLE CANVAS
   ============================================ */
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#d4af37' : '#4a9eff';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        animationId = requestAnimationFrame(animate);
    }

    // Start animation when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    });

    observer.observe(document.querySelector('.hero'));
}

/* ============================================
   SKILL BARS
   ============================================ */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress || 0;
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   CARD EFFECTS
   ============================================ */
function initCardEffects() {
    // 3D tilt effect on cards
    const cards = document.querySelectorAll('.timeline-content, .skill-category, .project-card, .edu-card');

    if (window.innerWidth < 768) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // Shine effect trigger
    const shineCards = document.querySelectorAll('.hover-lift');

    shineCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.left = '-100%';
                setTimeout(() => {
                    shine.style.transition = 'left 0.6s ease';
                    shine.style.left = '100%';
                }, 10);
            }
        });

        card.addEventListener('mouseleave', () => {
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.transition = 'none';
                shine.style.left = '-100%';
            }
        });
    });
}

/* ============================================
   ACTIVE NAV HIGHLIGHTING
   ============================================ */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   PARALLAX ON SCROLL
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
    }

    // Orbs parallax
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate(${Math.sin(scrolled * 0.001) * 20}px, ${scrolled * speed}px)`;
    });
});

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log(`
%c
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   ⚡  HARIS SOHAIL  ⚡                                    ║
    ║   Electrical Engineering Technologist                     ║
    ║                                                           ║
    ║   This portfolio was crafted with:                        ║
    ║   • Pure HTML, CSS & JavaScript                           ║
    ║   • GSAP for smooth animations                            ║
    ║   • Custom particle system                                ║
    ║   • Magnetic cursor effects                               ║
    ║   • Advanced scroll animations                            ║
    ║                                                           ║
    ║   Let's connect: harrissohail6@gmail.com                  ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝

`, 'color: #d4af37; font-family: monospace; font-size: 10px;');
