(() => {
  'use strict';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function loadScript(src, marker) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[${marker}]`) || window.gsap) return resolve();
      const script = document.createElement('script');
      script.src = src; script.defer = true; script.setAttribute(marker, 'true');
      script.onload = resolve; script.onerror = reject; document.body.appendChild(script);
    });
  }
  async function ensureGsap() {
    if (window.gsap && window.ScrollTrigger) return true;
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'data-gsap-wow');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'data-gsap-scroll-wow');
      return Boolean(window.gsap && window.ScrollTrigger);
    } catch { return false; }
  }

  function initMagneticButtons() {
    if (!canHover || prefersReducedMotion) return;
    $$('.button, .header-cta').forEach((target) => {
      if (target.closest('.magnetic-wrap')) return;
      const wrap = document.createElement('span'); wrap.className = 'magnetic-wrap'; target.classList.add('magnetic-target');
      target.parentNode.insertBefore(wrap, target); wrap.appendChild(target);
      wrap.addEventListener('mousemove', (event) => {
        const rect = wrap.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        target.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      });
      wrap.addEventListener('mouseleave', () => { target.style.transform = 'translate(0,0)'; });
    });
  }

  function initDepthTilt() {
    if (!canHover || prefersReducedMotion) return;
    $$('.trophy-card, .media-card, .pillar-card, .partner-card, .blueprint-card, .hero-panel, .winner-shell, .bio-media-stack').forEach((card) => {
      card.classList.add('depth-card');
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const xRatio = (event.clientX - rect.left) / rect.width;
        const yRatio = (event.clientY - rect.top) / rect.height;
        const rotateY = (xRatio - 0.5) * 8;
        const rotateX = (0.5 - yRatio) * 6;
        card.style.setProperty('--mx', `${xRatio * 100}%`); card.style.setProperty('--my', `${yRatio * 100}%`);
        card.style.transform = `perspective(950px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  function initCursor(gsap) {
    if (!canHover || prefersReducedMotion || !gsap) return;
    const cursor = $('.custom-cursor'); const cursorText = $('.cursor-text');
    if (!cursor || !cursorText) return;
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });
    window.addEventListener('mousemove', (event) => { xTo(event.clientX); yTo(event.clientY); }, { passive: true });
    $$('a, button, .depth-card').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorText.textContent = el.matches('.trophy-card') ? 'OPEN' : el.matches('.media-card') ? 'PLAY' : el.closest('[data-winner-tool]') ? 'ODDS' : 'VIEW';
        gsap.to(cursor, { width: 78, height: 78, backgroundColor: '#fff0b7', duration: 0.28, ease: 'back.out(1.7)' });
        gsap.to(cursorText, { opacity: 1, duration: 0.16 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { width: 16, height: 16, backgroundColor: '#f4c76b', duration: 0.24, ease: 'power2.out' });
        gsap.to(cursorText, { opacity: 0, duration: 0.12 });
      });
    });
  }

  function initGsapHero(gsap) {
    const curtain = $('.load-curtain'); const revealTexts = $$('.reveal-text');
    if (!gsap || prefersReducedMotion) { curtain?.remove(); revealTexts.forEach((node) => { node.style.transform = 'none'; }); return; }
    const timeline = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
    timeline
      .to('.load-curtain', { scaleY: 0, autoAlpha: 0, duration: 1.05 })
      .fromTo('.hero__cinema', { scale: 1.12, filter: 'blur(10px) brightness(.7)' }, { scale: 1, filter: 'blur(0px) brightness(1)', duration: 1.45 }, '-=.82')
      .to('.reveal-text', { y: '0%', rotate: 0, duration: .9, stagger: .12 }, '-=1.0')
      .fromTo('.hero-tagline, .hero__actions, .hero-panel', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .72, stagger: .08 }, '-=.55');
  }

  function initScrollTheatre(gsap, ScrollTrigger) {
    const stage = $('.river-stage');
    if (!stage || !gsap || !ScrollTrigger || prefersReducedMotion || window.innerWidth < 761) return;
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.river-stage', start: 'top top', end: 'bottom bottom', scrub: 1.1, pin: '.river-pin' }, defaults: { ease: 'power1.inOut' } });
    tl
      .set('.river-layer-1', { opacity: 1 })
      .fromTo('.river-card-a', { x: -220, y: -40, rotate: -30, scale: .76 }, { x: 20, y: 0, rotate: -13, scale: 1, duration: 1 }, 0)
      .fromTo('.river-card-b', { x: 220, y: -70, rotate: 30, scale: .76 }, { x: -25, y: 0, rotate: 13, scale: 1, duration: 1 }, 0)
      .fromTo('.river-layer-1 .river-copy', { y: 45, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .7 }, .08)
      .to('.river-progress span', { width: '34%', duration: .8 }, .1)
      .to('.river-layer-1', { opacity: 0, scale: .94, duration: .28 }, .9)
      .to('.river-layer-2', { opacity: 1, duration: .28 }, .96)
      .to('.river-pot', { rotation: 360, scale: 1.12, duration: .9 }, 1)
      .fromTo('.river-options span', { opacity: 0, y: 25, rotateX: -45 }, { opacity: 1, y: 0, rotateX: 0, stagger: .09, duration: .55, ease: 'back.out(1.6)' }, 1.05)
      .to('.river-card-c', { x: 90, y: -30, rotate: 4, scale: 1.03, duration: 1 }, 1.0)
      .to('.river-card-d', { x: -95, y: -45, rotate: -6, scale: 1.03, duration: 1 }, 1.0)
      .to('.river-progress span', { width: '68%', duration: .8 }, 1.1)
      .to('.river-layer-2', { opacity: 0, scale: .94, duration: .28 }, 1.9)
      .to('.river-layer-3', { opacity: 1, duration: .28 }, 1.96)
      .fromTo('.river-final-word', { y: 80, opacity: 0, scale: .72, filter: 'blur(10px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .75, ease: 'back.out(1.35)' }, 2.0)
      .to('.river-bg-card', { y: -110, rotation: '+=18', scale: .9, opacity: .24, duration: .85 }, 2.05)
      .to('.river-progress span', { width: '100%', duration: .8 }, 2.1);
  }

  function initBioCinema(gsap, ScrollTrigger) {
    const section = $('.bio-cinema');
    const media = $$('.bio-media'); const chapters = $$('.bio-chapter');
    if (!section || !media.length || !chapters.length) return;
    const activate = (index) => {
      media.forEach((item, i) => item.classList.toggle('active', i === index));
      chapters.forEach((item, i) => item.classList.toggle('active', i === index));
    };
    if (!gsap || !ScrollTrigger || prefersReducedMotion || window.innerWidth < 1081) { activate(0); return; }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: section, start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: (self) => {
        const index = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
        activate(index);
        gsap.to(media[index], { scale: 1.02 + self.progress * .14, duration: .25, overwrite: true });
      }
    });
  }

  function initVelocitySkew(gsap, ScrollTrigger) {
    if (!gsap || !ScrollTrigger || prefersReducedMotion || !canHover) return;
    const targets = $$('.velocity-skew, .trophy-card, .media-card'); if (!targets.length) return;
    gsap.registerPlugin(ScrollTrigger);
    const proxy = { skew: 0 }; const skewSetter = gsap.quickSetter(targets, 'skewY', 'deg'); const clamp = gsap.utils.clamp(-8, 8);
    ScrollTrigger.create({ onUpdate: (self) => { const skew = clamp(self.getVelocity() / -520); if (Math.abs(skew) > Math.abs(proxy.skew)) { proxy.skew = skew; gsap.to(proxy, { skew: 0, duration: .75, ease: 'power3', overwrite: true, onUpdate: () => skewSetter(proxy.skew) }); } } });
  }

  function initWinnerTool() {
    const tool = $('[data-winner-tool]'); if (!tool) return;
    const ranks = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
    const suits = ['S','H','D','C']; const suitSymbol = { S:'♠', H:'♥', D:'♦', C:'♣' };
    const rankValue = { '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,T:10,J:11,Q:12,K:13,A:14 };
    const label = (c) => c ? c[0] + suitSymbol[c[1]] : '';
    const isRed = (c) => c && (c[1] === 'H' || c[1] === 'D');
    const allCards = () => suits.flatMap((s) => ranks.map((r) => r + s));
    const shuffle = (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
    const selectEls = $$('[data-card-select]', tool); const opponentSelect = $('[data-opponent-count]', tool);
    const boardEl = $('[data-board]', tool); const heroCardsEl = $('[data-hero-cards]', tool); const heroOddsEl = $('[data-hero-odds]', tool);
    const opponentsEl = $('[data-opponents]', tool); const oddsListEl = $('[data-odds-list]', tool); const nextBtn = $('[data-next-street]', tool); const noteEl = $('[data-winner-note]', tool);
    let hero = [], opponents = [], board = [], street = 0;

    function cardHtml(card) { return `<span class="poker-card ${isRed(card) ? 'red' : ''}">${label(card)}</span>`; }
    function blankHtml() { return '<span class="poker-card blank">?</span>'; }
    function usedCards() { return new Set([...hero, ...opponents.flat(), ...board].filter(Boolean)); }
    function availableDeck(exclude = []) { const ex = new Set(exclude.filter(Boolean)); return allCards().filter((c) => !ex.has(c)); }
    function visibleBoard() { return board.map((c, i) => i < street ? c : null); }
    function fillSelects() {
      const cards = allCards();
      selectEls.forEach((select) => { select.innerHTML = cards.map((c) => `<option value="${c}">${label(c)}</option>`).join(''); });
    }
    function randomHero() { const deck = shuffle(allCards()); hero = [deck.pop(), deck.pop()]; selectEls[0].value = hero[0]; selectEls[1].value = hero[1]; }
    function syncHeroFromSelects() {
      hero = [selectEls[0].value, selectEls[1].value];
      if (hero[0] === hero[1]) {
        const next = availableDeck([hero[0]])[0]; hero[1] = next; selectEls[1].value = next;
      }
    }
    function dealWorld(keepHero = true) {
      if (!keepHero) randomHero(); else syncHeroFromSelects();
      const deck = shuffle(availableDeck(hero));
      const count = Number(opponentSelect.value || 1);
      opponents = Array.from({ length: count }, () => [deck.pop(), deck.pop()]);
      board = Array.from({ length: 5 }, () => deck.pop()); street = 0; render(); calculate();
    }
    function revealNextStreet() { street = street === 0 ? 3 : street === 3 ? 4 : street === 4 ? 5 : 0; if (street === 0) dealWorld(true); else { render(); calculate(); } }

    function cardRanks(cards) { return cards.map((c) => rankValue[c[0]]); }
    function scoreFive(cards) {
      const rs = cardRanks(cards).sort((a,b)=>b-a); const ss = cards.map((c)=>c[1]);
      const counts = {}; rs.forEach((r)=>counts[r]=(counts[r]||0)+1);
      const groups = Object.entries(counts).map(([r,c])=>({r:+r,c})).sort((a,b)=>b.c-a.c||b.r-a.r);
      const unique = [...new Set(rs)].sort((a,b)=>b-a); if (unique.includes(14)) unique.push(1);
      let straight = 0; for (let i=0;i<=unique.length-5;i++){ const seq=unique.slice(i,i+5); if(seq[0]-seq[4]===4){ straight=seq[0]; break; } }
      const flush = ss.every((s)=>s===ss[0]); const base = 15; const pack=(cat,ks)=>ks.reduce((n,k)=>n*base+k,cat);
      if (straight && flush) return pack(8,[straight,0,0,0,0]);
      if (groups[0].c===4) return pack(7,[groups[0].r, groups.find((g)=>g.c===1).r,0,0,0]);
      if (groups[0].c===3 && groups[1]?.c>=2) return pack(6,[groups[0].r,groups[1].r,0,0,0]);
      if (flush) return pack(5,rs.slice(0,5));
      if (straight) return pack(4,[straight,0,0,0,0]);
      if (groups[0].c===3) return pack(3,[groups[0].r,...groups.filter((g)=>g.c===1).map((g)=>g.r).slice(0,2),0,0]);
      if (groups[0].c===2 && groups[1]?.c===2) return pack(2,[groups[0].r,groups[1].r,groups.find((g)=>g.c===1).r,0,0]);
      if (groups[0].c===2) return pack(1,[groups[0].r,...groups.filter((g)=>g.c===1).map((g)=>g.r).slice(0,3),0]);
      return pack(0,rs.slice(0,5));
    }
    function scoreSeven(cards) {
      let best = 0;
      for (let a=0;a<cards.length-4;a++) for (let b=a+1;b<cards.length-3;b++) for (let c=b+1;c<cards.length-2;c++) for (let d=c+1;d<cards.length-1;d++) for (let e=d+1;e<cards.length;e++) best = Math.max(best, scoreFive([cards[a],cards[b],cards[c],cards[d],cards[e]]));
      return best;
    }
    function calculate() {
      const players = [hero, ...opponents]; const knownBoard = board.slice(0, street);
      const trials = street === 5 ? 1 : opponents.length > 5 ? 1200 : 2200; const wins = Array(players.length).fill(0);
      for (let t=0;t<trials;t++) {
        const dead = new Set([...players.flat(), ...knownBoard]); const deck = shuffle(allCards().filter((c)=>!dead.has(c)));
        const trialBoard = knownBoard.concat(deck.slice(0, 5 - knownBoard.length));
        const scores = players.map((hand)=>scoreSeven([...hand, ...trialBoard])); const max = Math.max(...scores); const winners = scores.map((s,i)=>s===max?i:-1).filter((i)=>i>=0);
        winners.forEach((i)=>wins[i]+=1/winners.length);
      }
      const pct = wins.map((w)=>Math.round((w/trials)*1000)/10); renderOdds(pct, trials);
    }
    function renderOdds(pct, trials) {
      heroOddsEl.textContent = `${pct[0].toFixed(1)}%`;
      noteEl.textContent = street === 5 ? 'Showdown is complete. Percentages are exact for the dealt hand.' : `Estimated from ${trials.toLocaleString()} simulations based on visible cards.`;
      oddsListEl.innerHTML = pct.map((p,i)=>`<div class="odds-row"><span>${i===0?'You':`Opponent ${i}`}</span><span>${p.toFixed(1)}%</span></div>`).join('');
      $$('.opponent-seat', opponentsEl).forEach((seat, i)=>{ const strong = $('strong', seat); if (strong) strong.textContent = `${pct[i+1].toFixed(1)}%`; });
    }
    function render() {
      const visible = visibleBoard(); boardEl.innerHTML = visible.map((c)=>c?cardHtml(c):blankHtml()).join('');
      heroCardsEl.innerHTML = hero.map(cardHtml).join('');
      const pos = [[50,3],[16,17],[84,17],[8,48],[92,48],[22,75],[78,75],[50,82]];
      opponentsEl.innerHTML = opponents.map((hand,i)=>`<div class="opponent-seat" style="left:${pos[i][0]}%;top:${pos[i][1]}%;translate:-50% -50%"><small>Opponent ${i+1}</small><div class="opp-hole">${hand.map(cardHtml).join('')}</div><strong>0%</strong></div>`).join('');
      nextBtn.textContent = street === 0 ? 'Reveal Flop' : street === 3 ? 'Reveal Turn' : street === 4 ? 'Reveal River' : 'Re-Deal';
    }
    fillSelects(); randomHero(); dealWorld(true);
    selectEls.forEach((s)=>s.addEventListener('change',()=>dealWorld(true)));
    opponentSelect.addEventListener('change',()=>dealWorld(true));
    $('[data-random-hero]', tool).addEventListener('click',()=>dealWorld(false));
    $('[data-redeal]', tool).addEventListener('click',()=>dealWorld(false));
    nextBtn.addEventListener('click',revealNextStreet);
  }

  function initFallbackReveals() { if (window.gsap) return; $$('.reveal-text').forEach((node) => { node.style.transform = 'none'; }); $('.load-curtain')?.remove(); }
  async function init() {
    initWinnerTool(); initMagneticButtons(); initDepthTilt();
    const hasGsap = await ensureGsap(); if (!hasGsap) { initFallbackReveals(); return; }
    initCursor(window.gsap); initGsapHero(window.gsap); initScrollTheatre(window.gsap, window.ScrollTrigger); initBioCinema(window.gsap, window.ScrollTrigger); initVelocitySkew(window.gsap, window.ScrollTrigger); window.ScrollTrigger?.refresh?.();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
