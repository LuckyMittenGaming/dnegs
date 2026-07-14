(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const statYears = {
    career: { main: '$60,437,154', sub: 'Career live tournament earnings snapshot', kicker: 'Total Live Earnings', feed: [['Best Live Cash', '$8,288,001'], ['All-Time Money List', '9th'], ['Canada All-Time', '1st'], ['Popularity Ranking', '1st']], bars: [['2026', 2.878], ['2025', 3.152], ['2024', 2.824], ['2023', 1.709], ['2022', 4.750], ['2014', 10.284], ['2004', 4.466]] },
    2026: { main: '$2,878,459', sub: '2026 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$2.878M'], ['Americas', '$2.878M'], ['Best year view', 'Active'], ['Context', 'Recent results']], bars: [['World', 2.878], ['Americas', 2.878], ['Rest', 0.01]] },
    2025: { main: '$3,151,800', sub: '2025 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$3.152M'], ['Americas', '$3.152M'], ['Europe', '-'], ['Oceania', '-']], bars: [['World', 3.152], ['Americas', 3.152], ['Europe', 0.01], ['Oceania', 0.01]] },
    2024: { main: '$2,823,696', sub: '2024 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$2.824M'], ['Americas', '$2.824M'], ['Europe', '-'], ['Oceania', '-']], bars: [['World', 2.824], ['Americas', 2.824], ['Europe', 0.01], ['Oceania', 0.01]] },
    2023: { main: '$1,708,503', sub: '2023 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$1.709M'], ['Americas', '$1.709M'], ['Europe', '-'], ['Oceania', '-']], bars: [['World', 1.709], ['Americas', 1.709], ['Europe', 0.01], ['Oceania', 0.01]] },
    2022: { main: '$4,749,574', sub: '2022 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$4.750M'], ['Americas', '$4.595M'], ['Europe', '$155K'], ['Oceania', '-']], bars: [['World', 4.750], ['Americas', 4.595], ['Europe', .155], ['Oceania', .01]] },
    2014: { main: '$10,284,118', sub: 'Massive 2014 earnings year', kicker: 'Selected Year', feed: [['World', '$10.284M'], ['Americas', '$8.672M'], ['Oceania', '$1.612M'], ['Europe', '-']], bars: [['World', 10.284], ['Americas', 8.672], ['Oceania', 1.612], ['Europe', .01]] },
    2004: { main: '$4,465,907', sub: 'Breakout championship-era year', kicker: 'Selected Year', feed: [['World', '$4.466M'], ['Americas', '$3.599M'], ['Rest of World', '$867K'], ['Momentum', 'Explosive']], bars: [['World', 4.466], ['Americas', 3.599], ['Rest', .867]] }
  };

  const galleryItems = [
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%20Profile%20Picture.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%20Profile%20Picture.jpg','Daniel Negreanu','A marquee profile portrait for the archive wall.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/revpix170223APAwards8923.JPG','https://pokerdb.thehendonmob.com/pictures/revpix170223APAwards8923.JPG','Awards Night','A recognition-night moment with media, personality, and ceremony.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%202.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%202.jpg','Kid Poker Portrait','A legacy portrait slot ready for richer caption context.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/NEIL1778_EPT10BAR_Daniel_Negreanu_Neil%20Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/NEIL1778_EPT10BAR_Daniel_Negreanu_Neil%20Stoddart.jpg','2013 EPT Barcelona','European Poker Tour Barcelona archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/8G2A7207_EPT9MON_Daniel_Negreanu_Neil%20Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/8G2A7207_EPT9MON_Daniel_Negreanu_Neil%20Stoddart.jpg','2013 EPT Grand Final','Monte Carlo era gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu_4.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu_4.jpg','WSOP APAC','World Series of Poker Asia-Pacific gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/NEIL5062_PCA2013_Daniel_Negreanu_Neil%20Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/NEIL5062_PCA2013_Daniel_Negreanu_Neil%20Stoddart.jpg','2013 PCA','PokerStars Caribbean Adventure gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu_1671.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu_1671.jpg','EPT Monte Carlo 2010','Monte Carlo archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%2010%20000%20NLHE%20Championship.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%2010%20000%20NLHE%20Championship.jpg','$10K NLH Championship','WSOP 2010 championship archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/daniel%20negreanu.jpg','https://pokerdb.thehendonmob.com/pictures/daniel%20negreanu.jpg','WSOP 2012 Event #50','No Limit Hold’em event gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%20WSOP%202011%203000%20PLO.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%20WSOP%202011%203000%20PLO.jpg','WSOP 2011 PLO','Pot Limit Omaha archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/_MG_5364_Daniel_Negreanu_EPT7PCA_Neil_Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/_MG_5364_Daniel_Negreanu_EPT7PCA_Neil_Stoddart.jpg','2011 PCA Super High Roller','High roller era image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/daniel_negreanu_day22_appt_sydney.jpg','https://pokerdb.thehendonmob.com/pictures/daniel_negreanu_day22_appt_sydney.jpg','2010 APPT Sydney','Asia Pacific Poker Tour Sydney gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Day%204%20Daniel_Negreanu_EPT7VIE_Neil_Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/Day%204%20Daniel_Negreanu_EPT7VIE_Neil_Stoddart.jpg','EPT Vienna Chip Leader','Final-table energy and tournament pressure.']
  ];

  const bracelets = [
    ['I','Bracelet 1','Bracelet I|The breakthrough slot: youthful, fearless, and impossible to ignore.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+1'],
    ['II','Bracelet 2','Bracelet II|A second proof point that Kid Poker was not a moment — he was a force.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+2'],
    ['III','Bracelet 3','Bracelet III|Mixed games, adaptation, and the all-around poker brain.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+3'],
    ['IV','Bracelet 4','Bracelet IV|The trophy room should show the eras, not just the counts.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+4'],
    ['V','Bracelet 5','Bracelet V|A premium card can later hold real footage, payout, final hand, and media notes.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+5'],
    ['VI','Bracelet 6','Bracelet VI|Every bracelet slot is built for verified data once final assets are supplied.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+6'],
    ['VII','Bracelet 7','Bracelet VII|The late-career chapters should feel like reinvention, not nostalgia.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+7'],
    ['VIII','Bracelet 8','Bracelet VIII|Modern Daniel: still dangerous, still relevant, still shaping the conversation.|WSOP','https://placehold.co/520x360/050403/f4c76b?text=Bracelet+8']
  ];

  const curatedNews = [
    { title: 'Negreanu Inside Top 10 After $1,500 Seven Card Stud Day 1', url: 'https://www.pokernews.com/tags/daniel-negreanu/', date: 'Recent PokerNews tag item', excerpt: 'Live tournament coverage tagged with Daniel Negreanu.' },
    { title: 'Daniel Negreanu Eliminated in 7th Place ($152,954)', url: 'https://www.pokernews.com/tags/daniel-negreanu/', date: 'Recent PokerNews tag item', excerpt: 'A Daniel-focused tournament update from PokerNews live coverage.' },
    { title: 'Negreanu and Ivey Simultaneously at Separate WSOP Final Tables', url: 'https://www.pokernews.com/tags/daniel-negreanu/', date: 'Recent PokerNews tag item', excerpt: 'PokerNews feature coverage involving Daniel Negreanu.' }
  ];

  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const absoluteUrl = (url) => { try { return new URL(url, 'https://www.pokernews.com').href; } catch { return 'https://www.pokernews.com/tags/daniel-negreanu/'; } };
  const formatDate = (value) => { if (!value) return ''; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };

  function injectPolishStyles() {
    if ($('#final-polish-styles')) return;
    const style = document.createElement('style');
    style.id = 'final-polish-styles';
    style.textContent = `
      .messi-next__cards .feature-tile{min-width:0!important;overflow:hidden!important;padding:clamp(1.35rem,2.75vw,3.2rem)!important}
      .messi-next__cards .feature-tile strong{display:grid!important;grid-template-rows:auto auto!important;gap:.08em!important;font-size:clamp(2.15rem,3.25vw,4.25rem)!important;line-height:.88!important;letter-spacing:-.066em!important;max-width:100%!important;overflow:visible!important}
      .messi-next__cards .feature-tile strong span{display:block!important;white-space:nowrap!important;max-width:100%!important;overflow:visible!important;line-height:.88!important}
      @media (max-width:1180px){.messi-next__cards .feature-tile strong{font-size:clamp(2rem,4.5vw,3.5rem)!important}.messi-next__cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media (max-width:680px){.messi-next__cards{grid-template-columns:1fr!important}.messi-next__cards .feature-tile strong{font-size:clamp(2.55rem,13vw,4rem)!important}}
      .below-hero-bracelet-band{width:100%;margin:0;padding:0;background:#030304;border-block:1px solid rgba(244,199,107,.18);overflow:hidden;position:relative;z-index:2}.below-hero-bracelet-band img{display:block;width:100%;max-width:100%;height:auto!important;object-fit:contain!important;object-position:center center!important;filter:saturate(1.06) contrast(1.04)}
      .vault-wheel{display:none!important}.vault-stage{position:relative!important;overflow:hidden!important}.vault-door{gap:.65rem!important;transition:transform .9s cubic-bezier(.2,.78,.2,1),opacity .7s ease!important}.vault-door strong{margin-top:0!important}.vault-stage.is-open .vault-door{transform:translateY(-108%) scale(.985)!important;opacity:.08!important;pointer-events:none!important}.vault-close-toggle{position:absolute;top:clamp(.8rem,1.6vw,1.25rem);right:clamp(.8rem,1.6vw,1.25rem);z-index:12;border:1px solid rgba(244,199,107,.42);border-radius:999px;background:linear-gradient(135deg,#ffe6a3,#bc8331);color:#120b04;font-weight:950;padding:.72rem 1rem;box-shadow:0 16px 35px rgba(0,0,0,.42);cursor:pointer}.vault-stage:not(.is-open) .vault-close-toggle{display:none!important}.vault-interior{padding:clamp(1rem,2.4vw,2.4rem)!important;background:radial-gradient(circle at 50% 12%,rgba(255,219,132,.16),transparent 18rem),linear-gradient(180deg,#14100b,#060504 58%,#050403)!important;box-shadow:inset 0 0 115px rgba(0,0,0,.92),inset 0 0 0 1px rgba(244,199,107,.18)!important}
      .vault-section .trophy-grid-eight{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(1.1rem,2.1vw,2rem)!important;min-height:100%;align-content:center!important;padding:clamp(1rem,2vw,1.6rem)!important;background:linear-gradient(180deg,rgba(255,235,177,.05),rgba(0,0,0,.24));border-radius:28px;border:1px solid rgba(244,199,107,.18);box-shadow:inset 0 0 0 8px rgba(0,0,0,.16)}.cubby{position:relative;min-height:clamp(188px,17vw,245px)!important;aspect-ratio:1.08/.92!important;perspective:1100px;display:flex;justify-content:center;align-items:center;padding:clamp(.55rem,.9vw,.85rem);overflow:hidden!important;border-radius:22px;background:radial-gradient(circle at 50% 0,rgba(255,224,142,.11),transparent 52%),linear-gradient(180deg,rgba(64,43,22,.76),rgba(5,4,3,.9));border:1px solid rgba(232,178,83,.34);box-shadow:inset 0 0 34px rgba(0,0,0,.82),0 20px 42px rgba(0,0,0,.42)}.cubby:before{content:'';position:absolute;inset:8px;border-radius:16px;border:1px solid rgba(255,229,150,.18);pointer-events:none}.bracelet-box{width:100%;height:100%;position:relative;cursor:pointer;transform-style:preserve-3d;border-radius:16px;box-shadow:0 15px 30px rgba(0,0,0,.8);isolation:isolate;overflow:hidden}
      .box-lid{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:.55rem;border-radius:16px;border:1px solid rgba(255,216,130,.46);color:#f9edd3;background:radial-gradient(circle at 50% 25%,rgba(255,233,164,.24),transparent 36%),linear-gradient(180deg,#352817,#0b0805 67%,#040303);box-shadow:inset 0 0 46px rgba(0,0,0,.62),0 0 0 1px rgba(255,255,255,.05);transform-origin:top center;transition:transform .62s cubic-bezier(.4,0,.2,1),opacity .35s ease,box-shadow .35s ease;z-index:3;backface-visibility:hidden}.box-lid strong{font-size:clamp(1.05rem,1.35vw,1.35rem);color:#fff4c5;text-shadow:0 3px 12px rgba(0,0,0,.55)}.box-lid .bracelet{display:grid;place-items:center;width:clamp(50px,5.6vw,70px);height:clamp(50px,5.6vw,70px);border-radius:999px;color:#2d1907;font-weight:950;font-size:clamp(1rem,1.45vw,1.5rem);background:radial-gradient(circle,#fff0b7 0 12%,#d9a84f 45%,#6d4315 70%),#d3a049;box-shadow:0 0 0 6px rgba(245,200,95,.3),0 16px 24px rgba(0,0,0,.48)}.box-interior{position:absolute;inset:0;background:radial-gradient(circle at 50% 34%,#1d1a15,#050505 72%);border-radius:16px;border:1px solid rgba(255,255,255,.08);display:flex;justify-content:center;align-items:center;z-index:1;overflow:hidden;box-shadow:inset 0 0 32px rgba(0,0,0,.94)}.box-interior:before{content:'';position:absolute;inset:12px;border-radius:12px;border:1px dashed rgba(244,199,107,.16);pointer-events:none}.box-interior img{max-width:80%;max-height:68%;object-fit:contain;cursor:zoom-in;transition:transform .3s ease;filter:drop-shadow(0 10px 15px rgba(0,0,0,.8))}.box-interior img:hover{transform:scale(1.08)}.box-close-hint{position:absolute;left:12px;right:12px;bottom:12px;text-align:center;font-size:.72rem;line-height:1.2;text-transform:uppercase;letter-spacing:.13em;color:#ffe7a4;opacity:0;transform:translateY(8px);transition:opacity .25s ease,transform .25s ease;pointer-events:none}.bracelet-box.is-open .box-lid{transform:rotateX(86deg) translateY(-46%);opacity:.86;box-shadow:inset 0 0 35px rgba(0,0,0,.75),0 10px 24px rgba(0,0,0,.5)}.bracelet-box.is-open .box-close-hint{opacity:1;transform:translateY(0)}@media (max-width:1100px){.vault-section .trophy-grid-eight{grid-template-columns:repeat(2,minmax(0,1fr))!important}.vault-stage,.vault-interior{min-height:900px!important}}@media (max-width:620px){.vault-section .trophy-grid-eight{grid-template-columns:1fr!important}.vault-stage,.vault-interior{min-height:1560px!important}}
      .gallery-wall{background:radial-gradient(circle at 30% 8%,rgba(244,199,107,.13),transparent 20rem),linear-gradient(180deg,rgba(31,20,12,.92),rgba(8,5,4,.96)),url('/assets/video/gallery-background.png') center/cover no-repeat!important;box-shadow:inset 0 0 120px rgba(0,0,0,.72)!important}.photo-wall{background:linear-gradient(180deg,rgba(33,21,13,.4),rgba(14,8,5,.5)),url('/assets/video/gallery-background.png') center/cover no-repeat!important;border:1px solid rgba(244,199,107,.2)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.04),inset 0 0 80px rgba(0,0,0,.72),0 30px 90px rgba(0,0,0,.45)!important}.gallery-card{padding:5px!important;border-radius:18px!important;background:linear-gradient(135deg,#fff1b8,#d6a447 34%,#6f4518 68%,#ffe7a0)!important;box-shadow:0 22px 52px rgba(0,0,0,.48),inset 0 0 0 1px rgba(255,255,255,.24)!important}.gallery-card:before{content:'';position:absolute;inset:5px;border-radius:13px;border:1px solid rgba(255,244,204,.65);pointer-events:none;z-index:3}.gallery-card img{border-radius:12px!important}.gallery-card span{left:5px!important;right:5px!important;bottom:5px!important;border-radius:0 0 12px 12px!important}
      .social-wall{align-items:start!important}.social-card{min-width:0;overflow:hidden}.social-card-ig .instagram-media{max-width:100%!important;min-width:0!important;width:100%!important;margin:0 auto!important;border-radius:18px!important;overflow:hidden}.social-card-x iframe{width:100%!important}.x-preview-cards{display:grid;gap:.85rem;margin-top:1rem}.x-preview-card{display:block;padding:1rem;border-radius:18px;background:rgba(244,199,107,.08);border:1px solid rgba(244,199,107,.18);color:#f8efd9;text-decoration:none}.x-preview-card strong{display:block;color:#ffe59b;margin-bottom:.25rem}.x-preview-card span{color:#bdb3a1}.news-grid{display:grid;grid-template-columns:1fr;gap:.85rem}.news-card{display:grid;gap:.45rem;padding:1rem;border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(244,199,107,.16);text-decoration:none;color:#f8efd9}.news-card strong{color:#ffe59b;font-size:1.02rem}.news-card p{margin:0;color:#c8bca8;font-size:.92rem;line-height:1.45}.news-card small{color:#9f9485;text-transform:uppercase;letter-spacing:.08em;font-size:.72rem}.news-card:hover{background:rgba(244,199,107,.08);transform:translateY(-2px)}.facebook-posts{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:1rem!important;align-items:start!important}.facebook-posts iframe{width:100%!important;height:520px!important;max-width:100%!important;border-radius:18px!important;background:#fff!important}.social-card-facebook{grid-column:1/-1!important}.social-card-facebook h3{margin-bottom:1rem!important}@media (max-width:1050px){.facebook-posts{grid-template-columns:1fr!important}.facebook-posts iframe{height:540px!important}}
    `;
    document.head.appendChild(style);
  }

  function addBelowHeroBraceletBand() {
    const next = $('.messi-next');
    if (!next || $('.below-hero-bracelet-band')) return;
    next.insertAdjacentHTML('afterend', '<section class="below-hero-bracelet-band" aria-label="Daniel Negreanu bracelet celebration"><img src="/assets/icons/below-hero-bracelet-congrats.png" alt="Daniel Negreanu bracelet celebration graphic" loading="eager" decoding="async"></section>');
  }

  function renderVaultInterior() {
    const grid = $('[data-trophy-grid]');
    if (!grid || grid.dataset.vaultInterior === 'box-lids-v2') return;
    grid.dataset.vaultInterior = 'box-lids-v2';
    grid.innerHTML = bracelets.map(([roman, title, trophy, image]) => `
      <div class="cubby"><div class="bracelet-box" data-trophy="${escapeHtml(trophy)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(title)}"><div class="box-lid"><span class="bracelet">${roman}</span><strong>${escapeHtml(title)}</strong></div><div class="box-interior"><img src="${image}" alt="${escapeHtml(title)}" loading="lazy"><span class="box-close-hint">Click box to close · click image for detail</span></div></div></div>`).join('');
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

  function initModalClose() {
    const modal = $('[data-modal]');
    const close = $('[data-modal-close]');
    if (!modal || modal.dataset.buildOutClose === 'true') return;
    modal.dataset.buildOutClose = 'true';
    const closeModal = () => { document.body.classList.remove('modal-open'); if (typeof modal.close === 'function' && modal.open) modal.close(); else modal.removeAttribute('open'); };
    close?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => { const rect = modal.getBoundingClientRect(); const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom; if (outside) closeModal(); });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.open) closeModal(); });
  }

  function initVault() {
    const vault = $('[data-vault]');
    const button = $('[data-vault-door]');
    if (!vault) return;
    renderVaultInterior();
    let closeToggle = $('.vault-close-toggle', vault);
    if (!closeToggle) { closeToggle = document.createElement('button'); closeToggle.type = 'button'; closeToggle.className = 'vault-close-toggle'; closeToggle.textContent = 'Close Vault'; vault.appendChild(closeToggle); }
    const setVaultOpen = (open) => { vault.classList.toggle('is-open', open); button?.setAttribute('aria-expanded', String(open)); closeToggle.textContent = open ? 'Close Vault' : 'Open Vault'; if (!open) $$('.bracelet-box.is-open', vault).forEach((box) => box.classList.remove('is-open')); };
    button?.addEventListener('click', () => setVaultOpen(!vault.classList.contains('is-open')));
    closeToggle.addEventListener('click', () => setVaultOpen(false));
    vault.addEventListener('click', (event) => { const box = event.target.closest('.bracelet-box'); if (!box) return; event.stopPropagation(); const isOpen = box.classList.contains('is-open'); if (isOpen && event.target.tagName === 'IMG') openTrophyModal(box); else box.classList.toggle('is-open'); });
    vault.addEventListener('keydown', (event) => { if (event.key !== 'Enter' && event.key !== ' ') return; const box = event.target.closest('.bracelet-box'); if (!box) return; event.preventDefault(); if (box.classList.contains('is-open')) openTrophyModal(box); else box.classList.add('is-open'); });
  }

  function initStats() {
    const year = $('[data-stat-year]'); const view = $('[data-stat-view]'); const main = $('[data-stat-main]'); const sub = $('[data-stat-sub]'); const kicker = $('[data-stat-kicker]'); const bars = $('[data-stat-bars]'); const feed = $('[data-stat-feed]');
    if (!year || !main || !bars || !feed) return;
    const update = () => { const selected = statYears[year.value] || statYears.career; const mode = view?.value || 'earnings'; main.textContent = selected.main; sub.textContent = mode === 'rankings' ? 'Rankings view: all-time, Canada, popularity, and current list context.' : selected.sub; kicker.textContent = mode === 'regions' ? 'Regional Earnings' : selected.kicker; const max = Math.max(...selected.bars.map(([,v]) => v)); bars.innerHTML = selected.bars.map(([label, value]) => `<div class="stat-bar"><i style="height:${Math.max(6, (value / max) * 100)}%"></i><span>${label}</span></div>`).join(''); const items = mode === 'rankings' ? [['All-Time Money List','9th'], ['Canada All-Time','1st'], ['Popularity Ranking','1st'], ['Best Live Cash','$8.288M']] : mode === 'regions' ? [['Americas','$56.1M+'], ['Europe','$6.2M+'], ['Oceania','$2.75M+'], ['Rest of World','$867K+']] : selected.feed; feed.innerHTML = items.map(([a,b]) => `<article><strong>${a}</strong><span>${b}</span></article>`).join(''); };
    year.addEventListener('change', update); view?.addEventListener('change', update); update();
  }

  function initGallery() {
    const wall = $('[data-gallery-wall]'); const lightbox = $('[data-gallery-lightbox]'); if (!wall || !lightbox) return; const img = $('[data-gallery-lightbox-img]', lightbox); const title = $('[data-gallery-lightbox-title]', lightbox); const context = $('[data-gallery-lightbox-context]', lightbox); const close = $('[data-gallery-close]', lightbox);
    wall.innerHTML = galleryItems.map((item, index) => { const tilt = [-1.3, .85, -.45, 1.1, -.8, .55, -1.05, .75][index % 8]; return `<button class="gallery-card" style="--tilt:${tilt}deg" type="button" data-full="${item[1]}" data-title="${escapeHtml(item[2])}" data-context="${escapeHtml(item[3])}"><img src="${item[0]}" alt="${escapeHtml(item[2])}" loading="lazy"><span>${escapeHtml(item[2])}</span></button>`; }).join('');
    const open = (card) => { img.src = card.dataset.full; img.alt = card.dataset.title || 'Daniel Negreanu gallery image'; title.textContent = card.dataset.title || 'Daniel Negreanu'; context.textContent = card.dataset.context || 'Context can be added here.'; lightbox.classList.add('active'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); };
    const shut = () => { lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); img.removeAttribute('src'); };
    wall.addEventListener('click', (event) => { const card = event.target.closest('.gallery-card'); if (card) open(card); }); close?.addEventListener('click', shut); lightbox.addEventListener('click', (event) => { if (event.target === lightbox) shut(); }); window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.classList.contains('active')) shut(); });
  }

  function videoCard(videoId, title, note = '') { const safeTitle = escapeHtml(title); return `<a class="youtube-card" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noreferrer"><div class="youtube-thumb"><img src="https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg" alt="${safeTitle}" loading="lazy" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${videoId}/hqdefault.jpg';"><span class="youtube-play" aria-hidden="true"></span></div><h3>${safeTitle}</h3><p>${escapeHtml(note || 'Daniel Negreanu YouTube upload')}</p></a>`; }

  function initYouTubeFeed() {
    const container = $('#dnegs-latest-videos'); if (!container) return;
    const fallback = () => { container.innerHTML = [videoCard('mqSmE75E5vY', 'WILD MAIN EVENT DAY 2! - 2026 WSOP VLOG Day 44', 'Manual fallback video'), videoCard('apWXs5sw4aI', 'The WSOP POY CONTROVERSY Explained - 2026 WSOP VLOG Day 43', 'Manual fallback video'), videoCard('kq1caOO9B-Q', 'WSOP VLOG Day 42', 'Manual fallback video')].join(''); };
    const channelId = 'UC0w4AA42ItXQEb9aZld87-w'; const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`); const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    fetch(apiUrl).then((res) => res.ok ? res.json() : Promise.reject(new Error('feed failed'))).then((data) => { const videos = (data.items || []).slice(0, 3); if (!videos.length) return fallback(); container.innerHTML = videos.map((video) => { const videoId = (video.link.split('v=')[1] || '').split('&')[0] || (video.guid || '').split(':').pop(); return videoCard(videoId, video.title, formatDate(video.pubDate)); }).join(''); }).catch(fallback);
  }

  function renderNewsCards(container, items) {
    const cards = items.slice(0, 6).map((item) => { const title = escapeHtml(item.title || 'Daniel Negreanu story'); const excerpt = escapeHtml(stripHtml(item.excerpt || item.description || '').slice(0, 190)); const date = escapeHtml(formatDate(item.date || item.pubDate)); const url = absoluteUrl(item.url || item.link || 'https://www.pokernews.com/tags/daniel-negreanu/'); return `<a class="news-card" href="${url}" target="_blank" rel="noreferrer"><small>${date || 'PokerNews'}</small><strong>${title}</strong>${excerpt ? `<p>${excerpt}</p>` : ''}</a>`; }).join('');
    container.innerHTML = `<div class="news-grid">${cards}</div>`;
  }
  function newsFallback(container) { renderNewsCards(container, curatedNews); }

  function parsePokerNewsTagPage(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html'); const seen = new Set(); const items = [];
    $$('a[href]', doc).forEach((a) => { const title = a.textContent.replace(/\s+/g, ' ').trim(); const href = a.getAttribute('href') || ''; if (!/negreanu/i.test(title) || title.length < 18 || seen.has(title)) return; const nearby = a.closest('article, li, div')?.textContent?.replace(/\s+/g, ' ').trim() || ''; const date = (nearby.match(/(\d+\s+(?:min|h|d)\s+ago|[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})/) || [])[1] || ''; seen.add(title); items.push({ title, url: absoluteUrl(href), date, excerpt: nearby.replace(title, '').slice(0, 170) }); });
    return items.filter((item) => !/tag:|all content|videos|strategy|podcasts/i.test(item.title));
  }

  function initNegreanuNews() {
    const container = $('#negreanu-news'); if (!container) return; container.innerHTML = '<p>Loading Daniel Negreanu stories from PokerNews…</p>';
    const tagUrl = 'https://www.pokernews.com/tags/daniel-negreanu/'; const tagProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(tagUrl)}`; const rssUrl = 'https://www.pokernews.com/rss.php'; const rssProxy = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    fetch(tagProxy).then((res) => res.ok ? res.text() : Promise.reject(new Error('tag failed'))).then((html) => { const tagItems = parsePokerNewsTagPage(html); if (tagItems.length) renderNewsCards(container, tagItems); else throw new Error('empty tag parse'); }).catch(() => { fetch(rssProxy).then((res) => res.ok ? res.json() : Promise.reject(new Error('rss failed'))).then((data) => { const keyword = /daniel negreanu|negreanu/i; const filtered = (data.items || []).filter((item) => keyword.test(`${item.title || ''} ${item.description || ''} ${(item.categories || []).join(' ')}`)); if (filtered.length) renderNewsCards(container, filtered.map((item) => ({ title: item.title, url: item.link, date: item.pubDate, excerpt: item.description }))); else newsFallback(container); }).catch(() => newsFallback(container)); });
  }

  function loadScript(id, src, cb) { const existing = document.getElementById(id); if (existing) { cb?.(); return; } const script = document.createElement('script'); script.id = id; script.async = true; script.src = src; script.onload = () => cb?.(); document.body.appendChild(script); }

  function renderXPreview(xCard) {
    if (!xCard || xCard.querySelector('iframe') || xCard.querySelector('.x-preview-cards')) return;
    xCard.insertAdjacentHTML('beforeend', `<div class="x-preview-cards" aria-label="RealKidPoker X feed fallback"><a class="x-preview-card" href="https://x.com/RealKidPoker" target="_blank" rel="noreferrer"><strong>@RealKidPoker live feed</strong><span>Open Daniel’s official X profile for the newest posts.</span></a><a class="x-preview-card" href="https://x.com/search?q=from%3ARealKidPoker&src=typed_query&f=live" target="_blank" rel="noreferrer"><strong>Latest posts search</strong><span>View real-time posts from Daniel when embedded timelines are blocked.</span></a><a class="x-preview-card" href="https://x.com/RealKidPoker/media" target="_blank" rel="noreferrer"><strong>Photos & video</strong><span>Jump straight to Daniel’s media posts on X.</span></a></div>`);
  }

  function initSocialEmbeds() {
    const xCard = $('.social-card-x'); const xAnchor = $('.twitter-timeline', xCard || document);
    if (xAnchor) { xAnchor.href = 'https://twitter.com/RealKidPoker?ref_src=twsrc%5Etfw'; xAnchor.dataset.height = xAnchor.dataset.height || '560'; xAnchor.dataset.theme = 'dark'; xAnchor.dataset.chrome = 'noheader nofooter noborders transparent'; loadScript('twitter-widgets-script', 'https://platform.twitter.com/widgets.js', () => window.twttr?.widgets?.load?.(xCard || document)); loadScript('x-widgets-script', 'https://platform.x.com/widgets.js', () => window.twttr?.widgets?.load?.(xCard || document)); window.setTimeout(() => renderXPreview(xCard), 5200); }
    const igCard = $('.social-card-ig'); loadScript('instagram-embed-script', 'https://www.instagram.com/embed.js', () => window.instgrm?.Embeds?.process?.()); window.setTimeout(() => { if (igCard && !igCard.querySelector('iframe') && !igCard.querySelector('.social-fallback')) igCard.insertAdjacentHTML('beforeend', '<div class="social-fallback"><strong>Instagram profile embed may be blocked by browser privacy settings.</strong><a href="https://www.instagram.com/dnegspoker/" target="_blank" rel="noreferrer">Open @dnegspoker on Instagram</a></div>'); }, 4200);
    const hydrateFacebook = () => { document.querySelectorAll('.facebook-posts iframe[data-defer-src]').forEach((iframe) => { iframe.src = iframe.dataset.deferSrc; iframe.width = '500'; iframe.height = '520'; iframe.style.width = '100%'; iframe.style.height = '520px'; }); };
    document.addEventListener('kidpoker:site-ready', () => window.setTimeout(hydrateFacebook, 200), { once: true }); window.setTimeout(hydrateFacebook, 3200);
  }

  function init() { injectPolishStyles(); addBelowHeroBraceletBand(); initStats(); initModalClose(); initVault(); initGallery(); initYouTubeFeed(); initNegreanuNews(); initSocialEmbeds(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();