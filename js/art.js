/* Drawn art: animal silhouettes, constellation fallbacks, island shapes. */
window.SG = window.SG || {};
(function (SG) {
  SG.NS = 'http://www.w3.org/2000/svg';
  SG.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  SG.rng = function (seed) {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
    return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  };
  SG.slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'bot';

  const FISH = '<path d="M12 32C26 12 58 10 84 28L112 12C106 24 106 40 112 52L84 36C58 54 26 52 12 32Z"/>';
  const WHALE = '<path d="M8 38C14 24 34 17 58 19C80 21 98 29 112 34C102 42 84 48 62 49C40 50 20 47 8 38Z"/><path d="M10 37C3 31 0 24 3 16C8 22 12 27 17 31Z"/><path d="M10 38C3 44 0 51 3 58C8 52 12 47 17 43Z"/><path d="M54 46C52 54 46 59 38 60C42 55 44 51 46 47Z"/>';
  SG.SIL = {
    whale: WHALE,
    orca: WHALE + '<path d="M62 20C66 11 70 8 76 5C76 12 78 16 80 22Z"/>',
    narwhal: WHALE + '<path d="M110 33L119 23L112 38Z"/>',
    dugong: '<path d="M10 36C16 24 34 20 56 22C76 24 90 30 100 38C92 46 76 50 58 50C38 50 20 48 10 36Z"/><path d="M12 36C4 32 0 26 2 18C8 22 12 26 18 30Z"/><path d="M12 38C4 42 0 48 2 56C8 52 12 48 18 44Z"/><path d="M50 48C48 55 42 58 36 58C40 54 42 52 44 48Z"/><circle cx="102" cy="40" r="6"/>',
    manta: '<path d="M60 14C68 22 88 20 116 12C108 30 92 42 72 46L60 56L48 46C28 42 12 30 4 12C32 20 52 22 60 14Z"/><path d="M57 54L60 64L63 54Z"/>',
    turtle: '<ellipse cx="54" cy="32" rx="26" ry="20"/><circle cx="88" cy="32" r="8"/><path d="M44 14C36 4 26 4 22 8C28 14 36 20 44 22Z"/><path d="M44 50C36 60 26 60 22 56C28 50 36 44 44 42Z"/><path d="M66 16C74 8 84 8 90 12C84 18 76 22 68 24Z"/><path d="M66 48C74 56 84 56 90 52C84 46 76 42 68 40Z"/><path d="M28 32L12 36L28 38Z"/>',
    jelly: '<path d="M26 34C26 8 94 8 94 34C84 38 76 32 60 38C44 32 36 38 26 34Z"/><path class="st" d="M36 36C32 46 40 50 36 60M48 38C46 48 52 52 48 62M60 38C60 48 66 52 62 62M72 38C74 48 68 52 72 62M84 36C88 46 80 50 84 58"/>',
    fish: FISH,
    seal: '<path d="M8 44C14 32 32 26 50 28C56 18 66 12 76 16C86 20 86 30 80 34C90 38 104 40 114 36C104 50 84 54 66 52C44 58 20 54 8 44Z"/><path class="st" d="M70 12L66 2M78 14L80 4M84 20L92 12"/>',
    serpent: '<path class="st" style="stroke-width:7" d="M6 50C28 6 48 62 70 30C80 16 96 22 112 12"/><circle cx="113" cy="11" r="5"/>',
    nautilus: '<path d="M30 12C62 4 90 24 86 48C82 64 50 70 34 56C24 46 30 28 46 30C58 32 62 44 54 48C48 50 44 46 48 42Z"/><path class="st" d="M30 40C20 40 12 36 4 34M32 46C22 50 14 54 6 54M34 52C26 58 20 62 14 62"/>',
    twain: '<g transform="translate(0 -4) scale(.62)">' + FISH + '</g><g transform="translate(46 28) scale(.55)">' + FISH + '</g><path class="st" d="M70 22C76 30 70 34 80 44" style="stroke-width:2"/>',
    counter: '<path class="st" style="stroke-width:7" d="M6 50C28 6 48 62 70 30C80 16 96 22 112 12"/><circle cx="113" cy="11" r="5"/>'
  };
  SG.ROT = { manta: 90 };
  SG.animal = (kind, cls) => `<svg class="ani ${cls || ''}" viewBox="0 0 120 64" aria-hidden="true">${SG.SIL[kind] || SG.SIL.whale}</svg>`;

  /* Portrait fallback for a star-beast: a silhouette carrying its constellation. */
  SG.beastFallback = function (b, house) {
    const r = SG.rng(b.name), sky = (LORE.sky[house] || LORE.sky.aries);
    let stars = '', lines = '';
    const pts = sky.p.map(p => [14 + p[0] * .72, 22 + p[1] * .5]);
    sky.e.forEach(e => { lines += `<path d="M${pts[e[0]][0].toFixed(1)} ${pts[e[0]][1].toFixed(1)}L${pts[e[1]][0].toFixed(1)} ${pts[e[1]][1].toFixed(1)}" stroke="#f3dca0" stroke-width=".35" opacity=".7"/>`; });
    pts.forEach(p => { const s = .8 + r() * 1.1; stars += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(s * 3).toFixed(1)}" fill="#f3dca0" opacity=".12"/><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${s.toFixed(1)}" fill="#fff6d8"/>`; });
    let bg = ''; for (let i = 0; i < 24; i++) bg += `<circle cx="${(r() * 100).toFixed(0)}" cy="${(r() * 60).toFixed(0)}" r="${(r() * .5 + .2).toFixed(2)}" fill="#cfe4ff" opacity="${(r() * .5 + .2).toFixed(2)}"/>`;
    const legend = b.legend;
    let spots = '';
    if (legend) for (let k = 0; k < 13; k++) { const a = (-90 + k * 360 / 13) * Math.PI / 180, x = 50 + 24 * Math.cos(a), y = 74 + 24 * Math.sin(a); spots += k === 0 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="none" stroke="#b9a7e8" stroke-width=".6" stroke-dasharray="1.2 1.2"/>` : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" fill="#f3dca0"/>`; }
    return `<svg class="bfb" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${SG.esc(b.name)}"><defs><linearGradient id="fg-${SG.slug(b.name)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16306a"/><stop offset=".55" stop-color="#0c1a40"/><stop offset="1" stop-color="#050a1d"/></linearGradient></defs>
      <rect width="100" height="125" fill="url(#fg-${SG.slug(b.name)})"/>${bg}
      <path d="M0 98Q12 92 25 98T50 98T75 98T100 98V125H0Z" fill="#7fc8e8" opacity=".1"/>
      ${legend ? spots : `<g class="sil" transform="translate(4 64) scale(.78)" fill="rgba(127,200,232,.2)" stroke="#d4af6a" stroke-width=".8" color="#d4af6a">${SG.SIL[b.kind] || SG.SIL.whale}</g>`}
      ${legend ? '' : lines}${legend ? '' : stars}</svg>`;
  };

  /* Image with graceful fallback to drawn art. */
  const FB = [];
  SG.fbIndex = html => { FB.push(html); return FB.length - 1; };
  SG.img = (src, fallback, alt, cls) => {
    if (!src) return fallback;
    FB.push(fallback);
    return `<img class="${cls || ''}" src="${SG.esc(src)}" alt="${SG.esc(alt || '')}" loading="lazy" data-fb="${FB.length - 1}">`;
  };
  document.addEventListener('error', e => {
    const t = e.target;
    if (!t || !t.dataset || t.dataset.fb == null || !FB[t.dataset.fb]) return;
    const html = FB[t.dataset.fb]; delete t.dataset.fb;
    if (t.namespaceURI === SG.NS) { const g = document.createElementNS(SG.NS, 'g'); g.innerHTML = html; t.replaceWith(...g.childNodes); }
    else t.outerHTML = html;
  }, true);

  /* Soft island blob around (0,0). */
  SG.blob = function (seed, r, n) {
    const rr = SG.rng(seed); n = n || 9; const pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, d = r * (.72 + rr() * .5); pts.push([Math.cos(a) * d, Math.sin(a) * d]); }
    let d = ''; const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const start = m(pts[n - 1], pts[0]); d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
    for (let i = 0; i < n; i++) { const mid = m(pts[i], pts[(i + 1) % n]); d += `Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mid[0].toFixed(1)} ${mid[1].toFixed(1)}`; }
    return d + 'Z';
  };

  /* Admiralty emblem: anchor, ribbon (the serpent hint), star and compass, whale tails. */
  SG.emblem = function (size) {
    return `<svg class="emblem" viewBox="0 0 120 140" width="${size || 120}" role="img" aria-label="Admiralty emblem: a golden anchor wound with a ribbon">
      <circle cx="60" cy="72" r="54" fill="none" stroke="#d4af6a" stroke-width="1.6"/><circle cx="60" cy="72" r="49" fill="none" stroke="#d4af6a" stroke-width=".6" stroke-dasharray="1 4"/>
      <g fill="#f3dca0"><circle cx="60" cy="18" r="2"/><circle cx="28" cy="34" r="2"/><circle cx="92" cy="34" r="2"/><circle cx="12" cy="72" r="2"/><circle cx="108" cy="72" r="2"/><circle cx="28" cy="110" r="2"/><circle cx="92" cy="110" r="2"/><circle cx="60" cy="126" r="2"/></g>
      <path d="M0 112Q15 106 30 112T60 112T90 112T120 112" transform="translate(0 4)" fill="none" stroke="#7fc8e8" stroke-width="1" opacity=".7"/>
      <path d="M28 96C20 80 22 66 32 58C30 70 32 82 40 92Z" fill="#d4af6a" opacity=".85"/><path d="M92 96C100 80 98 66 88 58C90 70 88 82 80 92Z" fill="#d4af6a" opacity=".85"/>
      <g stroke="#f3dca0" fill="none" stroke-width="3.4" stroke-linecap="round"><path d="M60 40V104"/><path d="M46 52H74"/><path d="M36 86C38 102 50 108 60 108C70 108 82 102 84 86"/><path d="M30 90L36 84L42 92M90 90L84 84L78 92"/><circle cx="60" cy="36" r="4"/></g>
      <path class="ribbon" d="M60 50C74 54 74 62 60 66C46 70 46 78 60 82C72 86 72 94 60 98" fill="none" stroke="#b9a7e8" stroke-width="3" stroke-linecap="round"/>
      <g class="serp" opacity="0"><ellipse cx="60" cy="100" rx="5.5" ry="3.6" fill="#b9a7e8"/><circle cx="58" cy="99" r=".9" fill="#1a1405"/></g>
      <g transform="translate(60 22)"><path d="M0 -14L3 -3L14 0L3 3L0 14L-3 3L-14 0L-3 -3Z" fill="#fff0c0"/><circle r="9" fill="none" stroke="#d4af6a" stroke-width="1"/></g></svg>`;
  };
})(window.SG);
