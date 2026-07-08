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
      script.src = src;
      script.defer = true;
      script.setAttribute(marker, 'true');
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  async function ensureGsap() {
    if (window.gsap && window.ScrollTrigger) return true;
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'data-gsap-wow');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'data-gsap-scroll-wow');
      return Boolean(window.gsap && window.ScrollTrigger);
    } catch (error) {
      return false;
    }
  }

  function initMagneticButtons() {
    if (!canHover || prefersReducedMotion) return;
    $$('.button, .header-cta').forEach((target) => {
      if (target.closest('.magnetic-wrap')) return;
      const wrap = document.createElement('span');
      wrap.className = 'magnetic-wrap';
      target.classList.add('magnetic-target');
      target.parentNode.insertBefore(wrap, target);
      wrap.appendChild(target);
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
    $$('.trophy-card, .media-card, .pillar-card, .partner-card, .blueprint-card, .hero-panel').forEach((card) => {
      card.classList.add('depth-card');
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const xRatio = (event.clientX - rect.left) / rect.width;
        const yRatio = (event.clientY - rect.top) / rect.height;
        const rotateY = (xRatio - 0.5) * 10;
        const rotateX = (0.5 - yRatio) * 8;
        card.style.setProperty('--mx', `${xRatio * 100}%`);
        card.style.setProperty('--my', `${yRatio * 100}%`);
        card.style.transform = `perspective(950px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  function initCursor(gsap) {
    if (!canHover || prefersReducedMotion) return;
    const cursor = $('.custom-cursor');
    const cursorText = $('.cursor-text');
    if (!cursor || !cursorText || !gsap) return;
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });
    window.addEventListener('mousemove', (event) => { xTo(event.clientX); yTo(event.clientY); }, { passive: true });
    $$('a, button, .depth-card').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorText.textContent = el.matches('.trophy-card') ? 'OPEN' : el.matches('.media-card') ? 'PLAY' : 'VIEW';
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
    const curtain = $('.load-curtain');
    const revealTexts = $$('.reveal-text');
    if (!gsap || prefersReducedMotion) {
      curtain?.remove();
      revealTexts.forEach((node) => { node.style.transform = 'none'; });
      return;
    }
    const timeline = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
    timeline
      .to('.load-curtain', { scaleY: 0, autoAlpha: 0, duration: 1.05 })
      .fromTo('.hero__cinema', { scale: 1.12, filter: 'blur(10px) brightness(.7)' }, { scale: 1, filter: 'blur(0px) brightness(1)', duration: 1.45 }, '-=.82')
      .to('.reveal-text', { y: '0%', rotate: 0, duration: .9, stagger: .13 }, '-=1.0')
      .fromTo('.hero__lede, .hero__actions, .hero-panel', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .72, stagger: .08 }, '-=.55');
  }

  function initScrollTheatre(gsap, ScrollTrigger) {
    const stage = $('.river-stage');
    if (!stage || !gsap || !ScrollTrigger || prefersReducedMotion || window.innerWidth < 761) return;
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.river-stage', start: 'top top', end: 'bottom bottom', scrub: 1.1, pin: '.river-pin' },
      defaults: { ease: 'power1.inOut' }
    });
    tl
      .set('.river-layer-1', { opacity: 1 })
      .fromTo('.river-card-a', { x: -160, y: -60, rotate: -26, scale: .78 }, { x: 80, y: 15, rotate: -4, scale: 1, duration: 1 }, 0)
      .fromTo('.river-card-b', { x: 160, y: -80, rotate: 26, scale: .78 }, { x: -80, y: 18, rotate: 5, scale: 1, duration: 1 }, 0)
      .fromTo('.river-layer-1 .river-copy', { y: 45, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .7 }, .08)
      .to('.river-progress span', { width: '34%', duration: .8 }, .1)
      .to('.river-layer-1', { opacity: 0, scale: .94, duration: .28 }, .88)
      .to('.river-layer-2', { opacity: 1, duration: .28 }, .95)
      .to('.river-pot', { rotation: 360, scale: 1.12, duration: .9 }, 1)
      .fromTo('.river-options span', { opacity: 0, y: 25, rotateX: -45 }, { opacity: 1, y: 0, rotateX: 0, stagger: .09, duration: .55, ease: 'back.out(1.6)' }, 1.05)
      .to('.river-card-c', { x: 150, y: -70, rotate: -8, scale: 1.08, duration: 1 }, 1.0)
      .to('.river-card-d', { x: -150, y: -60, rotate: 8, scale: 1.08, duration: 1 }, 1.0)
      .to('.river-progress span', { width: '68%', duration: .8 }, 1.1)
      .to('.river-layer-2', { opacity: 0, scale: .94, duration: .28 }, 1.9)
      .to('.river-layer-3', { opacity: 1, duration: .28 }, 1.96)
      .fromTo('.river-final-word', { y: 80, opacity: 0, scale: .72, filter: 'blur(10px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .75, ease: 'back.out(1.35)' }, 2.0)
      .to('.river-bg-card', { y: -120, rotation: '+=22', scale: .9, opacity: .32, duration: .85 }, 2.05)
      .to('.river-progress span', { width: '100%', duration: .8 }, 2.1);
  }

  function initVelocitySkew(gsap, ScrollTrigger) {
    if (!gsap || !ScrollTrigger || prefersReducedMotion || !canHover) return;
    const targets = $$('.velocity-skew, .trophy-card, .media-card');
    if (!targets.length) return;
    gsap.registerPlugin(ScrollTrigger);
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(targets, 'skewY', 'deg');
    const clamp = gsap.utils.clamp(-8, 8);
    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -520);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, { skew: 0, duration: .75, ease: 'power3', overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
        }
      }
    });
  }

  function initFallbackReveals() {
    if (window.gsap) return;
    $$('.reveal-text').forEach((node) => { node.style.transform = 'none'; });
    $('.load-curtain')?.remove();
  }

  async function init() {
    initMagneticButtons();
    initDepthTilt();
    const hasGsap = await ensureGsap();
    if (!hasGsap) { initFallbackReveals(); return; }
    initCursor(window.gsap);
    initGsapHero(window.gsap);
    initScrollTheatre(window.gsap, window.ScrollTrigger);
    initVelocitySkew(window.gsap, window.ScrollTrigger);
    window.ScrollTrigger?.refresh?.();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
