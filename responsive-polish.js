(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const statsData = {
    career: {
      main: '$60.665M', kicker: 'Tracked Live Earnings', sub: 'Career snapshot with live earnings, WSOP dominance, ranking position, and public P/L transparency.',
      rings: [['9th', 'All-Time Money List'], ['1st', 'Canada All-Time'], ['$8.288M', 'Best Live Cash']],
      feed: [['WSOP Earnings', '$28.918M'], ['WSOP Bracelets', '8'], ['WPT Titles', '2'], ['WSOP POY', '2x']],
      regions: [['World', 60.665, '$60.665M'], ['Americas', 56.1, '$56.1M+'], ['Europe', 6.2, '$6.2M+'], ['Oceania', 2.75, '$2.75M+']]
    },
    2026: { main: '$2.878M', kicker: '2026 Earnings', sub: 'Driven by the eighth bracelet: $100K High Roller Pot-Limit Omaha for $2.257M.', rings: [['+$1.703M', 'WSOP Net'], ['$2.258M', 'Best Cash'], ['15', 'WSOP Cashes']], feed: [['$100K PLO', '1st / $2.257M'], ['$50K NLH', '8th / $226K'], ['$25K Mixed', '7th / $153K'], ['Lowball Draw', '20th / $21K']], regions: [['World', 2.878, '$2.878M'], ['Americas', 2.878, '$2.878M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2025: { main: '$3.152M', kicker: '2025 Earnings', sub: 'Profitable WSOP summer with a 33% cash rate and multiple high-buy-in deep runs.', rings: [['+$181K', 'WSOP Profit'], ['$531K', '$250K SHR'], ['$314K', 'Omaha Hi-Lo 2nd']], feed: [['Omaha Hi-Lo', '2nd / $313K'], ['$250K SHR', '9th / $531K'], ['$100K PLO', '15th / $209K'], ['Mixed Big Bet', '4th / $61K']], regions: [['World', 3.152, '$3.152M'], ['Americas', 3.152, '$3.152M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2024: { main: '$2.824M', kicker: '2024 Earnings', sub: 'Poker Players Championship bracelet year and major mixed-game resurgence.', rings: [['7th', 'Bracelet'], ['$1.179M', '$50K PPC Win'], ['PPC', 'Elite mixed games']], feed: [['$50K PPC', '1st / $1.179M'], ['PLO Series', 'PGT win'], ['Paradise', 'High variance'], ['Volume Shift', 'Quality over quantity']], regions: [['World', 2.824, '$2.824M'], ['Americas', 2.824, '$2.824M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2023: { main: '$1.709M', kicker: '2023 Earnings', sub: 'Publicly documented down year that triggered a major strategic reset.', rings: [['-$2.228M', 'Public P/L'], ['145', 'Events'], ['$200K', 'Top Cash']], feed: [['P/L Ledger', 'Worst public year'], ['Adjustment', 'Volume reduction'], ['Focus', 'Higher-equity spots'], ['Reset', '2024 rebuild']], regions: [['World', 1.709, '$1.709M'], ['Americas', 1.709, '$1.709M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2022: { main: '$4.750M', kicker: '2022 Earnings', sub: 'Saved by the $3.312M Super High Roller Bowl VII victory.', rings: [['+$1.626M', 'Public P/L'], ['$3.312M', 'SHRB VII Win'], ['107', 'Events']], feed: [['SHRB VII', '1st / $3.312M'], ['PokerGO Cup', 'Win / $350K'], ['WSOP', 'High variance'], ['ITM Rate', '21.5%']], regions: [['World', 4.750, '$4.750M'], ['Americas', 4.595, '$4.595M'], ['Europe', .155, '$155K'], ['Oceania', .01, '-']] },
    2021: { main: '$3.122M', kicker: '2021 Earnings', sub: 'Strong WSOP volume year: 55 WSOP events and 18 cashes.', rings: [['18', 'WSOP Cashes'], ['3rd', 'POY Race'], ['+$584K', 'Public P/L']], feed: [['WSOP Volume', '55 events'], ['Cashes', '18'], ['Profit', '+$584K'], ['Late Surge', 'PLO + NLHE']], regions: [['World', 3.122, '$3.122M'], ['Americas', 3.122, '$3.122M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2020: { main: 'N/A', kicker: '2020 Earnings', sub: 'Live tournament poker was largely suspended due to COVID disruption.', rings: [['N/A', 'Live Volume'], ['Pause', 'Circuit Reset'], ['Study', 'Technical rebuild']], feed: [['COVID Year', 'Live poker suspended'], ['Heads-Up', 'Technical work'], ['Solver Era', 'Adaptation'], ['Reset', 'Modern baseline']], regions: [['World', .01, 'N/A'], ['Americas', .01, '-'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2019: { main: '$2.223M', kicker: '2019 Earnings', sub: 'Runner-up in the WSOP $100K High Roller for $1.726M.', rings: [['$1.726M', 'Best Cash'], ['2nd', '$100K HR'], ['WSOP', 'Major run']], feed: [['$100K HR', '2nd / $1.726M'], ['Year Profit', '+$832K'], ['High Roller', 'Modern adaptation'], ['WSOP', 'Deep finish']], regions: [['World', 2.223, '$2.223M'], ['Americas', 2.056, '$2.056M'], ['Europe', .167, '$167K'], ['Oceania', .01, '-']] },
    2018: { main: '$4.510M', kicker: '2018 Earnings', sub: '$3M runner-up finish in Super High Roller Bowl IV.', rings: [['$3.000M', 'Best Cash'], ['2nd', 'SHRB IV'], ['+$1.412M', 'Public P/L']], feed: [['SHRB IV', '2nd / $3.0M'], ['Year P/L', '+$1.412M'], ['High Roller', '$300K buy-in'], ['Form', 'Major score']], regions: [['World', 4.510, '$4.510M'], ['Americas', 4.510, '$4.510M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2017: { main: '$2.701M', kicker: '2017 Earnings', sub: 'Near break-even public P/L year despite strong gross results.', rings: [['-$86K', 'Public P/L'], ['$2.701M', 'Gross'], ['Variance', 'High roller era']], feed: [['P/L Ledger', '-$86K'], ['Gross', '$2.701M'], ['High Rollers', 'Variance'], ['Transition', 'Solver era']], regions: [['World', 2.701, '$2.701M'], ['Americas', 2.549, '$2.549M'], ['Europe', .152, '$152K'], ['Oceania', .01, '-']] },
    2016: { main: '$302K', kicker: '2016 Earnings', sub: 'First public losing year in the tracked P/L ledger.', rings: [['-$1.247M', 'Public P/L'], ['$302K', 'Gross'], ['Reset', 'Warning year']], feed: [['P/L Ledger', '-$1.247M'], ['Gross Cashes', '$302K'], ['Variance', 'Severe'], ['Lesson', 'Modernization']], regions: [['World', .302, '$302K'], ['Americas', .206, '$206K'], ['Europe', .097, '$97K'], ['Oceania', .01, '-']] },
    2015: { main: '$2.482M', kicker: '2015 Earnings', sub: 'Steady year including 11th place in the WSOP Main Event.', rings: [['+$953K', 'Public P/L'], ['11th', 'WSOP Main Event'], ['$526K', 'Main Event Cash']], feed: [['Main Event', '11th / $526K'], ['P/L Ledger', '+$953K'], ['WSOP', 'Deep run'], ['Form', 'Consistent']], regions: [['World', 2.482, '$2.482M'], ['Americas', 1.516, '$1.516M'], ['Europe', .966, '$966K'], ['Oceania', .01, '-']] },
    2014: { main: '$10.284M', kicker: '2014 Earnings', sub: 'Massive One Drop runner-up year; his best live cash remains $8.288M.', rings: [['$8.288M', 'Best Live Cash'], ['2nd', 'One Drop'], ['+$7.100M', 'Public P/L']], feed: [['One Drop', '2nd / $8.288M'], ['Aussie Millions', '4th / $1.12M'], ['Year P/L', '+$7.100M'], ['Peak Gross', '$10.284M']], regions: [['World', 10.284, '$10.284M'], ['Americas', 8.672, '$8.672M'], ['Oceania', 1.612, '$1.612M'], ['Europe', .01, '-']] },
    2013: { main: '$3.209M', kicker: '2013 Earnings', sub: 'Two WSOP bracelets and Daniel’s second WSOP Player of the Year award.', rings: [['2', 'WSOP Bracelets'], ['POY', 'WSOP Player of Year'], ['+$1.964M', 'Public P/L']], feed: [['WSOP APAC', 'Main Event win'], ['WSOP Europe', 'High Roller win'], ['POY', 'Second WSOP POY'], ['EPT Barcelona', 'Runner-up HR']], regions: [['World', 3.209, '$3.209M'], ['Americas', .89, '$890K'], ['Europe', .89, '$890K+'], ['Oceania', 1.087, '$1.087M']] },
    2012: { main: '$1.690M', kicker: '2012 Earnings', sub: 'Strong pre-super-high-roller transition year.', rings: [['$1.690M', 'Gross'], ['Volume', 'Global events'], ['Transition', 'High roller era']], feed: [['World', '$1.690M'], ['Americas', '$441K'], ['Rest', '$1.249M'], ['Context', 'Global circuit']], regions: [['World', 1.690, '$1.690M'], ['Americas', .441, '$441K'], ['Europe', 1.249, '$1.249M'], ['Oceania', .01, '-']] },
    2011: { main: '$1.533M', kicker: '2011 Earnings', sub: 'PCA Super High Roller runner-up for $1M.', rings: [['$1.000M', 'PCA SHR'], ['2nd', 'Super High Roller'], ['$1.533M', 'Gross']], feed: [['PCA SHR', '2nd / $1.0M'], ['World', '$1.533M'], ['Americas', '$1.533M'], ['High Roller', 'Early era']], regions: [['World', 1.533, '$1.533M'], ['Americas', 1.533, '$1.533M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2010: { main: '$684K', kicker: '2010 Earnings', sub: 'Moderate year before the next major international surge.', rings: [['$684K', 'Gross'], ['$309K', 'Americas'], ['$339K', 'Europe']], feed: [['World', '$684K'], ['Americas', '$309K'], ['Europe', '$339K'], ['Oceania', '$36K']], regions: [['World', .684, '$684K'], ['Americas', .309, '$309K'], ['Europe', .339, '$339K'], ['Oceania', .036, '$36K']] },
    2009: { main: '$1.225M', kicker: '2009 Earnings', sub: 'Seven-figure year across Americas and Europe.', rings: [['$1.225M', 'Gross'], ['$808K', 'Americas'], ['$417K', 'Europe']], feed: [['World', '$1.225M'], ['Americas', '$808K'], ['Europe', '$417K'], ['Context', 'Global circuit']], regions: [['World', 1.225, '$1.225M'], ['Americas', .808, '$808K'], ['Europe', .417, '$417K'], ['Oceania', .01, '-']] },
    2008: { main: '$1.302M', kicker: '2008 Earnings', sub: 'WSOP bracelet year in $2,000 Limit Hold’em.', rings: [['Bracelet', 'Limit Hold’em'], ['$1.302M', 'Gross'], ['$889K', 'Europe']], feed: [['WSOP Event #20', 'Bracelet / $205K'], ['World', '$1.302M'], ['Europe', '$889K'], ['Americas', '$413K']], regions: [['World', 1.302, '$1.302M'], ['Americas', .413, '$413K'], ['Europe', .889, '$889K'], ['Oceania', .01, '-']] },
    2007: { main: '$700K', kicker: '2007 Earnings', sub: 'Solid six-figure year in the post-boom circuit.', rings: [['$700K', 'Gross'], ['$636K', 'Americas'], ['Volume', 'Touring']], feed: [['World', '$700K'], ['Americas', '$636K'], ['Europe', '$64K'], ['Context', 'Post-boom']], regions: [['World', .700, '$700K'], ['Americas', .636, '$636K'], ['Europe', .064, '$64K'], ['Oceania', .01, '-']] },
    2006: { main: '$1.940M', kicker: '2006 Earnings', sub: 'Another seven-figure boom-era year.', rings: [['$1.940M', 'Gross'], ['Americas', '$1.940M'], ['TV Era', 'Poker boom']], feed: [['World', '$1.940M'], ['Americas', '$1.940M'], ['TV Era', 'Peak popularity'], ['Context', 'Boom years']], regions: [['World', 1.940, '$1.940M'], ['Americas', 1.940, '$1.940M'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2005: { main: '$323K', kicker: '2005 Earnings', sub: 'Lower gross year immediately after the enormous 2004 run.', rings: [['$323K', 'Gross'], ['Post-POY', 'Reset'], ['Volume', 'Selective']], feed: [['World', '$323K'], ['Americas', '$323K'], ['Context', 'Post 2004'], ['Momentum', 'Sustained brand']], regions: [['World', .323, '$323K'], ['Americas', .323, '$323K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2004: { main: '$4.466M', kicker: '2004 Earnings', sub: 'Dominant boom-era year: two WPT titles, CardPlayer POY, and WSOP POY.', rings: [['2', 'WPT Titles'], ['POY', 'WSOP + CardPlayer'], ['$1.770M', 'Five Diamond']], feed: [['WPT Borgata', '1st / $1.117M'], ['WPT Five Diamond', '1st / $1.770M'], ['WSOP POY', 'Winner'], ['CardPlayer POY', '8,764 points']], regions: [['World', 4.466, '$4.466M'], ['Americas', 3.599, '$3.599M'], ['Rest of World', .867, '$867K'], ['Europe', .01, '-']] },
    2003: { main: '$533K', kicker: '2003 Earnings', sub: 'Second WSOP bracelet in $2,000 S.H.O.E.', rings: [['Bracelet', 'S.H.O.E.'], ['$533K', 'Gross'], ['Mixed Games', 'Proof']], feed: [['WSOP Event #3', 'Bracelet / $100K'], ['World', '$533K'], ['Americas', '$502K'], ['Mixed Games', 'Foundation']], regions: [['World', .533, '$533K'], ['Americas', .502, '$502K'], ['Europe', .031, '$31K'], ['Oceania', .01, '-']] },
    2002: { main: '$531K', kicker: '2002 Earnings', sub: 'Steady early-career six-figure year.', rings: [['$531K', 'Gross'], ['Americas', '$531K'], ['Growth', 'Pre-boom']], feed: [['World', '$531K'], ['Americas', '$531K'], ['Era', 'Pre-boom'], ['Foundation', 'Building']], regions: [['World', .531, '$531K'], ['Americas', .531, '$531K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2001: { main: '$320K', kicker: '2001 Earnings', sub: 'WSOP Main Event 11th-place finish season.', rings: [['11th', 'WSOP Main Event'], ['$320K', 'Gross'], ['Main Event', 'Breakthrough']], feed: [['Main Event', '11th'], ['World', '$320K'], ['Americas', '$320K'], ['Context', 'Early icon']], regions: [['World', .320, '$320K'], ['Americas', .320, '$320K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    2000: { main: '$10K', kicker: '2000 Earnings', sub: 'Low-volume year between early bracelet momentum and TV-era explosion.', rings: [['$10K', 'Gross'], ['Early Career', 'Grinding'], ['Setup', 'Before boom']], feed: [['World', '$10K'], ['Context', 'Early career'], ['Momentum', 'Pre-television'], ['Foundation', 'Developing']], regions: [['World', .010, '$10K'], ['Americas', .010, '$10K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    1999: { main: '$360K', kicker: '1999 Earnings', sub: 'Strong follow-up after becoming the youngest WSOP bracelet winner at the time.', rings: [['$360K', 'Gross'], ['Young Gun', 'Rising'], ['Momentum', 'Post-bracelet']], feed: [['World', '$360K'], ['Americas', '$360K'], ['Era', 'Early Kid Poker'], ['Momentum', 'Rising star']], regions: [['World', .360, '$360K'], ['Americas', .360, '$360K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    1998: { main: '$279K', kicker: '1998 Earnings', sub: 'First WSOP bracelet year: $2,000 Pot-Limit Hold’em.', rings: [['1st', 'WSOP Bracelet'], ['$169K', 'Bracelet Cash'], ['$279K', 'Gross']], feed: [['WSOP Event #20', 'Bracelet / $169K'], ['Youngest', 'Record at the time'], ['World', '$279K'], ['Identity', 'Kid Poker']], regions: [['World', .279, '$279K'], ['Americas', .279, '$279K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] },
    1997: { main: '$76K', kicker: '1997 Earnings', sub: 'The earliest tracked chapter in the career earnings arc.', rings: [['$76K', 'Gross'], ['Start', 'Tracked career'], ['Toronto', 'Early rise']], feed: [['World', '$76K'], ['Beginning', 'Tracked cashes'], ['Foundation', 'First data points'], ['Arc', 'Before bracelet']], regions: [['World', .076, '$76K'], ['Americas', .076, '$76K'], ['Europe', .01, '-'], ['Oceania', .01, '-']] }
  };

  const timeline = [
    ['1997', .076], ['1998', .279], ['1999', .360], ['2000', .010], ['2001', .320], ['2002', .531], ['2003', .533], ['2004', 4.466], ['2005', .323], ['2006', 1.940], ['2007', .700], ['2008', 1.302], ['2009', 1.225], ['2010', .684], ['2011', 1.533], ['2012', 1.690], ['2013', 3.209], ['2014', 10.284], ['2015', 2.482], ['2016', .302], ['2017', 2.701], ['2018', 4.510], ['2019', 2.223], ['2020', .01], ['2021', 3.122], ['2022', 4.750], ['2023', 1.709], ['2024', 2.824], ['2025', 3.152], ['2026', 2.878]
  ];

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
    ['2013','+$1.964M','Two WSOP bracelets + POY','win'], ['2014','+$7.100M','One Drop score year','win'], ['2016','-$1.247M','First public losing year','loss'], ['2022','+$1.626M','Saved by SHRB VII','win'], ['2023','-$2.228M','Worst public year','loss'], ['2024','PPC bracelet','Mixed-game resurgence','win'], ['2025','+$181K','Profitable WSOP summer','win'], ['2026','+$1.703M','Most profitable WSOP in years','win'], ['2026 PLO','$2.258M','8th bracelet prize','win'], ['Career P/L','$10.909M','Tracked 2013–2023 net','win']
  ];

  const pokerNewsFallback = [
    { title: 'Daniel Negreanu Wins Eighth WSOP Bracelet', date: 'PokerNews Daniel coverage', excerpt: 'A championship update centered on the $100K High Roller Pot-Limit Omaha victory.', url: 'https://www.pokernews.com/tags/daniel-negreanu/' },
    { title: 'Negreanu Wraps a Profitable 2026 WSOP', date: 'PokerNews Daniel coverage', excerpt: 'A Daniel-focused results story from his high-roller-heavy 2026 summer.', url: 'https://www.pokernews.com/tags/daniel-negreanu/' },
    { title: 'Daniel Negreanu Results, News, and Player Updates', date: 'Live Daniel feed', excerpt: 'Current Daniel-tagged tournament coverage, profile updates, and poker news.', url: 'https://www.pokernews.com/tags/daniel-negreanu/' }
  ];

  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const formatDate = (value) => { if (!value) return ''; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
  const absoluteUrl = (url) => { try { return new URL(url, 'https://www.pokernews.com').href; } catch { return 'https://www.pokernews.com/tags/daniel-negreanu/'; } };

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

  function moneyLabel(value) {
    if (value < .02) return '—';
    if (value < 1) return `$${Math.round(value * 1000)}K`;
    return `$${value.toFixed(value >= 10 ? 1 : 2)}M`;
  }

  function renderBars(container, selectedYear, view) {
    if (!container) return;
    let rows;
    if (view === 'regions') {
      rows = (statsData[selectedYear] || statsData.career).regions || statsData.career.regions;
      container.dataset.chartLabel = `Regional split · ${selectedYear === 'career' ? 'career' : selectedYear}`;
      const max = Math.max(...rows.map(([,v]) => v));
      container.innerHTML = rows.map(([label, value, display]) => `<div class="stat-bar"><i style="height:${Math.max(6, Math.sqrt(value / max) * 100)}%"></i><span>${escapeHtml(label)}</span><b>${escapeHtml(display)}</b></div>`).join('');
      return;
    }
    if (view === 'rankings') {
      rows = [['All-Time', 9, '9th'], ['Canada', 1, '1st'], ['Popularity', 1, '1st'], ['Bracelets', 8, '8'], ['WSOP POY', 2, '2x'], ['WPT Titles', 2, '2']];
      container.dataset.chartLabel = 'Ranking and legacy markers';
      const max = Math.max(...rows.map(([,v]) => v));
      container.innerHTML = rows.map(([label, value, display]) => `<div class="stat-bar"><i style="height:${Math.max(16, (value / max) * 100)}%"></i><span>${escapeHtml(label)}</span><b>${escapeHtml(display)}</b></div>`).join('');
      return;
    }
    rows = timeline;
    container.dataset.chartLabel = selectedYear === 'career' ? 'Year-by-year live earnings timeline' : `Year-by-year timeline · ${selectedYear} highlighted`;
    const max = Math.max(...rows.map(([,v]) => v));
    container.innerHTML = rows.map(([year, value]) => `<div class="stat-bar ${String(year) === String(selectedYear) ? 'is-selected' : ''}"><i style="height:${Math.max(5, Math.sqrt(value / max) * 100)}%"></i><span>${year.slice(2)}</span><b>${moneyLabel(value)}</b></div>`).join('');
  }

  function activateFullStats() {
    const year = $('[data-stat-year]');
    const view = $('[data-stat-view]');
    const main = $('[data-stat-main]');
    const sub = $('[data-stat-sub]');
    const kicker = $('[data-stat-kicker]');
    const bars = $('[data-stat-bars]');
    const feed = $('[data-stat-feed]');
    const rings = $('.stat-rings');
    if (!year || !view || !main || !bars || !feed) return;

    const years = ['career','2026','2025','2024','2023','2022','2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000','1999','1998','1997'];
    year.innerHTML = years.map((y) => `<option value="${y}">${y === 'career' ? 'Career' : y}</option>`).join('');
    if (!statsData[year.value]) year.value = 'career';

    const render = () => {
      const selectedKey = statsData[year.value] ? year.value : 'career';
      const mode = view.value || 'earnings';
      const selected = statsData[selectedKey] || statsData.career;
      main.textContent = selected.main;
      kicker.textContent = mode === 'regions' ? 'Regional Earnings' : mode === 'rankings' ? 'Rankings + Legacy' : selected.kicker;
      sub.textContent = mode === 'rankings' ? 'Rankings view: all-time, Canada, popularity, WSOP bracelets, POY awards, and tour titles.' : mode === 'regions' ? 'Regional view updates the chart and cards instead of leaving the columns static.' : selected.sub;
      if (rings) rings.innerHTML = selected.rings.map(([value, label]) => `<div><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`).join('');
      const cards = mode === 'regions' ? selected.regions.map(([label,,display]) => [label, display]) : mode === 'rankings' ? [['All-Time Money List','9th'], ['Canada All-Time','1st'], ['Popularity Ranking','1st'], ['WSOP Bracelets','8'], ['WSOP POY','2x'], ['WPT Titles','2']] : selected.feed;
      feed.innerHTML = cards.map(([a,b]) => `<article><strong>${escapeHtml(a)}</strong><span>${escapeHtml(b)}</span></article>`).join('');
      renderBars(bars, selectedKey, mode);
    };

    year.addEventListener('change', render);
    view.addEventListener('change', render);
    render();
  }

  function addStatsExpansion() {
    const console = $('.stats-console');
    if (!console || $('.dn-stat-expansion')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'dn-stat-expansion';
    wrapper.innerHTML = `
      <div class="dn-stat-expansion__headline"><h3>More career context.</h3><p>Additional statistical layers from the uploaded Daniel Negreanu career analysis: WSOP dominance, public P/L transparency, recent rebound, and high-roller evolution.</p></div>
      <div class="dn-stat-grid">${expandedStats.map(([label, value, note]) => `<article class="dn-stat-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong><span>${escapeHtml(note)}</span></article>`).join('')}</div>
      <div class="dn-ledger">${ledgerStats.map(([year, value, note, type]) => `<span class="${type}"><em>${escapeHtml(year)}</em><b>${escapeHtml(value)}</b><small>${escapeHtml(note)}</small></span>`).join('')}</div>
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
    reel.innerHTML = chapters.map(([kicker, title, copy, type, src]) => `<article class="mobile-story-card">${type === 'video' ? `<video muted loop playsinline preload="metadata"><source src="${src}" type="video/mp4"></video>` : `<img src="${src}" alt="${escapeHtml(title)} story visual" loading="lazy">`}<div class="mobile-story-card__copy"><span>${escapeHtml(kicker)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></div></article>`).join('');
    story.appendChild(reel);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
        const video = $('video', entry.target);
        if (video) { if (entry.isIntersecting) video.play().catch(() => undefined); else video.pause(); }
      });
    }, { threshold: 0.38 });
    $$('.mobile-story-card', reel).forEach((card) => io.observe(card));
  }

  function repairVaultControls() {
    const vault = $('[data-vault]');
    if (!vault) return;
    const door = $('[data-vault-door]', vault);
    if (door) {
      door.setAttribute('aria-expanded', vault.classList.contains('is-open') ? 'true' : 'false');
      door.addEventListener('click', () => setTimeout(() => door.setAttribute('aria-expanded', vault.classList.contains('is-open') ? 'true' : 'false'), 30));
    }
    let closeBtn = $('.vault-close-toggle', vault);
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.className = 'vault-close-toggle';
      closeBtn.type = 'button';
      closeBtn.textContent = 'Close Vault';
      vault.appendChild(closeBtn);
    }
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      vault.classList.remove('is-open');
      door?.setAttribute('aria-expanded', 'false');
      $$('.bracelet-box.is-open', vault).forEach((box) => box.classList.remove('is-open'));
    });
  }

  async function repairXFeed() {
    const card = $('.social-card-x');
    if (!card) return;
    card.innerHTML = `<h3>X / RealKidPoker</h3><div class="x-feed-status">Loading RealKidPoker timeline…</div><a class="twitter-timeline" data-height="560" data-theme="dark" data-chrome="nofooter noborders transparent" href="https://twitter.com/RealKidPoker?ref_src=twsrc%5Etfw">Posts by RealKidPoker</a>`;
    const renderFallback = () => {
      if ($('iframe', card)) return;
      card.innerHTML = `<h3>X / RealKidPoker</h3><div class="x-feed-status">X is not returning an embeddable timeline in this browser session. This usually happens because of privacy settings, tracking protection, or X widget restrictions.</div><div class="x-preview-cards" aria-label="RealKidPoker X feed fallback"><a class="x-preview-card" href="https://x.com/RealKidPoker" target="_blank" rel="noreferrer"><strong>@RealKidPoker live profile</strong><span>Open Daniel’s newest posts directly on X.</span></a><a class="x-preview-card" href="https://x.com/search?q=from%3ARealKidPoker&src=typed_query&f=live" target="_blank" rel="noreferrer"><strong>Latest RealKidPoker posts search</strong><span>Real-time search scoped to Daniel’s account.</span></a><a class="x-preview-card" href="https://x.com/RealKidPoker/media" target="_blank" rel="noreferrer"><strong>Photos & video</strong><span>Jump straight to Daniel’s media posts.</span></a></div>`;
    };
    try {
      await loadScript('https://platform.twitter.com/widgets.js', 'twitter-widgets-script');
      window.twttr?.widgets?.load?.(card);
      setTimeout(renderFallback, 5200);
    } catch {
      try { await loadScript('https://platform.x.com/widgets.js', 'x-widgets-script-alt'); window.twttr?.widgets?.load?.(card); setTimeout(renderFallback, 5200); }
      catch { renderFallback(); }
    }
  }

  async function renderPokerNews() {
    const container = $('#negreanu-news');
    if (!container) return;
    const render = (items) => {
      const clean = items.slice(0, 6).map((item) => ({ title: item.title || 'Daniel Negreanu story', url: absoluteUrl(item.link || item.url), date: formatDate(item.pubDate || item.date), excerpt: stripHtml(item.description || item.excerpt || '').slice(0, 150) }));
      container.innerHTML = `<div class="news-grid-live">${clean.map((item) => `<a class="news-card" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><strong>${escapeHtml(item.title)}</strong>${item.date ? `<span>${escapeHtml(item.date)}</span>` : ''}${item.excerpt ? `<p>${escapeHtml(item.excerpt)}</p>` : ''}</a>`).join('')}</div>`;
    };
    container.innerHTML = '<p>Loading Daniel Negreanu headlines…</p>';
    try {
      const rssUrl = encodeURIComponent('https://www.pokernews.com/rss.php');
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`, { cache: 'no-store' });
      const data = await response.json();
      const keyword = /daniel\s+negreanu|negreanu|kid\s+poker/i;
      const filtered = (data.items || []).filter((item) => keyword.test(`${item.title || ''} ${item.description || ''} ${(item.categories || []).join(' ')}`));
      if (filtered.length) { render(filtered); return; }
    } catch (error) { console.warn('PokerNews RSS filter failed', error); }
    try {
      const tagUrl = encodeURIComponent('https://www.pokernews.com/tags/daniel-negreanu/');
      const response = await fetch(`https://api.allorigins.win/raw?url=${tagUrl}`, { cache: 'no-store' });
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const links = $$('a[href*="/news/"]', doc).map((a) => ({ title: a.textContent.trim(), url: absoluteUrl(a.getAttribute('href')), excerpt: 'Daniel Negreanu tagged story from PokerNews.' })).filter((item, index, arr) => item.title && arr.findIndex((x) => x.title === item.title) === index).slice(0, 6);
      if (links.length) { render(links); return; }
    } catch (error) { console.warn('PokerNews tag scrape failed', error); }
    render(pokerNewsFallback);
  }

  function enhanceButtons() {
    $$('.button,.header-cta,.feature-tile,.partner-links a,.vault-door,.vault-close-toggle,.youtube-card,.news-card,.x-preview-card').forEach((el) => {
      el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
      ['pointerup','pointercancel','pointerleave'].forEach((type) => el.addEventListener(type, () => el.classList.remove('is-pressed')));
    });
  }

  function init() {
    activateFullStats();
    addStatsExpansion();
    buildMobileStoryReel();
    repairVaultControls();
    repairXFeed();
    renderPokerNews();
    enhanceButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  document.addEventListener('kidpoker:site-ready', () => { repairXFeed(); renderPokerNews(); }, { once: true });
})();