const $=id=>document.getElementById(id);
let ultimoResultado=null;

function cargarEsquema(){
  return '<img src="img/bayoneta.png" style="width:100%;display:block;margin:0 auto" alt="bayoneta">';
}

function renderEsquema(){
  $('esquemaEntrada').innerHTML=cargarEsquema();
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

function rad(g){return g*Math.PI/180;}

function calcularBayoneta(O1,O2,d,R){
  // Ángulo del codo calculado a partir de los offsets
  const alpha = Math.atan2(O1, O2) * 180 / Math.PI;
  const alphaRad = rad(alpha);

  // Geometría de la bayoneta
  const Lbruto = Math.sqrt(O1*O1 + O2*O2);
  const beta   = alpha;   // en bayoneta simétrica α = β

  // Avance del codo
  const avance = R * Math.tan(alphaRad / 2);

  // Longitud del carrete a cortar
  const Lcarrete = Lbruto - 2 * avance;
  if(Lcarrete <= 0) throw new Error('Con estos datos la longitud del carrete sale negativa. Aumenta los offsets o reduce R.');

  // Arcos del codo para el corte
  const arcoMedia = Math.PI * R * alpha / 180;
  const arcoExt   = Math.PI * (R + d/2) * alpha / 180;
  const arcoInt   = Math.PI * (R - d/2) * alpha / 180;
  if(arcoInt < 0) throw new Error('El radio del codo es menor que el radio del tubo (R < d/2).');

  return { O1,O2,d,R, alpha,beta, Lbruto,avance,Lcarrete, arcoMedia,arcoExt,arcoInt };
}

function calcular(){
  try{
    const O1 = leer('O1');
    const O2 = leer('O2');
    const d  = leer('d');
    const R  = leer('R');

    const res = calcularBayoneta(O1,O2,d,R);
    ultimoResultado = res;
    dibujarImagenPatron();
    dibujarResumen(res);
    aviso('Cálculo realizado correctamente.','ok');
  }catch(e){
    aviso(e.message,'error');
  }
}

function dibujarImagenPatron(){
  const cont=$('imagenPatron');
  if(!cont) return;
  const ruta='img/patron_bayoneta.png';
  const test=new Image();
  test.onload=()=>{ cont.innerHTML='<img src="'+ruta+'" style="width:40%;display:block;margin:0 auto" alt="bayoneta">'; };
  test.onerror=()=>{ cont.innerHTML=''; };
  test.src=ruta;
}

function dibujarResumen(r){
  const u=$('unidad').value==='mm'?'mm':'in';
  let html='<div class="resumen">';

  html+='<div class="titulo">Tramo recto a cortar</div>';
  html+='<div class="dato">Longitud del carrete A= '+r.Lcarrete.toFixed(2)+' '+u+'</div>'; 
  html+='<div class="titulo">Codo — corte al ángulo calculado</div>';  
  html+='<div class="dato">Arco B = '+r.arcoExt.toFixed(2)+' '+u+'</div>';
  html+='<div class="dato">Arco C = '+r.arcoInt.toFixed(2)+' '+u+'</div>';
   html+='<div class="dato">Arco — línea media = '+r.arcoMedia.toFixed(2)+' '+u+'</div>';



  html+='<div class="titulo">Comprobación geométrica</div>';
  html+='<div class="dato">Ángulo del codo α = '+r.alpha.toFixed(3)+'°</div>';
  html+='<div class="dato">Avance por codo = '+r.avance.toFixed(2)+' '+u+'</div>';
 
  html+='<div class="dato">Longitud bruta entre codos = '+r.Lbruto.toFixed(2)+' '+u+'</div>';
 

  html+='</div>';
  $('resumenSalida').innerHTML=html;
}

function exportarCSV(){
  if(!ultimoResultado){ aviso('Primero calcule la bayoneta.','error'); return; }
  const r=ultimoResultado;
  const u=$('unidad').value==='mm'?'mm':'in';

  let csv='Bayoneta de tubería ('+u+')\n\n';
  csv+='Entradas\n';
  csv+='O1 (offset vertical);'+r.O1.toFixed(3)+' '+u+'\n';
  csv+='O2 (offset horizontal);'+r.O2.toFixed(3)+' '+u+'\n';
  csv+='d (diámetro exterior);'+r.d.toFixed(3)+' '+u+'\n';
  csv+='R (radio del codo);'+r.R.toFixed(3)+' '+u+'\n\n';
  csv+='Resultados\n';
  csv+='Ángulo del codo α;'+r.alpha.toFixed(3)+' °\n';
  csv+='Ángulo bayoneta β;'+r.beta.toFixed(3)+' °\n';
  csv+='Avance por codo;'+r.avance.toFixed(3)+' '+u+'\n';
  csv+='Longitud del carrete;'+r.Lcarrete.toFixed(3)+' '+u+'\n';
  csv+='Arco línea media;'+r.arcoMedia.toFixed(3)+' '+u+'\n';
  csv+='Arco extradós;'+r.arcoExt.toFixed(3)+' '+u+'\n';
  csv+='Arco intradós;'+r.arcoInt.toFixed(3)+' '+u+'\n';
  csv+='Longitud bruta entre codos;'+r.Lbruto.toFixed(3)+' '+u+'\n';

  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='bayoneta.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  aviso('CSV exportado.','ok');
}

/* Arranque */
renderEsquema();
$('btnCalcular').addEventListener('click',calcular);
$('btnCSV').addEventListener('click',exportarCSV);