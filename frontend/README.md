# Benjamin Gibert — site

React 19 + [Vite](https://vite.dev), avec prérendu des pages au build.

## Prérequis

Node.js ≥ 22.12 (ou 20.19+). Pour le prérendu : Chrome installé (ou `CHROME_PATH`).

## Scripts

- `npm run dev` (ou `npm start`) : serveur de développement sur http://localhost:3000
- `npm run build` : build Vite dans `build/`, puis `scripts/prerender.js` génère le HTML de chaque page listée dans `public/sitemap.xml`
- `npm run preview` : sert le build localement

En production : image Docker (build + prérendu avec Chromium, puis nginx, voir `nginx.conf`).
