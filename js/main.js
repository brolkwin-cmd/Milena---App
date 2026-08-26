/**
 * BPM CONSULTING — BESPOKE JAVASCRIPT ENGINE (MOBILE-FIRST SCROLL & CONVERSION)
 * Features:
 *  - Need Selector (Interactive 7-Challenge Business Recommendation Engine)
 *  - Scroll Reading Progress Bar & IntersectionObserver Scroll Reveal
 *  - Interactive Node Mesh Canvas (Cyan particles & connections)
 *  - Live Interactive Chat Simulator (Be AgentIA)
 *  - Dual Operational Site Switcher (BPO Toberín vs Zona Franca)
 *  - vCard Generator with Full Portfolio Note & Dual Sites
 *  - Clipboard Copy Engine with event.stopPropagation() protection
 *  - Native Web Share API + Fallback
 *  - Language Switcher (ES / EN)
 */

(function () {
  'use strict';

  // Executive Management Data
  const EXECUTIVE = {
    name: "Milena Rico Posada",
    roleEs: "Gerente Mercadeo y Ventas",
    roleEn: "Marketing & Sales Manager",
    company: "BPM Consulting SAS",
    phone: "+57 321 5734798",
    phoneRaw: "573215734798",
    email: "milena.rico@bpmconsulting.com.co",
    linkedin: "https://www.linkedin.com/in/milena-rico-posada-2990798b/",
    website1: "https://www.bpmconsulting.com.co",
    website2: "https://beagentia.com"
  };

  // State
  let currentLang = localStorage.getItem('bpm_lang') || 'es';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initScrollReveal();
    initNetworkCanvas();
    initNeedSelector();
    initLanguage();
    initChatSimulator();
    initPhotoCarousel();
    initSiteSwitcher();
    initCopyActions();
    initShareAction();
    initVCardAction();
    initLeadModal();
  });

  /* ==========================================================================
     TOP SCROLL READING PROGRESS BAR
     ========================================================================== */
  function initScrollProgressBar() {
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress-bar';
      document.body.appendChild(progressBar);
    }

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ==========================================================================
     SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  /* ==========================================================================
     NEED SELECTOR ENGINE (CORAZÓN DE LA PIEZA — 7 RETOS DE NEGOCIO)
     ========================================================================== */
  function initNeedSelector() {
    const selectorPanel = document.getElementById('need-selector');
    if (!selectorPanel) return;

    const pills = selectorPanel.querySelectorAll('.challenge-pill');
    const banner = document.getElementById('recommendation-banner');
    const cards = document.querySelectorAll('.product-hub-card');

    const productNames = {
      bpo: { es: "BPO Nearshore & CX", en: "Nearshore BPO & CX" },
      agentia: { es: "Be AgentIA (Inteligencia Artificial)", en: "Be AgentIA (Cognitive AI)" },
      feel: { es: "Plataforma FEEL (Facturación DIAN)", en: "FEEL Platform (DIAN Invoicing)" },
      elp: { es: "En Línea Pagos ELP (Pasarela Fintech)", en: "ELP Payments (Fintech Gateway)" }
    };

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const isAlreadyActive = pill.classList.contains('active');

        // Reset all pills
        pills.forEach(p => p.classList.remove('active'));

        if (isAlreadyActive) {
          // Reset view (show all cards)
          if (banner) {
            banner.classList.remove('show');
            banner.innerHTML = '';
          }
          cards.forEach(card => {
            card.classList.remove('dimmed', 'highlighted');
          });
          return;
        }

        // Activate clicked pill
        pill.classList.add('active');
        const targetIds = (pill.getAttribute('data-target') || '').split(',').map(s => s.trim());

        // Update recommendation message
        if (banner) {
          const namesList = targetIds
            .map(id => productNames[id] ? productNames[id][currentLang] || productNames[id]['es'] : id)
            .join(' y ');

          const label = currentLang === 'en' ? 'Recommended Solutions:' : 'Le recomendamos:';
          banner.innerHTML = `💡 <strong>${label}</strong> ${namesList}`;
          banner.classList.add('show');
        }

        // Filter and highlight cards
        let firstMatch = null;
        cards.forEach(card => {
          const cardId = card.getAttribute('data-card-id');
          if (targetIds.includes(cardId)) {
            card.classList.remove('dimmed');
            card.classList.add('highlighted');
            if (!firstMatch) firstMatch = card;
          } else {
            card.classList.remove('highlighted');
            card.classList.add('dimmed');
          }
        });

        // Smooth scroll to first matching card
        if (firstMatch) {
          setTimeout(() => {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      });
    });
  }

  /* ==========================================================================
     INTERACTIVE NODE MESH CANVAS
     ========================================================================== */
  function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles;
    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }

    function createParticles() {
      particles = [];
      // Lightweight calculation for ultra-smooth 60fps on mobile devices
      const isMobile = width < 768;
      const count = isMobile ? 24 : Math.min(Math.floor((width * height) / 16000), 55);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.8 + 1.0
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 191, 252, 0.45)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 191, 252, ${0.28 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
  }

  /* ==========================================================================
     LANGUAGE SWITCHER (ES / EN)
     ========================================================================== */
  function initLanguage() {
    const langButtons = document.querySelectorAll('[data-set-lang]');
    updateLanguage(currentLang);

    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-set-lang');
        if (lang) {
          currentLang = lang;
          localStorage.setItem('bpm_lang', lang);
          updateLanguage(lang);
        }
      });
    });
  }

  function updateLanguage(lang) {
    const translatables = document.querySelectorAll('[data-es], [data-en]');
    translatables.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.classList.toggle('active-lang', btn.getAttribute('data-set-lang') === lang);
    });

    document.documentElement.lang = lang;

    // Refresh photo carousel caption if present
    if (typeof window.__refreshCarouselLang === 'function') {
      window.__refreshCarouselLang();
    }
  }

  /* ==========================================================================
     INFRASTRUCTURE PHOTO CAROUSEL (BPO NEARSHORE & SEDES)
     ========================================================================== */
  function initPhotoCarousel() {
    const carouselBox = document.getElementById('bpo-photo-carousel');
    if (!carouselBox) return;

    const track = document.getElementById('carousel-track');
    const slides = carouselBox.querySelectorAll('.carousel-slide');
    const btnPrev = document.getElementById('carousel-btn-prev');
    const btnNext = document.getElementById('carousel-btn-next');
    const dots = carouselBox.querySelectorAll('.carousel-dot');
    const counterBadge = document.getElementById('carousel-counter');
    const locBadge = document.getElementById('carousel-badge-loc');
    const titleEl = document.getElementById('carousel-info-title');
    const capEl = document.getElementById('carousel-info-cap');
    const descEl = document.getElementById('carousel-info-desc');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;

    function updateCarousel(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;

      // Move track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update slide metadata
      const activeSlide = slides[currentIndex];
      const lang = currentLang;

      const locText = activeSlide.getAttribute(`data-loc-${lang}`) || activeSlide.getAttribute('data-loc-es') || '';
      const capText = activeSlide.getAttribute(`data-cap-${lang}`) || activeSlide.getAttribute('data-cap-es') || '';
      const titleText = activeSlide.getAttribute(`data-title-${lang}`) || activeSlide.getAttribute('data-title-es') || '';
      const descText = activeSlide.getAttribute(`data-desc-${lang}`) || activeSlide.getAttribute('data-desc-es') || '';

      if (counterBadge) counterBadge.innerText = `${currentIndex + 1} / ${totalSlides}`;
      if (locBadge) locBadge.innerText = locText;
      if (capEl) capEl.innerText = capText;
      if (titleEl) titleEl.innerText = titleText;
      if (descEl) descEl.innerText = descText;

      // Update dots
      dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === currentIndex);
      });
    }

    // Expose language refresh callback
    window.__refreshCarouselLang = () => updateCarousel(currentIndex);

    // Navigation buttons
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoPlay();
        updateCarousel(currentIndex - 1);
        startAutoPlay();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoPlay();
        updateCarousel(currentIndex + 1);
        startAutoPlay();
      });
    }

    // Dots click
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(dot.getAttribute('data-index'), 10) || 0;
        stopAutoPlay();
        updateCarousel(targetIndex);
        startAutoPlay();
      });
    });

    // Touch Swipe Gesture Support
    let startX = 0;
    let endX = 0;
    const viewport = carouselBox.querySelector('.carousel-viewport');

    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        const diffX = startX - endX;
        if (Math.abs(diffX) > 40 && endX !== 0) {
          if (diffX > 0) {
            updateCarousel(currentIndex + 1); // Swipe Left -> Next
          } else {
            updateCarousel(currentIndex - 1); // Swipe Right -> Prev
          }
        }
        startX = 0;
        endX = 0;
        startAutoPlay();
      });

      // Pause autoplay on mouse hover (Desktop preview)
      viewport.addEventListener('mouseenter', stopAutoPlay);
      viewport.addEventListener('mouseleave', startAutoPlay);
    }

    // Autoplay Engine
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    // Initialize first slide and start autoplay
    updateCarousel(0);
    startAutoPlay();
  }

  /* ==========================================================================
     CHAT SIMULATOR (BE AGENTIA)
     ========================================================================== */
  function initChatSimulator() {
    const simBox = document.getElementById('chat-sim-box');
    if (!simBox) return;

    const chatBody = simBox.querySelector('.chat-sim-body');
    const promptButtons = simBox.querySelectorAll('.chat-prompt-pill');

    promptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const userText = btn.getAttribute(`data-prompt-user-${currentLang}`) || btn.getAttribute('data-prompt-user-es') || btn.innerText;
        const botReply = btn.getAttribute(`data-prompt-reply-${currentLang}`) || btn.getAttribute('data-prompt-reply-es') || '¡Consulta recibida!';

        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble chat-bubble-user';
        userBubble.innerHTML = userText;
        chatBody.appendChild(userBubble);

        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-bubble chat-bubble-bot';
        typingBubble.style.opacity = '0.7';
        typingBubble.innerHTML = '<em>Be AgentIA está respondiendo...</em>';
        chatBody.appendChild(typingBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
          typingBubble.style.opacity = '1';
          typingBubble.innerHTML = botReply;
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 550);
      });
    });
  }

  /* ==========================================================================
     SITE SWITCHER (BPO NEARSHORE)
     ========================================================================== */
  function initSiteSwitcher() {
    const siteSwitcher = document.getElementById('bpo-site-switcher');
    if (!siteSwitcher) return;

    const buttons = siteSwitcher.querySelectorAll('.site-toggle-btn');
    const displayImg = siteSwitcher.querySelector('.site-display-img');
    const displayTitle = siteSwitcher.querySelector('.site-display-title');
    const displaySeats = siteSwitcher.querySelector('.site-display-seats');
    const displayDesc = siteSwitcher.querySelector('.site-display-desc');

    const sitesData = {
      toberin: {
        img: '../assets/img/Toberin2.png',
        titleEs: "Sede Toberín (Norte de Bogotá)",
        titleEn: "Toberín Site (North Bogotá)",
        seatsEs: "464 Posiciones Operativas",
        seatsEn: "464 Operational Seats",
        descEs: "Ubicación estratégica con acceso privilegiado al mejor talento profesional, técnico y bilingüe de Bogotá.",
        descEn: "Strategic location with direct access to top-tier bilingual talent and CX specialists in Bogotá."
      },
      zf: {
        img: '../assets/img/ZF 1.png',
        titleEs: "Sede Zona Franca (Bogotá)",
        titleEn: "Free Trade Zone Site (Bogotá)",
        seatsEs: "600 Posiciones Operativas",
        seatsEn: "600 Operational Seats",
        descEs: "Infraestructura de alta seguridad con beneficios tributarios y aduaneros para optimización de costos internacionales.",
        descEn: "High-security facility offering special tax incentives and customs advantages for global BPO operations."
      }
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const siteKey = btn.getAttribute('data-site');
        const data = sitesData[siteKey];
        if (data) {
          if (displayImg) displayImg.src = data.img;
          if (displayTitle) displayTitle.innerText = currentLang === 'en' ? data.titleEn : data.titleEs;
          if (displaySeats) displaySeats.innerText = currentLang === 'en' ? data.seatsEn : data.seatsEs;
          if (displayDesc) displayDesc.innerText = currentLang === 'en' ? data.descEn : data.descEs;
        }
      });
    });
  }

  /* ==========================================================================
     CLIPBOARD COPY ENGINE (WITH STOP PROPAGATION TO PREVENT TEL/MAILTO)
     ========================================================================== */
  function initCopyActions() {
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('[data-copy]');
      if (!copyBtn) return;

      e.preventDefault();
      e.stopPropagation();

      const textToCopy = copyBtn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(currentLang === 'en' ? 'Copied to clipboard!' : '¡Copiado al portapapeles!');
        }).catch(() => {
          showToast(textToCopy);
        });
      }
    });
  }

  /* ==========================================================================
     SHARE PORTFOLIO ACTION
     ========================================================================== */
  function initShareAction() {
    const shareBtns = document.querySelectorAll('[data-share]');
    shareBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const shareData = {
          title: 'BPM Consulting — Portafolio de Soluciones',
          text: 'Conoce las soluciones empresariales de BPM Consulting: BPO Nearshore, Be AgentIA, Plataforma FEEL y En Línea Pagos.',
          url: window.location.href
        };

        if (navigator.share) {
          navigator.share(shareData).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast(currentLang === 'en' ? 'Link copied!' : '¡Enlace copiado!');
          });
        }
      });
    });
  }

  /* ==========================================================================
     VCARD GENERATOR ACTION
     ========================================================================== */
  function initVCardAction() {
    const vcardBtns = document.querySelectorAll('[data-vcard]');
    vcardBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const role = currentLang === 'en' ? EXECUTIVE.roleEn : EXECUTIVE.roleEs;
        const vcardContent = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          'N:Rico Posada;Milena;;;',
          `FN:${EXECUTIVE.name}`,
          `ORG:${EXECUTIVE.company}`,
          `TITLE:${role}`,
          `TEL;TYPE=CELL,VOICE:${EXECUTIVE.phone}`,
          `EMAIL;TYPE=WORK,INTERNET:${EXECUTIVE.email}`,
          `URL;TYPE=WORK:${EXECUTIVE.website1}`,
          `URL;TYPE=OTHER:${EXECUTIVE.website2}`,
          `URL;TYPE=LINKEDIN:${EXECUTIVE.linkedin}`,
          `NOTE:BPM Consulting: BPO Nearshore (1.064 pos), Be AgentIA (IA Conversacional), Plataforma FEEL (Facturacion DIAN) y En Linea Pagos ELP (Pasarela Fintech).`,
          'END:VCARD'
        ].join('\r\n');

        const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Milena_Rico_BPM_Consulting.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        showToast(currentLang === 'en' ? 'Contact saved (vCard)' : 'Contacto descargado (vCard)');
      });
    });
  }

  /* ==========================================================================
     LEAD CAPTURE MODAL: "QUIERO CONOCER MÁS"
     ========================================================================== */
  function initLeadModal() {
    const overlay = document.getElementById('lead-modal-overlay');
    if (!overlay) return;

    const openBtns = document.querySelectorAll('[data-open-lead-modal]');
    const closeBtn = document.getElementById('lead-modal-close');
    const form = document.getElementById('lead-inquiry-form');

    function openModal() {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = overlay.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }

    function closeModal() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });
    }

    // Close when clicking background overlay
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Handle Form Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (document.getElementById('lead-name')?.value || '').trim();
        const company = (document.getElementById('lead-company')?.value || '').trim();
        const phone = (document.getElementById('lead-phone')?.value || '').trim();
        const email = (document.getElementById('lead-email')?.value || '').trim();
        const interest = document.getElementById('lead-interest')?.value || 'Portafolio Integral';
        const message = (document.getElementById('lead-message')?.value || '').trim();

        if (!name || !phone) {
          showToast(currentLang === 'en' ? 'Please enter name and phone.' : 'Por favor ingresa nombre y teléfono.');
          return;
        }

        // Build WhatsApp text message
        const waLines = [
          `*SOLICITUD COMERCIAL — BPM CONSULTING*`,
          `👤 *Nombre:* ${name}`,
          company ? `🏢 *Empresa / Cargo:* ${company}` : '',
          `📱 *WhatsApp:* ${phone}`,
          email ? `✉️ *Correo:* ${email}` : '',
          `🎯 *Interés:* ${interest}`,
          message ? `📝 *Requerimiento:* ${message}` : ''
        ].filter(Boolean).join('\n');

        const encodedMsg = encodeURIComponent(waLines);
        const waUrl = `https://wa.me/573215734798?text=${encodedMsg}`;

        // Open WhatsApp
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        // Notification feedback
        showToast(currentLang === 'en' ? 'Inquiry sent successfully!' : '¡Solicitud enviada con éxito!');

        // Reset and close
        form.reset();
        closeModal();
      });
    }
  }

  /* ==========================================================================
     TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

})();
