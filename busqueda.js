/* Búsquedas que no distinguen tildes, mayúsculas, apóstrofos ni signos.
   - normBusq(texto): para filtrar listas ya cargadas en la pantalla.
   - patronBusq(texto): para buscar en la base de datos con ilike (cada vocal pasa a «cualquier letra», así
     «garcia» encuentra «García»; los signos y espacios pasan a «cualquier cosa»: «o'brien» encuentra «OBrien»). */
(function () {
  const sinTildes = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "");
  window.normBusq = (s) => sinTildes(s).toLowerCase().replace(/[^a-z0-9ñ]+/g, " ").trim().replace(/ñ/g, "n");
  window.normBusqDato = (s) => sinTildes(s).toLowerCase().replace(/ñ/g, "n").replace(/[^a-z0-9]+/g, " ");
  window.patronBusq = (s) => {
    const toks = sinTildes(s).toLowerCase().split(/[^a-z0-9ñ]+/).filter(Boolean);
    if (!toks.length) return "%";
    return "%" + toks.map(t => t.replace(/[aeiou]/g, "_")).join("%") + "%";
  };
})();
