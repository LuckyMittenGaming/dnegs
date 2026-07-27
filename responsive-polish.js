(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  const expandedStats = [
    ['Tracked Live Earnings', '$60.665M', 'Updated career earnings figure from the supplied statistical analysis.'],
    ['WSOP Earnings', '$28.918M', 'Career WSOP winnings benchmark.'],
    ['WSOP Bracelets', '8', 'Includes the 2024 PPC and 2026 $100K PLO High Roller victories.'],
    ['WPT Titles', '2', 'Both major WPT wins came during the dominant 2004 boom-era run.'],
    ['WSOP POY Awards', '2', 'Only player listed in the report as winning WSOP Player of the Year twice: 2004 and 2013.'],
    ['Best Live Cash', '$8.288M', '2014 Big One for One Drop runner-up finish.'],
    ['2026 WSOP Net', '+$1.703M', 'Driven heavily by the $100K High Roller PLO bracelet victory.'],
    ['2023 Public P/L', '-$2.228M', 'Worst public tracked tournament year, followed by volume reduction and rebound.']
  ];

  const ledgerStats = [
    ['2013','+$1.964M','Two WSOP bracelets + POY','win'],
    ['2014','+$7.100M','One Drop score year','win'],
    ['2016','-$1.247M','First public losing year','loss'],
    ['2022','+$1.626M','Saved by SHRB VII','win'],
    ['2023','-$2.228M','Worst public year','loss'],
    ['2024','PPC bracelet','Mixed-game resurgence','win'],
    ['2025','+$181K','Profitable WSOP summer','win'],
    ['2026','+$1.703M','Most profitable WSOP in years','win'],
    ['2026 PLO','$2.258M','8th bracelet prize','win'],
    ['Career P/L','$10.909M','Tracked 2013–2023 net','win']
  ];

  const pokerNewsFallback = [
    { title: 'Daniel Negreanu Wins Eighth WSOP Bracelet', date: 'PokerNews Daniel coverage', excerpt: 'A championship update centered on the $100K High Roller Pot-Limit Omaha victory.', url: 'https://www.pokernews.com/tags/daniel-negreanu/' },
    { title: 'Negreanu Wraps a Profitable 2026 WSOP', date: 'PokerNews Daniel coverage', excerpt: 'A Daniel-focused results story from his high-roller-heavy 2026 summer.', url: 'https://www.pokernews.com/tags/daniel-negreanu/' },
    { title: 'Daniel Negreanu Results, News, and Player Updates', date: 'Live Daniel feed', excerpt: 'Current Daniel-tagged tournament coverage, profile updates, and poker news.', url: 'https://www.pokernews.com/tags/daniel-negreanu/' }
  ];

  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  const absoluteUrl = (url) => { try { return new URL(url, 'https://www.pokernews.com').href; } catch { return 'https://www.pokernews.com/tags/daniel-negreanu/'; } };

  function addStatsExpansion() {
    const console = $('.stats-console');
    if (!console || $('.dn-stat-expansion')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'dn-stat-expansion';
    wrapper.innerHTML = `
      <div class="dn-stat-expansion__headline">
        <h3>More career context.</h3>
        <p>Additional statistical layers from the latest uploaded Daniel Negreanu career analysis: WSOP dominance, public P/L transparency, recent rebound, and high-roller evolution.</p>
      </div>
      <div class="dn-stat-grid">
        ${expandedStats.map(([label, value, note]) => `<article class="dn-stat-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong><span>${escapeHtml(note)}</span></article>`).join('')}
      </div>
      <div class="dn-ledger">
        ${ledgerStats.map(([year, value, note, type]) => `<span class="${type}"><em>${escapeHtml(year)}</em><b>${escapeHtml(value)}</b><small>${escapeHtml(note)}</small></span>`).join('')}
      </div>
    `;
    console.insertAdjacentElement('afterend', wrapper);
  }

  function buildMobileStoryReel() {
    const story = $('#story');
    if (!story || $('.mobile-story-reel')) return;
    const chapters = [
      ['01 / Toronto','The kid who wanted the game.','Early ambition, instinct, risk, and the feeling that poker was not luck — it was language.','video','/assets/story/toronto-family.mp4'],
      ['02 / Vegas','Pressure, bankroll, and belief.','The climb shows the rebuilds, the late nights, and the courage to sit back down.','image','https://placehold.co/1080x1600/080506/f4c76b?text=Vegas+Chapter'],
      ['03 / Kid Poker','The table finally listened.','The nickname becomes a character reveal: sharp reads, table talk, fearless youth, and a new kind of poker celebrity.','image','https://placehold.co/1080x1600/080506/f4c76b?text=Kid+Poker'],
      ['04 / Icon','Still shaping the game.','Broadcasts, vlogs, teaching, partnerships, Hall of Fame status, and a voice that helped define modern poker.','image','https://placehold.co/1080x1600/080506/f4c76b?text=Legacy']
    ];

    const reel = document.createElement('div');
    reel.className = 'mobile-story-reel';
    reel.innerHTML = chapters.map(([kicker, title, copy, type, src]) => `
      <article class="mobile-story-card">
        ${type === 'video'
          ? `<video muted loop playsinline preload="metadata"><source src="${src}" type="video/mp4"></video>`
          : `<img src="${src}" alt="${escapeHtml(title)} story visual" loading="lazy">`}
        <div class="mobile-story-card__copy"><span>${escapeHtml(kicker)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></div>
      </article>
    `).join('');
    story.appendChild(reel);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
        const video = $('video', entry.target);
        if (video) {
          if (entry.isIntersecting) video.play().catch(() => undefined);
          else video.pause();
        }
      });
    }, { threshold: 0.38 });
    $$('.mobile-story-card', reel).forEach((card) => io.observe(card));
  }

  function repairVaultMobile() {
    const vault = $('[data-vault]');
    if (!vault) return;
    const door = $('[data-vault-door]', vault);
    if (door) {
      door.setAttribute('aria-expanded', vault.classList.contains('is-open') ? 'true' : 'false');
      door.addEventListener('click', () => {
        window.setTimeout(() => door.setAttribute('aria-expanded', vault.classList.contains('is-open') ? 'true' : 'false'), 30);
      });
    }

    if (!$('.vault-close-toggle', vault)) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'vault-close-toggle';
      closeBtn.type = 'button';
      closeBtn.textContent = 'Close Vault';
      closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        vault.classList.remove('is-open');
        door?.setAttribute('aria-expanded', 'false');
      });
      vault.appendChild(closeBtn);
    }
  }

  function loadScript(src, id) {
    return new Promise((resolve, reject) => {
      const existing = id ? document.getElementById(id) : null;
      if (existing) { resolve(existing); return; }
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      if (id) script.id = id;
      script.charset = 'utf-8';
      script.onload = () => resolve(script);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  async function repairXFeed() {
    const card = $('.social-card-x');
    if (!card) return;
    card.innerHTML = `
      <h3>X / RealKidPoker</h3>
      <div class="x-feed-status">Loading RealKidPoker timeline…</div>
      <a class="twitter-timeline" data-height="560" data-theme="dark" data-chrome="nofooter noborders transparent" href="https://twitter.com/RealKidPoker?ref_src=twsrc%5Etfw">Posts by RealKidPoker</a>
    `;

    const timeline = $('.twitter-timeline', card);
    const status = $('.x-feed-status', card);

    try {
      await loadScript('https://platform.twitter.com/widgets.js', 'twitter-widgets-script');
      window.twttr?.widgets?.load?.(card);
      window.setTimeout(() => {
        const iframe = $('iframe', card);
        if (iframe) {
          status?.remove();
        } else {
          if (status) status.textContent = 'X timeline is being blocked by the browser or platform. Opening the live profile is the most reliable fallback.';
          timeline.insertAdjacentHTML('afterend', `<div class="social-fallback"><a href="https://x.com/RealKidPoker" target="_blank" rel="noreferrer">Open @RealKidPoker on X</a></div>`);
        }
      }, 5200);
    } catch {
      try {
        await loadScript('https://platform.x.com/widgets.js', 'x-widgets-script-alt');
        window.twttr?.widgets?.load?.(card);
      } catch {
        if (status) status.textContent = 'X timeline could not be loaded from the official widget script.';
      }
    }
  }

  async function renderPokerNews() {
    const container = $('#negreanu-news');
    if (!container) return;
    container.innerHTML = '<p>Loading Daniel Negreanu headlines…</p>';

    const render = (items) => {
      const clean = items.slice(0, 6).map((item) => ({
        title: item.title || 'Daniel Negreanu story',
        url: absoluteUrl(item.link || item.url),
        date: formatDate(item.pubDate || item.date),
        excerpt: stripHtml(item.description || item.excerpt || '').slice(0, 150)
      }));
      container.innerHTML = `<div class="news-grid-live">${clean.map((item) => `
        <a class="news-card" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
          <strong>${escapeHtml(item.title)}</strong>
          ${item.date ? `<span>${escapeHtml(item.date)}</span>` : ''}
          ${item.excerpt ? `<p>${escapeHtml(item.excerpt)}</p>` : ''}
        </a>
      `).join('')}</div>`;
    };

    try {
      const rssUrl = encodeURIComponent('https://www.pokernews.com/rss.php');
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`, { cache: 'no-store' });
      const data = await response.json();
      const keyword = /daniel\s+negreanu|negreanu|kid\s+poker/i;
      const filtered = (data.items || []).filter((item) => keyword.test(`${item.title || ''} ${item.description || ''} ${(item.categories || []).join(' ')}`));
      if (filtered.length) { render(filtered); return; }
    } catch (error) {
      console.warn('PokerNews RSS filter failed', error);
    }

    try {
      const tagUrl = encodeURIComponent('https://www.pokernews.com/tags/daniel-negreanu/');
      const response = await fetch(`https://api.allorigins.win/raw?url=${tagUrl}`, { cache: 'no-store' });
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const links = $$('a[href*="/news/"]', doc)
        .map((a) => ({ title: a.textContent.trim(), url: absoluteUrl(a.getAttribute('href')), excerpt: 'Daniel Negreanu tagged story from PokerNews.' }))
        .filter((item, index, arr) => item.title && arr.findIndex((x) => x.title === item.title) === index)
        .slice(0, 6);
      if (links.length) { render(links); return; }
    } catch (error) {
      console.warn('PokerNews tag scrape failed', error);
    }

    render(pokerNewsFallback);
  }

  function enhanceButtons() {
    $$('.button,.header-cta,.feature-tile,.partner-links a,.vault-door,.vault-close-toggle,.youtube-card,.news-card').forEach((el) => {
      el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
      ['pointerup','pointercancel','pointerleave'].forEach((type) => el.addEventListener(type, () => el.classList.remove('is-pressed')));
    });
  }

  function init() {
    addStatsExpansion();
    buildMobileStoryReel();
    repairVaultMobile();
    repairXFeed();
    renderPokerNews();
    enhanceButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  document.addEventListener('kidpoker:site-ready', () => {
    repairXFeed();
    renderPokerNews();
  }, { once: true });
})();
