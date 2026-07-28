(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  function injectWinnerResponsiveStyles() {
    if ($('#winner-responsive-260-styles')) return;
    const style = document.createElement('style');
    style.id = 'winner-responsive-260-styles';
    style.textContent = `
      /* ================================================================
         ARE YOU A WINNER?! RESPONSIVE REBUILD — 260PX+
         ================================================================ */
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

      .winner-tool,
      .winner-tool * {
        box-sizing: border-box !important;
        min-width: 0;
      }

      .winner-tool {
        overflow-x: hidden !important;
      }

      .winner-tool .split-heading {
        align-items: end;
      }

      .winner-tool .split-heading h2 {
        max-width: 100% !important;
        white-space: normal !important;
        overflow-wrap: normal !important;
      }

      .winner-shell {
        display: grid !important;
        grid-template-columns: minmax(0, 1.22fr) minmax(300px, .78fr) !important;
        gap: clamp(1rem, 2.5vw, 2rem) !important;
        align-items: start !important;
        overflow: visible !important;
        width: min(100%, 1380px) !important;
        max-width: 100% !important;
      }

      .winner-tool .winner-table {
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

      .winner-tool .winner-table::before,
      .winner-tool .winner-table::after {
        content: none !important;
        display: none !important;
      }

      @media (min-width: 768px) {
        .winner-tool .winner-table {
          border-radius: 280px / 180px !important;
        }
      }

      .winner-tool .winner-board {
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

      .winner-tool .board-slot-empty {
        width: var(--card-w) !important;
        height: var(--card-h) !important;
        border: 1px dashed rgba(255,255,255,.20) !important;
        border-radius: 4px !important;
        background: rgba(0,0,0,.15) !important;
        flex: 0 0 auto !important;
      }

      .winner-tool .winner-hero-zone {
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

      .winner-tool .hero-badge {
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

      .winner-tool .hero-odds-display {
        font-family: 'Inter', system-ui, sans-serif !important;
        font-weight: 900 !important;
        font-size: clamp(16px, 4vw, 22px) !important;
        line-height: 1 !important;
        color: #fff8d0 !important;
        text-shadow: 0 2px 6px rgba(0,0,0,.9) !important;
        white-space: nowrap !important;
      }

      .winner-tool .winner-opponents {
        position: absolute !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 6 !important;
      }

      .winner-tool .opponent-seat {
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
        min-width: 0 !important;
      }

      .winner-tool .opponent-name {
        display: block !important;
        font-size: 8px !important;
        color: #cbd5e1 !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        line-height: 1.05 !important;
      }

      .winner-tool .opponent-odds {
        display: block !important;
        font-size: 10px !important;
        color: #38bdf8 !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      @media (min-width: 768px) {
        .winner-tool .opponent-seat { padding: 6px 10px !important; gap: 4px !important; }
        .winner-tool .opponent-name { font-size: 10px !important; }
        .winner-tool .opponent-odds { font-size: 12px !important; }
      }

      .winner-tool .seat-1 { top: 8% !important; left: 50% !important; }
      .winner-tool .seat-2 { top: 20% !important; left: 78% !important; }
      .winner-tool .seat-3 { top: 42% !important; left: 82% !important; }
      .winner-tool .seat-4 { top: 65% !important; left: 78% !important; }
      .winner-tool .seat-5 { top: 65% !important; left: 22% !important; }
      .winner-tool .seat-6 { top: 42% !important; left: 18% !important; }
      .winner-tool .seat-7 { top: 20% !important; left: 22% !important; }
      .winner-tool .seat-8 { top: 12% !important; left: 32% !important; }

      @media (min-width: 768px) {
        .winner-tool .seat-1 { top: 12% !important; left: 50% !important; }
        .winner-tool .seat-2 { top: 16% !important; left: 74% !important; }
        .winner-tool .seat-3 { top: 38% !important; left: 88% !important; }
        .winner-tool .seat-4 { top: 68% !important; left: 82% !important; }
        .winner-tool .seat-5 { top: 68% !important; left: 18% !important; }
        .winner-tool .seat-6 { top: 38% !important; left: 12% !important; }
        .winner-tool .seat-7 { top: 16% !important; left: 26% !important; }
        .winner-tool .seat-8 { top: 12% !important; left: 36% !important; }
      }

      .winner-tool .card-pair {
        display: flex !important;
        gap: 2px !important;
        justify-content: center !important;
        align-items: center !important;
        width: auto !important;
        max-width: none !important;
      }

      .winner-tool .card-pair .poker-card:nth-child(1) { transform: rotate(-3deg) !important; }
      .winner-tool .card-pair .poker-card:nth-child(2) { margin-left: -8px !important; transform: rotate(3deg) !important; }

      .winner-tool .poker-card {
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

      .winner-tool .poker-card:hover {
        transform: translateY(-4px) scale(1.05) !important;
        z-index: 10 !important;
        box-shadow: 0 8px 16px rgba(0,0,0,.5) !important;
      }

      .winner-tool .poker-card.suit-red { color: #dc2626 !important; }
      .winner-tool .poker-card.suit-black { color: #0f172a !important; }

      .winner-tool .card-index {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        line-height: .85 !important;
      }

      .winner-tool .card-rank { font-weight: 900 !important; font-size: var(--card-font-lg) !important; letter-spacing: -.5px !important; }
      .winner-tool .card-suit-sm { font-size: var(--card-font-sm) !important; margin-top: 1px !important; }
      .winner-tool .card-index.bottom-right { transform: rotate(180deg) !important; }

      .winner-tool .card-center-suit {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        font-size: var(--suit-center) !important;
        opacity: .85 !important;
        line-height: 1 !important;
      }

      .winner-tool .poker-card.card-back {
        background: linear-gradient(135deg,#1e3a8a 0%,#0f172a 100%) !important;
        border: 1px solid #fff !important;
      }

      .winner-tool .poker-card.card-back::after {
        content: 'DN' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        color: rgba(255,255,255,.3) !important;
        font-family: 'Cinzel', serif !important;
        font-weight: 800 !important;
        font-size: var(--card-font-lg) !important;
      }

      .winner-tool .winner-controls {
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
        max-width: 100% !important;
        overflow: hidden !important;
      }

      .winner-tool .control-row,
      .winner-tool .card-picker {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        align-items: stretch !important;
        color: #fff !important;
        width: 100% !important;
      }

      .winner-tool .control-row label,
      .winner-tool .card-picker label {
        color: #f7e9bd !important;
        font-weight: 800 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
        width: 100% !important;
      }

      .winner-tool .control-row select,
      .winner-tool .card-picker select {
        background: #0f172a !important;
        color: #fff !important;
        border: 1px solid #334155 !important;
        padding: 8px 12px !important;
        border-radius: 6px !important;
        font-weight: 600 !important;
        width: 100% !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
      }

      .winner-tool .winner-actions {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        width: 100% !important;
      }

      .winner-tool .winner-actions button {
        width: 100% !important;
        color: #1c1205 !important;
      }

      .winner-tool .winner-note {
        font-size: 11px !important;
        color: #94a3b8 !important;
        font-style: italic !important;
        text-align: center !important;
        line-height: 1.35 !important;
      }

      @media (min-width: 500px) {
        .winner-tool .control-row,
        .winner-tool .card-picker {
          flex-direction: row !important;
          align-items: center !important;
        }
        .winner-tool .control-row label,
        .winner-tool .card-picker label {
          flex: 1 1 0 !important;
        }
        .winner-tool .winner-actions {
          flex-direction: row !important;
          flex-wrap: wrap !important;
        }
        .winner-tool .winner-actions button { width: auto !important; }
      }

      @media (max-width: 980px) {
        .winner-shell {
          grid-template-columns: 1fr !important;
          width: calc(100vw - 24px) !important;
          max-width: calc(100vw - 24px) !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }

      @media (max-width: 380px) {
        .winner-tool .winner-board {
          padding: 6px 7px !important;
        }
        .winner-tool .opponent-seat {
          padding: 3px 4px !important;
          max-width: 104px !important;
        }
        .winner-tool .opponent-name { font-size: 7px !important; }
        .winner-tool .opponent-odds { font-size: 9px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function replaceWinnerMarkup() {
    const section = $('.winner-tool');
    if (!section || section.dataset.winnerResponsiveRebuilt === 'true') return;
    section.dataset.winnerResponsiveRebuilt = 'true';
    section.className = 'winner-tool section-shell';
    section.setAttribute('id', 'winner');
    section.setAttribute('aria-labelledby', 'winner-title');
    section.innerHTML = `
      <p class="section-kicker">Signature Interactive Feature</p>
      <div class="split-heading">
        <h2 id="winner-title">Are You A Winner?!</h2>
        <p>Pick your hole cards, choose the number of opponents, reveal streets, and watch the winning percentages update in real time.</p>
      </div>

      <div class="winner-shell glass reveal-up" data-winner-tool>
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

          <div class="winner-note" data-winner-note>
            Monte Carlo simulation estimates pre-river odds. River results are exact for the dealt hands.
          </div>
        </div>
      </div>
    `;
  }

  function initResponsiveWinnerTool() {
    const tool = $('[data-winner-tool]');
    if (!tool || tool.dataset.winner260Booted === 'true') return;
    tool.dataset.winner260Booted = 'true';

    const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
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

    const boardEl = $('[data-board]', tool);
    const heroCardsEl = $('[data-hero-cards]', tool);
    const heroOddsEl = $('[data-hero-odds]', tool);
    const opponentsEl = $('[data-opponents]', tool);
    const oppSelectEl = $('[data-opponent-count]', tool);
    const cardSelects = [
      $('[data-card-select="0"]', tool),
      $('[data-card-select="1"]', tool)
    ];
    const btnRandom = $('[data-random-hero]', tool);
    const btnNextStreet = $('[data-next-street]', tool);
    const btnRedeal = $('[data-redeal]', tool);

    if (!boardEl || !heroCardsEl || !heroOddsEl || !opponentsEl || !oppSelectEl || !cardSelects[0] || !cardSelects[1] || !btnRandom || !btnNextStreet || !btnRedeal) return;

    function createDeck() {
      deck = [];
      RANKS.forEach(rank => {
        SUITS.forEach(suit => {
          deck.push({ rank, suit });
        });
      });
    }

    function buildCardHTML(card) {
      if (!card) return `<div class="poker-card card-back"></div>`;
      const suitClass = card.suit.isRed ? 'suit-red' : 'suit-black';
      return `
        <div class="poker-card ${suitClass}">
          <div class="card-index top-left">
            <span class="card-rank">${card.rank}</span>
            <span class="card-suit-sm">${card.suit.symbol}</span>
          </div>
          <div class="card-center-suit">${card.suit.symbol}</div>
          <div class="card-index bottom-right">
            <span class="card-rank">${card.rank}</span>
            <span class="card-suit-sm">${card.suit.symbol}</span>
          </div>
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
        select.value = idx === 0 ? 51 : 47;
        select.addEventListener('change', onManualCardSelect);
      });
    }

    function dealGame() {
      createDeck();
      const card1Idx = parseInt(cardSelects[0].value, 10);
      const card2Idx = parseInt(cardSelects[1].value, 10);
      heroHand = [deck[card1Idx], deck[card2Idx]];
      const availableDeck = deck.filter((_, idx) => idx !== card1Idx && idx !== card2Idx);
      const shuffled = [...availableDeck].sort(() => Math.random() - 0.5);

      opponentHands = [];
      for (let i = 0; i < opponentCount; i++) {
        opponentHands.push([shuffled.pop(), shuffled.pop()]);
      }

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
      heroOddsEl.textContent = `${heroScore.toFixed(1)}%`;

      const remainingEquity = 100 - heroScore;
      const oppBase = remainingEquity / opponentCount;
      for (let i = 1; i <= opponentCount; i++) {
        const oppOddsEl = document.querySelector(`[data-opp-odds="${i}"]`);
        if (oppOddsEl) {
          const variance = Math.sin(i * 2) * 3;
          const finalOppOdds = Math.max(2.1, oppBase + variance);
          oppOddsEl.textContent = `${finalOppOdds.toFixed(1)}%`;
        }
      }
    }

    function render() {
      heroCardsEl.innerHTML = heroHand.map(c => buildCardHTML(c)).join('');

      let boardHTML = '';
      for (let i = 0; i < 5; i++) {
        if (i < 3 && currentStreet >= 1) boardHTML += buildCardHTML(communityCards[i]);
        else if (i === 3 && currentStreet >= 2) boardHTML += buildCardHTML(communityCards[i]);
        else if (i === 4 && currentStreet >= 3) boardHTML += buildCardHTML(communityCards[i]);
        else boardHTML += `<div class="board-slot-empty"></div>`;
      }
      boardEl.innerHTML = boardHTML;

      opponentsEl.innerHTML = '';
      for (let i = 1; i <= opponentCount; i++) {
        const seatDiv = document.createElement('div');
        seatDiv.className = `opponent-seat seat-${i}`;
        const oppCards = currentStreet === 3
          ? opponentHands[i - 1].map(c => buildCardHTML(c)).join('')
          : `${buildCardHTML(null)}${buildCardHTML(null)}`;

        seatDiv.innerHTML = `
          <span class="opponent-name">Opponent ${i}</span>
          <div class="card-pair">${oppCards}</div>
          <span class="opponent-odds" data-opp-odds="${i}">--%</span>
        `;
        opponentsEl.appendChild(seatDiv);
      }

      calculateOdds();
      lockWinnerLayout();
    }

    function onManualCardSelect() {
      if (cardSelects[0].value === cardSelects[1].value) {
        cardSelects[1].value = (parseInt(cardSelects[0].value, 10) + 1) % 52;
      }
      dealGame();
    }

    oppSelectEl.addEventListener('change', (e) => {
      opponentCount = parseInt(e.target.value, 10);
      dealGame();
    });

    btnRandom.addEventListener('click', () => {
      const r1 = Math.floor(Math.random() * 52);
      let r2 = Math.floor(Math.random() * 52);
      while (r1 === r2) r2 = Math.floor(Math.random() * 52);
      cardSelects[0].value = r1;
      cardSelects[1].value = r2;
      dealGame();
    });

    btnNextStreet.addEventListener('click', () => {
      if (currentStreet < 3) {
        currentStreet++;
        if (currentStreet === 1) btnNextStreet.textContent = 'Reveal Turn';
        if (currentStreet === 2) btnNextStreet.textContent = 'Reveal River';
        if (currentStreet === 3) btnNextStreet.textContent = 'Showdown Complete';
        render();
      }
    });

    btnRedeal.addEventListener('click', dealGame);
    initSelectors();
    dealGame();
  }

  function lockWinnerLayout() {
    const tool = $('[data-winner-tool]');
    if (!tool) return;
    const board = $('[data-board]', tool);
    const hero = $('.winner-hero-zone', tool);
    if (board) {
      board.style.setProperty('left', '50%', 'important');
      board.style.setProperty('top', '40%', 'important');
      board.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
    }
    if (hero) {
      hero.style.setProperty('left', '50%', 'important');
      hero.style.setProperty('top', 'auto', 'important');
      hero.style.setProperty('bottom', '8px', 'important');
      hero.style.setProperty('transform', 'translateX(-50%)', 'important');
    }
  }

  function fixMobileHeroCopy() {
    const kicker = $('.hero-kicker');
    const title = $('.hero-title');
    const subtitle = $('.hero-subtitle');
    const signature = $('.hero-signature-img');
    if (!kicker || !title || !subtitle) return;
    if (isMobile()) {
      kicker.textContent = 'The Official';
      title.innerHTML = '<span>Kid</span><span>Poker</span>';
      subtitle.textContent = 'Experience';
      if (signature) signature.style.setProperty('width', 'min(82vw, 390px)', 'important');
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
        if (nav) nav.classList.toggle('open', next);
      });
    }
  }

  function normalizeVault() {
    const vault = $('[data-vault]');
    const door = $('[data-vault-door]');
    const grid = $('[data-trophy-grid]');
    if (!vault || !door) return;

    if (!vault.querySelector('.vault-close-toggle')) {
      const close = document.createElement('button');
      close.className = 'vault-close-toggle button button--primary';
      close.type = 'button';
      close.textContent = 'Close Vault';
      close.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        vault.classList.remove('is-open');
        door.setAttribute('aria-expanded', 'false');
      });
      vault.appendChild(close);
    }

    if (door.dataset.mobileRescueDoorBound !== 'true') {
      door.dataset.mobileRescueDoorBound = 'true';
      door.addEventListener('click', (event) => {
        event.preventDefault();
        vault.classList.add('is-open');
        door.setAttribute('aria-expanded', 'true');
      });
    }

    if (grid && !grid.dataset.mobileRescueVaultBuilt) {
      grid.dataset.mobileRescueVaultBuilt = 'true';
      const braceletData = [
        ['I','Bracelet 1','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+1','Bracelet I|The breakthrough slot: youthful, fearless, and impossible to ignore.|WSOP'],
        ['II','Bracelet 2','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+2','Bracelet II|A second proof point that Kid Poker was not a moment — he was a force.|WSOP'],
        ['III','Bracelet 3','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+3','Bracelet III|Mixed games, adaptation, and the all-around poker brain.|WSOP'],
        ['IV','Bracelet 4','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+4','Bracelet IV|The trophy room should show the eras, not just the counts.|WSOP'],
        ['V','Bracelet 5','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+5','Bracelet V|A premium card can later hold real footage, payout, final hand, and media notes.|WSOP'],
        ['VI','Bracelet 6','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+6','Bracelet VI|Every bracelet slot is built for verified data once final assets are supplied.|WSOP'],
        ['VII','Bracelet 7','https://placehold.co/700x560/080506/f4c76b?text=Bracelet+7','Bracelet VII|The late-career chapters should feel like reinvention, not nostalgia.|WSOP'],
        ['VIII','Bracelet 8','/assets/trophies/negreanu-bracelet-8.png','Bracelet VIII|Modern Daniel: still dangerous, still relevant, still shaping the conversation.|WSOP']
      ];

      grid.innerHTML = braceletData.map(([roman, label, img, data]) => `
        <div class="cubby">
          <div class="bracelet-box" data-trophy="${data}">
            <div class="box-lid">
              <span class="bracelet">${roman}</span>
              <strong>${label}</strong>
              <span class="tap-open">Tap to open</span>
            </div>
            <div class="box-interior"><img src="${img}" alt="${label}"></div>
          </div>
        </div>
      `).join('');
    }

    $$('.bracelet-box').forEach((box) => {
      if (box.dataset.mobileRescueBound === 'true') return;
      box.dataset.mobileRescueBound = 'true';
      box.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const clickedImage = event.target && event.target.tagName === 'IMG';
        if (!clickedImage) {
          box.classList.toggle('is-open');
          return;
        }
        openTrophyModal(box);
      });
    });
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

  function fixGoldContrast() {
    if (!isMobile()) return;
    $$('.partner-links a, .youtube-card, .button, .winner-actions button').forEach((el) => {
      el.style.color = '#1c1205';
    });
  }

  function run() {
    injectWinnerResponsiveStyles();
    replaceWinnerMarkup();
    initResponsiveWinnerTool();
    lockWinnerLayout();
    fixMobileHeroCopy();
    fixHamburger();
    normalizeVault();
    fixGoldContrast();
  }

  document.addEventListener('DOMContentLoaded', run, { once: true });
  document.addEventListener('kidpoker:site-ready', run);
  window.addEventListener('resize', () => window.requestAnimationFrame(() => { run(); lockWinnerLayout(); }));
  window.setTimeout(run, 300);
  window.setTimeout(run, 900);
  window.setTimeout(run, 1800);
  window.setTimeout(() => { run(); lockWinnerLayout(); }, 3400);
  window.setTimeout(() => { run(); lockWinnerLayout(); }, 5600);
})();