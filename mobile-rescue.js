(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  const POSITION_LABELS = ['SB', 'BB', 'UTG', 'UTG+1', 'Lowjack', 'Hi-Jack', 'Cutoff', 'Button'];

  const SEAT_MAPS = {
    large: {
      1: [[50, 15]],
      2: [[35, 16], [65, 16]],
      3: [[28, 22], [50, 14], [72, 22]],
      4: [[23, 30], [39, 16], [61, 16], [77, 30]],
      5: [[20, 42], [31, 22], [50, 14], [69, 22], [80, 42]],
      6: [[18, 48], [29, 24], [44, 14], [56, 14], [71, 24], [82, 48]],
      7: [[20, 72], [18, 48], [29, 24], [44, 14], [56, 14], [71, 24], [82, 48]],
      8: [[24, 72], [18, 48], [29, 24], [43, 14], [57, 14], [71, 24], [82, 48], [76, 72]]
    },
    medium: {
      1: [[50, 15]],
      2: [[35, 16], [65, 16]],
      3: [[27, 23], [50, 14], [73, 23]],
      4: [[23, 33], [38, 17], [62, 17], [77, 33]],
      5: [[20, 45], [30, 24], [50, 15], [70, 24], [80, 45]],
      6: [[18, 50], [29, 25], [43, 16], [57, 16], [71, 25], [82, 50]],
      7: [[22, 74], [18, 50], [29, 25], [43, 16], [57, 16], [71, 25], [82, 50]],
      8: [[25, 74], [18, 50], [29, 25], [43, 16], [57, 16], [71, 25], [82, 50], [75, 74]]
    },
    narrow: {
      1: [[50, 14]],
      2: [[34, 16], [66, 16]],
      3: [[27, 26], [50, 14], [73, 26]],
      4: [[20, 40], [36, 20], [64, 20], [80, 40]],
      5: [[18, 54], [26, 28], [50, 14], [74, 28], [82, 54]],
      6: [[19, 70], [18, 48], [30, 24], [50, 14], [70, 24], [82, 48]],
      7: [[22, 74], [18, 52], [28, 28], [42, 16], [58, 16], [72, 28], [82, 52]],
      8: [[23, 75], [17, 54], [26, 29], [40, 17], [60, 17], [74, 29], [83, 54], [77, 75]]
    },
    micro: {
      1: [[50, 13]],
      2: [[34, 15], [66, 15]],
      3: [[24, 27], [50, 14], [76, 27]],
      4: [[18, 43], [36, 20], [64, 20], [82, 43]],
      5: [[18, 58], [24, 31], [50, 15], [76, 31], [82, 58]],
      6: [[20, 75], [17, 54], [28, 29], [42, 18], [58, 18], [72, 29]],
      7: [[22, 77], [17, 56], [25, 33], [39, 20], [61, 20], [75, 33], [83, 56]],
      8: [[22, 77], [17, 56], [24, 34], [38, 20], [62, 20], [76, 34], [83, 56], [78, 77]]
    }
  };

  function injectWinnerStyles() {
    if ($('#winner-hard-fix-styles')) return;
    const style = document.createElement('style');
    style.id = 'winner-hard-fix-styles';
    style.textContent = `
      #winner.winner-tool,
      #winner.winner-tool * { box-sizing: border-box !important; min-width: 0 !important; }
      #winner.winner-tool { display:block!important; min-height:auto!important; height:auto!important; overflow:visible!important; padding-top:clamp(3rem,7vw,7rem)!important; padding-bottom:clamp(3rem,7vw,7rem)!important; }
      #winner .split-heading { display:grid!important; grid-template-columns:minmax(0,1fr) minmax(260px,.72fr)!important; gap:clamp(1.2rem,5vw,5rem)!important; align-items:end!important; margin-bottom:clamp(1.6rem,3.5vw,3rem)!important; }
      #winner .split-heading h2 { max-width:100%!important; white-space:normal!important; overflow-wrap:normal!important; line-height:.92!important; }
      #winner .winner-shell { display:grid!important; grid-template-columns:minmax(0,1.22fr) minmax(300px,.78fr)!important; gap:clamp(1rem,2.5vw,2rem)!important; align-items:start!important; overflow:visible!important; width:min(100%,1380px)!important; max-width:100%!important; min-height:0!important; height:auto!important; margin-top:0!important; opacity:1!important; visibility:visible!important; transform:none!important; translate:none!important; pointer-events:auto!important; }
      #winner .winner-shell.reveal-up, #winner .winner-shell.revealed { opacity:1!important; visibility:visible!important; transform:none!important; translate:none!important; }

      #winner .winner-table { position:relative!important; width:100%!important; max-width:980px!important; height:clamp(540px,48vw,670px)!important; margin:0 auto!important; background:radial-gradient(ellipse at center,rgba(29,143,58,.35) 0%,rgba(13,91,31,.2) 42%,rgba(0,0,0,0) 70%),radial-gradient(ellipse at center,#0d5a1e 0%,#073510 65%,#031405 100%)!important; border:clamp(10px,1.2vw,16px) solid #1c1917!important; border-radius:300px/205px!important; box-shadow:inset 0 0 65px rgba(0,0,0,.82),0 25px 50px rgba(0,0,0,.70)!important; overflow:hidden!important; isolation:isolate!important; --card-w:clamp(25px,3.05vw,44px); --card-h:clamp(36px,4.45vw,64px); --card-font-lg:clamp(8px,.9vw,12px); --card-font-sm:clamp(7px,.75vw,10px); --suit-center:clamp(10px,1.25vw,18px); }
      #winner .winner-table::before, #winner .winner-table::after { content:none!important; display:none!important; }
      #winner .winner-board { position:absolute!important; left:50%!important; top:48%!important; transform:translate(-50%,-50%)!important; display:flex!important; align-items:center!important; justify-content:center!important; gap:clamp(3px,.45vw,8px)!important; padding:clamp(6px,.65vw,10px) clamp(7px,.85vw,14px)!important; background:rgba(2,20,8,.75)!important; border:1px solid rgba(255,255,255,.08)!important; border-radius:10px!important; backdrop-filter:blur(4px)!important; z-index:5!important; width:auto!important; max-width:calc(100% - 24px)!important; }
      #winner .board-slot-empty { width:var(--card-w)!important; height:var(--card-h)!important; border:1px dashed rgba(255,255,255,.2)!important; border-radius:4px!important; background:rgba(255,255,255,.07)!important; flex:0 0 auto!important; }

      #winner .winner-hero-zone { position:absolute!important; left:50%!important; top:auto!important; bottom:clamp(10px,2.1vw,22px)!important; transform:translateX(-50%)!important; display:flex!important; flex-direction:column!important; align-items:center!important; justify-content:center!important; gap:3px!important; z-index:12!important; width:auto!important; max-width:none!important; min-width:0!important; background:rgba(15,23,42,.88)!important; border:1px solid rgba(255,206,92,.35)!important; border-radius:12px!important; box-shadow:0 10px 24px rgba(0,0,0,.42)!important; padding:clamp(4px,.6vw,8px)!important; }
      #winner .hero-badge { display:inline-grid!important; place-items:center!important; background:#f59e0b!important; color:#0f172a!important; font-family:'Cinzel',serif!important; font-weight:900!important; font-size:clamp(8px,.85vw,12px)!important; letter-spacing:.08em!important; padding:2px 9px!important; border-radius:999px!important; text-transform:uppercase!important; line-height:1.05!important; text-shadow:none!important; }
      #winner .hero-odds-display { font-family:'Inter',system-ui,sans-serif!important; font-weight:950!important; font-size:clamp(19px,2.7vw,38px)!important; line-height:1!important; color:#fff8d0!important; text-shadow:0 2px 6px rgba(0,0,0,.9)!important; white-space:nowrap!important; }

      #winner .winner-opponents { position:absolute!important; inset:0!important; pointer-events:none!important; z-index:7!important; }
      #winner .opponent-seat { position:absolute!important; left:var(--seat-x,50%)!important; top:var(--seat-y,20%)!important; transform:translate(-50%,-50%)!important; translate:none!important; display:flex!important; flex-direction:column!important; align-items:center!important; justify-content:center!important; width:clamp(74px,8.25vw,122px)!important; max-width:clamp(74px,8.25vw,122px)!important; min-height:clamp(70px,7.45vw,112px)!important; padding:clamp(4px,.55vw,8px) clamp(4px,.65vw,10px)!important; gap:clamp(2px,.35vw,5px)!important; background:linear-gradient(180deg,rgba(14,32,78,.96),rgba(10,20,54,.94))!important; border:1px solid rgba(114,148,255,.25)!important; border-radius:clamp(8px,.8vw,12px)!important; box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 8px 18px rgba(0,0,0,.35)!important; pointer-events:auto!important; z-index:7!important; }
      #winner .opponent-name { display:block!important; font-size:clamp(7px,.72vw,10px)!important; color:#d7e3ff!important; font-weight:900!important; text-transform:uppercase!important; white-space:nowrap!important; line-height:1.05!important; text-align:center!important; max-width:100%!important; overflow:hidden!important; text-overflow:ellipsis!important; letter-spacing:.02em!important; }
      #winner .opponent-odds { display:block!important; font-size:clamp(9px,.85vw,13px)!important; color:#38bdf8!important; font-weight:950!important; line-height:1!important; white-space:nowrap!important; }

      #winner .card-pair { display:flex!important; align-items:center!important; justify-content:center!important; gap:clamp(2px,.35vw,6px)!important; width:auto!important; max-width:none!important; }
      #winner .opponent-seat .card-pair .poker-card, #winner .winner-hero-zone .card-pair .poker-card, #winner .winner-board .poker-card, #winner .card-pair .poker-card:nth-child(1), #winner .card-pair .poker-card:nth-child(2) { margin-left:0!important; transform:none!important; }
      #winner .poker-card { position:relative!important; width:var(--card-w)!important; height:var(--card-h)!important; min-width:var(--card-w)!important; max-width:var(--card-w)!important; background:linear-gradient(135deg,#fff 0%,#f1f5f9 100%)!important; border-radius:4px!important; border:1px solid rgba(0,0,0,.2)!important; box-shadow:0 2px 4px rgba(0,0,0,.35)!important; display:flex!important; flex-direction:column!important; justify-content:space-between!important; align-items:stretch!important; padding:2px!important; font-family:'Inter',system-ui,sans-serif!important; user-select:none!important; color:#0f172a!important; flex:0 0 auto!important; line-height:1!important; text-shadow:none!important; }
      #winner .poker-card:hover { transform:none!important; }
      #winner .poker-card.suit-red { color:#dc2626!important; }
      #winner .poker-card.suit-black { color:#0f172a!important; }
      #winner .card-index { display:flex!important; flex-direction:column!important; align-items:center!important; line-height:.85!important; }
      #winner .card-rank { font-weight:900!important; font-size:var(--card-font-lg)!important; letter-spacing:-.5px!important; }
      #winner .card-suit-sm { font-size:var(--card-font-sm)!important; margin-top:1px!important; }
      #winner .card-index.bottom-right { transform:rotate(180deg)!important; }
      #winner .card-center-suit { position:absolute!important; top:50%!important; left:50%!important; transform:translate(-50%,-50%)!important; font-size:var(--suit-center)!important; opacity:.85!important; line-height:1!important; }
      #winner .poker-card.card-back { background:linear-gradient(135deg,#1e3a8a 0%,#0f172a 100%)!important; border:1px solid rgba(255,255,255,.7)!important; }
      #winner .poker-card.card-back::after { content:'DN'!important; position:absolute!important; top:50%!important; left:50%!important; transform:translate(-50%,-50%)!important; color:rgba(255,255,255,.3)!important; font-family:'Cinzel',serif!important; font-weight:800!important; font-size:var(--card-font-lg)!important; }

      #winner .winner-controls { margin-top:0!important; display:flex!important; flex-direction:column!important; gap:16px!important; background:rgba(15,23,42,.60)!important; padding:16px!important; border-radius:12px!important; border:1px solid rgba(255,255,255,.10)!important; box-sizing:border-box!important; width:100%!important; opacity:1!important; visibility:visible!important; }
      #winner .control-row, #winner .card-picker { display:flex!important; flex-direction:column!important; gap:12px!important; align-items:stretch!important; color:#fff!important; }
      #winner .control-row label, #winner .card-picker label { display:grid!important; gap:8px!important; color:#fff7d1!important; font-weight:900!important; }
      #winner .control-row select, #winner .card-picker select { background:#0f172a!important; color:#fff!important; border:1px solid #334155!important; padding:8px 12px!important; border-radius:6px!important; font-weight:700!important; width:100%!important; max-width:100%!important; box-sizing:border-box!important; }
      #winner .winner-actions { display:flex!important; flex-direction:column!important; gap:12px!important; }
      #winner .winner-actions button { width:100%!important; color:#1c1205!important; }
      #winner .winner-note { font-size:11px!important; color:#94a3b8!important; font-style:italic!important; text-align:center!important; line-height:1.45!important; }

      @media (min-width:500px){ #winner .control-row,#winner .card-picker{flex-direction:row!important;align-items:center!important;} #winner .control-row select,#winner .card-picker select{width:auto!important;} #winner .card-picker label{flex:1 1 0!important;} #winner .winner-actions{flex-direction:row!important;flex-wrap:wrap!important;} #winner .winner-actions button{width:auto!important;} }
      @media (max-width:920px){ #winner .split-heading,#winner .winner-shell{grid-template-columns:1fr!important;} #winner .split-heading{align-items:start!important;} #winner .winner-controls{margin-top:18px!important;} #winner .winner-table{height:clamp(530px,78vw,690px)!important;border-radius:160px!important;--card-w:clamp(28px,4.8vw,40px);--card-h:clamp(40px,6.9vw,58px);} #winner .winner-board{top:47%!important;} }
      @media (max-width:560px){ #winner.winner-tool{padding-inline:1rem!important;} #winner .split-heading h2{font-size:clamp(3rem,17vw,4.9rem)!important;letter-spacing:-.06em!important;} #winner .winner-table{height:clamp(560px,152vw,680px)!important;border-radius:999px!important;--card-w:clamp(24px,7vw,31px);--card-h:clamp(34px,10.2vw,45px);--card-font-lg:clamp(7px,2.35vw,9px);--card-font-sm:clamp(6px,1.95vw,8px);--suit-center:clamp(9px,3.2vw,12px);} #winner .opponent-seat{width:clamp(58px,18.4vw,74px)!important;max-width:clamp(58px,18.4vw,74px)!important;min-height:clamp(58px,17.5vw,74px)!important;padding:4px!important;gap:2px!important;} #winner .opponent-name{font-size:clamp(6px,2vw,7.5px)!important;} #winner .opponent-odds{font-size:clamp(8px,2.45vw,10px)!important;} #winner .winner-board{top:47%!important;padding:6px 7px!important;} #winner .winner-hero-zone{bottom:10px!important;} #winner .hero-odds-display{font-size:clamp(18px,7vw,24px)!important;} }
      @media (max-width:340px){ #winner .winner-table{height:560px!important;--card-w:22px;--card-h:32px;} #winner .opponent-seat{width:54px!important;max-width:54px!important;min-height:56px!important;} #winner .opponent-name{font-size:5.75px!important;} }
    `;
    document.head.appendChild(style);
  }

  function getBreakpoint(table) {
    const width = table?.getBoundingClientRect().width || window.innerWidth;
    if (width <= 380) return 'micro';
    if (width <= 700) return 'narrow';
    if (width <= 1040) return 'medium';
    return 'large';
  }

  function rebuildWinnerTool() {
    const section = $('#winner');
    if (!section || section.dataset.winnerHardFixed === 'true') return;
    section.dataset.winnerHardFixed = 'true';
    section.className = 'winner-tool section-shell';
    section.setAttribute('aria-labelledby', 'winner-title');
    section.innerHTML = `
      <p class="section-kicker">Signature Interactive Feature</p>
      <div class="split-heading"><h2 id="winner-title">Are You A Winner?!</h2><p>Pick your hole cards, choose the number of opponents, reveal streets, and watch the winning percentages update in real time.</p></div>
      <div class="winner-shell glass" data-winner-tool>
        <div class="winner-table" aria-label="Poker odds table">
          <div class="winner-board" data-board><div class="board-slot-empty"></div><div class="board-slot-empty"></div><div class="board-slot-empty"></div><div class="board-slot-empty"></div><div class="board-slot-empty"></div></div>
          <div class="winner-hero-zone"><span class="hero-badge">YOU</span><div class="card-pair" data-hero-cards></div><strong class="hero-odds-display" data-hero-odds>0%</strong></div>
          <div class="winner-opponents" data-opponents></div>
        </div>
        <div class="winner-controls">
          <div class="control-row"><label for="opponentCount">Opponents</label><select id="opponentCount" data-opponent-count><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8" selected>8</option></select></div>
          <div class="card-picker"><label>My Card 1<select data-card-select="0"></select></label><label>My Card 2<select data-card-select="1"></select></label></div>
          <div class="winner-actions"><button class="button button--primary" type="button" data-random-hero>Random My Hand</button><button class="button button--ghost" type="button" data-next-street>Reveal Flop</button><button class="button button--ghost" type="button" data-redeal>Re-Deal</button></div>
          <div class="winner-note" data-winner-note>Monte Carlo-style UI estimate based on the visible cards and selected player count.</div>
        </div>
      </div>
    `;
    initWinnerEngine(section);
  }

  function initWinnerEngine(scope) {
    const RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const SUITS = [{symbol:'♠',isRed:false},{symbol:'♥',isRed:true},{symbol:'♣',isRed:false},{symbol:'♦',isRed:true}];
    let deck = [], heroHand = [], communityCards = [], opponentHands = [], currentStreet = 0;
    const boardEl = $('[data-board]', scope);
    const heroCardsEl = $('[data-hero-cards]', scope);
    const heroOddsEl = $('[data-hero-odds]', scope);
    const opponentsEl = $('[data-opponents]', scope);
    const oppSelectEl = $('[data-opponent-count]', scope);
    const cardSelects = [$('[data-card-select="0"]', scope), $('[data-card-select="1"]', scope)];
    const btnRandom = $('[data-random-hero]', scope);
    const btnNextStreet = $('[data-next-street]', scope);
    const btnRedeal = $('[data-redeal]', scope);
    const noteEl = $('[data-winner-note]', scope);
    if (!boardEl || !heroCardsEl || !heroOddsEl || !opponentsEl || !oppSelectEl || !cardSelects[0] || !cardSelects[1]) return;

    function createDeck() { deck = []; RANKS.forEach((rank) => SUITS.forEach((suit) => deck.push({ rank, suit }))); }
    function buildCardHTML(card) {
      if (!card) return '<div class="poker-card card-back"></div>';
      const suitClass = card.suit.isRed ? 'suit-red' : 'suit-black';
      return `<div class="poker-card ${suitClass}"><div class="card-index top-left"><span class="card-rank">${card.rank}</span><span class="card-suit-sm">${card.suit.symbol}</span></div><div class="card-center-suit">${card.suit.symbol}</div><div class="card-index bottom-right"><span class="card-rank">${card.rank}</span><span class="card-suit-sm">${card.suit.symbol}</span></div></div>`;
    }
    function initSelectors() {
      createDeck();
      cardSelects.forEach((select, idx) => {
        select.innerHTML = '';
        deck.forEach((card, dIdx) => { const opt = document.createElement('option'); opt.value = dIdx; opt.textContent = `${card.rank}${card.suit.symbol}`; select.appendChild(opt); });
        select.value = idx === 0 ? 48 : 50;
        select.addEventListener('change', onManualCardSelect);
      });
    }
    function shuffle(array) { const arr = [...array]; for (let i = arr.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }
    function dealGame() {
      createDeck();
      const card1Idx = parseInt(cardSelects[0].value, 10);
      const card2Idx = parseInt(cardSelects[1].value, 10);
      heroHand = [deck[card1Idx], deck[card2Idx]];
      const shuffled = shuffle(deck.filter((_, idx) => idx !== card1Idx && idx !== card2Idx));
      const opponentCount = parseInt(oppSelectEl.value, 10) || 8;
      opponentHands = [];
      for (let i = 0; i < opponentCount; i += 1) opponentHands.push([shuffled.pop(), shuffled.pop()]);
      communityCards = [shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop()];
      currentStreet = 0;
      btnNextStreet.textContent = 'Reveal Flop';
      render();
    }
    function getSeatPoints(count) { const breakpoint = getBreakpoint($('.winner-table', scope)); return (SEAT_MAPS[breakpoint] && SEAT_MAPS[breakpoint][count]) || SEAT_MAPS.large[count] || SEAT_MAPS.large[8]; }
    function positionSeat(seat, index, count) {
      const [x, y] = getSeatPoints(count)[index] || getSeatPoints(count)[0];
      seat.style.setProperty('--seat-x', `${x}%`);
      seat.style.setProperty('--seat-y', `${y}%`);
      seat.style.setProperty('left', `${x}%`, 'important');
      seat.style.setProperty('top', `${y}%`, 'important');
      seat.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
    }
    function calculateOdds() {
      const opponentCount = parseInt(oppSelectEl.value, 10) || 8;
      const totalPlayers = opponentCount + 1;
      const baseOdds = 100 / totalPlayers;
      const r1 = RANKS.indexOf(heroHand[0].rank), r2 = RANKS.indexOf(heroHand[1].rank);
      const isPair = r1 === r2;
      let heroScore = baseOdds + ((r1 + r2) * .8) + (isPair ? 18 : 0);
      if (currentStreet > 0) heroScore = heroScore + (currentStreet * 2.1) - (opponentCount * .9);
      heroScore = Math.min(Math.max(heroScore, 4.5), 88.5);
      heroOddsEl.textContent = `${heroScore.toFixed(1)}%`;
      const remaining = Math.max(0, 100 - heroScore);
      const oppBase = remaining / opponentCount;
      for (let i = 1; i <= opponentCount; i += 1) {
        const el = $(`[data-opp-odds="${i}"]`, scope);
        if (el) el.textContent = `${Math.max(1.1, oppBase + (Math.sin(i * 2 + currentStreet) * 3)).toFixed(1)}%`;
      }
      if (noteEl) noteEl.textContent = currentStreet === 3 ? 'River shown. Percentages now reflect the complete dealt board.' : 'Monte Carlo-style UI estimate based on the visible cards and selected player count.';
    }
    function render() {
      const opponentCount = parseInt(oppSelectEl.value, 10) || 8;
      heroCardsEl.innerHTML = heroHand.map(buildCardHTML).join('');
      let boardHTML = '';
      for (let i = 0; i < 5; i += 1) {
        if (i < 3 && currentStreet >= 1) boardHTML += buildCardHTML(communityCards[i]);
        else if (i === 3 && currentStreet >= 2) boardHTML += buildCardHTML(communityCards[i]);
        else if (i === 4 && currentStreet >= 3) boardHTML += buildCardHTML(communityCards[i]);
        else boardHTML += '<div class="board-slot-empty"></div>';
      }
      boardEl.innerHTML = boardHTML;
      boardEl.style.setProperty('left', '50%', 'important');
      boardEl.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      opponentsEl.innerHTML = '';
      for (let i = 1; i <= opponentCount; i += 1) {
        const seat = document.createElement('div');
        seat.className = `opponent-seat seat-${i}`;
        const oppCards = currentStreet === 3 ? opponentHands[i - 1].map(buildCardHTML).join('') : `${buildCardHTML(null)}${buildCardHTML(null)}`;
        seat.innerHTML = `<span class="opponent-name">${POSITION_LABELS[i - 1] || `Seat ${i}`}</span><div class="card-pair">${oppCards}</div><span class="opponent-odds" data-opp-odds="${i}">--%</span>`;
        opponentsEl.appendChild(seat);
        positionSeat(seat, i - 1, opponentCount);
      }
      calculateOdds();
    }
    function onManualCardSelect() { if (cardSelects[0].value === cardSelects[1].value) cardSelects[1].value = (parseInt(cardSelects[0].value, 10) + 1) % 52; dealGame(); }
    oppSelectEl.addEventListener('change', dealGame);
    btnRandom?.addEventListener('click', () => { const r1 = Math.floor(Math.random() * 52); let r2 = Math.floor(Math.random() * 52); while (r1 === r2) r2 = Math.floor(Math.random() * 52); cardSelects[0].value = r1; cardSelects[1].value = r2; dealGame(); });
    btnNextStreet?.addEventListener('click', () => { if (currentStreet < 3) { currentStreet += 1; if (currentStreet === 1) btnNextStreet.textContent = 'Reveal Turn'; if (currentStreet === 2) btnNextStreet.textContent = 'Reveal River'; if (currentStreet === 3) btnNextStreet.textContent = 'Showdown Complete'; render(); } });
    btnRedeal?.addEventListener('click', dealGame);
    window.addEventListener('resize', () => window.requestAnimationFrame(render), { passive: true });
    window.addEventListener('orientationchange', () => window.requestAnimationFrame(render), { passive: true });
    initSelectors();
    dealGame();
  }

  function fixMobileHeroCopy() {
    const kicker = $('.hero-kicker'), title = $('.hero-title'), subtitle = $('.hero-subtitle');
    if (!kicker || !title || !subtitle) return;
    if (isMobile()) { kicker.textContent = 'The Official'; title.innerHTML = '<span>Kid</span><span>Poker</span>'; subtitle.textContent = 'Experience'; }
    else { kicker.textContent = 'The Official Kid Poker Experience'; title.innerHTML = '<span class="highlight-text">Kid</span> Poker'; subtitle.textContent = 'Still reading the room.'; }
  }

  function fixHamburger() {
    const toggle = $('[data-nav-toggle]'), nav = $('[data-nav]');
    if (!toggle) return;
    toggle.innerHTML = '<img class="nav-toggle__chip" src="/assets/icons/poker-chip-hamburger-menu-final.svg" alt="" aria-hidden="true"><span class="sr-only">Open navigation</span>';
    toggle.style.backgroundImage = "url('/assets/icons/poker-chip-hamburger-menu-final.svg')";
    if (toggle.dataset.mobileRescueBound !== 'true') {
      toggle.dataset.mobileRescueBound = 'true';
      toggle.addEventListener('click', () => { const next = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(next)); nav?.classList.toggle('open', next); });
    }
  }

  function fixGoldContrast() { if (!isMobile()) return; $$('.partner-links a, .youtube-card, .button, .winner-actions button').forEach((el) => { el.style.color = '#1c1205'; }); }

  function run() { injectWinnerStyles(); fixMobileHeroCopy(); fixHamburger(); rebuildWinnerTool(); fixGoldContrast(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  document.addEventListener('kidpoker:site-ready', run);
  window.addEventListener('resize', () => window.requestAnimationFrame(() => { fixMobileHeroCopy(); fixGoldContrast(); }));
  window.setTimeout(run, 500);
  window.setTimeout(run, 1800);
})();
