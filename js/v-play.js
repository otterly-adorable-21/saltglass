/* View: play (the games). */
(function (SG) {
  const { esc } = SG;
  SG.views.play = {
    init() {
      const ext = (window.SITE_CONFIG || {}).GAME_URL;
      const G = [
        { href: 'games/pouring.html', t: 'The Pouring', s: 'A tea-house game of diplomacy and suspicion. Seven guests, three pots of Hollow-Leaf, and a decision after every cup.', tag: 'Five endings' },
        { href: 'games/whale-lines.html', t: 'Whale Lines', s: 'Run a whale line across the five regions in thirty days. Trade, carry pilgrims and mail, and decide whether to touch the dust.', tag: 'Thirty days' },
        { href: '#rite', t: 'Count the Lamps', s: 'The children’s rhyme on the Night of Quiet Lights. Count in cadence, and hold the silence where the thirteenth would be.', tag: 'On the Rite page' }
      ];
      document.getElementById('v-play').innerHTML = `<div class="wrap"><h2>Play</h2><img class="rule" src="img/divider.webp" alt="">
        <p class="lede">Three small games set in Saltglass. Each opens on its own page, and each one has more than one way to end.</p>
        <div class="grid g3">${G.map(g => `<a class="panel playcard" href="${g.href}"><h3>${esc(g.t)}</h3><p class="small">${esc(g.s)}</p><span class="chip">${esc(g.tag)}</span></a>`).join('')}</div></div>`;
    }
  };
})(window.SG);
