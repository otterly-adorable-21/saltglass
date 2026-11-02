/* ===========================================================
   SALTGLASS BOT DIRECTORY
   BUILT-IN BOTS. The easy way to add bots is the Google Form and Sheet
   (see SETUP.md). Bots listed here always show, and a bot in the Sheet
   with the same name replaces the one here.
   To add one by hand, copy an entry, paste it at the end of the list, and
   fill it in. The "Write an entry by hand" box on the Bots page makes
   this entry for you.

   Fields
     name      Bot name (required)
     tagline   One line that sells the bot
     creator   Creator name or handle (creators are listed automatically)
     role      Role in the world, e.g. "Tea House keeper"
     region    fall (Upper Saltglass City) | undertow | cinderbrine | frostmere | drift | ashgrove | drowned
     house     aries taurus gemini cancer leo virgo libra scorpio
               sagittarius capricorn aquarius pisces | gap (Quiet-born) | "" (none)
     phase     before | discovery | choice | aftermath | any
     tags      ["romance", "slow burn", ...]
     notes     Content notes (shown on the card)
     img       Image address: a web link (https://...) or a file path such as
               "img/bots/lamplighter.webp". "" draws a constellation instead.
     links     [{ label: "Saucepan", url: "https://..." }, ...]
     example   true marks a placeholder. Delete it from real bots.
   =========================================================== */
window.BOTS = [
  {
    name: 'Example: The Lamplighter',
    tagline: 'A placeholder card. Replace it with your first real bot.',
    creator: 'Your name here',
    role: 'Lamplighter under the First Mate',
    region: 'fall',
    house: 'leo',
    phase: 'before',
    tags: ['slow burn', 'drama'],
    notes: 'Example entry. Content notes go here.',
    img: '',
    links: [{ label: 'Saucepan', url: 'https://example.com' }, { label: 'CrushOn AI', url: 'https://example.com' }],
    example: true
  },
  {
    name: 'Example: Pale Runner Courier',
    tagline: 'A second placeholder, set in the Ashgrove trade.',
    creator: 'Another creator',
    role: 'Smuggler courier',
    region: 'ashgrove',
    house: 'gemini',
    phase: 'discovery',
    tags: ['angst', 'danger'],
    notes: 'Example entry.',
    img: '',
    links: [{ label: 'Discord', url: 'https://example.com' }],
    example: true
  },
  {
    name: 'Example: Quiet-born Oracle',
    tagline: 'A third placeholder, born in the Ophiuchus window.',
    creator: 'Your name here',
    role: 'Star-touched Oracle',
    region: 'drift',
    house: 'gap',
    phase: 'choice',
    tags: ['romance', 'angst'],
    notes: 'Example entry.',
    img: '',
    links: [],
    example: true
  }
];
