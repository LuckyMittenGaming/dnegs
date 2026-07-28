(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;
  const galleryBg = '/assets/video/gallery-background-final.png';

  const timeline = [
    ['1997',0.076,'$75K','First recorded live result year'],['1998',0.279,'$279K','Early recorded momentum'],['1999',0.360,'$360K','Breakout pressure'],['2000',0.010,'$10K','Quiet archive year'],['2001',0.320,'$320K','Early-career momentum'],['2002',0.531,'$531K','Half-million foundation'],['2003',0.533,'$533K','Pre-boom ignition'],['2004',4.466,'$4.466M','Two WPT titles + WSOP POY + CardPlayer POY'],['2005',0.323,'$323K','Post-boom reset'],['2006',1.940,'$1.940M','TV-era strength'],['2007',0.700,'$700K','Post-boom circuit'],['2008',1.302,'$1.302M','WSOP bracelet year'],['2009',1.225,'$1.225M','Global circuit'],['2010',0.684,'$684K','Americas + Europe'],['2011',1.533,'$1.533M','PCA Super High Roller runner-up'],['2012',1.690,'$1.690M','High roller transition'],['2013',3.209,'$3.209M','Two WSOP bracelets + WSOP POY'],['2014',10.284,'$10.284M','One Drop best cash year'],['2015',2.482,'$2.482M','WSOP Main Event 11th'],['2016',0.302,'$302K','Public losing year'],['2017',2.701,'$2.701M','High-roller variance'],['2018',4.510,'$4.510M','SHRB IV runner-up'],['2019',2.223,'$2.223M','WSOP $100K runner-up'],['2020',0.01,'N/A','Live poker pause'],['2021',3.122,'$3.122M','WSOP volume rebound'],['2022',4.750,'$4.750M','Super High Roller Bowl VII victory'],['2023',1.709,'$1.709M','Public reset year'],['2024',2.824,'$2.824M','Poker Players Championship bracelet'],['2025',3.152,'$3.152M','Profitable WSOP summer'],['2026',2.878,'$2.878M','Eighth bracelet year']
  ];

  const statsData = {
    career: { main:'$60.665M', kicker:'Tracked Live Earnings', sub:'Career dashboard: live earnings, best cash, bracelets, WPT titles, WSOP awards, public P/L texture, regional profile, and the modern rebound arc.', rings:[['9th','All-Time Money List'],['1st','Canada All-Time'],['$8.288M','Best Live Cash']], feed:[['WSOP Earnings','$28.918M'],['WSOP Bracelets','8'],['WPT Titles','2'],['WSOP POY','2x']], regions:[['World',60.665,'$60.665M'],['Americas',56.1,'$56.1M+'],['Europe',6.2,'$6.2M+'],['Oceania',2.75,'$2.75M+']], spotlight:[['Legacy','A multi-era career with peaks in WPT, WSOP, mixed games, high rollers, and modern content.'],['Transparency','Public profit/loss tracking turns the stats section into a living performance story.'],['Rebound','The 2024 PPC bracelet and 2026 bracelet create a true late-career comeback arc.']] },
    2026:{main:'$2.878M',kicker:'2026 Earnings',sub:'Driven by the eighth bracelet: $100K High Roller Pot-Limit Omaha for $2.257M.',rings:[['8th','WSOP Bracelet'],['+$1.703M','WSOP Net'],['15','WSOP Cashes']],feed:[['$100K PLO','1st / $2.257M'],['$50K NLH','8th / $226K'],['$25K Mixed','7th / $153K'],['Lowball Draw','20th / $21K']],regions:[['World',2.878,'$2.878M'],['Americas',2.878,'$2.878M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Headline','Eighth bracelet creates the modern trophy-room headline.'],['Format','High Roller Pot-Limit Omaha.'],['Signal','Still live in elite buy-in fields.']]},
    2025:{main:'$3.152M',kicker:'2025 Earnings',sub:'Profitable WSOP summer with multiple high-buy-in deep runs.',rings:[['+$181K','WSOP Profit'],['$531K','$250K SHR'],['$314K','Omaha Hi-Lo 2nd']],feed:[['Omaha Hi-Lo','2nd / $313K'],['$250K SHR','9th / $531K'],['$100K PLO','15th / $209K'],['Mixed Big Bet','4th / $61K']],regions:[['World',3.152,'$3.152M'],['Americas',3.152,'$3.152M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Trend','Profitable volume after the 2023 reset.'],['Texture','High-buy-in schedule, lower noise.'],['Story','The comeback starts feeling real.']]},
    2024:{main:'$2.824M',kicker:'2024 Earnings',sub:'Poker Players Championship bracelet year and major mixed-game resurgence.',rings:[['7th','Bracelet'],['$1.179M','$50K PPC Win'],['PPC','Mixed games']],feed:[['$50K PPC','1st / $1.179M'],['PLO Series','PGT win'],['Paradise','High variance'],['Volume Shift','Quality over quantity']],regions:[['World',2.824,'$2.824M'],['Americas',2.824,'$2.824M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Resurgence','The PPC win re-centers the legacy.'],['Skill Signal','Mixed-game credibility at the highest level.'],['Narrative','A reset becomes a rebound.']]},
    2023:{main:'$1.709M',kicker:'2023 Earnings',sub:'Publicly documented down year that triggered a strategic reset.',rings:[['-$2.228M','Public P/L'],['145','Events'],['Reset','Strategy shift']],feed:[['P/L Ledger','Worst public year'],['Adjustment','Volume reduction'],['Focus','Higher-equity spots'],['Reset','2024 rebuild']],regions:[['World',1.709,'$1.709M'],['Americas',1.709,'$1.709M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Truth','The hard years make the comeback stronger.'],['Lesson','Public losses create context.'],['Pivot','The schedule gets smarter after this.']]},
    2022:{main:'$4.750M',kicker:'2022 Earnings',sub:'Saved by the $3.312M Super High Roller Bowl VII victory.',rings:[['+$1.626M','Public P/L'],['$3.312M','SHRB VII Win'],['107','Events']],feed:[['SHRB VII','1st / $3.312M'],['PokerGO Cup','Win / $350K'],['WSOP','High variance'],['ITM Rate','21.5%']],regions:[['World',4.750,'$4.750M'],['Americas',4.595,'$4.595M'],['Europe',0.155,'$155K'],['Oceania',0.01,'-']],spotlight:[['Moment','One elite win flips the annual story.'],['Pressure','High-volume schedule with high variance.'],['Result','One of the strongest modern gross years.']]},
    2021:{main:'$3.122M',kicker:'2021 Earnings',sub:'Strong WSOP volume year: 55 WSOP events and 18 cashes.',rings:[['18','WSOP Cashes'],['3rd','POY Race'],['+$584K','Public P/L']],feed:[['WSOP Volume','55 events'],['Cashes','18'],['Profit','+$584K'],['Late Surge','PLO + NLHE']],regions:[['World',3.122,'$3.122M'],['Americas',3.122,'$3.122M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Volume','A grind-heavy year.'],['POY','Deep Player of the Year race.'],['Context','Back into live tournament rhythm.']]},
    2020:{main:'N/A',kicker:'2020 Earnings',sub:'Live tournament poker was largely suspended due to COVID disruption.',rings:[['N/A','Live Volume'],['Pause','Circuit reset'],['Study','Technical rebuild']],feed:[['COVID Year','Live poker suspended'],['Heads-Up','Technical work'],['Solver Era','Adaptation'],['Reset','Modern baseline']],regions:[['World',0.01,'N/A'],['Americas',0.01,'-'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Pause','Live poker interruption.'],['Adaptation','Study and technical rebuilding.'],['Story','Modern chapter begins after this.']]},
    2019:{main:'$2.223M',kicker:'2019 Earnings',sub:'Runner-up in the WSOP $100K High Roller for $1.726M.',rings:[['$1.726M','Best Cash'],['2nd','$100K HR'],['WSOP','Major run']],feed:[['$100K HR','2nd / $1.726M'],['Year Profit','+$832K'],['High Roller','Modern adaptation'],['WSOP','Deep finish']],regions:[['World',2.223,'$2.223M'],['Americas',2.056,'$2.056M'],['Europe',0.167,'$167K'],['Oceania',0.01,'-']],spotlight:[['Score','Seven-figure WSOP high roller run.'],['Era','Modern high roller proof point.'],['Form','Big-field and elite-field versatility.']]},
    2018:{main:'$4.510M',kicker:'2018 Earnings',sub:'$3M runner-up finish in Super High Roller Bowl IV.',rings:[['$3.000M','Best Cash'],['2nd','SHRB IV'],['+$1.412M','Public P/L']],feed:[['SHRB IV','2nd / $3.0M'],['Year P/L','+$1.412M'],['High Roller','$300K buy-in'],['Form','Major score']],regions:[['World',4.510,'$4.510M'],['Americas',4.510,'$4.510M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['High Roller','One of the modern headline scores.'],['Scale','$300K buy-in environment.'],['Result','Major annual profit engine.']]},
    2017:{main:'$2.701M',kicker:'2017 Earnings',sub:'Near break-even public P/L year despite strong gross results.',rings:[['-$86K','Public P/L'],['$2.701M','Gross'],['Variance','High roller era']],feed:[['P/L Ledger','-$86K'],['Gross','$2.701M'],['High Rollers','Variance'],['Transition','Solver era']],regions:[['World',2.701,'$2.701M'],['Americas',2.549,'$2.549M'],['Europe',0.152,'$152K'],['Oceania',0.01,'-']],spotlight:[['Variance','Gross earnings do not always mean profit.'],['Modernity','Useful high-roller-era datapoint.'],['Context','Transparency makes this interesting.']]},
    2016:{main:'$302K',kicker:'2016 Earnings',sub:'First public losing year in the tracked P/L ledger.',rings:[['-$1.247M','Public P/L'],['$302K','Gross'],['Reset','Warning year']],feed:[['P/L Ledger','-$1.247M'],['Gross Cashes','$302K'],['Variance','Severe'],['Lesson','Modernization']],regions:[['World',0.302,'$302K'],['Americas',0.206,'$206K'],['Europe',0.097,'$97K'],['Oceania',0.01,'-']],spotlight:[['Tension','First major public P/L warning.'],['Lesson','Not every chapter is a trophy case.'],['Value','Honesty fans remember.']]},
    2015:{main:'$2.482M',kicker:'2015 Earnings',sub:'Steady year including 11th place in the WSOP Main Event.',rings:[['+$953K','Public P/L'],['11th','WSOP Main Event'],['$526K','Main Event Cash']],feed:[['Main Event','11th / $526K'],['P/L Ledger','+$953K'],['WSOP','Deep run'],['Form','Consistent']],regions:[['World',2.482,'$2.482M'],['Americas',1.516,'$1.516M'],['Europe',0.966,'$966K'],['Oceania',0.01,'-']],spotlight:[['Main Event','Deep run in poker’s biggest event.'],['Consistency','Strong seven-figure performance.'],['Context','Bridge between legacy and modern Daniel.']]},
    2014:{main:'$10.284M',kicker:'2014 Earnings',sub:'Massive One Drop runner-up year; his best live cash remains $8.288M.',rings:[['$8.288M','Best Live Cash'],['2nd','One Drop'],['+$7.100M','Public P/L']],feed:[['One Drop','2nd / $8.288M'],['Aussie Millions','4th / $1.12M'],['Year P/L','+$7.100M'],['Peak Gross','$10.284M']],regions:[['World',10.284,'$10.284M'],['Americas',8.672,'$8.672M'],['Oceania',1.612,'$1.612M'],['Europe',0.01,'-']],spotlight:[['Peak','Tallest spike in the chart.'],['One Drop','One of poker’s biggest paydays.'],['Legacy','Best live cash belongs front and center.']]},
    2013:{main:'$3.209M',kicker:'2013 Earnings',sub:'Two WSOP bracelets and Daniel’s second WSOP Player of the Year award.',rings:[['2','WSOP Bracelets'],['POY','WSOP Player of Year'],['+$1.964M','Public P/L']],feed:[['WSOP APAC','Main Event win'],['WSOP Europe','High Roller win'],['POY','Second WSOP POY'],['EPT Barcelona','Runner-up HR']],regions:[['World',3.209,'$3.209M'],['Americas',0.89,'$890K'],['Europe',0.89,'$890K+'],['Oceania',1.087,'$1.087M']],spotlight:[['Bracelets','Two WSOP titles in one season arc.'],['Award','Second WSOP POY.'],['Range','Global performance across regions.']]},
    2012:{main:'$1.690M',kicker:'2012 Earnings',sub:'Strong pre-super-high-roller transition year.',rings:[['$1.690M','Gross'],['Global','Circuit'],['Transition','High roller era']],feed:[['World','$1.690M'],['Americas','$441K'],['Rest','$1.249M'],['Context','Global circuit']],regions:[['World',1.690,'$1.690M'],['Americas',0.441,'$441K'],['Europe',1.249,'$1.249M'],['Oceania',0.01,'-']],spotlight:[['Global','The map matters here.'],['Transition','Before super high rollers exploded.'],['Consistency','Another seven-figure year.']]},
    2011:{main:'$1.533M',kicker:'2011 Earnings',sub:'PCA Super High Roller runner-up for $1M.',rings:[['$1.000M','PCA SHR'],['2nd','Super High Roller'],['$1.533M','Gross']],feed:[['PCA SHR','2nd / $1.0M'],['World','$1.533M'],['Americas','$1.533M'],['High Roller','Early era']],regions:[['World',1.533,'$1.533M'],['Americas',1.533,'$1.533M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['PCA','Early super-high-roller era.'],['Cash','Seven-figure runner-up finish.'],['Signal','Daniel adapting to bigger buy-ins.']]},
    2010:{main:'$684K',kicker:'2010 Earnings',sub:'Moderate year before the next major international surge.',rings:[['$684K','Gross'],['$309K','Americas'],['$339K','Europe']],feed:[['World','$684K'],['Americas','$309K'],['Europe','$339K'],['Oceania','$36K']],regions:[['World',0.684,'$684K'],['Americas',0.309,'$309K'],['Europe',0.339,'$339K'],['Oceania',0.036,'$36K']],spotlight:[['Balanced','Distributed regional year.'],['Europe','Strong non-US component.'],['Context','Between legacy peaks.']]},
    2009:{main:'$1.225M',kicker:'2009 Earnings',sub:'Seven-figure year across Americas and Europe.',rings:[['$1.225M','Gross'],['$808K','Americas'],['$417K','Europe']],feed:[['World','$1.225M'],['Americas','$808K'],['Europe','$417K'],['Context','Global circuit']],regions:[['World',1.225,'$1.225M'],['Americas',0.808,'$808K'],['Europe',0.417,'$417K'],['Oceania',0.01,'-']],spotlight:[['Seven Figures','Another million-plus season.'],['Balance','Americas and Europe both matter.'],['Story','Still traveling, still producing.']]},
    2008:{main:'$1.302M',kicker:'2008 Earnings',sub:'WSOP bracelet year in $2,000 Limit Hold’em.',rings:[['Bracelet','Limit Hold’em'],['$1.302M','Gross'],['$889K','Europe']],feed:[['WSOP Event #20','Bracelet / $205K'],['World','$1.302M'],['Europe','$889K'],['Americas','$413K']],regions:[['World',1.302,'$1.302M'],['Americas',0.413,'$413K'],['Europe',0.889,'$889K'],['Oceania',0.01,'-']],spotlight:[['Bracelet','A title year that should glow in the vault.'],['Europe','Large regional contribution.'],['Range','Limit Hold’em win adds texture.']]},
    2007:{main:'$700K',kicker:'2007 Earnings',sub:'Solid six-figure year in the post-boom circuit.',rings:[['$700K','Gross'],['$636K','Americas'],['Volume','Touring']],feed:[['World','$700K'],['Americas','$636K'],['Europe','$64K'],['Context','Post-boom']],regions:[['World',0.700,'$700K'],['Americas',0.636,'$636K'],['Europe',0.064,'$64K'],['Oceania',0.01,'-']],spotlight:[['Post Boom','The circuit keeps moving.'],['Base','Six-figure consistency.'],['Map','Mostly Americas.']]},
    2006:{main:'$1.940M',kicker:'2006 Earnings',sub:'Another seven-figure boom-era year.',rings:[['$1.940M','Gross'],['Americas','$1.940M'],['TV Era','Poker boom']],feed:[['World','$1.940M'],['Americas','$1.940M'],['TV Era','Peak popularity'],['Context','Boom years']],regions:[['World',1.940,'$1.940M'],['Americas',1.940,'$1.940M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Boom','Daniel’s mainstream aura keeps growing.'],['Americas','Dominant region.'],['Gross','Another huge number.']]},
    2005:{main:'$323K',kicker:'2005 Earnings',sub:'Lower gross year immediately after the enormous 2004 run.',rings:[['$323K','Gross'],['Post-POY','Reset'],['Selective','Volume']],feed:[['World','$323K'],['Americas','$323K'],['Context','Post 2004'],['Momentum','Sustained brand']],regions:[['World',0.323,'$323K'],['Americas',0.323,'$323K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Reset','The year after a monster run.'],['Brand','Momentum continues beyond gross.'],['Context','Useful valley after a peak.']]},
    2004:{main:'$4.466M',kicker:'2004 Earnings',sub:'Dominant boom-era year: two WPT titles, CardPlayer POY, and WSOP POY.',rings:[['2','WPT Titles'],['POY','WSOP + CardPlayer'],['$1.770M','Five Diamond']],feed:[['WPT Borgata','1st / $1.117M'],['WPT Five Diamond','1st / $1.770M'],['WSOP POY','Award year'],['CardPlayer','POY']],regions:[['World',4.466,'$4.466M'],['Americas',3.599,'$3.599M'],['Rest',0.867,'$867K'],['Europe',0.01,'-']],spotlight:[['Identity','This is the Kid Poker explosion year.'],['WPT','Two marquee titles.'],['Awards','Multiple Player of the Year honors.']]}
  };

  const factCards = [
    ['WSOP Bracelets','8','Trophy-room proof across eras.'],['WSOP Earnings','$28.918M','World Series dominance benchmark.'],['WPT Titles','2','Both from the 2004 boom-era surge.'],['WSOP POY','2x','2004 and 2013 award seasons.'],['Best Cash','$8.288M','2014 Big One for One Drop.'],['Public P/L','Tracked','A modern transparency layer.'],['2026 WSOP Net','+$1.703M','Eighth-bracelet rebound story.'],['Career Live','$60.665M','Tracked live earnings snapshot.']
  ];

  const braceletData = [
    ['I','Bracelet 1','Tap to open','Bracelet I|The breakthrough slot: youthful, fearless, and impossible to ignore.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+1'],
    ['II','Bracelet 2','Tap to open','Bracelet II|A second proof point that Kid Poker was not a moment — he was a force.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+2'],
    ['III','Bracelet 3','Tap to open','Bracelet III|Mixed games, adaptation, and the all-around poker brain.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+3'],
    ['IV','Bracelet 4','Tap to open','Bracelet IV|The trophy room should show the eras, not just the counts.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+4'],
    ['V','Bracelet 5','Tap to open','Bracelet V|A premium card can later hold real footage, payout, final hand, and media notes.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+5'],
    ['VI','Bracelet 6','Tap to open','Bracelet VI|Every bracelet slot is built for verified data once final assets are supplied.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+6'],
    ['VII','Bracelet 7','Tap to open','Bracelet VII|The late-career chapters should feel like reinvention, not nostalgia.|WSOP','https://placehold.co/900x700/080506/f4c76b?text=Bracelet+7'],
    ['VIII','Bracelet 8','Tap to open','Bracelet VIII|Modern Daniel: still dangerous, still relevant, still shaping the conversation.|WSOP','/assets/trophies/negreanu-bracelet-8.png']
  ];

  function patchMobileHeroCopy() {
    const kicker = $('.hero-kicker');
    const title = $('.hero-title');
    const subtitle = $('.hero-subtitle');
    if (kicker) kicker.textContent = isMobile() ? 'The Official' : 'The Official Kid Poker Experience';
    if (title) title.innerHTML = isMobile() ? 'Kid Poker' : '<span class="highlight-text">Kid</span> Poker';
    if (subtitle) subtitle.textContent = isMobile() ? 'Experience' : 'Still reading the room.';
  }

  function installHamburgerIcon() {
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-nav]');
    if (!toggle) return;
    if (!toggle.querySelector('.nav-toggle__chip')) {
      toggle.innerHTML = '<img class="nav-toggle__chip" src="/assets/icons/poker-chip-hamburger-menu-final.svg" alt="" aria-hidden="true"><span class="sr-only">Open navigation</span>';
    }
    toggle.addEventListener('click', () => {
      window.setTimeout(() => {
        if (!nav) return;
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        nav.classList.toggle('open', expanded);
      }, 0);
    });
  }

  function patchGalleryBackground() {
    document.documentElement.style.setProperty('--dn-gallery-final', `url('${galleryBg}')`);
    const section = $('#gallery');
    const wall = $('[data-gallery-wall]');
    if (section) section.style.setProperty('background', `url('${galleryBg}') center / cover no-repeat`, 'important');
    if (wall) wall.style.setProperty('background', 'transparent', 'important');
  }

  function rebuildStatsLab() {
    const console = $('.stats-console');
    if (!console || console.dataset.finalStats === 'true') return;
    console.dataset.finalStats = 'true';
    const years = ['career', ...timeline.map(([year]) => year).reverse()];
    console.innerHTML = `
      <div class="dn-stats-lab">
        <div class="dn-stats-toolbar">
          <div class="dn-stats-toolbar__controls">
            <label>Year<select data-dn-year>${years.map((year) => `<option value="${year}">${year === 'career' ? 'Career' : year}</option>`).join('')}</select></label>
            <label>View<select data-dn-view><option value="earnings">Earnings Timeline</option><option value="regions">Regional Split</option><option value="rankings">Rankings + Records</option><option value="bracelets">Bracelet Arc</option></select></label>
          </div>
          <div class="dn-live-pulse"><i></i><span>Interactive career dashboard</span></div>
        </div>
        <div class="dn-stats-hero">
          <article class="dn-stat-mega"><small data-dn-kicker></small><strong data-dn-main></strong><p data-dn-sub></p></article>
          <div class="dn-rings" data-dn-rings></div>
        </div>
        <div class="dn-visual-grid">
          <section class="dn-chart-panel"><div class="dn-chart-head"><div><h3 data-dn-chart-title></h3><p data-dn-chart-note></p></div></div><div class="dn-bars" data-dn-bars></div></section>
          <aside class="dn-spotlight"><h3>Why this year matters</h3><div data-dn-spotlight></div></aside>
        </div>
        <section class="dn-facts-panel"><h3>Expanded career ledger</h3><div class="dn-facts-grid">${factCards.map(([label,value,copy]) => `<article class="dn-stat-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong><span>${escapeHtml(copy)}</span></article>`).join('')}</div></section>
      </div>`;

    const yearSelect = $('[data-dn-year]', console);
    const viewSelect = $('[data-dn-view]', console);
    const render = () => renderStats(console, yearSelect.value, viewSelect.value);
    yearSelect.addEventListener('change', render);
    viewSelect.addEventListener('change', render);
    render();
  }

  function renderStats(root, year, view) {
    const data = statsData[year] || statsData.career;
    $('[data-dn-kicker]', root).textContent = data.kicker;
    $('[data-dn-main]', root).textContent = data.main;
    $('[data-dn-sub]', root).textContent = data.sub;
    $('[data-dn-rings]', root).innerHTML = data.rings.map(([value,label]) => `<div class="dn-ring"><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`).join('');
    $('[data-dn-spotlight]', root).innerHTML = (data.spotlight || []).map(([label,copy]) => `<article class="dn-chip-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(copy)}</strong></article>`).join('');
    const chartTitle = $('[data-dn-chart-title]', root);
    const chartNote = $('[data-dn-chart-note]', root);
    const bars = $('[data-dn-bars]', root);

    if (view === 'regions') {
      chartTitle.textContent = 'Regional earnings split';
      chartNote.textContent = year === 'career' ? 'Career regional profile.' : `${year} regional profile.`;
      const max = Math.max(...data.regions.map((r) => r[1] || 0.01));
      bars.innerHTML = data.regions.map(([label,value,display]) => `<button class="dn-bar ${label === 'World' ? 'is-selected' : ''}" type="button" style="--bar-height:${Math.max(4,(value / max) * 100)}%"><i></i><span>${escapeHtml(label)}</span><b>${escapeHtml(display)}</b></button>`).join('');
      return;
    }

    if (view === 'rankings') {
      chartTitle.textContent = 'Rankings + records';
      chartNote.textContent = 'Context cards for list position, Canada ranking, and best cash.';
      const records = [...data.rings, ...data.feed].slice(0,8);
      bars.innerHTML = records.map(([value,label], index) => `<button class="dn-bar ${index === 0 ? 'is-selected' : ''}" type="button" style="--bar-height:${30 + (index % 4) * 16}%"><i></i><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></button>`).join('');
      return;
    }

    if (view === 'bracelets') {
      chartTitle.textContent = 'Bracelet arc';
      chartNote.textContent = 'Title years and trophy-room beats highlighted against the full timeline.';
      const braceletYears = new Set(['1998','2003','2004','2008','2013','2024','2026']);
      bars.innerHTML = timeline.map(([yr,value,display,label]) => `<button class="dn-bar ${braceletYears.has(yr) ? 'is-selected' : ''}" type="button" style="--bar-height:${Math.max(4, value / 10.284 * 100)}%"><i></i><span>${yr}</span><b>${braceletYears.has(yr) ? 'Bracelet / ' : ''}${escapeHtml(display)} · ${escapeHtml(label)}</b></button>`).join('');
      return;
    }

    chartTitle.textContent = 'Year-by-year earnings timeline';
    chartNote.textContent = 'Every selected year from 1997 through 2026 is active.';
    bars.innerHTML = timeline.map(([yr,value,display,label]) => `<button class="dn-bar ${yr === String(year) ? 'is-selected' : ''}" type="button" data-jump-year="${yr}" style="--bar-height:${Math.max(4, value / 10.284 * 100)}%"><i></i><span>${yr}</span><b>${escapeHtml(display)} · ${escapeHtml(label)}</b></button>`).join('');
    $$('[data-jump-year]', bars).forEach((bar) => bar.addEventListener('click', () => {
      const select = $('[data-dn-year]', root);
      select.value = bar.dataset.jumpYear;
      renderStats(root, select.value, $('[data-dn-view]', root).value);
    }));
  }

  function installVaultInterior() {
    const stage = $('[data-vault]');
    if (!stage || stage.dataset.finalVault === 'true') return;
    stage.dataset.finalVault = 'true';
    const interior = $('.vault-interior', stage);
    const door = $('[data-vault-door]', stage);
    if (!interior) return;
    if (!$('.vault-close-toggle', stage)) {
      stage.insertAdjacentHTML('beforeend', '<button class="vault-close-toggle" type="button" data-vault-close>Close Vault</button>');
    }
    interior.innerHTML = `<div class="trophy-grid trophy-grid-eight" data-trophy-grid>${braceletData.map(([roman,title,tap,data,img]) => `
      <div class="cubby">
        <div class="bracelet-box" data-trophy="${escapeHtml(data)}">
          <div class="box-lid"><span class="bracelet">${escapeHtml(roman)}</span><strong>${escapeHtml(title)}</strong><span class="tap-open">${escapeHtml(tap)}</span></div>
          <div class="box-interior"><img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" loading="lazy" onerror="this.src='https://placehold.co/900x700/080506/f4c76b?text=${encodeURIComponent(title)}';"></div>
        </div>
      </div>`).join('')}</div>`;

    door?.addEventListener('click', () => {
      stage.classList.add('is-open');
      door.setAttribute('aria-expanded', 'true');
    });
    $('[data-vault-close]', stage)?.addEventListener('click', () => {
      stage.classList.remove('is-open');
      door?.setAttribute('aria-expanded', 'false');
      $$('.bracelet-box.is-open', stage).forEach((box) => box.classList.remove('is-open'));
    });
    $$('.bracelet-box', stage).forEach((box) => {
      box.addEventListener('click', (event) => {
        const isOpen = box.classList.contains('is-open');
        if (isOpen && event.target.tagName === 'IMG') openTrophyModal(box.dataset.trophy || '');
        else box.classList.toggle('is-open');
      });
    });
  }

  function openTrophyModal(payload) {
    const modal = $('[data-modal]');
    if (!modal) return;
    const [headline, copy, prize] = payload.split('|');
    $('[data-modal-title]').textContent = headline || 'Trophy detail';
    $('[data-modal-body]').textContent = copy || '';
    $('[data-modal-payout]').textContent = prize || '';
    document.body.classList.add('modal-open');
    if (typeof modal.showModal === 'function' && !modal.open) modal.showModal();
    else modal.setAttribute('open', '');
  }

  function patchWinnerLayout() {
    const table = $('.winner-table');
    const board = $('[data-board]');
    const hero = $('.winner-hero-zone');
    if (!table || !board || !hero) return;
    table.dataset.finalWinner = 'true';
    board.style.setProperty('left', '50%', 'important');
    board.style.setProperty('top', '50%', 'important');
    board.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
    hero.style.setProperty('left', '50%', 'important');
    hero.style.setProperty('transform', 'translateX(-50%)', 'important');
  }

  function patchXFeed() {
    const card = $('.social-card-x');
    if (!card || card.dataset.finalX === 'true') return;
    card.dataset.finalX = 'true';
    const timelineNode = $('.twitter-timeline', card);
    if (timelineNode) {
      timelineNode.setAttribute('data-theme', 'dark');
      timelineNode.setAttribute('data-chrome', 'noheader nofooter noborders transparent');
      timelineNode.setAttribute('data-height', '560');
      timelineNode.href = 'https://twitter.com/RealKidPoker';
    }
    const loadScript = (src, id) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.async = true;
      script.id = id;
      script.src = src;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    };
    loadScript('https://platform.twitter.com/widgets.js', 'twitter-widgets-final');
    window.setTimeout(() => {
      if ($('iframe', card)) return;
      card.innerHTML = `<h3>X / RealKidPoker</h3><div class="x-native-fallback">
        <a href="https://x.com/RealKidPoker" target="_blank" rel="noreferrer">Open @RealKidPoker on X<p>Official embeds are currently being blocked by X/browser privacy settings on this page.</p></a>
        <a href="https://x.com/RealKidPoker/media" target="_blank" rel="noreferrer">View recent media posts<p>Reliable fallback until an X API or third-party social feed service is connected.</p></a>
        <a href="https://publish.twitter.com/#" target="_blank" rel="noreferrer">Embed troubleshooting<p>Best production fix: use X API/social aggregator and render native cards.</p></a>
      </div>`;
    }, 4200);
  }

  function runFinalPolish() {
    installHamburgerIcon();
    patchMobileHeroCopy();
    patchGalleryBackground();
    rebuildStatsLab();
    installVaultInterior();
    patchWinnerLayout();
    patchXFeed();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runFinalPolish, { once: true });
  else runFinalPolish();
  document.addEventListener('kidpoker:site-ready', runFinalPolish);
  window.addEventListener('resize', () => window.setTimeout(() => { patchMobileHeroCopy(); patchWinnerLayout(); }, 80));
  window.setTimeout(runFinalPolish, 1200);
  window.setTimeout(runFinalPolish, 3000);
})();
