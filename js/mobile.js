// Mobile View JavaScript - SiteSentryLabs
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all mobile functionality
    initMobileMenu();
    initTouchGestures();
    initMobileAnimations();
    initMobileForms();
    initMobileSliders();
    initMobileAccordions();
    initBackButton();
    initOrientationChange();
    initTouchScroll();
    initMobileViewport();
    
    // Services page specific mobile optimizations
    initServicesMobile();
    
    console.log('Mobile scripts loaded successfully');
});

// Services page specific mobile optimizations
function initServicesMobile() {
    if (!isMobile()) return;
    
    console.log('Initializing services page mobile optimizations');
    
    // Adjust cyber orb size for mobile
    const cyberOrb = document.querySelector('.cyber-orb');
    if (cyberOrb && window.innerWidth < 768) {
        cyberOrb.style.width = '250px';
        cyberOrb.style.height = '250px';
        
        const orbCore = cyberOrb.querySelector('.orb-core');
        if (orbCore) {
            orbCore.style.width = '60px';
            orbCore.style.height = '60px';
            orbCore.style.fontSize = '1.5rem';
        }
        
        const rings = cyberOrb.querySelectorAll('.orb-ring');
        rings[0].style.width = '125px';
        rings[0].style.height = '125px';
        rings[1].style.width = '187px';
        rings[1].style.height = '187px';
        rings[2].style.width = '250px';
        rings[2].style.height = '250px';
        
        const floatingIcons = cyberOrb.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.width = '35px';
            icon.style.height = '35px';
            icon.style.fontSize = '1rem';
        });
    }
    
    // Improve service cards for touch
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Increase touch target
        card.style.padding = '1.5rem';
        
        // Adjust font sizes
        const title = card.querySelector('h3');
        if (title) title.style.fontSize = '1.3rem';
        
        const description = card.querySelector('p');
        if (description) description.style.fontSize = '0.9rem';
        
        // Make whole card more touch-friendly
        card.style.cursor = 'pointer';
        
        // Add touch feedback
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.backgroundColor = 'rgba(0, 255, 0, 0.05)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.backgroundColor = '';
        });
    });
    
    // Adjust filter tabs for mobile
    const serviceTabs = document.querySelectorAll('.service-tab');
    serviceTabs.forEach(tab => {
        tab.style.padding = '0.8rem 1rem';
        tab.style.fontSize = '0.9rem';
        
        // Make tabs swipeable
        tab.style.touchAction = 'pan-y';
    });
    
    // Adjust modal for mobile
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflowY = 'auto';
        
        // Add pull-to-close for modal
        let touchStartY = 0;
        let touchEndY = 0;
        
        modalContent.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        modalContent.addEventListener('touchmove', function(e) {
            touchEndY = e.touches[0].clientY;
            const diff = touchEndY - touchStartY;
            
            // If pulling down from top, add resistance
            if (this.scrollTop === 0 && diff > 0) {
                this.style.transform = `translateY(${Math.min(diff, 100)}px)`;
            }
        });
        
        modalContent.addEventListener('touchend', function() {
            const diff = touchEndY - touchStartY;
            
            // If pulled down enough, close modal
            if (diff > 100) {
                const closeBtn = document.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
            
            this.style.transform = '';
        });
    }
    
    // Adjust process timeline for mobile
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        step.style.padding = '1.5rem';
        step.style.marginBottom = '1rem';
        
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) stepNumber.style.fontSize = '2.5rem';
    });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('srcset') && !img.hasAttribute('sizes')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Existing mobile functions (keep these from your original mobile.js)
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navToggle || !navLinks) return;
    
    // Create mobile menu overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileOverlay);
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate hamburger to X
        const bars = navToggle.querySelectorAll('i');
        bars.forEach(bar => {
            bar.classList.toggle('fa-bars');
            bar.classList.toggle('fa-times');
        });
        
        // Add ARIA attributes
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Reset hamburger icon
        const bars = navToggle.querySelectorAll('i');
        bars.forEach(bar => {
            bar.classList.add('fa-bars');
            bar.classList.remove('fa-times');
        });
        
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Add ARIA attributes
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'mobile-menu');
    navLinks.id = 'mobile-menu';
}

function initTouchGestures() {
    let startX, startY;
    let isSwiping = false;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Horizontal swipe detection
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    closeMobileMenu();
                }
            } else {
                // Swipe right - could be used for other functionality
            }
            isSwiping = false;
        }
    });
    
    document.addEventListener('touchend', function() {
        isSwiping = false;
    });
}

function initMobileAnimations() {
    // Only run on mobile devices
    if (!isMobile()) return;
    
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-tertiary, a[role="button"]');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Improve touch targets
    const touchElements = document.querySelectorAll('a, button, input, select, textarea');
    touchElements.forEach(el => {
        const minHeight = 44;
        const minWidth = 44;
        
        const rect = el.getBoundingClientRect();
        if (rect.height < minHeight || rect.width < minWidth) {
            el.style.minHeight = Math.max(rect.height, minHeight) + 'px';
            el.style.minWidth = Math.max(rect.width, minWidth) + 'px';
        }
    });
    
    // Lazy load images for better performance
    initLazyLoading();
    
    // Add mobile-specific CSS classes
    document.body.classList.add('mobile-view');
}

function initMobileForms() {
    if (!isMobile()) return;
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Change input types for better mobile keyboard
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.setAttribute('autocapitalize', 'off');
            input.setAttribute('autocorrect', 'off');
        });
        
        const telInputs = form.querySelectorAll('input[type="tel"]');
        telInputs.forEach(input => {
            input.setAttribute('inputmode', 'tel');
        });
        
        const numberInputs = form.querySelectorAll('input[type="number"]');
        numberInputs.forEach(input => {
            input.setAttribute('inputmode', 'numeric');
        });
        
        // Prevent zoom on focus
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px'; // Prevents iOS zoom
            });
        });
        
        // Form submission handling
        form.addEventListener('submit', function(e) {
            // Add loading state for mobile
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Reset after 5 seconds if something goes wrong
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    });
}

function initMobileSliders() {
    // Testimonial slider for mobile
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (!testimonialSlider || !isMobile()) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            const nextBtn = testimonialSlider.querySelector('.slider-next');
            if (nextBtn) nextBtn.click();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            const prevBtn = testimonialSlider.querySelector('.slider-prev');
            if (prevBtn) prevBtn.click();
        }
    }
    
    // Make slider dots larger for touch
    const dots = testimonialSlider.querySelectorAll('.slider-dots .dot');
    dots.forEach(dot => {
        dot.style.width = '15px';
        dot.style.height = '15px';
    });
}

function initMobileAccordions() {
    // FAQ accordions on contact page
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0 || !isMobile()) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Make entire question area clickable
        question.style.cursor = 'pointer';
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
        
        // Add touch feedback
        question.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        });
        
        question.addEventListener('touchend', function() {
            this.style.backgroundColor = '';
        });
    });
}

function initBackButton() {
    // Handle Android back button
    if (window.history && window.history.pushState) {
        window.history.pushState('forward', null, location.href);
        
        window.addEventListener('popstate', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                closeMobileMenu();
                history.pushState('forward', null, location.href);
            }
        });
    }
}

function initOrientationChange() {
    let previousOrientation = window.orientation;
    
    window.addEventListener('orientationchange', function() {
        // Debounce orientation change
        setTimeout(function() {
            const currentOrientation = window.orientation;
            
            if (previousOrientation !== currentOrientation) {
                // Handle orientation change
                adjustLayoutForOrientation(currentOrientation);
                previousOrientation = currentOrientation;
                
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('orientationchanged', {
                    detail: { orientation: currentOrientation }
                }));
            }
        }, 300);
    });
    
    function adjustLayoutForOrientation(orientation) {
        // Adjust specific elements based on orientation
        const heroSection = document.querySelector('.hero');
        const cubeContainer = document.querySelector('.cube-container');
        
        if (heroSection && cubeContainer) {
            if (Math.abs(orientation) === 90) {
                // Landscape
                cubeContainer.style.width = '200px';
                cubeContainer.style.height = '200px';
            } else {
                // Portrait
                cubeContainer.style.width = '300px';
                cubeContainer.style.height = '300px';
            }
        }
        
        // Refresh any sliders or carousels
        if (window.Swiper) {
            const swipers = document.querySelectorAll('.swiper-container');
            swipers.forEach(swiper => {
                if (swiper.swiper) {
                    swiper.swiper.update();
                }
            });
        }
    }
}

function initTouchScroll() {
    // Improve touch scrolling experience
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (!isMobile()) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s ease';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Prevent pull-to-refresh on specific elements
    const preventPullElements = document.querySelectorAll('.service-card, .case-study, .testimonial-content');
    preventPullElements.forEach(el => {
        el.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            
            const initialY = e.touches[0].clientY;
            
            function handleTouchMove(e) {
                const currentY = e.touches[0].clientY;
                
                // If scrolling up from top, prevent default
                if (el.scrollTop === 0 && currentY > initialY) {
                    e.preventDefault();
                }
            }
            
            el.addEventListener('touchmove', handleTouchMove, { passive: false });
            
            el.addEventListener('touchend', function() {
                el.removeEventListener('touchmove', handleTouchMove);
            });
        });
    });
}

function initMobileViewport() {
    // Fix viewport height issues on mobile
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Add iOS specific fixes
    if (isIOS()) {
        // Fix for Safari 100vh issue
        document.body.style.height = 'calc(var(--vh, 1vh) * 100)';
        
        // Fix for iOS hover states
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
}

// Utility Functions
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroid() {
    return /Android/.test(navigator.userAgent);
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (navLinks) navLinks.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function initLazyLoading() {
    // Simple lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Mobile Performance Optimizations
function optimizeMobilePerformance() {
    // Reduce animations on low-end devices
    if (isLowEndDevice()) {
        document.body.classList.add('low-performance');
        
        // Disable heavy animations
        const heavyAnimations = document.querySelectorAll('.cube, .pyramid, .hexagon, .sphere');
        heavyAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // Defer non-critical JavaScript
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Load non-critical scripts here
        });
    }
}

function isLowEndDevice() {
    // Simple detection for low-end devices
    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    return (memory && memory < 4) || (cores && cores < 4);
}

// Add mobile-specific CSS classes
function addMobileClasses() {
    if (isMobile()) {
        document.documentElement.classList.add('mobile-device');
        
        if (isIOS()) {
            document.documentElement.classList.add('ios-device');
        }
        
        if (isAndroid()) {
            document.documentElement.classList.add('android-device');
        }
        
        if (isTouchDevice()) {
            document.documentElement.classList.add('touch-device');
        }
    }
}

// Initialize on load
addMobileClasses();
optimizeMobilePerformance();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isMobile,
        isIOS,
        isAndroid,
        isTouchDevice,
        closeMobileMenu,
        initServicesMobile
    };
}