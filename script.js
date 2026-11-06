(() => {
  'use strict';

  /* ================= DATA ================= */
  const START = new Date(2026, 4, 8, 0, 0, 0); // 8 May 2026

  // [file, caption]  — "l" files are short live clips
  const GALLERY = [
    ['p04', 'the sea was jealous of you'],
    ['p20', 'my favourite walk'],
    ['p09', 'how are you this pretty?'],
    ['l02', 'that look 🫠'],
    ['p27', 'my princess in blue'],
    ['p30', 'like a queen on her throne'],
    ['p21', 'sunshine & you'],
    ['p11', 'that smile is my home'],
    ['l04', 'replaying this forever'],
    ['p06', 'wind in your hair'],
    ['p15', 'perfect, as always'],
    ['s1', 'those eyes…'],
    ['p26', 'the prettiest girl in the room'],
    ['p08', 'my rose 🌹'],
    ['l06', 'cutest thing alive'],
    ['p34', 'flowers bloom around you'],
    ['p16', 'mirror, mirror…'],
    ['p03', 'soft & sweet'],
    ['s2', 'you, in red, ugh 😍'],
    ['p22', 'campus days with you'],
    ['l01', 'my silly love'],
    ['p10', 'pastel princess'],
    ['p25', 'my everything'],
    ['p05', 'golden hour, golden girl'],
    ['p19', 'walking straight into my heart'],
    ['l05', 'I miss this face'],
    ['s3', 'beautiful, no filter needed'],
    ['p02', 'the coolest girl'],
    ['p17', 'filters can’t compete with you'],
    ['p14', 'shopping buddy forever'],
    ['p28', 'a dream in navy'],
    ['s6', 'that pout 💋'],
    ['l03', 'my heart just skipped'],
    ['p24', 'pretty in yellow'],
    ['p18', 'best friends & best smiles'],
    ['p07', 'my ocean girl'],
    ['p12', 'my cute little goof'],
    ['s5', 'my favourite notification'],
    ['p13', 'beach days are better with you'],
    ['l07', 'just you being you'],
    ['p23', 'sunglasses & sunshine'],
    ['p29', 'elegant, always'],
    ['s4', 'garden of my heart'],
    ['p01', 'my sleepy beauty'],
    ['s7', 'my sweetheart'],
  ];

  const VIDEOS = ['v02', 'v01', 'v05', 'v03', 'v06', 'v04'];

  const REASONS = [
    ['🌸', 'your laugh — it fixes my worst days in one second'],
    ['🥺', 'the way you care about everyone, even when you’re tired'],
    ['😊', 'your smile. honestly, it’s unfair how pretty it is'],
    ['🌙', 'our late-night talks that I never want to end'],
    ['🫶', 'you make me want to be a better man'],
    ['🎀', 'how cute you get when you’re angry (sorry 🙈)'],
    ['🌷', 'you feel like home'],
    ['💗', 'simply because you’re you, Janjonty'],
  ];

  const NO_LINES = [
    'are you sure? 🥺',
    'think again, my love…',
    'the button disagrees with you 😌',
    'nope, wrong button 💗',
    'pleaseee 🥹',
    'I’ll buy you chocolate 🍫',
    'okay now you’re just playing 😂',
    'just press yes already 💘',
  ];

  const $ = (s, el = document) => el.querySelector(s);
  const sky = $('.sky');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= FLOATING HEARTS & FLOWERS ================= */
  const FLOATERS = ['💗', '💕', '🌸', '💖', '🌷', '🤍', '🌹', '💞'];
  function spawnFloater() {
    const el = document.createElement('span');
    el.className = 'float';
    el.textContent = FLOATERS[(Math.random() * FLOATERS.length) | 0];
    const size = 14 + Math.random() * 22;
    const dur = 8 + Math.random() * 8;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = size + 'px';
    el.style.animationDuration = dur + 's';
    el.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    el.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    el.style.opacity = .8;
    sky.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }
  let floatTimer;
  function startSky(rate = 900) {
    if (reduceMotion) return;
    clearInterval(floatTimer);
    floatTimer = setInterval(() => { if (!document.hidden) spawnFloater(); }, rate);
  }

  function burst(x, y, n = 14, set = ['💗', '💖', '💕', '🌸']) {
    if (reduceMotion) return;
    for (let i = 0; i < n; i++) {
      const b = document.createElement('span');
      b.className = 'burst';
      b.textContent = set[i % set.length];
      const a = Math.random() * Math.PI * 2;
      const d = 60 + Math.random() * 110;
      b.style.left = x + 'px';
      b.style.top = y + 'px';
      b.style.setProperty('--dx', Math.cos(a) * d + 'px');
      b.style.setProperty('--dy', Math.sin(a) * d + 'px');
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 1200);
    }
  }

  /* ================= INTRO ================= */
  const intro = $('#intro'), envelope = $('#envelope'), main = $('#main');
  startSky(1400);
  envelope.addEventListener('click', (e) => {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    const r = envelope.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 20);
    setTimeout(() => {
      intro.classList.add('gone');
      document.body.classList.remove('locked');
      main.classList.add('show');
      main.removeAttribute('aria-hidden');
      startSky(800);
      setTimeout(() => intro.remove(), 1000);
    }, 1500);
  });

  /* ================= COUNTER ================= */
  const cD = $('#cDays'), cH = $('#cHours'), cM = $('#cMins'), cS = $('#cSecs');
  function tick() {
    let diff = Math.max(0, Date.now() - START.getTime()) / 1000;
    const d = Math.floor(diff / 86400); diff -= d * 86400;
    const h = Math.floor(diff / 3600); diff -= h * 3600;
    const m = Math.floor(diff / 60);
    const s = Math.floor(diff - m * 60);
    cD.textContent = d; cH.textContent = h; cM.textContent = m; cS.textContent = String(s).padStart(2, '0');
  }
  tick(); setInterval(tick, 1000);

  /* ================= REASON CARDS ================= */
  const cards = $('#cards');
  REASONS.forEach(([ico, text], i) => {
    const c = document.createElement('button');
    c.className = 'card';
    c.setAttribute('aria-label', 'Reason ' + (i + 1));
    c.innerHTML = `<div class="card-inner">
        <div class="card-face card-front"><span class="ico">${ico}</span><small>REASON #${i + 1}</small></div>
        <div class="card-face card-back">${text}</div></div>`;
    c.addEventListener('click', (e) => {
      c.classList.toggle('flip');
      if (c.classList.contains('flip')) burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 6);
    });
    cards.appendChild(c);
  });

  /* ================= GALLERY ================= */
  const DIMS = {"p01":[720,1280],"p02":[576,768],"p03":[404,720],"p04":[1080,1356],"p05":[963,1374],"p06":[896,1042],"p07":[1048,1390],"p08":[899,1600],"p09":[899,1600],"p10":[899,1600],"p11":[899,1600],"p12":[1080,608],"p13":[896,1046],"p14":[453,1280],"p15":[963,1280],"p16":[720,1280],"p17":[1080,696],"p18":[1080,1440],"p19":[837,1040],"p20":[784,1040],"p21":[1019,1280],"p22":[1080,1276],"p23":[874,1280],"p24":[720,1280],"p25":[376,622],"p26":[960,1280],"p27":[960,1280],"p28":[960,1280],"p29":[960,1280],"p30":[960,1280],"s1":[1080,850],"s2":[1080,1740],"s3":[1080,1680],"s4":[1080,1848],"s5":[1080,1440],"s6":[1080,1760],"s7":[1550,941],"l01":[850,478],"l02":[478,850],"l03":[850,478],"l04":[854,480],"l05":[850,478],"l06":[640,478],"l07":[640,478]};
  const masonry = $('#masonry');
  const isLive = (f) => f[0] === 'l';
  const tiles = GALLERY.map(([f, cap], idx) => {
    const [w, h] = DIMS[f] || [1, 1];
    const t = document.createElement('button');
    t.className = 'tile';
    t.setAttribute('aria-label', cap);
    t.style.aspectRatio = `${w} / ${h}`;
    t._ratio = h / w;
    if (isLive(f)) {
      t.innerHTML = `<video src="assets/vid/${f}.mp4" poster="assets/vid/${f}.jpg" muted loop playsinline preload="none"></video><span class="live">LIVE</span>`;
    } else {
      t.innerHTML = `<img src="assets/img/${f}.jpg" alt="${cap}" width="${w}" height="${h}" loading="lazy" decoding="async">`;
    }
    t.addEventListener('click', () => openLB(idx));
    return t;
  });
  // balanced columns: each tile goes into the currently shortest column
  let colCount = 0;
  function layoutGallery() {
    const n = innerWidth >= 700 ? 3 : 2;
    if (n === colCount) return;
    colCount = n;
    masonry.innerHTML = '';
    const cols = Array.from({ length: n }, () => {
      const c = document.createElement('div'); c.className = 'col'; c._h = 0; masonry.appendChild(c); return c;
    });
    tiles.forEach((t) => {
      const c = cols.reduce((a, b) => (b._h < a._h ? b : a));
      c.appendChild(t); c._h += t._ratio;
    });
  }
  layoutGallery();
  addEventListener('resize', layoutGallery);

  // autoplay live clips only while visible
  const liveIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { threshold: .4 });
  masonry.querySelectorAll('video').forEach((v) => liveIO.observe(v));

  /* ================= VIDEO REEL ================= */
  const reel = $('#reel');
  VIDEOS.forEach((f) => {
    const c = document.createElement('div');
    c.className = 'clip';
    c.innerHTML = `<video src="assets/vid/${f}.mp4" poster="assets/vid/${f}.jpg" playsinline preload="metadata"></video>
      <button class="clip-play" aria-label="Play video"><span>▶</span></button>`;
    const v = $('video', c);
    $('.clip-play', c).addEventListener('click', () => {
      reel.querySelectorAll('video').forEach((o) => o !== v && o.pause());
      v.controls = true; v.play();
    });
    v.addEventListener('play', () => c.classList.add('playing'));
    v.addEventListener('ended', () => { c.classList.remove('playing'); v.controls = false; });
    reel.appendChild(c);
  });
  new IntersectionObserver((en) => {
    en.forEach((e) => { if (!e.isIntersecting) reel.querySelectorAll('video').forEach((v) => v.pause()); });
  }).observe(reel);

  /* ================= LIGHTBOX ================= */
  const lb = $('#lightbox'), stage = $('#lbStage'), lbCap = $('#lbCap');
  let cur = 0;
  function renderLB() {
    const [f, cap] = GALLERY[cur];
    stage.innerHTML = isLive(f)
      ? `<video src="assets/vid/${f}.mp4" poster="assets/vid/${f}.jpg" autoplay loop playsinline controls></video>`
      : `<img src="assets/img/${f}.jpg" alt="${cap}">`;
    lbCap.textContent = cap;
  }
  function openLB(i) { cur = i; renderLB(); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeLB() { lb.hidden = true; stage.innerHTML = ''; document.body.style.overflow = ''; }
  const step = (d) => { cur = (cur + d + GALLERY.length) % GALLERY.length; renderLB(); };
  $('#lbClose').addEventListener('click', closeLB);
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target === stage) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  let sx = 0, sy = 0;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (dy > 90) closeLB();
  });

  /* ================= SCROLL REVEAL ================= */
  const revIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((el) => revIO.observe(el));

  /* ================= FORGIVE ME ================= */
  const zone = $('#answerZone'), noBtn = $('#noBtn'), yesBtn = $('#yesBtn'), noNote = $('#noNote');
  let tries = 0;
  function runAway(e) {
    if (e) e.preventDefault();
    const z = zone.getBoundingClientRect();
    const b = noBtn.getBoundingClientRect();
    const yb = yesBtn.getBoundingClientRect();
    noBtn.classList.add('loose');
    let x, y, guard = 0;
    do {
      x = Math.random() * (z.width - b.width);
      y = Math.random() * (z.height - b.height);
      guard++;
      // keep away from the Yes button
    } while (guard < 30 &&
      x + z.left < yb.right + 10 && x + z.left + b.width > yb.left - 10 &&
      y + z.top < yb.bottom + 10 && y + z.top + b.height > yb.top - 10);
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    noNote.textContent = NO_LINES[tries % NO_LINES.length];
    tries++;
    const shrink = Math.max(.45, 1 - tries * .08);
    noBtn.style.transform = `scale(${shrink})`;
    yesBtn.style.transform = `scale(${Math.min(1.6, 1 + tries * .08)})`;
  }
  noBtn.addEventListener('pointerdown', runAway);
  noBtn.addEventListener('mouseenter', () => runAway());
  noBtn.addEventListener('click', runAway);
  noBtn.addEventListener('focus', () => runAway());

  const cel = $('#celebrate');
  yesBtn.addEventListener('click', (e) => {
    cel.hidden = false;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => burst(Math.random() * innerWidth, Math.random() * innerHeight * .8, 18,
        ['💗', '💖', '🌹', '🌸', '💕', '🌷']), i * 220);
    }
    startSky(250);
    setTimeout(() => startSky(800), 6000);
    noNote.textContent = 'I knew it 💗';
  });
  $('#celClose').addEventListener('click', () => {
    cel.hidden = true;
    burst(innerWidth / 2, innerHeight / 2, 24);
  });
})();
