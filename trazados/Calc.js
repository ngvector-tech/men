const $=id=>document.getElementById(id);let ultimoResultado=null;
const CAMPOS={
tuboRecto:[{id:'D',label:'Diámetro del tubo (D)',def:500},{id:'H',label:'Altura del tubo (H)',def:1000}],
tuboTruncado:[{id:'D',label:'Diámetro del tubo (D)',def:500},{id:'H',label:'Altura lado corto (H)',def:1000},{id:'a',label:'Ángulo de corte α (°)',def:30}],
tuboRadio:[{id:'D',label:'Diámetro del tubo (D)',def:500},{id:'H',label:'Altura lado corto (H)',def:1000},{id:'R',label:'Radio de corte (R)',def:800}],
tuboIgual:[{id:'D',label:'Diámetro del cabezal (D)',def:500},{id:'E',label:'Longitud del ramal (E)',def:400}],
tuboDesigual:[{id:'D',label:'Diámetro del cabezal (D)',def:600},{id:'d',label:'Diámetro del ramal (d)',def:300},{id:'E',label:'Longitud del ramal (E)',def:400}],
tuboDesplazado:[{id:'D',label:'Diámetro del cabezal (D)',def:600},{id:'d',label:'Diámetro del ramal (d)',def:300},{id:'E',label:'Longitud del ramal (E)',def:400},{id:'O',label:'Desplazamiento de centros (O)',def:80}],
conoPerp:[{id:'D',label:'Diámetro base del cono (D1)',def:800},{id:'D2',label:'Diámetro superior del cono (D2)',def:400},{id:'d',label:'Diámetro del ramal (d)',def:200},{id:'H',label:'Altura del cono (H)',def:600},{id:'E',label:'Longitud del ramal (E)',def:300}],
conoParal:[{id:'D',label:'Diámetro base del cono (D1)',def:800},{id:'D2',label:'Diámetro superior del cono (D2)',def:400},{id:'d',label:'Diámetro del ramal (d)',def:200},{id:'H',label:'Altura del cono (H)',def:600},{id:'E',label:'Longitud del ramal (E)',def:300}]
};
function esquemaEntrada(t){
const img=src=>'<img src="img/'+src+'" style="width:100%;display:block;margin:0 auto" alt="'+t+'">';
switch(t){
case 'tuboRecto':      return img('tuboRecto.png');
case 'tuboTruncado':   return img('tuboTruncado.png');
case 'tuboRadio':      return img('tuboRadio.png');
case 'tuboIgual':      return img('tuboIgual.png');
case 'tuboDesigual':   return img('tuboDesigual.png');
case 'tuboDesplazado': return img('tuboDesplazado.png');
case 'conoPerp':       return img('conoPerp.png');
case 'conoParal':      return img('conoParal.png');
}
return '';}
function renderCampos(tipo){
$('esquemaEntrada').innerHTML=esquemaEntrada(tipo);
const cont=$('campos');cont.innerHTML='';
const lista=CAMPOS[tipo];
for(let i=0;i<lista.length;i+=2){
const fila=document.createElement('div');fila.className='fila';
[lista[i],lista[i+1]].forEach(campo=>{if(!campo)return;
const div=document.createElement('div');
div.innerHTML=`<label for="in_${campo.id}">${campo.label}</label><input type="number" id="in_${campo.id}" value="${campo.def}" step="any" min="0">`;
fila.appendChild(div);});
cont.appendChild(fila);}}
function leer(id){const el=$('in_'+id);if(!el)throw new Error('Falta el campo '+id);
const v=parseFloat(el.value);
if(isNaN(v))throw new Error('El campo "'+id+'" está vacío o no es numérico.');
if(v<=0)throw new Error('El campo "'+id+'" debe ser mayor que 0.');return v;}
function leerAngulo(id){const el=$('in_'+id);if(!el)throw new Error('Falta el ángulo '+id);
const v=parseFloat(el.value);if(isNaN(v))throw new Error('El ángulo "'+id+'" no es válido.');return v;}
function aviso(msg,tipo='error'){const a=$('aviso');a.textContent=msg;a.className='aviso '+tipo;setTimeout(()=>{a.className='aviso';},5000);}
const rad=g=>g*Math.PI/180;

function calcTuboRecto(D,H,N){const P=Math.PI*D,filas=[];
for(let i=0;i<=N;i++){filas.push([i,H.toFixed(2)]);}
return{titulo:'Tubo recto — desarrollo',encabezados:['Nº','Y (altura)'],filas,anchoDesarrollo:P};}
function calcTuboTruncado(D,H,a,N){const R=D/2,t=Math.tan(rad(a)),P=Math.PI*D;const filas=[];let yMin=Infinity,yMax=-Infinity;
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const y=H+R*t*(1-Math.cos(th));
yMin=Math.min(yMin,y);yMax=Math.max(yMax,y);
filas.push([i,y.toFixed(2)]);}
return{titulo:'Tubo truncado — desarrollo',encabezados:['Nº','Y (altura)'],filas,anchoDesarrollo:P};}
function calcTuboRadio(D,H,Rc,N){const R=D/2,P=Math.PI*D;const filas=[];
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const s=R*Math.sin(th);const raiz=Math.sqrt(Math.max(0,Rc*Rc-s*s));const y=H+(R-raiz)+Rc*0.5;
filas.push([i,y.toFixed(2)]);}
return{titulo:'Tubo truncado por radio — desarrollo',encabezados:['Nº','Y (altura)'],filas,anchoDesarrollo:P};}
function calcTuboIgual(D,E,N){const R=D/2,P=Math.PI*D;const filas=[];
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const c=Math.cos(th);const raiz=Math.sqrt(Math.max(0,R*R-(R*c)*(R*c)));const y=E-raiz+R*Math.abs(Math.sin(th));
filas.push([i,y.toFixed(2)]);}
return{titulo:'Intersección tubo-tubo (igual Ø) — desarrollo del ramal',encabezados:['Nº','Y (corte)'],filas,anchoDesarrollo:P};}
function calcTuboDesigual(D,d,E,N){const R=D/2,r=d/2,P=Math.PI*d;const filas=[];
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const c=Math.cos(th);const raiz=Math.sqrt(Math.max(0,R*R-(r*c)*(r*c)));const y=E-raiz+r*Math.abs(Math.sin(th));
filas.push([i,y.toFixed(2)]);}
return{titulo:'Intersección tubo-tubo (distinto Ø) — desarrollo del ramal',encabezados:['Nº','Y (corte)'],filas,anchoDesarrollo:P};}
function calcTuboDesplazado(D,d,E,O,N){const R=D/2,r=d/2,P=Math.PI*d;const filas=[];
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const c=Math.cos(th);const s=O+r*c;const raiz=Math.sqrt(Math.max(0,R*R-s*s));const y=E-raiz+r*Math.abs(Math.sin(th));
filas.push([i,y.toFixed(2)]);}
return{titulo:'Intersección con centros desplazados — desarrollo del ramal',encabezados:['Nº','Y (corte)'],filas,anchoDesarrollo:P};}
function calcConoPerp(D,D2,d,H,E,N){const R1=D/2,R2=D2/2,r=d/2,P=Math.PI*d;const filas=[];
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const c=Math.cos(th);
const Rc=R1+(R2-R1)*(E/H);
const rc=Math.max(Rc,r);
const raiz=Math.sqrt(Math.max(0,rc*rc-(r*c)*(r*c)));
const y=E-raiz+r*Math.abs(Math.sin(th));
filas.push([i,y.toFixed(2)]);}
return{titulo:'Intersección tubo-cono (perpendicular al eje) — desarrollo',encabezados:['Nº','Y (corte)'],filas,anchoDesarrollo:P};}
function calcConoParal(D,D2,d,H,E,N){const R1=D/2,R2=D2/2,r=d/2,P=Math.PI*d;const filas=[];
for(let i=0;i<=N;i++){const th=2*Math.PI*i/N;const c=Math.cos(th);
const z=Math.min(Math.max(E+r*c,0),H);
const Rc=R1+(R2-R1)*(z/H);
const y=E-Rc+r*Math.abs(Math.sin(th));
filas.push([i,y.toFixed(2)]);}
return{titulo:'Intersección tubo-cono (paralelo al eje) — desarrollo',encabezados:['Nº','Y (corte)'],filas,anchoDesarrollo:P};}

function calcular(){const tipo=$('tipo').value;const N=parseInt($('lineas').value,10);
try{let res;
switch(tipo){
case 'tuboRecto':res=calcTuboRecto(leer('D'),leer('H'),N);break;
case 'tuboTruncado':res=calcTuboTruncado(leer('D'),leer('H'),leerAngulo('a'),N);break;
case 'tuboRadio':res=calcTuboRadio(leer('D'),leer('H'),leer('R'),N);break;
case 'tuboIgual':res=calcTuboIgual(leer('D'),leer('E'),N);break;
case 'tuboDesigual':res=calcTuboDesigual(leer('D'),leer('d'),leer('E'),N);break;
case 'tuboDesplazado':res=calcTuboDesplazado(leer('D'),leer('d'),leer('E'),leer('O'),N);break;
case 'conoPerp':res=calcConoPerp(leer('D'),leer('D2'),leer('d'),leer('H'),leer('E'),N);break;
case 'conoParal':res=calcConoParal(leer('D'),leer('D2'),leer('d'),leer('H'),leer('E'),N);break;
default:throw new Error('Tipo no reconocido');}
ultimoResultado=res;dibujarImagenPatron(res);dibujarResumen(res);dibujarTabla(res);
aviso('Cálculo realizado correctamente.','ok');
}catch(e){aviso(e.message,'error');}}

function dibujarImagenPatron(res){
const cont=$('imagenPatron');
if(!cont)return;
const tipo=$('tipo').value;
const ruta='img/patron_'+tipo+'.png';
const test=new Image();
test.onload=()=>{cont.innerHTML='<img src="'+ruta+'" style="width:100%;display:block;margin:0 auto" alt="patrón '+tipo+'">';};
test.onerror=()=>{cont.innerHTML='';};
test.src=ruta;
}

function dibujarResumen(res){
const N=res.filas.length-1;
const sep=res.anchoDesarrollo/N;
const u=$('unidad').value==='mm'?'mm':'in';
let html='<div class="resumen">';
html+='<span>Perímetro: '+res.anchoDesarrollo.toFixed(2)+' '+u+'</span>';
html+='<span>Nº de líneas: '+N+'</span>';
html+='<span>Separación entre líneas: '+sep.toFixed(2)+' '+u+'</span>';
html+='</div>';
$('resumenSalida').innerHTML=html;}

function dibujarTabla(res){
let html='<table><thead><tr>';
res.encabezados.forEach(h=>html+='<th>'+h+'</th>');
html+='</tr></thead><tbody>';
res.filas.forEach(f=>{html+='<tr>';f.forEach(v=>html+='<td>'+v+'</td>');html+='</tr>';});
html+='</tbody></table>';
html+='<p class="nota" style="margin:8px 4px;">Marque la separación entre líneas con cinta métrica a partir del inicio del patrón. En cada línea, mida la altura Y.</p>';
$('tablaSalida').innerHTML=html;}

function exportarCSV(){
if(!ultimoResultado){aviso('Primero calcule un desarrollo.','error');return;}
const r=ultimoResultado;
const u=$('unidad').value==='mm'?'mm':'in';
const N=r.filas.length-1;
const sep=r.anchoDesarrollo/N;
let csv=r.titulo+' ('+u+')\n';
csv+='Perímetro;'+r.anchoDesarrollo.toFixed(3)+' '+u+'\n';
csv+='Nº de líneas;'+N+'\n';
csv+='Separación entre líneas;'+sep.toFixed(3)+' '+u+'\n\n';
csv+=r.encabezados.join(';')+'\n';
r.filas.forEach(f=>csv+=f.join(';')+'\n');
const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
const a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='desarrollo_'+$('tipo').value+'.csv';
document.body.appendChild(a);a.click();document.body.removeChild(a);
aviso('CSV exportado.','ok');}

document.addEventListener('DOMContentLoaded',()=>{
renderCampos($('tipo').value);
$('tipo').addEventListener('change',e=>renderCampos(e.target.value));
$('btnCalcular').addEventListener('click',calcular);
$('btnCSV').addEventListener('click',exportarCSV);});