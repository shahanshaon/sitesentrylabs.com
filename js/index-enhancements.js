/* === INDEX PAGE ENHANCEMENTS === */

/* Matrix Rain Overlay */
.matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.03;
    background: linear-gradient(transparent 90%, rgba(0, 255, 0, 0.1));
}

/* Enhanced Navigation */
.nav-links .btn-audit {
    background: var(--secondary-color);
    color: var(--primary-color);
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    margin-left: 1rem;
    transition: all 0.3s ease;
}

.nav-links .btn-audit:hover {
    background: transparent;
    color: var(--secondary-color);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

/* Enhanced Hero */
.hero-badge {
    display: inline-block;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid var(--secondary-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    margin-bottom: 2rem;
    animation: pulse 2s infinite;
}

.hero-badge span {
    color: var(--secondary-color);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-tertiary {
    background: transparent;
    color: var(--text-color);
    border: 1px solid var(--text-color);
    padding: 0.9rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn-tertiary:hover {
    background: var(--text-color);
    color: var(--primary-color);
    border-color: var(--text-color);
}

.hero-trust {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #b0b0b0;
    font-size: 0.9rem;
}

.trust-item i {
    color: var(--secondary-color);
}

.floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.float-element {
    position: absolute;
    font-size: 1.5rem;
    color: rgba(0, 255, 0, 0.3);
    animation: float 6s infinite ease-in-out;
}

.float-element.el1 { top: 20%; left: 10%; animation-delay: 0s; }
.float-element.el2 { top: 60%; left: 80%; animation-delay: 1s; }
.float-element.el3 { top: 80%; left: 20%; animation-delay: 2s; }
.float-element.el4 { top: 30%; left: 70%; animation-delay: 3s; }

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
}

/* Trust Badges */
.trust-badges {
    padding: 2rem;
    background: var(--card-bg);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.badges-container {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 2rem;
}

.badge {
    text-align: center;
    padding: 1rem;
    transition: all 0.3s ease;
}

.badge i {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.badge:hover i {
    transform: scale(1.2);
    text-shadow: 0 0 20px var(--secondary-color);
}

.badge h4 {
    font-size: 1rem;
    color: #b0b0b0;
}

/* Enhanced Service Cards */
.service-card {
    position: relative;
    overflow: hidden;
}

.service-card-inner {
    transition: transform 0.3s ease;
}

.service-card:hover .service-card-inner {
    transform: translateY(-100%);
}

.service-card-hover {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--card-bg);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
}

.service-card:hover .service-card-hover {
    transform: translateY(-100%);
}

.service-features {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1.5rem 0;
}

.service-features span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #b0b0b0;
}

.service-features i {
    color: var(--secondary-color);
}

.services-cta {
    text-align: center;
    margin-top: 3rem;
}

/* Security Features */
.security-features {
    padding: 5rem 2rem;
    background: var(--card-bg);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.features-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
}

.features-subtitle {
    color: #b0b0b0;
    margin-bottom: 3rem;
    font-size: 1.2rem;
}

.features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.feature {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
}

.feature-icon {
    font-size: 2rem;
    color: var(--secondary-color);
    flex-shrink: 0;
}

.feature-content h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.feature-content p {
    color: #b0b0b0;
    line-height: 1.6;
}

.security-shield {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
}

.shield-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    color: var(--secondary-color);
    z-index: 2;
    animation: pulse 2s infinite;
}

.shield-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid var(--secondary-color);
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.shield-ring.ring1 {
    width: 200px;
    height: 200px;
    animation: rotate 20s linear infinite;
}

.shield-ring.ring2 {
    width: 250px;
    height: 250px;
    animation: rotate 25s linear infinite reverse;
}

.shield-ring.ring3 {
    width: 300px;
    height: 300px;
    animation: rotate 30s linear infinite;
}

.threat-dots {
    position: absolute;
    width: 100%;
    height: 100%;
}

.threat-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ff5555;
    border-radius: 50%;
    animation: threatMove 3s linear infinite;
}

.threat-dot.dot1 { top: 10%; left: 10%; animation-delay: 0s; }
.threat-dot.dot2 { top: 20%; left: 80%; animation-delay: 0.5s; }
.threat-dot.dot3 { top: 70%; left: 20%; animation-delay: 1s; }
.threat-dot.dot4 { top: 80%; left: 70%; animation-delay: 1.5s; }
.threat-dot.dot5 { top: 50%; left: 50%; animation-delay: 2s; }

@keyframes threatMove {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
}

/* Case Studies */
.case-studies {
    padding: 5rem 2rem;
}

.case-studies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto 0;
}

.case-study {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.3s ease;
}

.case-study:hover {
    transform: translateY(-10px);
    border-color: var(--secondary-color);
    box-shadow: 0 15px 30px var(--hover-glow);
}

.case-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
}

.case-logo {
    font-size: 2rem;
    color: var(--secondary-color);
}

.case-info h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.case-tag {
    background: rgba(0, 255, 0, 0.1);
    color: var(--secondary-color);
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
}

.case-content p {
    color: #b0b0b0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.case-stats {
    display: flex;
    gap: 2rem;
    margin: 1.5rem 0;
}

.case-stats .stat {
    text-align: center;
}

.case-stats .stat h4 {
    font-size: 1.8rem;
    color: var(--secondary-color);
    margin-bottom: 0.3rem;
}

.case-stats .stat p {
    font-size: 0.9rem;
    color: #b0b0b0;
    margin: 0;
}

.case-link {
    color: var(--secondary-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: gap 0.3s ease;
}

.case-link:hover {
    gap: 1rem;
}

/* Security Audit */
.security-audit {
    padding: 5rem 2rem;
    background: linear-gradient(135deg, var(--card-bg) 0%, rgba(0, 30, 0, 0.5) 100%);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.audit-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
}

.audit-subtitle {
    color: #b0b0b0;
    margin: 1rem 0 2rem;
    font-size: 1.2rem;
}

.audit-features {
    list-style: none;
    margin: 2rem 0;
}

.audit-features li {
    color: #b0b0b0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.audit-features i {
    color: var(--secondary-color);
}

.audit-form {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.audit-form h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.audit-form .form-group {
    margin-bottom: 1.5rem;
}

.audit-form input {
    width: 100%;
    padding: 1rem;
    background: rgba(0, 20, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    color: var(--text-color);
    font-size: 1rem;
}

.audit-form input:focus {
    outline: none;
    border-color: var(--secondary-color);
}

.audit-form .btn-primary {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
}

.form-note {
    color: #b0b0b0;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1rem;
}

/* Enhanced Team Preview */
.team-highlight {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin: 3rem 0;
    flex-wrap: wrap;
}

.team-member {
    text-align: center;
    padding: 1.5rem;
    background: rgba(0, 255, 0, 0.05);
    border-radius: 10px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.team-member:hover {
    border-color: var(--secondary-color);
    transform: translateY(-5px);
}

.member-avatar {
    font-size: 3rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.member-info h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.member-info p {
    color: #b0b0b0;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.member-certifications {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.member-certifications span {
    background: rgba(0, 255, 0, 0.1);
    color: var(--secondary-color);
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
}

/* Testimonials */
.testimonials {
    padding: 5rem 2rem;
    background: var(--card-bg);
}

.testimonials-slider {
    max-width: 800px;
    margin: 3rem auto 0;
    position: relative;
}

.testimonial {
    display: none;
    animation: fadeIn 0.5s ease;
}

.testimonial.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.testimonial-content {
    background: rgba(0, 20, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 3rem;
    position: relative;
}

.quote-icon {
    font-size: 2rem;
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    opacity: 0.5;
}

.testimonial-content p {
    color: #b0b0b0;
    font-size: 1.1rem;
    line-height: 1.8;
    font-style: italic;
    margin-bottom: 2rem;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.author-avatar {
    font-size: 2rem;
    color: var(--secondary-color);
}

.author-info h4 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}

.author-info p {
    color: #b0b0b0;
    font-size: 0.9rem;
    margin: 0;
    font-style: normal;
}

.slider-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
}

.slider-prev, .slider-next {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slider-prev:hover, .slider-next:hover {
    border-color: var(--secondary-color);
    color: var(--secondary-color);
}

.slider-dots {
    display: flex;
    gap: 0.5rem;
}

.slider-dots .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border-color);
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-dots .dot.active {
    background: var(--secondary-color);
    transform: scale(1.2);
}

/* Partners */
.partners {
    padding: 5rem 2rem;
}

.partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto 0;
}

.partner {
    text-align: center;
    padding: 2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.partner:hover {
    border-color: var(--secondary-color);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--hover-glow);
}

.partner i {
    font-size: 3rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.partner span {
    display: block;
    color: #b0b0b0;
    font-size: 1rem;
}

/* Newsletter */
.newsletter {
    padding: 5rem 2rem;
    background: linear-gradient(135deg, rgba(0, 30, 0, 0.5) 0%, var(--card-bg) 100%);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.newsletter-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
}

.newsletter-content p {
    color: #b0b0b0;
    margin: 1rem 0 2rem;
    font-size: 1.2rem;
}

.newsletter-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}

.newsletter-features span {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: #b0b0b0;
}

.newsletter-features i {
    color: var(--secondary-color);
}

.newsletter-form .form-group {
    display: flex;
    gap: 1rem;
}

.newsletter-form input {
    flex: 1;
    padding: 1rem;
    background: rgba(0, 20, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    color: var(--text-color);
    font-size: 1rem;
}

.newsletter-form input:focus {
    outline: none;
    border-color: var(--secondary-color);
}

.newsletter-form .btn-primary {
    padding: 1rem 2rem;
    white-space: nowrap;
}

/* Enhanced Footer */
.footer-social {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.footer-social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.3s ease;
}

.footer-social a:hover {
    background: var(--secondary-color);
    color: var(--primary-color);
    transform: translateY(-3px);
}

.footer-bottom a {
    color: var(--secondary-color);
    text-decoration: none;
    margin: 0 0.5rem;
}

.footer-bottom a:hover {
    text-decoration: underline;
}

/* Back to Top */
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--secondary-color);
    color: var(--primary-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 255, 0, 0.4);
}

/* Live Chat */
.live-chat {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 1000;
}

.chat-toggle {
    width: 60px;
    height: 60px;
    background: var(--secondary-color);
    color: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
    transition: all 0.3s ease;
}

.chat-toggle:hover {
    transform: scale(1.1);
}

.chat-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff5555;
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    animation: pulse 2s infinite;
}

.chat-window {
    position: absolute;
    bottom: 70px;
    left: 0;
    width: 300px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    display: none;
}

.chat-window.active {
    display: block;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.chat-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-header h4 {
    margin: 0;
    color: var(--secondary-color);
}

.chat-close {
    background: transparent;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
}

.chat-body {
    padding: 1rem;
    height: 200px;
    overflow-y: auto;
}

.chat-message {
    margin-bottom: 1rem;
    padding: 0.8rem;
    border-radius: 10px;
    max-width: 80%;
}

.chat-message.bot {
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.2);
    align-self: flex-start;
}

.chat-message p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.9rem;
}

.chat-input {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 0.5rem;
}

.chat-input input {
    flex: 1;
    padding: 0.8rem;
    background: rgba(0, 20, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    color: var(--text-color);
}

.chat-input button {
    background: var(--secondary-color);
    color: var(--primary-color);
    border: none;
    border-radius: 5px;
    padding: 0.8rem 1rem;
    cursor: pointer;
}

/* Responsive Design */
@media (max-width: 992px) {
    .features-container,
    .audit-container,
    .newsletter-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .nav-links .btn-audit {
        display: none;
    }
    
    .hero-trust {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .hero-buttons .btn-primary,
    .hero-buttons .btn-secondary,
    .hero-buttons .btn-tertiary {
        width: 100%;
        max-width: 300px;
        text-align: center;
    }
    
    .case-studies-grid {
        grid-template-columns: 1fr;
    }
    
    .team-highlight {
        flex-direction: column;
        align-items: center;
    }
    
    .newsletter-form .form-group {
        flex-direction: column;
    }
    
    .newsletter-form .btn-primary {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .badges-container {
        flex-direction: column;
        align-items: center;
    }
    
    .testimonial-content {
        padding: 1.5rem;
    }
    
    .chat-window {
        width: 280px;
    }
}