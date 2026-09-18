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
      } catch (e) { }

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
    const closeMobileMenu = () => {
      mobileMenu.style.display = 'none';
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = getComputedStyle(mobileMenu).display === 'block';
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileMenu.style.display = 'block';
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }


  // 4. Testimonials Slider Switching (Auto-play 4s, Infinite loop, Smooth transition, Hover-pause)
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
      quote: '"BEST DIGITAL MARKETER IN MALAPPURAM - 100% RECOMMENDED."',
      body: '"If you are searching for Best Digital Marketer in Malappuram who knows digital marketing and is easy to work, he is the right person. 100% recommended."',
      name: 'JAMSHAD',
      role: 'VIDEO EDITOR',
      avatar: './assets/client_avatar.svg'
    },
    {
      quote: '"OUR REACH AND ENGAGEMENT IMPROVED A LOT WITHIN A SHORT TIME."',
      body: '"We tried handling marketing on our own, but things changed after his help. Our reach and engagement improved a lot within a short time. Highly recommended!"',
      name: 'RINFANA SHERI',
      role: 'DIGITAL MARKETER',
      avatar: './assets/client_avatar.svg'
    }
  ];

  let currentTestimonialIndex = 0;
  let testimonialAutoPlayTimer = null;
  let isAnimatingTestimonial = false;
  const testimonialsSection = document.getElementById('testimonials');
  const quoteHeadline = document.querySelector('.quote-headline');
  const quoteBody = document.querySelector('.quote-body');
  const clientName = document.querySelector('.client-name');
  const clientRole = document.querySelector('.client-role');
  const prevTestBtn = document.getElementById('prev-test-btn');
  const nextTestBtn = document.getElementById('next-test-btn');

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

  // 7. Contact Form Handling Logic (Redirection to Thank You Page & WhatsApp Integration)
  const contactForm = document.getElementById('contact-page-form');
  const responseBox = document.getElementById('form-response-msg');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !phone || !service || !message) {
        if (responseBox) {
          responseBox.className = 'form-response-box error';
          responseBox.textContent = 'Please fill out all required fields.';
          responseBox.style.display = 'block';
        }
        return;
      }

      // Indicate loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting...';

      // Store name in sessionStorage for personalization on Thank You page
      try {
        sessionStorage.setItem('thankyou_name', name);
      } catch (err) {
        console.error('sessionStorage error:', err);
      }

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

      // Open WhatsApp in new tab and redirect current tab to thank-you.html
      window.open(whatsappUrl, '_blank');
      window.location.href = 'thank-you.html';
    });
  }

  // Personalize Thank You Page message if name exists in sessionStorage
  const thankYouMsg = document.getElementById('thank-you-msg');
  if (thankYouMsg) {
    try {
      const savedName = sessionStorage.getItem('thankyou_name');
      if (savedName) {
        thankYouMsg.textContent = `Thank you, ${savedName}! Your message has been received successfully. I appreciate your interest and will get back to you within 24 hours.`;
        sessionStorage.removeItem('thankyou_name');
      }
    } catch (err) {
      console.error('sessionStorage error:', err);
    }
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
          modalImg.onerror = null;
          modalImg.onerror = () => {
            if (image.startsWith('./')) {
              modalImg.src = image.replace('./', '/');
            } else if (!image.startsWith('/')) {
              modalImg.src = '/' + image;
            }
          };
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
      } catch (err) { }
    });
  };

  initPageTransitions();

  // 11. Interactive Connected Particle Network (Dark Mode Constellation Effect)
  const initConnectedParticleNetwork = () => {
    let canvas = document.getElementById('particle-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouse = { x: -1000, y: -1000, active: false };
    let mouseTimeout = null;

    const particles = [];
    const MAX_DISTANCE = 135;
    const MAX_DISTANCE_SQ = MAX_DISTANCE * MAX_DISTANCE;
    const MOUSE_RADIUS = 150;
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(90, Math.max(40, Math.floor((width * height) / 15000)));
      for (let i = 0; i < count; i++) {
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.abs(vx) < 0.08 ? (vx < 0 ? -0.15 : 0.15) : vx,
          vy: Math.abs(vy) < 0.08 ? (vy < 0 ? -0.15 : 0.15) : vy,
          radius: 1.2 + Math.random() * 1.3,
          baseAlpha: 0.25 + Math.random() * 0.35,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.015
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      createParticles();
    };

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      if (mouseTimeout) clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.active = false;
      }, 3000);
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0]);
      }
    }, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update positions & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic pulse / twinkle
        p.pulse += p.pulseSpeed;
        const currentAlpha = Math.min(0.65, Math.max(0.18, p.baseAlpha + Math.sin(p.pulse) * 0.12));

        // Smooth mouse interaction (subtle fluid push response)
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < MOUSE_RADIUS_SQ && mDistSq > 0) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / MOUSE_RADIUS) * 0.5;
            const angle = Math.atan2(mdy, mdx);
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
          }
        }

        // Natural movement
        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap at bounds
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw clean particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha.toFixed(3)})`;
        ctx.fill();

        // Subtle mouse connection line if near mouse cursor
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < MOUSE_RADIUS_SQ) {
            const mDist = Math.sqrt(mDistSq);
            const lineAlpha = (1 - mDist / MOUSE_RADIUS) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 2. Draw constellation connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_DISTANCE_SQ) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / MAX_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(240, 248, 255, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    const isDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark';
    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateState = () => {
      const active = isDarkMode() && !prefersReducedMotion() && !document.hidden;
      if (active) {
        if (!animId) {
          animId = requestAnimationFrame(render);
        }
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
        ctx.clearRect(0, 0, width, height);
      }
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') {
          updateState();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    document.addEventListener('visibilitychange', updateState);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', updateState);
    }

    updateState();
  };

  initConnectedParticleNetwork();

  // 12. Magnetic Hover Effect for Buttons & Interactive Elements (Subtle & Premium)
  const initMagneticButtons = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magneticElements = document.querySelectorAll(
      '.btn, .circle-btn, .theme-toggle, .view-project-btn, .social-icon-link, .work-filter-btn, [data-magnetic]'
    );

    const STRENGTH = 0.12;
    const MAX_MOVE = 3.5; // 3.5px max displacement for subtle premium feel

    magneticElements.forEach(elem => {
      let animationFrameId = null;
      const innerElem = elem.querySelector('.arrow, span, svg, img');

      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rawX = (e.clientX - centerX) * STRENGTH;
        const rawY = (e.clientY - centerY) * STRENGTH;

        const deltaX = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, rawX));
        const deltaY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, rawY));

        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
          elem.style.transition = 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)';
          elem.style.transform = `translate(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px) scale(1.02)`;

          if (innerElem) {
            const innerX = deltaX * 0.25;
            const innerY = deltaY * 0.25;
            innerElem.style.transition = 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)';
            innerElem.style.transform = `translate(${innerX.toFixed(2)}px, ${innerY.toFixed(2)}px)`;
          }
        });
      });

      elem.addEventListener('mouseleave', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        elem.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25)';
        elem.style.transform = 'translate(0px, 0px) scale(1)';

        if (innerElem) {
          innerElem.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25)';
          innerElem.style.transform = 'translate(0px, 0px)';
        }

        setTimeout(() => {
          elem.style.transition = '';
          if (innerElem) innerElem.style.transition = '';
        }, 400);
      });
    });
  };

  initMagneticButtons();

  console.log('AHAMMED RISHAN® Portfolio scripts initialized successfully.');
});




