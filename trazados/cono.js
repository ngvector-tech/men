const $=id=>document.getElementById(id);
let ultimoResultado=null;
let tablaVisible=false;

const CAMPOS={
  completo:[
    {id:'D',label:'Diámetro grande (D)',def:800},
    {id:'H',label:'Altura del cono (H)',def:600}
  ],
  truncado:[
    {id:'D',label:'Diámetro grande (D)',def:800},
    {id:'d',label:'Diámetro pequeño (d)',def:400},
    {id:'H',label:'Altura del cono (H)',def:600}
  ],
  excentrico:[
    {id:'D',label:'Diámetro grande (D)',def:800},
    {id:'d',label:'Diámetro pequeño (d)',def:400},
    {id:'H',label:'Altura del cono (H)',def:600},
    {id:'O',label:'Desplazamiento (O)',def:100}
  ]
};

function cargarEsquema(t){
  const img=src=>'<img src="img/'+src+'" style="width:100%;display:block;margin:0 auto" alt="'+t+'">';
  switch(t){
    case 'completo':   return img('conoCompleto.png');
    case 'truncado':   return img('conoTruncado.png');
    case 'excentrico': return img('conoExcentrico.png');
  }
  return '';
}

function renderCampos(tipo){
  $('esquemaEntrada').innerHTML=cargarEsquema(tipo);
  const cont=$('campos');cont.innerHTML='';
  const lista=CAMPOS[tipo];
  for(let i=0;i<lista.length;i+=2){
    const fila=document.createElement('div');fila.className='fila';
    [lista[i],lista[i+1]].forEach(campo=>{
      if(!campo) return;
      const div=document.createElement('div');
      div.innerHTML=`<label for="in_${campo.id}">${campo.label}</label><input type="number" id="in_${campo.id}" value="${campo.def}" step="any" min="0">`;
      fila.appendChild(div);
    });
    cont.appendChild(fila);
  }
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

function calcConoCompleto(D,H,N){
  const R=D/2;
  const L=Math.sqrt(R*R+H*H);
  const R1=L;
  const theta=360*R/L;
  const X=2*R1*Math.sin(rad(theta/2));

  const filas=[];
  for(let i=0;i<=N;i++){
    const ang=theta*i/N;
    filas.push([i, ang.toFixed(2), (2*Math.PI*R1*ang/360).toFixed(2)]);
  }
  return {
    titulo:'Cono completo',
    encabezados:['Nº','Ángulo parcial (°)','Longitud de arco'],
    filas,
    R1, R2:0, theta, X, L, H, D, d:0, N,
    tipoResumen:'completo'
  };
}

function calcConoTruncado(D,d,H,N){
  if(d>=D) throw new Error('El diámetro pequeño debe ser menor que el grande.');
  const R=D/2, r=d/2;
  const L=Math.sqrt((R-r)*(R-r)+H*H);
  const R1=L*D/(D-d);
  const R2=R1-L;
  const theta=180*D/R1;
  const X1=2*R1*Math.sin(rad(theta/2));
  const X2=2*R2*Math.sin(rad(theta/2));

  const filas=[];
  for(let i=0;i<=N;i++){
    const ang=theta*i/N;
    filas.push([i, ang.toFixed(2), (2*Math.PI*R1*ang/360).toFixed(2), (2*Math.PI*R2*ang/360).toFixed(2)]);
  }
  return {
    titulo:'Cono truncado',
    encabezados:['Nº','Ángulo parcial (°)','Arco exterior','Arco interior'],
    filas,
    R1, R2, theta, X1, X2, L, H, D, d, N,
    tipoResumen:'truncado'
  };
}

function calcConoExcentrico(D,d,H,O,N){
  if(d>=D) throw new Error('El diámetro pequeño debe ser menor que el grande.');
  const R=D/2, r=d/2;
  const Lmax=Math.sqrt((R-r+O)*(R-r+O)+H*H);
  const Lmin=Math.sqrt(Math.max(0,(R-r-O)*(R-r-O))+H*H);
  const Lmed=(Lmax+Lmin)/2;

  const R1=Lmax*D/(D-d);
  const R2=R1-Lmed;
  const theta=180*D/R1;
  const X1=2*R1*Math.sin(rad(theta/2));
  const X2=2*R2*Math.sin(rad(theta/2));

  const filas=[];
  for(let i=0;i<=N;i++){
    const ang=theta*i/N;
    const radAng=rad(ang);
    const Lg=Lmed+(Lmax-Lmin)/2*Math.cos(radAng);
    filas.push([i, ang.toFixed(2), Lg.toFixed(2), (R1-Lg).toFixed(2)]);
  }
  return {
    titulo:'Cono excéntrico',
    encabezados:['Nº','Ángulo parcial (°)','Generatriz ext.','Generatriz int.'],
    filas,
    R1, R2, theta, X1, X2, L:Lmed, H, D, d, O, Lmax, Lmin, N,
    tipoResumen:'excentrico'
  };
}

function calcular(){
  const tipo=$('tipo').value;
  const N=parseInt($('lineas').value,10);
  try{
    let res;
    switch(tipo){
      case 'completo':   res=calcConoCompleto(leer('D'),leer('H'),N); break;
      case 'truncado':   res=calcConoTruncado(leer('D'),leer('d'),leer('H'),N); break;
      case 'excentrico': res=calcConoExcentrico(leer('D'),leer('d'),leer('H'),leer('O'),N); break;
      default: throw new Error('Tipo no reconocido');
    }
    ultimoResultado=res;
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
  const tipo=$('tipo').value;
  let nombre;
  switch(tipo){
    case 'completo':   nombre='patron_Completo.png'; break;
    case 'truncado':   nombre='patron_Truncado.png'; break;
    case 'excentrico': nombre='patron_Excentrico.png'; break;
    default: nombre='';
  }
  if(!nombre){ cont.innerHTML=''; return; }
  const ruta='img/'+nombre;
  const test=new Image();
  test.onload=()=>{ cont.innerHTML='<img src="'+ruta+'" style="width:100%;display:block;margin:0 auto" alt="patrón '+tipo+'">'; };
  test.onerror=()=>{ cont.innerHTML=''; };
  test.src=ruta;
}

function dibujarResumen(res){
  const u=$('unidad').value==='mm'?'mm':'in';
  let html='<div class="resumen">';
  if(res.tipoResumen==='completo'){
    html+='<div class="dato">R (radio del desarrollo): '+res.R1.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">θ (ángulo del sector): '+res.theta.toFixed(2)+'°</div>';
    html+='<div class="dato">X (cuerda): '+res.X.toFixed(2)+' '+u+'</div>';
  } else if(res.tipoResumen==='truncado'){
    html+='<div class="dato">R1 (radio exterior): '+res.R1.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">R2 (radio interior): '+res.R2.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">θ (ángulo del sector): '+res.theta.toFixed(2)+'°</div>';
    html+='<div class="dato">X1 (cuerda exterior): '+res.X1.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">X2 (cuerda interior): '+res.X2.toFixed(2)+' '+u+'</div>';
  } else if(res.tipoResumen==='excentrico'){
    html+='<div class="dato">R1 (radio exterior): '+res.R1.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">R2 (radio interior): '+res.R2.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">θ (ángulo del sector): '+res.theta.toFixed(2)+'°</div>';
    html+='<div class="dato">X1 (cuerda exterior): '+res.X1.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">X2 (cuerda interior): '+res.X2.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">L máx (generatriz máxima): '+res.Lmax.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">L mín (generatriz mínima): '+res.Lmin.toFixed(2)+' '+u+'</div>';
    html+='<div class="dato">O (desplazamiento): '+res.O.toFixed(2)+' '+u+'</div>';
  }
  html+='</div>';
  $('resumenSalida').innerHTML=html;
}

function dibujarTabla(res){
  let html='<table><thead><tr>';
  res.encabezados.forEach(h=>html+='<th>'+h+'</th>');
  html+='</tr></thead><tbody>';
  res.filas.forEach(f=>{ html+='<tr>'; f.forEach(v=>html+='<td>'+v+'</td>'); html+='</tr>'; });
  html+='</tbody></table>';
  html+='<p class="nota" style="margin:8px 4px;">Marque los puntos del arco según la columna "Ángulo parcial" y trace el contorno del desarrollo.</p>';
  $('tablaSalida').innerHTML=html;
}

function toggleTabla(){
  tablaVisible=!tablaVisible;
  const cont=$('tablaSalida');
  const btn=$('btnTabla');
  if(tablaVisible){
    cont.classList.add('visible');
    btn.textContent='Ocultar tabla detallada';
  } else {
    cont.classList.remove('visible');
    btn.textContent='Ver tabla detallada';
  }
}

function exportarCSV(){
  if(!ultimoResultado){ aviso('Primero calcule un desarrollo.','error'); return; }
  const r=ultimoResultado;
  const u=$('unidad').value==='mm'?'mm':'in';

  let csv=r.titulo+' ('+u+')\n';
  if(r.tipoResumen==='completo'){
    csv+='R;'+r.R1.toFixed(3)+' '+u+'\n';
    csv+='Theta;'+r.theta.toFixed(3)+' °\n';
    csv+='X;'+r.X.toFixed(3)+' '+u+'\n';
  } else if(r.tipoResumen==='truncado'){
    csv+='R1;'+r.R1.toFixed(3)+' '+u+'\n';
    csv+='R2;'+r.R2.toFixed(3)+' '+u+'\n';
    csv+='Theta;'+r.theta.toFixed(3)+' °\n';
    csv+='X1;'+r.X1.toFixed(3)+' '+u+'\n';
    csv+='X2;'+r.X2.toFixed(3)+' '+u+'\n';
  } else if(r.tipoResumen==='excentrico'){
    csv+='R1;'+r.R1.toFixed(3)+' '+u+'\n';
    csv+='R2;'+r.R2.toFixed(3)+' '+u+'\n';
    csv+='Theta;'+r.theta.toFixed(3)+' °\n';
    csv+='X1;'+r.X1.toFixed(3)+' '+u+'\n';
    csv+='X2;'+r.X2.toFixed(3)+' '+u+'\n';
    csv+='L max;'+r.Lmax.toFixed(3)+' '+u+'\n';
    csv+='L min;'+r.Lmin.toFixed(3)+' '+u+'\n';
    csv+='O;'+r.O.toFixed(3)+' '+u+'\n';
  }
  csv+='\n'+r.encabezados.join(';')+'\n';
  r.filas.forEach(f=>csv+=f.join(';')+'\n');

  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='desarrollo_cono_'+$('tipo').value+'.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  aviso('CSV exportado.','ok');
}

/* Arranque */
renderCampos($('tipo').value);
$('tipo').addEventListener('change',e=>renderCampos(e.target.value));
$('btnCalcular').addEventListener('click',calcular);
$('btnCSV').addEventListener('click',exportarCSV);
$('btnTabla').addEventListener('click',toggleTabla);