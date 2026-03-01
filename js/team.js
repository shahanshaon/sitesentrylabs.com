// Team Page Specific JavaScript

// 3D hover effect for team cards
document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            this.style.boxShadow = `
                ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 217, 255, 0.2),
                0 15px 30px rgba(0, 217, 255, 0.15)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            // Add slight delay for smooth transition
            setTimeout(() => {
                if (!this.matches(':hover')) {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }
            }, 100);
        });
    });
    
    // Animate stats counter
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    };
    
    // Start counter animation when stats section is in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statItems.forEach(item => {
                    const text = item.textContent;
                    const value = parseInt(text.replace(/[^0-9]/g, ''));
                    if (!isNaN(value)) {
                        animateCounter(item, value);
                    }
                });
                observer.disconnect();
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.team-stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Mobile menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(10, 14, 23, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';
                navLinks.style.borderTop = '1px solid var(--border-color)';
            }
        });
    }
});