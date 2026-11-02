# Saltglass site: setup and adding bots

The site is a folder of plain files. Nothing to install or build.
Open `index.html` by double-clicking it to preview it on your computer.

---

## 1. Put it online (pick one)

**GitHub Pages (you already use this for The Brass Foundry).**
Create a repository, upload everything in this folder, then Settings > Pages > deploy from the main branch.
Your site appears at `https://YOUR-NAME.github.io/REPO-NAME/`.

**Google Cloud Storage.**
1. Create a bucket (Cloud Console > Cloud Storage > Create).
2. Upload everything in this folder, keeping the `css`, `js` and `img` folders.
3. Permissions tab > Grant access > principal `allUsers`, role `Storage Object Viewer`.
4. Open `https://storage.googleapis.com/YOUR-BUCKET/index.html`.

**Firebase Hosting.** Easiest HTTPS and a short address:
`firebase init hosting`, choose this folder as the public directory, then `firebase deploy`.

---

## 2. Easiest way to add bots: a Google Form feeding a Google Sheet

Creators fill in a form. You tick "yes" on a row. The bot appears on the site within a few minutes.
No files to edit, no re-uploading.

### The form
Your form already works as is. The site ignores anything after a dash in a question title, so "TAGLINE — One line that sells the bot" is read as Tagline.
It reads these questions: Bot name, Creator name, Tagline, Role, Region, Birth house, Story phase, Tags, Content notes, Image URL.
Every other question whose answer is a web link (Saucepan, CrushOn.AI, Linkin.Love, Tipsychat, CraveU and so on) becomes a button on the bot, named after the question. To add a new site, add a question with the site's name. Nothing in the code changes.

### Connect the Sheet
1. In the form, open **Responses** and click **Link to Sheets**.
2. In the Sheet, add one more column at the far right with the heading **Approved**.
   Only rows with `yes` in that column appear on the site. This is your moderation switch.
3. In the Sheet: **File > Share > Publish to web**. Choose the form responses tab and **Comma-separated values (.csv)**, then **Publish**. Copy the link.
4. Open `config.js` and paste that link between the quotes of `SHEET_CSV_URL`.
5. In the form, click **Send**, copy the link, and paste it as `FORM_URL` in `config.js`.
6. Re-upload `config.js`. That is the last time you touch code.

`bots-sheet-template.csv` shows what a filled-in row looks like. You can also import it into a new Sheet to start.

### Portraits
The Image URL must be a direct link to an image (it ends in .png, .jpg or .webp).
Image hosts like imgbb or gifyu work, and so does a file in your Cloud Storage bucket with public access.
Google Drive "share" links do not work as image links.
No portrait? The card draws a constellation with the bot's initial, using the bot's birth-house stars.

---

## 3. Adding a bot by hand (no form)
Open `bots.js`, copy an entry, and fill it in. The "Write an entry by hand" box on the Bots page writes the entry for you.
A bot in the Sheet with the same name replaces the one in `bots.js`.

---

## 4. Where things live

| To change | Open |
|---|---|
| Story text, regions, rules, glossary, festivals | `lore.js` |
| Star-beast portraits (the 12 images) | `lore.js`, the `BEAST_ART` list near the bottom. Paste a new image link next to each beast. |
| Links, Discord, the Sheet and Form | `config.js` |
| Built-in bots | `bots.js` |
| Colors and looks | `css/style.css` (colors are at the top) |
| The map picture and its clickable spots | `img/map.webp`, and the `PLACES` list near the top of `js/v-voyage.js` (x and y are percentages across and down the picture) |
| Logo and divider | `img/logo.webp`, `img/divider.webp` |

Any beast or bot image that fails to load is replaced by a drawn constellation silhouette, so nothing ever shows as a broken picture.

## 5. Music player
Two round buttons sit at the bottom left of every page. The note button plays and pauses. The list button opens the soundtrack window, with track choices, previous and next, a progress bar, volume, and a switch for click sounds (chimes and whale song).
The music keeps playing when visitors move between pages, and it remembers the track, spot and volume if they come back.

To add songs:
1. Put your mp3 files in the `music` folder (or upload them to Google Cloud Storage and use the full links).
2. Open `music.js` and add one line per song:
   `{ name: 'The Saltglass Theme', src: 'music/saltglass-theme.mp3', by: 'Your name' },`
3. Re-upload `music.js` and the `music` folder.

Songs play one after another. The built-in generated ambience (waves, a low drone, soft chimes) is always the last entry, so the player works even with no files.
Use mp3 files under about 10 MB each so the page stays quick. Avoid spaces in file names.
Only upload music you have the right to share.
