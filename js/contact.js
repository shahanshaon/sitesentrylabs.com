// Contact Page Specific JavaScript

// 3D Sphere rotation control
document.addEventListener('DOMContentLoaded', function() {
    const sphere = document.querySelector('.sphere');
    
    if (sphere) {
        // Add interactive rotation on mouse move
        document.addEventListener('mousemove', function(e) {
            if (!sphere) return;
            
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const rotateY = x * 360;
            const rotateX = y * 360;
            
            sphere.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset rotation when mouse leaves the window
        document.addEventListener('mouseleave', function() {
            if (sphere) {
                sphere.style.transform = 'rotateX(0) rotateY(0)';
            }
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show a success message
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! We will get back to you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Add some visual feedback
                const formContainer = document.querySelector('.contact-form-container');
                formContainer.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.3)';
                
                setTimeout(() => {
                    formContainer.style.boxShadow = '';
                }, 2000);
            }, 1500);
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Animate form elements on scroll
    const formGroups = document.querySelectorAll('.form-group');
    
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                formObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        group.style.transitionDelay = `${index * 0.1}s`;
        formObserver.observe(group);
    });
    
    // Animate contact info items
    const infoItems = document.querySelectorAll('.info-item');
    
    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                infoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.15}s`;
        infoObserver.observe(item);
    });
    
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