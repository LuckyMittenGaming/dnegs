(() => {
  'use strict';
  if (window.__kidPokerPhaseThree) return;
  window.__kidPokerPhaseThree = true;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function setText(selector, text, scope = document) {
    const node = $(selector, scope);
    if (node) node.textContent = text;
  }

  function insertCommandCenter() {
    if ($('#command-center')) return;
    const hero = $('.hero');
    if (!hero) return;

    const section = document.createElement('section');
    section.className = 'command-center section-shell';
    section.id = 'command-center';
    section.setAttribute('aria-labelledby', 'command-title');
    section.innerHTML = `
      <div class="section-kicker">Live Command Center</div>
      <div class="split-heading">
        <h2 id="command-title">The pulse of Kid Poker, in one place.</h2>
        <p>Current activity, media drops, career movement, and fan pathways stay organized in a single high-energy dashboard.</p>
      </div>

      <div class="command-grid">
        <article class="command-card command-live glass-panel reveal-up revealed">
          <div class="command-topline"><span class="live-dot"></span> Status</div>
          <h3>WSOP Mode</h3>
          <p>Daily updates, vlog drops, chip-count moments, and feature-table energy surface here first.</p>
          <div class="command-meter"><span style="width: 86%"></span></div>
          <small>Intensity: High Roller</small>
        </article>

        <article class="command-card glass-panel reveal-up revealed">
          <div class="command-topline">Next Up</div>
          <h3>$100K High Roller Watch</h3>
          <p>Schedule, table draw, stream links, and live-result context stay connected to the career dashboard.</p>
          <a href="#stats" class="mini-link">Open stats</a>
        </article>

        <article class="command-card glass-panel reveal-up revealed">
          <div class="command-topline">Latest Drop</div>
          <h3>Daily Vlog Hub</h3>
          <p>New episodes, behind-the-scenes clips, and signature table talk flow into one cinematic media rail.</p>
          <a href="#media-title" class="mini-link">Watch media</a>
        </article>

        <article class="command-card glass-panel reveal-up revealed">
          <div class="command-topline">Training Path</div>
          <h3>Small Ball Academy</h3>
          <p>Hand breakdowns, strategy checkpoints, and lesson progress turn casual fans into sharper players.</p>
          <a href="#academy" class="mini-link">Start learning</a>
        </article>
      </div>
    `;

    hero.insertAdjacentElement('afterend', section);
  }

  function upgradeFinishedLanguage() {
    document.body.classList.add('phase-three-live');

    setText('#arch-title', 'The engine behind the Kid Poker experience.');
    setText('.architecture-section .split-heading p', 'Fast pages, secure data, premium motion, media delivery, training access, and commerce all work together behind the scenes.');
    setText('#commerce-title', 'Watch, learn, collect, and stay connected.');
    setText('#roadmap-title', 'Every path leads deeper into the Kid Poker universe.');
    setText('.roadmap-section .split-heading p', 'The experience is organized around the real ways fans connect with Daniel: watching, learning, tracking, collecting, and joining the community.');
    setText('#responsible-title', 'Poker is best when it is competitive, social, and played responsibly.');

    const commerceSection = $('.commerce-section');
    if (commerceSection) commerceSection.id = 'academy';
    const roadmapSection = $('.roadmap-section');
    if (roadmapSection) roadmapSection.id = 'ecosystem';

    const commerceItems = $$('.commerce-item');
    const commerce = [
      ['Academy', 'Small Ball lessons and hand labs'],
      ['Store', 'Signed books, merch, and drops'],
      ['Community', 'Fan hub and live-event access'],
      ['Media', 'Vlogs, interviews, and archives']
    ];
    commerceItems.forEach((item, index) => {
      const data = commerce[index];
      if (!data) return;
      const span = $('span', item);
      const strong = $('strong', item);
      if (span) span.textContent = data[0];
      if (strong) strong.textContent = data[1];
    });

    const roadmapCards = $$('.roadmap-card');
    const ecosystem = [
      ['Watch', 'Daily Media Hub', 'WSOP vlogs, feature-table clips, interviews, and long-form stories flow through a premium video hub.'],
      ['Learn', 'Small Ball Academy', 'Strategy lessons, hand-history breakdowns, quizzes, and progress paths turn fans into sharper players.'],
      ['Track', 'Live Career Command', 'Stats, bracelets, schedule notes, cashes, and milestones stay visible in a real-time career dashboard.'],
      ['Collect', 'Store + Community', 'Signed books, merch drops, community access, and premium experiences live in one connected fan layer.']
    ];
    roadmapCards.forEach((card, index) => {
      const data = ecosystem[index];
      if (!data) return;
      setText('span', data[0], card);
      setText('h3', data[1], card);
      setText('p', data[2], card);
    });

    const architectureCards = $$('.arch-card');
    const engine = [
      ['Fast Frontend', 'Instant page loads, crisp motion, clean content structure, and search-friendly rendering keep the experience sharp.'],
      ['Legacy CMS', 'Career milestones, stories, videos, schedule entries, and editorial features stay organized for fast updates.'],
      ['Secure Data Layer', 'Stats, video feeds, store data, and training content move through protected server-side endpoints.'],
      ['Motion System', 'Cinematic transitions, trophy reveals, timeline movement, and mobile-safe effects create premium energy.'],
      ['Kid Poker Store', 'Signed books, curated merch, bundles, and premium drops live directly inside the Daniel Negreanu ecosystem.'],
      ['Small Ball Academy', 'Small Ball strategy becomes a dedicated learning portal with lessons, hand reviews, quizzes, and progress tracking.']
    ];
    architectureCards.forEach((card, index) => {
      const data = engine[index];
      if (!data) return;
      setText('h3', data[0], card);
      setText('p', data[1], card);
    });
  }

  function addCommandInteractions() {
    $$('.command-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(hover: none)').matches) return;
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(245,199,107,.16), transparent 10rem), linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.04))`;
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.background = '';
      });
    });
  }

  function makeButtonsFeelAlive() {
    $$('.button, .mini-link').forEach((button) => {
      button.addEventListener('click', () => {
        button.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(.975)' },
          { transform: 'scale(1)' }
        ], { duration: 180, easing: 'ease-out' });
      });
    });
  }

  function init() {
    insertCommandCenter();
    upgradeFinishedLanguage();
    addCommandInteractions();
    makeButtonsFeelAlive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
