(() => {
  'use strict';

  const CENTERING_CSS_ID = 'winner-centering-patch-styles';

  function injectCenteringStyles() {
    let style = document.getElementById(CENTERING_CSS_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = CENTERING_CSS_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      #winner .winner-table {
        position: relative !important;
      }

      #winner .winner-board {
        position: absolute !important;
        top: 45% !important;
        left: 50% !important;
        right: auto !important;
        bottom: auto !important;
        transform: translate(-50%, -50%) !important;
        translate: none !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        max-width: calc(100% - 24px) !important;
      }

      #winner .winner-hero-zone {
        position: absolute !important;
        top: 96% !important;
        left: 50% !important;
        right: auto !important;
        bottom: auto !important;
        transform: translate(-50%, -50%) !important;
        translate: none !important;
        margin: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        max-width: none !important;
      }
    `;
  }

  function forceCenterWinnerElements() {
    const winner = document.getElementById('winner');
    if (!winner) return;

    const board = winner.querySelector('.winner-board, [data-board]');
    const hero = winner.querySelector('.winner-hero-zone');
    const table = winner.querySelector('.winner-table');

    if (table) table.style.setProperty('position', 'relative', 'important');

    if (board) {
      board.style.setProperty('position', 'absolute', 'important');
      board.style.setProperty('top', '45%', 'important');
      board.style.setProperty('left', '50%', 'important');
      board.style.setProperty('right', 'auto', 'important');
      board.style.setProperty('bottom', 'auto', 'important');
      board.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      board.style.setProperty('translate', 'none', 'important');
      board.style.setProperty('margin', '0', 'important');
      board.style.setProperty('display', 'flex', 'important');
      board.style.setProperty('align-items', 'center', 'important');
      board.style.setProperty('justify-content', 'center', 'important');
      board.style.setProperty('width', 'auto', 'important');
      board.style.setProperty('max-width', 'calc(100% - 24px)', 'important');
    }

    if (hero) {
      hero.style.setProperty('position', 'absolute', 'important');
      hero.style.setProperty('top', '96%', 'important');
      hero.style.setProperty('left', '50%', 'important');
      hero.style.setProperty('right', 'auto', 'important');
      hero.style.setProperty('bottom', 'auto', 'important');
      hero.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      hero.style.setProperty('translate', 'none', 'important');
      hero.style.setProperty('margin', '0', 'important');
      hero.style.setProperty('display', 'flex', 'important');
      hero.style.setProperty('flex-direction', 'column', 'important');
      hero.style.setProperty('align-items', 'center', 'important');
      hero.style.setProperty('justify-content', 'center', 'important');
      hero.style.setProperty('width', 'auto', 'important');
      hero.style.setProperty('max-width', 'none', 'important');
    }
  }

  function boot() {
    injectCenteringStyles();
    forceCenterWinnerElements();
    requestAnimationFrame(forceCenterWinnerElements);
    setTimeout(forceCenterWinnerElements, 250);
    setTimeout(forceCenterWinnerElements, 900);

    const winner = document.getElementById('winner');
    if (winner) {
      const observer = new MutationObserver(() => requestAnimationFrame(forceCenterWinnerElements));
      observer.observe(winner, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
