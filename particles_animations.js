// JavaScript
        // Scroll animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.scroll-animate');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        }
        
        // Smooth scrolling for anchor links
        function handleSmoothScrolling() {
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
        }
        
        // Mouse move effect for cards
        function handleMouseEffects() {
            const cards = document.querySelectorAll('.glass-card, .project-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });
        }
        
        // Typing effect for tagline
        function typeWriter() {
            const text = "No espero a que las oportunidades lleguen: las creo";
            const tagline = document.querySelector('.tagline');
            let i = 0;
            
            tagline.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    tagline.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                } else {
                    // Add blinking cursor
                    tagline.innerHTML += '<span class="cursor">|</span>';
                    
                    // Add cursor animation
                    const cursor = tagline.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.animation = 'blink 1s infinite';
                    }
                }
            }
            
            // Start typing after a delay
            setTimeout(type, 2000);
        }
        
        // Add cursor blink animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = counter.textContent;
                        const isK = target.includes('K');
                        const isM = target.includes('M');
                        const isPlus = target.includes('+');
                        
                        let numericTarget = parseInt(target.replace(/[KM+]/g, ''));
                        if (isK) numericTarget *= 1000;
                        if (isM) numericTarget *= 1000000;
                        
                        let current = 0;
                        const increment = numericTarget / 100;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= numericTarget) {
                                current = numericTarget;
                                clearInterval(timer);
                            }
                            
                            let displayValue = Math.floor(current);
                            if (isM) {
                                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
                            } else if (isK) {
                                displayValue = (displayValue / 1000).toFixed(0) + 'K';
                            }
                            
                            counter.textContent = displayValue + (isPlus ? '+' : '');
                        }, 20);
                        
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        }
            
        // Add loading animation
        function showLoadingAnimation() {
            document.body.style.opacity = '0';
            
            window.addEventListener('load', () => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            });
        }
        
        // Initialize all functions
        function init() {
            showLoadingAnimation();
            handleScrollAnimations();
            handleSmoothScrolling();
            handleMouseEffects();
            typeWriter();
            animateCounters();
        }
        
        // Start everything when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        // Performance optimization
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }
        
        function updateAnimations() {
            // Update any continuous animations here
            ticking = false;
        }
        
        // Intersection Observer for performance
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Add error handling
        window.addEventListener('error', (e) => {
            console.log('Error handled gracefully:', e.message);
        });
        
        // Service Worker registration (for future PWA features)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Future service worker registration
            });
        }

        // Mobile Main Header Menu
        const menuBtn = document.querySelector('.main-header__menu-btn');
        const mobileMenu = document.querySelector('.main-header__mobile-menu');
        const mobileLinks = document.querySelectorAll('.main-header__mobile-link');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });

        // Cierra el menú al hacer click en un enlace
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });

        // Opcional: Cierra el menú al hacer click fuera del menú
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
