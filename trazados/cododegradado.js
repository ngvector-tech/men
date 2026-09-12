const $=id=>document.getElementById(id);
let ultimoResultado=null;

/* === ESQUEMA IZQUIERDO: codo con etiquetas A, B, C === */
function dibujarEsquemaEntrada(d=200,R=300,ang=90){
  const cont=$('esquemaEntrada');
  if(!cont) return;

  const W=320, H=220;
  const cx=100, cy=180;
  const rExt=R + d/2;
  const rInt=R - d/2;
  const rMax=Math.max(rExt,1);
  const escala=(W-40)/(rMax*1.3);
  const rE=rExt*escala;
  const rI=Math.max(rInt*escala,4);
  const aRad=ang*Math.PI/180;

  const x1E=cx + rE,        y1E=cy;
  const x2E=cx + rE*Math.cos(aRad), y2E=cy - rE*Math.sin(aRad);
  const x1I=cx + rI,        y1I=cy;
  const x2I=cx + rI*Math.cos(aRad), y2I=cy - rI*Math.sin(aRad);

  const pathExt=`M ${x1E} ${y1E} A ${rE} ${rE} 0 0 0 ${x2E} ${y2E}`;
  const pathInt=`M ${x1I} ${y1I} A ${rI} ${rI} 0 0 0 ${x2I} ${y2I}`;

  const rMed=(rE+rI)/2;
  const xm=cx + rMed*Math.cos(aRad/2);
  const ym=cy - rMed*Math.sin(aRad/2);

  const aA=aRad*0.30;
  const xA=cx + (rE+14)*Math.cos(aA);
  const yA=cy - (rE+14)*Math.sin(aA);

  const aB=aRad*0.65;
  const xB=cx + (rI-14)*Math.cos(aB);
  const yB=cy - (rI-14)*Math.sin(aB);

  const svg=`
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esquema del codo">
  <line x1="${cx}" y1="${cy}" x2="${x1E}" y2="${y1E}" stroke="#d0d5dd" stroke-width="1"/>
  <line x1="${cx}" y1="${cy}" x2="${x2E}" y2="${y2E}" stroke="#d0d5dd" stroke-width="1"/>
  <path d="${pathExt}" fill="none" stroke="#1e5fa8" stroke-width="3.5"/>
  <path d="${pathInt}" fill="none" stroke="#1e5fa8" stroke-width="3.5" stroke-dasharray="6 4"/>
  <path d="M ${cx+rMed} ${cy} A ${rMed} ${rMed} 0 0 0 ${cx + rMed*Math.cos(aRad)} ${cy - rMed*Math.sin(aRad)}"
        fill="none" stroke="#667085" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="${cx}" cy="${cy}" r="3" fill="#667085"/>
  <text x="${cx-14}" y="${cy+16}" font-family="system-ui" font-size="11" fill="#667085">R</text>
  <text x="${xA}" y="${yA}" font-family="system-ui" font-size="15" font-weight="700" fill="#1e5fa8">A</text>
  <text x="${xB}" y="${yB}" font-family="system-ui" font-size="15" font-weight="700" fill="#1e5fa8">B</text>
  <circle cx="${xm}" cy="${ym}" r="4" fill="#b42318"/>
  <text x="${xm+8}" y="${ym-6}" font-family="system-ui" font-size="14" font-weight="700" fill="#b42318">C</text>
</svg>`;
  cont.innerHTML=svg;
}

/* === ESQUEMA DERECHO: tangentes por los CENTROS de las bocas, sin leyenda === */
function dibujarEsquemaResultado(d=200,R=300,ang=90){
  const cont=$('imagenPatron');
  if(!cont) return;

  const W=560, H=420;
  const cx=160, cy=340;
  const rExt=R + d/2;
  const rInt=R - d/2;
  const rMed=R;
  const rMax=Math.max(rExt,1);
  const escala=(H-120)/rMax;
  const rE=rExt*escala;
  const rI=Math.max(rInt*escala,8);
  const rM=rMed*escala;
  const aRad=ang*Math.PI/180;

  /* Extremos de los arcos */
  const x1E=cx, y1E=cy - rE;
  const x2E=cx + rE*Math.sin(aRad), y2E=cy - rE*Math.cos(aRad);
  const x1I=cx, y1I=cy - rI;
  const x2I=cx + rI*Math.sin(aRad), y2I=cy - rI*Math.cos(aRad);

  /* Centros de las bocas */
  const c1x=cx,                c1y=cy - rM;
  const c2x=cx + rM*Math.sin(aRad), c2y=cy - rM*Math.cos(aRad);

  /* Arcos */
  const pathExt=`M ${x1E} ${y1E} A ${rE} ${rE} 0 0 1 ${x2E} ${y2E}`;
  const pathInt=`M ${x1I} ${y1I} A ${rI} ${rI} 0 0 1 ${x2I} ${y2I}`;

  /* Radios y tangentes */
  const u1x=0,  u1y=-1;
  const u2x=Math.sin(aRad), u2y=-Math.cos(aRad);
  const t1x=-u1y, t1y=u1x;
  const t2x=-u2y, t2y=u2x;

  /* Vértice V */
  const den=t1x*t2y - t1y*t2x;
  let vx=c1x, vy=c1y;
  if(Math.abs(den)>1e-9){
    const s=((c2x-c1x)*t2y - (c2y-c1y)*t2x)/den;
    vx=c1x + s*t1x;
    vy=c1y + s*t1y;
  }

  /* Tangentes recortadas: del centro de la boca a V */
  const t1x1=c1x, t1y1=c1y;
  const t1x2=vx,  t1y2=vy;
  const t2x1=c2x, t2y1=c2y;
  const t2x2=vx,  t2y2=vy;

  /* Etiquetas A y B */
  const aA=aRad*0.5;
  const xA=cx + (rE+22)*Math.sin(aA);
  const yA=cy - (rE+22)*Math.cos(aA);
  const xB=cx + (rI+18)*Math.sin(aA*0.7);
  const yB=cy - (rI+18)*Math.cos(aA*0.7);

  /* Punto medio de la flecha C */
  const midCx=(c1x+vx)/2;
  const midCy=(c1y+vy)/2;

  const svg=`
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Patrón del codo">

  <!-- Tangentes (centro de boca → vértice V) -->
  <line x1="${t1x1}" y1="${t1y1}" x2="${t1x2}" y2="${t1y2}"
        stroke="#1e5fa8" stroke-width="2" stroke-dasharray="6 4"/>
  <line x1="${t2x1}" y1="${t2y1}" x2="${t2x2}" y2="${t2y2}"
        stroke="#1e5fa8" stroke-width="2" stroke-dasharray="6 4"/>

  <!-- Caras reales del codo -->
  <line x1="${x1I}" y1="${y1I}" x2="${x1E}" y2="${y1E}"
        stroke="#1e5fa8" stroke-width="2.5"/>
  <line x1="${x2I}" y1="${y2I}" x2="${x2E}" y2="${y2E}"
        stroke="#1e5fa8" stroke-width="2.5"/>

  <!-- Arco exterior A -->
  <path d="${pathExt}" fill="none" stroke="#1e5fa8" stroke-width="4"/>
  <!-- Arco interior B -->
  <path d="${pathInt}" fill="none" stroke="#1e5fa8" stroke-width="4" stroke-dasharray="7 5"/>

  <!-- Línea media -->
  <path d="M ${c1x} ${c1y} A ${rM} ${rM} 0 0 1 ${c2x} ${c2y}"
        fill="none" stroke="#667085" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- Centro de giro -->
  <circle cx="${cx}" cy="${cy}" r="3" fill="#667085"/>
  <text x="${cx-18}" y="${cy+18}" font-family="system-ui" font-size="11" fill="#667085">R</text>

  <!-- Centros de las bocas -->
  <circle cx="${c1x}" cy="${c1y}" r="3.5" fill="#1e5fa8"/>
  <circle cx="${c2x}" cy="${c2y}" r="3.5" fill="#1e5fa8"/>

  <!-- Etiquetas A y B -->
  <text x="${xA}" y="${yA}" font-family="system-ui" font-size="18" font-weight="700" fill="#1e5fa8">A</text>
  <text x="${xB}" y="${yB}" font-family="system-ui" font-size="18" font-weight="700" fill="#1e5fa8">B</text>

  <!-- Vértice V -->
  <circle cx="${vx}" cy="${vy}" r="5" fill="#b42318"/>
  <text x="${vx+10}" y="${vy+5}" font-family="system-ui" font-size="12" font-weight="700" fill="#b42318">V</text>

  <!-- Avance C -->
  <line x1="${c1x}" y1="${c1y}" x2="${vx}" y2="${vy}"
        stroke="#b42318" stroke-width="2"/>
  <polygon points="${c1x},${c1y} ${c1x+9},${c1y-5} ${c1x+9},${c1y+5}" fill="#b42318"/>
  <polygon points="${vx},${vy} ${vx-9},${vy-5} ${vx-9},${vy+5}" fill="#b42318"/>
  <text x="${midCx - 6}" y="${midCy - 10}" font-family="system-ui" font-size="16" font-weight="700" fill="#b42318">C</text>
</svg>`;
  cont.innerHTML=svg;
}

function leer(id){
  const el=$('in_'+id);
  if(!el) throw new Error('Falta el campo '+id);
  const v=parseFloat(el.value);
  if(isNaN(v)) throw new Error('El campo "'+id+'" está vacío o no es numérico.');
  return v;
}

function aviso(msg,tipo='error'){
  const a=$('aviso');
  a.textContent=msg;
  a.className='aviso '+tipo;
  setTimeout(()=>{a.className='aviso';},5000);
}

function rad(g){return g*Math.PI/180;}

function calcular(){
  try{
    const ang=leer('ang');
    const d=leer('d');
    const R=leer('R');

    if(ang<=0 || ang>180) throw new Error('El ángulo debe estar entre 0 y 180°.');
    if(d<=0) throw new Error('El diámetro debe ser mayor que 0.');
    if(R<=0) throw new Error('El radio debe ser mayor que 0.');
    if(R<=d/2) throw new Error('El radio debe ser mayor que el radio del codo (d/2).');

    const rExt=R + d/2;
    const rInt=R - d/2;
    const rMed=R;
    const aRad=rad(ang);

    const arcoExt=rExt*aRad;
    const arcoInt=rInt*aRad;
    const avance =rMed*(1 - Math.cos(aRad));

    ultimoResultado={ ang, d, R, arcoExt, arcoInt, avance };

    dibujarEsquemaEntrada(d,R,ang);
    dibujarEsquemaResultado(d,R,ang);
    dibujarResumen();
    aviso('Cálculo realizado correctamente.','ok');
  }catch(e){
    aviso(e.message,'error');
  }
}

function dibujarResumen(){
  const r=ultimoResultado;
  if(!r) return;
  const u=$('unidad').value==='mm'?'mm':'in';
  let html='<div class="resumen">';
  html+='<div class="dato"><span><span class="letra">A</span>Arco exterior (R + d/2)</span><span class="valor">'+r.arcoExt.toFixed(2)+' '+u+'</span></div>';
  html+='<div class="dato"><span><span class="letra">B</span>Arco interior (R − d/2)</span><span class="valor">'+r.arcoInt.toFixed(2)+' '+u+'</span></div>';
  html+='<div class="dato"><span><span class="letra">C</span>Avance</span><span class="valor">'+r.avance.toFixed(2)+' '+u+'</span></div>';
  html+='</div>';
  html+='<p class="nota">El avance es el desplazamiento tangencial en el punto de unión de las caras del codo: C = R × (1 − cos α).</p>';
  $('resumenSalida').innerHTML=html;
}

function exportarCSV(){
  if(!ultimoResultado){ aviso('Primero calcule un codo.','error'); return; }
  const r=ultimoResultado;
  const u=$('unidad').value==='mm'?'mm':'in';

  let csv='Degradado de codo\n';
  csv+='Unidad;'+u+'\n';
  csv+='Ángulo;'+r.ang.toFixed(3)+' °\n';
  csv+='Diámetro del codo;'+r.d.toFixed(3)+' '+u+'\n';
  csv+='Radio del codo;'+r.R.toFixed(3)+' '+u+'\n\n';
  csv+='A - Arco exterior;'+r.arcoExt.toFixed(3)+' '+u+'\n';
  csv+='B - Arco interior;'+r.arcoInt.toFixed(3)+' '+u+'\n';
  csv+='C - Avance línea media;'+r.avance.toFixed(3)+' '+u+'\n';

  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='codo_degradado_'+r.ang.toFixed(0)+'deg.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  aviso('CSV exportado.','ok');
}

/* Arranque */
dibujarEsquemaEntrada(200,300,90);
dibujarEsquemaResultado(200,300,90);
$('btnCalcular').addEventListener('click',calcular);
$('btnCSV').addEventListener('click',exportarCSV);