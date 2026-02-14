// ===================================
// PSP TechnoCADD - Ultra Premium Interactive Script
// ===================================

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
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===================================
    // SCROLL SPY - HIGHLIGHT ACTIVE SECTION
    // ===================================
    const sections = document.querySelectorAll('section[id], main > section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .nav-menu a[href*="#"]');
    
    function getSectionId(href) {
        const hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
            return href.substring(hashIndex + 1);
        }
        return null;
    }
    
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const sectionId = getSectionId(href);
            
            if (sectionId === currentSection) {
                link.classList.add('active');
            }
        });
        
        // If at top of page, highlight Home
        if (window.pageYOffset < 300) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === 'index.html' || href === '/' || href === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    if (sections.length > 0) {
        window.addEventListener('scroll', debounce(updateActiveNavLink, 10));
        updateActiveNavLink();
    }

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

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

    document.querySelectorAll('.card, .industry-card, .feature-item, .stat-card, .director-card, .equipment-card').forEach(el => {
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

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            };

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbx3PexorUuMFSTFeCOY5TNCkRKGom8aNGJwQPkjnoaZKFgBRRcMnXtSLTpZ5-CMmZ26/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                showFormMessage(formMessage, 'success', '✓ Thank you! We\'ll get back to you within 24-48 hours.');
                contactForm.reset();

            } catch (error) {
                showFormMessage(formMessage, 'error', '✗ Something went wrong. Please email us directly at contact@technocaddapl.com');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ===================================
    // CAREERS FORM HANDLER WITH RESUME UPLOAD
    // ===================================
    const careersForm = document.getElementById('careersForm');
    const careersMessage = document.getElementById('careersMessage');
    
    if (careersForm && careersMessage) {
        careersForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const resumeInput = document.getElementById('resume');
            const resumeFile = resumeInput.files[0];

            // Validate file
            if (!resumeFile) {
                showFormMessage(careersMessage, 'error', '✗ Please attach your resume.');
                return;
            }

            // Check file size (max 5MB)
            if (resumeFile.size > 5 * 1024 * 1024) {
                showFormMessage(careersMessage, 'error', '✗ Resume file size must be less than 5MB.');
                return;
            }

            // Check file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(resumeFile.type)) {
                showFormMessage(careersMessage, 'error', '✗ Please upload a PDF or Word document.');
                return;
            }

            const submitBtn = careersForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Uploading Resume...';
            submitBtn.disabled = true;

            try {
                // Convert file to base64
                console.log('Converting resume to base64...');
                const base64Resume = await fileToBase64(resumeFile);

                const formData = {
                    name: document.getElementById('careerName').value,
                    email: document.getElementById('careerEmail').value,
                    phone: document.getElementById('careerPhone').value,
                    position: document.getElementById('position').value,
                    experience: document.getElementById('experience').value,
                    qualification: document.getElementById('qualification').value,
                    coverLetter: document.getElementById('coverLetter').value,
                    linkedin: document.getElementById('linkedin').value,
                    resumeFileName: resumeFile.name,
                    resumeFileType: resumeFile.type,
                    resumeFileData: base64Resume,
                    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                };

                console.log('Sending application to Google Apps Script...');

                // ✅ UPDATED URL - Send to NEW Google Apps Script
                const response = await fetch('https://script.google.com/macros/s/AKfycbyQKTETg6UxPZzqTsFR7ZRDvwlcr9n35MiNzKcgbgoQq8Ht3tiJ4oJuGnjFwM2PahPcCg/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Application submitted successfully!');
                showFormMessage(careersMessage, 'success', '✓ Application submitted successfully! We\'ll review your profile and get back to you within 5-7 business days.');
                careersForm.reset();

            } catch (error) {
                console.error('Error:', error);
                showFormMessage(careersMessage, 'error', '✗ Something went wrong. Please email your resume to contact@technocaddapl.com');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

        // Show file name when selected
        const resumeInput = document.getElementById('resume');
        if (resumeInput) {
            resumeInput.addEventListener('change', function() {
                const fileName = this.files[0]?.name;
                const fileSize = this.files[0]?.size;
                const fileLabel = document.querySelector('.file-label');
                if (fileLabel && fileName) {
                    const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);
                    fileLabel.innerHTML = `✓ Selected: <strong>${fileName}</strong> (${sizeMB} MB)`;
                    fileLabel.style.color = '#155724';
                    fileLabel.style.fontWeight = '600';
                }
            });
        }
    }

    // ===================================
    // SERVICE MODAL FUNCTIONALITY
    // ===================================
    const serviceCards = document.querySelectorAll('.card[data-modal]');
    const modals = document.querySelectorAll('.service-modal');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modals.forEach(modal => {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
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

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove the data:mime/type;base64, prefix
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}

// Show form message
function showFormMessage(messageElement, type, text) {
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';
    messageElement.style.padding = '16px';
    messageElement.style.marginTop = '20px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.fontWeight = '500';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.border = '1px solid #c3e6cb';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.border = '1px solid #f5c6cb';
    }
    
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {

    const scooter = document.getElementById("launchScooter");
    const overlay = document.getElementById("simpleOverlay");
    const closeBtn = document.getElementById("overlayClose");
    const backBtn = document.getElementById("backBtn");

    let clickTimer = null;

    scooter.addEventListener("click", function () {

        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;

            // Double click → Maps
            window.open(
                "https://maps.app.goo.gl/WKXe5VwzVgxF9Gkg8",
                "_blank"
            );
        } else {

            clickTimer = setTimeout(() => {
                overlay.style.display = "block";
                clickTimer = null;
            }, 250);
        }

    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    backBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

});
