// ALMMA · service worker de la pantalla "Mi día" (mi-dia.html)
// Guarda en el móvil la propia aplicación (pantalla, iconos y la librería) para que se abra
// aunque no haya cobertura. Los DATOS (montajes del día) y las fotos/firmas pendientes los
// guarda la propia pantalla en el móvil; esto solo cubre el "programa".
// Estrategia: primero intenta la red (para recibir mejoras) pero con un límite de 4 segundos;
// si no hay cobertura o va muy lenta, usa lo guardado.
const V = "almma-mi-dia-v1";
const PROPIOS = ["mi-dia.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const LIBRERIAS = ["cdn.jsdelivr.net"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(PROPIOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function conLimite(req, ms) {
  return new Promise((ok, ko) => {
    const t = setTimeout(() => ko(new Error("lento")), ms);
    fetch(req).then(r => { clearTimeout(t); ok(r); }, e => { clearTimeout(t); ko(e); });
  });
}
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  const propio = url.origin === location.origin && PROPIOS.some(p => url.pathname.endsWith("/" + p) || url.pathname === "/" + p);
  const libreria = LIBRERIAS.includes(url.hostname);
  if (!propio && !libreria) return;           // todo lo demás (Supabase, otras páginas) va directo a la red
  e.respondWith(
    conLimite(req, 4000).then(r => {
      if (r && r.ok) { const copia = r.clone(); caches.open(V).then(c => c.put(req, copia)); }
      return r;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || Response.error()))
  );
});
