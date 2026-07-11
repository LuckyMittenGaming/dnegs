(() => {
  'use strict';

  const MIN_DN_MS = 1850;
  const MAX_WAIT_MS = 4800;
  const CURTAIN_HOLD_MS = 1850;
  const CURTAIN_RAISE_MS = 1250;
  const signaturePath = '/assets/signatures/Make%20(1920%20x%201920%20px).svg';
  const criticalImages = ['/assets/hero/hero-4.png', signaturePath, '/assets/trophies/bracelet-vault-door.png'];
  const criticalVideos = ['/assets/story/toronto-family.mp4'];
  const deferredScripts = [
    { src: 'https://platform.x.com/widgets.js', id: 'x-widgets-script' },
    { src: 'https://www.instagram.com/embed.js', id: 'instagram-embed-script' }
  ];

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const withTimeout = (promise, ms) => Promise.race([promise, wait(ms)]);

  function setProgress(value, status) {
    const bar = $('[data-load-bar]');
    const statusNode = $('[data-loader-status]');
    if (bar) bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
    if (statusNode && status) statusNode.textContent = status;
  }

  function preloadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ src, ok: true });
      img.onerror = () => resolve({ src, ok: false });
      img.decoding = 'async';
      img.src = src;
    });
  }

  function preloadVideoMetadata(src) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        video.removeAttribute('src');
        video.load();
        resolve({ src, ok });
      };
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.addEventListener('loadedmetadata', () => finish(true), { once: true });
      video.addEventListener('error', () => finish(false), { once: true });
      video.src = src;
      video.load();
      window.setTimeout(() => finish(false), 2500);
    });
  }

  function hydrateDeferredEmbeds() {
    document.querySelectorAll('iframe[data-defer-src]').forEach((iframe) => {
      if (!iframe.src) iframe.src = iframe.dataset.deferSrc;
    });
    deferredScripts.forEach(({ src, id }) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.id = id;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    });
  }

  function warmVideoElements() {
    document.querySelectorAll('video[preload="metadata"]').forEach((video) => {
      try { video.load(); } catch {}
    });
  }

  async function preloadCriticalAssets() {
    const progressSteps = [
      [18, 'Setting the table'],
      [32, 'Loading the hero'],
      [48, 'Loading the signature'],
      [64, 'Unlocking the vault'],
      [78, 'Queuing the story'],
      [90, 'Reading the room']
    ];
    let step = 0;
    const interval = window.setInterval(() => {
      const next = progressSteps[Math.min(step, progressSteps.length - 1)];
      setProgress(next[0], next[1]);
      step += 1;
    }, 260);

    const fontsReady = document.fonts?.ready ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
    const assetPromise = Promise.allSettled([
      ...criticalImages.map(preloadImage),
      ...criticalVideos.map(preloadVideoMetadata),
      fontsReady
    ]);

    await Promise.allSettled([withTimeout(assetPromise, MAX_WAIT_MS), wait(MIN_DN_MS)]);
    window.clearInterval(interval);
    setProgress(100, 'Opening the curtain');
  }

  async function runExperience() {
    const body = document.body;
    const preloader = $('[data-preloader]');
    body.classList.add('experience-controlled', 'experience-loading');
    setProgress(6, 'Reading the room');

    await preloadCriticalAssets();

    body.classList.add('experience-phase-curtain');
    preloader?.classList.add('is-hidden');
    preloader?.setAttribute('aria-hidden', 'true');
    await wait(520);

    warmVideoElements();
    await wait(CURTAIN_HOLD_MS);

    body.classList.add('experience-curtain-raise');
    await wait(CURTAIN_RAISE_MS);

    body.classList.remove('experience-loading', 'experience-controlled', 'experience-phase-curtain', 'experience-curtain-raise');
    body.classList.add('experience-ready');
    document.dispatchEvent(new CustomEvent('kidpoker:site-ready'));
    window.setTimeout(hydrateDeferredEmbeds, 450);
  }

  function failOpen() {
    document.body.classList.remove('experience-loading', 'experience-controlled', 'experience-phase-curtain', 'experience-curtain-raise');
    document.body.classList.add('experience-ready');
    setProgress(100);
    hydrateDeferredEmbeds();
  }

  window.KID_POKER_EXPERIENCE_LOADER = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', failOpen, { once: true });
    else failOpen();
    return;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => runExperience().catch(failOpen), { once: true });
  else runExperience().catch(failOpen);

  window.setTimeout(() => {
    if (!document.body.classList.contains('experience-ready')) failOpen();
  }, MAX_WAIT_MS + MIN_DN_MS + CURTAIN_HOLD_MS + CURTAIN_RAISE_MS + 1400);
})();
