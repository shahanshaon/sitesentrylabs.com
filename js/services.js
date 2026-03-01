// Services Page Specific JavaScript - REDESIGNED VERSION

document.addEventListener('DOMContentLoaded', function() {
    console.log('Services page loaded - Initializing functionality');
    
    // Initialize all services functionality
    initServiceFiltering();
    initServiceModal();
    initServiceAnimations();
    initCyberOrb();
    initSecurityAssessmentForm();
    initScrollAnimations();
    initMobileMenu();
});

// 1. SERVICE FILTERING FUNCTIONALITY
function initServiceFiltering() {
    const filterTabs = document.querySelectorAll('.service-tab');
    const serviceCards = document.querySelectorAll('.service-card');
    
    console.log(`Found ${filterTabs.length} filter tabs and ${serviceCards.length} service cards`);
    
    if (filterTabs.length === 0 || serviceCards.length === 0) {
        console.error('Service filtering elements not found');
        return;
    }
    
    // Add click event to each filter tab
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            console.log(`Filtering by category: ${category}`);
            
            // Update active tab
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Filter service cards
            filterServiceCards(category);
            
            // Add animation effect
            animateFilterChange();
            
            // Update URL hash for bookmarking
            updateURLHash(category);
        });
        
        // Add keyboard navigation
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const tabs = Array.from(filterTabs);
                const currentIndex = tabs.indexOf(this);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            }
        });
        
        // Add ARIA attributes
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', 'services-grid');
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
    });
    
    function filterServiceCards(category) {
        let visibleCount = 0;
        
        serviceCards.forEach((card, index) => {
            const display = category === 'all' || card.classList.contains(category);
            
            if (display) {
                card.style.display = 'flex';
                visibleCount++;
                
                // Stagger animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
            
            // Update ARIA attributes
            card.setAttribute('aria-hidden', !display);
        });
        
        console.log(`Showing ${visibleCount} services for category: ${category}`);
        
        // Update grid height for smooth transition
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            servicesGrid.style.minHeight = `${Math.ceil(visibleCount / 3) * 400}px`;
        }
    }
    
    function animateFilterChange() {
        // Add visual feedback to active tab
        const activeTab = document.querySelector('.service-tab.active');
        if (activeTab) {
            activeTab.style.transform = 'scale(0.95)';
            setTimeout(() => {
                activeTab.style.transform = 'scale(1)';
            }, 150);
        }
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            background: rgba(0, 255, 0, 0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        if (activeTab) {
            activeTab.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    }
    
    function updateURLHash(category) {
        if (category !== 'all') {
            window.history.replaceState(null, null, `#${category}`);
        } else {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
    
    // Check for hash on load
    const hash = window.location.hash.substring(1);
    if (['development', 'security', 'consultancy'].includes(hash)) {
        const tab = document.querySelector(`.service-tab[data-category="${hash}"]`);
        if (tab) {
            tab.click();
        }
    }
    
    // Initialize with all services showing
    filterServiceCards('all');
}

// 2. SERVICE MODAL FUNCTIONALITY
function initServiceModal() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = modal?.querySelector('.modal-close');
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!modal) {
        console.error('Service modal not found');
        return;
    }
    
    console.log('Initializing service modal');
    
    // Open modal when clicking service links
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const card = this.closest('.service-card');
            if (card) {
                openServiceModal(card);
            }
        });
    });
    
    // Also allow clicking anywhere on the card to open modal
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on the service link
            if (e.target.closest('.service-link')) return;
            
            // Don't open modal if clicking on filter tabs
            if (e.target.closest('.service-tab')) return;
            
            openServiceModal(this);
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
        
        // Keyboard close
        closeBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeServiceModal();
            }
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeServiceModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeServiceModal();
        }
    });
    
    // Trap focus inside modal
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && modal.classList.contains('active')) {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    function openServiceModal(card) {
        const serviceType = card.dataset.service;
        const serviceTitle = card.querySelector('h3')?.textContent || 'Service';
        const serviceDescription = card.querySelector('p')?.textContent || '';
        const serviceBadge = card.querySelector('.service-badge span')?.textContent || 'Service';
        const serviceIcon = card.querySelector('.service-icon i')?.className || 'fas fa-code';
        
        console.log(`Opening modal for service: ${serviceType}`);
        
        // Update modal content based on service
        updateModalContent(serviceType, serviceTitle, serviceDescription, serviceBadge, serviceIcon);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first interactive element
        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) firstFocusable.focus();
        }, 100);
        
        // Add to analytics (simulated)
        trackServiceView(serviceType);
    }
    
    function closeServiceModal() {
        console.log('Closing service modal');
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to the card that opened the modal
        const activeCard = document.querySelector('.service-card:focus, .service-link:focus');
        if (activeCard) {
            setTimeout(() => activeCard.focus(), 100);
        }
    }
    
    function updateModalContent(serviceType, title, description, badge, icon) {
        const modalIcon = modal.querySelector('.modal-icon i');
        const modalTitle = modal.querySelector('.modal-title h2');
        const modalBadge = modal.querySelector('.modal-badge span');
        const modalDescription = modal.querySelector('.modal-section p');
        
        if (modalIcon) modalIcon.className = icon;
        if (modalTitle) modalTitle.textContent = title;
        if (modalBadge) modalBadge.textContent = badge;
        if (modalDescription) modalDescription.textContent = description;
        
        // Update ARIA label
        modal.setAttribute('aria-label', `Details for ${title} service`);
        
        // Update detailed content based on service type
        updateServiceDetails(serviceType);
    }
    
    function updateServiceDetails(serviceType) {
        const featuresGrid = modal.querySelector('.features-grid');
        const techStack = modal.querySelector('.tech-stack');
        
        // Service-specific content
        const serviceData = {
            'web-dev': {
                title: 'Secure Web Development',
                description: 'Enterprise-grade web applications built with security-first architecture using modern frameworks and best practices.',
                features: [
                    { icon: 'fas fa-lock', title: 'Secure Architecture', desc: 'Security-first design from ground up' },
                    { icon: 'fas fa-bolt', title: 'Performance Optimized', desc: 'Fast loading and efficient execution' },
                    { icon: 'fas fa-mobile-alt', title: 'Responsive Design', desc: 'Perfect experience on all devices' },
                    { icon: 'fas fa-shield-alt', title: 'Regular Audits', desc: 'Continuous security testing' }
                ],
                technologies: ['React', 'Node.js', 'Python', 'Docker', 'AWS', 'Kubernetes']
            },
            'cybersecurity': {
                title: 'Threat Protection Suite',
                description: 'Comprehensive cybersecurity services including penetration testing, vulnerability assessment, and 24/7 monitoring.',
                features: [
                    { icon: 'fas fa-search', title: 'Vulnerability Assessment', desc: 'Comprehensive security scanning' },
                    { icon: 'fas fa-user-shield', title: '24/7 Monitoring', desc: 'Round-the-clock threat detection' },
                    { icon: 'fas fa-bolt', title: 'Incident Response', desc: 'Immediate threat mitigation' },
                    { icon: 'fas fa-chart-line', title: 'Threat Intelligence', desc: 'Real-time security analytics' }
                ],
                technologies: ['SIEM', 'EDR', 'IDS/IPS', 'Firewall', 'VPN', 'DLP']
            },
            'ecommerce': {
                title: 'Secure E-commerce Platform',
                description: 'PCI-DSS compliant online stores with fraud detection, secure payments, and inventory management.',
                features: [
                    { icon: 'fas fa-credit-card', title: 'PCI DSS Compliance', desc: 'Secure payment processing' },
                    { icon: 'fas fa-shield-alt', title: 'Fraud Detection', desc: 'Advanced fraud prevention' },
                    { icon: 'fas fa-box', title: 'Inventory Management', desc: 'Real-time stock tracking' },
                    { icon: 'fas fa-chart-bar', title: 'Analytics Dashboard', desc: 'Sales and performance insights' }
                ],
                technologies: ['Magento', 'WooCommerce', 'Shopify', 'Stripe', 'PayPal', 'SSL']
            },
            'cloud': {
                title: 'Cloud Infrastructure Security',
                description: 'End-to-end cloud security for AWS, Azure, and GCP with compliance auditing and container security.',
                features: [
                    { icon: 'fas fa-cloud', title: 'Multi-Cloud Security', desc: 'AWS, Azure, GCP protection' },
                    { icon: 'fas fa-box', title: 'Container Security', desc: 'Docker & Kubernetes security' },
                    { icon: 'fas fa-key', title: 'IAM Management', desc: 'Identity and access control' },
                    { icon: 'fas fa-file-certificate', title: 'Compliance Auditing', desc: 'SOC 2, ISO 27001 ready' }
                ],
                technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform']
            },
            'compliance': {
                title: 'Security Compliance & Governance',
                description: 'Complete compliance solutions for GDPR, HIPAA, ISO 27001, and other regulatory frameworks.',
                features: [
                    { icon: 'fas fa-gavel', title: 'GDPR/HIPAA Ready', desc: 'Regulatory compliance solutions' },
                    { icon: 'fas fa-certificate', title: 'ISO 27001', desc: 'Information security management' },
                    { icon: 'fas fa-file-contract', title: 'Policy Development', desc: 'Security policy creation' },
                    { icon: 'fas fa-chart-pie', title: 'Risk Assessment', desc: 'Comprehensive risk analysis' }
                ],
                technologies: ['GDPR', 'HIPAA', 'ISO 27001', 'SOC 2', 'PCI DSS', 'NIST']
            },
            'devsecops': {
                title: 'DevSecOps Implementation',
                description: 'Integrate security into your CI/CD pipeline with automated testing and infrastructure security.',
                features: [
                    { icon: 'fas fa-cogs', title: 'Secure CI/CD', desc: 'Automated secure pipelines' },
                    { icon: 'fas fa-vial', title: 'SAST/DAST', desc: 'Static & dynamic testing' },
                    { icon: 'fas fa-code', title: 'Infrastructure as Code', desc: 'Security in infrastructure' },
                    { icon: 'fas fa-shield-alt', title: 'Container Security', desc: 'Secure container deployment' }
                ],
                technologies: ['Jenkins', 'GitLab CI', 'SonarQube', 'Docker', 'Kubernetes', 'Ansible']
            }
        };
        
        const data = serviceData[serviceType] || serviceData['web-dev'];
        
        // Update features
        if (featuresGrid) {
            featuresGrid.innerHTML = '';
            data.features.forEach(feature => {
                const featureHTML = `
                    <div class="feature-item" tabindex="0">
                        <i class="${feature.icon}"></i>
                        <h4>${feature.title}</h4>
                        <p>${feature.desc}</p>
                    </div>
                `;
                featuresGrid.insertAdjacentHTML('beforeend', featureHTML);
            });
        }
        
        // Update technologies
        if (techStack) {
            techStack.innerHTML = '';
            data.technologies.forEach(tech => {
                const techHTML = `<span class="tech-item">${tech}</span>`;
                techStack.insertAdjacentHTML('beforeend', techHTML);
            });
        }
    }
    
    function trackServiceView(serviceType) {
        // Simulate analytics tracking
        console.log(`Tracking service view: ${serviceType}`);
        // In production, you would send this to your analytics service
        // Example: gtag('event', 'service_view', { service_type: serviceType });
    }
}

// 3. SERVICE ANIMATIONS
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    const processSteps = document.querySelectorAll('.process-step');
    
    console.log(`Initializing animations for ${serviceCards.length} service cards`);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards
    serviceCards.forEach(card => {
        observer.observe(card);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Only on desktop
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 255, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 255, 0, 0.1)';
            }
        });
        
        // Touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Observe process steps
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(step);
    });
    
    // Add CSS for ripple effect
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 4. CYBER ORB ANIMATION
function initCyberOrb() {
    const orbCore = document.querySelector('.orb-core');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    if (!orbCore) {
        console.warn('Cyber orb element not found');
        return;
    }
    
    console.log('Initializing cyber orb animations');
    
    // Pulsing animation for orb core
    let pulseInterval = setInterval(() => {
        const scale = 1 + Math.random() * 0.1;
        const brightness = 70 + Math.random() * 30;
        orbCore.style.transform = `translate(-50%, -50%) scale(${scale})`;
        orbCore.style.filter = `brightness(${brightness}%) drop-shadow(0 0 ${20 + Math.random() * 10}px rgba(0, 255, 0, 0.5))`;
    }, 2000);
    
    // Interactive hover effect
    orbCore.addEventListener('mouseenter', function() {
        clearInterval(pulseInterval);
        this.style.transform = 'translate(-50%, -50%) scale(1.2)';
        this.style.filter = 'brightness(120%) drop-shadow(0 0 40px rgba(0, 255, 0, 0.8))';
    });
    
    orbCore.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1)';
        this.style.filter = 'brightness(100%) drop-shadow(0 0 30px rgba(0, 255, 0, 0.5))';
        pulseInterval = setInterval(() => {
            const scale = 1 + Math.random() * 0.1;
            const brightness = 70 + Math.random() * 30;
            orbCore.style.transform = `translate(-50%, -50%) scale(${scale})`;
            orbCore.style.filter = `brightness(${brightness}%) drop-shadow(0 0 ${20 + Math.random() * 10}px rgba(0, 255, 0, 0.5))`;
        }, 2000);
    });
    
    // Make floating icons interactive
    floatingIcons.forEach(icon => {
        icon.setAttribute('role', 'button');
        icon.setAttribute('tabindex', '0');
        icon.setAttribute('aria-label', `Filter ${icon.querySelector('i').className.includes('fa-code') ? 'development' : 
                                          icon.querySelector('i').className.includes('fa-user-shield') ? 'security' : 
                                          icon.querySelector('i').className.includes('fa-cloud') ? 'cloud security' : 'consultancy'} services`);
        
        // Click to filter services
        icon.addEventListener('click', function() {
            const iconClass = this.querySelector('i').className;
            let category = 'all';
            
            // Map icons to categories
            if (iconClass.includes('fa-code')) category = 'development';
            else if (iconClass.includes('fa-user-shield')) category = 'security';
            else if (iconClass.includes('fa-cloud')) category = 'security';
            else if (iconClass.includes('fa-headset')) category = 'consultancy';
            
            // Find and click corresponding tab
            const tab = document.querySelector(`.service-tab[data-category="${category}"]`);
            if (tab) {
                tab.click();
                
                // Scroll to services grid
                const servicesGrid = document.querySelector('.services-grid-section');
                if (servicesGrid) {
                    servicesGrid.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
        
        // Keyboard support
        icon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// 5. SECURITY ASSESSMENT FORM
function initSecurityAssessmentForm() {
    const assessmentForm = document.getElementById('securityAssessment');
    
    if (!assessmentForm) {
        console.warn('Security assessment form not found');
        return;
    }
    
    console.log('Initializing security assessment form');
    
    assessmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name')?.trim() || 'Not provided';
        const email = formData.get('email')?.trim() || 'Not provided';
        const website = formData.get('website')?.trim() || 'Not provided';
        const service = this.querySelector('select').value;
        
        // Validate form
        if (!validateForm(name, email, website)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showFormSuccess(`
                Thank you ${name}! Your free security assessment request has been submitted.
                Our team will contact you at ${email} within 24 hours.
                We'll be reviewing ${website || 'your website'} for ${getServiceName(service)}.
            `);
            
            // Reset form
            assessmentForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Track form submission
            trackFormSubmission(name, email, service);
        }, 2000);
    });
    
    // Form validation
    const inputs = assessmentForm.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
            clearFieldError(this);
        });
    });
    
    function validateForm(name, email, website) {
        let isValid = true;
        
        // Validate email
        const emailInput = assessmentForm.querySelector('input[type="email"]');
        if (!email || !isValidEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate name
        const nameInput = assessmentForm.querySelector('input[type="text"]');
        if (!name || name.length < 2) {
            showFieldError(nameInput, 'Please enter your full name');
            isValid = false;
        }
        
        // Validate website if provided
        const websiteInput = assessmentForm.querySelector('input[placeholder*="Website"]');
        if (website && !isValidUrl(website)) {
            showFieldError(websiteInput, 'Please enter a valid website URL');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.placeholder.includes('Website') && field.value && !isValidUrl(field.value)) {
            showFieldError(field, 'Please enter a valid website URL');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidUrl(url) {
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    }
    
    function getServiceName(serviceValue) {
        const services = {
            'web-dev': 'Web Development',
            'security': 'Cybersecurity',
            'compliance': 'Compliance',
            'cloud': 'Cloud Security'
        };
        return services[serviceValue] || 'security services';
    }
    
    function trackFormSubmission(name, email, service) {
        console.log('Form submitted:', { name, email, service });
        // In production, send to analytics or CRM
        // Example: gtag('event', 'form_submission', { form_name: 'security_assessment' });
    }
}

// 6. SCROLL ANIMATIONS
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .process-step, .header-stat, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// 7. MOBILE MENU FUNCTIONALITY
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function() {
        const isExpanded = navLinks.style.display === 'flex';
        
        if (isExpanded) {
            navLinks.style.display = 'none';
            this.setAttribute('aria-expanded', 'false');
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(10, 14, 23, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.borderTop = '1px solid var(--border-color)';
            this.setAttribute('aria-expanded', 'true');
            
            // Focus first link when opening
            setTimeout(() => {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 100);
        }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !navToggle.contains(e.target) && 
            !navLinks.contains(e.target) &&
            navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
}

// HELPER FUNCTIONS
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-color)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    
    // Scroll to error field
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field.focus();
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormSuccess(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        color: var(--success-color);
        padding: 1rem;
        margin-top: 1rem;
        border: 1px solid var(--success-color);
        border-radius: 5px;
        background: rgba(0, 255, 136, 0.1);
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    const form = document.querySelector('.cta-form');
    form.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Initialize on window load for better performance
window.addEventListener('load', function() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F to focus on filter tabs
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const firstTab = document.querySelector('.service-tab');
            if (firstTab) firstTab.focus();
        }
        
        // Number keys 1-4 to select filter tabs
        if (e.key >= '1' && e.key <= '4') {
            const tabs = document.querySelectorAll('.service-tab');
            const index = parseInt(e.key) - 1;
            if (tabs[index]) {
                tabs[index].click();
                tabs[index].focus();
            }
        }
    });
    
    // Add CSS for scroll animations
    if (!document.querySelector('#scroll-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'scroll-animation-styles';
        style.textContent = `
            .scroll-animate {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .scroll-animate.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Services page fully loaded and initialized');
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initServiceFiltering,
        initServiceModal,
        initServiceAnimations,
        initCyberOrb,
        initSecurityAssessmentForm
    };
}