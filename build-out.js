(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);

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
      .below-hero-bracelet-band{width:100%;margin:0;padding:0;background:#030304;border-block:1px solid rgba(244,199,107,.18);overflow:hidden;position:relative;z-index:2}
      .below-hero-bracelet-band img{display:block;width:100%;height:auto;min-height:clamp(180px,27vw,520px);object-fit:cover;object-position:center center;filter:saturate(1.06) contrast(1.04)}
      .vault-wheel{display:none!important}.vault-door{gap:.65rem!important}.vault-door strong{margin-top:0!important}
      .vault-interior{padding:clamp(1rem,2.4vw,2.4rem)!important;background:radial-gradient(circle at 50% 12%,rgba(255,219,132,.16),transparent 18rem),linear-gradient(180deg,#14100b,#060504 58%,#050403)!important;box-shadow:inset 0 0 115px rgba(0,0,0,.92),inset 0 0 0 1px rgba(244,199,107,.18)!important}
      .vault-section .trophy-grid-eight{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(.7rem,1.35vw,1.25rem)!important;min-height:100%;align-content:center!important;padding:clamp(.55rem,1.2vw,1rem)!important;background:linear-gradient(180deg,rgba(255,235,177,.05),rgba(0,0,0,.22));border-radius:28px;border:1px solid rgba(244,199,107,.18);box-shadow:inset 0 0 0 8px rgba(0,0,0,.16)}
      .vault-section .trophy-card{min-height:clamp(180px,18vw,248px)!important;aspect-ratio:1.1/.92!important;border-radius:24px!important;padding:clamp(1rem,1.5vw,1.4rem)!important;align-content:end!important;background:radial-gradient(circle at 50% 28%,rgba(255,233,164,.20),transparent 35%),linear-gradient(180deg,#312616,#090705 67%,#040303)!important;border:1px solid rgba(255,216,130,.38)!important;box-shadow:0 0 0 10px rgba(10,7,5,.68),0 0 0 11px rgba(244,199,107,.22),inset 0 0 60px rgba(0,0,0,.62),0 22px 48px rgba(0,0,0,.58)!important}
      .vault-section .trophy-card:before{inset:-13px!important;border-radius:32px!important;border:2px solid rgba(216,163,73,.5)!important;background:linear-gradient(135deg,rgba(255,241,190,.1),rgba(0,0,0,.08));box-shadow:inset 0 0 36px rgba(0,0,0,.8);z-index:-1}
      .vault-section .bracelet{margin:0 auto auto!important;filter:drop-shadow(0 16px 24px rgba(0,0,0,.55))}.vault-section .trophy-card strong{font-size:clamp(1.05rem,1.4vw,1.35rem)!important}.vault-section .trophy-card small{font-size:.9rem!important}
      @media (max-width:900px){.vault-section .trophy-grid-eight{grid-template-columns:repeat(2,minmax(0,1fr))!important}.vault-stage,.vault-interior{min-height:900px!important}}
      .gallery-wall{background:radial-gradient(circle at 30% 8%,rgba(244,199,107,.13),transparent 20rem),linear-gradient(180deg,rgba(31,20,12,.96),rgba(8,5,4,.98)),repeating-linear-gradient(90deg,#21150d 0 150px,#170f0a 150px 300px)!important;box-shadow:inset 0 0 120px rgba(0,0,0,.72)!important}
      .photo-wall{background:radial-gradient(circle at 48% 0,rgba(255,220,141,.08),transparent 18rem),linear-gradient(180deg,rgba(43,27,16,.82),rgba(14,8,5,.94)),repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 1px,transparent 1px 72px)!important;border:1px solid rgba(244,199,107,.2)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.04),inset 0 0 80px rgba(0,0,0,.72),0 30px 90px rgba(0,0,0,.45)!important}
      .gallery-card{padding:5px!important;border-radius:18px!important;background:linear-gradient(135deg,#fff1b8,#d6a447 34%,#6f4518 68%,#ffe7a0)!important;box-shadow:0 22px 52px rgba(0,0,0,.48),inset 0 0 0 1px rgba(255,255,255,.24)!important}
      .gallery-card:before{content:'';position:absolute;inset:5px;border-radius:13px;border:1px solid rgba(255,244,204,.65);pointer-events:none;z-index:3}.gallery-card img{border-radius:12px!important}.gallery-card span{left:5px!important;right:5px!important;bottom:5px!important;border-radius:0 0 12px 12px!important}
      .social-wall{align-items:start!important}.social-card{min-width:0;overflow:hidden}.social-card-ig .instagram-media{max-width:100%!important;min-width:0!important;width:100%!important;margin:0 auto!important;border-radius:18px!important;overflow:hidden}.social-card-x iframe{width:100%!important}.social-fallback{display:grid;gap:.75rem;margin-top:1rem;padding:1rem;border-radius:18px;background:rgba(244,199,107,.08);border:1px solid rgba(244,199,107,.18);color:#f8efd9}.social-fallback a,.news-fallback a{color:#ffe59b;font-weight:900;text-decoration:none}.news-fallback{display:grid;gap:.75rem}.news-fallback li{list-style:none;padding:.85rem 0;border-bottom:1px solid rgba(255,255,255,.09)}
      .facebook-posts{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:1rem!important;align-items:start!important}.facebook-posts iframe{width:100%!important;height:520px!important;max-width:100%!important;border-radius:18px!important;background:#fff!important}.social-card-facebook{grid-column:1/-1!important}.social-card-facebook h3{margin-bottom:1rem!important}
      @media (max-width:1050px){.facebook-posts{grid-template-columns:1fr!important}.facebook-posts iframe{height:540px!important}}
    `;
    document.head.appendChild(style);
  }

  function addBelowHeroBraceletBand() {
    const next = $('.messi-next');
    if (!next || $('.below-hero-bracelet-band')) return;
    next.insertAdjacentHTML('afterend', '<section class="below-hero-bracelet-band" aria-label="Daniel Negreanu bracelet celebration"><img src="/assets/icons/below-hero-bracelet-congrats.png" alt="Daniel Negreanu bracelet celebration graphic" loading="eager" decoding="async"></section>');
  }

  function loadScript(id, src, cb) {
    const existing = document.getElementById(id);
    if (existing) { cb?.(); return; }
    const script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    script.onload = () => cb?.();
    document.body.appendChild(script);
  }

  function initStats() {
    const year = $('[data-stat-year]');
    const view = $('[data-stat-view]');
    const main = $('[data-stat-main]');
    const sub = $('[data-stat-sub]');
    const kicker = $('[data-stat-kicker]');
    const bars = $('[data-stat-bars]');
    const feed = $('[data-stat-feed]');
    if (!year || !main || !bars || !feed) return;
    const update = () => {
      const selected = statYears[year.value] || statYears.career;
      const mode = view?.value || 'earnings';
      main.textContent = selected.main;
      sub.textContent = mode === 'rankings' ? 'Rankings view: all-time, Canada, popularity, and current list context.' : selected.sub;
      kicker.textContent = mode === 'regions' ? 'Regional Earnings' : selected.kicker;
      const max = Math.max(...selected.bars.map(([,v]) => v));
      bars.innerHTML = selected.bars.map(([label, value]) => `<div class="stat-bar"><i style="height:${Math.max(6, (value / max) * 100)}%"></i><span>${label}</span></div>`).join('');
      const items = mode === 'rankings'
        ? [['All-Time Money List','9th'], ['Canada All-Time','1st'], ['Popularity Ranking','1st'], ['Best Live Cash','$8.288M']]
        : mode === 'regions'
          ? [['Americas','$56.1M+'], ['Europe','$6.2M+'], ['Oceania','$2.75M+'], ['Rest of World','$867K+']]
          : selected.feed;
      feed.innerHTML = items.map(([a,b]) => `<article><strong>${a}</strong><span>${b}</span></article>`).join('');
    };
    year.addEventListener('change', update);
    view?.addEventListener('change', update);
    update();
  }

  function initVault() {
    const vault = $('[data-vault]');
    const button = $('[data-vault-door]');
    if (!vault || !button) return;
    button.addEventListener('click', () => {
      vault.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    });
  }

  function initGallery() {
    const wall = $('[data-gallery-wall]');
    const lightbox = $('[data-gallery-lightbox]');
    if (!wall || !lightbox) return;
    const img = $('[data-gallery-lightbox-img]', lightbox);
    const title = $('[data-gallery-lightbox-title]', lightbox);
    const context = $('[data-gallery-lightbox-context]', lightbox);
    const close = $('[data-gallery-close]', lightbox);
    wall.innerHTML = galleryItems.map((item, index) => {
      const tilt = [-1.3, .85, -.45, 1.1, -.8, .55, -1.05, .75][index % 8];
      return `<button class="gallery-card" style="--tilt:${tilt}deg" type="button" data-full="${item[1]}" data-title="${item[2].replace(/"/g, '&quot;')}" data-context="${item[3].replace(/"/g, '&quot;')}"><img src="${item[0]}" alt="${item[2].replace(/"/g, '&quot;')}" loading="lazy"><span>${item[2]}</span></button>`;
    }).join('');
    const open = (card) => {
      img.src = card.dataset.full;
      img.alt = card.dataset.title || 'Daniel Negreanu gallery image';
      title.textContent = card.dataset.title || 'Daniel Negreanu';
      context.textContent = card.dataset.context || 'Context can be added here.';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    };
    const shut = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      img.removeAttribute('src');
    };
    wall.addEventListener('click', (event) => {
      const card = event.target.closest('.gallery-card');
      if (card) open(card);
    });
    close?.addEventListener('click', shut);
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) shut(); });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.classList.contains('active')) shut(); });
  }

  function videoCard(videoId, title, note = '') {
    const safeTitle = title.replace(/"/g, '&quot;');
    return `<a class="youtube-card" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noreferrer"><div class="youtube-thumb"><img src="https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg" alt="${safeTitle}" loading="lazy" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${videoId}/hqdefault.jpg';"><span class="youtube-play" aria-hidden="true"></span></div><h3>${title}</h3><p>${note || 'Daniel Negreanu YouTube upload'}</p></a>`;
  }

  function initYouTubeFeed() {
    const container = $('#dnegs-latest-videos');
    if (!container) return;
    const fallback = () => {
      container.innerHTML = [
        videoCard('mqSmE75E5vY', 'WILD MAIN EVENT DAY 2! - 2026 WSOP VLOG Day 44', 'Manual fallback video'),
        videoCard('apWXs5sw4aI', 'The WSOP POY CONTROVERSY Explained - 2026 WSOP VLOG Day 43', 'Manual fallback video'),
        videoCard('kq1caOO9B-Q', 'WSOP VLOG Day 42', 'Manual fallback video')
      ].join('');
    };
    const channelId = 'UC0w4AA42ItXQEb9aZld87-w';
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    fetch(apiUrl)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('feed failed')))
      .then((data) => {
        const videos = (data.items || []).slice(0, 3);
        if (!videos.length) return fallback();
        container.innerHTML = videos.map((video) => {
          const videoId = (video.link.split('v=')[1] || '').split('&')[0] || (video.guid || '').split(':').pop();
          return videoCard(videoId, video.title, new Date(video.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        }).join('');
      })
      .catch(fallback);
  }

  function newsFallback(container) {
    container.innerHTML = '<ul class="news-fallback"><li><a href="https://www.pokernews.com/tags/daniel-negreanu/" target="_blank" rel="noreferrer">Latest Daniel Negreanu stories on PokerNews</a><small>Fallback link</small></li><li><a href="https://www.google.com/search?q=Daniel+Negreanu+poker+news" target="_blank" rel="noreferrer">Search current Daniel Negreanu poker news</a><small>Live search</small></li><li><a href="https://www.wsop.com/players/profile/?playerid=267" target="_blank" rel="noreferrer">Daniel Negreanu WSOP player profile</a><small>Official tournament context</small></li></ul>';
  }

  function initNegreanuNews() {
    const container = $('#negreanu-news');
    if (!container) return;
    const rssUrl = 'https://www.pokernews.com/rss.php';
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    fetch(proxyUrl)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('news failed')))
      .then((data) => {
        const keyword = /daniel negreanu|negreanu/i;
        const filtered = (data.items || []).filter((item) => {
          const inTitle = item.title && keyword.test(item.title);
          const inDesc = item.description && keyword.test(item.description);
          const inCat = item.categories && item.categories.some((cat) => keyword.test(cat));
          return inTitle || inDesc || inCat;
        }).slice(0, 8);
        if (!filtered.length) return newsFallback(container);
        container.innerHTML = `<ul>${filtered.map((item) => `<li><a href="${item.link}" target="_blank" rel="noreferrer">${item.title}</a>${item.pubDate ? `<small>${new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</small>` : ''}</li>`).join('')}</ul>`;
      })
      .catch(() => newsFallback(container));
  }

  function initSocialEmbeds() {
    const xCard = $('.social-card-x');
    const xAnchor = $('.twitter-timeline', xCard || document);
    if (xAnchor) {
      xAnchor.href = 'https://twitter.com/RealKidPoker?ref_src=twsrc%5Etfw';
      xAnchor.dataset.height = xAnchor.dataset.height || '560';
      xAnchor.dataset.theme = 'dark';
      loadScript('twitter-widgets-script', 'https://platform.twitter.com/widgets.js', () => window.twttr?.widgets?.load?.(xCard || document));
      window.setTimeout(() => {
        if (xCard && !xCard.querySelector('iframe') && !xCard.querySelector('.social-fallback')) {
          xCard.insertAdjacentHTML('beforeend', '<div class="social-fallback"><strong>X feed preview may be blocked by browser privacy settings.</strong><a href="https://x.com/RealKidPoker" target="_blank" rel="noreferrer">Open @RealKidPoker on X</a></div>');
        }
      }, 4200);
    }

    const igCard = $('.social-card-ig');
    loadScript('instagram-embed-script', 'https://www.instagram.com/embed.js', () => window.instgrm?.Embeds?.process?.());
    window.setTimeout(() => {
      if (igCard && !igCard.querySelector('iframe') && !igCard.querySelector('.social-fallback')) {
        igCard.insertAdjacentHTML('beforeend', '<div class="social-fallback"><strong>Instagram profile embed may be blocked by browser privacy settings.</strong><a href="https://www.instagram.com/dnegspoker/" target="_blank" rel="noreferrer">Open @dnegspoker on Instagram</a></div>');
      }
    }, 4200);

    const hydrateFacebook = () => {
      document.querySelectorAll('.facebook-posts iframe[data-defer-src]').forEach((iframe) => {
        iframe.src = iframe.dataset.deferSrc;
        iframe.width = '500';
        iframe.height = '520';
        iframe.style.width = '100%';
        iframe.style.height = '520px';
      });
    };
    document.addEventListener('kidpoker:site-ready', () => window.setTimeout(hydrateFacebook, 200), { once: true });
    window.setTimeout(hydrateFacebook, 3200);
  }

  function init() {
    injectPolishStyles();
    addBelowHeroBraceletBand();
    initStats();
    initVault();
    initGallery();
    initYouTubeFeed();
    initNegreanuNews();
    initSocialEmbeds();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();