// About Page Specific JavaScript

// 3D Hexagon interaction
document.addEventListener('DOMContentLoaded', function() {
    const hexagon = document.querySelector('.hexagon');
    
    if (hexagon) {
        // Add interactive rotation on mouse move
        document.addEventListener('mousemove', function(e) {
            if (!hexagon) return;
            
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const rotateY = (x - 0.5) * 60; // -30 to 30 degrees
            const rotateX = (0.5 - y) * 60; // -30 to 30 degrees
            
            hexagon.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset rotation when mouse leaves the window
        document.addEventListener('mouseleave', function() {
            if (hexagon) {
                hexagon.style.transform = 'rotateX(0) rotateY(0)';
            }
        });
    }
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // Animate value cards with staggered effect
    const valueCards = document.querySelectorAll('.value-card');
    
    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                valueObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.15}s`;
        valueObserver.observe(card);
    });
    
    // Animate mission and vision cards
    const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
    
    const missionVisionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 300);
                missionVisionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    missionVisionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        card.style.transitionDelay = `${index * 0.3}s`;
        missionVisionObserver.observe(card);
    });
    
    // Animate approach steps
    const approachSteps = document.querySelectorAll('.approach-step');
    
    const approachObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate step number
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.color = 'var(--secondary-color)';
                        stepNumber.style.transform = 'scale(1.1)';
                        
                        setTimeout(() => {
                            stepNumber.style.transform = 'scale(1)';
                        }, 300);
                    }
                }, index * 250);
                approachObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    approachSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        step.style.transitionDelay = `${index * 0.25}s`;
        approachObserver.observe(step);
    });
    
    // Animate tech stack categories
    const techCategories = document.querySelectorAll('.tech-category');
    
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate tech tags with staggered effect
                    const techTags = entry.target.querySelectorAll('.tech-tags span');
                    techTags.forEach((tag, tagIndex) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, tagIndex * 100);
                    });
                }, index * 200);
                techObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    techCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        category.style.transitionDelay = `${index * 0.2}s`;
        
        // Set initial state for tech tags
        const techTags = category.querySelectorAll('.tech-tags span');
        techTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
        
        techObserver.observe(category);
    });
    
    // Animate hero stats
    const heroStats = document.querySelectorAll('.hero-stats .stat h3');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroStats.forEach(stat => {
                    const text = stat.textContent;
                    const value = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = text.includes('+') ? '+' : '';
                    
                    if (!isNaN(value)) {
                        animateCounter(stat, value, suffix);
                    }
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-hero');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Counter animation function
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
                
                // Add celebration effect
                element.style.color = 'var(--secondary-color)';
                element.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
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
    
    // Add hover effects to value cards
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-hexagon i');
            if (icon) {
                icon.style.transform = 'translate(-50%, -50%) scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-hexagon i');
            if (icon) {
                icon.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
    
    // Add parallax effect to hero section on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.about-hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });
});