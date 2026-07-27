(() => {
  'use strict';

  const MIN_DN_MS = 1850;
  const MAX_WAIT_MS = 4800;
  const CURTAIN_HOLD_MS = 1850;
  const CURTAIN_RAISE_MS = 1250;
  const MOBILE_INTRO_HOLD_MS = 1850;
  const MOBILE_VIDEO_MAX_MS = 12000;
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
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.addEventListener('loadedmetadata', () => finish(true), { once: true });
      video.addEventListener('loadeddata', () => finish(true), { once: true });
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
        .mobile-intro-stage{display:none}
        @media (max-width:820px),(hover:none) and (pointer:coarse){
          .load-curtain{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;gap:clamp(1.05rem,3.35vh,2rem)!important;padding:calc(env(safe-area-inset-top,0px) + 34px) 6vw calc(env(safe-area-inset-bottom,0px) + 44px)!important;overflow:hidden!important;box-sizing:border-box!important;}
          .curtain-word{position:relative;z-index:6;display:block!important;width:100%!important;max-width:90vw!important;white-space:nowrap!important;text-align:center!important;font-size:clamp(2.85rem,14.6vw,5.35rem)!important;line-height:.9!important;letter-spacing:-.045em!important;transform-origin:center!important;box-sizing:border-box!important;overflow:visible!important;}
          .curtain-signature{position:relative;z-index:6;width:min(365px,78vw)!important;max-width:78vw!important;max-height:min(148px,18vh)!important;margin:clamp(.75rem,2.9vh,1.7rem) auto 0!important;object-fit:contain!important;justify-self:center!important;align-self:center!important;display:block!important;filter:drop-shadow(0 20px 30px rgba(0,0,0,.55)) drop-shadow(0 0 18px rgba(244,199,107,.18))!important;}
          .mobile-intro-stage{display:block;position:fixed;inset:0;z-index:0;opacity:0;visibility:hidden;background:#020203;pointer-events:none;transition:opacity .55s ease,visibility .55s ease;overflow:hidden;}
          .mobile-intro-video,.mobile-intro-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center;background:#020203;opacity:0;transition:opacity .55s ease;}
          .mobile-intro-image{transition:opacity 1.05s ease;filter:saturate(1.04) contrast(1.04);}
          body.experience-mobile-intro .load-curtain{background:radial-gradient(circle at 50% 44%,rgba(244,199,107,.16),transparent 19rem),#020203!important;}
          body.experience-mobile-video .mobile-intro-stage,body.experience-mobile-image .mobile-intro-stage{opacity:1;visibility:visible;z-index:52000;}
          body.experience-mobile-video .mobile-intro-video{opacity:1;}
          body.experience-mobile-image .mobile-intro-video{opacity:0;}
          body.experience-mobile-image .mobile-intro-image{opacity:1;}
          body.experience-mobile-video .curtain-word,body.experience-mobile-video .curtain-signature,body.experience-mobile-image .curtain-word,body.experience-mobile-image .curtain-signature{opacity:0!important;transform:translateY(-10px) scale(.982)!important;transition:opacity .36s ease,transform .42s ease!important;}
          body.experience-curtain-raise .mobile-intro-stage,body.experience-ready .mobile-intro-stage{opacity:0!important;visibility:hidden!important;transition:opacity .45s ease,visibility .45s ease!important;}
          .hero-main-visual{background-image:linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.18) 52%,rgba(0,0,0,.7)),url('${mobileIntroImage}')!important;background-size:cover!important;background-position:center center!important;}
        }
        @media (max-width:430px){.curtain-word{max-width:88vw!important;font-size:clamp(2.65rem,14.1vw,4.85rem)!important;letter-spacing:-.04em!important}.curtain-signature{width:min(330px,76vw)!important;max-height:132px!important;margin-top:clamp(.9rem,3.2vh,1.8rem)!important}}
        @media (max-width:360px){.curtain-word{font-size:clamp(2.38rem,13.8vw,4.25rem)!important;letter-spacing:-.035em!important}.curtain-signature{width:min(300px,74vw)!important}}
      `;
      document.head.appendChild(style);
    }

    if (!$('[data-mobile-intro-stage]')) {
      document.body.insertAdjacentHTML('beforeend', `
        <div class="mobile-intro-stage" data-mobile-intro-stage aria-hidden="true">
          <video class="mobile-intro-video" data-mobile-intro-video src="${mobileIntroVideo}" autoplay muted playsinline webkit-playsinline preload="auto"></video>
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
      video.addEventListener('loadedmetadata', () => done(true), { once: true });
      video.addEventListener('error', () => done(false), { once: true });
      try { video.load(); } catch {}
      window.setTimeout(() => done(false), 1600);
    });
  }

  function waitForVideoPlayback(video) {
    return new Promise((resolve) => {
      if (!video) { resolve(false); return; }
      let settled = false;
      const done = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };
      video.addEventListener('playing', () => done(true), { once: true });
      video.addEventListener('timeupdate', () => { if (video.currentTime > .08) done(true); }, { once: true });
      video.addEventListener('error', () => done(false), { once: true });
      window.setTimeout(() => done(video.currentTime > 0), 900);
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

    // Hold the centered title/autograph long enough to read and give the video a real buffer window.
    await wait(920);

    try {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = false;
      video.controls = false;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('autoplay', '');
      video.currentTime = 0;
      video.load();

      await waitForVideoReady(video);
      body.classList.add('experience-mobile-video');
      await wait(90);

      const play = video.play();
      if (play && typeof play.catch === 'function') await play.catch(() => undefined);
      const didPlay = await waitForVideoPlayback(video);

      if (!didPlay) throw new Error('mobile intro autoplay did not start');

      const durationMs = Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(MOBILE_VIDEO_MAX_MS, Math.max(2400, video.duration * 1000))
        : 6200;

      await Promise.race([
        new Promise((resolve) => video.addEventListener('ended', resolve, { once: true })),
        wait(durationMs)
      ]);
    } catch {
      // If autoplay or the CDN video fails, immediately honor the requested final mobile image.
      await wait(250);
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
  }, MAX_WAIT_MS + MIN_DN_MS + CURTAIN_HOLD_MS + CURTAIN_RAISE_MS + MOBILE_VIDEO_MAX_MS + MOBILE_INTRO_HOLD_MS + 2600);
})();