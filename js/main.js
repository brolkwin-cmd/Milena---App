/**
 * BPM CONSULTING — BESPOKE JAVASCRIPT ENGINE (MOBILE-FIRST SCROLL & CONVERSION)
 * Features: Scroll Progress Bar, IntersectionObserver Scroll Reveal, Interactive Particle Mesh,
 *           Live Chat Simulator, Site Switcher, Language Switcher, Dynamic WhatsApp, vCard Generator
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
    website: "https://www.bpmconsulting.com.co"
  };

  // State
  let currentLang = localStorage.getItem('bpm_lang') || 'es';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initScrollReveal();
    initNetworkCanvas();
    initLanguage();
    initChatSimulator();
    initSiteSwitcher();
    initCopyActions();
    initShareAction();
    initVCardAction();
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
     SCROLL REVEAL (INTERSECTION OBSERVER FOR MOBILE SCROLL)
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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  /* ==========================================================================
     INTERACTIVE NODE MESH CANVAS (CYAN PARTICLES & CONNECTIONS)
     ========================================================================== */
  function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles;
    let mouse = { x: null, y: null, radius: 150 };

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
      particles = [];
      const particleCount = window.innerWidth < 768 ? 32 : 70;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 2 + 0.8
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#00BFFC';
      ctx.lineWidth = 0.6;

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            p.x -= dx * 0.015;
            p.y -= dy * 0.015;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 191, 252, ${0.28 - (dist / 130) * 0.28})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  /* ==========================================================================
     INTERACTIVE CHAT SIMULATOR (BE AGENTIA)
     ========================================================================== */
  function initChatSimulator() {
    const chatContainer = document.getElementById('chat-sim-box');
    if (!chatContainer) return;

    const chatBody = chatContainer.querySelector('.chat-sim-body');
    const promptButtons = chatContainer.querySelectorAll('[data-prompt-reply-es]');

    promptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const userTextEs = btn.getAttribute('data-prompt-user-es');
        const userTextEn = btn.getAttribute('data-prompt-user-en');
        const botReplyEs = btn.getAttribute('data-prompt-reply-es');
        const botReplyEn = btn.getAttribute('data-prompt-reply-en');

        const userText = currentLang === 'en' ? userTextEn : userTextEs;
        const botReply = currentLang === 'en' ? botReplyEn : botReplyEs;

        // Append User bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble chat-bubble-user';
        userBubble.textContent = userText;
        chatBody.appendChild(userBubble);

        // Typing state
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble chat-bubble-bot';
        botBubble.innerHTML = '<em>' + (currentLang === 'en' ? 'Be AgentIA is processing context...' : 'Be AgentIA analizando contexto...') + '</em>';
        chatBody.appendChild(botBubble);

        setTimeout(() => {
          botBubble.innerHTML = botReply;
        }, 500);
      });
    });
  }

  /* ==========================================================================
     INTERACTIVE SITE SWITCHER (BPO NEARSHORE)
     ========================================================================== */
  function initSiteSwitcher() {
    const switcher = document.getElementById('bpo-site-switcher');
    if (!switcher) return;

    const btns = switcher.querySelectorAll('.site-toggle-btn');
    const siteImg = switcher.querySelector('.site-display-img');
    const siteTitle = switcher.querySelector('.site-display-title');
    const siteDesc = switcher.querySelector('.site-display-desc');
    const siteSeats = switcher.querySelector('.site-display-seats');

    const sitesData = {
      toberin: {
        img: '../assets/img/Toberin2.png',
        seats: '464 Posiciones Operativas',
        seatsEn: '464 Operational Seats',
        titleEs: 'Sede Toberín (Norte de Bogotá)',
        titleEn: 'Toberín Operations Hub (North Bogotá)',
        descEs: 'Ubicación estratégica con acceso privilegiado al mejor talento profesional, técnico y bilingüe de Bogotá. Diseñada para operaciones de alta exigencia CX y ventas.',
        descEn: 'Strategic location with privileged access to Bogota’s top bilingual, technical and CX talent. Purpose-built for high-touch customer support and sales.'
      },
      zf: {
        img: '../assets/img/ZF 1.png',
        seats: '600 Posiciones Operativas',
        seatsEn: '600 Operational Seats',
        titleEs: 'Sede Zona Franca (Bogotá)',
        titleEn: 'Free Trade Zone Hub (Bogotá)',
        descEs: 'Régimen aduanero y tributario especial que traslada máxima eficiencia de costos a nuestros clientes. Cuenta con seguridad perimetral de grado financiero y redundancia eléctrica 100%.',
        descEn: 'Special customs and tax-free regime delivering maximum cost efficiency. Features financial-grade perimeter security and 100% electrical power redundancy.'
      }
    };

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const siteKey = btn.getAttribute('data-site');
        const data = sitesData[siteKey];
        if (!data) return;

        if (siteImg) siteImg.src = data.img;
        if (siteSeats) siteSeats.textContent = currentLang === 'en' ? data.seatsEn : data.seats;
        if (siteTitle) siteTitle.textContent = currentLang === 'en' ? data.titleEn : data.titleEs;
        if (siteDesc) siteDesc.textContent = currentLang === 'en' ? data.descEn : data.descEs;
      });
    });
  }

  /* ==========================================================================
     BILINGUAL LANGUAGE ENGINE (ES / EN)
     ========================================================================== */
  function initLanguage() {
    setLanguage(currentLang);

    const langBtns = document.querySelectorAll('[data-set-lang]');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-set-lang');
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bpm_lang', lang);
    document.documentElement.lang = lang;

    // Update active state on language buttons
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      if (btn.getAttribute('data-set-lang') === lang) {
        btn.classList.add('active-lang');
      } else {
        btn.classList.remove('active-lang');
      }
    });

    // Translate all elements with data-es and data-en
    document.querySelectorAll('[data-es]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Update dynamic WhatsApp message
    updateWhatsAppLinks(lang);
  }

  /* ==========================================================================
     DYNAMIC WHATSAPP GENERATOR (DIRECT TO GERENCIA COMERCIAL)
     ========================================================================== */
  function updateWhatsAppLinks(lang) {
    const pageProduct = document.body.getAttribute('data-product') || 'general';
    let msg = "";

    const messages = {
      general: {
        es: "Hola Milena, me gustaría coordinar una reunión para conocer el portafolio corporativo de BPM Consulting.",
        en: "Hi Milena, I would like to schedule a meeting to learn more about BPM Consulting's enterprise portfolio."
      },
      agentia: {
        es: "Hola Milena, me interesa coordinar una demostración personalizada de la plataforma de IA Be AgentIA.",
        en: "Hi Milena, I am interested in scheduling a personalized live demo of Be AgentIA."
      },
      bpo: {
        es: "Hola Milena, queremos evaluar una propuesta para operaciones de BPO Nearshore y Contact Center desde Colombia.",
        en: "Hi Milena, we want to evaluate a proposal for Nearshore BPO and Contact Center operations from Colombia."
      },
      feel: {
        es: "Hola Milena, me gustaría recibir asesoría y cotización sobre la plataforma FEEL de Facturación Electrónica DIAN.",
        en: "Hi Milena, I'd like to get information and pricing regarding the FEEL Electronic Invoicing platform."
      },
      elp: {
        es: "Hola Milena, me gustaría evaluar la integración de la pasarela de pagos ELP (En Línea Pagos) en nuestra empresa.",
        en: "Hi Milena, I'd like to evaluate integrating the ELP payment gateway for our business operations."
      }
    };

    msg = messages[pageProduct] ? messages[pageProduct][lang] : messages.general[lang];
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${EXECUTIVE.phoneRaw}?text=${encodedMsg}`;

    document.querySelectorAll('.dynamic-wa-link').forEach(link => {
      link.href = waUrl;
    });
  }

  /* ==========================================================================
     COPY ACTIONS & TOAST
     ========================================================================== */
  function initCopyActions() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const value = btn.getAttribute('data-copy');
        if (navigator.clipboard && value) {
          navigator.clipboard.writeText(value).then(() => {
            showToast(currentLang === 'en' ? 'Copied to clipboard!' : '¡Copiado al portapapeles!');
          }).catch(() => {
            fallbackCopy(value);
          });
        }
      });
    });
  }

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(currentLang === 'en' ? 'Copied to clipboard!' : '¡Copiado al portapapeles!');
  }

  function showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  /* ==========================================================================
     SHARE ACTION (Web Share API)
     ========================================================================== */
  function initShareAction() {
    const shareBtns = document.querySelectorAll('[data-share]');
    shareBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (navigator.share) {
          navigator.share({
            title: document.title,
            text: currentLang === 'en' ? 'BPM Consulting - Enterprise Solutions Portfolio' : 'BPM Consulting - Portafolio de Soluciones Empresariales',
            url: window.location.href
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href);
          showToast(currentLang === 'en' ? 'Link copied to clipboard!' : '¡Enlace copiado al portapapeles!');
        }
      });
    });
  }

  /* ==========================================================================
     VCARD (.VCF) GENERATOR & DOWNLOAD
     ========================================================================== */
  function initVCardAction() {
    const vcardBtns = document.querySelectorAll('[data-vcard]');
    vcardBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadVCard();
      });
    });
  }

  function downloadVCard() {
    const role = currentLang === 'en' ? EXECUTIVE.roleEn : EXECUTIVE.roleEs;
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${EXECUTIVE.name}`,
      `N:Rico Posada;Milena;;;`,
      `ORG:${EXECUTIVE.company}`,
      `TITLE:${role}`,
      `TEL;TYPE=CELL,VOICE:${EXECUTIVE.phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${EXECUTIVE.email}`,
      `URL:${EXECUTIVE.website}`,
      `NOTE:Gerencia de Mercadeo y Ventas - BPM Consulting`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Milena-Rico-BPM-Gerencia.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(currentLang === 'en' ? 'Executive Contact saved!' : '¡Contacto ejecutivo listo para guardar!');
  }

})();
