/* Views: home (the gate) and myth (the Erasure). */
(function (SG) {
  const { $, $$, esc } = SG, L = LORE;

  /* ================= HOME ================= */
  SG.views.home = {
    init() {
      const beast = id => SG.houseById(id).beast;
      const bArt = (id) => { const h = SG.houseById(id); return SG.img(h.beast.img, SG.beastFallback(h.beast, id), h.beast.name); };
      const lamps = '<svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"><rect width="100" height="125" fill="#070d24"/>' + Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<circle cx="${14 + c * 12}" cy="${30 + r * 16}" r="2.6" fill="#f3dca0" opacity="${r < 2 ? .9 : r < 4 ? .25 : .06}"/>`).join('')).join('') + '<path d="M0 112Q12 106 25 112T50 112T75 112T100 112V125H0Z" fill="#7fc8e8" opacity=".12"/></svg>';
      const mapArt = '<img src="img/map.webp" alt="" style="object-position:55% 48%">';
      const mythArt = SG.beastFallback(Object.assign({}, beast('gap')), 'gap');
      const skyArt = (() => { let o = '<svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040818"/><stop offset="1" stop-color="#17346e"/></linearGradient></defs><rect width="100" height="125" fill="url(#sk)"/>'; [['scorpio', 4, 38, .5], ['leo', 50, 34, .5], ['pisces', 24, 66, .34]].forEach(([id, x, y, k]) => { const c = L.sky[id]; o += `<g transform="translate(${x} ${y}) scale(${k})"><g stroke="#d4af6a" stroke-width="1">${c.e.map(e => `<line x1="${c.p[e[0]][0]}" y1="${c.p[e[0]][1]}" x2="${c.p[e[1]][0]}" y2="${c.p[e[1]][1]}"/>`).join('')}</g><g fill="#fff4d6">${c.p.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.6"/>`).join('')}</g></g>`; }); o += '<path d="M0 108Q12 102 25 108T50 108T75 108T100 108V125H0Z" fill="#7fc8e8" opacity=".14"/></svg>'; return o; })();
      const seaArt = '<svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e63a3"/><stop offset=".5" stop-color="#0a1a42"/><stop offset="1" stop-color="#02040c"/></linearGradient></defs><rect width="100" height="125" fill="url(#sa)"/><g fill="#cfe4ff" color="#cfe4ff"><g transform="translate(8 20) scale(.62)">' + SG.SIL.whale + '</g><g transform="translate(40 62) scale(.4)">' + SG.SIL.manta + '</g><g transform="translate(14 84) scale(.45)">' + SG.SIL.turtle + '</g></g><g fill="#d9c8ff" color="#d9c8ff"><g transform="translate(58 100) scale(.3)">' + SG.SIL.jelly + '</g></g></svg>';
      const costArt = '<svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"><rect width="100" height="125" fill="#050a1d"/><path d="M0 100Q20 92 40 100T80 100T100 98V125H0Z" fill="#2b1a4a"/><ellipse cx="50" cy="108" rx="22" ry="8" fill="#b9a7e8" opacity=".35"/>' + Array.from({ length: 14 }, (_, i) => { const r = SG.rng('c' + i); return `<circle cx="${(10 + r() * 80).toFixed(0)}" cy="${(8 + r() * 84).toFixed(0)}" r="${(1 + r() * 1.4).toFixed(1)}" fill="${['#e9f6ff', '#6fb4ff', '#e8a860'][i % 3]}"/>`; }).join('') + '</svg>';
      const P = [
        { to: 'myth', t: 'The Myth', s: 'A star was erased from the sky. It did not die.', art: mythArt },
        { to: 'sky', t: 'The Sky', s: 'Twelve houses, thirteen months, one gap.', art: skyArt },
        { to: 'beasts', t: 'The Beasts', s: 'Whale lines, working animals and the creatures of the deep.', art: seaArt },
        { to: 'voyage', t: 'The Voyage', s: 'Whales carry you. Days, never months.', art: mapArt },
        { to: 'rite', t: 'The Rite', s: 'Once a year, every lamp goes dark.', art: lamps },
        { to: 'bots', t: 'The Bots', s: 'Meet the people of Saltglass.', art: '<img src="img/bots-cover.webp" alt="The Admiral, Volaro and Shaedira before Saltglass City">', cls: 'wide-art' }
      ];
      const sw = [
        { k: 'whale', y: 8, d: 70, dl: -10, s: 1.5, n: 'A Songline whale' },
        { k: 'manta', y: 24, d: 38, dl: -22, s: .8, n: 'A manta scout', rot: 1 },
        { k: 'whale', y: 38, d: 90, dl: -52, s: 2.1, n: 'A Deepwalker', rev: 1 },
        { k: 'narwhal', y: 54, d: 46, dl: -5, s: .8, n: 'A Pale Runner' },
        { k: 'jelly', y: 70, d: 110, dl: -40, s: .7, n: 'A lamp-drifter', rev: 1 },
        { k: 'turtle', y: 82, d: 80, dl: -30, s: 1.0, n: 'A sea-turtle' }
      ];
      $('#v-home').innerHTML = `<div class="home-top wrap">
          <img class="logo" src="img/logo.webp" alt="Saltglass" width="900" height="822">
          <p class="hook">A world of scattered islands and drowned cities, lit by the light of dead stars.</p>
          <p class="hook2">Saltglass City is a utopia built over the body of a star the heavens erased, and everyone in it has agreed not to ask why.</p>
          <div class="genre"><span>Romance</span><i>◆</i><span>Drama</span><i>◆</i><span>Angst</span></div>
        </div>
        <div class="sea-band" aria-hidden="false">${sw.map((w, i) => `<button class="swimmer ${w.rev ? 'rev' : ''}" style="--y:${w.y}%;--d:${w.d}s;--dl:${w.dl}s;--s:${w.s}" data-n="${esc(w.n)}" data-k="${w.k}" aria-label="${esc(w.n)}"><span class="flip" style="${w.rot ? 'transform:rotate(90deg)' : ''}">${SG.animal(w.k)}</span></button>`).join('')}</div>
        <div class="wrap"><div class="portals">${P.map(p => `<a class="portal" href="#${p.to}"><div class="pa ${p.cls || ''}">${p.art}</div><div class="pt"><b>${p.t}</b><span>${p.s}</span></div></a>`).join('')}</div>
        <p class="hint">Click the sky to catch a falling star. Click a whale to meet it.</p></div>`;
      $$('#v-home .swimmer').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); SG.sound.whale(); SG.toast(b.dataset.n + ' passes beneath the lamps.'); }));
    }
  };

  /* ================= MYTH ================= */
  const BEATS = [
    { t: 'Long ago the sky held thirteen houses.', s: 'The Thirteenth, Ophiuchus the Serpent Bearer, governed mending: healing, and the thin line between the living and the dead.' },
    { t: 'The Twelve erased it.', s: 'Its power disturbed the natural order. About a thousand years ago the Serpent Bearer was wiped from the sky, and its name was forbidden.' },
    { t: 'Its star fell into the deepest trench of the sea.', s: 'Not as a dying star falls. As a thing cast out.' },
    { t: 'It did not die. It took root.', s: 'Over the Hollow Trench the star lives on, and it calls every dying star down to it. That pull is the Call.' },
    { t: 'Settlers found a glowing, half-drowned man.', s: 'He was sitting in what would become Velvet Haven, on the Isle of Meridian.' },
    { t: 'They built the city around him.', s: 'Saltglass rose over the star. The man has ruled it ever since, and no one in it asks why.' },
    { t: 'And the Call never stops.', s: 'Dying stars drift toward the trench. Saltglass catches them in nets, burns them for light, and keeps the silence.' }
  ];
  SG.views.myth = {
    beat: 0,
    init() {
      const N = 13, pos = i => [90 + i * (620 / 12), 150 - Math.sin(Math.PI * i / 12) * 80];
      const stars = L.houses.map((h, i) => {
        const [x, y] = pos(i), gap = h.id === 'gap';
        return `<g class="ms ${gap ? 'g13' : ''}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="halo" r="${gap ? 22 : 14}"/><path class="core" d="M0 -9L2.2 -2.2L9 0L2.2 2.2L0 9L-2.2 2.2L-9 0L-2.2 -2.2Z"/><text y="26" class="lb">${gap ? '' : esc(h.name)}</text>${gap ? '<text y="30" class="lb lb13 on0">Ophiuchus</text><text y="30" class="lb lb13 on1">The Gap</text><circle class="ring13" r="30" fill="none"/>' : ''}</g>`;
      }).join('');
      const [gx, gy] = pos(8);
      const bld = [[-190, 40, 38], [-150, 52, 30], [-112, 34, 44], [-70, 60, 36], [-34, 76, 30], [4, 92, 44], [48, 70, 34], [86, 56, 40], [126, 44, 34], [164, 36, 44]].map((b, i) => `<g class="bd" style="--i:${i}"><rect x="${b[0]}" y="${-b[1]}" width="${b[2]}" height="${b[1]}"/><circle cx="${b[0] + b[2] / 2}" cy="${-b[1] - 1}" r="${b[2] / 2.6}" class="dome"/><circle cx="${b[0] + b[2] / 2}" cy="${-b[1] / 2}" r="1.6" class="win"/></g>`).join('');
      const motes = Array.from({ length: 16 }, (_, i) => { const r = SG.rng('m' + i); return `<circle class="mote" r="${(1.4 + r() * 1.4).toFixed(1)}" style="--x:${(60 + r() * 680).toFixed(0)}px;--dl:${(-r() * 9).toFixed(1)}s;--c:${['#e9f6ff', '#6fb4ff', '#e8a860'][i % 3]}"/>`; }).join('');
      $('#v-myth').innerHTML = `<div class="wrap narrow"><h2>The Myth</h2><img class="rule" src="img/divider.webp" alt="">
        <div class="stage" id="stage" data-beat="0" style="--fx:${(400 - gx).toFixed(0)}px;--fy:${(496 - gy).toFixed(0)}px">
          <svg viewBox="0 0 800 540" role="img" aria-label="The erasure of the Thirteenth Star, in seven steps">
            <defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a1f"/><stop offset="1" stop-color="#16306a"/></linearGradient><linearGradient id="seaG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17346e"/><stop offset=".6" stop-color="#0a1736"/><stop offset="1" stop-color="#03060f"/></linearGradient><radialGradient id="trG"><stop offset="0" stop-color="#d9c8ff"/><stop offset=".4" stop-color="#8a6fd6" stop-opacity=".6"/><stop offset="1" stop-color="#8a6fd6" stop-opacity="0"/></radialGradient></defs>
            <rect width="800" height="270" fill="url(#skyG)"/><rect y="270" width="800" height="270" fill="url(#seaG2)"/>
            <g class="bgstars">${Array.from({ length: 60 }, (_, i) => { const r = SG.rng('bs' + i); return `<circle cx="${(r() * 800).toFixed(0)}" cy="${(r() * 250).toFixed(0)}" r="${(r() * 1 + .3).toFixed(1)}" opacity="${(r() * .6 + .2).toFixed(2)}"/>`; }).join('')}</g>
            <path d="M0 270H800" stroke="#7fc8e8" stroke-width="1" opacity=".5"/>
            <g id="bearer" transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)})" fill="none" stroke="#b9a7e8" stroke-dasharray="2 5" opacity="0"><path d="M0 -50L-24 -22L-40 8M0 -50L24 -22L40 8M0 -50V30M-16 70L0 30L16 70"/><path d="M-30 14C-10 -6 10 34 30 10" stroke-dasharray="1 4"/></g>
            ${stars}
            <g transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)})"><g id="mfall"><circle r="16" fill="url(#trG)"/><path d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="#fff"/></g></g>
            <g id="mtrench" transform="translate(400 500)"><ellipse rx="150" ry="26" fill="url(#trG)" class="tg"/><path d="M-70 -18C-40 6 40 6 70 -18L40 30C10 40 -10 40 -40 30Z" fill="#02040a"/></g>
            <g id="mroots" fill="none" stroke="#8a6fd6" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M400 484C396 430 404 380 400 300"/><path d="M392 486C360 440 370 360 388 300"/><path d="M408 486C436 440 430 360 412 300"/><path d="M380 490C330 470 320 400 350 330"/><path d="M420 490C470 470 480 400 450 330"/></g>
            <g id="misle" transform="translate(400 272)"><ellipse rx="230" ry="16" fill="#cbb98a" opacity=".85"/><ellipse rx="190" ry="9" fill="#e7dcc0" opacity=".6" cy="-4"/>
              <g id="mman"><circle cy="-22" r="14" fill="url(#trG)" class="manhalo"/><circle cy="-26" r="3.4" fill="#fff4d6"/><path d="M-3 -22H3V-10H-3Z" fill="#fff4d6"/></g>
              <g id="mcity">${bld}</g></g>
            <g id="mflow">${motes}</g>
            <g class="mlab" font-family="Cinzel,serif" font-size="12" fill="#9db0d0" letter-spacing="2"><text x="400" y="528" text-anchor="middle" id="trlab" opacity="0">THE HOLLOW TRENCH</text></g>
          </svg></div>
        <div class="mcap" aria-live="polite"><div class="mt" id="mt"></div><div class="ms2" id="ms2"></div></div>
        <div class="mctl"><button class="btn" id="mPrev">Back</button><div class="dots" id="mDots"></div><button class="btn on" id="mNext">Next</button></div>
        <div class="panel blurb"><h3>The name nobody says</h3><p style="margin:0">The Thirteenth has no public name. It is forbidden, and most people believe it is dead. In Saltglass they say <i>the Gap</i>, <i>the Quiet House</i> or <i>the Bearer</i>, and \"Quiet take you\" is a real curse. The oldest ruins of the Drowned Reaches and the Verdant Drift are carved with <i>Serpentarius</i>, and the Tide-Priests have long recorded it under that name. Its true name, <i>Ophiuchus</i>, the Serpent Bearer, is known only to the Tide-Priests and the Admiral.</p></div></div>`;      $('#mDots').innerHTML = BEATS.map((_, i) => `<button class="dot" data-i="${i}" aria-label="Step ${i + 1}"></button>`).join('');
      $$('#mDots .dot').forEach(d => d.addEventListener('click', () => this.set(+d.dataset.i)));
      $('#mPrev').addEventListener('click', () => this.set(this.beat - 1));
      $('#mNext').addEventListener('click', () => { if (this.beat >= BEATS.length - 1) SG.go('sky'); else this.set(this.beat + 1); });
      this.kb = e => { if (SG.current() !== 'myth' || !$('#modal').hidden) return; if (e.key === 'ArrowRight') this.set(this.beat + 1); if (e.key === 'ArrowLeft') this.set(this.beat - 1); };
      addEventListener('keydown', this.kb);
      this.set(0);
    },
    set(i) {
      i = Math.max(0, Math.min(BEATS.length - 1, i)); this.beat = i;
      $('#stage').dataset.beat = i; $('#mt').textContent = BEATS[i].t; $('#ms2').textContent = BEATS[i].s;
      $$('#mDots .dot').forEach((d, k) => d.classList.toggle('on', k === i));
      $('#mPrev').disabled = i === 0; $('#mNext').textContent = i === BEATS.length - 1 ? 'See the sky' : 'Next';
      if (i === 2) SG.sound.whale(); else SG.sound.chime(i);
      if (i === 6) SG.sound.bell();
    },
    enter() { if (this.beat !== undefined && $('#stage')) this.set(this.beat); }
  };
})(window.SG);
