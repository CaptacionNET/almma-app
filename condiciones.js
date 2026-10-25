/* ALMMA · condiciones de uso y acuerdo de tratamiento de datos (migracion/76_aceptacion_condiciones.sql)
   - El TEXTO está aquí, en un único sitio. Lo usan la ventana de aceptación y condiciones.html.
   - Si se cambia el texto, hay que subir VERSION_CONDICIONES: así la web lo vuelve a pedir a todos.
   - Cada página de tienda llama a:  await exigirCondiciones(client);  tras comprobar quién ha entrado. */
const VERSION_CONDICIONES = "1.0 (24-10-2026)";

const CONDICIONES_HTML = `
<h2>Condiciones de uso y acuerdo de tratamiento de datos</h2>
<p class="c-version">Versión ${VERSION_CONDICIONES}</p>

<h3>1. Quiénes somos y para qué sirve este documento</h3>
<p><b>ALMMA</b> (titular: Arturo Vera Sierra, NIF 22690383D, C/ San Isidro, 73, 46133 Meliana, Valencia; contacto: <b>[email de contacto]</b>)
presta a las tiendas el servicio de recepción y almacenaje de mercancía, entrega y montaje en casa del cliente final. Para ello la tienda
usa esta web, donde registra sus pedidos y consulta cómo van.</p>
<p>Este documento recoge las normas de uso de la web y, además, es el <b>acuerdo de tratamiento de datos</b> que exige el artículo 28 del
Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 entre la tienda y ALMMA.</p>

<h3>2. Quién es quién con los datos</h3>
<ul>
<li><b>La tienda es la «responsable del tratamiento»</b>: los clientes finales son suyos y es ella quien decide para qué se usan sus datos.</li>
<li><b>ALMMA es la «encargada del tratamiento»</b>: solo maneja esos datos por encargo de la tienda, para prestarle el servicio.</li>
</ul>

<h3>3. Qué datos se tratan, para qué y durante cuánto tiempo</h3>
<ul>
<li><b>Datos:</b> nombre, dirección y teléfonos del cliente final, referencia y contenido del pedido, observaciones, fotos del montaje y firma del cliente al recibir y dar conforme.</li>
<li><b>Finalidad:</b> únicamente recibir, almacenar, entregar y montar la mercancía, atender incidencias y facturar el servicio. ALMMA no los usa para nada más (ni publicidad, ni se los da a nadie).</li>
<li><b>Duración:</b> mientras dure la relación entre la tienda y ALMMA. Al terminar se aplica el apartado 4.i.</li>
</ul>

<h3>4. Qué se compromete a hacer ALMMA</h3>
<ol type="a">
<li>Tratar los datos <b>solo siguiendo las instrucciones de la tienda</b> (los pedidos y encargos que ella registra son esas instrucciones) y para el servicio contratado. Si ALMMA considera que una instrucción incumple la normativa, se lo dirá.</li>
<li><b>Confidencialidad:</b> las personas de ALMMA y los montadores que acceden a los datos están obligados a mantenerlos en secreto, también cuando termine su relación con ALMMA. Cada montador solo ve los montajes que tiene asignados.</li>
<li><b>Seguridad:</b> acceso con usuario y contraseña personales, permisos por tienda (cada tienda solo ve sus pedidos), conexión cifrada y copias de seguridad.</li>
<li><b>Proveedores que ayudan a ALMMA</b> (alojamiento de la base de datos y publicación de la web). La tienda los autoriza de forma general. ALMMA exigirá a cada uno las mismas obligaciones de protección y avisará a la tienda si cambia alguno importante. Si algún dato saliera del Espacio Económico Europeo, será con las garantías que exige la ley.</li>
<li><b>Derechos de los clientes finales</b> (acceso, rectificación, supresión…): si un cliente se dirige a ALMMA, se lo trasladará a la tienda; y ayudará a la tienda a responder.</li>
<li><b>Fugas de seguridad:</b> si ALMMA detecta que se han expuesto datos, avisará a la tienda sin demora y, como máximo, en 48 horas, con la información de la que disponga.</li>
<li><b>No cederá los datos a terceros</b>, salvo obligación legal (por ejemplo, Hacienda o un juzgado).</li>
<li><b>Colaboración:</b> facilitará a la tienda la información razonable para comprobar que se cumple este acuerdo.</li>
<li><b>Al terminar el servicio:</b> a petición de la tienda, ALMMA le devolverá los datos o los borrará. Podrá conservar, bloqueados y sin usarlos, solo los que la ley le obligue a guardar (por ejemplo, las facturas).</li>
</ol>

<h3>5. Qué se compromete a hacer la tienda</h3>
<ul>
<li>Tener derecho a usar los datos que introduce, y <b>informar a sus clientes</b> de que los comparte con ALMMA y con el montador para entregar y montar su pedido.</li>
<li>Introducir <b>solo los datos necesarios</b> y ninguno especialmente sensible (salud, ideología, religión…).</li>
<li>Mantener sus <b>claves personales en secreto</b>, no compartirlas y avisar a ALMMA si se pierden o alguien las conoce.</li>
<li>Revisar que lo que escribe es correcto: ALMMA actúa según lo que la tienda registra.</li>
</ul>

<h3>6. Uso de la web</h3>
<ul>
<li>Cada cuenta es <b>personal e intransferible</b> y sirve para gestionar los pedidos de la tienda con ALMMA, nada más.</li>
<li>ALMMA procura que la web esté siempre disponible, pero no puede garantizar que no haya interrupciones puntuales.</li>
<li>ALMMA puede suspender una cuenta si se usa de forma indebida o si termina la relación con la tienda.</li>
</ul>

<h3>7. Tus datos como usuario de la web</h3>
<p>De las personas que usan la web (nombre, email, teléfono de contacto) es <b>responsable ALMMA</b>, que los usa solo para crear y mantener su cuenta y
prestar el servicio (base: ejecución del contrato). Se conservan mientras la cuenta esté activa y después, bloqueados, durante los plazos legales.
No se ceden a terceros salvo obligación legal. Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
escribiendo al contacto del apartado 1; y, si no estás conforme, reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>

<h3>8. Aceptación</h3>
<p>Al pulsar «Acepto» declaras que actúas en nombre de la tienda y que puedes aceptar estas condiciones por ella. Se guardará quién ha aceptado, de qué tienda,
la fecha y la versión del texto. Si el texto cambia, se te pedirá aceptarlo de nuevo.</p>

<h3>9. Ley aplicable</h3>
<p>Este acuerdo se rige por la ley española y por el RGPD. Para cualquier discrepancia, los juzgados de Valencia.</p>
`;

const CONDICIONES_CSS = `
.c-caja h2{font-size:18px;margin:0 0 4px;color:#1e3a8a} .c-caja h3{font-size:14px;margin:16px 0 4px;color:#1e3a8a}
.c-caja p,.c-caja li{font-size:13px;line-height:1.5;margin:4px 0} .c-caja ul,.c-caja ol{margin:4px 0;padding-left:22px}
.c-caja .c-version{color:#6b7280;font-size:12px}`;

/* Pregunta a la base de datos si esta persona ya aceptó la versión actual; si no, muestra la ventana y
   no devuelve hasta que acepta. Si NO acepta, cierra la sesión. Si la comprobación falla (p. ej. todavía no
   se ha ejecutado el SQL 76), deja pasar para no bloquear la web. */
async function exigirCondiciones(cliente) {
  let ya;
  try {
    const { data, error } = await cliente.rpc("condiciones_aceptadas", { p_version: VERSION_CONDICIONES });
    if (error) { console.warn("Condiciones:", error.message); return; }
    ya = data;
  } catch (e) { return; }
  if (ya) return;
  await new Promise(listo => {
    const st = document.createElement("style"); st.textContent = CONDICIONES_CSS +
      `#c-fondo{position:fixed;inset:0;background:rgba(15,23,42,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:12px}
       #c-ventana{background:#fff;border-radius:10px;max-width:760px;width:100%;max-height:92vh;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#1f2430}
       #c-texto{overflow:auto;padding:18px 22px;flex:1} #c-pie{padding:12px 22px;border-top:1px solid #e2e4eb;display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;align-items:center}
       #c-pie button{border:none;padding:10px 18px;border-radius:6px;font-size:14px;cursor:pointer} #c-si{background:#2563eb;color:#fff;font-weight:600} #c-si:disabled{opacity:.5;cursor:default}
       #c-no{background:#e5e7eb;color:#374151} #c-pie a{font-size:12px;color:#2563eb;margin-right:auto} #c-err{color:#b91c1c;font-size:12px;width:100%;text-align:right}`;
    document.head.appendChild(st);
    const fondo = document.createElement("div"); fondo.id = "c-fondo";
    fondo.innerHTML = '<div id="c-ventana"><div id="c-texto" class="c-caja">' + CONDICIONES_HTML + '</div><div id="c-pie"><a href="condiciones.html" target="_blank">Abrir en otra pestaña / imprimir</a>' +
      '<button id="c-no">No acepto</button><button id="c-si">Acepto</button><div id="c-err"></div></div></div>';
    document.body.appendChild(fondo);
    document.getElementById("c-no").onclick = async () => { await cliente.auth.signOut(); location.href = "login.html"; };
    document.getElementById("c-si").onclick = async function () {
      this.disabled = true;
      const { error } = await cliente.rpc("aceptar_condiciones", { p_version: VERSION_CONDICIONES, p_navegador: navigator.userAgent });
      if (error) { this.disabled = false; document.getElementById("c-err").textContent = "No se pudo guardar: " + error.message; return; }
      fondo.remove(); listo();
    };
  });
}
