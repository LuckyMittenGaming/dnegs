(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const statYears = {
    career: { main: '$60,437,154', sub: 'Career live tournament earnings snapshot', kicker: 'Total Live Earnings', feed: [['Best Live Cash', '$8,288,001'], ['All-Time Money List', '9th'], ['Canada All-Time Money List', '1st'], ['Popularity Ranking', '1st']], bars: [['2026', 2.878], ['2025', 3.152], ['2024', 2.824], ['2023', 1.709], ['2022', 4.750], ['2014', 10.284], ['2004', 4.466]] },
    2026: { main: '$2,878,459', sub: '2026 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$2.878M'], ['Americas', '$2.878M'], ['Best year view', 'Active'], ['Context', 'Recent results']], bars: [['World', 2.878], ['Americas', 2.878], ['Rest', 0.01]] },
    2025: { main: '$3,151,800', sub: '2025 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$3.152M'], ['Americas', '$3.152M'], ['Oceania', '-'], ['Europe', '-']], bars: [['World', 3.152], ['Americas', 3.152], ['Europe', 0.01], ['Oceania', 0.01]] },
    2024: { main: '$2,823,696', sub: '2024 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$2.824M'], ['Americas', '$2.824M'], ['Oceania', '-'], ['Europe', '-']], bars: [['World', 2.824], ['Americas', 2.824], ['Europe', 0.01], ['Oceania', 0.01]] },
    2023: { main: '$1,708,503', sub: '2023 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$1.709M'], ['Americas', '$1.709M'], ['Oceania', '-'], ['Europe', '-']], bars: [['World', 1.709], ['Americas', 1.709], ['Europe', 0.01], ['Oceania', 0.01]] },
    2022: { main: '$4,749,574', sub: '2022 tournament earnings snapshot', kicker: 'Selected Year', feed: [['World', '$4.750M'], ['Americas', '$4.595M'], ['Europe', '$155K'], ['Oceania', '-']], bars: [['World', 4.750], ['Americas', 4.595], ['Europe', .155], ['Oceania', .01]] },
    2014: { main: '$10,284,118', sub: 'Massive 2014 earnings year', kicker: 'Selected Year', feed: [['World', '$10.284M'], ['Americas', '$8.672M'], ['Oceania', '$1.612M'], ['Europe', '-']], bars: [['World', 10.284], ['Americas', 8.672], ['Oceania', 1.612], ['Europe', .01]] },
    2004: { main: '$4,465,907', sub: 'Breakout championship-era year', kicker: 'Selected Year', feed: [['World', '$4.466M'], ['Americas', '$3.599M'], ['Rest of World', '$867K'], ['Momentum', 'Explosive']], bars: [['World', 4.466], ['Americas', 3.599], ['Rest', .867]] }
  };

  const galleryItems = [
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%20Profile%20Picture.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%20Profile%20Picture.jpg','Daniel Negreanu','Profile image from the Hendon Mob gallery archive.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/revpix170223APAwards8923.JPG','https://pokerdb.thehendonmob.com/pictures/revpix170223APAwards8923.JPG','Awards Night','A gallery-wall moment for recognition, media, and personality.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%202.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%202.jpg','Kid Poker Portrait','A legacy portrait slot ready for richer caption context.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/NEIL1778_EPT10BAR_Daniel_Negreanu_Neil%20Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/NEIL1778_EPT10BAR_Daniel_Negreanu_Neil%20Stoddart.jpg','2013 EPT Barcelona','European Poker Tour Barcelona archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/8G2A7207_EPT9MON_Daniel_Negreanu_Neil%20Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/8G2A7207_EPT9MON_Daniel_Negreanu_Neil%20Stoddart.jpg','2013 EPT Grand Final','Monte Carlo era gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu_4.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu_4.jpg','WSOP APAC','World Series of Poker Asia-Pacific gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/NEIL5062_PCA2013_Daniel_Negreanu_Neil%20Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/NEIL5062_PCA2013_Daniel_Negreanu_Neil%20Stoddart.jpg','2013 PCA','PokerStars Caribbean Adventure gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu_1671.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu_1671.jpg','EPT Monte Carlo 2010','Monte Carlo archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%2010%20000%20NLHE%20Championship.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%2010%20000%20NLHE%20Championship.jpg','$10K NLH Championship','WSOP 2010 championship archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/daniel%20negreanu.jpg','https://pokerdb.thehendonmob.com/pictures/daniel%20negreanu.jpg','WSOP 2012 Event #50','No Limit Hold’em event gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Daniel%20Negreanu%20WSOP%202011%203000%20PLO.jpg','https://pokerdb.thehendonmob.com/pictures/Daniel%20Negreanu%20WSOP%202011%203000%20PLO.jpg','WSOP 2011 PLO','Pot Limit Omaha archive image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/_MG_5364_Daniel_Negreanu_EPT7PCA_Neil_Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/_MG_5364_Daniel_Negreanu_EPT7PCA_Neil_Stoddart.jpg','2011 PCA Super High Roller','High roller era image from the archive.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/daniel_negreanu_day22_appt_sydney.jpg','https://pokerdb.thehendonmob.com/pictures/daniel_negreanu_day22_appt_sydney.jpg','2010 APPT Sydney','Asia Pacific Poker Tour Sydney gallery image.'],
    ['https://pokerdb.thehendonmob.com/pictures/200/Day%204%20Daniel_Negreanu_EPT7VIE_Neil_Stoddart.jpg','https://pokerdb.thehendonmob.com/pictures/Day%204%20Daniel_Negreanu_EPT7VIE_Neil_Stoddart.jpg','EPT Vienna Chip Leader','Final-table energy and tournament pressure.']
  ];

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
      const tilt = [-2.2, 1.4, -0.7, 2.1, -1.6, .9, -2.8, 1.8][index % 8];
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
    return `<article class="youtube-card"><div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" title="${title.replace(/"/g, '&quot;')}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><h3>${title}</h3><p>${note || 'Daniel Negreanu YouTube upload'}</p></article>`;
  }

  function initYouTubeFeed() {
    const container = $('#dnegs-latest-videos');
    if (!container) return;
    const fallback = () => {
      container.innerHTML = [
        videoCard('mqSmE75E5vY', 'WSOP Vlog — Day 44', 'Manual fallback video'),
        videoCard('apWXs5sw4aI', 'WSOP Vlog — Day 43', 'Manual fallback video'),
        videoCard('kq1caOO9B-Q', 'WSOP Vlog — Day 42', 'Manual fallback video')
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

  function init() {
    initStats();
    initVault();
    initGallery();
    initYouTubeFeed();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
