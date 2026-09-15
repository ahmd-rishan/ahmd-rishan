// ==========================================================================
// AHAMMED RISHAN® PORTFOLIO — MAIN INTERACTION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 0. Theme Toggle Switch & LocalStorage Persistence
  const THEME_KEY = 'ahammed_rishan_theme';

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  } catch (e) {
    applyTheme('light');
  }

  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      // Trigger smooth theme transition animation
      document.documentElement.classList.add('theme-transition');

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);

      try {
        localStorage.setItem(THEME_KEY, newTheme);
      } catch (e) {}

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 500);
    });
  });

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


  // 4. Testimonials Slider Switching (Auto-play 4s, Infinite loop, Hover-pause)
  const testimonials = [
    {
      quote: '"WHAT IMPRESSED US MOST WAS HIS FOCUS ON REAL RESULTS."',
      body: '"What impressed us most was his focus on real results. His strategies helped us reach more people, increase engagement, and generate genuine conversions."',
      name: 'KHAMARUDHEEN',
      role: 'CHRD KERALA',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"WORKING WITH HIM HAS BEEN A GREAT DECISION FOR OUR BUSINESS."',
      body: '"Working with him has been a great decision for our business. He knows the market well and created strategies that actually brought us more enquiries. We have seen improvement in our online presence."',
      name: 'RASEENA',
      role: 'CASABIA DESIGNS',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"WE\'RE EXTREMELY HAPPY WITH OUR NEW WEBSITE!"',
      body: '"We\'re extremely happy with our new website! The design is modern, user friendly, and perfectly reflects the Elatot Foods brand. The entire process was smooth, professional, and delivered beyond our expectations. Highly recommended!"',
      name: 'IRFAN',
      role: 'ELATOT FOODS',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"BEST DIGITAL MARKETER IN MALAPPURAM — 100% RECOMMENDED."',
      body: '"If you are searching for Best Digital Marketer in Malappuram who knows digital marketing and is easy to work, he is the right person. 100% recommended."',
      name: 'JAMSHAD',
      role: 'VIDEO EDITOR',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"OUR REACH AND ENGAGEMENT IMPROVED A LOT WITHIN A SHORT TIME."',
      body: '"We tried handling marketing on our own, but things changed after his help. Our reach and engagement improved a lot within a short time. Highly recommended!"',
      name: 'RIFFANA SHERI',
      role: 'DIGITAL MARKETER',
      avatar: './assets/client_avatar.svg'
    }
  ];

  let currentTestimonialIndex = 0;
  let testimonialAutoPlayTimer = null;
  const testimonialsSection = document.getElementById('testimonials');
  const quoteHeadline = document.querySelector('.quote-headline');
  const quoteBody = document.querySelector('.quote-body');
  const clientName = document.querySelector('.client-name');
  const clientRole = document.querySelector('.client-role');
  const prevTestBtn = document.getElementById('prev-test-btn');
  const nextTestBtn = document.getElementById('next-test-btn');

  let isAnimatingTestimonial = false;

  const updateTestimonial = (index) => {
    if (!quoteHeadline || !quoteBody || isAnimatingTestimonial) return;
    isAnimatingTestimonial = true;

    const testimonialCard = document.querySelector('.testimonial-card');

    quoteHeadline.classList.add('testimonial-animating');
    if (testimonialCard) testimonialCard.classList.add('testimonial-animating');

    setTimeout(() => {
      const test = testimonials[index];
      quoteHeadline.textContent = test.quote;
      quoteBody.textContent = test.body;
      if (clientName) clientName.textContent = test.name;
      if (clientRole) clientRole.textContent = test.role;

      quoteHeadline.classList.remove('testimonial-animating');
      if (testimonialCard) testimonialCard.classList.remove('testimonial-animating');

      setTimeout(() => {
        isAnimatingTestimonial = false;
      }, 280);
    }, 250);
  };

  const nextTestimonial = () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
  };

  const prevTestimonial = () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
  };

  const startTestimonialAutoPlay = () => {
    stopTestimonialAutoPlay();
    testimonialAutoPlayTimer = setInterval(nextTestimonial, 4000);
  };

  const stopTestimonialAutoPlay = () => {
    if (testimonialAutoPlayTimer) {
      clearInterval(testimonialAutoPlayTimer);
      testimonialAutoPlayTimer = null;
    }
  };

  if (quoteHeadline && quoteBody) {
    // Start initial 4s auto-play
    startTestimonialAutoPlay();

    // Pause on hover, resume on mouse leave
    if (testimonialsSection) {
      testimonialsSection.addEventListener('mouseenter', stopTestimonialAutoPlay);
      testimonialsSection.addEventListener('mouseleave', startTestimonialAutoPlay);
    }

    // Manual controls restart auto-play timer
    if (prevTestBtn && nextTestBtn) {
      prevTestBtn.addEventListener('click', () => {
        prevTestimonial();
        startTestimonialAutoPlay();
      });

      nextTestBtn.addEventListener('click', () => {
        nextTestimonial();
        startTestimonialAutoPlay();
      });
    }
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

  // 7. Contact Form Handling Logic (WhatsApp Redirection Integration)
  const contactForm = document.getElementById('contact-page-form');
  const responseBox = document.getElementById('form-response-msg');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && responseBox && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('form-name')?.value.trim();
      const email   = document.getElementById('form-email')?.value.trim();
      const phone   = document.getElementById('form-phone')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !phone || !service || !message) {
        responseBox.className = 'form-response-box error';
        responseBox.textContent = 'Please fill out all required fields.';
        responseBox.style.display = 'block';
        return;
      }

      // Indicate loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Connecting to WhatsApp...';

      // Format WhatsApp Message
      const whatsappNumber = '919400810886';
      const whatsappText =
        `*New Website Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${service}\n\n` +
        `*Message:* ${message}`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappText)}`;

      setTimeout(() => {
        responseBox.className = 'form-response-box success';
        responseBox.innerHTML = '<strong>Redirecting to WhatsApp...</strong><br>Opening WhatsApp to send your inquiry directly to Ahammed Rishan.';
        responseBox.style.display = 'block';

        // Open WhatsApp in a new tab / app window
        window.open(whatsappUrl, '_blank');

        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 500);
    });
  }


  // 8. Work Page Category Filter Tabs (Zero-Glitch Height-Locked Transitions)
  const filterBtns = document.querySelectorAll('.work-filter-btn');
  const editorialCards = document.querySelectorAll('.work-editorial-card');
  const workList = document.getElementById('work-editorial-list');
  let filterTimeoutId = null;

  if (filterBtns.length > 0 && editorialCards.length > 0 && workList) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        const filter = btn.getAttribute('data-filter');

        // Update active class on filter buttons immediately
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Lock container height to prevent layout jump during grid transition
        const currentHeight = workList.offsetHeight;
        workList.style.minHeight = currentHeight + 'px';

        // Step 1: Fade out visible cards
        editorialCards.forEach(card => {
          if (!card.classList.contains('hidden')) {
            card.classList.add('filtering-out');
          }
        });

        if (filterTimeoutId) clearTimeout(filterTimeoutId);

        // Step 2: Swap visibility and smooth fade-in
        filterTimeoutId = setTimeout(() => {
          let visibleIndex = 0;
          editorialCards.forEach(card => {
            const category = card.getAttribute('data-category');
            card.classList.remove('filtering-out');

            if (filter === 'all' || category === filter) {
              card.classList.remove('hidden');
              card.style.opacity = '0';
              card.style.transform = 'translateY(10px) scale(0.98)';
              
              // Force browser style recalculation to guarantee smooth CSS transition
              void card.offsetWidth;
              
              card.style.transition = 'opacity 0.3s ease ' + (visibleIndex * 0.04) + 's, transform 0.3s ease ' + (visibleIndex * 0.04) + 's';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
              visibleIndex++;
            } else {
              card.classList.add('hidden');
              card.style.opacity = '';
              card.style.transform = '';
              card.style.transition = '';
            }
          });

          // Release container height lock once transition finishes
          setTimeout(() => {
            workList.style.minHeight = '';
            editorialCards.forEach(card => {
              card.style.transition = '';
              card.style.opacity = '';
              card.style.transform = '';
            });
          }, 350);
        }, 150);
      });
    });
  }

  // 9. Work Page Project Details Modal Popup
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-image');
  const modalCat = document.getElementById('modal-cat');
  const modalClient = document.getElementById('modal-client');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalOutcomes = document.getElementById('modal-outcomes');
  const modalExploreBtn = document.getElementById('modal-explore-btn');

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (viewProjectBtns.length > 0 && modalOverlay) {
    viewProjectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title') || '';
        const category = btn.getAttribute('data-category') || '';
        const client = btn.getAttribute('data-client') || '';
        const image = btn.getAttribute('data-image') || '';
        const desc = btn.getAttribute('data-desc') || '';
        const outcomesRaw = btn.getAttribute('data-outcomes') || '';
        const liveUrl = btn.getAttribute('data-live-url') || '#';

        if (modalImg) {
          modalImg.src = image;
          modalImg.alt = title;
        }
        if (modalCat) modalCat.textContent = category;
        if (modalClient) modalClient.textContent = client;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;

        if (modalOutcomes) {
          modalOutcomes.innerHTML = '';
          if (outcomesRaw) {
            const list = outcomesRaw.split(',').map(item => item.trim());
            list.forEach(item => {
              if (item) {
                const tag = document.createElement('span');
                tag.className = 'outcome-tag';
                tag.textContent = '✓ ' + item;
                modalOutcomes.appendChild(tag);
              }
            });
          }
        }

        if (modalExploreBtn) {
          modalExploreBtn.href = liveUrl;
        }

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 10. Zero-Glitch Page Navigation Handler
  const initPageTransitions = () => {
    const mainContent = document.querySelector('main');

    // Handle BFCache navigation (browser back/forward button)
    window.addEventListener('pageshow', () => {
      if (mainContent) {
        mainContent.classList.remove('page-exiting');
      }
    });

    // Intercept internal page navigation for smooth exit animation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');

      // Skip external, fragment, mailto/tel, target="_blank", or modifier clicks
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.getAttribute('target') === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check destination URL
      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(link.href, window.location.href);

        if (
          targetUrl.origin === currentUrl.origin &&
          targetUrl.pathname !== currentUrl.pathname
        ) {
          e.preventDefault();

          if (mainContent) {
            mainContent.classList.add('page-exiting');
          }

          setTimeout(() => {
            window.location.href = targetUrl.href;
          }, 180);
        }
      } catch (err) {}
    });
  };

  initPageTransitions();

  console.log('AHAMMED RISHAN® Portfolio scripts initialized successfully.');
});


