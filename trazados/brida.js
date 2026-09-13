const $ = id => document.getElementById(id);
let ultimoResultado = null;
let ultimoSVG = '';

/* ---------- Utilidad de formato: 1 decimal, sin ".0" ---------- */
function fmt1(v){
  const r = Math.round(v * 10) / 10;
  return (r % 1 === 0) ? r.toFixed(0) : r.toFixed(1);
}

/* ---------- Utilidad de formato: 2 decimales, sin ".00" ---------- */
function fmt2(v){
  const r = Math.round(v * 100) / 100;
  return (r % 1 === 0) ? r.toFixed(0) : r.toFixed(2);
}

/* ---------- Esquema de entrada ---------- */
function renderEsquema(){
  const cont = $('esquemaEntrada');
  if(!cont) return;
  const ruta = 'img/brida_esquema.png';
  const test = new Image();
  test.onload  = () => { cont.innerHTML = '<img src="' + ruta + '" style="width:50%;display:block;margin:0 auto" alt="esquema brida">'; };
  test.onerror = () => { cont.innerHTML = ''; };
  test.src = ruta;
}

/* ---------- Lectura de campos ---------- */
function leer(id, minimo = 0){
  const el = $('in_' + id);
  if(!el) throw new Error('Falta el campo ' + id);
  const v = parseFloat(el.value);
  if(isNaN(v)) throw new Error('El campo "' + id + '" está vacío o no es numérico.');
  if(v <= minimo) throw new Error('El campo "' + id + '" debe ser mayor que ' + minimo + '.');
  return v;
}

/* ---------- Avisos ---------- */
function aviso(msg, tipo = 'error'){
  const a = $('aviso');
  a.textContent = msg;
  a.className = 'aviso ' + tipo;
  setTimeout(() => { a.className = 'aviso'; }, 5000);
}

/* ---------- Utilidades trigonométricas ---------- */
const rad = g => g * Math.PI / 180;
const deg = r => r * 180 / Math.PI;

/* ---------- Cálculo principal ----------
 * Dado el radio K de la circunferencia de centros de orificios y el número N
 * de orificios repartidos uniformemente:
 *
 *   paso angular  = 360 / N          (grados)
 *   cuerda        = 2 · K · sen(180° / N)
 *   perímetro     = 2π K
 *   diámetro      = 2K
 *
 * La cuerda es la distancia entre centros de dos orificios consecutivos.
 */
function calcularBrida(K, N){
  if(N < 3){
    throw new Error('El número de orificios debe ser al menos 3.');
  }
  if(N > 200){
    throw new Error('El número de orificios parece excesivo (máx. 200).');
  }

  const pasoDeg = 360 / N;
  const pasoRad = rad(pasoDeg);

  // Cuerda: lado del polígono regular inscrito en la circunferencia de radio K
  const cuerda = 2 * K * Math.sin(pasoRad / 2);

  // Otra forma equivalente: cuerda = 2·K·sen(180°/N)
  const cuerda2 = 2 * K * Math.sin(rad(180) / N);

  const perimetro = 2 * Math.PI * K;
  const diametro  = 2 * K;

  return { K, N, pasoDeg, cuerda, perimetro, diametro };
}

/* ---------- Botón Calcular ---------- */
function calcular(){
  try{
    const K = leer('K');
    const N = parseInt($('in_N').value, 10);
    if(isNaN(N)) throw new Error('Introduce un número de orificios válido.');

    const res = calcularBrida(K, N);
    ultimoResultado = res;
    dibujarSVGPatron(res);
    dibujarResumen(res);
    aviso('Cálculo realizado correctamente.', 'ok');
  }catch(e){
    aviso(e.message, 'error');
  }
}

/* ---------- Tabla resumen ---------- */
function dibujarResumen(r){
  const u = $('unidad').value === 'mm' ? 'mm' : 'in';

  let html = '';
  
  html += '<div class="titulo" style="margin-top:14px">Resultados</div>';
  html += '<table class="tabla-gen"><thead><tr><th>Concepto</th><th>Valor (' + u + ')</th></tr></thead><tbody>';
   html += '<tr><td><strong>Cuerda entre orificios</strong></td><td><strong>' + fmt2(r.cuerda) + '</strong></td></tr>';
  html += '<tr><td>Radio K</td><td>' + fmt2(r.K) + '</td></tr>';
  html += '<tr><td>Diámetro (2K)</td><td>' + fmt2(r.diametro) + '</td></tr>';
  html += '<tr><td>Nº de orificios N</td><td>' + r.N + '</td></tr>';
  html += '<tr><td>Paso angular</td><td>' + fmt2(r.pasoDeg) + ' °</td></tr>';

  html += '<tr><td>Perímetro (2πK)</td><td>' + fmt2(r.perimetro) + '</td></tr>';
  html += '</tbody></table>';

  $('resumenSalida').innerHTML = html;
}

/* ---------- SVG: brida con orificios y cuerda marcada ---------- */
function dibujarSVGPatron(r){
  const cont = $('svgPatron');
  if(!cont) return;

  const u = $('unidad').value === 'mm' ? 'mm' : 'in';

  // Tamaño del SVG en función del radio K
  const margen = 80;
const escala = 500 / (2 * r.K);   // 500 px de diámetro
  const R = r.K * escala;
  const W = 2 * R + margen * 2;
  const H = 2 * R + margen * 2 + 40;

  const cx = W / 2;
  const cy = H / 2 + 10;

  // Radios aproximados de la brida
  const rInterior = R * 0.6;   // agujero central (referencia visual)
  const rExterior = R * 1.2;   // borde exterior (referencia visual)
  const rOrificio  = Math.max(4, R * 0.06);  // radio de cada orificio

  // Ángulos de los orificios
  const angulos = [];
  for(let i = 0; i < r.N; i++){
    angulos.push(-90 + (360 / r.N) * i);   // arranca arriba
  }

  // Posiciones
  const puntos = angulos.map(a => ({
    deg: a,
    rad: rad(a),
    x: cx + R * Math.cos(rad(a)),
    y: cy + R * Math.sin(rad(a))
  }));

  // Círculos: exterior, interior, circunferencia de centros
  let svg = '';
  svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rExterior +
         '" fill="#d0d5dd" stroke="#667085" stroke-width="1.5"/>';
  svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rInterior +
         '" fill="#ffffff" stroke="#667085" stroke-width="1.5"/>';
  svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R +
         '" fill="none" stroke="#1e5fa8" stroke-width="1" stroke-dasharray="4,4" opacity="0.7"/>';

  // Orificios
  puntos.forEach(p => {
    svg += '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + rOrificio +
           '" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/>';
  });

  // Radio K desde el centro hasta el primer orificio
  const p0 = puntos[0];
  svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p0.x + '" y2="' + p0.y +
         '" stroke="#b42318" stroke-width="1.5"/>';
  svg += '<text x="' + ((cx + p0.x) / 2 + 6) + '" y="' + ((cy + p0.y) / 2) +
         '" font-size="13" fill="#b42318" font-weight="700">K = ' + fmt2(r.K) + ' ' + u + '</text>';

  // Cuerda entre orificio 0 y orificio 1 (resaltada)
  const p1 = puntos[1];
  svg += '<line x1="' + p0.x + '" y1="' + p0.y + '" x2="' + p1.x + '" y2="' + p1.y +
         '" stroke="#b42318" stroke-width="3"/>';

  // Etiqueta de la cuerda, desplazada hacia fuera
  const xm = (p0.x + p1.x) / 2;
  const ym = (p0.y + p1.y) / 2;
  const dx = xm - cx;
  const dy = ym - cy;
  const lon = Math.sqrt(dx*dx + dy*dy) || 1;
  const xLabel = xm + (dx / lon) * 30;
  const yLabel = ym + (dy / lon) * 30;
  svg += '<line x1="' + xm + '" y1="' + ym + '" x2="' + xLabel + '" y2="' + yLabel +
         '" stroke="#b42318" stroke-width="1"/>';
  svg += '<text x="' + xLabel + '" y="' + (yLabel - 4) +
         '" font-size="13" fill="#b42318" font-weight="700" text-anchor="middle">Cuerda = ' +
         fmt2(r.cuerda) + ' ' + u + '</text>';

  // Etiqueta "Nº orificios" cerca del segundo ojo
  svg += '<text x="' + (p1.x + 10) + '" y="' + (p1.y - 10) +
         '" font-size="11" fill="#1e5fa8">N=' + r.N + '</text>';

  // Título
  svg += '<text x="' + (W / 2) + '" y="24" font-size="13" font-weight="700" ' +
         'text-anchor="middle" fill="#1e5fa8">Brida — ' + r.N +
         ' orificios · paso ' + fmt2(r.pasoDeg) + '°</text>';

  // Marco
  const out =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H +
      '" width="25%" style="background:#fff;border:1px solid #d0d5dd;border-radius:8px">' +
      svg +
    '</svg>';

  ultimoSVG = out;
  cont.innerHTML = out;
}

/* ---------- Exportar CSV ---------- */
function exportarCSV(){
  if(!ultimoResultado){ aviso('Primero calcule la brida.', 'error'); return; }
  const r = ultimoResultado;
  const u = $('unidad').value === 'mm' ? 'mm' : 'in';

  let csv = 'Brida — Cálculo de cuerda (' + u + ')\n\n';
  csv += 'Entradas\n';
  csv += 'Radio K;' + fmt2(r.K) + ' ' + u + '\n';
  csv += 'Nº de orificios N;' + r.N + '\n\n';

  csv += 'Cuerda entre orificios;' + fmt2(r.cuerda) + ' ' + u + '\n';
  csv += 'Resultados\n';
  csv += 'Diámetro (2K);' + fmt2(r.diametro) + ' ' + u + '\n';
  csv += 'Paso angular;' + fmt2(r.pasoDeg) + ' °\n';

  csv += 'Perímetro (2πK);' + fmt2(r.perimetro) + ' ' + u + '\n';

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'brida.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  aviso('CSV exportado.', 'ok');
}

/* ---------- Exportar SVG ---------- */
function exportarSVG(){
  if(!ultimoSVG){ aviso('Primero calcule la brida.', 'error'); return; }
  const blob = new Blob([ultimoSVG], { type: 'image/svg+xml;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'brida.svg';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  aviso('SVG exportado.', 'ok');
}

/* ---------- Arranque ---------- */
renderEsquema();
$('btnCalcular').addEventListener('click', calcular);
$('btnCSV').addEventListener('click', exportarCSV);
$('btnSVG').addEventListener('click', exportarSVG);