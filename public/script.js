(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function appendStylesheet(href, marker) {
    if (document.querySelector(`link[${marker}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  }

  function appendScript(src, marker) {
    if (document.querySelector(`script[${marker}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.setAttribute(marker, 'true');
    document.body.appendChild(script);
  }

  function loadExperienceLayers() {
    appendStylesheet('/responsive.css?v=phase-1', 'data-phase-one-responsive');
    appendStylesheet('/phase2.css?v=phase-2-scroll-fix', 'data-phase-two-polish');
    appendStylesheet('/phase3.css?v=phase-3', 'data-phase-three-polish');

    if (!document.getElementById('critical-responsive-guard')) {
      const style = document.createElement('style');
      style.id = 'critical-responsive-guard';
      style.textContent = 'html,body{max-width:100%;overflow-x:hidden;overflow-y:auto;touch-action:pan-y pinch-zoom}.preloader.is-hidden{display:none!important;pointer-events:none!important}*,*::before,*::after{box-sizing:border-box}.section-shell{max-width:100%}@media(max-width:390px){.hero h1{overflow-wrap:anywhere}.stat-grid{grid-template-columns:1fr}.button{width:100%}}';
      document.head.appendChild(style);
    }
  }

  function setText(selector, value, scope = document) {
    const node = $(selector, scope);
    if (node) node.textContent = value;
  }

  function replaceTextExact(oldText, newText) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.nodeValue && node.nodeValue.includes(oldText)) {
        node.nodeValue = node.nodeValue.replaceAll(oldText, newText);
      }
    });
  }

  function applyFlagshipCopy() {
    document.body.classList.add('phase-two-live');
    document.title = 'Daniel Negreanu | Kid Poker Experience';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'A premium interactive Daniel Negreanu experience built around Kid Poker’s legacy, live stats, media, training, trophies, and fan engagement.');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Daniel Negreanu | Kid Poker Experience');

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'A flagship digital destination for Kid Poker: legacy, stats, media, training, trophies, and fans.');
    }

    setText('.brand-copy small', 'Kid Poker Experience');
    setText('[data-preloader] p', 'Entering the Kid Poker Experience');
    setText('.hero .eyebrow', 'The Kid Poker Experience');
    setText('#hero-title', 'The definitive digital home for Daniel Negreanu.');
    setText('.hero-lede', 'Legacy, live poker energy, career milestones, media, training, and fan engagement — built as a premium interactive destination for poker’s most recognizable ambassador.');
    setText('.header-cta', 'Experience Map');
    setText('.hero-actions .button-primary', 'Start the Journey');
    setText('.hero-actions .button-ghost', 'Explore the Platform');
    setText('.dashboard-note', 'Live-data ready architecture routes career stats, media feeds, and tournament updates through secure server-side middleware.');

    setText('.problem-section .section-kicker', 'Experience Vision');
    setText('#audit-title', 'A legacy this big deserves an experience this immersive.');
    const auditIntro = $('.problem-section .split-heading p');
    if (auditIntro) auditIntro.textContent = 'The experience unifies legacy storytelling, media, stats, education, community, and commerce into one cinematic destination worthy of the Kid Poker brand.';

    const auditCards = $$('.audit-card');
    const auditUpdates = [
      ['Live media engine', 'A server-side YouTube and social video layer keeps vlogs, feature-table moments, and interviews current without fragile front-end API calls.'],
      ['Legacy editorial archive', 'Classic essays, modern commentary, and career-defining perspectives become a premium long-form reading experience.'],
      ['Unified fan ecosystem', 'Books, training, merch, live updates, community, and media stay inside one high-retention Daniel Negreanu destination.'],
      ['Real career authority', 'Modern achievements come alive through interactive stats, championship timelines, and milestone storytelling.']
    ];
    auditCards.forEach((card, index) => {
      const update = auditUpdates[index];
      if (!update) return;
      setText('h3', update[0], card);
      setText('p', update[1], card);
    });

    replaceTextExact('Elite Interactive Brand Platform Concept', 'The Kid Poker Experience');
    replaceTextExact('Digital Legacy Platform Concept', 'Kid Poker Experience');
    replaceTextExact('Live statistics concept dashboard', 'Live career statistics dashboard');
    replaceTextExact('A complete front-end concept for a modern DanielNegreanu.com: part legacy documentary, part live analytics dashboard, part media portal, and part commercial engine.', 'A premium Daniel Negreanu experience: part legacy documentary, part live analytics dashboard, part media portal, and part fan-engagement engine.');
    replaceTextExact('The production version would hydrate this from trusted poker databases through protected middleware, not exposed front-end API keys.', 'The data layer hydrates from trusted poker databases through protected middleware, not exposed front-end API keys.');
    replaceTextExact('This demo uses CSS-rendered bracelet cards. Production would swap these for optimized Three.js / WebGL models with PBR metal shaders and pointer-controlled lighting.', 'The trophy room turns championship hardware into an interactive legacy vault with rich tournament context, payouts, and career-defining moments.');
    replaceTextExact('A lightweight mockup of the future learning experience: users step through a hand, reveal strategic notes, and stay inside the brand ecosystem.', 'Fans step through the hand, reveal strategic notes, and learn inside the Daniel Negreanu poker ecosystem.');
    replaceTextExact('Production build would load the selected YouTube video through a secure cached endpoint.', 'The media player keeps fans inside the experience while opening selected videos in a cinematic viewing layer.');
    replaceTextExact('The static demo shows the front-end vision. The production build would be decoupled, cached, API-safe, and ready for content, commerce, and LMS integration.', 'The experience runs on a clean front-end foundation ready for content, commerce, media, community, and learning systems.');
    replaceTextExact('Production footer module would include responsible-gaming resources, support links, jurisdiction-specific language, and visible help pathways.', 'Support resources, responsible-gaming links, and help pathways stay visible for players who need them.');
    replaceTextExact('Daniel Negreanu Platform Concept', 'Daniel Negreanu Kid Poker Experience');
    replaceTextExact('Static front-end demo for proposal, pitch, and early-stage stakeholder review.', 'A premium interactive fan and legacy experience built for the next era of Kid Poker online.');
    replaceTextExact('Build Roadmap', 'Experience Map');
    replaceTextExact('See Phased Build', 'Explore the Ecosystem');
  }

  function initPreloader() {
    const preloader = $('[data-preloader]');
    const loadBar = $('[data-load-bar]');
    if (!preloader) return;

    let progress = 0;
    const timer = window.setInterval(() => {
      progress += prefersReducedMotion ? 60 : Math.random() * 28;
      if (loadBar) loadBar.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => preloader.classList.add('is-hidden'), 260);
      }
    }, prefersReducedMotion ? 20 : 110);

    window.setTimeout(() => {
      window.clearInterval(timer);
      if (loadBar) loadBar.style.width = '100%';
      preloader.classList.add('is-hidden');
    }, 1900);
  }

  function initHeader() {
    const header = $('[data-header]');
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-nav]');

    const setScrolled = () => header?.classList.toggle('scrolled', window.scrollY > 20);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });

    toggle?.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav?.classList.toggle('open', !expanded);
    });

    nav?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initCursorLight() {
    const light = $('.cursor-light');
    if (!light || prefersReducedMotion || window.matchMedia('(hover: none)').matches) return;
    window.addEventListener('pointermove', (event) => {
      light.style.setProperty('--x', `${event.clientX}px`);
      light.style.setProperty('--y', `${event.clientY}px`);
    }, { passive: true });
  }

  function initCounters() {
    const stats = $$('[data-count]');
    if (!stats.length) return;

    const formatNumber = (value, prefix = '') => `${prefix}${Math.round(Number(value) || 0).toLocaleString('en-US')}`;
    const animate = (node) => {
      const target = Number(node.dataset.count || 0);
      const prefix = node.dataset.prefix || '';
      if (prefersReducedMotion) {
        node.textContent = formatNumber(target, prefix);
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        node.textContent = formatNumber(target * eased, prefix);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    stats.forEach((node) => observer.observe(node));
  }

  function initReveals() {
    const nodes = $$('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    nodes.forEach((node) => observer.observe(node));
  }

  function initTabs() {
    $$('[data-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        $$('[data-tab]').forEach((item) => {
          const active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        $$('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.id === target));
      });
    });
  }

  function initStreetLab() {
    const notes = {
      preflop: ['Preflop: pressure the capped range.', 'Opening range, positional leverage, and table image combine to create the first decision node.'],
      flop: ['Flop: define equity and blockers.', 'The board texture creates pressure opportunities, but sizing must preserve range advantage and future street leverage.'],
      turn: ['Turn: compound the story.', 'A polarizing turn card lets the aggressor represent premium value while forcing dominated holdings into uncomfortable calls.'],
      river: ['River: convert credibility into action.', 'The final bet is less about the card and more about whether every previous action built a believable narrative.']
    };
    const note = $('[data-street-note]');
    const cards = $$('[data-community-cards] span');
    $$('[data-street]').forEach((button, index) => {
      button.addEventListener('click', () => {
        $$('[data-street]').forEach((item) => item.classList.toggle('active', item === button));
        const [title, body] = notes[button.dataset.street] || notes.preflop;
        if (note) note.innerHTML = `<h3>${title}</h3><p>${body}</p>`;
        cards.forEach((card, cardIndex) => {
          card.style.opacity = cardIndex <= index + 1 ? '1' : '.28';
          card.style.transform = cardIndex <= index + 1 ? 'translateY(0)' : 'translateY(8px)';
        });
      });
    });
  }

  function initTrophyModal() {
    const modal = $('[data-modal]');
    const title = $('[data-modal-title]');
    const body = $('[data-modal-body]');
    const payout = $('[data-modal-payout]');
    const close = $('[data-modal-close]');
    if (!modal) return;

    $$('[data-trophy]').forEach((card) => {
      card.addEventListener('click', () => {
        const [headline, copy, prize] = (card.dataset.trophy || '').split('|');
        if (title) title.textContent = headline || 'Championship detail';
        if (body) body.textContent = copy || '';
        if (payout) payout.textContent = prize || '';
        document.body.classList.add('modal-open');
        if (typeof modal.showModal === 'function' && !modal.open) modal.showModal();
        else modal.setAttribute('open', '');
      });
    });

    const closeModal = () => {
      document.body.classList.remove('modal-open');
      if (typeof modal.close === 'function' && modal.open) modal.close();
      else modal.removeAttribute('open');
    };
    close?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeModal();
    });
  }

  function initVideoLightbox() {
    const lightbox = $('[data-video-lightbox]');
    const title = $('[data-lightbox-title]');
    const close = $('[data-lightbox-close]');
    if (!lightbox) return;
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };
    $$('[data-video-title]').forEach((card) => {
      card.addEventListener('click', () => {
        if (title) title.textContent = card.dataset.videoTitle || 'Video preview';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      });
    });
    close?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
  }

  function initAmbientCanvas() {
    const canvas = $('#ambient-canvas');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: window.innerWidth < 520 ? 34 : 60 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .35, s: Math.random() * .24 + .08, a: Math.random() * .42 + .1
    }));
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.y -= p.s / window.innerHeight;
        if (p.y < -0.04) p.y = 1.04;
        ctx.beginPath();
        ctx.arc(p.x * window.innerWidth, p.y * window.innerHeight, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 199, 107, ${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
  }

  function init() {
    loadExperienceLayers();
    applyFlagshipCopy();
    initPreloader();
    initHeader();
    initCursorLight();
    initCounters();
    initReveals();
    initTabs();
    initStreetLab();
    initTrophyModal();
    initVideoLightbox();
    initAmbientCanvas();
    appendScript('/phase3.js?v=phase-3', 'data-phase-three-script');
  }

  loadExperienceLayers();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
