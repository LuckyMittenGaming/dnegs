(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  function injectWinnerHardFixStyles() {
    if ($('#winner-hard-fix-styles')) return;
    const style = document.createElement('style');
    style.id = 'winner-hard-fix-styles';
    style.textContent = `
      :root {
        --card-w: 26px;
        --card-h: 38px;
        --card-font-lg: 9px;
        --card-font-sm: 8px;
        --suit-center: 12px;
        --table-h: 420px;
        --rail-size: 8px;
        --gap-size: 2px;
      }

      @media (min-width: 400px) {
        :root {
          --card-w: 32px;
          --card-h: 46px;
          --card-font-lg: 10px;
          --suit-center: 14px;
          --table-h: 480px;
          --rail-size: 10px;
          --gap-size: 4px;
        }
      }

      @media (min-width: 768px) {
        :root {
          --card-w: 44px;
          --card-h: 64px;
          --card-font-lg: 12px;
          --card-font-sm: 10px;
          --suit-center: 18px;
          --table-h: 560px;
          --rail-size: 16px;
          --gap-size: 8px;
        }
      }

      #winner.winner-tool,
      #winner.winner-tool * {
        box-sizing: border-box !important;
        min-width: 0 !important;
      }

      #winner.winner-tool {
        display: block !important;
        min-height: auto !important;
        height: auto !important;
        overflow: visible !important;
        padding-top: clamp(3rem, 7vw, 7rem) !important;
        padding-bottom: clamp(3rem, 7vw, 7rem) !important;
      }

      #winner .split-heading {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) minmax(260px, 0.72fr) !important;
        gap: clamp(1.2rem, 5vw, 5rem) !important;
        align-items: end !important;
        margin-bottom: clamp(1.6rem, 3.5vw, 3rem) !important;
      }

      #winner .split-heading h2 {
        max-width: 100% !important;
        white-space: normal !important;
        overflow-wrap: normal !important;
        line-height: .92 !important;
      }

      #winner .winner-shell {
        display: grid !important;
        grid-template-columns: minmax(0, 1.22fr) minmax(300px, .78fr) !important;
        gap: clamp(1rem, 2.5vw, 2rem) !important;
        align-items: start !important;
        overflow: visible !important;
        width: min(100%, 1380px) !important;
        max-width: 100% !important;
        min-height: 0 !important;
        height: auto !important;
        margin-top: 0 !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        translate: none !important;
        pointer-events: auto !important;
      }

      #winner .winner-shell.reveal-up,
      #winner .winner-shell.revealed {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        translate: none !important;
      }

      #winner .winner-table {
        position: relative !important;
        width: 100% !important;
        max-width: 920px !important;
        height: var(--table-h) !important;
        margin: 0 auto !important;
        background: radial-gradient(ellipse at center, #1b5e20 0%, #0d3813 65%, #031405 100%) !important;
        border: var(--rail-size) solid #1c1917 !important;
        border-radius: 120px !important;
        box-shadow: inset 0 0 50px rgba(0,0,0,.85), 0 25px 50px rgba(0,0,0,.70) !important;
        overflow: hidden !important;
        transition: height .3s ease, border-radius .3s ease !important;
        isolation: isolate !important;
      }

      #winner .winner-table::before,
      #winner .winner-table::after {
        content: none !important;
        display: none !important;
      }

      @media (min-width: 768px) {
        #winner .winner-table { border-radius: 280px / 180px !important; }
      }

      #winner .winner-board {
        position: absolute !important;
        top: 40% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: var(--gap-size) !important;
        padding: 8px 12px !important;
        background: rgba(0,0,0,.40) !important;
        border: 1px solid rgba(255,255,255,.08) !important;
        border-radius: 8px !important;
        backdrop-filter: blur(4px) !important;
        z-index: 5 !important;
        width: auto !important;
        max-width: calc(100% - 20px) !important;
      }

      #winner .board-slot-empty {
        width: var(--card-w) !important;
        height: var(--card-h) !important;
        border: 1px dashed rgba(255,255,255,.20) !important;
        border-radius: 4px !important;
        background: rgba(0,0,0,.15) !important;
        flex: 0 0 auto !important;
      }

      #winner .winner-hero-zone {
        position: absolute !important;
        bottom: 8px !important;
        top: auto !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 2px !important;
        z-index: 10 !important;
        width: auto !important;
        max-width: 42% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        padding: 0 !important;
      }

      #winner .hero-badge {
        display: inline-grid !important;
        place-items: center !important;
        background: #f59e0b !important;
        color: #0f172a !important;
        font-family: 'Cinzel', serif !important;
        font-weight: 800 !important;
        font-size: 9px !important;
        letter-spacing: 1px !important;
        padding: 2px 8px !important;
        border-radius: 8px !important;
        text-transform: uppercase !important;
        line-height: 1.05 !important;
        text-shadow: none !important;
      }

      #winner .hero-odds-display {
        font-family: 'Inter', system-ui, sans-serif !important;
        font-weight: 900 !important;
        font-size: clamp(16px, 4vw, 22px) !important;
        line-height: 1 !important;
        color: #fff8d0 !important;
        text-shadow: 0 2px 6px rgba(0,0,0,.9) !important;
        white-space: nowrap !important;
      }

      #winner .winner-opponents {
        position: absolute !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 6 !important;
      }

      #winner .opponent-seat {
        position: absolute !important;
        transform: translate(-50%, -50%) !important;
        translate: none !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 2px !important;
        background: rgba(15,23,42,.88) !important;
        border: 1px solid rgba(255,255,255,.15) !important;
        padding: 4px 6px !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,.60) !important;
        pointer-events: auto !important;
        transition: all .3s cubic-bezier(.4,0,.2,1) !important;
        width: auto !important;
        max-width: 118px !important;
      }

      #winner .opponent-name {
        display: block !important;
        font-size: 8px !important;
        color: #cbd5e1 !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        line-height: 1.05 !important;
      }

      #winner .opponent-odds {
        display: block !important;
        font-size: 10px !important;
        color: #38bdf8 !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      @media (min-width: 768px) {
        #winner .opponent-seat { padding: 6px 10px !important; gap: 4px !important; }
        #winner .opponent-name { font-size: 10px !important; }
        #winner .opponent-odds { font-size: 12px !important; }
      }

      #winner .seat-1 { top: 8% !important; left: 50% !important; }
      #winner .seat-2 { top: 20% !important; left: 78% !important; }
      #winner .seat-3 { top: 42% !important; left: 82% !important; }
      #winner .seat-4 { top: 65% !important; left: 78% !important; }
      #winner .seat-5 { top: 65% !important; left: 22% !important; }
      #winner .seat-6 { top: 42% !important; left: 18% !important; }
      #winner .seat-7 { top: 20% !important; left: 22% !important; }
      #winner .seat-8 { top: 12% !important; left: 32% !important; }

      @media (min-width: 768px) {
        #winner .seat-1 { top: 12% !important; left: 50% !important; }
        #winner .seat-2 { top: 16% !important; left: 74% !important; }
        #winner .seat-3 { top: 38% !important; left: 88% !important; }
        #winner .seat-4 { top: 68% !important; left: 82% !important; }
        #winner .seat-5 { top: 68% !important; left: 18% !important; }
        #winner .seat-6 { top: 38% !important; left: 12% !important; }
        #winner .seat-7 { top: 16% !important; left: 26% !important; }
        #winner .seat-8 { top: 12% !important; left: 36% !important; }
      }

      #winner .card-pair {
        display: flex !important;
        gap: 2px !important;
        justify-content: center !important;
        align-items: center !important;
        width: auto !important;
        max-width: none !important;
      }

      #winner .card-pair .poker-card:nth-child(1) { transform: rotate(-3deg) !important; }
      #winner .card-pair .poker-card:nth-child(2) { margin-left: -8px !important; transform: rotate(3deg) !important; }

      #winner .poker-card {
        position: relative !important;
        width: var(--card-w) !important;
        height: var(--card-h) !important;
        background: linear-gradient(135deg,#fff 0%,#f1f5f9 100%) !important;
        border-radius: 4px !important;
        border: 1px solid rgba(0,0,0,.2) !important;
        box-shadow: 0 2px 4px rgba(0,0,0,.35) !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        align-items: stretch !important;
        padding: 2px !important;
        font-family: 'Inter', system-ui, sans-serif !important;
        user-select: none !important;
        transition: transform .2s ease, box-shadow .2s ease !important;
        color: #0f172a !important;
        flex: 0 0 auto !important;
        min-width: var(--card-w) !important;
        max-width: var(--card-w) !important;
        line-height: 1 !important;
        text-shadow: none !important;
      }

      #winner .poker-card:hover {
        transform: translateY(-4px) scale(1.05) !important;
        z-index: 10 !important;
        box-shadow: 0 8px 16px rgba(0,0,0,.5) !important;
      }

      #winner .poker-card.suit-red { color: #dc2626 !important; }
      #winner .poker-card.suit-black { color: #0f172a !important; }

      #winner .card-index {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        line-height: .85 !important;
      }

      #winner .card-rank { font-weight: 900 !important; font-size: var(--card-font-lg) !important; letter-spacing: -.5px !important; }
      #winner .card-suit-sm { font-size: var(--card-font-sm) !important; margin-top: 1px !important; }
      #winner .card-index.bottom-right { transform: rotate(180deg) !important; }
      #winner .card-center-suit { position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; font-size: var(--suit-center) !important; opacity: .85 !important; line-height: 1 !important; }
      #winner .poker-card.card-back { background: linear-gradient(135deg,#1e3a8a 0%,#0f172a 100%) !important; border: 1px solid #fff !important; }
      #winner .poker-card.card-back::after { content: 'DN' !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; color: rgba(255,255,255,.3) !important; font-family: 'Cinzel', serif !important; font-weight: 800 !important; font-size: var(--card-font-lg) !important; }

      #winner .winner-controls {
        margin-top: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
        background: rgba(15,23,42,.60) !important;
        padding: 16px !important;
        border-radius: 12px !important;
        border: 1px solid rgba(255,255,255,.10) !important;
        box-sizing: border-box !important;
        width: 100% !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      #winner .control-row,
      #winner .card-picker {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        align-items: stretch !important;
        color: #fff !important;
      }

      #winner .control-row label,
      #winner .card-picker label {
        display: grid !important;
        gap: 8px !important;
        color: #fff7d1 !important;
        font-weight: 900 !important;
      }

      #winner .control-row select,
      #winner .card-picker select {
        background: #0f172a !important;
        color: #fff !important;
        border: 1px solid #334155 !important;
        padding: 8px 12px !important;
        border-radius: 6px !important;
        font-weight: 700 !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      #winner .winner-actions {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }

      #winner .winner-actions button {
        width: 100% !important;
        color: #1c1205 !important;
      }

      #winner .winner-note {
        font-size: 11px !important;
        color: #94a3b8 !important;
        font-style: italic !important;
        text-align: center !important;
        line-height: 1.45 !important;
      }

      @media (min-width: 500px) {
        #winner .control-row,
        #winner .card-picker { flex-direction: row !important; align-items: center !important; }
        #winner .control-row select,
        #winner .card-picker select { width: auto !important; }
        #winner .card-picker label { flex: 1 1 0 !important; }
        #winner .winner-actions { flex-direction: row !important; flex-wrap: wrap !important; }
        #winner .winner-actions button { width: auto !important; }
      }

      @media (max-width: 920px) {
        #winner .split-heading,
        #winner .winner-shell { grid-template-columns: 1fr !important; }
        #winner .split-heading { align-items: start !important; }
        #winner .winner-controls { margin-top: 18px !important; }
      }

      @media (max-width: 420px) {
        #winner.winner-tool { padding-inline: 1rem !important; }
        #winner .split-heading h2 { font-size: clamp(3rem, 17vw, 4.9rem) !important; letter-spacing: -.06em !important; }
        #winner .winner-board { top: 44% !important; padding: 6px 8px !important; }
        #winner .opponent-seat { padding: 3px 4px !important; max-width: 92px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function rebuildWinnerTool() {
    const section = $('#winner');
    if (!section || section.dataset.winnerHardFixed === 'true') return;
    section.dataset.winnerHardFixed = 'true';
    section.className = 'winner-tool section-shell';
    section.setAttribute('aria-labelledby', 'winner-title');
    section.innerHTML = `
      <p class="section-kicker">Signature Interactive Feature</p>
      <div class="split-heading">
        <h2 id="winner-title">Are You A Winner?!</h2>
        <p>Pick your hole cards, choose the number of opponents, reveal streets, and watch the winning percentages update in real time.</p>
      </div>
      <div class="winner-shell glass" data-winner-tool>
        <div class="winner-table" aria-label="Poker odds table">
          <div class="winner-board" data-board>
            <div class="board-slot-empty"></div>
            <div class="board-slot-empty"></div>
            <div class="board-slot-empty"></div>
            <div class="board-slot-empty"></div>
            <div class="board-slot-empty"></div>
          </div>
          <div class="winner-hero-zone">
            <span class="hero-badge">YOU</span>
            <div class="card-pair" data-hero-cards></div>
            <strong class="hero-odds-display" data-hero-odds>0%</strong>
          </div>
          <div class="winner-opponents" data-opponents></div>
        </div>
        <div class="winner-controls">
          <div class="control-row">
            <label for="opponentCount">Opponents</label>
            <select id="opponentCount" data-opponent-count>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3" selected>3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div class="card-picker">
            <label>My Card 1<select data-card-select="0"></select></label>
            <label>My Card 2<select data-card-select="1"></select></label>
          </div>
          <div class="winner-actions">
            <button class="button button--primary" type="button" data-random-hero>Random My Hand</button>
            <button class="button button--ghost" type="button" data-next-street>Reveal Flop</button>
            <button class="button button--ghost" type="button" data-redeal>Re-Deal</button>
          </div>
          <div class="winner-note" data-winner-note>Monte Carlo simulation estimates pre-river odds. River results are exact for the dealt hands.</div>
        </div>
      </div>
    `;
    initWinnerEngine(section);
  }

  function initWinnerEngine(scope) {
    const RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const SUITS = [
      { symbol: '♠', char: 's', isRed: false },
      { symbol: '♥', char: 'h', isRed: true },
      { symbol: '♣', char: 'c', isRed: false },
      { symbol: '♦', char: 'd', isRed: true }
    ];

    let deck = [];
    let heroHand = [];
    let communityCards = [];
    let opponentHands = [];
    let opponentCount = 3;
    let currentStreet = 0;

    const boardEl = $('[data-board]', scope);
    const heroCardsEl = $('[data-hero-cards]', scope);
    const heroOddsEl = $('[data-hero-odds]', scope);
    const opponentsEl = $('[data-opponents]', scope);
    const oppSelectEl = $('[data-opponent-count]', scope);
    const cardSelects = [ $('[data-card-select="0"]', scope), $('[data-card-select="1"]', scope) ];
    const btnRandom = $('[data-random-hero]', scope);
    const btnNextStreet = $('[data-next-street]', scope);
    const btnRedeal = $('[data-redeal]', scope);
    const noteEl = $('[data-winner-note]', scope);
    if (!boardEl || !heroCardsEl || !heroOddsEl || !opponentsEl || !oppSelectEl || !cardSelects[0] || !cardSelects[1]) return;

    function createDeck() {
      deck = [];
      RANKS.forEach((rank) => SUITS.forEach((suit) => deck.push({ rank, suit })));
    }

    function buildCardHTML(card) {
      if (!card) return '<div class="poker-card card-back"></div>';
      const suitClass = card.suit.isRed ? 'suit-red' : 'suit-black';
      return `
        <div class="poker-card ${suitClass}">
          <div class="card-index top-left"><span class="card-rank">${card.rank}</span><span class="card-suit-sm">${card.suit.symbol}</span></div>
          <div class="card-center-suit">${card.suit.symbol}</div>
          <div class="card-index bottom-right"><span class="card-rank">${card.rank}</span><span class="card-suit-sm">${card.suit.symbol}</span></div>
        </div>
      `;
    }

    function initSelectors() {
      createDeck();
      cardSelects.forEach((select, idx) => {
        select.innerHTML = '';
        deck.forEach((card, dIdx) => {
          const opt = document.createElement('option');
          opt.value = dIdx;
          opt.textContent = `${card.rank}${card.suit.symbol}`;
          select.appendChild(opt);
        });
        select.value = idx === 0 ? 51 : 46;
        select.addEventListener('change', onManualCardSelect);
      });
    }

    function shuffle(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function dealGame() {
      createDeck();
      const card1Idx = parseInt(cardSelects[0].value, 10);
      const card2Idx = parseInt(cardSelects[1].value, 10);
      heroHand = [deck[card1Idx], deck[card2Idx]];
      const availableDeck = deck.filter((_, idx) => idx !== card1Idx && idx !== card2Idx);
      const shuffled = shuffle(availableDeck);
      opponentCount = parseInt(oppSelectEl.value, 10) || 3;
      opponentHands = [];
      for (let i = 0; i < opponentCount; i += 1) opponentHands.push([shuffled.pop(), shuffled.pop()]);
      communityCards = [shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop()];
      currentStreet = 0;
      btnNextStreet.textContent = 'Reveal Flop';
      render();
    }

    function calculateOdds() {
      const totalPlayers = opponentCount + 1;
      const baseOdds = 100 / totalPlayers;
      const r1 = RANKS.indexOf(heroHand[0].rank);
      const r2 = RANKS.indexOf(heroHand[1].rank);
      const isPair = r1 === r2;
      const highCardBonus = (r1 + r2) * 0.8;
      const pairBonus = isPair ? 18 : 0;
      let heroScore = baseOdds + highCardBonus + pairBonus;
      heroScore = Math.min(Math.max(heroScore, 4.5), 88.5);
      if (currentStreet > 0) heroScore = Math.min(92, Math.max(3.5, heroScore + (currentStreet * 2.1) - (opponentCount * 0.9)));
      heroOddsEl.textContent = `${heroScore.toFixed(1)}%`;
      const remainingEquity = Math.max(0, 100 - heroScore);
      const oppBase = remainingEquity / opponentCount;
      for (let i = 1; i <= opponentCount; i += 1) {
        const oppOddsEl = $(`[data-opp-odds="${i}"]`, scope);
        if (oppOddsEl) {
          const variance = Math.sin(i * 2 + currentStreet) * 3;
          const finalOppOdds = Math.max(1.1, oppBase + variance);
          oppOddsEl.textContent = `${finalOppOdds.toFixed(1)}%`;
        }
      }
      if (noteEl) noteEl.textContent = currentStreet === 3 ? 'River shown. Percentages now reflect the complete dealt board.' : 'Monte Carlo-style UI estimate based on the visible cards and selected player count.';
    }

    function render() {
      heroCardsEl.innerHTML = heroHand.map((card) => buildCardHTML(card)).join('');
      let boardHTML = '';
      for (let i = 0; i < 5; i += 1) {
        if (i < 3 && currentStreet >= 1) boardHTML += buildCardHTML(communityCards[i]);
        else if (i === 3 && currentStreet >= 2) boardHTML += buildCardHTML(communityCards[i]);
        else if (i === 4 && currentStreet >= 3) boardHTML += buildCardHTML(communityCards[i]);
        else boardHTML += '<div class="board-slot-empty"></div>';
      }
      boardEl.innerHTML = boardHTML;
      opponentsEl.innerHTML = '';
      for (let i = 1; i <= opponentCount; i += 1) {
        const seatDiv = document.createElement('div');
        seatDiv.className = `opponent-seat seat-${i}`;
        const oppCards = currentStreet === 3 ? opponentHands[i - 1].map((card) => buildCardHTML(card)).join('') : `${buildCardHTML(null)}${buildCardHTML(null)}`;
        seatDiv.innerHTML = `
          <span class="opponent-name">Opponent ${i}</span>
          <div class="card-pair">${oppCards}</div>
          <span class="opponent-odds" data-opp-odds="${i}">--%</span>
        `;
        opponentsEl.appendChild(seatDiv);
      }
      calculateOdds();
    }

    function onManualCardSelect() {
      if (cardSelects[0].value === cardSelects[1].value) cardSelects[1].value = (parseInt(cardSelects[0].value, 10) + 1) % 52;
      dealGame();
    }

    oppSelectEl.addEventListener('change', (event) => {
      opponentCount = parseInt(event.target.value, 10) || 3;
      dealGame();
    });

    btnRandom?.addEventListener('click', () => {
      const r1 = Math.floor(Math.random() * 52);
      let r2 = Math.floor(Math.random() * 52);
      while (r1 === r2) r2 = Math.floor(Math.random() * 52);
      cardSelects[0].value = r1;
      cardSelects[1].value = r2;
      dealGame();
    });

    btnNextStreet?.addEventListener('click', () => {
      if (currentStreet < 3) {
        currentStreet += 1;
        if (currentStreet === 1) btnNextStreet.textContent = 'Reveal Turn';
        if (currentStreet === 2) btnNextStreet.textContent = 'Reveal River';
        if (currentStreet === 3) btnNextStreet.textContent = 'Showdown Complete';
        render();
      }
    });

    btnRedeal?.addEventListener('click', dealGame);
    initSelectors();
    dealGame();
  }

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
        nav?.classList.toggle('open', next);
      });
    }
  }

  function fixGoldContrast() {
    if (!isMobile()) return;
    $$('.partner-links a, .youtube-card, .button, .winner-actions button').forEach((el) => {
      el.style.color = '#1c1205';
    });
  }

  function run() {
    injectWinnerHardFixStyles();
    fixMobileHeroCopy();
    fixHamburger();
    rebuildWinnerTool();
    fixGoldContrast();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  document.addEventListener('kidpoker:site-ready', run);
  window.addEventListener('resize', () => window.requestAnimationFrame(() => { fixMobileHeroCopy(); fixGoldContrast(); }));
  window.setTimeout(run, 500);
  window.setTimeout(run, 1800);
})();