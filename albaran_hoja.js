/* Hoja del ALBARÁN DE ENTREGA (la usan albaran_salida.html y factura_imprimir.html).
   Si la orden ya tiene entrega firmada, la hoja lleva la firma del cliente, su nombre y la fecha. */
(function () {
  const css = `
.hoja.alb .tienda{line-height:1.5;}
.hoja.alb .tienda strong{font-size:16px;}
.hoja.alb .logo{display:block;max-height:20mm;max-width:65mm;object-fit:contain;margin-bottom:6px;}
.hoja.alb .titulo .num{font-size:14px;}
.hoja.alb .caja{margin-top:14px;border:1px solid var(--line);border-radius:6px;padding:10px 14px;line-height:1.5;}
.hoja.alb .caja .et{font-size:10px;text-transform:uppercase;color:var(--muted);letter-spacing:.6px;}
.hoja.alb .datos{display:flex;gap:30px;margin-top:12px;color:var(--muted);flex-wrap:wrap;}
.hoja.alb .datos b{color:var(--text);}
.hoja.alb table{width:100%;border-collapse:collapse;margin-top:16px;}
.hoja.alb thead{display:table-header-group;}
.hoja.alb tr{break-inside:avoid;page-break-inside:avoid;}
.hoja.alb th{background:#f1f4fa;text-align:left;padding:7px 8px;border-bottom:2px solid var(--line);font-size:12px;}
.hoja.alb td{padding:7px 8px;border-bottom:1px solid #e6eaf2;vertical-align:top;}
.hoja.alb td.num,.hoja.alb th.num{text-align:right;white-space:nowrap;}
.hoja.alb .obs{margin-top:14px;padding:8px 12px;border:1px solid var(--line);border-radius:6px;}
.hoja.alb .firmas{margin-top:auto;padding-top:30px;display:flex;gap:20px;break-inside:avoid;}
.hoja.alb .firma{width:50%;border:1px solid var(--text);border-radius:4px;height:38mm;padding:6px 10px;font-size:12px;overflow:hidden;}
.hoja.alb .firma .sub{color:var(--muted);font-size:11px;margin-top:2px;}
.hoja.alb .firma img{display:block;max-height:22mm;max-width:100%;object-fit:contain;margin-top:2px;}
.hoja.alb .nota{margin-top:10px;font-size:11px;color:var(--muted);}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const fechaES = (v) => v ? String(v).slice(8, 10) + "/" + String(v).slice(5, 7) + "/" + String(v).slice(0, 4) : "";

  // Descarga la imagen de la firma y la devuelve como data URL (así sale también en el PDF). null si no hay o no se puede.
  window.firmaEntregaDataUrl = async function (client, entrega) {
    if (!entrega || !entrega.firma_storage_path) return null;
    try {
      const { data, error } = await client.storage.from("ordenes-adjuntos").download(entrega.firma_storage_path);
      if (error || !data) return null;
      return await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => ok(null); r.readAsDataURL(data); });
    } catch (e) { return null; }
  };

  // Junta las líneas que son el mismo artículo (misma referencia y descripción) en una sola, sumando las cantidades.
  // Sirve cuando al leer el pedido de la tienda se han duplicado líneas.
  const norm = (s) => String(s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
  window.agruparLineasAlbaran = function (lins) {
    const grupos = new Map();
    lins.forEach(l => {
      const k = norm(l.articulo) + "|" + norm(l.descripcion);
      const g = grupos.get(k);
      if (g) g.cantidad = (Number(g.cantidad) || 0) + (Number(l.cantidad) || 0);
      else grupos.set(k, { ...l, cantidad: l.cantidad == null ? null : Number(l.cantidad) });
    });
    return [...grupos.values()];
  };

  // o = orden, t = tienda (con _logo opcional), lins = líneas, entrega = fila de `entregas` (o null), firmaImg = data URL (o null)
  // opciones.agrupar = true -> las líneas iguales se juntan en una
  window.hojaAlbaran = function (o, t, lins, entrega, firmaImg, opciones) {
    if (opciones && opciones.agrupar) lins = window.agruparLineasAlbaran(lins);
    const filas = lins.map(l => `<tr>
      <td>${esc(l.descripcion || l.articulo || "")}${l.articulo && l.descripcion ? `<div style="color:var(--muted);font-size:11px;">Ref. ${esc(l.articulo)}</div>` : ""}</td>
      <td class="num">${l.cantidad ?? ""}</td></tr>`).join("");
    const loc = [t.cp, t.localidad].filter(Boolean).map(esc).join(" ") + (t.provincia ? " (" + esc(t.provincia) + ")" : "");
    const fechaDoc = entrega && entrega.firmado_at ? String(entrega.firmado_at).slice(0, 10) : (o.fecha_prev_montaje ? String(o.fecha_prev_montaje).slice(0, 10) : "");
    const firmaHtml = entrega
      ? `<div class="firma">Firma del cliente${firmaImg ? `<img src="${firmaImg}" alt="Firma">` : ""}
          <div class="sub">Nombre: <b>${esc(entrega.firmante_nombre || "")}</b></div>
          <div class="sub">Firmado el ${entrega.firmado_at ? new Date(entrega.firmado_at).toLocaleString("es-ES") : ""}</div></div>`
      : `<div class="firma">Firma y DNI de quien recoge / recibe la mercancía<div class="sub">Nombre:</div></div>`;
    return `<div class="hoja alb">
    <div class="cab">
      <div class="tienda">${t._logo && String(t._logo).startsWith("data:image/") ? `<img class="logo" src="${t._logo}" alt="">` : ""}<strong>${esc(t.nombre_comercial || t.nombre || "")}</strong>
        ${t.nombre_comercial && t.nombre && t.nombre !== t.nombre_comercial ? `<br>${esc(t.nombre)}` : ""}
        ${t.cif ? `<br>CIF: ${esc(t.cif)}` : ""}${t.direccion ? `<br>${esc(t.direccion)}` : ""}${loc ? `<br>${loc}` : ""}
        ${t.telefono ? `<br>Tel.: ${esc(t.telefono)}` : ""}${t.email ? `<br>${esc(t.email)}` : ""}</div>
      <div class="titulo"><div class="tipo">ALBARÁN DE ENTREGA</div>
        <div class="num">Orden ${o.anyo}/${o.orden}</div>
        <div style="color:var(--muted);margin-top:2px;">Fecha: ${fechaDoc ? fechaES(fechaDoc) : "<b>SIN AGENDAR</b>"}</div></div>
    </div>
    <div class="caja"><div class="et">Cliente</div><strong>${esc(o.nombre_cli || "")}</strong>
      ${o.dni_cli ? `<br>DNI: ${esc(o.dni_cli)}` : ""}${o.domicilio_cli ? `<br>${esc(o.domicilio_cli)}` : ""}${o.localidad_cli ? `<br>${esc(o.localidad_cli)}` : ""}
      ${o.telefono_cli || o.telefono2_cli ? `<br>Tel.: ${[o.telefono_cli, o.telefono2_cli].filter(Boolean).map(esc).join(" / ")}` : ""}</div>
    <div class="datos">
      <span>Orden: <b>${o.anyo}/${o.orden}</b></span>
      ${o.num_pedido ? `<span>Referencia de pedido: <b>${esc(o.num_pedido)}</b></span>` : ""}
    </div>
    <table>
      <thead><tr><th>Artículo</th><th class="num">Cant.</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>
    ${o.obs_albaran ? `<div class="obs"><b>Observaciones:</b> ${esc(o.obs_albaran)}</div>` : ""}
    <div class="firmas">${firmaHtml}</div>
    <div class="nota">Con su firma, el firmante confirma haber recibido la mercancía relacionada en buen estado, salvo anotación en contrario.</div>
  </div>`;
  };
})();
