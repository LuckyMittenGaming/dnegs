(() => {
  'use strict';

  const PATCH_STYLE_ID = 'mobile-final-cleanup-patch-styles';
  const MOBILE_HERO_IMAGE = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a669726fddfeb1aa910b5ae.png';
  const HAMBURGER_ICON = '/assets/icons/poker-chip-hamburger-menu-final.svg';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  function injectStyles() {
    let style = document.getElementById(PATCH_STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = PATCH_STYLE_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      html,
      body {
        max-width: 100% !important;
        overflow-x: hidden !important;
      }

      body * {
        box-sizing: border-box !important;
      }

      img,
      video,
      iframe {
        max-width: 100% !important;
      }

      #winner .winner-table {
        position: relative !important;
      }

      #winner .winner-board {
        position: absolute !important;
        top: 45% !important;
        left: 50% !important;
        right: auto !important;
        bottom: auto !important;
        transform: translate(-50%, -50%) !important;
        translate: none !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        max-width: calc(100% - 24px) !important;
      }

      #winner .winner-hero-zone {
        position: absolute !important;
        top: 96% !important;
        left: 50% !important;
        right: auto !important;
        bottom: auto !important;
        transform: translate(-50%, -50%) !important;
        translate: none !important;
        margin: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        max-width: none !important;
      }

      #winner .winner-note,
      #winner [data-winner-note] {
        display: none !important;
      }

      #winner .card-suit-sm,
      #winner .card-index.bottom-right {
        display: none !important;
      }

      #winner .poker-card-front,
      #winner .poker-card-static {
        display: grid !important;
        grid-template-rows: auto 1fr !important;
        align-items: center !important;
        justify-items: center !important;
        padding: 3px 2px !important;
        line-height: 1 !important;
      }

      #winner .card-index,
      #winner .card-index.top-left {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-direction: row !important;
        width: 100% !important;
        line-height: 1 !important;
      }

      #winner .card-rank {
        display: block !important;
        font-weight: 950 !important;
        font-size: clamp(12px, 2.8vw, 18px) !important;
        line-height: 1 !important;
        letter-spacing: 0 !important;
      }

      #winner .card-center-suit {
        position: static !important;
        transform: none !important;
        font-size: calc(var(--suit-center, 16px) * 1.4) !important;
        line-height: 1 !important;
        opacity: .96 !important;
      }

      #winner .winner-actions {
        gap: .6rem !important;
      }

      #winner .winner-actions .button,
      #winner .winner-actions button {
        min-width: 0 !important;
      }

      .vault-stage {
        perspective: 1400px !important;
        transform-style: preserve-3d !important;
      }

      .vault-stage::before,
      .vault-stage::after {
        pointer-events: none !important;
      }

      .vault-door {
        transform-origin: left center !important;
        backface-visibility: hidden !important;
        will-change: transform, opacity !important;
        transition: transform .9s cubic-bezier(.2,.7,.1,1), opacity .45s ease !important;
      }

      .vault-stage.is-open .vault-door,
      .vault-stage.open .vault-door,
      .vault-stage.vault-open .vault-door {
        transform: perspective(1400px) rotateY(-108deg) translateX(-2%) !important;
        opacity: .18 !important;
        pointer-events: auto !important;
      }

      .vault-interior {
        position: relative !important;
      }

      .vault-stage.is-open .vault-interior::after,
      .vault-stage.open .vault-interior::after,
      .vault-stage.vault-open .vault-interior::after {
        content: '' !important;
        display: block !important;
        height: 14px !important;
        margin: 1.1rem auto 0 !important;
        width: min(92%, 760px) !important;
        border-radius: 999px !important;
        background: linear-gradient(90deg, rgba(76,49,17,.2), rgba(246,204,111,.8), rgba(76,49,17,.2)) !important;
        box-shadow: 0 14px 22px rgba(0,0,0,.48) !important;
      }

      .trophy-card.is-open,
      .bracelet-box.is-open {
        border-color: rgba(255,216,130,.9) !important;
        box-shadow: 0 0 0 1px rgba(255,216,130,.5), 0 24px 54px rgba(0,0,0,.65), inset 0 0 48px rgba(244,199,107,.16) !important;
      }

      .mobile-lightbox {
        position: fixed !important;
        inset: 0 !important;
        z-index: 99999 !important;
        display: grid !important;
        place-items: center !important;
        padding: 1.2rem !important;
        background: rgba(0,0,0,.82) !important;
        backdrop-filter: blur(14px) !important;
      }

      .mobile-lightbox__card {
        width: min(92vw, 540px) !important;
        max-height: 88svh !important;
        overflow: auto !important;
        border-radius: 24px !important;
        border: 1px solid rgba(244,199,107,.35) !important;
        background: radial-gradient(circle at top, rgba(244,199,107,.18), rgba(9,7,5,.96) 44%, #030303) !important;
        color: #fff8d6 !important;
        padding: 1rem !important;
        box-shadow: 0 30px 80px rgba(0,0,0,.8) !important;
      }

      .mobile-lightbox__card img {
        width: 100% !important;
        height: auto !important;
        display: block !important;
        border-radius: 18px !important;
        margin-bottom: 1rem !important;
      }

      .mobile-lightbox__card h3 {
        margin: 0 0 .5rem !important;
        font: 900 clamp(1.4rem, 7vw, 2.4rem)/.95 'Archivo Black', Impact, sans-serif !important;
        color: #fff4c5 !important;
      }

      .mobile-lightbox__card p {
        color: rgba(255,248,214,.82) !important;
        font-size: 1rem !important;
        line-height: 1.45 !important;
      }

      .mobile-lightbox__close {
        display: inline-flex !important;
        margin-top: 1rem !important;
        border: 0 !important;
        border-radius: 999px !important;
        padding: .8rem 1.2rem !important;
        font-weight: 950 !important;
        background: linear-gradient(135deg, #fff1a6, #c98616) !important;
        color: #140c02 !important;
      }

      #table-talk .news-card,
      #table-talk [class*='news'] article,
      #table-talk [class*='news'] a,
      #negreanu-news article,
      #negreanu-news a,
      #negreanu-news li {
        color: #151009 !important;
        text-shadow: 0 1px 0 rgba(255,255,255,.38) !important;
      }

      #table-talk .news-card small,
      #table-talk .news-card time,
      #negreanu-news small,
      #negreanu-news time {
        color: rgba(21,16,9,.72) !important;
      }

      @media (max-width: 820px) {
        body {
          overflow-x: hidden !important;
          width: 100% !important;
        }

        .site-header {
          position: fixed !important;
          top: 0 !important;
          left: auto !important;
          right: 0 !important;
          width: auto !important;
          height: 0 !important;
          min-height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          pointer-events: none !important;
          z-index: 9999 !important;
        }

        .site-header .brand,
        .site-header .header-cta {
          display: none !important;
        }

        .nav-toggle {
          position: fixed !important;
          top: max(10px, env(safe-area-inset-top)) !important;
          right: max(10px, env(safe-area-inset-right)) !important;
          left: auto !important;
          width: 56px !important;
          height: 56px !important;
          display: flex !important;
          border: 0 !important;
          border-radius: 999px !important;
          padding: 0 !important;
          background: url('${HAMBURGER_ICON}') center / 72% 72% no-repeat, radial-gradient(circle at 30% 25%, #fff3b6, #d49a24 56%, #5e390b 100%) !important;
          box-shadow: 0 12px 26px rgba(0,0,0,.36) !important;
          pointer-events: auto !important;
          z-index: 10001 !important;
          transform: none !important;
        }

        .nav-toggle span:not(.sr-only) {
          display: none !important;
        }

        .primary-nav {
          position: fixed !important;
          top: calc(max(10px, env(safe-area-inset-top)) + 64px) !important;
          right: max(10px, env(safe-area-inset-right)) !important;
          left: auto !important;
          width: min(76vw, 280px) !important;
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: .35rem !important;
          padding: .8rem !important;
          border-radius: 22px !important;
          border: 1px solid rgba(244,199,107,.35) !important;
          background: rgba(3,3,5,.94) !important;
          box-shadow: 0 24px 60px rgba(0,0,0,.65) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transform: translateY(-10px) scale(.97) !important;
          transition: opacity .22s ease, transform .22s ease, visibility .22s ease !important;
          pointer-events: none !important;
          z-index: 10000 !important;
        }

        .primary-nav.is-open,
        body.mobile-menu-open .primary-nav {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) scale(1) !important;
          pointer-events: auto !important;
        }

        .primary-nav a {
          display: block !important;
          padding: .9rem 1rem !important;
          border-radius: 16px !important;
          color: #fff4c5 !important;
          background: rgba(255,255,255,.045) !important;
          text-align: left !important;
          font-weight: 900 !important;
        }

        .hero-main-visual {
          min-height: 100svh !important;
          padding: 0 4vw 7svh !important;
          align-items: center !important;
          background-image: linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.74)), url('${MOBILE_HERO_IMAGE}') !important;
          background-size: cover !important;
          background-position: center top !important;
        }

        .hero-tagline-container {
          width: min(100%, 720px) !important;
          margin: 0 auto !important;
          text-align: center !important;
        }

        .section-shell,
        .messi-split,
        .stats-console,
        .gallery-wall,
        .photo-wall,
        .messi-news-grid,
        .learning-partners,
        .vault-section,
        .winner-tool {
          max-width: 100% !important;
          overflow-x: hidden !important;
        }

        h2,
        .split-heading h2,
        .section-shell h2,
        .vault-heading h2 {
          max-width: 100% !important;
          white-space: normal !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          letter-spacing: .012em !important;
          line-height: .94 !important;
        }

        #winner .winner-shell {
          display: block !important;
          overflow: visible !important;
        }

        #winner .winner-table {
          width: min(100%, 420px) !important;
          height: min(680px, 76svh) !important;
          margin: 0 auto !important;
          border-radius: 160px !important;
          --card-w: clamp(32px, 9.4vw, 42px) !important;
          --card-h: clamp(45px, 13vw, 58px) !important;
          --suit-center: clamp(19px, 5.5vw, 26px) !important;
        }

        #winner .winner-board {
          top: 45% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          gap: 4px !important;
          padding: 8px 10px !important;
        }

        #winner .winner-hero-zone {
          top: 93% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) scale(.92) !important;
          padding: 8px 13px !important;
        }

        #winner .opponent-seat {
          transform: translate(-50%, -50%) scale(.92) !important;
        }

        #winner .seat-utg1 { top: 17% !important; left: 33% !important; }
        #winner .seat-lj   { top: 17% !important; left: 67% !important; }
        #winner .seat-utg  { top: 30% !important; left: 21% !important; }
        #winner .seat-hj   { top: 30% !important; left: 79% !important; }
        #winner .seat-bb   { top: 66% !important; left: 21% !important; }
        #winner .seat-co   { top: 66% !important; left: 79% !important; }
        #winner .seat-sb   { top: 80% !important; left: 33% !important; }
        #winner .seat-btn  { top: 80% !important; left: 67% !important; }

        #winner .winner-controls {
          margin-top: 1rem !important;
        }

        #winner .winner-actions {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: .5rem !important;
        }

        #winner .winner-actions button {
          width: 100% !important;
          padding: .78rem .55rem !important;
          font-size: .95rem !important;
          color: #140c02 !important;
        }

        .vault-stage {
          overflow: visible !important;
          padding-bottom: 1rem !important;
        }

        .vault-stage::before,
        .vault-stage::after {
          display: none !important;
        }

        .vault-door {
          transform-origin: left center !important;
        }

        .vault-stage.is-open .vault-door,
        .vault-stage.open .vault-door,
        .vault-stage.vault-open .vault-door {
          transform: perspective(1200px) rotateY(-106deg) translateX(-1%) !important;
          opacity: .14 !important;
        }

        .photo-wall,
        .gallery-wall figure,
        .gallery-card,
        .photo-card,
        [data-gallery-wall] > * {
          max-width: 100% !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          overflow: hidden !important;
        }

        #table-talk .news-card,
        #table-talk [class*='news'] article,
        #negreanu-news article,
        #negreanu-news li {
          background: linear-gradient(135deg, #fff1a6, #c98616) !important;
          color: #151009 !important;
        }
      }

      @media (max-width: 360px) {
        .nav-toggle {
          width: 50px !important;
          height: 50px !important;
        }

        #winner .winner-table {
          width: min(100%, 330px) !important;
          height: min(628px, 75svh) !important;
          --card-w: 30px !important;
          --card-h: 43px !important;
          --suit-center: 18px !important;
        }

        #winner .opponent-seat {
          transform: translate(-50%, -50%) scale(.82) !important;
        }

        #winner .winner-hero-zone {
          top: 93% !important;
          transform: translate(-50%, -50%) scale(.82) !important;
        }

        #winner .winner-actions {
          grid-template-columns: 1fr !important;
        }
      }
    `;
  }

  function patchMobileNav() {
    const toggle = $('[data-nav-toggle], .nav-toggle');
    const nav = $('[data-nav], #primary-nav, .primary-nav');
    if (!toggle || !nav || toggle.dataset.mobilePatched === 'true') return;
    toggle.dataset.mobilePatched = 'true';

    const closeMenu = () => {
      nav.classList.remove('is-open');
      document.body.classList.remove('mobile-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (event) => {
      if (!isMobile()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('mobile-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }, true);

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (!isMobile()) closeMenu();
    });
  }

  function forceWinnerElements() {
    const winner = $('#winner');
    if (!winner) return;

    const board = $('.winner-board, [data-board]', winner);
    const hero = $('.winner-hero-zone', winner);
    const table = $('.winner-table', winner);
    const note = $('.winner-note, [data-winner-note]', winner);
    const actionButtons = $$('[data-random-hero], [data-next-street], [data-redeal]', winner);

    if (table) table.style.setProperty('position', 'relative', 'important');
    if (note) note.style.setProperty('display', 'none', 'important');

    if (board) {
      board.style.setProperty('position', 'absolute', 'important');
      board.style.setProperty('top', isMobile() ? '45%' : '45%', 'important');
      board.style.setProperty('left', '50%', 'important');
      board.style.setProperty('right', 'auto', 'important');
      board.style.setProperty('bottom', 'auto', 'important');
      board.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      board.style.setProperty('display', 'flex', 'important');
      board.style.setProperty('align-items', 'center', 'important');
      board.style.setProperty('justify-content', 'center', 'important');
      board.style.setProperty('width', 'auto', 'important');
      board.style.setProperty('max-width', 'calc(100% - 24px)', 'important');
    }

    if (hero) {
      hero.style.setProperty('position', 'absolute', 'important');
      hero.style.setProperty('top', isMobile() ? '93%' : '96%', 'important');
      hero.style.setProperty('left', '50%', 'important');
      hero.style.setProperty('right', 'auto', 'important');
      hero.style.setProperty('bottom', 'auto', 'important');
      hero.style.setProperty('transform', isMobile() ? 'translate(-50%, -50%) scale(.92)' : 'translate(-50%, -50%)', 'important');
      hero.style.setProperty('margin', '0', 'important');
      hero.style.setProperty('align-items', 'center', 'important');
      hero.style.setProperty('justify-content', 'center', 'important');
    }

    actionButtons.forEach((button) => {
      if (button.matches('[data-random-hero]')) button.textContent = isMobile() ? 'Random' : 'Random My Hand';
      if (button.matches('[data-next-street]')) {
        const txt = button.textContent.toLowerCase();
        button.textContent = isMobile() ? (txt.includes('turn') ? 'Turn' : txt.includes('river') ? 'River' : 'Flop') : button.textContent;
      }
      if (button.matches('[data-redeal]')) button.textContent = isMobile() ? 'Re-deal' : 'Re-Deal';
    });
  }

  function patchVault() {
    const stage = $('[data-vault], .vault-stage');
    const door = $('[data-vault-door], .vault-door');
    if (!stage || !door || door.dataset.swingPatched === 'true') return;
    door.dataset.swingPatched = 'true';

    const setOpen = (open) => {
      stage.classList.toggle('is-open', open);
      stage.classList.toggle('vault-open', open);
      door.setAttribute('aria-expanded', String(open));
      const strong = door.querySelector('strong');
      const small = door.querySelector('small');
      if (strong) strong.textContent = open ? 'Close Vault' : 'Open The Bracelet Vault';
      if (small) small.textContent = open ? 'Tap to close the vault' : 'Click to reveal the collection';
    };

    door.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(!stage.classList.contains('is-open') && !stage.classList.contains('vault-open'));
    }, true);
  }

  function showLightbox({ title = 'Bracelet detail', body = '', img = '', meta = '' }) {
    $('.mobile-lightbox')?.remove();
    const overlay = document.createElement('div');
    overlay.className = 'mobile-lightbox';
    overlay.innerHTML = `
      <div class="mobile-lightbox__card" role="dialog" aria-modal="true">
        ${img ? `<img src="${img}" alt="${title.replace(/"/g, '')}">` : ''}
        <h3>${title}</h3>
        ${meta ? `<small>${meta}</small>` : ''}
        <p>${body}</p>
        <button class="mobile-lightbox__close" type="button">Close</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.closest('.mobile-lightbox__close')) overlay.remove();
    });
  }

  function patchBraceletInteractions() {
    $$('.trophy-card, .bracelet-box').forEach((card) => {
      if (card.dataset.lightboxPatched === 'true') return;
      card.dataset.lightboxPatched = 'true';
      card.addEventListener('click', (event) => {
        const imgEl = event.target.closest('img');
        const [title, body, meta] = (card.dataset.trophy || '').split('|');
        if (imgEl || card.classList.contains('is-open')) {
          showLightbox({ title: title || card.textContent.trim().split('\n')[0] || 'Bracelet detail', body: body || '', meta: meta || '', img: imgEl?.src || card.querySelector('img')?.src || '' });
          return;
        }
        card.classList.add('is-open');
      }, true);
    });
  }

  function patchNewsFeed() {
    const container = $('#negreanu-news');
    if (!container || container.dataset.dynamicNewsPatched === 'true') return;
    container.dataset.dynamicNewsPatched = 'true';

    const rssUrl = encodeURIComponent('https://www.pokernews.com/rss.php');
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    fetch(proxyUrl)
      .then((res) => res.json())
      .then((data) => {
        const keyword = /daniel negreanu|negreanu|dnegs/i;
        const items = (data.items || []).filter((item) => keyword.test(`${item.title || ''} ${item.description || ''} ${(item.categories || []).join(' ')}`)).slice(0, 6);
        if (!items.length) return;
        container.innerHTML = items.map((item) => `
          <article class="news-card">
            <small>${item.pubDate ? new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase() : 'LATEST'}</small>
            <a href="${item.link}" target="_blank" rel="noreferrer">${item.title}</a>
          </article>
        `).join('');
      })
      .catch(() => {});
  }

  function boot() {
    injectStyles();
    patchMobileNav();
    patchVault();
    patchBraceletInteractions();
    patchNewsFeed();
    forceWinnerElements();

    requestAnimationFrame(forceWinnerElements);
    setTimeout(forceWinnerElements, 250);
    setTimeout(forceWinnerElements, 900);

    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        patchMobileNav();
        patchVault();
        patchBraceletInteractions();
        forceWinnerElements();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'aria-expanded'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();