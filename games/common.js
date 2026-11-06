/* Shared helpers for the Saltglass games: starfall backdrop, chimes, tiny utils. */
window.G = (function () {
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rnd = (a, b) => a + Math.random() * (b - a), pick = a => a[Math.floor(Math.random() * a.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  /* starfall */
  (function () {
    const c = document.getElementById('stars'); if (!c) return; const x = c.getContext('2d'); let w, h, m = [];
    const mk = i => ({ x: Math.random() * w, y: i ? Math.random() * h : -8, r: rnd(.5, 1.8), v: rnd(.08, .35), t: Math.random() * 6, a: rnd(.25, .65) });
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; m = Array.from({ length: Math.round(Math.min(80, w * h / 16000)) }, () => mk(1)); };
    size(); addEventListener('resize', size);
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { x.fillStyle = 'rgba(233,246,255,.5)'; m.forEach(s => x.fillRect(s.x, s.y, s.r, s.r)); return; }
    (function f() { x.clearRect(0, 0, w, h); m.forEach((s, i) => { s.y += s.v; s.t += .01; s.x += Math.sin(s.t) * .12; if (s.y > h + 8) m[i] = mk(0); x.fillStyle = `rgba(233,246,255,${s.a * .18})`; x.beginPath(); x.arc(s.x, s.y, s.r * 3.2, 0, 6.3); x.fill(); x.fillStyle = `rgba(233,246,255,${s.a})`; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.3); x.fill(); }); requestAnimationFrame(f); })();
  })();
  /* soft sound (off until the player has clicked something; can be muted) */
  let ctx = null, on = true; const NOTES = [293.66, 329.63, 369.99, 440, 493.88, 554.37];
  function tone(i, v) {
    if (!on) return; try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); const t = ctx.currentTime, f = NOTES[((i % 6) + 6) % 6];
      [[1, 1], [2, .25]].forEach(h => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = f * h[0]; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime((v || .5) * .16 * h[1], t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + 2.6 / h[0]); o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 3); });
    } catch (e) { }
  }
  function bell() { [0, 2, 5].forEach((n, k) => setTimeout(() => tone(n - 3, .4), k * 90)); }
  function mute(btn) { if (!btn) return; btn.addEventListener('click', () => { on = !on; btn.textContent = on ? 'Sound: on' : 'Sound: off'; }); }
  const save = (k, v) => { try { localStorage.setItem('sg_game_' + k, JSON.stringify(v)); } catch (e) { } };
  const load = (k, d) => { try { const v = localStorage.getItem('sg_game_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  return { $, $$, esc, rnd, pick, clamp, tone, bell, mute, save, load };
})();
