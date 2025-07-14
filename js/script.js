// Loading animation
        window.addEventListener('load', function() {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.classList.add('hide');
                setTimeout(() => {
                    loading.style.display = 'none';
                    // Initialize floating phones after loading
                    initFloatingPhones();
                }, 500);
            }, 1000);
        });

        // Smooth scrolling for navigation links
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

        // Enhanced navbar scroll effect
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });

        // Advanced animations for feature cards
        const cards = document.querySelectorAll('.feature-card, .subfeature-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add subtle parallax effect
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });

        // Portfolio gallery hover effects
        function initPortfolioGallery() {
            const screens = document.querySelectorAll('.screen-media');
            
            screens.forEach(screen => {
                screen.addEventListener('mouseenter', function() {
                    // Pause animations on hover
                    const parentList = this.closest('.screens-list');
                    if (parentList) {
                        parentList.style.animationPlayState = 'paused';
                    }
                });
                
                screen.addEventListener('mouseleave', function() {
                    // Resume animations
                    const parentList = this.closest('.screens-list');
                    if (parentList) {
                        parentList.style.animationPlayState = 'running';
                    }
                });
            });
        }

        // Initialize portfolio gallery effects
        initPortfolioGallery();

        // Floating phones scroll animation - simplified
        function initFloatingPhones() {
            // Remove complex parallax since we simplified the layout
            console.log('Floating phones initialized');
        }

        // Advanced scroll-triggered animations
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                const target = parseInt(counter.innerText);
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.innerText = Math.floor(current) + (counter.innerText.includes('%') ? '%' : counter.innerText.includes('+') ? '+' : '');
                }, 20);
            });
        }

        // Trigger counter animation when stats section is visible
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statsObserver.observe(statsSection);
        }

        // Enhanced button hover effects
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.filter = 'hue-rotate(10deg) saturate(1.2)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
            });
        });

        // Add cursor trail effect
        let trail = [];
        let mouse = { x: 0, y: 0 };

        document.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function updateTrail() {
            trail.unshift({ x: mouse.x, y: mouse.y });
            if (trail.length > 5) trail.pop();
            
            trail.forEach((pos, index) => {
                let dot = document.querySelector(`#trail-${index}`);
                if (!dot) {
                    dot = document.createElement('div');
                    dot.id = `trail-${index}`;
                    dot.style.position = 'fixed';
                    dot.style.width = `${6 - index}px`;
                    dot.style.height = `${6 - index}px`;
                    dot.style.background = `rgba(102, 126, 234, ${0.8 - index * 0.15})`;
                    dot.style.borderRadius = '50%';
                    dot.style.pointerEvents = 'none';
                    dot.style.zIndex = '9998';
                    document.body.appendChild(dot);
                }
                dot.style.left = `${pos.x}px`;
                dot.style.top = `${pos.y}px`;
            });
            
            requestAnimationFrame(updateTrail);
        }

        // Start trail animation only on desktop
        if (window.innerWidth > 768) {
            updateTrail();
        }

// AI tab switching logic
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;

    // Toggle active button
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Toggle visible content
    document.querySelectorAll('.tab-content').forEach(section => {
      section.classList.remove('active');
      if (section.id === tab) section.classList.add('active');
    });
  });
});