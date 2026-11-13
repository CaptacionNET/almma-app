/* Distancia por carretera entre la TIENDA y la dirección del cliente (aviso si pasa de 30 km).
   Usa mapas abiertos de OpenStreetMap: Nominatim (dirección -> coordenadas) y OSRM (ruta más rápida en coche).
   Uso:  const d = DistanciaTienda.vincular({ client, dir: "idInputDireccion", loc: "idInputLocalidad", caja: "idDivAviso", tiendaId: () => idTienda });
         d.refrescar();   // por ejemplo cuando se cambia la tienda
   Se vuelve a calcular solo cuando se escribe la dirección o la localidad. No guarda nada en la base de datos. */
(function () {
  const LIMITE_KM = 30;
  const NOMINATIM = "https://nominatim.openstreetmap.org/search";
  const OSRM = "https://router.project-osrm.org/route/v1/driving/";
  const cache = {};   // texto de la dirección -> {lat, lon, aprox} | null
  const lsGet = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return undefined; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento: no pasa nada */ } };

  // Nominatim pide como máximo 1 consulta por segundo: se hacen en cola
  let cola = Promise.resolve();
  const espera = (ms) => new Promise(r => setTimeout(r, ms));
  function buscar(q) {
    const res = cola.then(async () => {
      const r = await fetch(NOMINATIM + "?format=json&limit=1&countrycodes=es&q=" + encodeURIComponent(q), { headers: { "Accept-Language": "es" } });
      await espera(1100);
      if (!r.ok) throw new Error("mapa no disponible");
      const j = await r.json();
      return j && j[0] ? { lat: +j[0].lat, lon: +j[0].lon } : null;
    });
    cola = res.catch(() => {});
    return res;
  }
  async function coordenadas(partes) {
    const limpias = partes.map(p => String(p || "").trim()).filter(Boolean);
    if (!limpias.length) return null;
    const q = limpias.join(", ");
    const k = "dist_geo:" + q.toLowerCase();
    if (k in cache) return cache[k];
    const guardado = lsGet(k);
    if (guardado !== undefined && guardado !== null) { cache[k] = guardado; return guardado; }
    const p = await buscar(q);
    if (p) { cache[k] = p; lsSet(k, p); }
    return p;
  }
  async function km(a, b) {
    const k = "dist_ruta:" + [a.lat, a.lon, b.lat, b.lon].map(n => n.toFixed(4)).join(",");
    const g = lsGet(k);
    if (typeof g === "number") return g;
    const r = await fetch(OSRM + a.lon + "," + a.lat + ";" + b.lon + "," + b.lat + "?overview=false");
    if (!r.ok) throw new Error("ruta no disponible");
    const j = await r.json();
    if (!j.routes || !j.routes[0]) return null;
    const v = j.routes[0].distance / 1000;
    lsSet(k, v);
    return v;
  }

  const tiendas = {};   // id -> fila de tiendas
  async function datosTienda(client, id) {
    if (!id) return null;
    if (tiendas[id]) return tiendas[id];
    const { data } = await client.from("tiendas").select("direccion, cp, localidad, provincia").eq("id", id).maybeSingle();
    if (data) tiendas[id] = data;
    return data;
  }

  function vincular(o) {
    const el = (id) => document.getElementById(id);
    let turno = 0, temporizador = null;
    const pintar = (html, color) => { const c = el(o.caja); if (c) { c.innerHTML = html; c.style.cssText = "margin-top:4px;font-size:12px;" + (color ? "color:" + color + ";" : ""); } };

    async function calcular() {
      const mio = ++turno;
      const dir = el(o.dir).value.trim(), loc = el(o.loc).value.trim();
      if (!dir && !loc) { pintar(""); return; }
      const idT = o.tiendaId();
      if (!idT) { pintar("Elige la tienda para calcular la distancia.", "#6b7280"); return; }
      pintar("Calculando distancia desde la tienda…", "#6b7280");
      try {
        const t = await datosTienda(o.client, idT);
        if (!t || !(t.direccion || t.localidad)) { pintar("La tienda no tiene dirección en su ficha: no se puede calcular la distancia.", "#6b7280"); return; }
        const origen = await coordenadas([t.direccion, t.cp, t.localidad, "España"]) || await coordenadas([t.localidad, t.provincia, "España"]);
        let destino = await coordenadas([dir, loc, "España"]), aprox = false;
        if (!destino && loc) { destino = await coordenadas([loc, "España"]); aprox = true; }
        if (mio !== turno) return;
        if (!origen) { pintar("No se ha podido situar la dirección de la tienda en el mapa.", "#6b7280"); return; }
        if (!destino) { pintar("No se ha encontrado esa dirección en el mapa: revisa cómo está escrita.", "#b45309"); return; }
        const d = await km(origen, destino);
        if (mio !== turno) return;
        if (d == null) { pintar("No se ha podido calcular la ruta por carretera.", "#6b7280"); return; }
        const txt = d.toLocaleString("es-ES", { maximumFractionDigits: 1 }) + " km por carretera desde la tienda" + (aprox ? " (aprox., solo por la localidad)" : "");
        if (d > LIMITE_KM) pintar("⚠️ <b>Más de " + LIMITE_KM + " km</b> · " + txt, "#b91c1c");
        else pintar("✔ " + txt, "#15803d");
      } catch (e) {
        console.error("distancia.js:", e);
        if (mio === turno) pintar("No se pudo calcular la distancia ahora mismo (mapa sin respuesta).", "#6b7280");
      }
    }
    const programar = () => { clearTimeout(temporizador); temporizador = setTimeout(calcular, 1200); };
    ["dir", "loc"].forEach(k => { const e = el(o[k]); if (e) { e.addEventListener("input", programar); e.addEventListener("change", programar); } });
    return { refrescar: () => { clearTimeout(temporizador); return calcular(); } };
  }

  window.DistanciaTienda = { vincular, LIMITE_KM };
})();
