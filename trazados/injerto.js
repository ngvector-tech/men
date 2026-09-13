const $ = id => document.getElementById(id);
let ultimoResultado = null;
let ultimoSVG = '';

/* ---------- Utilidad de formato: 1 decimal, sin ".0" ---------- */
function fmt1(v){
  const r = Math.round(v * 10) / 10;
  return (r % 1 === 0) ? r.toFixed(0) : r.toFixed(1);
}

/* ---------- Esquema de entrada ---------- */
function renderEsquema(){
  const cont = $('esquemaEntrada');
  if(!cont) return;
  const ruta = 'img/injerto_esquema.png';
  const test = new Image();
  test.onload  = () => { cont.innerHTML = '<img src="' + ruta + '" style="width:60%;display:block;margin:0 auto" alt="esquema injerto inclinado">'; };
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
 * Injerto INCLINADO: α es el ángulo entre el eje de la caña y el eje del cabezal.
 *   - α = 90° → ramal perpendicular al cabezal → injerto recto.
 *   - α < 90° → ramal inclinado.
 *
 * Fórmula general:
 *   L_i = [ C - sqrt(A² - (B·cos θ_i)²) + B·cos θ_i · cos α ] / sen α
 *
 * Caso recto (α = 90°):
 *   L_i = C - sqrt(A² - (B·cos θ_i)²)
 *
 * Nota sobre θ: se arranca en θ = −180° para que la primera generatriz (L1)
 * sea el mínimo del patrón y el máximo caiga en el centro de la tabla/dibujo.
 * Esto produce la forma clásica de "boca de pescado" con el pico centrado.
 */
function calcularInjerto(D, d, C, N, alphaDeg){
  const A = D / 2;
  const B = d / 2;

  if(B > A){
    throw new Error('El radio de la caña es mayor que el del cabezal. Revisa los diámetros.');
  }
  if(![12, 24, 36].includes(N)){
    throw new Error('Selecciona 12, 24 o 36 divisiones.');
  }
  if(alphaDeg < 15 || alphaDeg > 90){
    throw new Error('El ángulo α debe estar entre 15° y 90°.');
  }

  const esRecto = (alphaDeg >= 89.999);
  const alphaRad = rad(alphaDeg);
  const cosA = Math.cos(alphaRad);
  const sinA = Math.sin(alphaRad);

  const generatrices = [];
  for(let i = 0; i < N; i++){
    const thetaDeg = -180 + (360 / N) * i;   // ← arranca en el mínimo
    const thetaRad = rad(thetaDeg);
    const cosT = Math.cos(thetaRad);
    const interior = A*A - Math.pow(cosT * B, 2);

    if(interior < 0){
      throw new Error('Combinación imposible en la división ' + thetaDeg + '°. Revisa D y d.');
    }

    let L;
    if(esRecto){
      L = C - Math.sqrt(interior);
    } else {
      L = (C - Math.sqrt(interior) + B * cosT * cosA) / sinA;
    }

    generatrices.push({
      i: i,
      thetaDeg: thetaDeg,
      thetaRad: thetaRad,
      L: L
    });
  }

  const Lmax = Math.max(...generatrices.map(g => g.L));
  const Lmin = Math.min(...generatrices.map(g => g.L));
  const paso  = (Math.PI * d) / N;

  return { D, d, C, N, alphaDeg, A, B, generatrices, Lmax, Lmin, paso, esRecto };
}

/* ---------- Botón Calcular ---------- */
function calcular(){
  try{
    const D = leer('D');
    const d = leer('d');
    const C = leer('C');
    const alphaDeg = leer('alpha', 0);
    const N = parseInt($('in_N').value, 10);

    const res = calcularInjerto(D, d, C, N, alphaDeg);
    ultimoResultado = res;
    dibujarSVGPatron(res);
    dibujarResumen(res);
    aviso('Cálculo realizado correctamente.', 'ok');
  }catch(e){
    aviso(e.message, 'error');
  }
}

/* ---------- Tabla de generatrices ----------
 * Se listan L1..LN y, al final, una fila adicional "L1 (cierre)" con el mismo
 * valor que L1, para que la tabla cubra las N+1 columnas del desarrollo.
 */
function dibujarResumen(r){
  const u = $('unidad').value === 'mm' ? 'mm' : 'in';
  let html = '';

  html += '<div class="titulo" style="margin-top:14px">Generatrices por división';
  if(!r.esRecto){
    html += ' — α = ' + fmt1(r.alphaDeg) + '° (entre ejes)';
  }
  html += '</div>';

  html += '<table class="tabla-gen"><thead><tr><th>Lᵢ</th><th>L (' + u + ')</th></tr></thead><tbody>';
  r.generatrices.forEach(g => {
    html += '<tr><td>L' + (g.i + 1) + '</td><td>' + fmt1(g.L) + '</td></tr>';
  });
  const primera = r.generatrices[0];
  html += '<tr class="fila-cierre"><td>L1 (cierre)</td><td>' + fmt1(primera.L) + '</td></tr>';
  html += '</tbody></table>';

  $('resumenSalida').innerHTML = html;
}

/* ---------- Dibujo SVG del patrón desarrollado ---------- */
function dibujarSVGPatron(r){
  const cont = $('svgPatron');
  if(!cont){ return; }

  const u = $('unidad').value === 'mm' ? 'mm' : 'in';

  const anchoTotal = Math.PI * r.d;
  const altoMax    = Math.max(r.Lmax, r.C);
  const margen     = 60;
  const escala     = Math.min(
    900 / anchoTotal,
    500 / altoMax
  );
  const W = anchoTotal * escala + margen * 2;
  const H = altoMax    * escala + margen * 2 + 30;

  const x0 = margen;
  const y0 = H - margen;

  const puntos = r.generatrices.map((g, i) => {
    const x = x0 + (i / r.N) * anchoTotal * escala;
    const y = y0 - g.L * escala;
    return { x, y, L: g.L, theta: g.thetaDeg, i };
  });

  const xCierre = x0 + anchoTotal * escala;
  const yCierre = y0 - r.generatrices[0].L * escala;

  const pathCurva =
    'M ' + puntos[0].x + ' ' + puntos[0].y + ' ' +
    puntos.map(p => 'L ' + p.x + ' ' + p.y).join(' ') + ' ' +
    'L ' + xCierre + ' ' + yCierre + ' ' +
    'L ' + xCierre + ' ' + y0 + ' ' +
    'L ' + puntos[0].x + ' ' + y0 + ' Z';

  let verticales = '';
  let etiquetas = '';
  puntos.forEach((p, i) => {
    verticales += '<line x1="' + p.x + '" y1="' + y0 + '" x2="' + p.x + '" y2="' + p.y +
      '" stroke="#1e5fa8" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>';
    etiquetas += '<text x="' + p.x + '" y="' + (p.y - 4) + '" font-size="9" ' +
      'text-anchor="middle" fill="#b42318">L' + (i + 1) + '</text>';
  });

  const cierreLinea =
    '<line x1="' + xCierre + '" y1="' + y0 + '" x2="' + xCierre + '" y2="' + yCierre +
      '" stroke="#1e5fa8" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>';
  const cierreEtiqueta =
    '<text x="' + xCierre + '" y="' + (yCierre - 4) + '" font-size="9" ' +
      'text-anchor="middle" fill="#b42318">L1</text>';

  const xM1 = puntos[0].x;
  const xM2 = puntos[1].x;
  const yM  = y0 + 20;
  const cotaM =
    '<line x1="' + xM1 + '" y1="' + yM + '" x2="' + xM2 + '" y2="' + yM +
      '" stroke="#b42318" stroke-width="1"/>' +
    '<line x1="' + xM1 + '" y1="' + (yM - 4) + '" x2="' + xM1 + '" y2="' + (yM + 4) +
      '" stroke="#b42318" stroke-width="1"/>' +
    '<line x1="' + xM2 + '" y1="' + (yM - 4) + '" x2="' + xM2 + '" y2="' + (yM + 4) +
      '" stroke="#b42318" stroke-width="1"/>' +
    '<text x="' + ((xM1 + xM2) / 2) + '" y="' + (yM + 14) +
      '" font-size="10" text-anchor="middle" fill="#b42318">M=' +
      fmt1(r.paso) + '</text>';

  const cotaAncho =
    '<line x1="' + x0 + '" y1="' + (y0 + 40) + '" x2="' + xCierre +
      '" y2="' + (y0 + 40) + '" stroke="#667085" stroke-width="1"/>' +
    '<text x="' + (x0 + anchoTotal * escala / 2) + '" y="' + (y0 + 54) +
      '" font-size="10" text-anchor="middle" fill="#667085">π·d = ' +
      fmt1(anchoTotal) + ' ' + u + '</text>';

  const yTop = y0 - r.Lmax * escala;
  const cotaAltura =
    '<line x1="' + (x0 - 20) + '" y1="' + y0 + '" x2="' + (x0 - 20) + '" y2="' + yTop +
      '" stroke="#667085" stroke-width="1"/>' +
    '<text x="' + (x0 - 24) + '" y="' + ((y0 + yTop) / 2) +
      '" font-size="10" text-anchor="middle" fill="#667085" ' +
      'transform="rotate(-90 ' + (x0 - 24) + ' ' + ((y0 + yTop) / 2) + ')">' +
      'L máx = ' + fmt1(r.Lmax) + ' ' + u + '</text>';

const titulo = r.esRecto
  ? 'Patrón desarrollado — ' + r.N + ' divisiones'
  : 'Patrón desarrollado — α = ' + fmt1(r.alphaDeg) + '° — ' + r.N + ' divisiones';

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H +
      '" width="100%" style="background:#fff;border:1px solid #d0d5dd;border-radius:8px">' +
      '<text x="' + (W / 2) + '" y="24" font-size="13" font-weight="700" ' +
        'text-anchor="middle" fill="#1e5fa8">' + titulo + '</text>' +
      '<path d="' + pathCurva + '" fill="#e8f0fa" stroke="#1e5fa8" stroke-width="2"/>' +
      '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + xCierre +
        '" y2="' + y0 + '" stroke="#1f2937" stroke-width="1.5"/>' +
      verticales +
      cierreLinea +
      etiquetas +
      cierreEtiqueta +
      cotaM +
      cotaAncho +
      cotaAltura +
    '</svg>';

  ultimoSVG = svg;
  cont.innerHTML = svg;
}

/* ---------- Exportar CSV ---------- */
function exportarCSV(){
  if(!ultimoResultado){ aviso('Primero calcule el injerto.', 'error'); return; }
  const r = ultimoResultado;
  const u = $('unidad').value === 'mm' ? 'mm' : 'in';

  let csv = 'Injerto de tubería - Boca de pescado (' + u + ')\n\n';
  csv += 'Entradas\n';
  csv += 'D (diámetro cabezal);' + fmt1(r.D) + ' ' + u + '\n';
  csv += 'd (diámetro caña);'   + fmt1(r.d) + ' ' + u + '\n';
  csv += 'C (altura);'          + fmt1(r.C) + ' ' + u + '\n';
  csv += 'α (entre ejes);'      + (r.esRecto ? '90 (recto)' : fmt1(r.alphaDeg) + ' °') + '\n';
  csv += 'N (divisiones);'      + r.N + '\n\n';

  csv += 'Resultados globales\n';
  csv += 'Radio cabezal A;'      + fmt1(r.A) + ' ' + u + '\n';
  csv += 'Radio caña B;'         + fmt1(r.B) + ' ' + u + '\n';
  csv += 'L máxima;'             + fmt1(r.Lmax) + ' ' + u + '\n';
  csv += 'L mínima;'             + fmt1(r.Lmin) + ' ' + u + '\n';
  csv += 'Paso M;'               + fmt1(r.paso) + ' ' + u + '\n\n';

  csv += 'Generatrices\n';
  csv += 'Línea;L (' + u + ')\n';
  r.generatrices.forEach(g => {
    csv += 'L' + (g.i + 1) + ';' + fmt1(g.L) + '\n';
  });
  csv += 'L1 (cierre);' + fmt1(r.generatrices[0].L) + '\n';

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'injerto_inclinado.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  aviso('CSV exportado.', 'ok');
}

/* ---------- Exportar SVG ---------- */
function exportarSVG(){
  if(!ultimoSVG){ aviso('Primero calcule el injerto.', 'error'); return; }
  const blob = new Blob([ultimoSVG], { type: 'image/svg+xml;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'patron_injerto_inclinado.svg';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  aviso('SVG exportado.', 'ok');
}

/* ---------- Arranque ---------- */
renderEsquema();
$('btnCalcular').addEventListener('click', calcular);
$('btnCSV').addEventListener('click', exportarCSV);
$('btnSVG').addEventListener('click', exportarSVG);