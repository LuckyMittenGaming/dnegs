(() => {
  'use strict';

  const MIN_DN_MS = 1850;
  const MAX_WAIT_MS = 4800;
  const CURTAIN_HOLD_MS = 1850;
  const CURTAIN_RAISE_MS = 1250;
  const MOBILE_INTRO_HOLD_MS = 1500;
  const MOBILE_VIDEO_MAX_MS = 16000;
  const MOBILE_INTRO_KEY = 'kidPokerMobileIntroPlayed:v2';
  const signaturePath = '/assets/signatures/Make%20(1920%20x%201920%20px).svg';
  const mobileIntroVideo = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a68079d61cabb1ecba3eacd.mp4';
  const mobileIntroImage = 'https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a669726fddfeb1aa910b5ae.png';
  const criticalImages = ['/assets/hero/hero-4.png', signaturePath, '/assets/trophies/bracelet-vault-door.png'];
  const criticalVideos = ['/assets/story/toronto-family.mp4'];
  const deferredScripts = [
    { src: 'https://platform.x.com/widgets.js', id: 'x-widgets-script' },
    { src: 'https://platform.twitter.com/widgets.js', id: 'twitter-widgets-script' },
    { src: 'https://www.instagram.com/embed.js', id: 'instagram-embed-script' }
  ];

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const withTimeout = (promise, ms) => Promise.race([promise, wait(ms)]);
  const shouldRunMobileIntro = () => window.matchMedia('(max-width: 820px)').matches || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const hasPlayedMobileIntro = () => { try { return window.sessionStorage.getItem(MOBILE_INTRO_KEY) === '1'; } catch { return false; } };
  const markMobileIntroPlayed = () => { try { window.sessionStorage.setItem(MOBILE_INTRO_KEY, '1'); } catch {} };

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
      const finish = (ok) => { if (!settled) { settled = true; video.removeAttribute('src'); video.load(); resolve({ src, ok }); } };
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
    if (!shouldRunMobileIntro() || hasPlayedMobileIntro()) return;
    if (!$('#mobile-intro-loader-styles')) {
      const style = document.createElement('style');
      style.id = 'mobile-intro-loader-styles';
      style.textContent = `
        .mobile-intro-stage{display:none}
        @media (max-width:820px),(hover:none) and (pointer:coarse){
          .load-curtain{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;gap:clamp(.25rem,1vh,.75rem)!important;padding:calc(env(safe-area-inset-top,0px) + 34px) 6vw calc(env(safe-area-inset-bottom,0px) + 44px)!important;overflow:hidden!important;box-sizing:border-box!important;}
          .curtain-word{position:relative;z-index:6;display:block!important;width:100%!important;max-width:92vw!important;white-space:nowrap!important;text-align:center!important;font-size:clamp(2.25rem,12vw,4.65rem)!important;line-height:1!important;letter-spacing:.04em!important;transform-origin:center!important;box-sizing:border-box!important;overflow:visible!important;}
          .curtain-signature{position:relative;z-index:6;width:min(360px,82vw)!important;max-width:82vw!important;max-height:min(150px,18vh)!important;margin:clamp(.08rem,.4vh,.28rem) auto 0!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 20px 30px rgba(0,0,0,.55)) drop-shadow(0 0 18px rgba(244,199,107,.18))!important;}
          .mobile-intro-stage{display:block;position:fixed;inset:0;z-index:0;opacity:0;visibility:hidden;background:#020203;pointer-events:none;transition:opacity .55s ease,visibility .55s ease;overflow:hidden;}
          .mobile-intro-video,.mobile-intro-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center;background:#020203;opacity:0;transition:opacity .55s ease;}
          .mobile-intro-image{transition:opacity 1.05s ease;filter:saturate(1.04) contrast(1.04);}
          .mobile-intro-sound{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 2rem);z-index:6;transform:translateX(-50%);border:1px solid rgba(255,224,145,.55);border-radius:999px;padding:.85rem 1.15rem;background:linear-gradient(135deg,#fff0b8,#f4c76b 45%,#b97824);color:#120b04;font-weight:950;box-shadow:0 18px 48px rgba(0,0,0,.5);opacity:0;pointer-events:none;transition:opacity .35s ease,transform .35s ease;}
          .mobile-intro-stage.needs-tap .mobile-intro-sound{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(-4px);}
          body.experience-mobile-intro .load-curtain{background:radial-gradient(circle at 50% 44%,rgba(244,199,107,.16),transparent 19rem),#020203!important;}
          body.experience-mobile-video .mobile-intro-stage,body.experience-mobile-image .mobile-intro-stage{opacity:1;visibility:visible;z-index:52000;pointer-events:auto;}
          body.experience-mobile-video .mobile-intro-video{opacity:1;}
          body.experience-mobile-image .mobile-intro-video{opacity:0;}
          body.experience-mobile-image .mobile-intro-image{opacity:1;}
          body.experience-mobile-video .curtain-word,body.experience-mobile-video .curtain-signature,body.experience-mobile-image .curtain-word,body.experience-mobile-image .curtain-signature{opacity:0!important;transform:translateY(-10px) scale(.982)!important;transition:opacity .36s ease,transform .42s ease!important;}
          body.experience-curtain-raise .mobile-intro-stage,body.experience-ready .mobile-intro-stage{opacity:0!important;visibility:hidden!important;transition:opacity .45s ease,visibility .45s ease!important;}
          .hero-main-visual{background-image:linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.18) 52%,rgba(0,0,0,.7)),url('${mobileIntroImage}')!important;background-size:cover!important;background-position:center center!important;}
        }`;
      document.head.appendChild(style);
    }
    if (!$('[data-mobile-intro-stage]')) {
      document.body.insertAdjacentHTML('beforeend', `<div class="mobile-intro-stage" data-mobile-intro-stage aria-hidden="true"><video class="mobile-intro-video" data-mobile-intro-video src="${mobileIntroVideo}" playsinline webkit-playsinline preload="auto"></video><img class="mobile-intro-image" data-mobile-intro-image src="${mobileIntroImage}" alt="" decoding="async" fetchpriority="high" /><button class="mobile-intro-sound" type="button" data-mobile-intro-sound>Tap to play with sound</button></div>`);
    }
  }

  function waitForVideoReady(video) {
    return new Promise((resolve) => {
      if (!video || video.readyState >= 2) { resolve(!!video); return; }
      let settled = false;
      const done = (ok) => { if (!settled) { settled = true; resolve(ok); } };
      video.addEventListener('canplay', () => done(true), { once: true });
      video.addEventListener('loadeddata', () => done(true), { once: true });
      video.addEventListener('loadedmetadata', () => done(true), { once: true });
      video.addEventListener('error', () => done(false), { once: true });
      try { video.load(); } catch {}
      window.setTimeout(() => done(false), 1800);
    });
  }

  function waitForVideoPlayback(video) {
    return new Promise((resolve) => {
      if (!video) { resolve(false); return; }
      let settled = false;
      const done = (ok) => { if (!settled) { settled = true; resolve(ok); } };
      video.addEventListener('playing', () => done(true), { once: true });
      video.addEventListener('timeupdate', () => { if (video.currentTime > .08) done(true); }, { once: true });
      video.addEventListener('error', () => done(false), { once: true });
      window.setTimeout(() => done(video.currentTime > 0), 950);
    });
  }

  async function tryPlayWithSound(video, stage) {
    try {
      video.muted = false; video.defaultMuted = false; video.removeAttribute('muted'); video.volume = 1; video.currentTime = 0;
      await video.play();
      return await waitForVideoPlayback(video);
    } catch {
      stage?.classList.add('needs-tap');
      const button = $('[data-mobile-intro-sound]', stage);
      return new Promise((resolve) => {
        let settled = false;
        const done = (value) => { if (!settled) { settled = true; stage?.classList.remove('needs-tap'); resolve(value); } };
        button?.addEventListener('click', async () => {
          try { video.muted = false; video.defaultMuted = false; video.removeAttribute('muted'); video.volume = 1; video.currentTime = 0; await video.play(); done(await waitForVideoPlayback(video)); } catch { done(false); }
        }, { once: true });
        window.setTimeout(() => done(false), 7000);
      });
    }
  }

  async function playMobileIntroIfNeeded() {
    if (!shouldRunMobileIntro() || hasPlayedMobileIntro()) return false;
    installMobileIntroLayer();
    const body = document.body;
    const stage = $('[data-mobile-intro-stage]');
    const video = $('[data-mobile-intro-video]');
    if (!video) return false;
    body.classList.add('experience-mobile-intro');
    setProgress(100, 'Opening Kid Poker');
    await wait(900);
    try {
      video.playsInline = true; video.loop = false; video.controls = false; video.setAttribute('playsinline',''); video.setAttribute('webkit-playsinline',''); video.load();
      await waitForVideoReady(video);
      body.classList.add('experience-mobile-video');
      await wait(90);
      const didPlay = await tryPlayWithSound(video, stage);
      if (didPlay) {
        const durationMs = Number.isFinite(video.duration) && video.duration > 0 ? Math.min(MOBILE_VIDEO_MAX_MS, Math.max(2400, video.duration * 1000)) : 6200;
        await Promise.race([new Promise((resolve) => video.addEventListener('ended', resolve, { once: true })), wait(durationMs)]);
      } else await wait(350);
    } catch { await wait(250); }
    markMobileIntroPlayed();
    try { video.pause(); } catch {}
    body.classList.remove('experience-mobile-video');
    body.classList.add('experience-mobile-image');
    await wait(MOBILE_INTRO_HOLD_MS);
    return true;
  }

  function hydrateDeferredEmbeds() {
    document.querySelectorAll('iframe[data-defer-src]').forEach((iframe) => { if (!iframe.src) iframe.src = iframe.dataset.deferSrc; });
    deferredScripts.forEach(({ src, id }) => { if (document.getElementById(id)) return; const script = document.createElement('script'); script.async = true; script.src = src; script.id = id; script.charset = 'utf-8'; document.body.appendChild(script); });
  }
  function warmVideoElements() { document.querySelectorAll('video[preload="metadata"]').forEach((video) => { try { video.load(); } catch {} }); }
  async function preloadCriticalAssets() {
    const progressSteps = [[18,'Setting the table'],[32,'Loading the hero'],[48,'Loading the signature'],[64,'Unlocking the vault'],[78,'Queuing the story'],[90,'Reading the room']];
    let step = 0;
    const interval = window.setInterval(() => { const next = progressSteps[Math.min(step, progressSteps.length - 1)]; setProgress(next[0], next[1]); step += 1; }, 260);
    const mobileAssets = shouldRunMobileIntro() && !hasPlayedMobileIntro() ? [preloadImage(mobileIntroImage), preloadVideoMetadata(mobileIntroVideo)] : [];
    const fontsReady = document.fonts?.ready ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
    await Promise.allSettled([withTimeout(Promise.allSettled([...criticalImages.map(preloadImage), ...mobileAssets, ...criticalVideos.map(preloadVideoMetadata), fontsReady]), MAX_WAIT_MS), wait(MIN_DN_MS)]);
    window.clearInterval(interval); setProgress(100, 'Opening the curtain');
  }
  async function runExperience() {
    const body = document.body; const preloader = $('[data-preloader]');
    body.classList.add('experience-controlled', 'experience-loading'); installMobileIntroLayer(); setProgress(6, 'Reading the room');
    await preloadCriticalAssets(); body.classList.add('experience-phase-curtain'); preloader?.classList.add('is-hidden'); preloader?.setAttribute('aria-hidden','true'); await wait(520);
    warmVideoElements(); const playedMobileIntro = await playMobileIntroIfNeeded(); if (!playedMobileIntro) await wait(CURTAIN_HOLD_MS);
    body.classList.add('experience-curtain-raise'); await wait(CURTAIN_RAISE_MS);
    body.classList.remove('experience-loading','experience-controlled','experience-phase-curtain','experience-curtain-raise','experience-mobile-intro','experience-mobile-video','experience-mobile-image');
    body.classList.add('experience-ready'); document.dispatchEvent(new CustomEvent('kidpoker:site-ready')); window.setTimeout(hydrateDeferredEmbeds, 450);
  }
  function failOpen(){document.body.classList.remove('experience-loading','experience-controlled','experience-phase-curtain','experience-curtain-raise','experience-mobile-intro','experience-mobile-video','experience-mobile-image');document.body.classList.add('experience-ready');setProgress(100);hydrateDeferredEmbeds();}
  window.KID_POKER_EXPERIENCE_LOADER = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', failOpen, { once: true }); else failOpen(); return; }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => runExperience().catch(failOpen), { once: true }); else runExperience().catch(failOpen);
  window.setTimeout(() => { if (!document.body.classList.contains('experience-ready')) failOpen(); }, MAX_WAIT_MS + MIN_DN_MS + CURTAIN_HOLD_MS + CURTAIN_RAISE_MS + MOBILE_VIDEO_MAX_MS + MOBILE_INTRO_HOLD_MS + 3800);
})();
