(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

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
    if (!toggle) return;

    toggle.innerHTML = '<img class="nav-toggle__chip" src="/assets/icons/poker-chip-hamburger-menu-final.svg" alt="" aria-hidden="true"><span class="sr-only">Open navigation</span>';
    toggle.style.backgroundImage = "url('/assets/icons/poker-chip-hamburger-menu-final.svg')";

    if (toggle.dataset.mobileRescueBound !== 'true') {
      toggle.dataset.mobileRescueBound = 'true';
      toggle.addEventListener('click', () => {
        const next = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(next));
        if (nav) nav.classList.toggle('open', next);
      });
    }
  }

  function normalizeWinnerMobile() {
    const table = $('.winner-table');
    const board = $('[data-board]');
    const hero = $('.winner-hero-zone');
    const opponents = $$('[data-opponents] .opponent-seat');
    if (!table || !isMobile()) return;

    table.style.position = 'relative';
    table.style.overflow = 'hidden';
    if (board) {
      board.style.left = '50%';
      board.style.top = '50%';
      board.style.transform = 'translate(-50%, -50%)';
      board.style.justifyContent = 'center';
    }
    if (hero) {
      hero.style.left = '50%';
      hero.style.top = '84%';
      hero.style.bottom = 'auto';
      hero.style.transform = 'translate(-50%, -50%)';
    }

    const seats = [
      [50, 11], [25, 21], [75, 21], [14, 43],
      [86, 43], [24, 68], [76, 68], [76, 84]
    ];

    opponents.forEach((seat, index) => {
      const [left, top] = seats[index] || [50, 50];
      seat.style.left = `${left}%`;
      seat.style.top = `${top}%`;
      seat.style.transform = 'translate(-50%, -50%)';
      seat.style.translate = 'none';
    });
  }

  function normalizeVault() {
    const vault = $('[data-vault]');
    const door = $('[data-vault-door]');
    const grid = $('[data-trophy-grid]');
    if (!vault || !door) return;

    if (!vault.querySelector('.vault-close-toggle')) {
      const close = document.createElement('button');
      close.className = 'vault-close-toggle button button--primary';
      close.type = 'button';
      close.textContent = 'Close Vault';
      close.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        vault.classList.remove('is-open');
        door.setAttribute('aria-expanded', 'false');
      });
      vault.appendChild(close);
    }

    door.addEventListener('click', (event) => {
      event.preventDefault();
      vault.classList.add('is-open');
      door.setAttribute('aria-expanded', 'true');
    });

    if (grid && !grid.dataset.mobileRescueVaultBuilt) {
      grid.dataset.mobileRescueVaultBuilt = 'true';
      const braceletData = [
        ['I','Bracelet 1','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+1','Bracelet I|The breakthrough slot: youthful, fearless, and impossible to ignore.|WSOP'],
        ['II','Bracelet 2','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+2','Bracelet II|A second proof point that Kid Poker was not a moment — he was a force.|WSOP'],
        ['III','Bracelet 3','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+3','Bracelet III|Mixed games, adaptation, and the all-around poker brain.|WSOP'],
        ['IV','Bracelet 4','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+4','Bracelet IV|The trophy room should show the eras, not just the counts.|WSOP'],
        ['V','Bracelet 5','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+5','Bracelet V|A premium card can later hold real footage, payout, final hand, and media notes.|WSOP'],
        ['VI','Bracelet 6','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+6','Bracelet VI|Every bracelet slot is built for verified data once final assets are supplied.|WSOP'],
        ['VII','Bracelet 7','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+7','Bracelet VII|The late-career chapters should feel like reinvention, not nostalgia.|WSOP'],
        ['VIII','Bracelet 8','/assets/trophies/negreanu-bracelet-8.png','Bracelet VIII|Modern Daniel: still dangerous, still relevant, still shaping the conversation.|WSOP']
      ];

      grid.innerHTML = braceletData.map(([roman, label, img, data]) => `
        <div class="cubby">
          <div class="bracelet-box" data-trophy="${data}">
            <div class="box-lid">
              <span class="bracelet">${roman}</span>
              <strong>${label}</strong>
              <span class="tap-open">Tap to open</span>
            </div>
            <div class="box-interior"><img src="${img}" alt="${label}"></div>
          </div>
        </div>
      `).join('');
    }

    $$('.bracelet-box').forEach((box) => {
      if (box.dataset.mobileRescueBound === 'true') return;
      box.dataset.mobileRescueBound = 'true';
      box.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const clickedImage = event.target && event.target.tagName === 'IMG';
        if (!clickedImage) {
          box.classList.toggle('is-open');
          return;
        }
        openTrophyModal(box);
      });
    });
  }

  function openTrophyModal(box) {
    const modal = $('[data-modal]');
    if (!modal) return;
    const [headline, copy, prize] = (box.dataset.trophy || '').split('|');
    const title = $('[data-modal-title]');
    const body = $('[data-modal-body]');
    const payout = $('[data-modal-payout]');
    if (title) title.textContent = headline || 'Trophy detail';
    if (body) body.textContent = copy || '';
    if (payout) payout.textContent = prize || '';
    document.body.classList.add('modal-open');
    if (typeof modal.showModal === 'function' && !modal.open) modal.showModal();
    else modal.setAttribute('open', '');
  }

  function fixGoldContrast() {
    if (!isMobile()) return;
    $$('.partner-links a, .youtube-card, .button, .winner-actions button').forEach((el) => {
      el.style.color = '#1c1205';
    });
  }

  function run() {
    fixMobileHeroCopy();
    fixHamburger();
    normalizeWinnerMobile();
    normalizeVault();
    fixGoldContrast();
  }

  document.addEventListener('DOMContentLoaded', run, { once: true });
  document.addEventListener('kidpoker:site-ready', run);
  window.addEventListener('resize', () => window.requestAnimationFrame(run));
  window.setTimeout(run, 700);
  window.setTimeout(run, 1800);
})();
