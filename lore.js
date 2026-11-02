/* ===========================================================
   SALTGLASS LORE DATA  (Lorebook v3 + World Summary v3)
   Edit text here. The page renders everything from this file.
   =========================================================== */
const LORE = {

  /* ---------- Names of the Thirteenth ---------- */
  names: [
    { id: 'public', label: 'Public name', name: 'None', text: 'It is forbidden. Most people believe the Thirteenth is dead, and anyone who says otherwise is called crazy.', who: 'Nobody speaks it' },
    { id: 'euph', label: 'Euphemisms', name: 'The Gap · The Quiet House · The Bearer', text: 'People never say the Gap aloud, so "Quiet take you" works as a real curse. The city keeps a held silence where a thirteenth would be.', who: 'Everyone, quietly' },
    { id: 'old', label: 'Old name', name: 'Serpentarius', text: 'Carved into the oldest ruins of the Drowned Reaches and the Verdant Drift. The Tide-Priests began recording the Thirteenth under this name in the first centuries.', who: 'Tide-Priests, the oldest ruins' },
    { id: 'true', label: 'True name', name: 'Ophiuchus, the Serpent Bearer', text: 'The House governed mending: healing and the thin line between living and dead. Its sign is a figure gripping a coiled serpent. In Saltglass it appears as a serpent wound around a lantern or tide-staff.', who: 'Tide-Priests and the Admiral' }
  ],

  /* ---------- History ---------- */
  history: [
    { when: 'About a thousand years ago', text: 'The Twelve erase the Thirteenth House, Ophiuchus the Serpent Bearer, from the sky. Its star falls into the deepest trench of the sea and takes root over the Hollow Trench.' },
    { when: 'Older than the city', text: 'The cities of the Drowned Reaches already stand, and they remember the House by name.' },
    { when: 'Soon after the fall', text: 'Settlers on the Isle of Meridian find a glowing, half-drowned man sitting in what becomes Velvet Haven. They build Saltglass around him, and he has ruled it ever since.' },
    { when: 'The first centuries', text: 'The Admiralty forms around the Admiral. The Tide-Priests of the Verdant Drift begin recording the Thirteenth under its old name.' },
    { when: 'Generations ago', text: 'The city learns to intercept falling stars and burn them in the Lanternworks. The first star-touched are born, and nobody connects them to the burning.' },
    { when: 'Always', text: 'The Night of Quiet Lights is kept as an inherited rite that nobody can explain.' },
    { when: 'Now', text: 'The Admiral struggles with loneliness. Volaro plots against Volara in quiet. Whispers say this may be the year the Admiral does not return from his Descent. There is pressure, but no deadline.' }
  ],

  /* ---------- Houses, festivals and star-beasts (calendar order) ---------- */
  houses: [
    { id: 'aries', name: 'Aries', guards: 'Beginnings, courage, first light', festival: 'Firstlight', custom: 'Lamps are lit at dawn and new ventures begin. The year\'s first boats are launched.',
      beast: { name: 'Firsthorn', form: 'Narwhal that surfaces at first light', text: 'A narwhal whose horn lights before the dawn does. Fishers say a sighting at first light means the day\'s work will pay.', img: '' } },
    { id: 'taurus', name: 'Taurus', guards: 'Harvest, trade, patience', festival: 'Harvest Tide', custom: 'Markets and shared tables. Fruit from the Verdant Drift is traded and given.',
      beast: { name: 'Meadowback', form: 'Dugong that grazes the kelp meadows', text: 'A vast, gentle dugong that grazes the kelp meadows, its back drawn with a constellation. Harvest-lines schedule sowing around its passing.', img: '' } },
    { id: 'gemini', name: 'Gemini', guards: 'Messages, doubles, crossings', festival: 'The Crossing', custom: 'Letters and messages are exchanged, pairs dress alike, and Pale Runners race.',
      beast: { name: 'Tidegleam', form: 'Sparking manta ray', text: 'A manta that sheds sparks of starlight in its wake. Couriers treat it as a blessing on any message sent across open water.', img: '' } },
    { id: 'cancer', name: 'Cancer', guards: 'Home, tides, mothers', festival: 'Hearthtide', custom: 'Families gather for home cooking. Lanterns are set in tide pools and shells are given as gifts.',
      beast: { name: 'The Shell-Mother', form: 'Great sea-turtle with the starry shell, and a calf', text: 'A great sea-turtle with a calf beside her, her shell mapped in stars. Sailors call her the harbor\'s mother, and her tide is home.', img: '' } },
    { id: 'leo', name: 'Leo', guards: 'Rule, pride, lamplight', festival: 'Lampcrown', custom: 'Lamp parades through the city. The Admiral lights the ceremonial lamp.',
      beast: { name: 'Sunmane', form: 'Golden-maned sea lion', text: 'A sea lion whose mane burns like a lit lamp. It rears out of the water to face the sky, and nobles claim its pride as theirs.', img: '' } },
    { id: 'virgo', name: 'Virgo', guards: 'Craft, precision, accounting', festival: 'The Fine Hand', custom: 'Glass, brass and craft guilds show their best work, and accounts are settled.',
      beast: { name: 'Orrery', form: 'Nautilus with orbiting lights', text: 'A nautilus whose shell turns with its own orbiting lights. Glasswrights study its spiral for the exact proportions of a lens.', img: '' } },
    { id: 'libra', name: 'Libra', guards: 'Contracts, balance, fair dealing', festival: 'The Even Scale', custom: 'Contracts are signed, debts settled or forgiven, and treaty teas held.',
      beast: { name: 'Slackwater', form: 'Flowing-finned fish that holds still at slack tide', text: 'A flowing-finned fish that hangs perfectly still at slack tide. Merchants close their contracts when it appears.', img: '' } },
    { id: 'scorpio', name: 'Scorpio', guards: 'Secrets, depths, what is hidden', festival: 'The Veiled Night', custom: 'Masks are worn and secrets whispered. Lamps are dimmed low, the night before the gap.',
      beast: { name: 'The Hush-Eel', form: 'Silent serpent with an ember eye', text: 'A coiled, silent serpent of the deep with a single ember eye. Where it passes the water goes quiet, and secrets feel safer.', img: '' } },
    { id: 'gap', name: 'The Thirteenth', alias: 'Ophiuchus', guards: 'Mending: healing, and the thin line between living and dead', festival: 'Night of Quiet Lights', custom: 'The silent rite. Every lamp is dimmed, the Twelve Names are read, and the city holds its silence.',
      beast: { name: 'Old Counter', form: 'Sea snake with twelve spots and an empty place for a thirteenth', text: 'A sea snake with twelve spots, never thirteen. It moves from sea to sea and no one knows where it is. Sailors who claim to have seen it always disagree about the count. It vanished when the Thirteenth House fell, and it is the Admiral\'s sea-beast. A living Old Counter suggests the Thirteenth House is not wholly dead.', img: '', legend: true } },
    { id: 'sagittarius', name: 'Sagittarius', guards: 'Distance, voyages, long crossings', festival: 'The Far Arrow', custom: 'Sailors are seen off, and whales sing departing ships out of harbour.',
      beast: { name: 'The Brinequeen', form: 'Jelly whose bell holds a star-map', text: 'A jelly whose bell holds a living map of the stars. Navigators who see her trust their course for the whole voyage.', img: '' } },
    { id: 'capricorn', name: 'Capricorn', guards: 'Duty, law, the old and the stone', festival: 'Stonewatch', custom: 'Oaths are renewed at stone cairns, and elders and the law are honored.',
      beast: { name: 'Ashmaw', form: 'Dark whale with ember-flanked sides', text: 'A dark whale with ember-lit flanks, old beyond counting. Sailors steer wide and speak of it in low voices, as one does for elders.', img: '' } },
    { id: 'aquarius', name: 'Aquarius', guards: 'Rain, passage, mourning', festival: 'The Mourning Rain', custom: 'The dead are remembered with floating lanterns, and Frostmere sends ice-boats out.',
      beast: { name: 'Raincaller', form: 'Whale whose spout falls as rain', text: 'A whale whose spout falls as rain and whose song carries over water. Mourners ask for its song at the Night of Quiet Lights.', img: '' } },
    { id: 'pisces', name: 'Pisces', guards: 'Dreams, the tide between, the drowned', festival: 'The Tide Between', custom: 'Dreams are shared in storytelling, and lanterns float for the drowned.',
      beast: { name: 'The Twain', form: 'Two silver fish bound by a thread of light', text: 'Two silver fish bound by a thread of light. They are never seen apart, and lovers wish on the sight of them.', img: '' } }
  ],

  /* ---------- Regions and sea routes ----------
     days.whale = standard whale line, days.runner = Pale Runner (fast).
     angle/dist place the island on the sea chart (dist is days-based). */
  regions: [
    { id: 'fall', name: 'Upper Saltglass City', climate: 'Temperate, soft autumn', role: 'Capital region, the Admiral\'s seat', secret: 'Sits directly over the fallen star',
      text: 'The central region, with Saltglass City on the Isle of Meridian, smaller islands, harbours and the sea lanes the city controls. The name means both the glass city and the fall of the star beneath it. The seabed drops toward the Hollow Trench, so the whole region sits over the fallen star. Outlying isles are lamp-lit fishing villages, tea plantations and Admiralty waystations, all prosperous and all watched.',
      gov: 'The Admiral decides and the First Mate runs the city day to day. Old-money families hold the most influence.', parting: 'Lamps keep you',
      lines: [{ line: 'Harbour Greys', time: 'A few hours to a day', days: 0.6 }] },
    { id: 'undertow', name: 'The Undertow', climate: 'Beneath the waves', role: 'The glass city under the sea', secret: 'The deeper you live, the less the surface rules reach you',
      text: 'Glass-walled neighborhoods beneath the waves, reached by pressure-lifts. The deeper you live, the less the surface rules reach you. Poorer and freer than the surface, but not lawless. The domes, lifts and air all run on the minimum starfall the First Mate\'s office allows, and when the ration runs short the Undertow burns whale oil. Pressure-wrights notice first when the air starts to fail.',
      gov: 'Answers to the Admiral and the First Mate like the rest of the city, though the surface rules reach it less.', parting: 'Lamps keep you', angle: 90, dist: 0.2,
      lines: [{ line: 'Lanternbellies', time: 'Deep-diving passage from the harbour', days: 0.3 }] },
    { id: 'cinderbrine', name: 'Cinderbrine', climate: 'Volcanic, ash-hazed', role: 'Glass-steel supplier', secret: 'Resentment toward the Admiral',
      text: 'A volcanic chain of black sand, hot springs and forges under permanent ash-haze and red-lit nights. Smiths work starfall into the glass-steel Saltglass is built from. They are skilled, proud and resentful, strike-prone and quietly seditious: the Admiral\'s most necessary and least trusted supplier. The Brass Foundry stands here, and Volara builds everything in it.',
      gov: 'A council of smith guild-masters bound by guild oaths, answering to Saltglass through an Admiralty tax-office and fixed quotas.', parting: 'Ash and iron', angle: 200, dist: 3,
      lines: [{ line: 'Deepwalkers', time: '3 days', days: 3 }, { line: 'Pale Runners', time: '1 to 2 days', days: 1.5, fast: true }] },
    { id: 'frostmere', name: 'Frostmere Reach', climate: 'Arctic, aurora skies', role: 'Whale-singers and funerals', secret: 'Knows where dead stars travel',
      text: 'Cold, ice-locked fishing islands under aurora skies. Their whale-singers are the best in the world, and many commoner whale lines trace back here. The dead are given to the sea on ice-boats lit by starfall as they sink. Stoic, ritual-minded, and close to how stars and the dead travel.',
      gov: 'Clan elders and senior whale-singers who meet in song-councils, answering to Saltglass through harbourmasters and whale-line leases.', parting: 'Sing true', angle: -75, dist: 7,
      lines: [{ line: 'Songlines', time: '7 days', days: 7 }, { line: 'Pale Runners', time: '4 days', days: 4, fast: true }] },
    { id: 'drift', name: 'The Verdant Drift', climate: 'Tropical jungle', role: 'Organised opposition', secret: 'Holds the oldest records of the Thirteenth',
      text: 'Jungle islands drifting with the tides, home to the Tide-Priests and the only temples in the world. They run themselves by tribal council and trust the land and its trees over the sea. They are ideologically opposed to the way the Admiral runs things, and the Admiralty watches them closely. Every citizen comes here once in their life on pilgrimage, and the Drift can only be navigated by specialists or the strongly star-touched. It is the one region that does not answer to Saltglass.',
      gov: 'Independent tribal council.', parting: 'Root and rain', angle: -15, dist: 5,
      lines: [{ line: 'Songlines', time: '5 days, plus time to find it', days: 5 }, { line: 'Pale Runners', time: '3 days, plus time to find it', days: 3, fast: true }] },
    { id: 'ashgrove', name: 'Ashgrove Atoll', climate: 'Arid, wind-scoured', role: 'Pirate and smuggling haven', secret: 'Criminal syndicates, a global problem',
      text: 'Pale, dry and wind-scoured, home to salt-traders and smugglers. It is the Admiral\'s blind spot, too poor and far to be worth the Lanternworks\' attention. Black-market starfall moves through here. Lampfishers dive at dusk and dry raw starfall on the salt pans, the start of the stardust trade.',
      gov: 'A Saltglass-appointed warden with thin authority. Real power sits with the broker families and the syndicates.', parting: 'Salt and silence', angle: 35, dist: 4,
      lines: [{ line: 'Deepwalkers', time: '4 days', days: 4 }, { line: 'Pale Runners', time: '2 days', days: 2, fast: true }] },
    { id: 'drowned', name: 'The Drowned Reaches', climate: 'Submerged', role: 'Ancient origin', secret: 'Remembers the House by name',
      text: 'Whole old cities beneath the waves, still lit from within. These are the oldest settlements, older than Saltglass, and some are still inhabited by people who never left. Their rhyme variants do not stop at twelve, and the deepest ruins lie near the Hollow Trench.',
      gov: 'Councils of the oldest city families, answering to Saltglass in trade and law but keeping their own customs and records.', parting: 'Deep be kind', angle: 110, dist: 1.5,
      lines: [{ line: 'Lanternbellies', time: '1 to 2 days, depending on depth', days: 1.5 }] }
  ],

  whaleLines: [
    { name: 'Harbour Greys', beast: 'Grey whales', role: 'Short ferries around Saltglass Fall and Velvet Haven. Gentle, slow, cheap.' },
    { name: 'Songlines', beast: 'Humpbacks', role: 'Long crossings between regions, handled by Frostmere whale-singers.' },
    { name: 'Deepwalkers', beast: 'Blue whales', role: 'Heavy cargo, including glass-steel from Cinderbrine.' },
    { name: 'Pale Runners', beast: 'Belugas and narwhals', role: 'Fast couriers for mail and messengers. Favored by smugglers too.' },
    { name: 'Lanternbellies', beast: 'Sperm whales', role: 'Deep-diving carriers that take passengers down to the Undertow and the Drowned Reaches.' }
  ],

  navy: [
    { cls: 'Starlight', role: 'Flagships and heavy command ships', draft: 'Orca teams' },
    { cls: 'Nova', role: 'Main warships', draft: 'Towed by trained orcas' },
    { cls: 'Vesper', role: 'Troop barges and transports', draft: 'Drawn by giant sea-turtles' },
    { cls: 'Comet', role: 'Fast scouts and couriers', draft: 'Drawn by manta rays' }
  ],
  shipNames: ['Gentle Persuasion', 'Quiet Hospitality', 'The Steeping Hour', 'Velvet Courtesy', 'Second Pot', 'Soft Refusal', 'Courteous Reply', 'Pale Warning', 'Benevolent Tide', 'Final Cup', 'Dusk Errand', 'Thin Light', 'Lacewing', 'Brinewhisper'],
  shipWords: {
    adj: ['Gentle', 'Quiet', 'Soft', 'Courteous', 'Pale', 'Benevolent', 'Patient', 'Gracious', 'Tender', 'Mild', 'Velvet', 'Last'],
    noun: ['Persuasion', 'Hospitality', 'Refusal', 'Reply', 'Warning', 'Invitation', 'Reminder', 'Arrangement', 'Farewell', 'Cup', 'Hour', 'Courtesy']
  },

  /* ---------- Starfall ---------- */
  fates: [
    { id: 'shallow', name: 'Shallow', from: 0, to: 34, title: 'Caught or burned', text: 'The star is caught or burned before it has fallen far, as in the Lanternworks\' nets. It returns as a life with a piece missing: a star-touched. The gap lets them hear the Twelve.' },
    { id: 'mid', name: 'Mid-depth', from: 34, to: 67, title: 'The cycle completes', text: 'The star completes the cycle and becomes a life. A star is believed to fall because a life is being born, and that is both folk belief and true.' },
    { id: 'deep', name: 'Deep', from: 67, to: 100, title: 'It feeds the Call', text: 'The star reaches the Hollow Trench and feeds the Call, the slow, constant pull on all dying light. The Thirteenth is still alive, and it calls every dying star down to it.' }
  ],
  whyStarsFall: [
    'Stars grow tired and lie down to rest in the sea.',
    'A star falls when someone on the surface makes a wish it cannot refuse.',
    'The sea collects a debt from the sky, one light at a time.',
    'In Saltglass, the polite version: stars fall because they are loved, and love is heavy.'
  ],
  lanternworks: [
    { t: 'Interception', d: 'Anchored glass-steel drift-nets span the sea lanes above the Hollow Trench, tended by manta teams and hauled in by steam winches.' },
    { t: 'Brine storage and sorting', d: 'Raw motes are volatile in fresh water and dormant in salt, so they are held in brine and sorted by color and age.', motes: true },
    { t: 'Quieting', d: 'Tuned brass bells ring each mote until it gives up its voice, the remembered life of the star. Without quieting, the light flares and carries visions. The stripped voice falls into the Hollow Trench and feeds the Call.' },
    { t: 'Burning', d: 'Quieted motes are fed to kilns for heat and light. A star burned this way never reaches the trench.' },
    { t: 'Casting', d: 'Part of the stock is fused with sand and salt into stable saltglass cells that can be stored and carried. This cast material is called saltglass, the same name as the city.' },
    { t: 'Allocation', d: 'The First Mate\'s office sets district quotas and issues ration tallies. The surface gets more. The Undertow gets the minimum it needs to breathe.' }
  ],
  motes: [
    { c: '#e9f6ff', n: 'Pale white', d: 'Fresh' },
    { c: '#6fb4ff', n: 'Middle blue', d: 'Middle age' },
    { c: '#e8a860', n: 'Old amber', d: 'Old' }
  ],
  grades: [
    { g: 'Lamp', form: 'Blue-white burn', use: 'Gaslamps and street light', to: 'Saltglass districts' },
    { g: 'Lift', form: 'Steam-heat burn', use: 'Steam-lifts, boilers, ships', to: 'Admiralty and harbours' },
    { g: 'Dome', form: 'Cast saltglass cells', use: 'Pressure-domes and Undertow air', to: 'Undertow, Bellgardens' },
    { g: 'Forge', form: 'Partly quieted raw', use: 'Making glass-steel', to: 'Cinderbrine, after tax' },
    { g: 'Raw', form: 'Unquieted', use: 'Never issued', to: 'Black market only' }
  ],
  touched: [
    { t: 'Sleeping visions', d: 'Star-touched get visions while they sleep.' },
    { t: 'Waking whispers', d: 'They hear whispers from time to time while awake.' },
    { t: 'Day-vision', d: 'The strongest, such as Oracles, can be hit with a day-vision: their eyes go starlight white and they are caught in the throes of a fit.' }
  ],
  touchedFacts: [
    'They appear worldwide, with stronger signals near Saltglass.',
    'Society sees them warily, as anomalies.',
    'The Admiral knows the cause. Volaro suspects it. The Tide-Priests have theories. The public does not know.',
    'They resonate with the star-beast of their birth-House, and the signal is louder near it. The longer they stay near their beast, the more the bond tightens.',
    'A star-touched who resonates with Ophiuchus would resonate with Old Counter, which no one can locate.',
    'The Quiet-born are less likely to be star-touched, and a star-touched Quiet-born is considered dangerous.'
  ],
  factions: [
    { g: 'Admiralty and old-money families', side: 'keep', stance: 'Keep the Lanternworks', why: 'Power, wealth, order' },
    { g: 'The Verdant Drift', side: 'shut', stance: 'Shut them down', why: 'Records of the Thirteenth; opposed to the Admiral' },
    { g: 'The Bearers', side: 'shut', stance: 'Shut them down', why: 'They want the star reached' },
    { g: 'Cinderbrine smiths and the Undertow', side: 'torn', stance: 'Torn', why: 'They depend on the power' },
    { g: 'Ashgrove smugglers', side: 'torn', stance: 'Profit either way', why: 'Black-market starfall' },
    { g: 'Star-touched', side: 'torn', stance: 'Divided', why: 'Some see a gift, some a wound' }
  ],
  choice: {
    keep: 'Keep the plants running and leave the star-touched be. The Admiral holds his line, burning dying stars before they reach the trench, and may be starving the world\'s afterlife. More stars burned young means more star-touched, and more stigma.',
    shut: 'Shut them down and end the effects, including the stigma the touched live with. The cost is steep: the domes, lifts and Undertow air run on starfall, and unburned stars would reach the trench and strengthen the star the Admiral comes from.'
  },
  phases: [
    { id: 'before', name: 'Before the discovery', text: 'Rumors, strange births and whispers, with nobody connecting them to the Lanternworks.' },
    { id: 'discovery', name: 'The discovery', text: 'Someone links the births to the burn schedule, through Volaro\'s ledger, Tide-Priest theories or an oracle\'s testimony.' },
    { id: 'choice', name: 'The choice', text: 'Keep the plants running, or shut them down, with each group lining up as in the board above.' },
    { id: 'aftermath', name: 'Aftermath', text: 'The consequences of either choice, for the Undertow\'s air, the star-touched and the star beneath the city.' }
  ],
  stardust: {
    intro: 'Stardust is raw starfall dried and ground to powder, skipping quieting. It is snorted, and users call it a star trip. Because it keeps its voice, a user hears scraps of a dying star\'s remembered life. They read these as messages from the Twelve, but most just get high and see random things. Only star-touched people get the real, stronger signal.',
    chain: [
      ['Harvest', 'Ashgrove lampfishers dive at dusk to net motes before they settle, and strip settled starfall from drowned ruins. Other sources are Cinderbrine skimming and lots diverted by corrupt Lanternworks clerks.'],
      ['Drying', 'Motes are spread on Ashgrove\'s salt pans in the wind until they crust.'],
      ['Grinding', 'The crust is ground in glass or agate mortars. Metal sets it off.'],
      ['Cutting', 'Diluted with salt, crushed shell or ash. Clear is rare and nearly pure. Cut is the common street grade.'],
      ['Packing', 'Sold in oilskin twists and glass vials, hidden in cargoes of salt, tea or fish.'],
      ['Shipping', 'Pale Runner belugas and narwhals carry couriers. Deepwalker blue whales carry bulk, hidden in legitimate freight.'],
      ['Selling', 'Ashgrove brokers sell to syndicates in Undertow markets and port towns, and street sellers deal in Tea House back rooms.']
    ],
    facts: [
      ['Enforcement', 'Dust is officially banned because raw starfall leaves Admiralty control. The Admiralty hunts the trade. Users are seen as pathetic and sad, not dangerous.'],
      ['Comedown', 'Hard and rough: lethargy and restlessness, presenting differently in different people.'],
      ['Cost', 'Not every dose burns a star outside the Lanternworks, but it happens. Dust can create star-touched that Volaro\'s ledger misses.']
    ]
  },
  bearers: 'An underground faction that supports the Thirteenth. Members call themselves Bearers, and the group is known as the Empty Chair. They would be labeled heretics if found. The Admiral turns a blind eye, because they support him without his understanding how or why. Some Tea House keepers quietly serve them, setting out an empty chair.',

  /* ---------- Night of Quiet Lights ---------- */
  night: [
    { time: 'Afternoon', text: 'The Lanternworks banks a reserve and lowers output. Whale-singers rest and Tea Houses prepare the quiet pot.', who: 'Lanternworks Warden, Tidewarden, Tea House keepers', lamps: [1, 1, 1, 1, 1, 0.55] },
    { time: 'Sunset', text: 'Lamps dim district by district, from the Upper Terraces down to the Undertow.', who: 'Lamplighters under the First Mate', lamps: [0.12, 0.3, 0.55, 0.75, 0.9, 0.5] },
    { time: 'Early evening', text: 'Families gather and children play "Count the Lamps". Tea steeped slow and sweet is served.', who: 'Households, Tea House keepers', lamps: [0.1, 0.1, 0.12, 0.14, 0.18, 0.3] },
    { time: '10 pm', text: 'The Whale Basin falls silent as the whale-songs stop. The Admiral walks the Velvet Haven quay.', who: 'Tidewarden, the Admiral', lamps: [0.07, 0.07, 0.09, 0.09, 0.12, 0.25] },
    { time: 'Midnight', text: 'The Twelve Names are read at the Admiralty steps. The whole city holds a silence where the thirteenth would be.', who: 'Steward-Commander', lamps: [0, 0, 0, 0, 0, 0.12] },
    { time: 'Just after midnight', text: 'The Admiral pours a cup for no one and leaves it out for the empty count.', who: 'The Admiral', lamps: [0, 0, 0, 0, 0, 0.1] },
    { time: '12:30 am', text: 'The Descent. He enters the deep lift at the Lanternworks alone, and the shaft is sealed behind him.', who: 'Quiet Hand, with Volaro on watch', lamps: [0, 0, 0, 0, 0, 0.05] },
    { time: 'Through the night', text: 'Bearers hold a vigil with an empty chair. Darker rhyme verses are sung in the Undertow and Drowned Reaches. Star-touched report their loudest signals.', who: 'Bearers, star-touched', lamps: [0, 0, 0, 0, 0, 0] },
    { time: 'Dawn', text: 'If the lift returns, lamps are relit from the Undertow upward. If not, the dark stays dark.', who: 'Volaro, the Admiral', dawn: true, lamps: [1, 1, 1, 1, 1, 1] }
  ],
  lampRows: ['Upper Terraces', 'Glasswright Quarter', 'Velvet Haven', 'Bellgardens', 'The Undertow', 'The Lanternworks'],
  rhyme: [
    'One for the lamp upon the quay,', 'Two for the tide that tends the sea,', 'Three for the glass that holds the deep,', 'Four for the secrets we all keep,',
    'Five for the whale that sings us home,', 'Six for the dark we leave alone,', 'Seven for the bell, the brass, the rain,', 'Eight for the lamps that burn again,',
    'Nine for the tea, steeped slow and sweet,', 'Ten for the stars beneath our feet,', 'Eleven for the ones who rise,', 'Twelve for the stars in all the skies.'
  ],

  /* ---------- Saltglass City ---------- */
  districts: [
    { name: 'Velvet Haven', text: 'The main harbour and the first thing every arrival sees. Dusk-colored awnings drape the docks, and whales moor in the sheltered Whale Basin. Deliberately beautiful. The glowing half-drowned man was found here.' },
    { name: 'The Upper Terraces', text: 'Stone-and-glass townhouses, tea gardens and the Admiralty. Old money lives here.' },
    { name: 'The Glasswright Quarter', text: 'Lens-grinders, brass-fitters and glassblowers. The soft-steampunk heart of the city.' },
    { name: 'The Undertow', text: 'Glass-walled neighborhoods beneath the waves, reached by pressure-lifts. The deeper you live, the less the surface rules reach you. Poorer and freer, but not lawless. The Undertow burns whale oil when its starfall ration runs short.' },
    { name: 'The Bellgardens', text: 'Domed underwater gardens growing kelp, coral and luminous flowers. Public parks, greenhouses and quiet courtships.' },
    { name: 'The Lanternworks', text: 'Where starfall is intercepted, refined and rationed. The city\'s quiet power plant, and the Admiral\'s real seat of power. The deep lift to the Descent is here.' }
  ],
  roles: [
    ['Lanternworks Warden', 'Runs the plant: intake, sorting, quieting, burning, casting. Keeps the burn schedule and reports it to the Admiral and First Mate.'],
    ['Tea House keeper', 'Hosts Admiralty dealings in public rooms and back rooms. Tips the Quiet Hand about guests who say too much. Some quietly serve Bearers.'],
    ['Whale-line handler and rider', 'Handlers feed and track whales and keep migration schedules. Riders guide passengers along a named line.'],
    ['Old-money council member', 'Holds Upper Terrace estates and shares in whale lines and tea plantations. Presses for bigger starfall quotas and trades favors with the First Mate.'],
    ['Tide-Priest', 'Never leaves the Verdant Drift. Gives blessings and oracles to pilgrims, keeps the oldest records of the Thirteenth, and helps shape the tribal council\'s opposition.'],
    ['Cinderbrine smith', 'Works starfall into glass-steel under guild oaths. Skilled, proud, resentful and strike-prone. Some quietly skim raw motes.'],
    ['Ashgrove diver and runner', 'Dives for drifting motes at dusk and strips settled starfall from ruins. Dries and sells it raw, moved by Pale Runner whales. Knows the sea lanes the patrols don\'t.'],
    ['Undertow pressure-wright', 'Maintains the domes, lifts and air systems below the waves. Notices first when air or lift pressure starts to fail.']
  ],
  ranks: [
    ['Admiral of the Fall', 'Final authority. Every treaty, arrest and appointment starts with his word. Hosts the dealings that matter over tea, sets what the Lanternworks burns and lets through, and makes the Descent.'],
    ['First Mate', 'Chief of staff and governor (Volaro). Buffer with the old-money council, fixer of the city\'s machinery, starfall allocation, outer-region diplomacy, and the continuity plan for the Descent.'],
    ['Lantern Captain', 'Senior ship commander tied to Lanternworks loyalty. Commands a flagship or Nova-class squadron and holds a sea lane, guards the net-fleets and refined starfall shipments, patrols against Ashgrove raiders, and sits at the war table.'],
    ['Steward-Commander', 'Fleet officer for tea diplomacy. Runs the pourings that seal deals with outer-region leaders, reads the Twelve Names on the Night of Quiet Lights, provisions the fleet, and notes what guests say after the Hollow-Leaf loosens their tongues.'],
    ['Tidewarden', 'A male mermaid who commands the sealife handlers. Oversees the welfare of the orca, turtle and manta teams, posts Reinsmen, sets harbour traffic rules with the whale-line guilds, and enforces the rule that star-beasts are never harnessed or harmed.'],
    ['Pourer and Under-Pourer', 'Junior officers. Pourers serve as aides and hosts. Under-Pourers are apprentices who keep logs and stand night watch. Both sit at every table, so they hear everything. The Admiral\'s network of small listeners starts here.'],
    ['Reinsman', 'Enlisted handler. Drives the orca, turtle and manta teams, cares for the animals, and crews the drift-nets for the Lanternworks.'],
    ['Quiet Hand', 'The Admiral\'s enforcers. They collect people who refuse or abuse the tea, quietly, after the pot is poured. They guard the Lanternworks and the shaft to the Descent, and watch Verdant Drift envoys and suspected Bearers. They answer only to the Admiral, though Volaro has some influence over them.', true]
  ],
  peoples: [
    { n: 'Humans', d: 'The majority, with regional variation by island chain.' },
    { n: 'Star-touched', d: 'People with a piece missing who hear the Twelve.' },
    { n: 'Seakin', d: 'Marine hybrids who have legs, walk on land and breathe underwater.' },
    { n: 'Mermaids', d: 'They turn their tails into legs for three days at a time, then must return to the sea for a week to recover. They can speak with whales, and they are contracted to the Admiralty as breeders and caretakers, which gives them quiet leverage over the whole transport network.' }
  ],
  society: [
    { n: 'The surface', d: 'Rich and somewhat watched.' },
    { n: 'The Undertow', d: 'Poorer and freer, but not lawless.' },
    { n: 'Dust-users', d: 'Seen as pathetic and sad.' },
    { n: 'Star-touched', d: 'Wary anomalies.' },
    { n: 'Cinderbrine smiths', d: 'Vital, but not treated as such.' },
    { n: 'Believers in the living Thirteenth', d: 'Called crazy by neighbors. The state would treat Bearers as heretics.' },
    { n: 'The Quiet-born', d: 'Born in the Ophiuchus window, with no birth-house. It is not a good sign. People fear them a little, but the fear never really manifests.' }
  ],
  daily: [
    ['Industries', 'Fishing, island farming, ranching and the Lanternworks. Fruit is the Verdant Drift\'s export.'],
    ['Schooling', 'Average citizens get basic schooling. Only the higher classes reach university.'],
    ['Academia', 'Research focuses on what is permitted and steers clear of forbidden topics about the Thirteenth.'],
    ['Pilgrimage', 'Everyone makes one pilgrimage in their life to the Verdant Drift, to receive a blessing or oracle from the Tide-Priests.'],
    ['Faith', 'People respect the Twelve without worshipping them. They have a birth-house and name patrons after the houses.']
  ],
  courtship: [
    'Tea is central: who pours, who accepts, and what is shared. Refusing a suitor\'s tea refuses the courtship.',
    'Gifts are shells, saltglass sculptures and candies.',
    'Higher-class courtships are long and often arranged. Engagements are marked with rings made from starfall.',
    'Common and Undertow courtships are quicker and less formal. Matches across the surface and Undertow divide are watched closely.'
  ],
  tea: {
    intro: 'Tea is the city\'s soft law. Refusing it is an insult and accepting it is a contract. A cup is poured for you at an Admiralty Tea House. What do you do?',
    choices: [
      { id: 'accept', label: 'Accept the cup', tone: 'good', out: 'You have signed a contract without a pen. The Hollow-Leaf is soothing and mildly honest, and you will say a little more than you meant to. A Pourer at the next table is listening.' },
      { id: 'late', label: 'Arrive after the required hour', tone: 'bad', out: 'Failing to brew or serve at the required times is a great offense. The room goes quiet. Someone will remember it, and in this city remembering is a kind of ledger.' },
      { id: 'badly', label: 'Brew it badly', tone: 'warn', out: 'Uncouth. Nothing worse than that, but everyone saw, and the story will outlive the tea.' },
      { id: 'spill', label: 'Spill it on purpose', tone: 'bad', out: 'A great offense. You are spilt: socially ruined. Doors that opened for you yesterday will find they are busy.' },
      { id: 'refuse', label: 'Refuse the cup', tone: 'bad', out: 'The highest offense. The Quiet Hand collects people who refuse or abuse the tea, quietly, after the pot is poured. Nobody asks where they went. You have been quieted.' }
    ]
  },

  /* ---------- Glossary ---------- */
  glossary: [
    ['Greeting', 'Fair tide', 'Reply with "And steady lamps."'],
    ['Greeting', 'Well met over tea', 'The formal Saltglass greeting.'],
    ['Farewell', 'Lamps keep you', 'Common farewell in Saltglass.'],
    ['Farewell', 'Till the next pour', 'Farewell that promises another cup.'],
    ['Farewell', 'Steep well', 'Informal farewell.'],
    ['Regional', 'Ash and iron', 'Cinderbrine parting words.'],
    ['Regional', 'Sing true', 'Frostmere Reach parting words.'],
    ['Regional', 'Root and rain', 'Verdant Drift parting words.'],
    ['Regional', 'Salt and silence', 'Ashgrove Atoll parting words.'],
    ['Regional', 'Deep be kind', 'Drowned Reaches parting words.'],
    ['Slang', 'Dusted', 'High on stardust.'],
    ['Slang', 'Gone starward', 'Died.'],
    ['Slang', 'Pay the tea', 'Face the consequences. From the rhyme.'],
    ['Slang', 'Quieted', 'Taken away by the Quiet Hand.'],
    ['Slang', 'Spilt', 'Socially ruined.'],
    ['Slang', 'Cold lamp', 'Bad luck or a dead end.'],
    ['Slang', 'Glass-hearted', 'Transparent but fragile.'],
    ['Slang', 'Hush!', 'The all-purpose mild curse. "Quiet take you" is a real one.'],
    ['Term', 'Starfall', 'The world\'s magic, fuel, currency and quiet dependency. A dying star sinking into the sea as light.'],
    ['Term', 'The Call', 'The slow, constant pull of the Thirteenth on all dying light. Star-touched people, star-beasts and whales act up when it happens, like a horse bucking.'],
    ['Term', 'Star-touched', 'A person born from a star burned before it completed the cycle. They have a piece missing and hear the Twelve.'],
    ['Term', 'Star-kin', 'What the Admiral is: a piece of the Thirteenth given a body. He hears only the Thirteenth.'],
    ['Term', 'Quiet-born', 'People born in the Ophiuchus window, between Scorpio and Sagittarius. They have no birth-house.'],
    ['Term', 'Hollow-Leaf', 'The Admiral\'s private tea, steeped with trace starfall. Soothing and mildly honest.'],
    ['Term', 'The Descent', 'The Admiral\'s yearly journey down to the source on the Night of Quiet Lights.'],
    ['Term', 'The Empty Chair', 'The Bearers\' underground faction, and the chair some Tea House keepers quietly set out for them.'],
    ['Term', 'Saltglass (cast)', 'Starfall fused with sand and salt into stable cells. It shares its name with the city.'],
    ['Term', 'Stardust', 'Raw starfall dried and ground to powder. Snorted. Users call it a star trip.'],
    ['Term', 'Hollowlings', 'Blind, pale eels lit from inside by faint starlight, found in the deep water below the city.'],
    ['Term', 'Trench choirs', 'Shoals of fish that hum in unison when the Call comes.'],
    ['Term', 'Lamp-drifters', 'Jellies that gather around burn sites at the Lanternworks.'],
    ['Term', 'Seakin', 'Marine hybrids with legs who breathe underwater.'],
    ['Term', 'Starfall gun', 'A single-shot gun powered by starfall.']
  ],

  /* ---------- Characters ---------- */
  characters: [
    { id: 'admiral', name: 'The Admiral', epithet: 'Ruler of Saltglass City', tags: ['Star-kin', 'Immortal, sort of'],
      look: 'Lavender hair and sapphire eyes that shimmer faintly with starfall light, brightest near the Lanternworks and when the Call is strong.',
      body: [
        'Known only by his title. He has a name, but it appears only on his character sheet. A piece of the Thirteenth Star given a body, only half-aware of what he is. His memories are half broken and he rules as though trying to remember.',
        'Tea is his signature obsession and his control mechanism. Every treaty, deal and arrest begins with a pot. His private blend, the Hollow-Leaf, is steeped with trace starfall. Velvet-glove manners, iron fist: people vanish quietly after tea and no one asks.',
        'He feels the Call constantly. He believes he is holding a line by burning dying stars before they reach the trench, and he may be starving the world\'s afterlife.'
      ],
      facts: [['Once a year', 'On the Night of Quiet Lights he makes the Descent. There is always a chance he never comes up.'], ['Never', 'He has never made the pilgrimage, because he fears losing control without knowing why.'], ['Blind eye', 'He turns a blind eye to the Bearers, who support him without his understanding how or why.'], ['Sea-beast', 'Old Counter. They rarely meet, only around the Descent.']] },
    { id: 'volaro', name: 'Volaro', epithet: 'First Mate of the Admiralty', tags: ['Human, 34'],
      look: '6 ft 6, white hair, lilac eyes and tan skin. Tall and lanky but deceptively strong. Loose white blouses and brown trousers, flamboyant outfits when he dresses up.',
      body: [
        'Seductive, brilliant, patient and theatrical. He speaks in hedged, poetic half-truths with many endearments, draws mechanisms on napkins, never drinks tea he hasn\'t watched poured, and keeps a brass ledger of debts.',
        'At thirteen his parents sent him abroad for a "broader education" while his twin Volara inherited the family house and the Brass Foundry\'s social influence. The Admiral took him in, and he rose to First Mate. Being sent away taught him that love is given for usefulness.'
      ],
      facts: [['Wants', 'To keep Saltglass from ruin, destroy Volara, and understand the Descent.'], ['Secret', 'A private ledger matching births near the burn districts to the burn schedule. He has told no one.'], ['Role', 'Administration, the old-money families, the city\'s machinery, starfall allocation, outer-region diplomacy, and the continuity plan for the Descent.']] },
    { id: 'volara', name: 'Volara', epithet: 'Of the Brass Foundry', tags: ['Volaro\'s twin', 'Older by two minutes'],
      look: 'Not yet described in the lorebook.',
      body: [
        'Inherited the family house and the Brass Foundry\'s social influence. The Brass Foundry is in Cinderbrine, and she builds everything there.',
        'Volaro is obsessed with her and wants to destroy what she built, because it is hers.'
      ],
      facts: [['Home', 'The Brass Foundry, Cinderbrine.']] }
  ]
};

/* ===================== v4 additions ===================== */
LORE.aesthetic = 'A melancholy, sea-borne spirituality in a world of water and drowned cities, with stately, graceful architecture and the gilded brass and sharp class divide of a rich industrial city. Water, glass, brass, and light that comes from below.';
LORE.city = {
  text: 'A city of white stone and crystal glass rising in terraces from the sea, partly underwater. Pale arches, bridges and balustrades are crowned with glass domes edged in gold filigree, and tall windows catch the light like cut crystal. Violet banners bearing the Admiralty\'s emblem hang over the terraces. Soft steampunk shows in brass lamps, steam-lifts and pressure valves, while blue-white starlight glows inside the glass and glass-roofed gardens bloom beneath the waves.',
  color: 'Violet',
  emblem: 'A golden anchor with a ribbon wound around it, topped with a star and compass, flanked by whale tails above a starry sea, all in a gold-filigree frame set with pearls.',
  hint: 'The ribbon is a subtle, deliberate hint of the serpent.'
};

/* Star-beast art: silhouette kind (fallback drawing) and portrait image.
   Replace img with your own hosted image URLs. Leave "" to use the drawn silhouette. */
const BEAST_ART = {
  aries:       { kind: 'narwhal',  img: 'img/beasts/aries.webp', cut: 'img/cut/aries.webp', faces: 'right' },
  taurus:      { kind: 'dugong',   img: 'img/beasts/taurus.webp', cut: 'img/cut/taurus.webp', faces: 'left' },
  gemini:      { kind: 'manta',    img: 'img/beasts/gemini.webp', cut: 'img/cut/gemini.webp', faces: 'right' },
  cancer:      { kind: 'turtle',   img: 'img/beasts/cancer.webp', cut: 'img/cut/cancer.webp', faces: 'left' },
  leo:         { kind: 'seal',     img: 'img/beasts/leo.webp', cut: 'img/cut/leo.webp', faces: 'right' },
  virgo:       { kind: 'nautilus', img: 'img/beasts/virgo.webp', cut: 'img/cut/virgo.webp', faces: 'left' },
  libra:       { kind: 'fish',     img: 'img/beasts/libra.webp', cut: 'img/cut/libra.webp', faces: 'right' },
  scorpio:     { kind: 'serpent',  img: 'img/beasts/scorpio.webp', cut: 'img/cut/scorpio.webp', faces: 'left' },
  gap:         { kind: 'counter',  img: '' },
  sagittarius: { kind: 'jelly',    img: 'img/beasts/sagittarius.webp', cut: 'img/cut/sagittarius.webp', faces: 'right' },
  capricorn:   { kind: 'whale',    img: 'img/beasts/capricorn.webp', cut: 'img/cut/capricorn.webp', faces: 'left' },
  aquarius:    { kind: 'whale',    img: 'img/beasts/aquarius.webp', cut: 'img/cut/aquarius.webp', faces: 'left' },
  pisces:      { kind: 'twain',    img: 'img/beasts/pisces.webp', cut: 'img/cut/pisces.webp', faces: 'right' }
};
LORE.houses.forEach(h => Object.assign(h.beast, BEAST_ART[h.id]));

/* Constellations as drawn in the Saltglass sky (stylised, 0-100 box). */
LORE.sky = {
  aries:       { p: [[8,64],[34,44],[62,36],[90,40],[40,76]], e: [[0,1],[1,2],[2,3],[1,4]] },
  taurus:      { p: [[48,58],[34,46],[20,38],[62,46],[76,36],[92,12],[90,74]], e: [[2,1],[1,0],[0,3],[3,4],[4,5],[4,6]] },
  gemini:      { p: [[34,12],[58,12],[36,34],[58,34],[34,56],[60,56],[32,84],[64,84],[47,45]], e: [[0,2],[2,4],[4,6],[1,3],[3,5],[5,7],[2,8],[8,3]] },
  cancer:      { p: [[50,50],[32,26],[70,24],[28,76],[68,80]], e: [[0,1],[0,2],[0,3],[0,4]] },
  leo:         { p: [[30,76],[26,58],[32,42],[44,32],[54,40],[64,34],[88,36],[82,66]], e: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,5]] },
  virgo:       { p: [[62,84],[50,64],[44,46],[26,36],[62,42],[76,30],[90,18]], e: [[0,1],[1,2],[2,3],[2,4],[4,5],[5,6]] },
  libra:       { p: [[50,18],[24,44],[76,40],[32,76],[70,74]], e: [[0,1],[1,3],[0,2],[2,4],[1,2]] },
  scorpio:     { p: [[18,14],[30,30],[34,46],[44,58],[56,66],[70,68],[82,58],[80,44],[90,40],[12,40]], e: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[1,9]] },
  sagittarius: { p: [[30,42],[44,30],[60,34],[64,54],[50,68],[34,62],[46,50],[72,24],[90,10]], e: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,6],[6,3],[7,8]] },
  capricorn:   { p: [[12,30],[34,58],[56,76],[80,54],[88,30],[60,42]], e: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]] },
  aquarius:    { p: [[28,30],[44,22],[56,34],[40,42],[60,54],[54,68],[68,80],[60,94]], e: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6],[6,7]] },
  pisces:      { p: [[16,30],[30,20],[42,34],[28,42],[56,54],[74,70],[88,62],[92,78],[78,84]], e: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6],[6,7],[7,8],[8,5]] },
  gap:         { p: [[50,10],[34,28],[66,28],[22,52],[78,52],[50,50],[36,88],[64,88]], e: [[0,1],[0,2],[1,5],[2,5],[1,3],[2,4],[5,6],[5,7]] }
};

/* The living sea: working animals, the navy's draft animals and trench creatures. */
LORE.living = [
  { id: 'harbour-greys', img: 'img/creatures/harbour-greys.webp', faces: 'right', name: 'Harbour Greys', kind: 'whale', depth: 14, size: 1.1, tag: 'Whale line', text: 'Grey whales on the short ferry runs around Saltglass Fall and Velvet Haven. Gentle, slow, cheap.' },
  { id: 'songlines', img: 'img/creatures/songlines.webp', faces: 'left', name: 'Songlines', kind: 'whale', depth: 26, size: 1.3, tag: 'Whale line', text: 'Humpbacks on the long crossings between regions, handled by Frostmere whale-singers.' },
  { id: 'pale-runners', img: 'img/creatures/pale-runners.webp', faces: 'left', name: 'Pale Runners', kind: 'narwhal', depth: 20, size: .6, fast: true, tag: 'Whale line', text: 'Belugas and narwhals carrying mail and messengers at twice the speed. Smugglers favor them too.' },
  { id: 'deepwalkers', img: 'img/creatures/deepwalkers.webp', faces: 'left', name: 'Deepwalkers', kind: 'whale', depth: 42, size: 1.9, tag: 'Whale line', text: 'Blue whales hauling heavy cargo, including glass-steel from Cinderbrine.' },
  { id: 'lanternbellies', img: 'img/creatures/lanternbellies.webp', faces: 'left', name: 'Lanternbellies', kind: 'whale', depth: 60, size: 1.5, tag: 'Whale line', text: 'Sperm whales that dive deep with passengers, down to the Undertow and the Drowned Reaches.' },
  { id: 'orca-teams', img: 'img/creatures/orca-teams.webp', faces: 'left', name: 'Orca teams', kind: 'orca', depth: 34, size: 1.0, tag: 'Admiralty fleet', text: 'Trained orcas tow the Admiralty\'s warships and flagships.' },
  { id: 'sea-turtles', img: 'img/creatures/sea-turtles.webp', faces: 'left', name: 'Giant sea-turtles', kind: 'turtle', depth: 48, size: 1.1, tag: 'Admiralty fleet', text: 'Slow and enormous, they draw the troop barges.' },
  { id: 'mantas', img: 'img/creatures/mantas.webp', faces: 'right', name: 'Manta teams', kind: 'manta', depth: 30, size: .9, fast: true, tag: 'Admiralty fleet', text: 'Fast scouts are drawn by manta rays. Manta teams also tend the Lanternworks\' drift-nets.' },
  { id: 'lamp-drifters', img: 'img/creatures/lamp-drifters.webp', faces: 'right', name: 'Lamp-drifters', kind: 'jelly', depth: 72, size: .8, tag: 'Trench-touched', text: 'Jellies that gather around burn sites at the Lanternworks.' },
  { id: 'trench-choirs', img: 'img/creatures/trench-choirs.webp', faces: 'right', name: 'Trench choirs', kind: 'fish', depth: 80, size: .5, tag: 'Trench-touched', text: 'Shoals of fish that hum in unison when the Call comes.' },
  { id: 'hollowlings', img: 'img/creatures/hollowlings.webp', faces: 'left', name: 'Hollowlings', kind: 'serpent', depth: 90, size: .8, glow: true, tag: 'Trench-touched', text: 'Blind, pale eels lit from inside by faint starlight, found in the deep water below the city.' }
];
LORE.landAnimals = 'Land animals are few, on the larger islands: cat-like creatures, some birds and a few canine types. Only fish and birds are eaten.';

/* Hollow Trench: a place on the map (not a region bots live in). */
LORE.trench = {
  name: 'The Hollow Trench', sub: 'The deepest trench of the sea',
  first: 'The deepest trench of the sea, and the root of everything in Saltglass.',
  facts: [['Beneath', 'Saltglass City sits directly above it'], ['The star', 'The Thirteenth is alive down here'], ['Its pull', 'The Call, drawing every dying star'], ['Creatures', 'Hollowlings, trench choirs, lamp-drifters']],
  text: 'The Thirteenth Star fell into the deepest trench of the sea and took root over the Hollow Trench, and Saltglass City grew above it. The star is still alive, and it calls every dying star down to it. A falling star that goes deep enough reaches the trench and feeds the Call. The deepest districts of the city hum faintly with the star\'s light, and the deepest ruins of the Drowned Reaches lie near it. Hollowlings drift in the dark below the city, blind pale eels lit from inside by faint starlight. Trench choirs, shoals of fish, hum in unison when the Call comes.'
};

/* The Drowned Reaches' verses, sung after the twelfth line. */
LORE.rhyme2 = [
  ['Thirteen fell while the Twelve looked on,', 'Down to the dark where the lamps are gone.', 'Down in the deep it keeps a light,', 'Calling the dying through the night.'],
  ['Once a year when the lamps burn low,', 'One goes down where the cold lights glow.', 'Hush, and wait, and do not say', 'If he comes back by break of day.']
];
LORE.rhymeEnd = ['Twelve and done, and hush, and tea,', 'Nothing more to count, you see.'];

/* Place art for the map popups. Files live in img/places/. */
LORE.placeImg = {
  drift: 'img/places/drift.webp',
  fall: 'img/places/fall.webp',
  trench: 'img/places/trench.webp',
  frostmere: 'img/places/frostmere.webp',
  ashgrove: 'img/places/ashgrove.webp',
  cinderbrine: 'img/places/cinderbrine.webp',
  drowned: 'img/places/drowned.webp'
};
LORE.districtImg = {
  'Velvet Haven': 'img/places/velvet-haven.webp',
  'The Lanternworks': 'img/places/lanternworks.webp'
};
