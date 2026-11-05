/* Views: voyage (sea chart with travelling animals) and rite (Night of Quiet Lights). */
(function (SG) {
  const { $, $$, esc } = SG, L = LORE;
  const botsBy = (k, v) => (SG.bots && SG.bots.filterBy(k, v)) || [];

  /* ================= VOYAGE (painted map with clickable places) ================= */
  const PLACES = [
    { id: 'drift', x: 27.1, y: 19.2 }, { id: 'fall', x: 48.3, y: 47.5 }, { id: 'trench', x: 49.2, y: 64.2 },
    { id: 'frostmere', x: 75.3, y: 17.4 }, { id: 'ashgrove', x: 82.6, y: 54.5 }, { id: 'cinderbrine', x: 21.4, y: 71.9 }, { id: 'drowned', x: 76.1, y: 79.7 }
  ];
  const MAP_AR = 793 / 1983;
  function placeInfo(id) {
    if (id === 'trench') { const t = L.trench; return { id, name: t.name, sub: t.sub, first: t.first, facts: t.facts, travel: [], more: t.text, chars: false }; }
    const r = SG.regionById(id), travel = r.lines.map(l => [l.line, l.time, l.fast]);
    if (id === 'fall') return { id, name: 'Saltglass City', sub: 'Isle of Meridian · Upper Saltglass City and the Undertow', first: 'The largest island and the world\'s capital: a city of white stone and crystal glass rising in terraces from the sea, partly underwater.',
      facts: [['Climate', r.climate], ['Seat of', 'The Admiral'], ['Color', L.city.color], ['Parting words', '"' + r.parting + '"']], travel: [],
      more: L.city.text + ' The deepest districts hum faintly with the star\'s light, and residents call it "the city breathing."', extra: 'city', chars: true, region: r };
    return { id, name: r.name, sub: r.climate + ' · ' + r.role, first: r.text.split('. ')[0] + '.', facts: [['Climate', r.climate], ['Role', r.role], ['Secret', r.secret], ['Parting words', '"' + r.parting + '"']], travel, more: r.text + '\n\nGovernance: ' + r.gov, chars: true, region: r };
  }
  SG.views.voyage = {
    init() {
      $('#v-voyage').innerHTML = `<div class="wrap"><h2>The Voyage</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">Crossings take days, never months, and the longest between any two regions is about ten days. Choose a place on the map.</p></div>
        <div class="mapwrap"><div class="mapbox" id="mapbox"><div class="mapin"><img class="mapimg" src="img/map.webp" alt="Painted map of the Saltglass world: the Verdant Drift, Frostmere Reach, Saltglass City on the Isle of Meridian above the Hollow Trench, Cinderbrine, Ashgrove Atoll and the Drowned Reaches" width="1983" height="793">
        <div id="pins"></div></div></div></div>
        <div class="wrap"><div class="chips" id="placeChips" aria-label="Places on the map"></div><p class="hint">Scroll the map sideways on a small screen. Choose a place to read about it and meet the people who live there.</p></div>`;
      this.pins();
      B_onChange(() => this.pins());
      const mb = $('#mapbox'); requestAnimationFrame(() => { mb.scrollLeft = (mb.scrollWidth - mb.clientWidth) / 2; });
    },
    pins() {
      const box = $('#pins'), chips = $('#placeChips'); if (!box) return; box.innerHTML = ''; chips.innerHTML = '';
      PLACES.forEach(pl => {
        const info = placeInfo(pl.id), n = info.chars ? botsBy('region', pl.id).length + (pl.id === 'fall' ? botsBy('region', 'undertow').length : 0) : 0, label = info.name;
        const b = document.createElement('button'); b.className = 'pin'; b.style.left = pl.x + '%'; b.style.top = pl.y + '%'; b.style.animationDelay = (-(PLACES.indexOf(pl) * .7)) + 's';
        b.setAttribute('aria-label', label + (info.chars ? ', ' + n + (n === 1 ? ' bot' : ' bots') : ''));
        b.innerHTML = `<span class="hover-box"><b>${esc(label)}</b>${info.chars ? `<em>${n} ${n === 1 ? 'bot' : 'bots'}</em>` : ''}</span>`;
        b.addEventListener('click', () => this.place(pl.id)); box.appendChild(b);
        const c = document.createElement('button'); c.className = 'chip'; c.textContent = label; c.addEventListener('click', () => this.place(pl.id)); chips.appendChild(c);
      });
    },
    place(id) {
      const pl = PLACES.find(p => p.id === id), info = placeInfo(id), bots = info.chars ? botsBy('region', id).concat(id === 'fall' ? botsBy('region', 'undertow') : []) : [];
      const Z = 3.4, r = .3, px = pl.x / 100, py = pl.y / 100, ih = Z * MAP_AR;
      const posX = Math.max(0, Math.min(100, (.5 - px * Z) / (1 - Z) * 100)), posY = Math.max(0, Math.min(100, (r / 2 - py * ih) / (r - ih) * 100));
      const travel = info.travel.map(t => `<div class="${t[2] ? 'fast' : ''}"><span>${esc(t[0])}</span><span>${esc(t[1])}</span></div>`).join('');
      const districts = info.extra === 'city' ? `<details class="acc"><summary>Districts</summary><dl class="dl">${L.districts.map(d => `<dt>${esc(d.name)}</dt><dd>${L.districtImg[d.name] ? SG.img(L.districtImg[d.name], '<span class="mc-none"></span>', d.name, 'dimg') : ''}${esc(d.text)}</dd>`).join('')}</dl></details>
        <details class="acc"><summary>The Admiralty</summary><p class="small" style="padding:0 0 8px">The Admiral decides, the First Mate runs the city day to day, and the old-money families hold the most influence. The Admiralty runs the navy, the harbours, the Lanternworks and the Tea Houses. Its color is ${esc(L.city.color.toLowerCase())}. ${esc(L.city.emblem)} ${esc(L.city.hint)}</p></details>` : '';
      const more = info.more.split('\n\n').map(t => `<p class="small" style="margin:0 0 8px">${esc(t)}</p>`).join('');
      const body = SG.openModal(`<div class="rmodal"><div class="mapcrop" style="background-position:${posX.toFixed(1)}% ${posY.toFixed(1)}%;background-size:${Z * 100}% auto">${SG.img(L.placeImg[id], '<span class="mc-none"></span>', info.name, 'mc-img')}<div class="mc-t"><h3 class="bm-h rname">${esc(info.name)}</h3><span>${esc(info.sub)}</span></div></div>
        <div class="mtabs" role="tablist"><button class="mtab on" data-t="lore" role="tab">Lore</button>${info.chars ? `<button class="mtab" data-t="chars" role="tab">Bots (${bots.length})</button>` : ''}</div>
        <div class="mpanel on" id="mp-lore"><p class="rfirst">${esc(info.first)}</p><div class="facts4">${info.facts.map(f => `<div class="mini"><b>${esc(f[0])}</b><p>${esc(f[1])}</p></div>`).join('')}</div>
        ${travel ? `<span class="small-label">From Saltglass City</span><div class="travel">${travel}</div>` : ''}
        <details class="acc" open><summary>More about ${esc(info.name)}</summary><div style="padding-bottom:8px">${more}</div></details>${districts}</div>
        <div class="mpanel" id="mp-chars">${bots.length ? `<div class="bavs big">${bots.map(b => `<button class="bav" data-bot="${esc(b.id)}" title="${esc(b.name)}">${SG.bots.avatar(b)}<span>${esc(b.name)}</span></button>`).join('')}</div>` : '<p class="small">No bots have appeared here yet.</p>'}
          <div class="row" style="margin-top:14px"><button class="btn small-btn" id="mAll">Browse all bots</button></div></div></div>`);
      $$('.mtab', body).forEach(t => t.addEventListener('click', () => { $$('.mtab', body).forEach(x => x.classList.toggle('on', x === t)); $$('.mpanel', body).forEach(p => p.classList.toggle('on', p.id === 'mp-' + t.dataset.t)); }));
      $$('[data-bot]', body).forEach(c => c.addEventListener('click', () => { SG.closeModal(true); location.hash = 'bot-' + c.dataset.bot; }));
      const all = $('#mAll', body); if (all) all.addEventListener('click', () => { SG.closeModal(true); SG.bots.show(id !== 'trench' ? { region: id } : {}); });
      SG.sound.chime(PLACES.indexOf(pl) + 1);
    }
  };
  function B_onChange(fn) { if (SG.bots && SG.bots.onChange) SG.bots.onChange(fn); }

  /* ================= RITE ================= */
  const WHISPERS = ['…one for the lamp upon the quay…', '…twelve, and then the silence…', '…it is calling…', '…come down, come down…', '…who pours for no one…', '…the star beneath our feet…'];
  const DIM = [0, .22, .5, .66, .88, .9, .94, .96, 0];
  SG.views.rite = {
    stage: 0, ret: 'yes',
    init() {
      $('#v-rite').innerHTML = `<div class="wrap"><h2>The Rite</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">Once a year Saltglass dims every lamp. The Admiralty reads the Twelve Names aloud and the whole city keeps a held silence where a thirteenth would be. Most citizens do not know why. Move through the night, and watch the world go dark with it.</p>
        <div class="panel rite-panel"><div class="rite-grid"><div><div class="lamps" id="lamps" aria-hidden="true"></div>
          <div class="track" id="nightTrack" role="tablist" aria-label="Hours of the night"></div>
          <div class="night-card" id="nightCard" aria-live="polite"></div>
          <div class="dawn" id="dawnBox" hidden><span class="small-label">Does the lift return?</span><button class="btn on" data-ret="yes">He returns</button><button class="btn" data-ret="no">He does not</button></div></div>
          <div class="shaft"><svg viewBox="0 0 120 320" id="shaft" role="img" aria-label="The deep lift to the Descent"><defs><radialGradient id="shG"><stop offset="0" stop-color="#d9c8ff"/><stop offset="1" stop-color="#8a6fd6" stop-opacity="0"/></radialGradient></defs>
            <path d="M0 40H120" stroke="#7fc8e8" opacity=".5"/><rect x="54" y="40" width="12" height="250" fill="#04070f" stroke="#d4af6a" stroke-opacity=".5"/>
            <ellipse cx="60" cy="300" rx="52" ry="18" fill="url(#shG)" class="tglow"/><text x="60" y="316" text-anchor="middle" class="sh-t">THE STAR</text><text x="60" y="22" text-anchor="middle" class="sh-t">THE QUAY</text>
            <g id="adm" transform="translate(60 30)"><circle r="12" fill="url(#shG)"/><circle r="3.4" fill="#fff4d6"/></g></svg></div></div>
          <div class="whispers" id="whispers" aria-hidden="true"></div></div></div>
        <div class="wrap" id="gameWrap" hidden><div class="panel" style="margin-top:22px"><h3>Play: Count the Lamps</h3><p class="small">Dim the lamps, count in cadence, and hold the silence where the thirteenth would be. Best with sound on.</p>
          <div class="game-frame"><iframe id="gameFrame" scrolling="no" title="Count the Lamps, a Night of Quiet Lights game" loading="lazy" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="no-referrer"></iframe></div>
          <p class="small" style="margin:10px 0 0"><button class="btn small-btn" id="gameFs" type="button">Full screen</button> <a id="gameLink" target="_blank" rel="noopener">Not loading? Open the game in its own tab.</a></p></div></div>
        <div class="wrap"><div class="panel" style="margin-top:22px"><h3>Count the Lamps</h3><p class="small">The skipping and clapping rhyme children sing. Whoever says a number past twelve, or draws breath to, pays the tea and sits out a round.</p>
          <div class="lampring" id="lampRing" aria-hidden="true"></div><p class="rhyme-line" id="rhymeLine" aria-live="polite"></p>
          <div class="row"><button class="btn on" id="countBtn">Say the next number</button><button class="btn" id="hushBtn" hidden>Stay silent</button><button class="btn" id="resetCount" hidden>Start again</button></div>
          <p class="small" style="margin-top:12px">In the Undertow and the Drowned Reaches, darker variants do not stop at twelve.</p></div></div>`;
      const gu = (window.SITE_CONFIG || {}).GAME_URL; if (gu) { $('#gameWrap').hidden = false; $('#gameLink').href = gu; $('#gameFrame').src = gu; $('#gameFs').addEventListener('click', () => { const f = $('.game-frame'); try { (f.requestFullscreen || f.webkitRequestFullscreen).call(f); } catch (e) { window.open(gu, '_blank', 'noopener'); } }); }
      const box = $('#lamps'); this.rows = [];
      L.lampRows.forEach((name, r) => { const row = document.createElement('div'); row.className = 'lrow' + (r === 5 ? ' lw' : ''); row.innerHTML = `<span class="ln">${esc(name)}</span><span class="ld"></span>`; const ld = $('.ld', row), ls = []; for (let k = 0; k < (r === 5 ? 8 : 18); k++) { const l = document.createElement('i'); l.className = 'lamp'; ld.appendChild(l); ls.push(l); } box.appendChild(row); this.rows.push(ls); });
      SG.mkTabs($('#nightTrack'), L.night.map((s, i) => ({ id: String(i), label: s.time })), id => this.set(+id));
      $$('#dawnBox button').forEach(b => b.addEventListener('click', () => { this.ret = b.dataset.ret; this.set(this.stage, true); }));
      /* Count the lamps */
      const ring = $('#lampRing'), line = $('#rhymeLine'), cb = $('#countBtn'), hb = $('#hushBtn'), rb = $('#resetCount'); let n = 0, deep = 0;
      const say = t => { line.textContent = Array.isArray(t) ? t.join('\n') : t; };
      const reset = () => { n = 0; deep = 0; ring.innerHTML = ''; for (let i = 0; i < 13; i++) { const l = document.createElement('i'); l.className = 'lamp' + (i === 12 ? ' void' : ''); ring.appendChild(l); } say('Lamps low. Finger to your lips. Begin when ready.'); cb.textContent = 'Say the next number'; cb.hidden = false; hb.hidden = true; rb.hidden = true; };
      const finish = t => { say(t); cb.hidden = true; hb.hidden = true; rb.hidden = false; };
      cb.addEventListener('click', () => {
        if (n < 12) { ring.children[n].classList.add('lit'); say(n === 11 ? [L.rhyme[n], '(Lamps low. Finger to your lips.)'] : L.rhyme[n]); SG.sound.chime(n); n++; if (n === 12) { cb.textContent = 'Say thirteen'; hb.hidden = false; } }
        else if (n === 12) { n = 13; ring.children[12].classList.add('lit'); SG.sound.bell(); say(['You said thirteen. You pay the tea and sit out a round.', 'Deep in the Drowned Reaches, people continue.']); cb.textContent = 'Keep counting, as they do below'; hb.hidden = true; rb.hidden = false; }
        else { const v = L.rhyme2[deep]; if (v) { say(v); SG.sound.chime(2 + deep * 3); deep++; cb.textContent = deep < L.rhyme2.length ? 'Next verse' : 'Finish the rhyme'; } else finish(L.rhymeEnd); }
      });
      hb.addEventListener('click', () => finish(L.rhymeEnd));
      rb.addEventListener('click', reset); reset();
      this.set(0);
    },
    set(i, keep) {
      this.stage = i; const s = L.night[i], yes = this.ret === 'yes';
      this.rows.forEach((ls, r) => { const v = s.dawn ? (yes ? 1 : 0) : s.lamps[r]; ls.forEach((l, k) => { l.style.setProperty('--o', v); l.style.transitionDelay = (s.dawn && yes ? ((5 - r) * .5 + k * .03) : (r * .12 + k * .02)) + 's'; }); });
      const dim = s.dawn ? (yes ? 0 : .98) : DIM[i]; SG.dim = dim; document.body.style.setProperty('--dim', dim);
      $('#nightCard').innerHTML = `<div class="nt">${esc(s.time)}</div><p style="margin:2px 0 4px">${esc(s.text)}</p><div class="nw">${esc(s.who)}</div>` + (s.dawn && !yes ? '<p style="margin:8px 0 0;color:var(--violet)">The lift does not return. The dark stays dark, and Volaro holds the city together.</p>' : '');
      $('#dawnBox').hidden = !s.dawn; $$('#dawnBox button').forEach(b => b.classList.toggle('on', b.dataset.ret === this.ret));
      const y = i < 6 ? 30 : (s.dawn && yes ? 30 : 282); $('#adm').style.transform = `translate(60px,${y}px)`;
      const wh = $('#whispers'); wh.innerHTML = ''; if (i === 7 || i === 6) WHISPERS.forEach((w, k) => { const sp = document.createElement('span'); sp.textContent = w; sp.style.cssText = `left:${8 + (k * 17) % 80}%;top:${12 + (k * 23) % 70}%;animation-delay:${k * .9}s`; wh.appendChild(sp); });
      if (!keep) { if (i === 4) { for (let k = 0; k < 12; k++) setTimeout(() => { if (this.stage === 4) SG.sound.bell(); }, k * 900); } else if (i === 6) SG.sound.whale(); else if (s.dawn && yes) SG.sound.chime(2); else SG.sound.chime(i); }
    },
    leave() { SG.dim = 0; document.body.style.setProperty('--dim', 0); },
    enter() { if (this.rows) this.set(this.stage, true); }
  };
})(window.SG);
