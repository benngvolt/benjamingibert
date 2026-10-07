// Prérendu au build : ouvre chaque page du site dans un vrai Chrome (headless), attend que React ait
// affiché la page, puis enregistre le HTML obtenu dans build/. Google (et tout robot qui ne lit pas
// bien le JavaScript) reçoit ainsi directement le contenu, les liens et les balises <head> de chaque page.
// Les routes viennent de public/sitemap.xml (une seule liste à maintenir).
//
// Sortie : "/" -> build/index.html (remplace la coquille vide), "/about" -> build/about.html, etc.
// Si Chrome est introuvable ou qu'une page échoue, le build reste valide : le site fonctionne comme avant.
const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
};

function routesFromSitemap() {
  const xml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const p = new URL(m[1]).pathname.replace(/\/+$/, '');
    return p || '/';
  });
}

// Serveur statique local avec le même repli que la prod : toute URL inconnue renvoie la coquille.
function serve(shell) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(BUILD, path.normalize(urlPath));
      const isAsset = urlPath !== '/' && file.startsWith(BUILD) && fs.existsSync(file) && fs.statSync(file).isFile();
      if (isAsset && path.basename(file) !== 'index.html') {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(shell);
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  // puppeteer-core est un module ESM : import dynamique obligatoire depuis ce fichier CommonJS.
  // Si l'import échoue (Node trop ancien…), le build continue sans prérendu au lieu d'échouer.
  const puppeteer = (await import('puppeteer-core')).default;
  const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!chrome) {
    console.warn('[prerender] Chrome introuvable (définis CHROME_PATH) : prérendu ignoré, le site reste en SPA classique.');
    return;
  }
  const shell = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
  if (shell.includes('data-prerendered-route')) {
    console.log('[prerender] build déjà prérendu, rien à faire.');
    return;
  }

  const routes = routesFromSitemap();
  const server = await serve(shell);
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });

  const results = [];
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setRequestInterception(true);
      // Les vidéos/audio ne servent pas au HTML et ralentiraient l'attente de fin de chargement.
      page.on('request', (r) => (r.resourceType() === 'media' ? r.abort() : r.continue()));
      page.on('pageerror', (e) => console.warn('[prerender] ' + route + ' : erreur JS : ' + e.message));
      try {
        await page.goto(base + route, { waitUntil: 'networkidle2', timeout: 60000 });
        await page.waitForFunction(() => document.getElementById('root').children.length > 0, { timeout: 30000 });
        await new Promise((r) => setTimeout(r, 1500));
        await page.evaluate((r) => {
          const root = document.getElementById('root');
          root.setAttribute('data-prerendered-route', r);
          // React retrouve la frontière <Suspense> (index.js) grâce à ces commentaires, que ferait un vrai
          // rendu serveur. Sans eux, l'hydratation échoue (erreur #418) et tout est re-rendu côté client.
          // Deux nœuds texte voisins (ex. {a}{b} en JSX) fusionnent quand le HTML est relu : on les sépare
          // par <!-- -->, comme le fait le rendu serveur de React, pour que l'hydratation les retrouve.
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          const adjacent = [];
          for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            if (n.nextSibling && n.nextSibling.nodeType === Node.TEXT_NODE) adjacent.push(n);
          }
          adjacent.forEach((n) => n.parentNode.insertBefore(document.createComment(' '), n.nextSibling));
          root.insertBefore(document.createComment('$'), root.firstChild);
          root.appendChild(document.createComment('/$'));
        }, route);
        results.push({ route, html: await page.content() });
        console.log('[prerender] OK  ' + route);
      } catch (e) {
        console.warn('[prerender] ÉCHEC ' + route + ' : ' + e.message);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  // Écriture seulement à la fin : le serveur local ci-dessus doit servir la coquille intacte jusque-là.
  for (const { route, html } of results) {
    const out = route === '/' ? 'index.html' : route.slice(1) + '.html';
    fs.writeFileSync(path.join(BUILD, out), html);
  }
  console.log('[prerender] ' + results.length + '/' + routes.length + ' pages prérendues.');
}

main().catch((e) => {
  console.warn('[prerender] erreur inattendue, prérendu ignoré : ' + e.message);
});
