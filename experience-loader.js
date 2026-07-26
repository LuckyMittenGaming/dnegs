(() => {
  'use strict';

  const MIN_DN_MS = 1850;
  const MAX_WAIT_MS = 4800;
  const CURTAIN_HOLD_MS = 1850;
  const CURTAIN_RAISE_MS = 1250;
  const MOBILE_INTRO_HOLD_MS = 1550;
  const MOBILE_VIDEO_MAX_MS = 9000;
  const signaturePath = '/assets/signatures/Make%20(1920%20x%201920%20px).svg';
  const mobileIntroVideo = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a66970f9eb8e1b1ccd879eb.mp4';
  const mobileIntroImage = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a669726fddfeb1aa910b5ae.png';
  const criticalImages = ['/assets/hero/hero-4.png', signaturePath, '/assets/trophies/bracelet-vault-door.png'];
  const criticalVideos = ['/assets/story/toronto-family.mp4'];
  const deferredScripts = [
    { src: 'https://platform.x.com/widgets.js', id: 'x-widgets-script' },
    { src: 'https://www.instagram.com/embed.js', id: 'instagram-embed-script' }
  ];

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const withTimeout = (promise, ms) => Promise.race([promise, wait(ms)]);

  function shouldRunMobileIntro() {
    return window.matchMedia('(max-width: 820px)').matches || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

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

  function installMobileIntroLayer() {
    if (!shouldRunMobileIntro()) return;
    const curtain = $('.load-curtain');
    if (!curtain) return;

    if (!$('#mobile-intro-loader-styles')) {
      const style = document.createElement('style');
      style.id = 'mobile-intro-loader-styles';
      style.textContent = `
        .mobile-intro-media{display:none}
        @media (max-width:820px),(hover:none) and (pointer:coarse){
          .load-curtain{place-items:center!important;align-content:center!important;justify-items:center!important;text-align:center!important;gap:clamp(.5rem,2.6vh,1.1rem)!important;padding:calc(env(safe-area-inset-top,0px) + 28px) 18px calc(env(safe-area-inset-bottom,0px) + 38px)!important;overflow:hidden!important;}
          .curtain-word{position:relative;z-index:6;display:block!important;max-width:94vw!important;white-space:normal!important;text-align:center!important;font-size:clamp(3.65rem,18vw,6.8rem)!important;line-height:.78!important;letter-spacing:-.085em!important;transform-origin:center!important;}
          .curtain-signature{position:relative;z-index:6;width:min(420px,82vw)!important;max-width:82vw!important;max-height:min(150px,20vh)!important;margin:0!important;object-fit:contain!important;justify-self:center!important;align-self:center!important;filter:drop-shadow(0 20px 30px rgba(0,0,0,.55)) drop-shadow(0 0 18px rgba(244,199,107,.18))!important;}
          .mobile-intro-media{display:block;position:absolute;inset:0;z-index:1;opacity:0;background:#020203;pointer-events:none;transition:opacity .52s ease;overflow:hidden;}
          .mobile-intro-video,.mobile-intro-image{position:absolute;inset:0;width:100%;height:100%;}
          .mobile-intro-video{object-fit:cover;object-position:center center;opacity:0;transition:opacity .44s ease;background:#020203;}
          .mobile-intro-image{object-fit:cover;object-position:center center;opacity:0;transition:opacity 1.05s ease;filter:saturate(1.04) contrast(1.04);}
          body.experience-mobile-intro .load-curtain{background:radial-gradient(circle at 50% 44%,rgba(244,199,107,.16),transparent 19rem),#020203!important;}
          body.experience-mobile-video .mobile-intro-media,body.experience-mobile-image .mobile-intro-media{opacity:1;z-index:4;}
          body.experience-mobile-video .mobile-intro-video{opacity:1;}
          body.experience-mobile-image .mobile-intro-video{opacity:0;}
          body.experience-mobile-image .mobile-intro-image{opacity:1;}
          body.experience-mobile-video .curtain-word,body.experience-mobile-video .curtain-signature,body.experience-mobile-image .curtain-word,body.experience-mobile-image .curtain-signature{opacity:0!important;transform:translateY(-10px) scale(.982)!important;transition:opacity .36s ease,transform .42s ease!important;}
          body.experience-curtain-raise .mobile-intro-media,body.experience-ready .mobile-intro-media{opacity:0!important;transition:opacity .45s ease!important;}
        }
        @media (max-width:390px){.curtain-word{font-size:clamp(3.1rem,18vw,5.6rem)!important}.curtain-signature{width:min(340px,78vw)!important;max-height:128px!important}}
      `;
      document.head.appendChild(style);
    }

    if (!$('[data-mobile-intro]', curtain)) {
      curtain.insertAdjacentHTML('beforeend', `
        <div class="mobile-intro-media" data-mobile-intro aria-hidden="true">
          <video class="mobile-intro-video" data-mobile-intro-video muted playsinline webkit-playsinline preload="auto">
            <source src="${mobileIntroVideo}" type="video/mp4">
          </video>
          <img class="mobile-intro-image" data-mobile-intro-image src="${mobileIntroImage}" alt="" decoding="async" fetchpriority="high" />
        </div>
      `);
    }
  }

  function waitForVideoReady(video) {
    return new Promise((resolve) => {
      if (!video) { resolve(false); return; }
      if (video.readyState >= 2) { resolve(true); return; }
      let settled = false;
      const done = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };
      video.addEventListener('canplay', () => done(true), { once: true });
      video.addEventListener('loadeddata', () => done(true), { once: true });
      video.addEventListener('error', () => done(false), { once: true });
      window.setTimeout(() => done(false), 2200);
    });
  }

  async function playMobileIntroIfNeeded() {
    if (!shouldRunMobileIntro()) return false;
    installMobileIntroLayer();

    const body = document.body;
    const video = $('[data-mobile-intro-video]');
    const image = $('[data-mobile-intro-image]');
    if (!video || !image) return false;

    body.classList.add('experience-mobile-intro');
    setProgress(100, 'Opening Kid Poker');

    // Keep KID POKER + autograph perfectly centered for a beat while the mobile video buffers.
    await wait(720);

    try {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.currentTime = 0;
      video.load();

      await waitForVideoReady(video);
      body.classList.add('experience-mobile-video');

      const play = video.play();
      if (play && typeof play.catch === 'function') await play.catch(() => undefined);

      const durationMs = Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(MOBILE_VIDEO_MAX_MS, Math.max(2400, video.duration * 1000))
        : 5400;

      await Promise.race([
        new Promise((resolve) => video.addEventListener('ended', resolve, { once: true })),
        wait(durationMs)
      ]);
    } catch {
      // If autoplay or the CDN video fails, continue gracefully to the final image.
      await wait(650);
    }

    try { video.pause(); } catch {}
    body.classList.remove('experience-mobile-video');
    body.classList.add('experience-mobile-image');
    await wait(MOBILE_INTRO_HOLD_MS);
    return true;
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

    const mobileAssets = shouldRunMobileIntro() ? [preloadImage(mobileIntroImage), preloadVideoMetadata(mobileIntroVideo)] : [];
    const fontsReady = document.fonts?.ready ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
    const assetPromise = Promise.allSettled([
      ...criticalImages.map(preloadImage),
      ...mobileAssets,
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
    installMobileIntroLayer();
    setProgress(6, 'Reading the room');

    await preloadCriticalAssets();

    body.classList.add('experience-phase-curtain');
    preloader?.classList.add('is-hidden');
    preloader?.setAttribute('aria-hidden', 'true');
    await wait(520);

    warmVideoElements();
    const playedMobileIntro = await playMobileIntroIfNeeded();
    if (!playedMobileIntro) await wait(CURTAIN_HOLD_MS);

    body.classList.add('experience-curtain-raise');
    await wait(CURTAIN_RAISE_MS);

    body.classList.remove('experience-loading', 'experience-controlled', 'experience-phase-curtain', 'experience-curtain-raise', 'experience-mobile-intro', 'experience-mobile-video', 'experience-mobile-image');
    body.classList.add('experience-ready');
    document.dispatchEvent(new CustomEvent('kidpoker:site-ready'));
    window.setTimeout(hydrateDeferredEmbeds, 450);
  }

  function failOpen() {
    document.body.classList.remove('experience-loading', 'experience-controlled', 'experience-phase-curtain', 'experience-curtain-raise', 'experience-mobile-intro', 'experience-mobile-video', 'experience-mobile-image');
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
  }, MAX_WAIT_MS + MIN_DN_MS + CURTAIN_HOLD_MS + CURTAIN_RAISE_MS + MOBILE_VIDEO_MAX_MS + MOBILE_INTRO_HOLD_MS + 2200);
})();