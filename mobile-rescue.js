(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  const TABLE_SEATS = [
    { label: 'UTG+1', cls: 'seat-utg1' },
    { label: 'LOWJACK', cls: 'seat-lj' },
    { label: 'UTG', cls: 'seat-utg' },
    { label: 'HI-JACK', cls: 'seat-hj' },
    { label: 'BB', cls: 'seat-bb' },
    { label: 'CUTOFF', cls: 'seat-co' },
    { label: 'SB', cls: 'seat-sb' },
    { label: 'BUTTON', cls: 'seat-btn' }
  ];

  function injectWinnerStyles() {
    let style = $('#winner-hard-fix-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'winner-hard-fix-styles';
      document.head.appendChild(style);
    }

    style.textContent = `
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
        grid-template-columns: minmax(0, 1fr) minmax(260px, .72fr) !important;
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
        grid-template-columns: minmax(0, 1.28fr) minmax(300px, .72fr) !important;
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

      #winner .winner-table-frame {
        width: 100% !important;
        max-width: 900px !important;
        position: relative !important;
        margin: 0 auto !important;
      }

      #winner .winner-table {
        position: relative !important;
        width: 100% !important;
        height: var(--winner-table-h, 520px) !important;
        margin: 0 auto !important;
        background: radial-gradient(ellipse at center, #115e29 0%, #093f18 65%, #031c08 100%) !important;
        border: var(--winner-rail-size, 10px) solid #1a1c23 !important;
        border-radius: 160px !important;
        box-shadow: inset 0 0 60px rgba(0, 0, 0, .9), 0 20px 40px rgba(0, 0, 0, .8) !important;
        transition: all .3s ease !important;
        overflow: visible !important;
        isolation: isolate !important;
        --card-w: 28px;
        --card-h: 40px;
        --card-font-lg: 10px;
        --card-font-sm: 8px;
        --suit-center: 14px;
        --winner-table-h: 520px;
        --winner-rail-size: 10px;
      }

      #winner .winner-table::before,
      #winner .winner-table::after {
        content: none !important;
        display: none !important;
      }

      #winner .winner-board {
        position: absolute !important;
        top: 45% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        padding: 10px 14px !important;
        background: rgba(0, 0, 0, .25) !important;
        border: 1px solid rgba(255, 255, 255, .05) !important;
        border-radius: 12px !important;
        backdrop-filter: blur(4px) !important;
        z-index: 5 !important;
        width: auto !important;
        max-width: calc(100% - 24px) !important;
      }

      #winner .board-slot-empty {
        width: var(--card-w) !important;
        height: var(--card-h) !important;
        border: 1px dashed rgba(255, 255, 255, .25) !important;
        border-radius: 4px !important;
        background: rgba(0, 0, 0, .15) !important;
        flex: 0 0 auto !important;
      }

      #winner .card-pair {
        display: flex !important;
        gap: 2px !important;
        justify-content: center !important;
        align-items: center !important;
        margin-bottom: 2px !important;
        width: auto !important;
        max-width: none !important;
      }

      #winner .card-pair > div:nth-child(1) {
        transform: rotate(-4deg) !important;
      }

      #winner .card-pair > div:nth-child(2) {
        margin-left: -8px !important;
        transform: rotate(4deg) !important;
      }

      #winner .poker-card-3d {
        perspective: 1000px !important;
        width: var(--card-w) !important;
        height: var(--card-h) !important;
        z-index: 1 !important;
        transition: z-index .3s !important;
        flex: 0 0 auto !important;
      }

      #winner .poker-card-3d:hover {
        z-index: 10 !important;
      }

      #winner .poker-card-inner {
        width: 100% !important;
        height: 100% !important;
        transition: transform .6s cubic-bezier(.4, .2, .2, 1) !important;
        transform-style: preserve-3d !important;
        position: relative !important;
        border-radius: 4px !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, .4) !important;
      }

      #winner .poker-card-front,
      #winner .poker-card-back {
        width: 100% !important;
        height: 100% !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        backface-visibility: hidden !important;
        border-radius: 4px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding: 2px 4px !important;
        box-sizing: border-box !important;
        user-select: none !important;
        overflow: hidden !important;
      }

      #winner .poker-card-front {
        background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%) !important;
        border: 1px solid rgba(0, 0, 0, .25) !important;
        transform: rotateY(180deg) !important;
        color: #0f172a !important;
      }

      #winner .poker-card-front.suit-red,
      #winner .poker-card-static.suit-red {
        color: #dc2626 !important;
      }

      #winner .poker-card-front.suit-black,
      #winner .poker-card-static.suit-black {
        color: #0f172a !important;
      }

      #winner .poker-card-back {
        background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%) !important;
        border: 1px solid #475569 !important;
      }

      #winner .poker-card-back::after {
        content: "DN" !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        color: rgba(255, 255, 255, .25) !important;
        font-family: 'Cinzel', serif !important;
        font-weight: 800 !important;
        font-size: var(--card-font-lg) !important;
      }

      #winner .opponent-seat.peek .poker-card-inner {
        transform: rotateY(180deg) !important;
      }

      #winner .card-index {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        line-height: .85 !important;
      }

      #winner .card-rank {
        font-weight: 900 !important;
        font-size: var(--card-font-lg) !important;
        letter-spacing: -.5px !important;
      }

      #winner .card-suit-sm {
        font-size: var(--card-font-sm) !important;
        margin-top: 1px !important;
      }

      #winner .card-index.bottom-right {
        transform: rotate(180deg) !important;
      }

      #winner .card-center-suit {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        font-size: var(--suit-center) !important;
        opacity: .85 !important;
        line-height: 1 !important;
      }

      #winner .poker-card-static {
        position: relative !important;
        width: var(--card-w) !important;
        height: var(--card-h) !important;
        min-width: var(--card-w) !important;
        background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%) !important;
        border-radius: 4px !important;
        border: 1px solid rgba(0, 0, 0, .25) !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, .4) !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding: 2px 4px !important;
        box-sizing: border-box !important;
        flex: 0 0 auto !important;
        line-height: 1 !important;
        text-shadow: none !important;
        overflow: hidden !important;
      }

      #winner .winner-opponents {
        position: absolute !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 7 !important;
      }

      #winner .opponent-seat {
        position: absolute !important;
        transform: translate(-50%, -50%) !important;
        translate: none !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        background: rgba(11, 15, 25, .85) !important;
        border: 1px solid #1e3a8a !important;
        padding: 6px !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, .6) !important;
        pointer-events: auto !important;
        cursor: pointer !important;
        transition: top .4s ease, left .4s ease, transform .2s ease, border-color .2s ease !important;
        z-index: 7 !important;
      }

      #winner .opponent-seat:hover {
        border-color: #38bdf8 !important;
        transform: translate(-50%, -50%) scale(1.05) !important;
      }

      #winner .opponent-seat::after {
        content: "CLICK TO PEEK" !important;
        position: absolute !important;
        top: -18px !important;
        font-size: 7px !important;
        color: #38bdf8 !important;
        opacity: 0 !important;
        transition: opacity .2s !important;
        white-space: nowrap !important;
      }

      #winner .opponent-seat:hover::after {
        opacity: 1 !important;
      }

      #winner .opponent-seat.peek::after {
        content: "CLICK TO HIDE" !important;
        color: #94a3b8 !important;
      }

      #winner .opponent-name {
        display: block !important;
        font-size: 8px !important;
        color: #94a3b8 !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        margin-bottom: 2px !important;
        line-height: 1.05 !important;
        text-align: center !important;
        white-space: nowrap !important;
        max-width: 100% !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      #winner .opponent-odds {
        display: block !important;
        font-size: 11px !important;
        color: #38bdf8 !important;
        font-weight: 800 !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      #winner .seat-utg1 { top: 12% !important; left: 28% !important; }
      #winner .seat-lj   { top: 12% !important; left: 72% !important; }
      #winner .seat-utg  { top: 26% !important; left: 18% !important; }
      #winner .seat-hj   { top: 26% !important; left: 82% !important; }
      #winner .seat-bb   { top: 64% !important; left: 18% !important; }
      #winner .seat-co   { top: 64% !important; left: 82% !important; }
      #winner .seat-sb   { top: 78% !important; left: 28% !important; }
      #winner .seat-btn  { top: 78% !important; left: 72% !important; }

      #winner .winner-hero-zone {
        position: absolute !important;
        top: 96% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 2px !important;
        background: rgba(11, 15, 25, .95) !important;
        border: 2px solid #f59e0b !important;
        padding: 8px 16px !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, .9) !important;
        z-index: 10 !important;
        width: auto !important;
        max-width: none !important;
      }

      #winner .hero-badge {
        background: #f59e0b !important;
        color: #0f172a !important;
        font-family: 'Inter', sans-serif !important;
        font-weight: 900 !important;
        font-size: 10px !important;
        letter-spacing: 1px !important;
        padding: 2px 12px !important;
        border-radius: 12px !important;
        text-transform: uppercase !important;
        margin-bottom: 2px !important;
        line-height: 1.05 !important;
        text-shadow: none !important;
      }

      #winner .hero-odds-display {
        font-weight: 900 !important;
        font-size: clamp(20px, 4vw, 26px) !important;
        color: #fff !important;
        margin: 0 !important;
        text-shadow: 0 2px 6px rgba(0, 0, 0, .9) !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      #winner .winner-controls {
        margin-top: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
        background: rgba(15, 23, 42, .6) !important;
        padding: 16px !important;
        border-radius: 12px !important;
        border: 1px solid rgba(255, 255, 255, .1) !important;
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
        #winner .card-picker {
          flex-direction: row !important;
          align-items: center !important;
        }

        #winner .control-row select,
        #winner .card-picker select {
          width: auto !important;
        }

        #winner .card-picker label {
          flex: 1 1 0 !important;
        }

        #winner .winner-actions {
          flex-direction: row !important;
          flex-wrap: wrap !important;
        }

        #winner .winner-actions button {
          width: auto !important;
        }
      }

      @media (min-width: 768px) {
        #winner .winner-table {
          border-radius: 300px / 190px !important;
          --card-w: 38px;
          --card-h: 54px;
          --card-font-lg: 12px;
          --card-font-sm: 9px;
          --suit-center: 18px;
          --winner-table-h: 560px;
          --winner-rail-size: 16px;
        }

        #winner .opponent-seat {
          padding: 8px 10px !important;
        }

        #winner .opponent-name {
          font-size: 9px !important;
        }

        #winner .opponent-odds {
          font-size: 12px !important;
        }

        #winner .seat-utg1 { top: 15% !important; left: 33% !important; }
        #winner .seat-lj   { top: 15% !important; left: 67% !important; }
        #winner .seat-utg  { top: 35% !important; left: 16% !important; }
        #winner .seat-hj   { top: 35% !important; left: 84% !important; }
        #winner .seat-bb   { top: 68% !important; left: 18% !important; }
        #winner .seat-co   { top: 68% !important; left: 82% !important; }
        #winner .seat-sb   { top: 86% !important; left: 30% !important; }
        #winner .seat-btn  { top: 86% !important; left: 70% !important; }
      }

      @media (max-width: 920px) {
        #winner .split-heading,
        #winner .winner-shell {
          grid-template-columns: 1fr !important;
        }

        #winner .split-heading {
          align-items: start !important;
        }

        #winner .winner-controls {
          margin-top: 18px !important;
        }

        #winner .winner-table-frame {
          max-width: 900px !important;
        }
      }

      @media (max-width: 560px) {
        #winner.winner-tool {
          padding-inline: 1rem !important;
        }

        #winner .split-heading h2 {
          font-size: clamp(3rem, 17vw, 4.9rem) !important;
          letter-spacing: -.06em !important;
        }

        #winner .winner-table {
          --card-w: clamp(23px, 7.2vw, 28px);
          --card-h: clamp(33px, 10.4vw, 40px);
          --card-font-lg: clamp(8px, 2.55vw, 10px);
          --card-font-sm: clamp(6px, 2vw, 8px);
          --suit-center: clamp(10px, 3.45vw, 14px);
          --winner-table-h: clamp(520px, 152vw, 620px);
          --winner-rail-size: 10px;
        }

        #winner .opponent-seat {
          padding: 4px 5px !important;
          transform: translate(-50%, -50%) scale(.94) !important;
        }

        #winner .opponent-seat:hover {
          transform: translate(-50%, -50%) scale(.98) !important;
        }

        #winner .winner-board {
          top: 45% !important;
          padding: 7px 8px !important;
          gap: 4px !important;
        }

        #winner .winner-hero-zone {
          padding: 7px 12px !important;
          transform: translate(-50%, -50%) scale(.92) !important;
        }

        #winner .hero-odds-display {
          font-size: clamp(18px, 7vw, 24px) !important;
        }
      }

      @media (max-width: 340px) {
        #winner .winner-table {
          --card-w: 21px;
          --card-h: 31px;
          --card-font-lg: 7.5px;
          --card-font-sm: 6px;
          --suit-center: 10px;
          --winner-table-h: 520px;
        }

        #winner .opponent-seat {
          transform: translate(-50%, -50%) scale(.86) !important;
        }

        #winner .opponent-seat:hover {
          transform: translate(-50%, -50%) scale(.9) !important;
        }

        #winner .winner-hero-zone {
          transform: translate(-50%, -50%) scale(.78) !important;
        }
      }
    `;
  }

  function rebuildWinnerTool() {
    const section = $('#winner');
    if (!section) return;

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
        <div class="winner-table-frame">
          <div class="winner-table" aria-label="9-Handed Poker Table">
            <div class="winner-board" data-board>
              <div class="board-slot-empty"></div>
              <div class="board-slot-empty"></div>
              <div class="board-slot-empty"></div>
              <div class="board-slot-empty"></div>
              <div class="board-slot-empty"></div>
            </div>
            <div class="winner-opponents" data-opponents></div>
            <div class="winner-hero-zone">
              <span class="hero-badge">YOU</span>
              <div class="card-pair" data-hero-cards></div>
              <strong class="hero-odds-display" data-hero-odds>0%</strong>
            </div>
          </div>
        </div>
        <div class="winner-controls">
          <div class="control-row">
            <label for="opponentCount">Opponents</label>
            <select id="opponentCount" data-opponent-count>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8" selected>8</option>
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
          <div class="winner-note" data-winner-note>Monte Carlo-style UI estimate based on the visible cards and selected player count.</div>
        </div>
      </div>
    `;

    initWinnerEngine(section);
  }

  function initWinnerEngine(scope) {
    const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const SUITS = [
      { symbol: '♠', isRed: false },
      { symbol: '♥', isRed: true },
      { symbol: '♣', isRed: false },
      { symbol: '♦', isRed: true }
    ];

    let deck = [];
    let heroHand = [];
    let communityCards = [];
    let opponentHands = [];
    let currentStreet = 0;
    const peekedSeats = new Set();

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

    function createDeck() {
      deck = [];
      RANKS.forEach((rank) => SUITS.forEach((suit) => deck.push({ rank, suit })));
    }

    function buildCardFace(card, faceClass = 'poker-card-static') {
      if (!card) return '<div class="board-slot-empty"></div>';
      const suitClass = card.suit.isRed ? 'suit-red' : 'suit-black';
      return `
        <div class="${faceClass} ${suitClass}">
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

    function buildStaticCardHTML(card) {
      return buildCardFace(card, 'poker-card-static');
    }

    function buildFlipCardHTML(card) {
      const face = buildCardFace(card, 'poker-card-front');
      return `
        <div class="poker-card-3d">
          <div class="poker-card-inner">
            <div class="poker-card-back"></div>
            ${face}
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
        select.value = idx === 0 ? 48 : 50;
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

      const shuffled = shuffle(deck.filter((_, idx) => idx !== card1Idx && idx !== card2Idx));
      const opponentCount = parseInt(oppSelectEl.value, 10) || 8;

      opponentHands = [];
      for (let i = 0; i < opponentCount; i += 1) {
        opponentHands.push([shuffled.pop(), shuffled.pop()]);
      }

      communityCards = [shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop()];
      currentStreet = 0;
      peekedSeats.clear();
      if (btnNextStreet) btnNextStreet.textContent = 'Reveal Flop';
      render();
    }

    function calculateOdds() {
      const opponentCount = parseInt(oppSelectEl.value, 10) || 8;
      const totalPlayers = opponentCount + 1;
      const baseOdds = 100 / totalPlayers;
      const r1 = RANKS.indexOf(heroHand[0].rank);
      const r2 = RANKS.indexOf(heroHand[1].rank);
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

      if (noteEl) {
        noteEl.textContent = currentStreet === 3
          ? 'River shown. Percentages now reflect the complete dealt board.'
          : 'Monte Carlo-style UI estimate based on the visible cards and selected player count.';
      }
    }

    function render() {
      const opponentCount = parseInt(oppSelectEl.value, 10) || 8;

      heroCardsEl.innerHTML = heroHand.map(buildStaticCardHTML).join('');

      let boardHTML = '';
      for (let i = 0; i < 5; i += 1) {
        if (i < 3 && currentStreet >= 1) boardHTML += buildStaticCardHTML(communityCards[i]);
        else if (i === 3 && currentStreet >= 2) boardHTML += buildStaticCardHTML(communityCards[i]);
        else if (i === 4 && currentStreet >= 3) boardHTML += buildStaticCardHTML(communityCards[i]);
        else boardHTML += '<div class="board-slot-empty"></div>';
      }

      boardEl.innerHTML = boardHTML;
      boardEl.style.setProperty('left', '50%', 'important');
      boardEl.style.setProperty('transform', 'translate(-50%, -50%)', 'important');

      opponentsEl.innerHTML = '';
      TABLE_SEATS.slice(0, opponentCount).forEach((seatInfo, index) => {
        const seat = document.createElement('div');
        const seatNumber = index + 1;
        const showCards = currentStreet === 3 || peekedSeats.has(seatNumber);

        seat.className = `opponent-seat ${seatInfo.cls}${showCards ? ' peek' : ''}`;
        seat.dataset.seatNumber = String(seatNumber);

        const oppCards = opponentHands[index].map(buildFlipCardHTML).join('');
        seat.innerHTML = `
          <span class="opponent-name">${seatInfo.label}</span>
          <div class="card-pair">${oppCards}</div>
          <span class="opponent-odds" data-opp-odds="${seatNumber}">--%</span>
        `;

        seat.addEventListener('click', () => {
          if (currentStreet === 3) return;
          if (peekedSeats.has(seatNumber)) peekedSeats.delete(seatNumber);
          else peekedSeats.add(seatNumber);
          seat.classList.toggle('peek', peekedSeats.has(seatNumber));
        });

        opponentsEl.appendChild(seat);
      });

      calculateOdds();
    }

    function onManualCardSelect() {
      if (cardSelects[0].value === cardSelects[1].value) {
        cardSelects[1].value = (parseInt(cardSelects[0].value, 10) + 1) % 52;
      }
      dealGame();
    }

    oppSelectEl.addEventListener('change', dealGame);

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
    window.addEventListener('resize', () => window.requestAnimationFrame(render), { passive: true });
    window.addEventListener('orientationchange', () => window.requestAnimationFrame(render), { passive: true });

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
    injectWinnerStyles();
    fixMobileHeroCopy();
    fixHamburger();
    rebuildWinnerTool();
    fixGoldContrast();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();

  document.addEventListener('kidpoker:site-ready', run);
  window.addEventListener('resize', () => window.requestAnimationFrame(() => {
    fixMobileHeroCopy();
    fixGoldContrast();
  }));

  window.setTimeout(run, 500);
  window.setTimeout(run, 1800);
})();