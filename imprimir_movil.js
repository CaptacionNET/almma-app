/* ALMMA · ayudas para imprimir y abrir documentos desde el móvil.
   En el móvil `window.print()` falla con frecuencia (sobre todo en la app instalada) y `window.open()` después de
   esperar a Supabase lo bloquea el navegador. Aquí hay tres piezas:
   - abrirNueva(url): abre un documento; si el navegador bloquea la ventana nueva, lo abre en la misma pestaña.
   - abrirPdf(blob, nombre): abre un PDF ya hecho (ventana ya abierta, o la hoja de compartir del móvil, o descarga).
   - imprimirPagina({elementos|selector, nombre, titulo, quitar}): en ordenador imprime como siempre; en móvil crea un PDF
     de esos elementos y lo abre (desde el visor del móvil se imprime o se comparte). */
(function () {
  const esMovil = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));

  function abrirNueva(url) {
    const w = window.open(url, "_blank");
    if (!w) location.href = url;
  }

  // abre una ventana en blanco YA (dentro del toque del usuario) para llenarla después, cuando el PDF esté listo
  function ventanaPrevia() { try { return window.open("", "_blank"); } catch (_) { return null; } }

  async function abrirPdf(blob, nombre, w) {
    const fichero = new File([blob], nombre, { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
    if (w && !w.closed) { w.location.href = url; return; }
    if (navigator.canShare && navigator.canShare({ files: [fichero] })) {
      try { await navigator.share({ files: [fichero], title: nombre }); return; } catch (e) { if (e && e.name === "AbortError") return; }
    }
    location.href = url;
  }

  function cargarScript(src) {
    return new Promise((ok, ko) => {
      if ([...document.scripts].some(s => s.src === src)) return ok();
      const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => ko(new Error("No se pudo cargar el generador de PDF (¿sin conexión?)"));
      document.head.appendChild(s);
    });
  }

  // Convierte elementos de la pantalla en un PDF A4 vertical (se copian a un lienzo ancho para que las tablas no salgan encogidas)
  async function pdfDeElementos(elementos, opciones) {
    opciones = opciones || {};
    await cargarScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    await cargarScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const ancho = opciones.ancho || 1000;
    const cont = document.createElement("div");
    cont.style.cssText = "position:fixed;left:-20000px;top:0;width:" + ancho + "px;background:#fff;color:#111;padding:16px;font-family:Arial,sans-serif;";
    if (opciones.titulo) { const h = document.createElement("h2"); h.textContent = opciones.titulo; h.style.margin = "0 0 10px"; cont.appendChild(h); }
    elementos.forEach(el => { const c = el.cloneNode(true); c.style.margin = "0"; c.style.maxWidth = "none"; c.style.overflow = "visible"; cont.appendChild(c); });
    (opciones.quitar ? cont.querySelectorAll(opciones.quitar) : []).forEach(n => n.remove());
    cont.querySelectorAll("img").forEach(i => { if (!/^data:/.test(i.src)) i.remove(); });   // las fotos con enlace temporal no entran en el PDF
    document.body.appendChild(cont);
    try {
      const c = await html2canvas(cont, { scale: 1.6, backgroundColor: "#ffffff", useCORS: true, windowWidth: ancho + 40 });
      const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", compress: true });
      const altoPag = Math.floor(c.width * 297 / 210);
      for (let y = 0, primera = true; y < c.height - 2; y += altoPag) {
        const trozo = document.createElement("canvas");
        trozo.width = c.width; trozo.height = Math.min(altoPag, c.height - y);
        trozo.getContext("2d").drawImage(c, 0, y, c.width, trozo.height, 0, 0, c.width, trozo.height);
        if (!primera) pdf.addPage(); primera = false;
        pdf.addImage(trozo.toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, 210, trozo.height * 210 / c.width);
      }
      return pdf.output("blob");
    } finally { cont.remove(); }
  }

  async function imprimirPagina(opciones) {
    opciones = opciones || {};
    if (!esMovil()) { if (opciones.antes) opciones.antes(); window.print(); return; }
    const w = ventanaPrevia();
    try {
      if (opciones.antes) opciones.antes();
      const els = opciones.elementos || [...document.querySelectorAll(opciones.selector)];
      if (!els.length) throw new Error("No hay nada que imprimir");
      const blob = await pdfDeElementos(els, opciones);
      await abrirPdf(blob, (opciones.nombre || "listado") + ".pdf", w);
    } catch (e) { if (w) w.close(); alert("No se pudo crear el PDF: " + (e.message || e)); }
  }

  Object.assign(window, { esMovil, abrirNueva, ventanaPrevia, abrirPdf, pdfDeElementos, imprimirPagina });
})();
