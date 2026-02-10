// Ultra Premium Interactive Script

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // VIDEO AUTOPLAY FIX
    // ===================================
    const video = document.getElementById('heroVideo');
    if (video) {
        video.muted = true;
        video.setAttribute('muted', '');
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video playing');
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                document.body.addEventListener('click', function() {
                    video.play();
                }, { once: true });
            });
        }
    }

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .industry-card, .feature-item, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ===================================
    // SMOOTH PARALLAX EFFECT
    // ===================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.home-hero');
        if (hero && scrolled < window.innerHeight) {
            const video = hero.querySelector('.hero-video');
            if (video) {
                video.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0001})`;
            }
        }
    });

    // ===================================
    // CONTACT FORM HANDLER (GOOGLE SHEETS)
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Send to Google Apps Script
                const response = await fetch('https://script.google.com/macros/s/AKfycbx3PexorUuMFSTFeCOY5TNCkRKGom8aNGJwQPkjnoaZKFgBRRcMnXtSLTpZ5-CMmZ26/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                formMessage.textContent = '✓ Thank you! We\'ll get back to you within 24-48 hours.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                formMessage.style.padding = '16px';
                formMessage.style.marginTop = '20px';
                formMessage.style.borderRadius = '8px';
                formMessage.style.backgroundColor = '#d4edda';
                formMessage.style.color = '#155724';
                formMessage.style.border = '1px solid #c3e6cb';
                formMessage.style.fontWeight = '500';

                // Reset form
                contactForm.reset();

            } catch (error) {
                // Show error message
                formMessage.textContent = '✗ Something went wrong. Please email us directly at contact@technocaddapl.com';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                formMessage.style.padding = '16px';
                formMessage.style.marginTop = '20px';
                formMessage.style.borderRadius = '8px';
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.border = '1px solid #f5c6cb';
                formMessage.style.fontWeight = '500';

            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // ===================================
    // SERVICE MODAL FUNCTIONALITY
    // ===================================
    // Get all service cards with modals
    const serviceCards = document.querySelectorAll('.card[data-modal]');
    const modals = document.querySelectorAll('.service-modal');
    
    // Open modal when clicking on card or "Learn more"
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal functionality
    modals.forEach(modal => {
        // Close on overlay click
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close on X button click
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // ===================================
    // BUTTON RIPPLE EFFECT
    // ===================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Console branding
    console.log('%c PSP TechnoCADD ', 'background: #E63946; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Engineering Excellence, Delivered ', 'background: #1D3557; color: white; font-size: 14px; padding: 5px;');

});
