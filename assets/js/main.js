document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Animation
  const header = document.querySelector('.header');
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
  }

  // 2. Mobile Burger Menu
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('burger--open');
      nav.classList.toggle('nav--open');
    });

    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('burger--open');
        nav.classList.remove('nav--open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav--open') && !nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('burger--open');
        nav.classList.remove('nav--open');
      }
    });
  }

  // 3. Products Catalog Category Filter
  const tabButtons = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (tabButtons.length > 0 && productCards.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Toggle active button style
        tabButtons.forEach(b => b.classList.remove('tab-btn--active'));
        btn.classList.add('tab-btn--active');
        
        // Filter cards
        productCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          
          if (category === 'all' || cardCat === category) {
            // Show card with fade transition
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            // Hide card
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 4. Form Submit Simulation (Contact Us & Private Label Forms)
  const contactForms = document.querySelectorAll('.contact-form');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (contactForms.length > 0) {
    // Determine language (IT or EN)
    const isItalian = window.location.pathname.includes('/it/');
    
    // Create popup elements dynamically if not present
    let modal = modalOverlay;
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      
      const titleText = isItalian ? "Messaggio Inviato!" : "Message Sent!";
      const descText = isItalian 
        ? "Grazie per averci contattato. Il nostro team B2B ti risponderà entro 24-48 ore."
        : "Thank you for getting in touch! Our B2B team will respond within 24-48 hours.";
      const btnText = isItalian ? "Chiudi" : "Close";
      
      modal.innerHTML = `
        <div class="modal-card">
          <div class="modal-icon">✓</div>
          <h2 class="modal-title">${titleText}</h2>
          <p class="modal-desc">${descText}</p>
          <button class="btn btn--primary modal-close-btn">${btnText}</button>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    const closeBtn = modal.querySelector('.modal-close-btn');

    contactForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation check
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.style.borderBottomColor = 'red';
          } else {
            input.style.borderBottomColor = '';
          }
        });

        if (isValid) {
          // Show popup
          modal.classList.add('modal-overlay--active');
          form.reset();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('modal-overlay--active');
      });
    }
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('modal-overlay--active');
      }
    });
  }

  // 5. Newsletter Signups
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.trim()) {
        const isItalian = window.location.pathname.includes('/it/');
        alert(isItalian ? "Grazie per l'iscrizione alla nostra newsletter!" : "Thank you for subscribing to our newsletter!");
        form.reset();
      }
    });
  });

  // 6. Language Switcher Redirection Helper
  const langLinks = document.querySelectorAll('.lang-dropdown__link');
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = link.getAttribute('data-lang');
      const currentPath = window.location.pathname;
      const currentFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
      
      if (targetLang === 'it') {
        // Redirect to Italian version
        if (currentPath.includes('/it/')) {
          // Already in Italian
          return;
        }
        // Redirect from root folder to it/ folder
        window.location.href = `it/${currentFilename}`;
      } else {
        // Redirect to English version
        if (!currentPath.includes('/it/')) {
          // Already in English
          return;
        }
        // Redirect from it/ folder to root folder
        window.location.href = `../${currentFilename}`;
      }
    });
  });

  // 7. Scroll-Reactive Decorative Tortellino
  const tortellino = document.querySelector('.scroll-tortellino');
  if (tortellino) {
    let ticking = false;
    const updateTortellino = () => {
      const y = window.scrollY;
      // Rotate with scroll and gently bob up/down
      tortellino.style.transform = `rotate(${y * 0.22}deg) translateY(${Math.sin(y / 220) * 10}px)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateTortellino);
        ticking = true;
      }
    });
    updateTortellino();
  }
});
