// Footer Enhancements JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer animations
    initFooterAnimations();
    
    // Initialize footer newsletter form
    initFooterNewsletter();
    
    // Add footer scroll effects
    initFooterScrollEffects();
});

// Footer animations
function initFooterAnimations() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Animate social icons
    const socialIcons = document.querySelectorAll('.footer-social a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'scale(1)';
        });
    });
}

// Footer newsletter form
function initFooterNewsletter() {
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            if (!validateEmail(email)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success
                showFormSuccess(this, 'Thank you for subscribing!');
                
                // Reset form
                emailInput.value = '';
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Footer scroll effects
function initFooterScrollEffects() {
    const footer = document.querySelector('footer');
    
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate footer elements when they come into view
                    animateFooterElements();
                    observer.unobserve(footer);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(footer);
    }
}

// Animate footer elements on scroll
function animateFooterElements() {
    const footerElements = document.querySelectorAll('.footer-content > div');
    
    footerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate footer bottom
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        setTimeout(() => {
            footerBottom.style.opacity = '0';
            footerBottom.style.transform = 'translateY(20px)';
            footerBottom.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                footerBottom.style.opacity = '1';
                footerBottom.style.transform = 'translateY(0)';
            }, 600);
        }, footerElements.length * 200);
    }
}

// Form validation helper functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormError(input, message) {
    // Remove any existing error
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to input
    input.classList.add('error');
    input.classList.remove('success');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error show';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    // Insert error message
    input.parentElement.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        input.classList.remove('error');
    }, 3000);
}

function showFormSuccess(form, message) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = message;
    successDiv.style.color = 'var(--success-color)';
    successDiv.style.fontSize = '0.9rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    successDiv.style.padding = '0.5rem';
    successDiv.style.border = '1px solid var(--success-color)';
    successDiv.style.borderRadius = '5px';
    successDiv.style.background = 'rgba(0, 255, 136, 0.1)';
    
    // Insert success message
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Add keyboard navigation for footer links
document.addEventListener('keydown', function(e) {
    // Focus trap for footer newsletter form
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm && document.activeElement.closest('.footer-newsletter')) {
        if (e.key === 'Escape') {
            newsletterForm.querySelector('input').blur();
        }
    }
});

// Add footer copyright year update
function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.footer-bottom p:first-child');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2023')) {
            element.textContent = element.textContent.replace('2023', currentYear);
        }
    });
}

// Initialize copyright year update
updateCopyrightYear();