const $=id=>document.getElementById(id);
let ultimoResultado=null;

function esquemaEntrada(){
  return '<img src="img/miterBend.png" style="width:100%;display:block;margin:0 auto" alt="Miter Bend">';
}

function renderCampos(){
  $('esquemaEntrada').innerHTML=esquemaEntrada();
}

function leer(id){
  const el=$('in_'+id);
  if(!el) throw new Error('Falta el campo '+id);
  const v=parseFloat(el.value);
  if(isNaN(v)) throw new Error('El campo "'+id+'" está vacío o no es numérico.');
  if(v<=0) throw new Error('El campo "'+id+'" debe ser mayor que 0.');
  return v;
}

function aviso(msg,tipo='error'){
  const a=$('aviso');
  a.textContent=msg;
  a.className='aviso '+tipo;
  setTimeout(()=>{a.className='aviso';},5000);
}

function calcularMiterBend(d,R,theta,P,L){
  // Miter angle = ángulo por cada junta de corte
  const alpha = theta / (2 * (P - 1));
  const alphaRad = alpha * Math.PI / 180;

  // Longitudes de los tramos
  const Lcentro = 2 * R * Math.tan(alphaRad / 2);
  const Lextremo = R * Math.tan(alphaRad / 2);

  // Ordenadas del patrón plano del segmento extremo
  const r = d / 2;
  const amplitud = r * Math.tan(alphaRad);
  const P_perim = Math.PI * d;

  const filas=[];
  for(let i=0;i<=L;i++){
    const th = 2 * Math.PI * i / L;
    const y = r + amplitud * Math.cos(th);
    filas.push([i, y.toFixed(2)]);
  }

  return {
    titulo:'Miter Bend — patrón del segmento extremo',
    encabezados:['Nº','Y (ordenada)'],
    filas, anchoDesarrollo:P_perim,
    alpha, Lcentro, Lextremo, P, L, theta, d, R
  };
}

function calcular(){
  try{
    const d = leer('d');
    const R = leer('R');
    const theta = leer('theta');
    const P = parseInt($('in_P').value, 10);
    const L = parseInt($('lineas').value, 10);

    if(P < 2) throw new Error('El nº de partes debe ser al menos 2.');
    if(theta <= 0 || theta >= 180) throw new Error('El ángulo total debe estar entre 0° y 180°.');

    const res = calcularMiterBend(d,R,theta,P,L);
    ultimoResultado = res;
    dibujarImagenPatron();
    dibujarResumen(res);
    dibujarTabla(res);
    aviso('Cálculo realizado correctamente.','ok');
  }catch(e){
    aviso(e.message,'error');
  }
}

function dibujarImagenPatron(){
  const cont=$('imagenPatron');
  if(!cont) return;
  const ruta='img/patron_miterBend.png';
  const test=new Image();
  test.onload=()=>{ cont.innerHTML='<img src="'+ruta+'" style="width:100%;display:block;margin:0 auto" alt="patrón Miter Bend">'; };
  test.onerror=()=>{ cont.innerHTML=''; };
  test.src=ruta;
}

function dibujarResumen(res){
  const u = $('unidad').value === 'mm' ? 'mm' : 'in';
  let html='<div class="resumen">';
  html+='<span>Miter angle: '+res.alpha.toFixed(3)+'°</span>';
  html+='<span>Perímetro: '+res.anchoDesarrollo.toFixed(2)+' '+u+'</span>';
  html+='<span>Nº de partes: '+res.P+'</span>';
  html+='<span>Tramo central: '+res.Lcentro.toFixed(2)+' '+u+'</span>';
  html+='<span>Tramo extremo: '+res.Lextremo.toFixed(2)+' '+u+'</span>';
  html+='</div>';
  $('resumenSalida').innerHTML=html;
}

function dibujarTabla(res){
  let html='<table><thead><tr>';
  res.encabezados.forEach(h=>html+='<th>'+h+'</th>');
  html+='</tr></thead><tbody>';
  res.filas.forEach(f=>{ html+='<tr>'; f.forEach(v=>html+='<td>'+v+'</td>'); html+='</tr>'; });
  html+='</tbody></table>';
  html+='<p class="nota" style="margin:8px 4px;">Marque la separación entre líneas con cinta métrica a partir del inicio del patrón. En cada línea, mida la altura Y.</p>';
  $('tablaSalida').innerHTML=html;
}

function exportarCSV(){
  if(!ultimoResultado){ aviso('Primero calcule un desarrollo.','error'); return; }
  const r = ultimoResultado;
  const u = $('unidad').value === 'mm' ? 'mm' : 'in';
  const sep = r.anchoDesarrollo / r.L;

  let csv = r.titulo + ' (' + u + ')\n';
  csv += 'Miter angle;' + r.alpha.toFixed(3) + ' °\n';
  csv += 'Ángulo total;' + r.theta + ' °\n';
  csv += 'Nº de partes;' + r.P + '\n';
  csv += 'Longitud tramo central;' + r.Lcentro.toFixed(3) + ' ' + u + '\n';
  csv += 'Longitud tramo extremo;' + r.Lextremo.toFixed(3) + ' ' + u + '\n';
  csv += 'Perímetro;' + r.anchoDesarrollo.toFixed(3) + ' ' + u + '\n';
  csv += 'Nº de líneas;' + r.L + '\n';
  csv += 'Separación entre líneas;' + sep.toFixed(3) + ' ' + u + '\n\n';
  csv += r.encabezados.join(';') + '\n';
  r.filas.forEach(f => csv += f.join(';') + '\n');

  const blob = new Blob(['\ufeff' + csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'miterBend.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  aviso('CSV exportado.','ok');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCampos();
  $('btnCalcular').addEventListener('click', calcular);
  $('btnCSV').addEventListener('click', exportarCSV);
});