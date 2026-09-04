// ==========================================================================
// AHAMMED RISHAN® PORTFOLIO — MAIN INTERACTION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Color State Management
  const navbar = document.getElementById('navbar');
  const darkSections = document.querySelectorAll('.dark-bg');

  const checkNavbarTheme = () => {
    const scrollPos = window.scrollY + 50;
    let isDarkSection = false;

    darkSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        isDarkSection = true;
      }
    });

    if (window.scrollY > 80 || isDarkSection) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkNavbarTheme);
  checkNavbarTheme();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'block';
      mobileMenu.style.display = isOpen ? 'none' : 'block';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
      });
    });
  }

  // 3. Video Modal Logic
  const playVideoBtn = document.getElementById('play-video-btn');
  const videoModal = document.getElementById('video-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  if (playVideoBtn && videoModal) {
    playVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      videoModal.setAttribute('aria-hidden', 'false');
    });

    const closeModal = () => {
      videoModal.classList.remove('active');
      videoModal.setAttribute('aria-hidden', 'true');
    };

    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
  }

  // 4. Testimonials Slider Switching
  const testimonials = [
    {
      quote: '"WHAT IMPRESSED US MOST WAS HIS FOCUS ON REAL RESULTS."',
      body: '"Working with Ahammed Rishan was a great experience. Strategic approach, creativity and dedication helped us achieve real growth. Highly recommended!"',
      name: 'GIASUDHEEN TH',
      role: 'FOUNDER, CHRD KERALA',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"HIS DIGITAL MARKETING & DEV WORK TURNED OUR BRAND AROUND."',
      body: '"Ahammed transformed our online visibility completely. From website architecture to Google ad campaigns, the execution was flawless."',
      name: 'CASABIA TEAM',
      role: 'DIRECTOR, CASABIA DESIGNS',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"EXCEPTIONAL STRATEGY AND MEASURABLE ORGANIC GROWTH."',
      body: '"If you want someone who understands digital systems and brand positioning, Ahammed Rishan is the real deal."',
      name: 'ELATOT BRANDING',
      role: 'FOUNDER, ELATOT FOODS',
      avatar: './assets/client_avatar.svg'
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteHeadline = document.querySelector('.quote-headline');
  const quoteBody = document.querySelector('.quote-body');
  const clientName = document.querySelector('.client-name');
  const clientRole = document.querySelector('.client-role');
  const prevTestBtn = document.getElementById('prev-test-btn');
  const nextTestBtn = document.getElementById('next-test-btn');

  const updateTestimonial = (index) => {
    if (!quoteHeadline || !quoteBody) return;
    const test = testimonials[index];
    quoteHeadline.textContent = test.quote;
    quoteBody.textContent = test.body;
    if (clientName) clientName.textContent = test.name;
    if (clientRole) clientRole.textContent = test.role;
  };

  if (prevTestBtn && nextTestBtn) {
    prevTestBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });

    nextTestBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });
  }

  // 5. Work Section Controls (Filter / Focus Animation)
  const prevWorkBtn = document.getElementById('prev-work-btn');
  const nextWorkBtn = document.getElementById('next-work-btn');
  const workGrid = document.getElementById('work-grid');

  if (prevWorkBtn && nextWorkBtn && workGrid) {
    nextWorkBtn.addEventListener('click', () => {
      workGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });
    prevWorkBtn.addEventListener('click', () => {
      workGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  // 6. FAQ Accordion Logic (Contact Page)
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      // Close other open FAQ items for accordion behavior
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle current FAQ item
      item.classList.toggle('active');
      trigger.setAttribute('aria-expanded', !isExpanded);
      const icon = item.querySelector('.faq-icon');
      if (icon) {
        icon.textContent = isExpanded ? '+' : '−';
      }
    });
  });

  // 7. Contact Form Handling Logic
  const contactForm = document.getElementById('contact-page-form');
  const responseBox = document.getElementById('form-response-msg');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && responseBox && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const subject = document.getElementById('form-subject')?.value.trim();
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !subject || !message) {
        responseBox.className = 'form-response-box error';
        responseBox.textContent = 'Please fill out all required fields.';
        responseBox.style.display = 'block';
        return;
      }

      // Indicate loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'SENDING...';

      setTimeout(() => {
        responseBox.className = 'form-response-box success';
        responseBox.innerHTML = '<strong>MESSAGE SENT.</strong><br>Thanks for reaching out, ' + name + '! I\'ll get back to you within 24 hours.';
        responseBox.style.display = 'block';
        
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 800);
    });
  }

  console.log('AHAMMED RISHAN® Portfolio scripts initialized successfully.');
});
