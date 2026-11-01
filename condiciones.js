/* ALMMA · condiciones de uso y acuerdo de tratamiento de datos (migracion/76_aceptacion_condiciones.sql)
   - El TEXTO está aquí, en un único sitio. Lo usan la ventana de aceptación y condiciones.html.
   - Si se cambia el texto, hay que subir VERSION_CONDICIONES: así la web lo vuelve a pedir a todos.
   - Solo la pide al ADMINISTRADOR de la tienda (aceptar en nombre de la tienda); Arturo y José ven quién ha aceptado en Administración → Condiciones.
   - Cada página de tienda llama a:  await exigirCondiciones(client);  tras comprobar quién ha entrado. */
const VERSION_CONDICIONES = "2.0 (01-11-2026)";
const EMAIL_CONTACTO = "info@almma.es";

const CONDICIONES_HTML = `
<h2>Condiciones de uso, política de privacidad y acuerdo de tratamiento de datos</h2>
<p class="c-version">Versión ${VERSION_CONDICIONES}</p>
<p class="c-resumen"><b>En resumen:</b> esta web sirve para que tu tienda haga pedidos a ALMMA y siga cómo van (recepción en almacén, montaje y facturas).
Los datos de tus clientes son de tu tienda: ALMMA solo los usa para entregar y montar, no los cede ni los vende. Tú te encargas de cuidar tus claves
y de informar a tus clientes. Aquí tienes el detalle.</p>

<h3>1. Quiénes somos</h3>
<p><b>ALMMA</b>. Titular: Arturo Vera Sierra, NIF 22690383D, C/ San Isidro, 73, 46133 Meliana (Valencia). Contacto: <b>${EMAIL_CONTACTO}</b>.
Presta a las tiendas el servicio de recepción y almacenaje de mercancía, entrega y montaje en casa del cliente final. Esta web es la herramienta
con la que se gestiona ese servicio.</p>

<h3>2. Quién acepta este documento</h3>
<p>Lo acepta <b>el administrador de la tienda</b>, en nombre de la tienda, la primera vez que entra (y otra vez si el texto cambia). Al aceptar declara que tiene
poder para obligar a la tienda. El resto de personas de la tienda que usan la web (vendedores) quedan sujetas a estas normas de uso. Se guarda quién aceptó, de qué tienda,
cuándo y qué versión del texto, y esa constancia la conserva ALMMA.</p>

<h3>3. Uso de la web</h3>
<ul>
<li>Cada cuenta es <b>personal e intransferible</b>: se usa para gestionar los pedidos de la tienda con ALMMA, nada más. No se prestan las claves.</li>
<li>Cada persona ve solo lo que le corresponde: el administrador, todo lo de su tienda (o tiendas); el vendedor, solo sus propios pedidos.</li>
<li><b>Histórico visible desde 2026.</b> La web muestra a las tiendas únicamente pedidos, albaranes, fotos y facturas del año 2026 en adelante. Lo anterior
no aparece porque procede del sistema antiguo y puede contener errores; si necesitas algún dato anterior, pídelo a ALMMA.</li>
<li>Lo que se escribe en la web (pedidos, referencias, direcciones, teléfonos) debe ser <b>veraz y completo</b>: ALMMA actúa según lo que la tienda registra.</li>
<li>Las fechas de entrega y montaje se acuerdan con el cliente final; las que aparecen en pantalla son previsiones salvo que se confirmen.</li>
<li>ALMMA procura que la web esté siempre disponible, pero no puede garantizar que no haya interrupciones puntuales por mantenimiento o fallos de terceros.</li>
<li>ALMMA puede suspender una cuenta si se usa de forma indebida o si termina la relación con la tienda.</li>
</ul>

<h3>4. Quién es quién con los datos</h3>
<ul>
<li><b>Datos de los clientes finales</b> de la tienda: <b>la tienda es la «responsable del tratamiento»</b> (son sus clientes y decide para qué se usan sus datos) y
<b>ALMMA es la «encargada del tratamiento»</b>: solo los maneja por encargo de la tienda. Este apartado y los siguientes son el acuerdo que exige el art. 28 del
Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018.</li>
<li><b>Datos de las personas que usan la web</b> (apartado 9) y <b>datos de la propia tienda para facturar</b>: aquí <b>ALMMA es la responsable</b>.</li>
</ul>

<h3>5. Datos de los clientes finales: qué se trata, para qué y cuánto tiempo</h3>
<ul>
<li><b>Datos:</b> nombre, dirección y teléfonos del cliente final; referencia y contenido del pedido; observaciones; fotos del montaje; y firma del cliente al recibir y dar conformidad.</li>
<li><b>Finalidad:</b> únicamente recibir, almacenar, entregar y montar la mercancía, atender incidencias y facturar el servicio a la tienda. Ni publicidad, ni ninguna otra cosa.</li>
<li><b>Duración:</b> mientras dure la relación entre la tienda y ALMMA, y después lo que obliguen los plazos legales (apartado 8).</li>
</ul>

<h3>6. Qué se compromete a hacer ALMMA</h3>
<ol type="a">
<li>Tratar los datos <b>solo siguiendo las instrucciones de la tienda</b> (los pedidos que ella registra son esas instrucciones). Si cree que una instrucción incumple la normativa, se lo dirá.</li>
<li><b>Confidencialidad:</b> las personas de ALMMA y los montadores que acceden a los datos están obligados a guardar secreto, también cuando termine su relación con ALMMA. Cada montador solo ve los montajes que tiene asignados.</li>
<li><b>Seguridad:</b> acceso con usuario y contraseña personales, permisos por tienda (cada tienda solo ve lo suyo), conexión cifrada y control de quién accede a qué.</li>
<li><b>Proveedores que ayudan a ALMMA</b> (alojamiento de la base de datos, publicación de la web, lectura automática de documentos mediante inteligencia artificial). La tienda los autoriza de forma general. ALMMA les exige las mismas obligaciones de protección y avisará si cambia alguno importante. Si algún dato saliera del Espacio Económico Europeo, será con las garantías que exige la ley.</li>
<li><b>Derechos de los clientes finales</b> (acceso, rectificación, supresión…): si alguno se dirige a ALMMA, se lo trasladará a la tienda y la ayudará a responder.</li>
<li><b>Fugas de seguridad:</b> si ALMMA detecta que se han expuesto datos, avisará a la tienda sin demora y, como máximo, en 48 horas, con la información que tenga.</li>
<li><b>No cederá los datos a terceros</b>, salvo obligación legal (por ejemplo, Hacienda o un juzgado).</li>
<li><b>Colaboración:</b> facilitará a la tienda la información razonable para comprobar que se cumple este acuerdo.</li>
<li><b>Al terminar el servicio:</b> a petición de la tienda, ALMMA le devolverá los datos o los borrará, conservando bloqueado solo lo que la ley obligue a guardar (por ejemplo, las facturas).</li>
</ol>

<h3>7. Qué se compromete a hacer la tienda</h3>
<ul>
<li>Tener derecho a usar los datos que introduce y <b>informar a sus clientes</b> de que los comparte con ALMMA y con el montador para entregar y montar su pedido.</li>
<li>Introducir <b>solo los datos necesarios</b> y ninguno especialmente sensible (salud, ideología, religión…).</li>
<li>Mantener sus <b>claves en secreto</b>, no compartirlas y avisar a ALMMA enseguida si se pierden o alguien las conoce. Dar de baja a quien deje de trabajar en la tienda.</li>
<li>Revisar que lo que escribe es correcto.</li>
<li>No intentar acceder a datos de otras tiendas ni usar la web para otro fin que el pactado.</li>
</ul>

<h3>8. Facturas y conservación</h3>
<p>Las facturas emitidas desde la web no se pueden modificar ni borrar: si hay un error se corrige con una factura rectificativa. Las facturas y su documentación se
conservan durante los plazos que exige la normativa mercantil y tributaria (con carácter general, 6 años), aunque la tienda deje de usar el servicio. Cada factura puede llevar un
código QR que lleva a su consulta en la web; solo funciona con el código largo de esa factura, y la tienda debe tratar ese enlace como confidencial.</p>

<h3>9. Datos de las personas que usan la web (ALMMA es la responsable)</h3>
<ul>
<li><b>Qué datos:</b> nombre, email, teléfono de contacto, tienda a la que pertenecen y registros de su actividad en la web (qué pedido crea o consulta, mensajes del chat y cuándo aceptó estas condiciones).</li>
<li><b>Para qué:</b> crear y mantener su cuenta, prestar el servicio, mantener la seguridad y atender consultas. Base: ejecución del contrato con la tienda e interés legítimo en la seguridad del sistema.</li>
<li><b>Cuánto tiempo:</b> mientras la cuenta esté activa y después, bloqueados, durante los plazos legales.</li>
<li><b>A quién:</b> no se ceden a terceros salvo obligación legal; solo los proveedores técnicos del apartado 6.d acceden a ellos por encargo de ALMMA.</li>
<li><b>Tus derechos:</b> acceso, rectificación, supresión, oposición, limitación y portabilidad, escribiendo a <b>${EMAIL_CONTACTO}</b>. Si no estás conforme, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</li>
</ul>

<h3>10. Cookies y almacenamiento en tu dispositivo</h3>
<p>Esta web <b>no usa cookies de publicidad ni de analítica</b> y no rastrea tu navegación. Solo guarda en tu dispositivo lo imprescindible para funcionar: la sesión
(para que no tengas que identificarte en cada pantalla), algunas preferencias (como la tienda elegida) y datos temporales para que la aplicación abra más rápido y funcione si se corta la conexión.
Al ser técnicas e imprescindibles, no necesitan consentimiento. Puedes borrarlas desde tu navegador, pero entonces tendrás que volver a iniciar sesión.</p>

<h3>11. Responsabilidad</h3>
<p>ALMMA responde de prestar el servicio con diligencia. No responde de daños por datos erróneos introducidos por la tienda, por un mal uso de las claves, ni por interrupciones
ajenas a su control. La responsabilidad sobre la mercancía y el montaje se rige por lo pactado entre la tienda y ALMMA para cada servicio.</p>

<h3>12. Cambios en este documento</h3>
<p>Si el texto cambia, la web pedirá al administrador que lo acepte de nuevo. Las aceptaciones anteriores se conservan.</p>

<h3>13. Ley aplicable</h3>
<p>Este acuerdo se rige por la ley española y por el RGPD. Para cualquier discrepancia, los juzgados de Valencia.</p>

<h3>14. Aceptación</h3>
<p>Al pulsar «Acepto» declaras que actúas en nombre de la tienda, que puedes aceptar estas condiciones por ella y que has leído este documento.</p>
`;

const CONDICIONES_CSS = `
.c-caja h2{font-size:18px;margin:0 0 4px;color:#1e3a8a} .c-caja h3{font-size:14px;margin:16px 0 4px;color:#1e3a8a}
.c-caja p,.c-caja li{font-size:13px;line-height:1.5;margin:4px 0} .c-caja ul,.c-caja ol{margin:4px 0;padding-left:22px}
.c-caja .c-version{color:#6b7280;font-size:12px} .c-caja .c-resumen{background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:8px 12px}`;

/* Pregunta a la base de datos si esta persona ya aceptó la versión actual; si no, muestra la ventana y
   no devuelve hasta que acepta. Si NO acepta, cierra la sesión. Si la comprobación falla (p. ej. todavía no
   se ha ejecutado el SQL 76), deja pasar para no bloquear la web. */
async function exigirCondiciones(cliente) {
  let ya;
  try {
    // Solo el administrador de la tienda acepta (en nombre de la tienda). Vendedores y personal de ALMMA no ven la ventana.
    const { data: { user } } = await cliente.auth.getUser();
    if (!user) return;
    const { data: dep } = await cliente.from("dependientes").select("es_admin_tienda").eq("user_id", user.id).maybeSingle();
    if (!dep || !dep.es_admin_tienda) return;
    const { data, error } = await cliente.rpc("condiciones_aceptadas", { p_version: VERSION_CONDICIONES });
    if (error) { console.warn("Condiciones:", error.message); return; }
    ya = data;
  } catch (e) { return; }
  if (ya) return;
  await new Promise(listo => {
    const st = document.createElement("style"); st.textContent = CONDICIONES_CSS +
      `#c-fondo{position:fixed;inset:0;background:rgba(15,23,42,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:12px}
       #c-ventana{background:#fff;border-radius:10px;max-width:760px;width:100%;max-height:92vh;max-height:92dvh;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#1f2430}
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
