(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const galleryBg = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a66b82d847bbd8a64146130.webp';

  const timeline = [
    ['1997',0.076,'$75K','First recorded live results'],['1998',0.279,'$279K','Early climb'],['1999',0.360,'$360K','Breakout pressure'],['2000',0.010,'$10K','Reset year'],['2001',0.320,'$320K','Momentum'],['2002',0.531,'$531K','Building range'],['2003',0.533,'$533K','Pre-boom ignition'],['2004',4.466,'$4.466M','Two WPT titles + POY year'],['2005',0.323,'$323K','Post-boom reset'],['2006',1.940,'$1.940M','TV-era strength'],['2007',0.700,'$700K','Post-boom circuit'],['2008',1.302,'$1.302M','WSOP bracelet year'],['2009',1.225,'$1.225M','Global circuit'],['2010',0.684,'$684K','Americas + Europe'],['2011',1.533,'$1.533M','PCA Super High Roller runner-up'],['2012',1.690,'$1.690M','High roller transition'],['2013',3.209,'$3.209M','Two WSOP bracelets + POY'],['2014',10.284,'$10.284M','One Drop best cash year'],['2015',2.482,'$2.482M','WSOP Main Event 11th'],['2016',0.302,'$302K','Public losing year'],['2017',2.701,'$2.701M','High-roller variance'],['2018',4.510,'$4.510M','SHRB IV runner-up'],['2019',2.223,'$2.223M','WSOP $100K runner-up'],['2020',0.01,'N/A','Live poker pause'],['2021',3.122,'$3.122M','WSOP volume rebound'],['2022',4.750,'$4.750M','SHRB VII victory'],['2023',1.709,'$1.709M','Public reset year'],['2024',2.824,'$2.824M','PPC bracelet'],['2025',3.152,'$3.152M','Profitable WSOP summer'],['2026',2.878,'$2.878M','Eighth bracelet year']
  ];

  const statsData = {
    career: {
      main:'$60.665M', kicker:'Tracked Live Earnings', sub:'Career snapshot: all-time list position, Canadian dominance, WSOP bracelets, WPT titles, public P/L transparency, and late-career resurgence.',
      rings:[['9th','All-Time Money List'],['1st','Canada All-Time'],['$8.288M','Best Live Cash']],
      feed:[['WSOP Earnings','$28.918M'],['WSOP Bracelets','8'],['WPT Titles','2'],['WSOP POY','2x']],
      regions:[['World',60.665,'$60.665M'],['Americas',56.1,'$56.1M+'],['Europe',6.2,'$6.2M+'],['Oceania',2.75,'$2.75M+']],
      spotlight:[['Legacy','Hall of Fame-level career built across eras.'],['Range','No-limit, mixed games, PLO, high rollers, and televised formats.'],['Transparency','Public profit/loss tracking adds a modern competitive layer.']]
    },
    2026:{main:'$2.878M',kicker:'2026 Earnings',sub:'Driven by the eighth bracelet: $100K High Roller Pot-Limit Omaha for $2.257M.',rings:[['8th','WSOP Bracelet'],['+$1.703M','WSOP Net'],['15','WSOP Cashes']],feed:[['$100K PLO','1st / $2.257M'],['$50K NLH','8th / $226K'],['$25K Mixed','7th / $153K'],['Lowball Draw','20th / $21K']],regions:[['World',2.878,'$2.878M'],['Americas',2.878,'$2.878M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Headline','The eighth bracelet gives the modern story a huge final-act moment.'],['Format','High Roller Pot-Limit Omaha.'],['Signal','Still dangerous in elite buy-in fields.']]},
    2025:{main:'$3.152M',kicker:'2025 Earnings',sub:'Profitable WSOP summer with multiple high-buy-in deep runs.',rings:[['+$181K','WSOP Profit'],['$531K','$250K SHR'],['$314K','Omaha Hi-Lo 2nd']],feed:[['Omaha Hi-Lo','2nd / $313K'],['$250K SHR','9th / $531K'],['$100K PLO','15th / $209K'],['Mixed Big Bet','4th / $61K']],regions:[['World',3.152,'$3.152M'],['Americas',3.152,'$3.152M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Trend','Profitable volume after the 2023 reset.'],['Texture','High-buy-in schedule, lower noise.'],['Story','The comeback arc starts feeling real.']]},
    2024:{main:'$2.824M',kicker:'2024 Earnings',sub:'Poker Players Championship bracelet year and major mixed-game resurgence.',rings:[['7th','Bracelet'],['$1.179M','$50K PPC Win'],['PPC','Mixed games']],feed:[['$50K PPC','1st / $1.179M'],['PLO Series','PGT win'],['Paradise','High variance'],['Volume Shift','Quality over quantity']],regions:[['World',2.824,'$2.824M'],['Americas',2.824,'$2.824M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Resurgence','The $50K PPC win re-centers the legacy.'],['Skill Signal','Mixed-game credibility at the highest level.'],['Narrative','A reset becomes a rebound.']]},
    2023:{main:'$1.709M',kicker:'2023 Earnings',sub:'Publicly documented down year that triggered a strategic reset.',rings:[['-$2.228M','Public P/L'],['145','Events'],['Reset','Strategy shift']],feed:[['P/L Ledger','Worst public year'],['Adjustment','Volume reduction'],['Focus','Higher-equity spots'],['Reset','2024 rebuild']],regions:[['World',1.709,'$1.709M'],['Americas',1.709,'$1.709M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Truth','The most compelling stats tell the hard parts too.'],['Lesson','Public losses make the comeback stronger.'],['Pivot','The schedule gets smarter after this.']]},
    2022:{main:'$4.750M',kicker:'2022 Earnings',sub:'Saved by the $3.312M Super High Roller Bowl VII victory.',rings:[['+$1.626M','Public P/L'],['$3.312M','SHRB VII Win'],['107','Events']],feed:[['SHRB VII','1st / $3.312M'],['PokerGO Cup','Win / $350K'],['WSOP','High variance'],['ITM Rate','21.5%']],regions:[['World',4.750,'$4.750M'],['Americas',4.595,'$4.595M'],['Europe',0.155,'$155K'],['Oceania',0.01,'-']],spotlight:[['Moment','A single elite win flips the annual story.'],['Pressure','High-volume schedule with high variance.'],['Result','One of the strongest modern gross years.']]},
    2021:{main:'$3.122M',kicker:'2021 Earnings',sub:'Strong WSOP volume year: 55 WSOP events and 18 cashes.',rings:[['18','WSOP Cashes'],['3rd','POY Race'],['+$584K','Public P/L']],feed:[['WSOP Volume','55 events'],['Cashes','18'],['Profit','+$584K'],['Late Surge','PLO + NLHE']],regions:[['World',3.122,'$3.122M'],['Americas',3.122,'$3.122M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Volume','A grind-heavy year.'],['POY','Deep Player of the Year race.'],['Context','Re-entry into live tournament rhythm.']]},
    2020:{main:'N/A',kicker:'2020 Earnings',sub:'Live tournament poker was largely suspended due to COVID disruption.',rings:[['N/A','Live Volume'],['Pause','Circuit reset'],['Study','Technical rebuild']],feed:[['COVID Year','Live poker suspended'],['Heads-Up','Technical work'],['Solver Era','Adaptation'],['Reset','Modern baseline']],regions:[['World',0.01,'N/A'],['Americas',0.01,'-'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Pause','A live poker interruption.'],['Adaptation','Study and technical rebuilding.'],['Story','The modern chapter begins after this.']]},
    2019:{main:'$2.223M',kicker:'2019 Earnings',sub:'Runner-up in the WSOP $100K High Roller for $1.726M.',rings:[['$1.726M','Best Cash'],['2nd','$100K HR'],['WSOP','Major run']],feed:[['$100K HR','2nd / $1.726M'],['Year Profit','+$832K'],['High Roller','Modern adaptation'],['WSOP','Deep finish']],regions:[['World',2.223,'$2.223M'],['Americas',2.056,'$2.056M'],['Europe',0.167,'$167K'],['Oceania',0.01,'-']],spotlight:[['Score','Seven-figure WSOP high roller run.'],['Era','Modern high roller proof point.'],['Form','Big-field and elite-field versatility.']]},
    2018:{main:'$4.510M',kicker:'2018 Earnings',sub:'$3M runner-up finish in Super High Roller Bowl IV.',rings:[['$3.000M','Best Cash'],['2nd','SHRB IV'],['+$1.412M','Public P/L']],feed:[['SHRB IV','2nd / $3.0M'],['Year P/L','+$1.412M'],['High Roller','$300K buy-in'],['Form','Major score']],regions:[['World',4.510,'$4.510M'],['Americas',4.510,'$4.510M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['High Roller','One of the modern headline scores.'],['Scale','$300K buy-in environment.'],['Result','A major annual profit engine.']]},
    2017:{main:'$2.701M',kicker:'2017 Earnings',sub:'Near break-even public P/L year despite strong gross results.',rings:[['-$86K','Public P/L'],['$2.701M','Gross'],['Variance','High roller era']],feed:[['P/L Ledger','-$86K'],['Gross','$2.701M'],['High Rollers','Variance'],['Transition','Solver era']],regions:[['World',2.701,'$2.701M'],['Americas',2.549,'$2.549M'],['Europe',0.152,'$152K'],['Oceania',0.01,'-']],spotlight:[['Variance','Gross earnings do not always mean profit.'],['Modernity','A useful high-roller-era datapoint.'],['Context','Daniel’s transparency makes this interesting.']]},
    2016:{main:'$302K',kicker:'2016 Earnings',sub:'First public losing year in the tracked P/L ledger.',rings:[['-$1.247M','Public P/L'],['$302K','Gross'],['Reset','Warning year']],feed:[['P/L Ledger','-$1.247M'],['Gross Cashes','$302K'],['Variance','Severe'],['Lesson','Modernization']],regions:[['World',0.302,'$302K'],['Americas',0.206,'$206K'],['Europe',0.097,'$97K'],['Oceania',0.01,'-']],spotlight:[['Tension','The first major public P/L warning.'],['Lesson','Not every chapter is a trophy case.'],['Value','This is the kind of honesty fans remember.']]},
    2015:{main:'$2.482M',kicker:'2015 Earnings',sub:'Steady year including 11th place in the WSOP Main Event.',rings:[['+$953K','Public P/L'],['11th','WSOP Main Event'],['$526K','Main Event Cash']],feed:[['Main Event','11th / $526K'],['P/L Ledger','+$953K'],['WSOP','Deep run'],['Form','Consistent']],regions:[['World',2.482,'$2.482M'],['Americas',1.516,'$1.516M'],['Europe',0.966,'$966K'],['Oceania',0.01,'-']],spotlight:[['Main Event','A deep run in poker’s biggest event.'],['Consistency','Strong seven-figure performance.'],['Context','Bridges legacy Daniel and modern Daniel.']]},
    2014:{main:'$10.284M',kicker:'2014 Earnings',sub:'Massive One Drop runner-up year; his best live cash remains $8.288M.',rings:[['$8.288M','Best Live Cash'],['2nd','One Drop'],['+$7.100M','Public P/L']],feed:[['One Drop','2nd / $8.288M'],['Aussie Millions','4th / $1.12M'],['Year P/L','+$7.100M'],['Peak Gross','$10.284M']],regions:[['World',10.284,'$10.284M'],['Americas',8.672,'$8.672M'],['Oceania',1.612,'$1.612M'],['Europe',0.01,'-']],spotlight:[['Peak','The tallest spike in the chart.'],['One Drop','One of poker’s biggest paydays.'],['Legacy','The best live cash number belongs front and center.']]},
    2013:{main:'$3.209M',kicker:'2013 Earnings',sub:'Two WSOP bracelets and Daniel’s second WSOP Player of the Year award.',rings:[['2','WSOP Bracelets'],['POY','WSOP Player of Year'],['+$1.964M','Public P/L']],feed:[['WSOP APAC','Main Event win'],['WSOP Europe','High Roller win'],['POY','Second WSOP POY'],['EPT Barcelona','Runner-up HR']],regions:[['World',3.209,'$3.209M'],['Americas',0.89,'$890K'],['Europe',0.89,'$890K+'],['Oceania',1.087,'$1.087M']],spotlight:[['Bracelets','Two WSOP titles in one season arc.'],['Award','Second WSOP POY.'],['Range','Global performance across regions.']]},
    2012:{main:'$1.690M',kicker:'2012 Earnings',sub:'Strong pre-super-high-roller transition year.',rings:[['$1.690M','Gross'],['Global','Circuit'],['Transition','High roller era']],feed:[['World','$1.690M'],['Americas','$441K'],['Rest','$1.249M'],['Context','Global circuit']],regions:[['World',1.690,'$1.690M'],['Americas',0.441,'$441K'],['Europe',1.249,'$1.249M'],['Oceania',0.01,'-']],spotlight:[['Global','The map matters here.'],['Transition','Before the super high roller explosion.'],['Consistency','Another seven-figure year.']]},
    2011:{main:'$1.533M',kicker:'2011 Earnings',sub:'PCA Super High Roller runner-up for $1M.',rings:[['$1.000M','PCA SHR'],['2nd','Super High Roller'],['$1.533M','Gross']],feed:[['PCA SHR','2nd / $1.0M'],['World','$1.533M'],['Americas','$1.533M'],['High Roller','Early era']],regions:[['World',1.533,'$1.533M'],['Americas',1.533,'$1.533M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['PCA','Early super-high-roller era.'],['Cash','Seven-figure runner-up finish.'],['Signal','Daniel adapting to bigger buy-ins.']]},
    2010:{main:'$684K',kicker:'2010 Earnings',sub:'Moderate year before the next major international surge.',rings:[['$684K','Gross'],['$309K','Americas'],['$339K','Europe']],feed:[['World','$684K'],['Americas','$309K'],['Europe','$339K'],['Oceania','$36K']],regions:[['World',0.684,'$684K'],['Americas',0.309,'$309K'],['Europe',0.339,'$339K'],['Oceania',0.036,'$36K']],spotlight:[['Balanced','A more distributed regional year.'],['Europe','Strong non-US component.'],['Context','Between legacy peaks.']]},
    2009:{main:'$1.225M',kicker:'2009 Earnings',sub:'Seven-figure year across Americas and Europe.',rings:[['$1.225M','Gross'],['$808K','Americas'],['$417K','Europe']],feed:[['World','$1.225M'],['Americas','$808K'],['Europe','$417K'],['Context','Global circuit']],regions:[['World',1.225,'$1.225M'],['Americas',0.808,'$808K'],['Europe',0.417,'$417K'],['Oceania',0.01,'-']],spotlight:[['Seven Figures','Another million-plus season.'],['Balance','Americas and Europe both matter.'],['Story','Still traveling, still producing.']]},
    2008:{main:'$1.302M',kicker:'2008 Earnings',sub:'WSOP bracelet year in $2,000 Limit Hold’em.',rings:[['Bracelet','Limit Hold’em'],['$1.302M','Gross'],['$889K','Europe']],feed:[['WSOP Event #20','Bracelet / $205K'],['World','$1.302M'],['Europe','$889K'],['Americas','$413K']],regions:[['World',1.302,'$1.302M'],['Americas',0.413,'$413K'],['Europe',0.889,'$889K'],['Oceania',0.01,'-']],spotlight:[['Bracelet','A title year that should glow in the vault.'],['Europe','Large regional contribution.'],['Range','Limit Hold’em win adds texture.']]},
    2007:{main:'$700K',kicker:'2007 Earnings',sub:'Solid six-figure year in the post-boom circuit.',rings:[['$700K','Gross'],['$636K','Americas'],['Volume','Touring']],feed:[['World','$700K'],['Americas','$636K'],['Europe','$64K'],['Context','Post-boom']],regions:[['World',0.700,'$700K'],['Americas',0.636,'$636K'],['Europe',0.064,'$64K'],['Oceania',0.01,'-']],spotlight:[['Post Boom','The circuit keeps moving.'],['Base','Six-figure consistency.'],['Map','Mostly Americas.']]},
    2006:{main:'$1.940M',kicker:'2006 Earnings',sub:'Another seven-figure boom-era year.',rings:[['$1.940M','Gross'],['Americas','$1.940M'],['TV Era','Poker boom']],feed:[['World','$1.940M'],['Americas','$1.940M'],['TV Era','Peak popularity'],['Context','Boom years']],regions:[['World',1.940,'$1.940M'],['Americas',1.940,'$1.940M'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Boom','Daniel’s mainstream aura keeps growing.'],['Americas','Dominant region.'],['Gross','Another huge number.']]},
    2005:{main:'$323K',kicker:'2005 Earnings',sub:'Lower gross year immediately after the enormous 2004 run.',rings:[['$323K','Gross'],['Post-POY','Reset'],['Selective','Volume']],feed:[['World','$323K'],['Americas','$323K'],['Context','Post 2004'],['Momentum','Sustained brand']],regions:[['World',0.323,'$323K'],['Americas',0.323,'$323K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Reset','The year after a monster run.'],['Brand','Momentum continues beyond gross.'],['Context','Useful valley after a peak.']]},
    2004:{main:'$4.466M',kicker:'2004 Earnings',sub:'Dominant boom-era year: two WPT titles, CardPlayer POY, and WSOP POY.',rings:[['2','WPT Titles'],['POY','WSOP + CardPlayer'],['$1.770M','Five Diamond']],feed:[['WPT Borgata','1st / $1.117M'],['WPT Five Diamond','1st / $1.770M'],['WSOP POY','Award year'],['CardPlayer','POY']],regions:[['World',4.466,'$4.466M'],['Americas',3.599,'$3.599M'],['Rest',0.867,'$867K'],['Europe',0.01,'-']],spotlight:[['Identity','This is the Kid Poker explosion year.'],['WPT','Two marquee titles.'],['Awards','Multiple Player of the Year honors.']]},
    2003:{main:'$533K',kicker:'2003 Earnings',sub:'Pre-boom ignition before the 2004 explosion.',rings:[['$533K','Gross'],['Pre-Boom','Setup year'],['Momentum','Rising']],feed:[['World','$533K'],['Americas','$502K'],['Europe','$30K'],['Story','Pressure building']],regions:[['World',0.533,'$533K'],['Americas',0.502,'$502K'],['Europe',0.030,'$30K'],['Oceania',0.01,'-']],spotlight:[['Before Fame','The setup before the boom.'],['Consistency','Half-million annual gross.'],['Arc','Next year explodes.']]},
    2002:{main:'$531K',kicker:'2002 Earnings',sub:'Another half-million year in the early-career climb.',rings:[['$531K','Gross'],['Early','Climb'],['Range','Building']],feed:[['World','$531K'],['Americas','$531K'],['Context','Early years'],['Foundation','Pre-boom']],regions:[['World',0.531,'$531K'],['Americas',0.531,'$531K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Foundation','The numbers begin to stack.'],['Live Results','A strong early base.'],['Setup','Another year before the TV boom.']]},
    2001:{main:'$320K',kicker:'2001 Earnings',sub:'Early-career momentum year.',rings:[['$320K','Gross'],['Americas','$319K'],['Europe','$496']],feed:[['World','$320K'],['Americas','$319K'],['Europe','$496'],['Story','Climb']],regions:[['World',0.320,'$320K'],['Americas',0.319,'$319K'],['Europe',0.001,'$496'],['Oceania',0.01,'-']],spotlight:[['Momentum','A clear step in the early climb.'],['Map','Mostly North American results.'],['Context','Before the global media wave.']]},
    2000:{main:'$10K',kicker:'2000 Earnings',sub:'Small recorded year in the early live-results timeline.',rings:[['$10K','Gross'],['Early','Archive'],['Reset','Quiet year']],feed:[['World','$10K'],['Americas','$10K'],['Context','Archive'],['Story','Before boom']],regions:[['World',0.010,'$10K'],['Americas',0.010,'$10K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Archive','Not every year is huge.'],['Contrast','Makes 2004 feel even bigger.'],['History','Early data point.']]},
    1999:{main:'$360K',kicker:'1999 Earnings',sub:'Early breakout pressure year.',rings:[['$360K','Gross'],['Early','Breakout'],['Canada','Rising']],feed:[['World','$360K'],['Americas','$360K'],['Context','Early career'],['Story','Rising pro']],regions:[['World',0.360,'$360K'],['Americas',0.360,'$360K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Breakout','A real early-career number.'],['Signal','The climb is visible.'],['Identity','The Kid Poker story gains fuel.']]},
    1998:{main:'$279K',kicker:'1998 Earnings',sub:'Early recorded result momentum.',rings:[['$279K','Gross'],['Early','Climb'],['Archive','Tracked']],feed:[['World','$279K'],['Americas','$279K'],['Context','Early career'],['Story','Foundation']],regions:[['World',0.279,'$279K'],['Americas',0.279,'$279K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Foundation','The early chart starts to build.'],['Result','Strong archive-year total.'],['Context','Before TV poker exploded.']]},
    1997:{main:'$75K',kicker:'1997 Earnings',sub:'First recorded live result year in this timeline.',rings:[['$75K','Gross'],['Start','Archive'],['Origin','Tracked']],feed:[['World','$75K'],['Americas','$75K'],['Context','Starting point'],['Story','Origin line']],regions:[['World',0.076,'$75K'],['Americas',0.076,'$75K'],['Europe',0.01,'-'],['Oceania',0.01,'-']],spotlight:[['Origin','The first dot on the timeline.'],['Before Fame','A long way from $60M+.'],['Arc','This makes the full climb powerful.']]}
  };

  const factCards = [
    ['WSOP Bracelets','8','Trophy-room proof across eras.'],['WSOP Earnings','$28.918M','World Series dominance benchmark.'],['WPT Titles','2','Both from the 2004 boom-era surge.'],['WSOP POY','2x','2004 and 2013 award seasons.'],['Best Cash','$8.288M','2014 Big One for One Drop.'],['Public P/L','Tracked','A modern transparency layer.'],['2026 WSOP Net','+$1.703M','Eighth-bracelet rebound story.'],['Career Live','$60.665M','Tracked live earnings snapshot.']
  ];

  const mobileChapters = [
    ['01 / Toronto','The kid who wanted the game.','Early ambition, instinct, risk, and the feeling that poker was not luck — it was language.','video','/assets/story/toronto-family.mp4'],
    ['02 / Vegas','Pressure, bankroll, and belief.','The climb shows the rebuilds, the late nights, and the courage to sit back down.','image','https://placehold.co/1080x1600/080506/f4c76b?text=Vegas+Chapter'],
    ['03 / Kid Poker','The table finally listened.','The nickname becomes a character reveal: sharp reads, table talk, fearless youth, and a new kind of poker celebrity.','image','https://placehold.co/1080x1600/080506/f4c76b?text=Kid+Poker'],
    ['04 / Icon','Still shaping the game.','Broadcasts, vlogs, teaching, partnerships, Hall of Fame status, and a voice that helped define modern poker.','image','https://placehold.co/1080x1600/080506/f4c76b?text=Legacy']
  ];

  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  function injectFinalStyle() {
    if ($('#dn-final-runtime-style')) return;
    const style = document.createElement('style');
    style.id = 'dn-final-runtime-style';
    style.textContent = `
      section#gallery.gallery-wall,.gallery-wall,.photo-wall,[data-gallery-wall]{background:radial-gradient(circle at 50% 12%,rgba(244,199,107,.18),transparent 30rem),linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.68)),url('${galleryBg}') center/cover no-repeat!important;}
      @media(max-width:820px){.site-header{position:fixed!important;top:14px!important;right:14px!important;left:auto!important;width:auto!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important}.site-header .brand,.site-header .header-cta{display:none!important}.site-header .nav-toggle{display:flex!important;width:54px!important;height:54px!important;border-radius:999px!important;background:linear-gradient(135deg,#fff0b8,#d39a3d 50%,#9a621e)!important}.site-header .primary-nav{position:fixed!important;top:76px!important;right:14px!important;width:min(78vw,310px)!important;display:none!important;padding:.8rem!important;border-radius:24px!important;background:rgba(5,5,9,.96)!important;border:1px solid rgba(244,199,107,.24)!important}.site-header .primary-nav.open{display:grid!important}.vault-stage:not(.is-open){height:min(92vw,440px)!important;min-height:320px!important;max-height:440px!important}.vault-stage:not(.is-open) .vault-interior{display:none!important}.curtain-signature{margin-top:clamp(.15rem,.8vh,.45rem)!important}.hero-signature-img{width:min(91vw,460px)!important;margin-top:.62rem!important;}}
    `;
    document.head.appendChild(style);
  }

  function patchGalleryBackground() {
    document.documentElement.style.setProperty('--dn-gallery-wall-url', `url('${galleryBg}')`);
    $$('.gallery-wall,.photo-wall,[data-gallery-wall],section#gallery').forEach((el) => {
      el.style.setProperty('background', `radial-gradient(circle at 50% 12%, rgba(244,199,107,.18), transparent 30rem), linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.68)), url('${galleryBg}') center / cover no-repeat`, 'important');
    });
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
          <section class="dn-chart-panel"><div class="dn-chart-head"><div><span class="dn-section-label" data-dn-chart-kicker></span><h3 data-dn-chart-title></h3></div><p data-dn-chart-note></p></div><div class="dn-bars" data-dn-bars></div></section>
          <aside class="dn-spotlight"><h3>Why it matters</h3><div data-dn-spotlight></div></aside>
        </div>
        <section class="dn-facts-panel"><h3>Career layers Daniel will care about</h3><div class="dn-facts-grid">${factCards.map(([label,value,note]) => `<article class="dn-stat-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong><span>${escapeHtml(note)}</span></article>`).join('')}</div></section>
      </div>`;

    const yearSelect = $('[data-dn-year]', console);
    const viewSelect = $('[data-dn-view]', console);
    const render = () => {
      const selectedYear = yearSelect.value;
      const view = viewSelect.value;
      const data = statsData[selectedYear] || statsData.career;
      $('[data-dn-kicker]', console).textContent = data.kicker;
      $('[data-dn-main]', console).textContent = data.main;
      $('[data-dn-sub]', console).textContent = data.sub;
      $('[data-dn-rings]', console).innerHTML = data.rings.map(([value,label]) => `<article class="dn-ring"><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></article>`).join('');
      $('[data-dn-spotlight]', console).innerHTML = data.spotlight.map(([label,note]) => `<article class="dn-chip-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(note)}</strong></article>`).join('');

      const bars = $('[data-dn-bars]', console);
      const chartKicker = $('[data-dn-chart-kicker]', console);
      const chartTitle = $('[data-dn-chart-title]', console);
      const chartNote = $('[data-dn-chart-note]', console);

      if (view === 'regions') {
        const max = Math.max(...data.regions.map(([,v]) => v));
        chartKicker.textContent = 'Regional split';
        chartTitle.textContent = selectedYear === 'career' ? 'Career earnings by region' : `${selectedYear} regional breakdown`;
        chartNote.textContent = 'Change the year to see the map shift.';
        bars.innerHTML = data.regions.map(([label,value,display]) => `<button class="dn-bar ${value === max ? 'is-selected' : ''}" type="button" style="--bar-height:${Math.max(7,(value/max)*100)}%"><i style="height:${Math.max(7,(value/max)*100)}%"></i><b>${escapeHtml(display)}</b><span>${escapeHtml(label)}</span></button>`).join('');
      } else if (view === 'rankings') {
        const ranks = [['All-Time Money List','9th',92],['Canada All-Time','1st',100],['Popularity Ranking','1st',100],['Best Live Cash','$8.288M',84],['WSOP POY Awards','2x',78],['WPT Titles','2',70]];
        chartKicker.textContent = 'Rankings';
        chartTitle.textContent = 'Legacy markers, not just earnings';
        chartNote.textContent = 'These are the shorthand numbers fans remember.';
        bars.innerHTML = ranks.map(([label,value,height],idx) => `<button class="dn-bar ${idx<3?'is-selected':''}" type="button" style="--bar-height:${height}%"><i style="height:${height}%"></i><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></button>`).join('');
      } else if (view === 'bracelets') {
        const milestones = [['1998','1st Bracelet',38],['2003','2nd Bracelet',44],['2004','3rd Bracelet',58],['2008','4th Bracelet',52],['2013','5th + 6th',76],['2024','7th Bracelet',82],['2026','8th Bracelet',100]];
        chartKicker.textContent = 'Bracelet arc';
        chartTitle.textContent = 'Eight bracelet vault timeline';
        chartNote.textContent = 'A trophy-room view of the career.';
        bars.innerHTML = milestones.map(([label,value,height],idx) => `<button class="dn-bar ${idx===milestones.length-1?'is-selected':''}" type="button" style="--bar-height:${height}%"><i style="height:${height}%"></i><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></button>`).join('');
      } else {
        const max = Math.max(...timeline.map(([,v]) => v));
        chartKicker.textContent = 'Earnings timeline';
        chartTitle.textContent = selectedYear === 'career' ? '1997–2026 career pulse' : `${selectedYear} in context`;
        chartNote.textContent = 'Hover/tap a bar. Change year to highlight the chapter.';
        bars.innerHTML = timeline.map(([year,value,display,note]) => `<button class="dn-bar ${year===selectedYear?'is-selected':''}" type="button" data-year="${year}" title="${escapeHtml(year + ': ' + display + ' — ' + note)}" style="--bar-height:${Math.max(5,(value/max)*100)}%"><i style="height:${Math.max(5,(value/max)*100)}%"></i><b>${escapeHtml(display)}</b><span>${escapeHtml(year)}</span></button>`).join('');
        $$('[data-year]', bars).forEach((bar) => bar.addEventListener('click', () => { yearSelect.value = bar.dataset.year; render(); }));
      }
    };
    yearSelect.addEventListener('change', render);
    viewSelect.addEventListener('change', render);
    render();
  }

  function buildMobileStoryReel() {
    const story = $('#story');
    if (!story || $('.mobile-story-reel')) return;
    const reel = document.createElement('div');
    reel.className = 'mobile-story-reel';
    reel.innerHTML = mobileChapters.map(([kicker,title,copy,type,src]) => `
      <article class="mobile-story-card">
        ${type === 'video' ? `<video muted loop playsinline preload="metadata"><source src="${src}" type="video/mp4"></video>` : `<img src="${src}" alt="${escapeHtml(title)} story visual" loading="lazy">`}
        <div class="mobile-story-card__copy"><span>${escapeHtml(kicker)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></div>
      </article>`).join('');
    story.appendChild(reel);
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
      const video = $('video', entry.target);
      if (video) entry.isIntersecting ? video.play().catch(() => undefined) : video.pause();
    }), { threshold: 0.35 });
    $$('.mobile-story-card', reel).forEach((card) => io.observe(card));
  }

  function forceWinnerLayout() {
    const table = $('.winner-table');
    const board = $('[data-board]');
    const hero = $('.winner-hero-zone');
    const opponents = $('[data-opponents]');
    if (!table || !board || !hero || !opponents) return;
    const apply = () => {
      board.style.setProperty('left','50%','important');
      board.style.setProperty('top', isMobile() ? '52%' : '51%','important');
      board.style.setProperty('transform','translate(-50%,-50%)','important');
      board.style.setProperty('justify-content','center','important');
      hero.style.setProperty('left','50%','important');
      hero.style.setProperty('bottom', isMobile() ? '2.5%' : '3.5%','important');
      hero.style.setProperty('transform','translateX(-50%)','important');
      const mobilePositions = [[50,7],[24,16],[76,16],[10,44],[90,44],[22,70],[78,70],[50,24]];
      const desktopPositions = [[50,8],[24,16],[76,16],[10,45],[90,45],[22,76],[78,76],[50,22]];
      const positions = isMobile() ? mobilePositions : desktopPositions;
      $$('.opponent-seat', opponents).forEach((seat,index) => {
        const [left,top] = positions[index] || [50,50];
        seat.style.setProperty('left', `${left}%`, 'important');
        seat.style.setProperty('top', `${top}%`, 'important');
        seat.style.setProperty('translate', '-50% -50%', 'important');
      });
    };
    apply();
    new MutationObserver(apply).observe(opponents, { childList:true, subtree:true });
    new MutationObserver(apply).observe(board, { childList:true, subtree:true });
    window.addEventListener('resize', apply, { passive:true });
    window.setTimeout(apply, 350);
    window.setTimeout(apply, 1200);
  }

  function repairVault() {
    const vault = $('[data-vault]');
    if (!vault) return;
    const door = $('[data-vault-door]', vault);
    let closeToggle = $('.vault-close-toggle', vault);
    if (!closeToggle) {
      closeToggle = document.createElement('button');
      closeToggle.className = 'vault-close-toggle';
      closeToggle.type = 'button';
      closeToggle.textContent = 'Close Vault';
      vault.appendChild(closeToggle);
    }
    const setOpen = (open) => {
      vault.classList.toggle('is-open', open);
      door?.setAttribute('aria-expanded', String(open));
      if (!open) $$('.bracelet-box.is-open', vault).forEach((box) => box.classList.remove('is-open'));
    };
    closeToggle.onclick = (event) => { event.preventDefault(); setOpen(false); };
    door?.addEventListener('click', () => window.setTimeout(() => door.setAttribute('aria-expanded', String(vault.classList.contains('is-open'))), 50));
  }

  function repairXFeed() {
    const card = $('.social-card-x');
    if (!card || card.dataset.finalX === 'true') return;
    card.dataset.finalX = 'true';
    card.innerHTML = `
      <h3>X / RealKidPoker</h3>
      <p class="x-feed-status">Trying to load the official X timeline. If X blocks the embed, these live links remain visible.</p>
      <a class="twitter-timeline" data-height="520" data-theme="dark" data-chrome="noheader nofooter noborders transparent" href="https://twitter.com/RealKidPoker?ref_src=twsrc%5Etfw">Posts by RealKidPoker</a>
      <div class="x-preview-cards" aria-label="RealKidPoker X fallback links">
        <a class="x-preview-card" href="https://x.com/RealKidPoker" target="_blank" rel="noreferrer"><strong>@RealKidPoker live profile</strong><span>Open Daniel’s newest posts directly on X.</span></a>
        <a class="x-preview-card" href="https://x.com/search?q=from%3ARealKidPoker&src=typed_query&f=live" target="_blank" rel="noreferrer"><strong>Latest posts search</strong><span>Real-time search for posts from Daniel’s account.</span></a>
        <a class="x-preview-card" href="https://x.com/RealKidPoker/media" target="_blank" rel="noreferrer"><strong>Photos & video</strong><span>Jump straight to Daniel’s X media feed.</span></a>
      </div>`;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    script.onload = () => window.twttr?.widgets?.load?.(card);
    document.body.appendChild(script);
    window.setTimeout(() => {
      const iframe = $('iframe', card);
      if (iframe) $('.x-feed-status', card)?.remove();
    }, 5200);
  }

  function enhanceButtons() {
    $$('.button,.header-cta,.feature-tile,.partner-links a,.vault-door,.vault-close-toggle,.youtube-card,.news-card,.bracelet-box,.dn-stat-card,.dn-chip-card').forEach((el) => {
      if (el.dataset.pressBound) return;
      el.dataset.pressBound = 'true';
      el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
      ['pointerup','pointercancel','pointerleave'].forEach((type) => el.addEventListener(type, () => el.classList.remove('is-pressed')));
    });
  }

  function init() {
    injectFinalStyle();
    patchGalleryBackground();
    rebuildStatsLab();
    buildMobileStoryReel();
    forceWinnerLayout();
    repairVault();
    repairXFeed();
    enhanceButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
  document.addEventListener('kidpoker:site-ready', () => { patchGalleryBackground(); repairXFeed(); forceWinnerLayout(); }, { once:true });
})();
