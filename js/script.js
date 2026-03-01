// 3D Background Canvas - GREEN THEME
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Green particles for 3D background
const particles = [];
const particleCount = 150;

// Particle class - Green theme
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Green color variations
        const greenIntensity = Math.random() * 100 + 155;
        this.color = `rgba(0, ${greenIntensity}, 0, ${Math.random() * 0.5 + 0.1})`;
        this.distanceFactor = Math.random() * 50 + 10;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        
        // Pulsing effect
        this.size = Math.sin(this.pulse) * 0.5 + 1.5;
        
        // Bounce off edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Create green particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Connect particles with green lines
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const opacity = 0.2 * (1 - distance/100);
                ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Draw matrix-style rain effect
function drawMatrixRain() {
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    // Draw the characters
    ctx.fillStyle = 'rgba(0, 255, 0, 0.05)';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Send the drop back to the top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animation loop
function animate() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw matrix rain in background
    drawMatrixRain();
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    
    requestAnimationFrame(animate);
}

// Initialize animation
animate();

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize particles on resize
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
});

// Mobile menu toggle
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
            navLinks.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.borderTop = '1px solid var(--border-color)';
            navLinks.style.boxShadow = '0 10px 30px rgba(0, 255, 0, 0.1)';
        }
    });
}

// Update active nav link based on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add cyber terminal effect to typewriter text
document.addEventListener('DOMContentLoaded', function() {
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        // Add terminal cursor blink
        setInterval(() => {
            const cursor = typewriter.style.borderRightColor;
            typewriter.style.borderRightColor = cursor === 'transparent' ? 'var(--secondary-color)' : 'transparent';
        }, 500);
    }
    
    // Add glow effect to 3D cube
    const cube = document.querySelector('.cube');
    if (cube) {
        setInterval(() => {
            cube.style.filter = `drop-shadow(0 0 ${Math.random() * 20 + 10}px rgba(0, 255, 0, 0.3))`;
        }, 2000);
    }
});

// Add keyboard sound effects
document.addEventListener('keydown', function(e) {
    // Only play sound for certain keys
    const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab'];
    if (validKeys.includes(e.key)) {
        // Create a simple beep sound
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 800 + Math.random() * 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
    }
});

// ===== TESTIMONIALS SLIDER FIXED FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize live chat
    initLiveChat();
    
    // Initialize security audit form
    initAuditForm();
    
    // Initialize newsletter form
    initNewsletterForm();
});

function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    if (testimonials.length === 0) return;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Handle wrap-around
        if (index >= testimonials.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = testimonials.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate corresponding dot
        testimonials[currentSlide].classList.add('active');
        
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Start auto-slide
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 8000);
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Initialize the slider
    showSlide(0);
    startAutoSlide();
    
    // Next button click event
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(currentSlide + 1);
            startAutoSlide();
        });
    }
    
    // Previous button click event
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(currentSlide - 1);
            startAutoSlide();
        });
    }
    
    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Pause auto-slide when hovering over testimonials
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Pause auto-slide when window is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initLiveChat() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    
    if (!chatToggle) return;
    
    chatToggle.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }
    
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', function() {
            sendChatMessage();
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response after delay
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! Our support team will get back to you shortly.",
                    "We've received your inquiry. One of our security experts will contact you soon.",
                    "Thank you for reaching out. How can we help secure your business today?",
                    "Your message has been received. Our team typically responds within 1-2 business hours."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addChatMessage(randomResponse, 'bot');
            }, 1000);
        }
    }
    
    function addChatMessage(text, sender) {
        const chatBody = document.querySelector('.chat-body');
        if (!chatBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

function initAuditForm() {
    const auditForm = document.getElementById('auditForm');
    
    if (!auditForm) return;
    
    auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(auditForm);
        const name = formData.get('name') || 'Not provided';
        const email = formData.get('email') || 'Not provided';
        const website = formData.get('website') || 'Not provided';
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you for requesting a free security audit!\n\nWe'll send your security report to ${email} within 24 hours.`);
        auditForm.reset();
        
        // You could also redirect to a thank you page
        // window.location.href = 'thank-you.html';
    });
}

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(newsletterForm);
        const email = formData.get('email');
        
        if (email && email.includes('@')) {
            // In a real application, you would send this to a newsletter service
            alert(`Thank you for subscribing to our cybersecurity newsletter!\n\nWe've sent a confirmation email to ${email}.`);
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 255, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
    });
});

// Add animation on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}