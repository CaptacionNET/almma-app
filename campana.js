// Campanita de avisos (migracion/114_avisos_y_campanita.sql).
// Uso: iniciarCampana(client, "staff")  o  iniciarCampana(client, "tienda")
// Junta en un solo sitio: avisos (archivos subidos, lista para agendar, orden completa) y mensajes de chat sin leer.
// Si el SQL 114 aún no está ejecutado, solo enseña los mensajes de chat y no da error.
(function () {
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ICONO = { archivo: "📎", listo_agendar: "📅", orden_completa: "✅", chat: "💬" };

  window.iniciarCampana = function (client, rol) {
    if (document.getElementById("campana_btn")) return;
    const enlace = (a, o) => (rol === "staff" ? "pedidos.html" : "orden_tienda.html") + "?anyo=" + a + "&orden=" + o;
    let items = [], tiendas = {}, abierta = false;

    const st = document.createElement("style");
    st.textContent =
      "#campana_btn{position:fixed;right:16px;bottom:16px;z-index:10000;width:52px;height:52px;border-radius:50%;border:none;background:#1e40af;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.3)}" +
      "#campana_num{position:absolute;top:-4px;right:-4px;min-width:22px;height:22px;border-radius:11px;background:#dc2626;color:#fff;font:700 12px -apple-system,Arial,sans-serif;display:none;align-items:center;justify-content:center;padding:0 5px}" +
      "#campana_panel{position:fixed;right:16px;bottom:78px;z-index:10000;width:min(420px,calc(100vw - 32px));max-height:70vh;background:#fff;border:1px solid #cbd5e1;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.25);display:none;flex-direction:column;font:14px -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#111827}" +
      "#campana_panel .cab{display:flex;gap:8px;align-items:center;padding:10px 12px;border-bottom:1px solid #e5e7eb}" +
      "#campana_panel .cab b{flex:1}#campana_panel .cab select{max-width:150px;padding:3px;font-size:12px}" +
      "#campana_panel .cab button,#campana_panel .it button{border:1px solid #cbd5e1;background:#f8fafc;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:12px}" +
      "#campana_lista{overflow-y:auto}" +
      "#campana_panel .it{display:flex;gap:8px;align-items:flex-start;padding:9px 12px;border-bottom:1px solid #f1f5f9}" +
      "#campana_panel .it a{color:#1e40af;font-weight:600;text-decoration:none}#campana_panel .it .m{flex:1}" +
      "#campana_panel .it .f{color:#6b7280;font-size:12px}";
    document.head.appendChild(st);

    const btn = document.createElement("button");
    btn.id = "campana_btn"; btn.title = "Avisos"; btn.innerHTML = '🔔<span id="campana_num"></span>';
    const panel = document.createElement("div");
    panel.id = "campana_panel";
    panel.innerHTML = '<div class="cab"><b>🔔 Avisos</b>' + (rol === "staff" ? '<select id="campana_tienda"><option value="">Todas las tiendas</option></select>' : "") +
      '<button id="campana_todos">Quitar todos</button></div><div id="campana_lista"></div>';
    document.body.appendChild(btn); document.body.appendChild(panel);

    function pintar() {
      const num = document.getElementById("campana_num");
      num.textContent = items.length > 99 ? "99+" : items.length; num.style.display = items.length ? "flex" : "none";
      if (!abierta) return;
      const sel = document.getElementById("campana_tienda");
      const filtro = sel ? sel.value : "";
      const ver = items.filter(i => !filtro || i.tienda_id === filtro);
      document.getElementById("campana_lista").innerHTML = ver.map(i =>
        '<div class="it"><div style="font-size:18px">' + ICONO[i.tipo] + '</div><div class="m"><a href="' + enlace(i.anyo, i.orden) + '">Orden ' + i.anyo + "/" + i.orden + "</a>" +
        (rol === "staff" && tiendas[i.tienda_id] ? " · " + esc(tiendas[i.tienda_id]) : "") + "<br>" + esc(i.texto) +
        (i.creado_en ? '<div class="f">' + new Date(i.creado_en).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }) + "</div>" : "") + "</div>" +
        (i.id ? '<button data-id="' + i.id + '" title="Quitar de la lista">✕</button>' : "") + "</div>"
      ).join("") || '<div style="padding:18px;text-align:center;color:#6b7280">No hay avisos pendientes 🎉</div>';
      document.querySelectorAll("#campana_lista button[data-id]").forEach(b => b.onclick = async () => { await client.rpc("quitar_avisos", { p_ids: [b.dataset.id] }); cargar(); });
    }

    async function cargar() {
      let lista = [];
      try {
        const r = await client.from("avisos").select("id, tipo, anyo, orden, tienda_id, texto, creado_en").is("atendido_en", null).order("creado_en", { ascending: false }).limit(200);
        if (!r.error) lista = r.data || [];
      } catch (_) {}
      try {
        const c = await client.rpc("ordenes_con_chat_sin_leer");
        (c.data || []).forEach(m => lista.push({ id: null, tipo: "chat", anyo: m.anyo, orden: m.orden, tienda_id: null, texto: "Mensaje sin leer en el chat (se quita al abrir la orden)", creado_en: null }));
      } catch (_) {}
      items = lista;
      if (rol === "staff") {
        const falta = [...new Set(items.map(i => i.tienda_id).filter(t => t && !tiendas[t]))];
        if (falta.length) {
          const t = await client.from("tiendas").select("id, nombre").in("id", falta);
          (t.data || []).forEach(x => tiendas[x.id] = x.nombre);
          const sel = document.getElementById("campana_tienda");
          const actual = sel.value;
          sel.innerHTML = '<option value="">Todas las tiendas</option>' + Object.entries(tiendas).sort((a, b) => a[1].localeCompare(b[1])).map(([id, n]) => '<option value="' + id + '">' + esc(n) + "</option>").join("");
          sel.value = actual;
        }
      }
      pintar();
    }

    btn.onclick = () => { abierta = !abierta; panel.style.display = abierta ? "flex" : "none"; pintar(); };
    document.getElementById("campana_todos").onclick = async () => {
      const ids = items.filter(i => i.id).map(i => i.id);
      if (!ids.length) return;
      if (!confirm("¿Quitar de la lista " + ids.length + " avisos? Los mensajes de chat se quitan al abrir la orden.")) return;
      await client.rpc("quitar_avisos", { p_ids: ids }); cargar();
    };
    const sel = document.getElementById("campana_tienda"); if (sel) sel.onchange = pintar;
    cargar(); setInterval(cargar, 60000);
  };
})();
