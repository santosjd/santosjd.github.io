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

        // Mobile Main Header Menu
        const menuBtn = document.querySelector('.main-header__menu-btn');
        const mobileMenu = document.querySelector('.main-header__mobile-menu');
        const mobileLinks = document.querySelectorAll('.main-header__mobile-link');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });

        // Close the menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });

        // Modal de certificados
        const modal = document.getElementById('certificateModal');
        const modalImg = document.getElementById('certificateModalImg');
        const closeBtn = document.getElementsByClassName('modal-close')[0];
        const certificationImages = document.querySelectorAll('.certification-img');

        // Abrir modal al hacer clic en una imagen
        certificationImages.forEach(img => {
            img.onclick = function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                document.body.style.overflow = 'hidden'; // Previene el scroll del body
            }
        });

        // Cerrar modal al hacer clic en la X
        closeBtn.onclick = function() {
            closeModal();
        }

        // Cerrar modal al hacer clic fuera de la imagen
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        // Cerrar modal con la tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Restaura el scroll del body
        }

        // Carrusel de certificaciones
        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.certifications-track');
            const cards = track.querySelectorAll('.certification-card');
            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');
            
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
                
                // Actualizar estado de los botones
                updateButtonsState();
            }

            // Función para actualizar estado de los botones
            function updateButtonsState() {
                prevButton.disabled = currentIndex <= 0;
                nextButton.disabled = currentIndex >= cards.length - cardsPerView;
            }

            // Función para mover el carrusel
            function moveCarousel(direction) {
                const maxIndex = cards.length - cardsPerView;
                
                if (direction === 'prev' && currentIndex > 0) {
                    currentIndex--;
                } else if (direction === 'next' && currentIndex < maxIndex) {
                    currentIndex++;
                }
                
                // Calcular el ancho total de una tarjeta (incluyendo gap)
                const cardWidth = track.querySelector('.certification-card').offsetWidth;
                const gapWidth = 24; // 1.5rem = 24px
                const moveAmount = cardWidth + gapWidth;
                
                const offset = -currentIndex * moveAmount;
                track.style.transform = `translateX(${offset}px)`;
                updateButtonsState();
            }

            // Event listeners
            prevButton.addEventListener('click', () => moveCarousel('prev'));
            nextButton.addEventListener('click', () => moveCarousel('next'));
            
            // Actualizar medidas cuando cambie el tamaño de la ventana
            window.addEventListener('resize', updateMeasurements);
            
            // Inicialización
            updateMeasurements();
        });
