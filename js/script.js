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
  // CONTACT FORM
  // ===================================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          formMessage.textContent = 'Thank you! We\'ll get back to you within 24-48 hours.';
          formMessage.className = 'form-message success';
          contactForm.reset();
        } else {
          throw new Error(result.error || 'Something went wrong');
        }
      } catch (error) {
        formMessage.textContent = 'Failed to send message. Please email us directly at contact@technocaddapl.com';
        formMessage.className = 'form-message error';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
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
  
  // ===================================
  // DOWNLOAD MULTIPLE BROCHURES (GOOGLE DRIVE)
  // ===================================
  const downloadButtons = document.querySelectorAll('.download-brochures');
  downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      downloadAllBrochures();
    });
  });
  
  // Console branding
  console.log('%c PSP TechnoCADD ', 'background: #E63946; color: white; font-size: 20px; padding: 10px;');
  console.log('%c Engineering Excellence, Delivered ', 'background: #1D3557; color: white; font-size: 14px; padding: 5px;');
});


// ===================================
// DOWNLOAD ALL BROCHURES FUNCTION
// ===================================
function downloadAllBrochures() {
  // Google Drive direct download links
  const brochures = [
    {
      url: 'https://drive.google.com/uc?export=download&id=11T_5IOTzFRYlujtBrgdKcdRMB34exzEY',
      filename: 'PSP-TechnoCADD-Company-Profile.pdf'
    },
    {
      url: 'https://drive.google.com/uc?export=download&id=145n7WKwmRRKNXp5foOs00abnjSjssUKw',
      filename: 'PSP-TechnoCADD-3D-Printing-Services.pdf'
    },
    {
      url: 'https://drive.google.com/uc?export=download&id=1CRFcbYU4yBQCMrxoykqgom5t3DLViaJW',
      filename: 'PSP-TechnoCADD-EV-Training-Equipment.pdf'
    }
  ];

  // Download each brochure with delay to prevent browser blocking
  brochures.forEach((brochure, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = brochure.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, index * 800); // 800ms delay between each download
  });

  // Show success notification
  showDownloadNotification();
}


// Show download notification
function showDownloadNotification() {
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="position: fixed; top: 100px; right: 20px; z-index: 10000; background: white; padding: 20px 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(29, 53, 87, 0.2); border-left: 4px solid #E63946; animation: slideIn 0.3s ease-out;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #E63946 0%, #ff6b6b 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">✓</div>
        <div>
          <div style="font-weight: 700; color: #1D3557; font-size: 16px; margin-bottom: 4px;">Download Started!</div>
          <div style="color: #6B7280; font-size: 14px;">3 brochures are downloading...</div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}


// Add slideIn animation CSS
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(animationStyle);
