# Fanta.club front-end

Static site, no build step.

## Deploy (GitHub Pages)
Upload everything in this folder to a repo (index.html at the top level), then Settings → Pages → Deploy from a branch → main / root.

## Run
Open `index.html`, or serve the folder: `npx serve .` / `python3 -m http.server`.

## Structure
- `index.html` – page shell (header, social bar, modal)
- `css/fonts.css` – local Inter @font-face (files in `assets/fonts/`)
- `css/base.css` – theme tokens, header, home hero
- `css/profile.css` – profile page
- `css/modal.css` – login / register modal, toast
- `js/auth.js` – account storage + SHA-256 hashing (localStorage, demo only)
- `js/app.js` – views, modal, events
- `assets/img/logo.png` – logo

## Test account
Nickname `Low`, password `1234` (seeded in `js/auth.js`).

## Note
Accounts live in the browser's localStorage, so this is a demo. For real users,
replace `js/auth.js` with server routes (e.g. Next.js + Prisma) and hash passwords on the server.
