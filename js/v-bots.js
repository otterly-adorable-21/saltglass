/* View: bots. Reads bots.js (built in) and, if configured, a published Google Sheet (live). */
(function (SG) {
  const { $, $$, esc } = SG, L = LORE, CFG = window.SITE_CONFIG || {};

  /* ---------- data ---------- */
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const matchId = (v, list) => { const n = norm(v); if (!n) return ''; const x = list.find(i => norm(i.id) === n || norm(i.name) === n || norm(i.name).replace(/^the/, '') === n.replace(/^the/, '')); return x ? x.id : ''; };
  const pickBy = (row, ...keys) => { for (const k of keys) { const v = row[norm(k)]; if (v != null && String(v).trim() !== '') return String(v).trim(); } return ''; };
  function normalize(raw, i) {
    const regionRaw = raw.region || '', houseRaw = raw.house || '', phaseRaw = raw.phase || '';
    let house = matchId(houseRaw, L.houses); if (!house && /quiet|thirteenth|gap|ophiuchus/i.test(houseRaw)) house = 'gap';
    const region = matchId(regionRaw, L.regions) || (/saltglass\s*fall|^upper\b|^saltglass city$/i.test(regionRaw) ? 'fall' : /undertow/i.test(regionRaw) ? 'undertow' : '');
    const phase = matchId(phaseRaw, L.phases) || 'any';
    const links = (raw.links || []).filter(l => l && /^https?:\/\//i.test(l.url || '')).map(l => ({ label: l.label || 'Chat', url: l.url }));
    const tags = Array.isArray(raw.tags) ? raw.tags : String(raw.tags || '').split(/[,;]/).map(t => t.trim()).filter(Boolean);
    return { id: '', name: String(raw.name || '').trim(), tagline: raw.tagline || '', creator: raw.creator || '', role: raw.role || '', region, house, phase, tags, notes: raw.notes || '', img: raw.img || '', links, example: !!raw.example };
  }
  function csv(text) {
    const rows = []; let row = [], f = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else if (c !== '\r') f += c;
    }
    if (f !== '' || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  const clean = h => String(h || '').split(/\s+[—–-]\s+|\s*[:(]/)[0];
  const KNOWN = ['timestamp', 'emailaddress', 'email', 'approved', 'show', 'visible', 'name', 'botname', 'character', 'creator', 'creatorname', 'madeby', 'author', 'tagline', 'summary', 'hook', 'role', 'occupation', 'region', 'location', 'where', 'house', 'birthhouse', 'zodiac', 'phase', 'storyphase', 'tags', 'genres', 'notes', 'contentnotes', 'warnings', 'image', 'imageurl', 'img', 'portrait', 'avatar'];
  const SITE = { saucepan: 'Saucepan', crushonai: 'CrushOn.AI', linkinlove: 'Linkin.Love', tipsychat: 'Tipsychat', craveu: 'CraveU', discord: 'Discord', janitorai: 'JanitorAI', chub: 'Chub', spicychat: 'SpicyChat' };
  const titleCase = t => t.toLowerCase().replace(/(^|[\s(])([a-z])/g, (m, a, b) => a + b.toUpperCase());
  function linkLabel(raw) {
    const parts = String(raw).split(/\s+[—–-]\s+/), base = norm(parts[0]), name = SITE[base] || titleCase(parts[0].trim());
    return parts[1] ? name + ' (' + titleCase(parts[1].trim()) + ')' : name;
  }
  function fromSheet(text) {
    const rows = csv(text).filter(r => r.some(c => c.trim() !== '')); if (rows.length < 2) return [];
    const raw = rows[0], head = raw.map(h => norm(clean(h)));
    return rows.slice(1).map(r => { const o = {}; head.forEach((h, i) => { if (!(h in o) || !String(o[h]).trim()) o[h] = r[i]; }); o.__row = r; return o; }).filter(o => {
      if (!('approved' in o) && !('show' in o) && !('visible' in o)) return true;
      return /^(yes|y|true|x|approved|1|ok|✓|✔)$/i.test(pickBy(o, 'approved', 'show', 'visible'));
    }).map(o => {
      const links = [];
      for (let k = 1; k <= 4; k++) { const url = pickBy(o, 'link' + k + 'url', 'link ' + k + ' url', 'url' + k), label = pickBy(o, 'link' + k + 'label', 'link ' + k + ' label', 'site' + k, 'link' + k + 'site'); if (url) links.push({ label: label || 'Chat', url }); }
      raw.forEach((h, i) => { const v = String(o.__row[i] || '').trim(); if (!/^https?:\/\//i.test(v) || KNOWN.includes(norm(clean(h))) || /^link\s*\d/i.test(h.trim())) return; links.push({ label: linkLabel(h), url: v }); });
      return { name: pickBy(o, 'name', 'botname', 'bot name', 'character'), creator: pickBy(o, 'creator', 'creatorname', 'made by', 'author'), tagline: pickBy(o, 'tagline', 'summary', 'hook'), role: pickBy(o, 'role', 'occupation'), region: pickBy(o, 'region', 'location', 'where'), house: pickBy(o, 'house', 'birthhouse', 'birth house', 'birth-house', 'zodiac'), phase: pickBy(o, 'phase', 'storyphase', 'story phase'), tags: pickBy(o, 'tags', 'genres'), notes: pickBy(o, 'notes', 'contentnotes', 'content notes', 'warnings'), img: pickBy(o, 'image', 'imageurl', 'image url', 'img', 'portrait', 'avatar'), links };
    });
  }
  const dedupe = list => { const seen = {}; list.forEach(b => { let id = SG.slug(b.name), n = 2; const base = id; while (seen[id]) id = base + '-' + (n++); seen[id] = 1; b.id = id; }); return list; };

  const B = SG.bots = {
    list: [], listeners: [], status: 'loading', F: { q: '', region: '', phase: '', house: '', creator: '' }, pendingOpen: null,
    filterBy(k, v) { return B.list.filter(b => b[k] === v); },
    onChange(fn) { B.listeners.push(fn); },
    avatar(b) { return botArt(b, true); },
    set(arr) { B.list = dedupe(arr.filter(b => b.name)); B.listeners.forEach(f => f()); }
  };
  const local = (window.BOTS || []).map(normalize);
  B.set(local);
  if (CFG.SHEET_CSV_URL) {
    fetch(CFG.SHEET_CSV_URL, { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).then(t => {
      const live = fromSheet(t).map(normalize), names = {}; live.forEach(b => names[SG.slug(b.name)] = 1);
      B.status = 'live'; B.set(live.concat(local.filter(b => !names[SG.slug(b.name)] && !b.example)).concat(live.length ? [] : local.filter(b => b.example)));
    }).catch(() => { B.status = 'offline'; B.listeners.forEach(f => f()); });
  } else B.status = 'local';

  /* ---------- art ---------- */
  function botArt(b, small) {
    const key = b.house && L.sky[b.house] ? b.house : 'aries', c = L.sky[key], r = SG.rng(b.name), ini = SG.esc((b.name.replace(/^Example:\s*/i, '')[0] || '?').toUpperCase());
    const pts = c.p.map(p => [12 + p[0] * .76, 14 + p[1] * .7]); let bg = ''; for (let i = 0; i < 26; i++) bg += `<circle cx="${(r() * 100).toFixed(0)}" cy="${(r() * 125).toFixed(0)}" r="${(r() * .5 + .2).toFixed(2)}" fill="#cfe4ff" opacity="${(r() * .5 + .15).toFixed(2)}"/>`;
    const fb = `<svg class="bfb" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(b.name)}"><rect width="100" height="125" fill="#0a1736"/><rect y="62" width="100" height="63" fill="#050a1d"/>${bg}<g stroke="#d4af6a" stroke-width=".4" opacity=".6">${c.e.map(e => `<line x1="${pts[e[0]][0].toFixed(1)}" y1="${pts[e[0]][1].toFixed(1)}" x2="${pts[e[1]][0].toFixed(1)}" y2="${pts[e[1]][1].toFixed(1)}"/>`).join('')}</g>${pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1.4" fill="#fff6d8"/>`).join('')}<text x="50" y="${small ? 82 : 98}" text-anchor="middle" font-family="Cinzel,serif" font-size="${small ? 40 : 34}" fill="#f3dca0" opacity=".9">${ini}</text><path d="M0 112Q12 106 25 112T50 112T75 112T100 112V125H0Z" fill="#7fc8e8" opacity=".12"/></svg>`;
    return SG.img(b.img, fb, b.name);
  }

  /* ---------- view ---------- */
  SG.views.bots = {
    init() {
      const F = B.F, formBtn = CFG.FORM_URL ? `<a class="btn on" href="${esc(CFG.FORM_URL)}" target="_blank" rel="noopener">Submit your bot</a>` : '';
      $('#v-bots').innerHTML = `<div class="wrap"><div class="bots-cover"><img src="img/bots-cover.webp" alt="Saltglass: the Admiral, Volaro and Shaedira before the glass-domed city under a starfall sky" width="1600" height="800"></div><h2>The Bots</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">Everyone who lives in Saltglass, with links to where you can meet them. Filter by where they live and where they sit in the story.</p>
        <div class="row center">${formBtn}<a class="btn" href="#myth">New here? Start with the myth</a></div>
        <div class="notice" id="botNote" hidden></div>
        <div class="panel filters"><div class="search-row"><label class="sr" for="bSearch">Search bots</label><input type="search" id="bSearch" placeholder="Search by name, role, tag or creator"></div>
          <div class="selects"><label>Region<select id="fRegion"></select></label><label>Birth-house<select id="fHouse"></select></label></div>
          <div class="count-row"><span id="botCount"></span><button class="btn small-btn" id="clearF">Clear filters</button></div></div>
        <div class="bots" id="botGrid"></div>
        <h3 class="sub">Creators in Saltglass</h3><div class="creators" id="creators"></div>
        <div class="panel" style="margin-top:28px" id="addBot"><h3>Add your bot</h3>${CFG.FORM_URL ? `<p class="small">Fill in the form and your bot appears here once it has been approved.</p><div class="row">${formBtn}</div>` : '<p class="small">Set <code>FORM_URL</code> in <code>config.js</code> to show a submit button here. Until then, use the builder below and paste the result into <code>bots.js</code>.</p>'}
          <details class="acc" id="builderBox"><summary>Write an entry by hand</summary><form id="botForm" class="form" autocomplete="off">
            <label>Bot name<input id="aName" type="text" placeholder="Volaro"></label><label>Creator<input id="aCreator" type="text" placeholder="Otterly"></label>
            <label class="wide">Tagline<input id="aTag" type="text" placeholder="One line that sells the bot"></label><label>Role<input id="aRole" type="text" placeholder="First Mate of the Admiralty"></label><label>Tags (comma separated)<input id="aTags" type="text" placeholder="slow burn, politics"></label>
            <label>Region<select id="aRegion"></select></label><label>Story phase<select id="aPhase"></select></label><label>Birth-house<select id="aHouse"></select></label><label>Image address<input id="aImg" type="text" placeholder="https://… or img/bots/volaro.webp"></label>
            <label class="wide">Content notes<input id="aNotes" type="text" placeholder="romance, angst, mature themes"></label>
            <fieldset class="wide"><legend>Links</legend><div class="links-in" id="aLinks"></div></fieldset></form>
            <div class="code-head"><span class="small-label">Your entry</span><button class="btn" id="copyBtn">Copy entry</button></div><pre class="code" id="codeOut" tabindex="0"></pre></details></div></div>`;
      const opt = (v, t) => `<option value="${esc(v)}">${esc(t)}</option>`;
      this.regionOpts = L.regions.map(r => opt(r.id, r.name)).join(''); this.phaseOpts = L.phases.map(p => opt(p.id, p.name)).join('') + opt('any', 'Any phase'); this.houseOpts = L.houses.map(h => opt(h.id, h.id === 'gap' ? 'Quiet-born (the Gap)' : h.name)).join('');
      $('#fRegion').innerHTML = opt('', 'All regions') + this.regionOpts; $('#fHouse').innerHTML = opt('', 'Any birth-house') + this.houseOpts;
      $('#bSearch').addEventListener('input', e => { F.q = e.target.value.trim(); this.render(); });
      [['fRegion', 'region'], ['fHouse', 'house']].forEach(([id, k]) => $('#' + id).addEventListener('change', e => { F[k] = e.target.value; this.render(); }));
      $('#clearF').addEventListener('click', () => { Object.assign(F, { q: '', region: '', phase: '', house: '', creator: '' }); this.sync(); this.render(); });
      $('#botGrid').addEventListener('click', e => { const c = e.target.closest('.bot'); if (c && !e.target.closest('a')) location.hash = 'bot-' + c.dataset.id; });
      $('#botGrid').addEventListener('keydown', e => { const c = e.target.closest('.bot'); if (c && (e.key === 'Enter') && !e.target.closest('a')) location.hash = 'bot-' + c.dataset.id; });
      B.onChange(() => { if (SG.current() === 'bots' || $('#botGrid').children.length) { this.fillCreators(); this.render(); } });
      this.builder(); this.fillCreators(); this.render();
    },
    enter() {
      if (B.pendingFilter) { Object.assign(B.F, { q: '', region: '', phase: '', house: '', creator: '' }, B.pendingFilter); B.pendingFilter = null; this.sync(); this.render(); }
      this.render();
    },
    sync() { const F = B.F; $('#bSearch').value = F.q; $('#fRegion').value = F.region; $('#fHouse').value = F.house; },
    fillCreators() {
      const real = B.list.filter(b => !b.example), cm = {}; real.forEach(b => { if (b.creator) cm[b.creator] = (cm[b.creator] || 0) + 1; }); const cn = Object.keys(cm).sort((a, b) => a.localeCompare(b));
      $('#creators').innerHTML = cn.length ? cn.map(c => `<button data-c="${esc(c)}">${esc(c)}<span>${cm[c]} ${cm[c] === 1 ? 'bot' : 'bots'}</span></button>`).join('') : '<p class="small" style="grid-column:1/-1;text-align:center">Creators appear here as real bots are added.</p>';
      $$('#creators button').forEach(b => b.addEventListener('click', () => B.show({ creator: b.dataset.c })));
    },
    match(b) {
      const F = B.F;
      if (F.region && b.region !== F.region && b.region !== 'any') return false; if (F.phase && b.phase !== F.phase && b.phase !== 'any') return false;
      if (F.house && b.house !== F.house) return false; if (F.creator && b.creator !== F.creator) return false;
      if (F.q) { const hay = [b.name, b.tagline, b.role, b.creator, b.notes, b.tags.join(' ')].join(' ').toLowerCase(); if (!hay.includes(F.q.toLowerCase())) return false; }
      return true;
    },
    card(b) {
      const reg = SG.regionById(b.region), ph = SG.phaseById(b.phase), hs = SG.houseById(b.house);
      const meta = [reg ? reg.name : '', ph ? ph.name : '', hs ? (hs.id === 'gap' ? 'Quiet-born' : hs.name) : ''].filter(Boolean).map(m => `<span class="chip">${esc(m)}</span>`).join('');
      const links = b.links.slice(0, 3).map(l => `<a class="btn small-btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('');
      return `<article class="bot" data-id="${esc(b.id)}" tabindex="0" aria-label="${esc(b.name)}"><div class="bot-in"><div class="art">${botArt(b)}${b.example ? '<span class="ex">Example</span>' : ''}</div>
        <h4>${esc(b.name)}</h4><div class="role">${esc(b.role)}</div><p class="tl">${esc(b.tagline)}</p><div class="meta">${meta}</div><div class="by">By ${esc(b.creator || 'unknown')}</div><div class="lk">${links}</div></div></article>`;
    },
    render() {
      if (!$('#botGrid')) return;
      const list = B.list.filter(b => this.match(b));
      $('#botGrid').innerHTML = B.status === 'loading' && !B.list.length ? '<p class="empty">Gathering the lamps…</p>' : list.length ? list.map(b => this.card(b)).join('') : '<p class="empty">No bots match those filters yet. Clear a filter, or add yours below.</p>';
      $('#botCount').textContent = list.length + ' of ' + B.list.length + (B.list.length === 1 ? ' bot' : ' bots');
      $('#clearF').style.visibility = Object.values(B.F).some(Boolean) ? 'visible' : 'hidden';
      const note = $('#botNote'); const ex = B.list.some(b => b.example);
      note.hidden = !(ex || B.status === 'offline');
      note.textContent = B.status === 'offline' ? 'The live bot list could not be reached, so only the built-in bots are shown.' : 'Entries marked Example are placeholders. They disappear once real bots are added.';
    },
    openBot(id) {
      const go = () => {
        const b = B.list.find(x => x.id === id); if (!b) { SG.toast('That bot is not in the list.'); return; }
        const reg = SG.regionById(b.region), ph = SG.phaseById(b.phase), hs = SG.houseById(b.house), more = B.list.filter(x => x.creator && x.creator === b.creator && x.id !== b.id);
        const body = SG.openModal(`<div class="bmodal"><div class="portrait big">${botArt(b)}</div><div class="bm-txt">
          <div class="rp-meta">${esc(b.role || 'Resident of Saltglass')}</div><h3 class="bm-h">${esc(b.name)}</h3><p>${esc(b.tagline)}</p>
          <div class="meta">${[reg ? '<span class="chip">' + esc(reg.name) + '</span>' : '', ph ? '<span class="chip">' + esc(ph.name) + '</span>' : '', hs ? '<span class="chip">' + (hs.id === 'gap' ? 'Quiet-born' : 'Born under ' + esc(hs.name)) + '</span>' : ''].join('')}</div>
          <div style="margin:8px 0">${b.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          ${hs ? `<div class="festival"><div class="mo">${esc(hs.id === 'gap' ? 'The Gap' : 'House of ' + hs.name)}</div><b>${esc(hs.beast.name)}</b><p style="margin:4px 0 0;font-size:1rem">${esc(hs.beast.form)}. Star-touched of this house resonate with it.</p></div>` : ''}
          ${b.notes ? `<p class="small"><b class="gold">Content notes:</b> ${esc(b.notes)}</p>` : ''}<p class="by">By ${esc(b.creator || 'unknown')}</p>
          <div class="lk big">${b.links.length ? b.links.map(l => `<a class="btn on" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('') : '<span class="small">Links coming soon.</span>'}<button class="btn" id="copyLink">Copy link to this bot</button></div>
          ${more.length ? `<span class="small-label">More by ${esc(b.creator)}</span><div>${more.map(m => `<button class="chip" data-bot="${esc(m.id)}">${esc(m.name)}</button>`).join('')}</div>` : ''}</div></div>`, () => { if (location.hash.startsWith('#bot-')) location.hash = 'bots'; });
        $$('[data-bot]', body).forEach(c => c.addEventListener('click', () => { location.hash = 'bot-' + c.dataset.bot; }));
        $('#copyLink', body).addEventListener('click', async e => { try { await navigator.clipboard.writeText(location.href); e.target.textContent = 'Copied'; } catch (x) { e.target.textContent = 'Copy the address bar'; } setTimeout(() => e.target.textContent = 'Copy link to this bot', 2200); });
        SG.sound.chime(3);
      };
      if (B.status === 'loading') { const t = setInterval(() => { if (B.status !== 'loading') { clearInterval(t); go(); } }, 150); setTimeout(() => { clearInterval(t); }, 6000); } else go();
    },
    builder() {
      $('#aRegion').innerHTML = this.regionOpts; $('#aPhase').innerHTML = this.phaseOpts; $('#aHouse').innerHTML = '<option value="">None</option>' + this.houseOpts; $('#aRegion').value = 'fall'; $('#aPhase').value = 'before';
      const defs = ['Saucepan', 'CrushOn AI', 'Discord']; defs.forEach((l, i) => { const r = document.createElement('div'); r.className = 'lk-row'; r.innerHTML = `<input type="text" id="aLb${i}" value="${l}" aria-label="Link ${i + 1} label"><input type="text" id="aUr${i}" placeholder="https://" aria-label="Link ${i + 1} address">`; $('#aLinks').appendChild(r); });
      const q = JSON.stringify, v = id => $('#' + id).value.trim();
      const entry = () => { const tags = v('aTags').split(',').map(t => t.trim()).filter(Boolean), links = defs.map((_, i) => ({ label: v('aLb' + i) || 'Chat', url: v('aUr' + i) })).filter(l => l.url);
        return `  {\n    name: ${q(v('aName') || 'Bot name')},\n    tagline: ${q(v('aTag'))},\n    creator: ${q(v('aCreator'))},\n    role: ${q(v('aRole'))},\n    region: ${q(v('aRegion'))},\n    house: ${q(v('aHouse'))},\n    phase: ${q(v('aPhase'))},\n    tags: ${q(tags)},\n    notes: ${q(v('aNotes'))},\n    img: ${q(v('aImg'))},\n    links: ${links.length ? '[\n' + links.map(l => '      { label: ' + q(l.label) + ', url: ' + q(l.url) + ' }').join(',\n') + '\n    ]' : '[]'}\n  },`; };
      const upd = () => { $('#codeOut').textContent = entry(); }; $('#botForm').addEventListener('input', upd); $('#botForm').addEventListener('change', upd); $('#botForm').addEventListener('submit', e => e.preventDefault()); upd();
      $('#copyBtn').addEventListener('click', async () => { const b = $('#copyBtn'); try { await navigator.clipboard.writeText($('#codeOut').textContent); b.textContent = 'Copied'; } catch (e) { const r = document.createRange(); r.selectNodeContents($('#codeOut')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected: press copy'; } setTimeout(() => b.textContent = 'Copy entry', 2200); });
    }
  };
  B.show = function (f) { B.pendingFilter = f; if (SG.current() === 'bots') { SG.views.bots.enter(); scrollTo(0, 0); } else SG.go('bots'); };
  B.onChange(() => {
    const v = SG.views; if (v.sky && v.sky.sel && $('#skyDock') && $('#skyDock').children.length) v.sky.select(v.sky.sel, false, true);
  });
})(window.SG);
