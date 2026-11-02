/* Views: sky (panorama of the thirteen months) and beasts (living sea + star-beast gallery). */
(function (SG) {
  const { $, $$, esc } = SG, L = LORE;
  const botsBy = (k, v) => (SG.bots && SG.bots.filterBy(k, v)) || [];

  /* ---------- shared: star-beast portrait + modal ---------- */
  const portrait = (h, cls) => `<div class="portrait ${cls || ''}">${SG.img(h.beast.img, SG.beastFallback(h.beast, h.id), h.beast.name)}</div>`;
  SG.beastModal = function (id, back) {
    const h = SG.houseById(id), b = h.beast, gap = id === 'gap', born = botsBy('house', id), i = L.houses.indexOf(h);
    const body = SG.openModal(`<div class="bmodal">${portrait(h, 'big')}
      <div class="bm-txt"><div class="rp-meta">${gap ? 'Legend · whereabouts unknown' : 'Star-beast of ' + esc(h.name)} · Month ${i + 1}</div>
      <h3 class="bm-h">${esc(b.name)}</h3><div class="bm-form">${esc(b.form)}</div>
      <p>${esc(b.text)}</p>
      <div class="festival"><div class="mo">${esc(h.name === 'The Thirteenth' ? 'The rite' : 'Festival')}</div><b>${esc(h.festival)}</b><p style="margin:4px 0 0;font-size:1.02rem">${esc(h.custom)}</p></div>
      <p class="small">${gap ? 'A star-touched who resonates with Ophiuchus would resonate with Old Counter. It is the Admiral\'s sea-beast, and they rarely meet, only around the Descent.' : 'Star-touched born under ' + esc(h.name) + ' resonate with ' + esc(b.name) + ', and the signal is louder near it. The longer they stay close, the more the bond tightens, and they may struggle to function outside its presence.'}</p>
      ${gap ? '<div id="spotGame"></div>' : ''}
      <div class="born"><span class="small-label">${gap ? 'Quiet-born bots' : 'Born under ' + esc(h.name)}</span>${born.length ? born.map(x => `<button class="chip" data-bot="${esc(x.id)}">${esc(x.name)}</button>`).join('') : '<span class="small">No bots yet.</span>'}</div>
      </div></div>`);
    $$('[data-bot]', body).forEach(c => c.addEventListener('click', () => { SG.closeModal(true); location.hash = 'bot-' + c.dataset.bot; }));
    if (gap) spotGame($('#spotGame', body));
    SG.sound.chime(i);
  };
  function spotGame(box) {
    let n = 0;
    box.innerHTML = '<span class="small-label">Count its spots</span><div class="spots" id="spots"></div><p class="small" id="spotMsg" style="min-height:3em">Sailors who claim to have seen it always disagree about the count. Click the spots in order.</p>';
    const ring = $('#spots', box);
    for (let k = 0; k < 13; k++) { const s = document.createElement('button'); s.className = 'spot' + (k === 12 ? ' void' : ''); s.setAttribute('aria-label', k === 12 ? 'The empty place' : 'Spot ' + (k + 1)); s.style.setProperty('--a', (k * 360 / 13) + 'deg'); ring.appendChild(s); s.addEventListener('click', () => {
      if (k !== n) { $('#spotMsg').textContent = 'You lose count. Everyone does.'; return; }
      s.classList.add('lit'); n++; SG.sound.chime(k);
      $('#spotMsg').textContent = k < 11 ? `${n}…` : k === 11 ? 'Twelve spots. Never thirteen. Where the thirteenth would sit, there is only water.' : 'You found an empty place. Somewhere, the Admiral hears the missing beat.';
    }); }
  }

  /* ================= SKY ================= */
  SG.views.sky = {
    sel: null,
    init() {
      const W = 200, N = 13, H = 640, HZ = 340;
      const constel = (id, ghost) => { const c = L.sky[id]; return c.e.map(e => `<line x1="${c.p[e[0]][0]}" y1="${c.p[e[0]][1]}" x2="${c.p[e[1]][0]}" y2="${c.p[e[1]][1]}"/>`).join('') + c.p.map((p, k) => `<circle cx="${p[0]}" cy="${p[1]}" r="${ghost ? 2.2 : 2.2 + (k % 3) * .5}"/>`).join(''); };
      const rr = SG.rng('skybg'); let bgs = '';
      for (let i = 0; i < 260; i++) bgs += `<circle cx="${(rr() * W * N).toFixed(0)}" cy="${(rr() * (HZ - 10)).toFixed(0)}" r="${(rr() * 1.1 + .3).toFixed(1)}" opacity="${(rr() * .6 + .15).toFixed(2)}"${i % 9 === 0 ? ' class="tw" style="--dl:' + (rr() * 5).toFixed(1) + 's"' : ''}/>`;
      let slots = '', defs = '';
      L.houses.forEach((h, i) => {
        const cx = W / 2 + i * W, gap = h.id === 'gap', ph = SG.rng(h.id);
        defs += `<clipPath id="cl-${h.id}"><circle r="58"/></clipPath>`;
        const fb = SG.beastFallback(h.beast, h.id).replace('<svg class="bfb"', '<svg x="-58" y="-72" width="116" height="145" class="bfb"');
        const medal = gap
          ? `<circle r="58" fill="#050a1d" stroke="#b9a7e8" stroke-width="2" stroke-dasharray="5 6"/>${Array.from({ length: 13 }, (_, k) => { const a = (-90 + k * 360 / 13) * Math.PI / 180; return k === 0 ? `<circle cx="${(36 * Math.cos(a)).toFixed(1)}" cy="${(36 * Math.sin(a)).toFixed(1)}" r="4.5" fill="none" stroke="#b9a7e8" stroke-dasharray="2 2"/>` : `<circle cx="${(36 * Math.cos(a)).toFixed(1)}" cy="${(36 * Math.sin(a)).toFixed(1)}" r="3.4" fill="#f3dca0"/>`; }).join('')}`
          : `<g clip-path="url(#cl-${h.id})"><rect x="-58" y="-58" width="116" height="116" fill="#0a1736"/>${h.beast.img ? `<image href="${SG.esc(h.beast.img)}" x="-58" y="-58" width="116" height="116" preserveAspectRatio="xMidYMid slice" data-fb="${(function () { return SG.fbIndex(fb); })()}"/>` : fb}</g><circle r="58" fill="none" stroke="#d4af6a" stroke-width="2.4"/>`;
        slots += `<g class="slot ${gap ? 'gapslot' : ''}" data-id="${h.id}" transform="translate(${cx} 0)" tabindex="0" role="button" aria-label="${esc(h.name)}, month ${i + 1}">
          <rect x="${-W / 2}" y="0" width="${W}" height="${H}" fill="transparent"/>
          ${gap ? `<ellipse cx="0" cy="170" rx="120" ry="150" fill="url(#gapDark)"/><g class="bearer" transform="translate(-60 40) scale(1.2)" fill="none" stroke="#b9a7e8" stroke-dasharray="2 5"><path d="M50 8L26 36L10 66M50 8L74 36L90 66M50 8V76M34 100L50 76L66 100"/><path d="M20 70C40 50 60 90 80 66" stroke-dasharray="1 4"/></g>` : ''}
          <g class="con" transform="translate(${-70} 56) scale(1.4)">${constel(h.id)}</g>
          <text class="nm" y="290" text-anchor="middle">${gap ? 'The Gap' : esc(h.name)}</text><text class="mn" y="312" text-anchor="middle">MONTH ${i + 1}</text>
          <g class="refl" transform="translate(${-70} ${2 * HZ - 56}) scale(1.4 -1.4)">${constel(h.id, true)}</g>
          <g class="bm" transform="translate(0 480)"><g class="bob" style="--dl:${(ph() * -6).toFixed(1)}s">${medal}</g></g>
          <text class="bn" y="590" text-anchor="middle">${esc(h.beast.name)}</text>
        </g>`;
      });
      const shoot = [0, 1, 2].map(i => `<line class="shoot" x1="0" y1="0" x2="-60" y2="-24" style="--dl:${i * 4.3}s;--x:${300 + i * 700}px;--y:${20 + i * 24}px"/>`).join('');
      $('#v-sky').innerHTML = `<div class="wrap"><h2>The Sky</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">Thirteen months, starting at Aries. Twelve houses burn overhead, and each has a star-beast swimming in the water below. The ninth month belongs to the house nobody names.</p></div>
        <div class="pano-wrap"><button class="pn l" aria-label="Pan left">‹</button><button class="pn r" aria-label="Pan right">›</button>
        <div class="pano" id="pano" tabindex="0"><svg id="panoSvg" viewBox="0 0 ${W * N} ${H}" width="${W * N}" height="${H}" role="group" aria-label="Sky and sea of Saltglass">
          <defs><linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040818"/><stop offset="1" stop-color="#17346e"/></linearGradient><linearGradient id="pSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17346e"/><stop offset=".5" stop-color="#091634"/><stop offset="1" stop-color="#03060f"/></linearGradient><radialGradient id="gapDark"><stop offset="0" stop-color="#000" stop-opacity=".85"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>${defs}</defs>
          <rect width="${W * N}" height="${HZ}" fill="url(#pSky)"/><rect y="${HZ}" width="${W * N}" height="${H - HZ}" fill="url(#pSea)"/>
          <g class="bgs" fill="#dbe9ff">${bgs}</g><g class="shoots" stroke="#f3dca0" stroke-width="2" stroke-linecap="round">${shoot}</g>
          <path d="M0 ${HZ}H${W * N}" stroke="#7fc8e8" stroke-width="1.2" opacity=".6"/>
          <g class="waves" fill="none" stroke="#7fc8e8" opacity=".14">${Array.from({ length: 8 }, (_, k) => `<path d="M0 ${HZ + 24 + k * 36}q60 -10 120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0" />`).join('')}</g>
          ${slots}</svg></div></div>
        <div class="wrap"><div class="panel dock" id="skyDock"></div></div>`;
      $$('#panoSvg .slot').forEach(s => { const go = () => this.select(s.dataset.id, false); s.addEventListener('click', go); s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
      const pano = $('#pano'); let down = null, moved = false;
      pano.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') return; down = { x: e.clientX, l: pano.scrollLeft }; moved = false; });
      addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - down.x; if (Math.abs(dx) > 5) moved = true; pano.scrollLeft = down.l - dx; });
      addEventListener('pointerup', () => { down = null; });
      pano.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
      $('.pn.l').addEventListener('click', () => pano.scrollBy({ left: -380, behavior: 'smooth' }));
      $('.pn.r').addEventListener('click', () => pano.scrollBy({ left: 380, behavior: 'smooth' }));
      this.select('aries', true, true);
    },
    select(id, pan, silent) {
      this.sel = id;
      $$('#panoSvg .slot').forEach(s => s.classList.toggle('sel', s.dataset.id === id));
      const i = L.houses.findIndex(h => h.id === id), h = L.houses[i], b = h.beast, gap = id === 'gap';
      if (pan) { const p = $('#pano'); p.scrollTo({ left: Math.max(0, i * 200 + 100 - p.clientWidth / 2), behavior: silent ? 'auto' : 'smooth' }); }
      const born = botsBy('house', id);
      $('#skyDock').innerHTML = `<div class="dock-in">${portrait(h)}<div class="dk"><div class="rp-meta">Month ${i + 1}</div><h3 class="bm-h">${gap ? 'The Thirteenth' : esc(h.name)}${h.alias ? ' <span class="alias">(' + esc(h.alias) + ')</span>' : ''}</h3>
        <p class="small" style="margin:0 0 8px">${gap ? 'Governed' : 'Guards'} ${esc(h.guards.charAt(0).toLowerCase() + h.guards.slice(1))}.</p>
        <div class="festival"><div class="mo">Festival, at the full moon</div><b>${esc(h.festival)}</b><p style="margin:4px 0 0;font-size:1.02rem">${esc(h.custom)}</p></div>
        <p style="margin:0 0 8px"><b class="gold">${esc(b.name)}</b> <span class="small">· ${esc(b.form)}</span></p>
        <div class="row"><button class="btn on" id="dkBeast">Meet ${esc(b.name)}</button>${born.length ? `<button class="btn" id="dkBots">${born.length} ${born.length === 1 ? 'bot' : 'bots'} born here</button>` : ''}</div>
        ${gap ? '<p class="small" style="margin:12px 0 0">Quiet-born people have no birth-house, and it is not a good sign to be born under. A star-touched Quiet-born is considered dangerous.</p>' : ''}</div></div>`;
      $('#dkBeast').addEventListener('click', () => SG.beastModal(id));
      const db = $('#dkBots'); if (db) db.addEventListener('click', () => SG.bots.show({ house: id }));
      if (!silent) { SG.sound.chime(i); if (gap) SG.toast('The stars are gone. The outline remains.'); }
    }
  };

  /* ================= BEASTS ================= */
  SG.views.beasts = {
    init() {
      $('#v-beasts').innerHTML = `<div class="wrap"><h2>The Beasts</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">Everything in Saltglass moves on the back of, or behind, something alive. Watch the water, and click what swims by. Whales are beasts of burden and are never eaten.</p></div>
        <div class="wrap"><div class="aqua" id="aqua"><div class="depths" aria-hidden="true"><span style="top:3%">Surface</span><span style="top:34%">Mid-water</span><span style="top:64%">Deep water</span><span style="top:90%">The Trench</span></div></div>
          <div class="panel aqua-info" id="aquaInfo" aria-live="polite"><p class="small" style="margin:0">Click a creature. Watch for a star-beast gliding through.</p></div>
          <p class="hint">The twelve star-beasts swim in <a href="#sky">the Sky</a>.</p></div></div>`;
      const aqua = $('#aqua');
      L.living.forEach((a, i) => {
        const r = SG.rng(a.id), rev = i % 2, dur = (a.fast ? 26 : 62) + r() * 30, dl = -r() * dur;
        const b = document.createElement('button'); b.className = 'sw2' + (rev ? ' rev' : '') + (a.glow ? ' glow' : ''); b.dataset.id = a.id;
        b.style.cssText = `--y:${a.depth}%;--d:${dur.toFixed(0)}s;--dl:${dl.toFixed(0)}s;--s:${a.size}`;
        if (a.faces === 'left') b.classList.add('fl');
        b.setAttribute('aria-label', a.name); b.innerHTML = `<span class="flip">${SG.img(a.img, SG.animal(a.kind), a.name, 'cut')}</span>`;
        b.addEventListener('click', () => {
          $('#aquaInfo').innerHTML = `<div class="ai"><div class="ai-art">${SG.img(a.img, SG.animal(a.kind), a.name, 'cut')}</div><div><div class="rp-meta">${esc(a.tag)}</div><h3 class="bm-h" style="margin:0">${esc(a.name)}</h3><p style="margin:6px 0 0">${esc(a.text)}</p></div></div>`;
          const im = $('#aquaInfo .ai-art img'); if (im) { const fit = () => { const ar = im.naturalWidth / im.naturalHeight || 1, k = innerWidth <= 480 ? 92 : 104; im.style.width = Math.min(150, k * Math.sqrt(ar)) + 'px'; im.style.height = (k / Math.sqrt(ar)) + 'px'; }; if (im.complete) fit(); else im.addEventListener('load', fit); }
          if (a.kind === 'whale' || a.kind === 'orca' || a.kind === 'narwhal') SG.sound.whale(); else SG.sound.chime(i);
        });
        aqua.appendChild(b);
      });
      this.omen = null;
    },
    enter() {
      if (this.omen) return;
      const go = () => {
        if (SG.current() !== 'beasts') return;
        const hs = L.houses.filter(h => h.id !== 'gap'), h = SG.pick(hs), aqua = $('#aqua'); if (!aqua) return;
        const o = document.createElement('button'); o.className = 'sw2 omen' + (h.beast.faces === 'left' ? ' fl' : ''); o.style.cssText = `--y:${14 + Math.random() * 40}%;--d:24s;--dl:0s;--s:.9`;
        o.setAttribute('aria-label', 'A star-beast: ' + h.beast.name); o.innerHTML = `<span class="flip">${SG.img(h.beast.cut, SG.animal(h.beast.kind === 'counter' ? 'serpent' : h.beast.kind), h.beast.name, 'cut')}</span><i class="tag-b">${esc(h.beast.name)}</i>`;
        o.addEventListener('click', () => SG.beastModal(h.id)); aqua.appendChild(o); setTimeout(() => o.remove(), 25000);
        SG.toast('A star-beast passes: ' + h.beast.name + '. It is a good omen.'); SG.sound.chime(L.houses.indexOf(h));
      };
      this.omen = setInterval(go, 17000); setTimeout(go, 3000);
    },
    leave() { clearInterval(this.omen); this.omen = null; }
  };
})(window.SG);
