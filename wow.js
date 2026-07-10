(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initReviewSwiper() {
    if (!window.Swiper || !$('.reviewSwiper')) return;
    new window.Swiper('.reviewSwiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  }

  function initBioCinema() {
    const section = $('.bio-cinema');
    const media = $$('.bio-media');
    const chapters = $$('.bio-chapter');
    if (!section || !media.length || !chapters.length) return;
    const activate = (index) => {
      media.forEach((item, i) => item.classList.toggle('active', i === index));
      chapters.forEach((item, i) => item.classList.toggle('active', i === index));
    };
    const update = () => {
      if (window.innerWidth < 1101) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / Math.max(total, 1), 0), 0.999);
      const index = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      activate(index);
      const active = media[index];
      if (active) active.style.transform = `scale(${1.08 + progress * 0.13})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  function initWinnerTool() {
    const tool = $('[data-winner-tool]');
    if (!tool) return;
    const ranks = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
    const suits = ['S','H','D','C'];
    const suitSymbol = { S:'♠', H:'♥', D:'♦', C:'♣' };
    const rankValue = { '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,T:10,J:11,Q:12,K:13,A:14 };
    const label = (card) => card ? card[0] + suitSymbol[card[1]] : '';
    const isRed = (card) => card && (card[1] === 'H' || card[1] === 'D');
    const allCards = () => suits.flatMap((s) => ranks.map((r) => r + s));
    const shuffle = (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
    const selectEls = $$('[data-card-select]', tool);
    const opponentSelect = $('[data-opponent-count]', tool);
    const boardEl = $('[data-board]', tool);
    const heroCardsEl = $('[data-hero-cards]', tool);
    const heroOddsEl = $('[data-hero-odds]', tool);
    const opponentsEl = $('[data-opponents]', tool);
    const oddsListEl = $('[data-odds-list]', tool);
    const nextBtn = $('[data-next-street]', tool);
    const noteEl = $('[data-winner-note]', tool);
    let hero = [], opponents = [], board = [], street = 0;
    const cardHtml = (card) => `<span class="poker-card ${isRed(card) ? 'red' : ''}">${label(card)}</span>`;
    const blankHtml = () => '<span class="poker-card blank">?</span>';
    const availableDeck = (exclude = []) => { const ex = new Set(exclude.filter(Boolean)); return allCards().filter((card) => !ex.has(card)); };
    const visibleBoard = () => board.map((card, index) => index < street ? card : null);
    function fillSelects() { const cards = allCards(); selectEls.forEach((select) => { select.innerHTML = cards.map((card) => `<option value="${card}">${label(card)}</option>`).join(''); }); }
    function randomHero() { const deck = shuffle(allCards()); hero = [deck.pop(), deck.pop()]; selectEls[0].value = hero[0]; selectEls[1].value = hero[1]; }
    function syncHeroFromSelects() { hero = [selectEls[0].value, selectEls[1].value]; if (hero[0] === hero[1]) { const next = availableDeck([hero[0]])[0]; hero[1] = next; selectEls[1].value = next; } }
    function dealWorld(keepHero = true) { if (!keepHero) randomHero(); else syncHeroFromSelects(); const deck = shuffle(availableDeck(hero)); const count = Number(opponentSelect.value || 1); opponents = Array.from({ length: count }, () => [deck.pop(), deck.pop()]); board = Array.from({ length: 5 }, () => deck.pop()); street = 0; render(); calculate(); }
    function revealNextStreet() { street = street === 0 ? 3 : street === 3 ? 4 : street === 4 ? 5 : 0; if (street === 0) dealWorld(true); else { render(); calculate(); } }
    function scoreFive(cards) { const rs = cards.map((card) => rankValue[card[0]]).sort((a,b) => b-a); const ss = cards.map((card) => card[1]); const counts = {}; rs.forEach((r) => counts[r] = (counts[r] || 0) + 1); const groups = Object.entries(counts).map(([r,c]) => ({ r:+r, c })).sort((a,b) => b.c - a.c || b.r - a.r); const unique = [...new Set(rs)].sort((a,b) => b-a); if (unique.includes(14)) unique.push(1); let straight = 0; for (let i = 0; i <= unique.length - 5; i++) { const seq = unique.slice(i, i+5); if (seq[0] - seq[4] === 4) { straight = seq[0]; break; } } const flush = ss.every((s) => s === ss[0]); const pack = (cat, ks) => ks.reduce((n,k) => n * 15 + k, cat); if (straight && flush) return pack(8,[straight,0,0,0,0]); if (groups[0].c === 4) return pack(7,[groups[0].r, groups.find((g) => g.c === 1).r,0,0,0]); if (groups[0].c === 3 && groups[1]?.c >= 2) return pack(6,[groups[0].r, groups[1].r,0,0,0]); if (flush) return pack(5, rs.slice(0,5)); if (straight) return pack(4,[straight,0,0,0,0]); if (groups[0].c === 3) return pack(3,[groups[0].r, ...groups.filter((g) => g.c === 1).map((g) => g.r).slice(0,2),0,0]); if (groups[0].c === 2 && groups[1]?.c === 2) return pack(2,[groups[0].r, groups[1].r, groups.find((g) => g.c === 1).r,0,0]); if (groups[0].c === 2) return pack(1,[groups[0].r, ...groups.filter((g) => g.c === 1).map((g) => g.r).slice(0,3),0]); return pack(0, rs.slice(0,5)); }
    function scoreSeven(cards) { let best = 0; for (let a=0;a<cards.length-4;a++) for (let b=a+1;b<cards.length-3;b++) for (let c=b+1;c<cards.length-2;c++) for (let d=c+1;d<cards.length-1;d++) for (let e=d+1;e<cards.length;e++) best = Math.max(best, scoreFive([cards[a],cards[b],cards[c],cards[d],cards[e]])); return best; }
    function calculate() { const players = [hero, ...opponents]; const knownBoard = board.slice(0, street); const trials = street === 5 ? 1 : opponents.length > 5 ? 1200 : 2200; const wins = Array(players.length).fill(0); for (let t=0; t<trials; t++) { const dead = new Set([...players.flat(), ...knownBoard]); const deck = shuffle(allCards().filter((card) => !dead.has(card))); const trialBoard = knownBoard.concat(deck.slice(0, 5 - knownBoard.length)); const scores = players.map((hand) => scoreSeven([...hand, ...trialBoard])); const max = Math.max(...scores); const winners = scores.map((score, i) => score === max ? i : -1).filter((i) => i >= 0); winners.forEach((i) => wins[i] += 1 / winners.length); } const pct = wins.map((w) => Math.round((w / trials) * 1000) / 10); renderOdds(pct, trials); }
    function renderOdds(pct, trials) { heroOddsEl.textContent = `${pct[0].toFixed(1)}%`; noteEl.textContent = street === 5 ? 'Showdown is complete. Percentages are exact for the dealt hand.' : `Estimated from ${trials.toLocaleString()} simulations based on visible cards.`; oddsListEl.innerHTML = pct.map((p,i) => `<div class="odds-row"><span>${i === 0 ? 'You' : `Opponent ${i}`}</span><span>${p.toFixed(1)}%</span></div>`).join(''); $$('.opponent-seat', opponentsEl).forEach((seat, i) => { const strong = $('strong', seat); if (strong) strong.textContent = `${pct[i+1].toFixed(1)}%`; }); }
    function render() { boardEl.innerHTML = visibleBoard().map((card) => card ? cardHtml(card) : blankHtml()).join(''); heroCardsEl.innerHTML = hero.map(cardHtml).join(''); const pos = [[50,3],[16,17],[84,17],[8,48],[92,48],[22,75],[78,75],[50,82]]; opponentsEl.innerHTML = opponents.map((hand,i) => `<div class="opponent-seat" style="left:${pos[i][0]}%;top:${pos[i][1]}%;translate:-50% -50%"><small>Opponent ${i+1}</small><div class="opp-hole">${hand.map(cardHtml).join('')}</div><strong>0%</strong></div>`).join(''); nextBtn.textContent = street === 0 ? 'Reveal Flop' : street === 3 ? 'Reveal Turn' : street === 4 ? 'Reveal River' : 'Re-Deal'; }
    fillSelects(); randomHero(); dealWorld(true); selectEls.forEach((select) => select.addEventListener('change', () => dealWorld(true))); opponentSelect.addEventListener('change', () => dealWorld(true)); $('[data-random-hero]', tool).addEventListener('click', () => dealWorld(false)); $('[data-redeal]', tool).addEventListener('click', () => dealWorld(false)); nextBtn.addEventListener('click', revealNextStreet);
  }
  function init() { initReviewSwiper(); initBioCinema(); initWinnerTool(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
