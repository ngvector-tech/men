const $=id=>document.getElementById(id);
let ultimoResultado=null;

function aviso(msg,tipo='error'){
  const a=$('aviso');
  a.textContent=msg;
  a.className='aviso '+tipo;
  setTimeout(()=>{a.className='aviso';},5000);
}

function leer(id,label){
  const el=$('in_'+id);
  const v=parseFloat(el.value);
  if(isNaN(v)) throw new Error('El campo "'+label+'" está vacío o no es numérico.');
  if(v<=0) throw new Error('El campo "'+label+'" debe ser mayor que 0.');
  return v;
}

function calcularCodo(A,B,R){
  if(R<=A/2) throw new Error('El radio R debe ser mayor que A/2 (radio interior positivo).');
  if(B>4*R) throw new Error('El desnivel B no puede ser mayor que 4·R (ángulo por codo > 180°).');

  const Crad = Math.acos(1 - B/(2*R));
  const Cdeg = Crad*180/Math.PI;
  const D = (R + A/2) * Crad;
  const E = (R - A/2) * Crad;

  return {Crad, Cdeg, D, E};
}

function dibujarImagenPatron(){
  const cont = $('imagenPatron');
  if(!cont) return;
  const ruta = 'img/patron_offsetcodo.png';
  const test = new Image();
  test.onload = () => {
    cont.innerHTML = '<img src="'+ruta+'" alt="patrón codo">';
    cont.style.display = 'flex';
  };
  test.onerror = () => {
    cont.innerHTML = '';
    cont.style.display = 'none';
  };
  test.src = ruta;
}

function calcular(){
  try{
    const A = leer('A','Diámetro A');
    const B = leer('B','Desnivel B');
    const R = leer('R','Radio R');

    const r = calcularCodo(A,B,R);
    ultimoResultado = {A,B,R,...r};

    let html = '<table>';
    html += '<thead><tr><th>Concepto</th><th>Valor</th></tr></thead><tbody>';
    html += '<tr><td>C — Ángulo por codo</td><td>'+r.Cdeg.toFixed(3)+' °</td></tr>';
    html += '<tr><td>C — Ángulo por codo</td><td>'+r.Crad.toFixed(5)+' rad</td></tr>';
    html += '<tr><td>D — Longitud arco exterior (por codo)</td><td>'+r.D.toFixed(1)+' mm</td></tr>';
    html += '<tr><td>E — Longitud arco interior (por codo)</td><td>'+r.E.toFixed(1)+' mm</td></tr>';
    html += '<tr><td>Ángulo total del conjunto (2C)</td><td>'+(2*r.Cdeg).toFixed(3)+' °</td></tr>';
    html += '<tr><td>Longitud total arco exterior (2D)</td><td>'+(2*r.D).toFixed(1)+' mm</td></tr>';
    html += '<tr><td>Longitud total arco interior (2E)</td><td>'+(2*r.E).toFixed(1)+' mm</td></tr>';
    html += '</tbody></table>';
    html += '<p class="nota">B = 2·R·(1 − cos C) &nbsp;·&nbsp; D = (R + A/2)·C &nbsp;·&nbsp; E = (R − A/2)·C &nbsp;·&nbsp; C en radianes</p>';

    $('salida').innerHTML = html;
    dibujarImagenPatron();
    aviso('Cálculo realizado correctamente.','ok');
  }catch(e){
    $('salida').innerHTML = '';
    aviso(e.message,'error');
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  $('btnCalcular').addEventListener('click',calcular);
});