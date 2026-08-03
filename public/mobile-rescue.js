(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const mobileQuery = window.matchMedia('(max-width: 820px)');
  const isMobile = () => mobileQuery.matches;

  const FINAL_MOBILE_HERO = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a669726fddfeb1aa910b5ae.png';
  const HAMBURGER_ICON = '/assets/icons/poker-chip-hamburger-menu-final.svg';
  const MOBILE_VAULT_DOOR = '/assets/trophies/mobile-vault-door.png';
  const DESKTOP_VAULT_DOOR = '/assets/trophies/bracelet-vault-door.png';
  const BRACELET_8 = '/assets/trophies/negreanu-bracelet-8.png';

  function injectStyle() {
    let style = $('#mobile-rescue-runtime-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'mobile-rescue-runtime-styles';
      document.head.appendChild(style);
    }

    style.textContent = `
      @media (max-width: 820px) {
        html, body { width: 100% !important; max-width: 100% !important; overflow-x: hidden !important; }
        main, section, .section-shell, .glass { max-width: 100% !important; overflow-x: hidden !important; }
        h1, h2, h3, .split-heading h2, .stats-hero-copy h2, .vault-heading h2, .gallery-wall h2, .table-talk h2, .learn-card h2, .partner-card-list h2, .feature-tile strong {
          max-width: 100% !important;
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          text-wrap: balance !important;
        }
        h2, .split-heading h2, .stats-hero-copy h2, .vault-heading h2, .gallery-wall h2, .table-talk h2, .learn-card h2, .partner-card-list h2 {
          font-size: clamp(2.25rem, 11vw, 3.75rem) !important;
          line-height: 1.02 !important;
          letter-spacing: -.02em !important;
        }

        .mobile-intro-still, .mobile-final-still, .mobile-hero-still, .intro-final-image, [data-mobile-final-image], [data-mobile-still] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .site-header {
          position: fixed !important;
          top: max(10px, env(safe-area-inset-top)) !important;
          right: 8px !important;
          left: auto !important;
          width: 76px !important;
          height: 76px !important;
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
          pointer-events: none !important;
          z-index: 99999 !important;
        }
        .site-header .brand, .site-header .header-cta { display: none !important; }
        .site-header .nav-toggle {
          position: fixed !important;
          top: max(10px, env(safe-area-inset-top)) !important;
          right: 8px !important;
          left: auto !important;
          width: 72px !important;
          height: 72px !important;
          display: grid !important;
          place-items: center !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 999px !important;
          background: transparent url('${HAMBURGER_ICON}') center / contain no-repeat !important;
          box-shadow: none !important;
          pointer-events: auto !important;
        }
        .site-header .nav-toggle > span:not(.sr-only), .site-header .nav-toggle::before, .site-header .nav-toggle::after { display: none !important; content: none !important; }
        .site-header .nav-toggle__chip { display: block !important; width: 72px !important; height: 72px !important; object-fit: contain !important; }
        .site-header .primary-nav {
          position: fixed !important;
          top: max(86px, calc(env(safe-area-inset-top) + 86px)) !important;
          right: 10px !important;
          left: auto !important;
          width: min(82vw, 310px) !important;
          display: none !important;
          grid-template-columns: 1fr !important;
          gap: 7px !important;
          padding: 12px !important;
          border-radius: 24px !important;
          background: rgba(5,5,9,.97) !important;
          border: 1px solid rgba(244,199,107,.28) !important;
          box-shadow: 0 30px 90px rgba(0,0,0,.72) !important;
          pointer-events: auto !important;
        }
        .site-header .primary-nav.is-open, body.mobile-menu-open .site-header .primary-nav { display: grid !important; }
        .site-header .primary-nav a {
          display: block !important;
          padding: 14px 16px !important;
          border-radius: 16px !important;
          background: rgba(255,255,255,.055) !important;
          color: #fff4c5 !important;
          font-weight: 900 !important;
          text-decoration: none !important;
        }

        .universal-hero { margin: 0 !important; padding: 0 !important; }
        .hero-main-visual {
          min-height: 100svh !important;
          padding: 0 18px 28px !important;
          background-image: linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.48)), url('${FINAL_MOBILE_HERO}') !important;
          background-size: cover !important;
          background-position: center top !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .hero-tagline-container {
          width: 100% !important;
          max-width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 9px !important;
          text-align: center !important;
          padding-top: 42px !important;
        }
        .hero-kicker {
          order: 1 !important;
          margin: 0 !important;
          color: #f4c76b !important;
          font-size: clamp(1.1rem, 4.9vw, 1.55rem) !important;
          line-height: 1.05 !important;
          letter-spacing: .16em !important;
          text-transform: uppercase !important;
        }
        .hero-title {
          order: 2 !important;
          margin: 0 !important;
          display: grid !important;
          gap: 0 !important;
          color: #fff !important;
          font-size: clamp(4.15rem, 20vw, 7rem) !important;
          line-height: .82 !important;
          letter-spacing: .055em !important;
          text-transform: uppercase !important;
          text-align: center !important;
          text-shadow: 0 5px 20px rgba(0,0,0,.72) !important;
        }
        .hero-title span, .hero-title .highlight-text { display: block !important; color: inherit !important; }
        .hero-subtitle {
          order: 3 !important;
          margin: 2px 0 0 !important;
          color: #fff4c5 !important;
          font-size: clamp(1.28rem, 6vw, 2rem) !important;
          line-height: 1 !important;
          letter-spacing: .22em !important;
          text-transform: uppercase !important;
        }
        .hero-signature-img {
          order: 4 !important;
          width: min(86vw, 420px) !important;
          max-height: 26vh !important;
          margin: 0 auto !important;
          object-fit: contain !important;
        }
        .hero-universal-actions {
          order: 5 !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 10px !important;
          margin-top: 6px !important;
        }

        .button, .button *, .btn, .btn *, .header-cta, .partner-links a, .partner-links a *, .youtube-card, .youtube-card *, .learn-card .button, .winner-actions button, .vault-close-toggle,
        #table-talk .news-card, #table-talk .news-card *, .poker-news-card, .poker-news-card *, .news-card.gold-card, .news-card.gold-card * {
          color: #160d03 !important;
          text-shadow: 0 1px 1px rgba(255,255,255,.28), 0 1px 2px rgba(0,0,0,.18) !important;
        }

        .winner-shell { display: grid !important; grid-template-columns: 1fr !important; gap: 12px !important; padding: 14px !important; overflow: hidden !important; }
        .winner-table {
          position: relative !important;
          width: min(100%, 390px) !important;
          height: 700px !important;
          min-height: 700px !important;
          margin: 0 auto !important;
          border-radius: 999px !important;
          overflow: hidden !important;
          background: radial-gradient(ellipse at 50% 50%, #157348 0 34%, #0b5f3b 35% 65%, #053725 66% 100%) !important;
          box-shadow: inset 0 0 0 8px rgba(244,199,107,.16), inset 0 0 75px rgba(0,0,0,.72), 0 25px 70px rgba(0,0,0,.55) !important;
          --card-w: 34px; --card-h: 46px; --rank-size: 13px; --suit-size: 22px;
        }
        .winner-board {
          position: absolute !important;
          top: 49% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 5px !important;
          z-index: 7 !important;
          width: auto !important;
          max-width: 88% !important;
          padding: 7px 8px !important;
          border-radius: 12px !important;
          background: rgba(0,0,0,.22) !important;
        }
        .winner-hero-zone {
          position: absolute !important;
          left: 50% !important;
          top: 84% !important;
          bottom: auto !important;
          transform: translate(-50%, -50%) !important;
          width: 124px !important;
          max-width: 124px !important;
          padding: 9px 7px !important;
          border-radius: 22px !important;
          background: rgba(6,14,20,.88) !important;
          border: 2px solid #f1a300 !important;
          z-index: 8 !important;
        }
        .winner-hero-zone p, .hero-badge { margin: 0 auto 4px !important; display: table !important; padding: 3px 13px !important; border-radius: 999px !important; background: #f1a300 !important; color: #101018 !important; font-weight: 950 !important; letter-spacing: .08em !important; line-height: 1 !important; }
        .winner-hero-zone strong, .hero-odds-display { display: block !important; margin: 4px 0 0 !important; color: #fff !important; font-size: clamp(1.7rem, 8vw, 2.35rem) !important; line-height: 1 !important; text-align: center !important; white-space: nowrap !important; }
        .winner-hole, .card-pair { display: flex !important; justify-content: center !important; align-items: center !important; gap: 4px !important; }
        .winner-opponents { position: absolute !important; inset: 0 !important; z-index: 6 !important; }
        .opponent-seat {
          position: absolute !important;
          width: 94px !important;
          max-width: 94px !important;
          padding: 7px 5px !important;
          border-radius: 17px !important;
          transform: translate(-50%, -50%) !important;
          background: rgba(1,24,17,.80) !important;
          border: 1px solid rgba(244,199,107,.18) !important;
          box-shadow: 0 12px 26px rgba(0,0,0,.38) !important;
        }
        .opponent-seat .opponent-name, .opponent-name { display: block !important; color: #d8d0bc !important; font-size: .58rem !important; line-height: 1 !important; text-align: center !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; font-weight: 900 !important; }
        .opponent-seat .opponent-odds, .opponent-odds { display: block !important; color: #36c9ff !important; font-size: .88rem !important; line-height: 1 !important; text-align: center !important; white-space: nowrap !important; font-weight: 950 !important; margin-top: 3px !important; }
        .seat-utg1 { left: 50% !important; top: 10% !important; }
        .seat-lj   { left: 72% !important; top: 17% !important; }
        .seat-utg  { left: 28% !important; top: 17% !important; }
        .seat-hj   { left: 74% !important; top: 31% !important; }
        .seat-bb   { left: 26% !important; top: 31% !important; }
        .seat-co   { left: 74% !important; top: 66% !important; }
        .seat-sb   { left: 26% !important; top: 66% !important; }
        .seat-btn  { left: 72% !important; top: 79% !important; }
        .poker-card-static, .poker-card-front, .poker-card-back, .poker-card {
          position: relative !important;
          width: var(--card-w) !important;
          min-width: var(--card-w) !important;
          height: var(--card-h) !important;
          border-radius: 7px !important;
          background: #f7f5ee !important;
          color: #0f172a !important;
          overflow: hidden !important;
          padding: 3px !important;
          box-shadow: 0 3px 7px rgba(0,0,0,.35) !important;
        }
        .poker-card-3d { width: var(--card-w) !important; height: var(--card-h) !important; perspective: 1000px !important; }
        .poker-card-inner { width: 100% !important; height: 100% !important; transform-style: preserve-3d !important; }
        .poker-card-front { transform: rotateY(180deg) !important; backface-visibility: hidden !important; }
        .poker-card-back { position: absolute !important; inset: 0 !important; background: linear-gradient(135deg, #1e3a8a, #0f172a) !important; color: rgba(255,255,255,.38) !important; backface-visibility: hidden !important; }
        .poker-card-back::after { content: 'DN' !important; position: absolute !important; inset: 0 !important; display: grid !important; place-items: center !important; font-weight: 900 !important; }
        .opponent-seat.peek .poker-card-inner { transform: rotateY(180deg) !important; }
        .card-index { display: grid !important; place-items: center !important; line-height: 1 !important; }
        .card-index.bottom-right, .card-suit-sm { display: none !important; }
        .card-rank { font-size: var(--rank-size) !important; font-weight: 950 !important; line-height: 1 !important; }
        .card-center-suit { position: absolute !important; top: 62% !important; left: 50% !important; transform: translate(-50%, -50%) !important; font-size: var(--suit-size) !important; line-height: 1 !important; }
        .suit-red { color: #d5162b !important; }
        .suit-black { color: #08111f !important; }
        .winner-note, [data-winner-note], .odds-list { display: none !important; }
        .winner-controls { margin-top: 8px !important; padding: 16px !important; border-radius: 24px !important; }
        .winner-actions { display: grid !important; grid-template-columns: 1fr !important; gap: 10px !important; }
        .winner-actions button { width: 100% !important; color: #160d03 !important; }
      }

      @media (max-width: 380px) {
        .winner-table { width: min(100%, 355px) !important; height: 675px !important; min-height: 675px !important; --card-w: 30px; --card-h: 42px; --rank-size: 12px; --suit-size: 20px; }
        .opponent-seat { width: 84px !important; max-width: 84px !important; transform: translate(-50%, -50%) scale(.95) !important; }
        .winner-hero-zone { transform: translate(-50%, -50%) scale(.92) !important; }
      }

      .vault-stage { position: relative !important; perspective: 1600px !important; overflow: hidden !important; }
      .vault-stage:not(.is-open):not(.vault-open) .vault-interior { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; height: 0 !important; padding: 0 !important; margin: 0 !important; }
      .vault-door { transform-origin: left center !important; transform-style: preserve-3d !important; transition: transform .95s cubic-bezier(.2,.8,.2,1), filter .25s ease !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
      .vault-stage.is-open .vault-door, .vault-stage.vault-open .vault-door { transform: perspective(1600px) rotateY(-112deg) !important; filter: brightness(.68) !important; pointer-events: none !important; }
      .vault-stage.is-open .vault-interior, .vault-stage.vault-open .vault-interior { display: block !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; height: auto !important; }
      .vault-close-toggle { position: absolute !important; top: 12px !important; right: 12px !important; z-index: 70 !important; border: 0 !important; border-radius: 999px !important; padding: 14px 20px !important; background: linear-gradient(135deg,#fff0b7,#d99a25) !important; color: #160d03 !important; font-weight: 950 !important; box-shadow: 0 12px 34px rgba(0,0,0,.38) !important; display: none !important; }
      .vault-stage.is-open .vault-close-toggle, .vault-stage.vault-open .vault-close-toggle { display: inline-flex !important; }
      @media (max-width: 820px) {
        .vault-stage { min-height: min(124vw, 590px) !important; height: min(124vw, 590px) !important; border-radius: 28px !important; }
        .vault-stage.is-open, .vault-stage.vault-open { min-height: auto !important; height: auto !important; overflow: visible !important; }
        .vault-door { width: 100% !important; height: min(124vw, 590px) !important; min-height: min(124vw, 590px) !important; background: url('${MOBILE_VAULT_DOOR}') center / contain no-repeat !important; background-color: #050509 !important; color: transparent !important; border: 0 !important; box-shadow: none !important; }
        .vault-door strong, .vault-door small, .vault-wheel { display: none !important; }
        .vault-stage.is-open .vault-door, .vault-stage.vault-open .vault-door { position: absolute !important; top: 0 !important; left: 0 !important; z-index: 30 !important; }
      }
    `;
  }

  function removeDuplicateMobileStill() {
    if (!isMobile()) return;
    const finalName = '6a669726fddfeb1aa910b5ae.png';
    $$('img, picture, [style*="6a669726fddfeb1aa910b5ae.png"]').forEach((el) => {
      const src = el.getAttribute?.('src') || '';
      const style = el.getAttribute?.('style') || '';
      const isFinalStill = src.includes(finalName) || style.includes(finalName);
      const isHero = el.closest?.('.universal-hero, .hero-main-visual, .hero-tagline-container');
      if (isFinalStill && !isHero) {
        const wrapper = el.closest('[data-mobile-final-image], .mobile-intro-still, .mobile-final-still, .intro-final-image, .mobile-hero-still');
        (wrapper || el).remove();
      }
    });
  }

  function fixMobileHeroCopy() {
    const kicker = $('.hero-kicker');
    const title = $('.hero-title');
    const subtitle = $('.hero-subtitle');
    if (!kicker || !title || !subtitle) return;
    if (isMobile()) {
      kicker.textContent = 'The Official';
      title.innerHTML = '<span>Kid</span><span>Poker</span>';
      subtitle.textContent = 'Experience';
    } else {
      kicker.textContent = 'The Official Kid Poker Experience';
      title.innerHTML = '<span class="highlight-text">Kid</span> Poker';
      subtitle.textContent = 'Still reading the room.';
    }
  }

  function fixHamburger() {
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-nav]');
    if (!toggle || !nav) return;
    toggle.innerHTML = `<img class="nav-toggle__chip" src="${HAMBURGER_ICON}" alt="" aria-hidden="true"><span class="sr-only">Open navigation</span>`;
    toggle.style.setProperty('background-image', `url('${HAMBURGER_ICON}')`, 'important');
    if (toggle.dataset.rescueBound === 'true') return;
    toggle.dataset.rescueBound = 'true';
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      nav.classList.toggle('open', open);
      document.body.classList.toggle('mobile-menu-open', open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open', 'open');
        document.body.classList.remove('mobile-menu-open');
      }
    });
  }

  function simplifyWinnerButtons() {
    const random = $('[data-random-hero]');
    const next = $('[data-next-street]');
    const redeal = $('[data-redeal]');
    if (random) random.textContent = 'Random';
    if (next) {
      next.textContent = next.textContent.replace('Reveal ', '').replace('Showdown Complete', 'Done') || 'Flop';
      if (/Turn/i.test(next.textContent)) next.textContent = 'Turn';
      else if (/River/i.test(next.textContent)) next.textContent = 'River';
      else if (/Done|Complete/i.test(next.textContent)) next.textContent = 'Done';
      else next.textContent = 'Flop';
    }
    if (redeal) redeal.textContent = 'Re-deal';
    $$('[data-winner-note], .winner-note, .odds-list').forEach((el) => el.remove());
  }

  function stabilizeVault() {
    const stage = $('[data-vault], .vault-stage');
    const door = $('[data-vault-door], .vault-door');
    if (!stage || !door) return;

    const doorImage = isMobile() ? MOBILE_VAULT_DOOR : DESKTOP_VAULT_DOOR;
    door.setAttribute('type', 'button');
    door.setAttribute('aria-expanded', stage.classList.contains('is-open') ? 'true' : 'false');
    door.style.setProperty('background-image', `url('${doorImage}')`, 'important');
    door.style.setProperty('background-position', 'center', 'important');
    door.style.setProperty('background-repeat', 'no-repeat', 'important');
    door.style.setProperty('background-size', isMobile() ? 'contain' : 'cover', 'important');
    door.style.setProperty('opacity', '1', 'important');
    door.style.setProperty('visibility', 'visible', 'important');

    let close = $('.vault-close-toggle', stage);
    if (!close) {
      close = document.createElement('button');
      close.type = 'button';
      close.className = 'vault-close-toggle';
      close.textContent = 'Close Vault';
      stage.appendChild(close);
    }

    const openVault = () => {
      stage.classList.add('is-open', 'vault-open');
      door.setAttribute('aria-expanded', 'true');
      door.style.setProperty('opacity', '1', 'important');
      door.style.setProperty('visibility', 'visible', 'important');
    };

    const closeVault = () => {
      stage.classList.remove('is-open', 'vault-open');
      door.setAttribute('aria-expanded', 'false');
      door.style.setProperty('transform', 'none', 'important');
      door.style.setProperty('opacity', '1', 'important');
      door.style.setProperty('visibility', 'visible', 'important');
      door.style.setProperty('pointer-events', 'auto', 'important');
      door.style.setProperty('background-image', `url('${doorImage}')`, 'important');
      $$('.bracelet-box.is-open, .trophy-card.is-open', stage).forEach((card) => card.classList.remove('is-open'));
    };

    if (door.dataset.rescueBound !== 'true') {
      door.dataset.rescueBound = 'true';
      door.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (stage.classList.contains('is-open') || stage.classList.contains('vault-open')) closeVault();
        else openVault();
      }, true);
    }

    if (close.dataset.rescueBound !== 'true') {
      close.dataset.rescueBound = 'true';
      close.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeVault();
      }, true);
    }
  }

  function enhanceBraceletCards() {
    const stage = $('[data-vault], .vault-stage');
    if (!stage) return;
    const cards = $$('.bracelet-box, .trophy-card', stage);
    cards.forEach((card, index) => {
      if (!card.querySelector('.box-interior, .bracelet-display')) {
        const display = document.createElement('div');
        display.className = 'bracelet-display';
        display.innerHTML = `<img src="${index === 7 ? BRACELET_8 : BRACELET_8}" alt="Bracelet ${index + 1}">`;
        card.appendChild(display);
      }
      if (card.dataset.rescueBound === 'true') return;
      card.dataset.rescueBound = 'true';
      card.addEventListener('click', (event) => {
        const isOpen = card.classList.contains('is-open');
        if (!isOpen) {
          event.preventDefault();
          card.classList.add('is-open');
          return;
        }
        const title = card.querySelector('strong')?.textContent || `Bracelet ${index + 1}`;
        const detail = card.dataset.trophy || `${title}|Bracelet detail|WSOP`;
        openBraceletLightbox(detail, card.querySelector('img')?.src || BRACELET_8);
      });
    });
  }

  function openBraceletLightbox(detail, imgSrc) {
    const [headline, copy, tag] = detail.split('|');
    let dialog = $('#rescue-bracelet-lightbox');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'rescue-bracelet-lightbox';
      dialog.innerHTML = '<button type="button" class="lightbox-close">×</button><img alt=""><h3></h3><p></p><small></small>';
      document.body.appendChild(dialog);
      dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    }
    dialog.querySelector('img').src = imgSrc;
    dialog.querySelector('h3').textContent = headline || 'Bracelet detail';
    dialog.querySelector('p').textContent = copy || '';
    dialog.querySelector('small').textContent = tag || '';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function improveGoldNewsCards() {
    if (!isMobile()) return;
    const selectors = ['#table-talk .news-card', '.poker-news-card', '.news-card.gold-card', '#negreanu-news li', '#negreanu-news a'];
    $$(selectors.join(',')).forEach((el) => {
      el.style.setProperty('color', '#160d03', 'important');
      el.style.setProperty('text-shadow', '0 1px 1px rgba(255,255,255,.25)', 'important');
    });
  }

  function run() {
    injectStyle();
    removeDuplicateMobileStill();
    fixMobileHeroCopy();
    fixHamburger();
    simplifyWinnerButtons();
    stabilizeVault();
    enhanceBraceletCards();
    improveGoldNewsCards();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();

  window.addEventListener('resize', () => window.requestAnimationFrame(run), { passive: true });
  window.addEventListener('orientationchange', () => window.setTimeout(run, 250), { passive: true });
  document.addEventListener('kidpoker:site-ready', run);
  window.setTimeout(run, 400);
  window.setTimeout(run, 1600);
})();
