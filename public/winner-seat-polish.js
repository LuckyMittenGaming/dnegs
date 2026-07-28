(() => {
  'use strict';

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

  function injectStyles() {
    if (document.getElementById('winner-seat-polish-styles')) return;
    const style = document.createElement('style');
    style.id = 'winner-seat-polish-styles';
    style.textContent = `
      #winner .winner-table {
        overflow: hidden !important;
        --card-w: clamp(25px, 3.05vw, 44px);
        --card-h: clamp(36px, 4.45vw, 64px);
        --card-font-lg: clamp(8px, .9vw, 12px);
        --card-font-sm: clamp(7px, .75vw, 10px);
        --suit-center: clamp(10px, 1.25vw, 18px);
      }
      #winner .winner-board {
        left: 50% !important;
        top: 48% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 5 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: clamp(3px, .45vw, 8px) !important;
        max-width: calc(100% - 24px) !important;
      }
      #winner .winner-hero-zone {
        left: 50% !important;
        top: auto !important;
        bottom: clamp(10px, 2.1vw, 22px) !important;
        transform: translateX(-50%) !important;
        z-index: 12 !important;
        width: auto !important;
        max-width: none !important;
        min-width: 0 !important;
      }
      #winner .opponent-seat {
        position: absolute !important;
        left: var(--seat-x, 50%) !important;
        top: var(--seat-y, 20%) !important;
        transform: translate(-50%, -50%) !important;
        width: clamp(74px, 8.25vw, 122px) !important;
        max-width: clamp(74px, 8.25vw, 122px) !important;
        min-height: clamp(70px, 7.45vw, 112px) !important;
        padding: clamp(4px, .55vw, 8px) clamp(4px, .65vw, 10px) !important;
        gap: clamp(2px, .35vw, 5px) !important;
        border-radius: clamp(8px, .8vw, 12px) !important;
        z-index: 7 !important;
      }
      #winner .opponent-name {
        font-size: clamp(7px, .72vw, 10px) !important;
        letter-spacing: .02em !important;
        white-space: nowrap !important;
        text-align: center !important;
        max-width: 100% !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      #winner .opponent-odds {
        font-size: clamp(9px, .85vw, 13px) !important;
        white-space: nowrap !important;
      }
      #winner .card-pair {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: clamp(2px, .35vw, 6px) !important;
        width: auto !important;
        max-width: none !important;
      }
      #winner .opponent-seat .card-pair .poker-card,
      #winner .winner-hero-zone .card-pair .poker-card,
      #winner .winner-board .poker-card,
      #winner .opponent-seat .card-pair .poker-card:nth-child(1),
      #winner .opponent-seat .card-pair .poker-card:nth-child(2),
      #winner .winner-hero-zone .card-pair .poker-card:nth-child(1),
      #winner .winner-hero-zone .card-pair .poker-card:nth-child(2),
      #winner .winner-board .poker-card:nth-child(1),
      #winner .winner-board .poker-card:nth-child(2) {
        margin-left: 0 !important;
        transform: none !important;
      }
      #winner .poker-card:hover { transform: none !important; }
      #winner .hero-badge {
        font-size: clamp(8px, .85vw, 12px) !important;
        padding: 2px 9px !important;
      }
      #winner .hero-odds-display {
        font-size: clamp(19px, 2.7vw, 38px) !important;
      }
      @media (max-width: 920px) {
        #winner .winner-shell { grid-template-columns: 1fr !important; }
        #winner .winner-table {
          height: clamp(530px, 78vw, 690px) !important;
          border-radius: 160px !important;
          --card-w: clamp(28px, 4.8vw, 40px);
          --card-h: clamp(40px, 6.9vw, 58px);
        }
        #winner .winner-board { top: 47% !important; }
      }
      @media (max-width: 560px) {
        #winner .winner-table {
          height: clamp(560px, 152vw, 680px) !important;
          border-radius: 999px !important;
          --card-w: clamp(24px, 7vw, 31px);
          --card-h: clamp(34px, 10.2vw, 45px);
          --card-font-lg: clamp(7px, 2.35vw, 9px);
          --card-font-sm: clamp(6px, 1.95vw, 8px);
          --suit-center: clamp(9px, 3.2vw, 12px);
        }
        #winner .opponent-seat {
          width: clamp(58px, 18.4vw, 74px) !important;
          max-width: clamp(58px, 18.4vw, 74px) !important;
          min-height: clamp(58px, 17.5vw, 74px) !important;
          padding: 4px 4px !important;
          gap: 2px !important;
        }
        #winner .opponent-name { font-size: clamp(6px, 2vw, 7.5px) !important; }
        #winner .opponent-odds { font-size: clamp(8px, 2.45vw, 10px) !important; }
        #winner .winner-board { top: 47% !important; padding: 6px 7px !important; }
        #winner .winner-hero-zone { bottom: 10px !important; }
        #winner .hero-odds-display { font-size: clamp(18px, 7vw, 24px) !important; }
      }
      @media (max-width: 340px) {
        #winner .winner-table {
          height: 560px !important;
          --card-w: 22px;
          --card-h: 32px;
        }
        #winner .opponent-seat {
          width: 54px !important;
          max-width: 54px !important;
          min-height: 56px !important;
        }
        #winner .opponent-name { font-size: 5.75px !important; }
      }
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

  function applySeatPolish() {
    const section = document.getElementById('winner');
    if (!section) return;
    const table = section.querySelector('.winner-table');
    const hero = section.querySelector('.winner-hero-zone');
    const board = section.querySelector('.winner-board');
    const seats = Array.from(section.querySelectorAll('.opponent-seat'));
    if (!table || !seats.length) return;
    const count = Math.min(Math.max(seats.length, 1), 8);
    const breakpoint = getBreakpoint(table);
    const points = (SEAT_MAPS[breakpoint] && SEAT_MAPS[breakpoint][count]) || SEAT_MAPS.large[count] || SEAT_MAPS.large[8];
    if (board) {
      board.style.setProperty('left', '50%', 'important');
      board.style.setProperty('top', breakpoint === 'large' || breakpoint === 'medium' ? '48%' : '47%', 'important');
      board.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
    }
    if (hero) {
      hero.style.setProperty('left', '50%', 'important');
      hero.style.setProperty('top', 'auto', 'important');
      hero.style.setProperty('bottom', breakpoint === 'large' ? '18px' : '10px', 'important');
      hero.style.setProperty('transform', 'translateX(-50%)', 'important');
    }
    seats.forEach((seat, index) => {
      const [x, y] = points[index] || points[points.length - 1];
      seat.style.setProperty('--seat-x', `${x}%`);
      seat.style.setProperty('--seat-y', `${y}%`);
      seat.style.setProperty('left', `${x}%`, 'important');
      seat.style.setProperty('top', `${y}%`, 'important');
      seat.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      const name = seat.querySelector('.opponent-name');
      if (name) name.textContent = POSITION_LABELS[index] || `Seat ${index + 1}`;
      seat.querySelectorAll('.poker-card').forEach((card) => {
        card.style.setProperty('margin-left', '0', 'important');
        card.style.setProperty('transform', 'none', 'important');
      });
    });
  }

  function scheduleApply() {
    window.requestAnimationFrame(() => {
      injectStyles();
      applySeatPolish();
      window.requestAnimationFrame(applySeatPolish);
    });
  }

  function bindWinnerPolish() {
    const section = document.getElementById('winner');
    if (!section || section.dataset.seatPolishBound === 'true') return;
    section.dataset.seatPolishBound = 'true';
    const observer = new MutationObserver(scheduleApply);
    observer.observe(section, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    section.addEventListener('change', scheduleApply, true);
    section.addEventListener('click', scheduleApply, true);
    window.addEventListener('resize', scheduleApply, { passive: true });
    window.addEventListener('orientationchange', scheduleApply, { passive: true });
  }

  function run() {
    injectStyles();
    bindWinnerPolish();
    scheduleApply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  document.addEventListener('kidpoker:site-ready', run);
  window.setTimeout(run, 300);
  window.setTimeout(run, 900);
  window.setTimeout(run, 1800);
})();
