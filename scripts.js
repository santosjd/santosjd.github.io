// JavaScript
        // Mouse move effect for cards
        function handleMouseEffects() {
            const cards = document.querySelectorAll('.project-card');
            
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
        
        // Initialize all functions
        function init() {
            handleMouseEffects();
        }
        
        // Start everything when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // Theme toggle
        const html = document.documentElement;
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

        function applyTheme(theme) {
            html.setAttribute('data-theme', theme);
            const isDark = theme === 'dark';
            const themeColor = document.querySelector('meta[name="theme-color"]');

            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun', !isDark);
                themeIcon.classList.toggle('fa-moon', isDark);
            }

            if (themeToggle) {
                themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
            }

            if (themeColor) {
                themeColor.setAttribute('content', isDark ? '#000000' : '#F5F5F7');
            }

            localStorage.setItem('theme', theme);
        }

        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        applyTheme(initialTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                applyTheme(currentTheme);
            });
        }

        // Mobile Main Header Menu
        const menuBtn = document.querySelector('.main-header__menu-btn');
        const mobileMenu = document.querySelector('.main-header__mobile-menu');
        const mobileLinks = document.querySelectorAll('.main-header__mobile-link');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('open');
                menuBtn.setAttribute('aria-expanded', String(isOpen));
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                });
            });

            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Close mobile menu when a link is clicked
        // Modal de certificados
        const modal = document.getElementById('certificateModal');
        const modalImg = document.getElementById('certificateModalImg');
        const closeBtn = document.getElementsByClassName('modal-close')[0];
        const certificationImages = document.querySelectorAll('.certification-img');

        if (modal && modalImg && closeBtn) {
            certificationImages.forEach(img => {
                img.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modal.setAttribute('aria-hidden', 'false');
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    document.body.style.overflow = 'hidden';
                });

                img.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        img.click();
                    }
                });
            });

            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' && modal.style.display === 'block') {
                    closeModal();
                }
            });

            function closeModal() {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                modalImg.src = '';
                modalImg.alt = '';
                document.body.style.overflow = '';
            }
        }

        // Carrusel de certificaciones
        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.certifications-track');
            if (!track) {
                return;
            }

            const cards = track.querySelectorAll('.certification-card');
            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');

            if (!cards.length || !prevButton || !nextButton) {
                return;
            }
            
            let currentIndex = 0;
            let cardsPerView;

            // Función para actualizar medidas
            function updateMeasurements() {
                const viewportWidth = window.innerWidth;
                
                // Determinar cuántas tarjetas mostrar basado en el ancho de la ventana
                if (viewportWidth > 1024) {
                    cardsPerView = 3;
                } else if (viewportWidth > 640) {
                    cardsPerView = 2;
                } else {
                    cardsPerView = 1;
                }
                
                currentIndex = Math.min(currentIndex, Math.max(0, cards.length - cardsPerView));
                applyCarouselPosition();
                updateButtonsState();
            }

            // Función para actualizar estado de los botones
            function updateButtonsState() {
                prevButton.disabled = currentIndex <= 0;
                nextButton.disabled = currentIndex >= cards.length - cardsPerView;
            }

            // Función para mover el carrusel
            function moveCarousel(direction) {
                const maxIndex = Math.max(0, cards.length - cardsPerView);
                
                if (direction === 'prev' && currentIndex > 0) {
                    currentIndex--;
                } else if (direction === 'next' && currentIndex < maxIndex) {
                    currentIndex++;
                }
                
                applyCarouselPosition();
                updateButtonsState();
            }

            function applyCarouselPosition() {
                const cardWidth = track.querySelector('.certification-card').offsetWidth;
                const gapWidth = 24; // 1.5rem = 24px
                const moveAmount = cardWidth + gapWidth;
                
                const offset = -currentIndex * moveAmount;
                track.style.transform = `translateX(${offset}px)`;
            }

            // Event listeners
            prevButton.addEventListener('click', () => moveCarousel('prev'));
            nextButton.addEventListener('click', () => moveCarousel('next'));
            
            // Actualizar medidas cuando cambie el tamaño de la ventana
            window.addEventListener('resize', updateMeasurements);
            
            // Inicialización
            updateMeasurements();
        });
