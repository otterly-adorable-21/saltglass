/* View: codex (reference shelf). */
(function (SG) {
  const { $, $$, esc } = SG, L = LORE;

  /* ================= CODEX ================= */
  SG.views.codex = {
    init() {
      $('#v-codex').innerHTML = `<div class="wrap narrow"><h2>The Codex</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">The reference shelf. Everything a creator needs to keep a bot true to Saltglass.</p>
        <div class="tabs center" id="cxTabs" role="tablist"></div><div id="cxBody" class="cx"></div></div>`;
      const tabs = [
        ['glossary', 'Glossary'], ['places', 'Places'], ['people', 'People'], ['city', 'City life'], ['world', 'History']
      ];
      SG.mkTabs($('#cxTabs'), tabs.map(t => ({ id: t[0], label: t[1] })), id => { $('#cxBody').innerHTML = this[id](); this.hook(id); });
    },
    glossary() {
      return `<div class="panel"><div class="search-row"><label class="sr" for="gSearch">Search the glossary</label><input type="search" id="gSearch" placeholder="Search phrases, slang and terms"><div class="tabs" id="gKinds"></div></div><div class="gloss" id="gloss"></div></div>`;
    },
    places() {
      return L.regions.map(r => `<details class="acc"><summary>${esc(r.name)} <span class="sum-s">${esc(r.climate)} · ${esc(r.role)}</span></summary><p class="small">${esc(r.text)}</p><dl class="dl"><dt>Secret</dt><dd>${esc(r.secret)}</dd><dt>Governance</dt><dd>${esc(r.gov)}</dd><dt>Parting words</dt><dd>"${esc(r.parting)}"</dd></dl></details>`).join('')
        + `<div class="grid g2" style="margin-top:18px"><div class="panel"><h3>Whale lines</h3><div class="list">${L.whaleLines.map(w => `<div><b>${esc(w.name)}</b> <i>${esc(w.beast)}</i><p>${esc(w.role)}</p></div>`).join('')}</div></div>
        <div class="panel"><h3>The Admiralty fleet</h3><div class="list">${L.navy.map(n => `<div><b>${esc(n.cls)}-class</b> <i>${esc(n.draft)}</i><p>${esc(n.role)}</p></div>`).join('')}</div><div class="ship-gen"><button class="btn" id="shipBtn">Name a ship</button><span id="shipName" class="ship-name">Gentle Persuasion</span></div></div></div>
        <p class="small" style="margin-top:14px">${esc(L.landAnimals)}</p>`;
    },
    people() {
      return `<div class="grid g3 chars">${L.characters.map(c => `<article class="panel char"><h3>${esc(c.name)}</h3><div class="ep">${esc(c.epithet)}</div><div>${c.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div><p class="look">${esc(c.look)}</p>${c.body.map(p => `<p>${esc(p)}</p>`).join('')}<dl class="dl">${c.facts.map(f => `<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join('')}</dl></article>`).join('')}</div>
        <div class="grid g2" style="margin-top:22px"><div class="panel"><h3>Peoples</h3><div class="list">${L.peoples.map(p => `<div><b>${esc(p.n)}</b><p>${esc(p.d)}</p></div>`).join('')}</div><h3 class="sub tight">How the city sees them</h3><div class="list">${L.society.map(p => `<div><b>${esc(p.n)}</b><p>${esc(p.d)}</p></div>`).join('')}</div></div>
        <div class="panel"><h3>The Admiralty ranks</h3>${L.ranks.map(r => `<details class="rank"><summary>${esc(r[0])}</summary><p>${esc(r[1])}</p></details>`).join('')}</div></div>`;
    },
    city() {
      return `<div class="grid g2"><div class="panel"><h3>City and regional roles</h3><dl class="dl">${L.roles.map(r => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl></div>
        <div class="panel"><h3>Daily life</h3><dl class="dl">${L.daily.map(r => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl><h3 class="sub tight">Courtship and romance</h3><ul class="facts">${L.courtship.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div></div>`;
    },
    world() {
      return `<div class="panel"><h3>Aesthetic</h3><p style="margin:0">${esc(L.aesthetic)}</p></div><h3 class="sub">A thousand years</h3><ol class="hist">${L.history.map(h => `<li><b>${esc(h.when)}</b><p>${esc(h.text)}</p></li>`).join('')}</ol>`;
    },
    hook(id) {
      if (id === 'glossary') {
        const kinds = ['All', 'Greeting', 'Farewell', 'Regional', 'Slang', 'Term']; let kind = 'All', q = '';
        const gl = () => { const items = L.glossary.filter(g => (kind === 'All' || g[0] === kind) && (!q || (g[1] + ' ' + g[2]).toLowerCase().includes(q))); $('#gloss').innerHTML = items.length ? items.map(g => `<div class="gl"><em>${esc(g[0])}</em><b>${esc(g[1])}</b><p>${esc(g[2])}</p></div>`).join('') : '<p class="small">Nothing matches that word.</p>'; };
        SG.mkTabs($('#gKinds'), kinds.map(k => ({ id: k, label: k })), i => { kind = i; gl(); }); $('#gSearch').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); gl(); });
      }
      if (id === 'places') {
        let last = 'Gentle Persuasion';
        $('#shipBtn').addEventListener('click', () => { let n, t = 0; do { n = Math.random() < .35 ? SG.pick(L.shipNames) : SG.pick(L.shipWords.adj) + ' ' + SG.pick(L.shipWords.noun); } while (n === last && t++ < 8); last = n; $('#shipName').textContent = n; SG.sound.bell(); });
      }
    }
  };
})(window.SG);
