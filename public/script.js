(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initPulseFixStyles() {
    if (document.querySelector('link[data-pulse-fix]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './pulse-fix.css?v=3';
    link.setAttribute('data-pulse-fix', 'true');
    document.head.appendChild(link);
  }

  function initPreloader() {
    const preloader = $('[data-preloader]');
    const loadBar = $('[data-load-bar]');
    if (!preloader) return;

    let progress = 0;
    const timer = window.setInterval(() => {
      progress += prefersReducedMotion ? 70 : Math.random() * 26 + 8;
      if (loadBar) loadBar.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => preloader.classList.add('is-hidden'), 220);
      }
    }, prefersReducedMotion ? 18 : 100);

    window.setTimeout(() => {
      window.clearInterval(timer);
      if (loadBar) loadBar.style.width = '100%';
      preloader.classList.add('is-hidden');
    }, 1650);
  }

  function initHeader() {
    const header = $('[data-header]');
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-nav]');
    const setScrolled = () => header?.classList.toggle('scrolled', window.scrollY > 24);
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
      const duration = 1500;
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
    if (prefersReducedMotion) {
      nodes.forEach((node) => node.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    nodes.forEach((node) => observer.observe(node));
  }

  function initReadLab() {
    const notes = {
      preflop: ['Preflop: what story starts here?', 'Position, image, stack depth, and opening frequency all shape the first read before the flop ever lands.'],
      flop: ['Flop: texture tells the truth.', 'The ace-high board rewards the player who understands who has range advantage and who is forced to defend too wide.'],
      turn: ['Turn: pressure compounds.', 'A clean barrel is not just aggression. It is the next sentence in a believable story.'],
      river: ['River: the room goes quiet.', 'The last decision is rarely about one card. It is about whether the entire hand makes sense.']
    };
    const choiceCopy = {
      fold: 'Fold lens: protect the stack when the story is too clean and the opponent has too few natural bluffs.',
      call: 'Call lens: bluff-catch when the line contains missed draws, emotional sizing, or a story that changed too late.',
      raise: 'Raise lens: apply maximum pressure only when blockers, image, and prior streets make the counter-story believable.'
    };
    const title = $('[data-read-title]');
    const body = $('[data-read-body]');
    const result = $('[data-read-result]');
    const cards = $$('[data-community-cards] span');

    $$('[data-street]').forEach((button, index) => {
      button.addEventListener('click', () => {
        $$('[data-street]').forEach((item) => item.classList.toggle('active', item === button));
        const [nextTitle, nextBody] = notes[button.dataset.street] || notes.preflop;
        if (title) title.textContent = nextTitle;
        if (body) body.textContent = nextBody;
        cards.forEach((card, cardIndex) => {
          const visibleIndex = Math.min(index + 2, 4);
          card.style.opacity = cardIndex <= visibleIndex ? '1' : '.28';
          card.style.transform = cardIndex <= visibleIndex ? 'translateY(0)' : 'translateY(8px)';
        });
        if (result) result.textContent = 'Choose a line to reveal the strategic lens.';
      });
    });

    $$('[data-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        const copy = choiceCopy[button.dataset.choice] || choiceCopy.call;
        if (result) result.textContent = copy;
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
        if (title) title.textContent = headline || 'Trophy detail';
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
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) closeModal();
    });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.open) closeModal(); });
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
    const particles = Array.from({ length: window.innerWidth < 520 ? 38 : 72 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .35, s: Math.random() * .23 + .08, a: Math.random() * .42 + .08 }));
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
        ctx.fillStyle = `rgba(244, 199, 107, ${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
  }

  function init() {
    initPulseFixStyles();
    initPreloader();
    initHeader();
    initCursorLight();
    initCounters();
    initReveals();
    initReadLab();
    initTrophyModal();
    initVideoLightbox();
    initAmbientCanvas();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
