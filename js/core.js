/* Core: helpers, router, modal, toast, sound, starfall background. */
(function (SG) {
  const $ = SG.$ = (s, r) => (r || document).querySelector(s);
  const $$ = SG.$$ = (s, r) => [...(r || document).querySelectorAll(s)];
  SG.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  SG.svgEl = (tag, attrs, parent) => { const e = document.createElementNS(SG.NS, tag); for (const k in (attrs || {})) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  SG.houseById = id => LORE.houses.find(h => h.id === id);
  SG.regionById = id => LORE.regions.find(r => r.id === id);
  SG.phaseById = id => LORE.phases.find(p => p.id === id);
  SG.pick = a => a[Math.floor(Math.random() * a.length)];

  SG.mkTabs = function (box, items, onSel, firstId) {
    box.innerHTML = '';
    items.forEach(it => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'btn'; b.dataset.id = it.id; b.textContent = it.label; b.setAttribute('role', 'tab');
      b.addEventListener('click', () => sel(it.id)); box.appendChild(b);
    });
    function sel(id) { $$('button', box).forEach(b => { const on = b.dataset.id === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); onSel(id); }
    if (firstId !== false) sel(firstId != null ? firstId : items[0].id);
    return sel;
  };

  /* ---------- toast ---------- */
  let tt;
  SG.toast = function (text) {
    const t = $('#toast'); t.textContent = text; t.classList.add('show');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 4200);
  };

  /* ---------- modal ---------- */
  let modalClose = null, lastFocus = null;
  SG.openModal = function (html, onClose) {
    const m = $('#modal'); lastFocus = document.activeElement;
    $('#mbody').innerHTML = html; m.hidden = false; document.body.classList.add('modal-open');
    modalClose = onClose || null; $('#modal .x').focus();
    $('#modal .box').scrollTop = 0;
    return $('#mbody');
  };
  SG.closeModal = function (silent) {
    const m = $('#modal'); if (m.hidden) return; m.hidden = true; document.body.classList.remove('modal-open');
    $('#mbody').innerHTML = '';
    const cb = modalClose; modalClose = null; if (cb && !silent) cb();
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  };
  $('#modal .x').addEventListener('click', () => SG.closeModal());
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') SG.closeModal(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') SG.closeModal(); });

  /* ---------- sound engine (generated: ambience + click sounds) ----------
     The music player (js/music.js) decides when the ambience plays. */
  const S = SG.sound = { fx: false, ambOn: false, ctx: null, vol: .5 };
  const NOTES = [587.33, 659.25, 783.99, 880, 987.77, 1174.66];
  S.ensure = function () {
    if (S.ctx) { S.ctx.resume(); return true; }
    try {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
      const c = S.ctx = new C();
      S.master = c.createGain(); S.master.gain.value = S.vol; S.master.connect(c.destination);
      S.amb = c.createGain(); S.amb.gain.value = 0; S.amb.connect(S.master);
      const len = c.sampleRate * 3, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0); let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = last * 3.5; }
      const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
      const wg = c.createGain(); wg.gain.value = .5; const lfo = c.createOscillator(); lfo.frequency.value = .09; const lg = c.createGain(); lg.gain.value = .3; lfo.connect(lg); lg.connect(wg.gain); lfo.start();
      src.connect(lp); lp.connect(wg); wg.connect(S.amb); src.start();
      [73.42, 110, 146.83].forEach((f, i) => { const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.value = .022 / (i + 1); o.connect(g); g.connect(S.amb); o.start(); });
      (function loop() { setTimeout(() => { if (S.ambOn) tone(Math.floor(Math.random() * 6), .5, S.amb); loop(); }, 7000 + Math.random() * 9000); })();
      c.resume(); return true;
    } catch (e) { return false; }
  };
  S.ambient = function (on) {
    S.ambOn = on; if (!on && !S.ctx) return; if (!S.ensure()) { S.ambOn = false; return; }
    S.amb.gain.setTargetAtTime(on ? 1 : 0, S.ctx.currentTime, .5);
  };
  S.setVolume = function (v) { S.vol = v; if (S.master) S.master.gain.setTargetAtTime(v, S.ctx.currentTime, .05); };
  S.setFx = function (on) { S.fx = on; if (on) S.ensure(); };
  function tone(i, vol, dest) {
    const c = S.ctx, t = c.currentTime, f = NOTES[((i % 6) + 6) % 6];
    [[1, 1], [2, .25], [3, .08]].forEach(h => { const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f * h[0]; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime((vol || .6) * .18 * h[1], t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + 3.6 / h[0]); o.connect(g); g.connect(dest || S.master); o.start(t); o.stop(t + 4); });
  }
  S.chime = function (i, vol) { if (!S.fx || !S.ctx) return; tone(i, vol); };
  S.whale = function () {
    if (!S.fx || !S.ctx) return; const c = S.ctx, t = c.currentTime, o = c.createOscillator(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(250, t + 1.4); o.frequency.exponentialRampToValueAtTime(110, t + 3.4);
    v.frequency.value = 5; vg.gain.value = 6; v.connect(vg); vg.connect(o.frequency);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25, t + .8); g.gain.linearRampToValueAtTime(0, t + 3.6);
    o.connect(g); g.connect(S.master); o.start(t); v.start(t); o.stop(t + 3.8); v.stop(t + 3.8);
  };
  S.bell = function () {
    if (!S.fx || !S.ctx) return; const c = S.ctx, t = c.currentTime;
    [196, 311, 523, 790].forEach((f, i) => { const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.2 / (i + 1), t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + 2.4); o.connect(g); g.connect(S.master); o.start(t); o.stop(t + 2.6); });
  };

  /* ---------- starfall background ---------- */
  (function () {
    const c = $('#starfall'), ctx = c.getContext('2d');
    const cols = ['233,246,255', '111,180,255', '232,168,96'];
    let w, h, motes = [];
    SG.dim = 0; SG.motes = motes;
    function make(initial) { return { x: Math.random() * w, y: initial ? Math.random() * h : -10, r: Math.random() * 1.5 + .5, v: Math.random() * .3 + .08, t: Math.random() * 6.28, c: cols[Math.random() < .6 ? 0 : Math.random() < .65 ? 1 : 2], a: Math.random() * .45 + .25 }; }
    function resize() {
      const d = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.round(Math.min(90, w * h / 15000)); motes.length = 0; for (let i = 0; i < n; i++) motes.push(make(true));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h); const k = 1 - SG.dim * .85;
      motes.forEach(m => {
        ctx.fillStyle = `rgba(${m.c},${m.a * .16 * k})`; ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 3.4, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(${m.c},${m.a * k})`; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill();
      });
    }
    function tick() { motes.forEach((m, i) => { m.y += m.v; m.t += .01; m.x += Math.sin(m.t) * .14; if (m.y > h + 8) motes[i] = make(false); }); draw(); requestAnimationFrame(tick); }
    resize(); addEventListener('resize', () => { resize(); if (SG.reduce) draw(); });
    if (SG.reduce) draw(); else tick();
    SG.catchMote = function (x, y) {
      let best = -1, bd = 46; motes.forEach((m, i) => { const d = Math.hypot(m.x - x, m.y - y); if (d < bd) { bd = d; best = i; } });
      if (best < 0) return false; const m = motes[best];
      const pop = document.createElement('i'); pop.className = 'pop'; pop.style.left = m.x + 'px'; pop.style.top = m.y + 'px'; document.body.appendChild(pop); setTimeout(() => pop.remove(), 900);
      motes[best] = make(false); return true;
    };
  })();

  /* ---------- hamburger menu ---------- */
  (function () {
    const b = $('#menuBtn'), nav = $('#navlinks');
    const set = o => { nav.classList.toggle('open', o); b.setAttribute('aria-expanded', o); };
    b.addEventListener('click', e => { e.stopPropagation(); set(!nav.classList.contains('open')); });
    nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('click', e => { if (!e.target.closest('.nav')) set(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    addEventListener('hashchange', () => set(false));
  })();

  /* ---------- router ---------- */
  const VIEWS = ['home', 'myth', 'sky', 'beasts', 'voyage', 'rite', 'bots', 'codex'];
  SG.views = {}; let cur = null; const inited = {};
  SG.go = name => { if (location.hash.slice(1) === name) route(); else location.hash = name; };
  function show(name, keepScroll) {
    if (!VIEWS.includes(name)) name = 'home';
    if (cur && SG.views[cur] && SG.views[cur].leave && cur !== name) SG.views[cur].leave();
    cur = name;
    $$('.view').forEach(v => v.hidden = v.id !== 'v-' + name);
    $$('#navlinks a').forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + name));
    document.body.dataset.view = name;
    if (!inited[name]) { inited[name] = true; if (SG.views[name] && SG.views[name].init) SG.views[name].init(); }
    if (SG.views[name] && SG.views[name].enter) SG.views[name].enter();
    if (!keepScroll) scrollTo(0, 0);
    if (name !== 'rite') SG.dim = 0, document.body.style.setProperty('--dim', 0);
  }
  function route() {
    const h = decodeURIComponent(location.hash.slice(1) || 'home');
    if (h.startsWith('bot-')) { show('bots', true); if (SG.views.bots && SG.views.bots.openBot) SG.views.bots.openBot(h.slice(4)); return; }
    if (!$('#modal').hidden) SG.closeModal(true);
    show(h);
  }
  addEventListener('hashchange', route);
  SG.start = route;
  SG.current = () => cur;

  /* click to catch falling stars on the home scene */
  document.addEventListener('pointerdown', e => {
    if (cur !== 'home' || e.target.closest('a,button,input,select,summary,[role=button],.portal,header')) return;
    if (SG.catchMote(e.clientX, e.clientY)) { SG.toast('You caught a falling star. "' + SG.pick(LORE.whyStarsFall) + '"'); SG.sound.chime(Math.floor(Math.random() * 6)); }
  });
})(window.SG);
