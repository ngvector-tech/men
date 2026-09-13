/* =========================================================
   Base de datos de dimensiones (face-to-face) en mm
   Valores orientativos según EN 558 y catálogos habituales.
   Racores DIN 11851 según catálogo facilitado.
   ========================================================= */
const baseDatos = {

  /* ---------- VÁLVULAS ---------- */

  globo: {
    tipo: "valvula",
    nombre: "Válvula de globo (Serie 1)",
    imagen: "img/valvula_globo.png",
    datos: {
      "DN15":  { "PN16": 130, "PN40": 130 },
      "DN20":  { "PN16": 150, "PN40": 150 },
      "DN25":  { "PN16": 160, "PN40": 160 },
      "DN32":  { "PN16": 180, "PN40": 180 },
      "DN40":  { "PN16": 200, "PN40": 200 },
      "DN50":  { "PN16": 230, "PN40": 230 },
      "DN65":  { "PN16": 290, "PN40": 290 },
      "DN80":  { "PN16": 310, "PN40": 310 },
      "DN100": { "PN16": 350, "PN40": 350 },
      "DN125": { "PN16": 400, "PN40": 400 },
      "DN150": { "PN16": 480, "PN40": 480 },
      "DN200": { "PN16": 600, "PN40": 600 },
      "DN250": { "PN16": 730, "PN40": 730 },
      "DN300": { "PN16": 850, "PN40": 850 }
    }
  },

  retencion: {
    tipo: "valvula",
    nombre: "Válvula antirretorno wafer (Serie 16)",
    imagen: "img/valvula_retencion_wafer.png",
    datos: {
      "DN50":  { "PN10": 56,  "PN16": 56,  "PN25": 60 },
      "DN65":  { "PN10": 66,  "PN16": 66,  "PN25": 70 },
      "DN80":  { "PN10": 76,  "PN16": 76,  "PN25": 80 },
      "DN100": { "PN10": 90,  "PN16": 90,  "PN25": 95 },
      "DN125": { "PN10": 110, "PN16": 110, "PN25": 115 },
      "DN150": { "PN10": 125, "PN16": 125, "PN25": 130 },
      "DN200": { "PN10": 160, "PN16": 160, "PN25": 165 },
      "DN250": { "PN10": 200, "PN16": 200, "PN25": 205 },
      "DN300": { "PN10": 230, "PN16": 230, "PN25": 240 },
      "DN350": { "PN10": 260, "PN16": 260, "PN25": 270 },
      "DN400": { "PN10": 290, "PN16": 290, "PN25": 300 },
      "DN450": { "PN10": 320, "PN16": 320, "PN25": 330 },
      "DN500": { "PN10": 350, "PN16": 350, "PN25": 360 },
      "DN600": { "PN10": 410, "PN16": 410, "PN25": 420 }
    }
  },

  filtro: {
    tipo: "valvula",
    nombre: "Filtro con brida (Serie 1)",
    imagen: "img/filtro_brida.png",
    datos: {
      "DN15":  { "PN16": 130 },
      "DN20":  { "PN16": 150 },
      "DN25":  { "PN16": 160 },
      "DN32":  { "PN16": 180 },
      "DN40":  { "PN16": 200 },
      "DN50":  { "PN16": 230 },
      "DN65":  { "PN16": 290 },
      "DN80":  { "PN16": 310 },
      "DN100": { "PN16": 350 },
      "DN125": { "PN16": 400 },
      "DN150": { "PN16": 480 },
      "DN200": { "PN16": 600 },
      "DN250": { "PN16": 730 },
      "DN300": { "PN16": 850 }
    }
  },

  bola: {
    tipo: "valvula",
    nombre: "Válvula de bola con brida (Serie 14)",
    imagen: "img/valvula_bola_brida.png",
    datos: {
      "DN15":  { "PN16": 130 },
      "DN20":  { "PN16": 150 },
      "DN25":  { "PN16": 160 },
      "DN32":  { "PN16": 180 },
      "DN40":  { "PN16": 200 },
      "DN50":  { "PN16": 230 },
      "DN65":  { "PN16": 290 },
      "DN80":  { "PN16": 310 },
      "DN100": { "PN16": 350 },
      "DN125": { "PN16": 400 },
      "DN150": { "PN16": 480 },
      "DN200": { "PN16": 600 },
      "DN250": { "PN16": 730 },
      "DN300": { "PN16": 850 },
      "DN350": { "PN16": 980 },
      "DN400": { "PN16": 1100 },
      "DN450": { "PN16": 1200 },
      "DN500": { "PN16": 1250 }
    }
  },

  mariposa_wafer: {
    tipo: "valvula",
    nombre: "Válvula de mariposa Wafer (EN 558 Serie 20)",
    imagen: "img/valvula_mariposa_wafer.png",
    datos: {
      "DN50":   { "PN10/16": 43 },
      "DN65":   { "PN10/16": 46 },
      "DN80":   { "PN10/16": 46 },
      "DN100":  { "PN10/16": 52 },
      "DN125":  { "PN10/16": 56 },
      "DN150":  { "PN10/16": 56 },
      "DN200":  { "PN10/16": 60 },
      "DN250":  { "PN10/16": 68 },
      "DN300":  { "PN10/16": 78 },
      "DN350":  { "PN10/16": 78 },
      "DN400":  { "PN10/16": 102 },
      "DN450":  { "PN10/16": 114 },
      "DN500":  { "PN10/16": 127 },
      "DN600":  { "PN10/16": 154 },
      "DN700":  { "PN10/16": 165 },
      "DN800":  { "PN10/16": 190 },
      "DN900":  { "PN10/16": 203 },
      "DN1000": { "PN10/16": 216 },
      "DN1200": { "PN10/16": 254 }
    }
  },

  mariposa_lug: {
    tipo: "valvula",
    nombre: "Válvula de mariposa Lug (EN 558 Serie 20)",
    imagen: "img/valvula_mariposa_lug.png",
    datos: {
      "DN50":   { "PN10/16": 43 },
      "DN65":   { "PN10/16": 46 },
      "DN80":   { "PN10/16": 46 },
      "DN100":  { "PN10/16": 52 },
      "DN125":  { "PN10/16": 56 },
      "DN150":  { "PN10/16": 56 },
      "DN200":  { "PN10/16": 60 },
      "DN250":  { "PN10/16": 68 },
      "DN300":  { "PN10/16": 78 },
      "DN350":  { "PN10/16": 78 },
      "DN400":  { "PN10/16": 102 },
      "DN450":  { "PN10/16": 114 },
      "DN500":  { "PN10/16": 127 },
      "DN600":  { "PN10/16": 154 },
      "DN700":  { "PN10/16": 165 },
      "DN800":  { "PN10/16": 190 },
      "DN900":  { "PN10/16": 203 },
      "DN1000": { "PN10/16": 216 },
      "DN1200": { "PN10/16": 254 }
    }
  },

  /* ---------- RACORES DIN 11851 ---------- */

  casquillo: {
    tipo: "racor",
    nombre: "Racor casquillo soldar DIN 11851",
    imagen: "img/racor_casquillo.png",
    datos: {
      "DN10":  { codA304: "852CS010", codA316L: "854CS010", A: 10,  B: 15,  C: 22.5, H: 17, peso: 0.02 },
      "DN15":  { codA304: "852CS015", codA316L: "854CS015", A: 16,  B: 21,  C: 28.5, H: 17, peso: 0.03 },
      "DN20":  { codA304: "852CS020", codA316L: "854CS020", A: 20,  B: 25,  C: 36.5, H: 18, peso: 0.06 },
      "DN25":  { codA304: "852CS025", codA316L: "854CS025", A: 26,  B: 31,  C: 44,   H: 22, peso: 0.09 },
      "DN32":  { codA304: "852CS032", codA316L: "854CS032", A: 32,  B: 37,  C: 50,   H: 25, peso: 0.11 },
      "DN40":  { codA304: "852CS040", codA316L: "854CS040", A: 38,  B: 43,  C: 56,   H: 26, peso: 0.13 },
      "DN50":  { codA304: "852CS050", codA316L: "854CS050", A: 50,  B: 55,  C: 68.5, H: 28, peso: 0.18 },
      "DN65":  { codA304: "852CS065", codA316L: "854CS065", A: 66,  B: 72,  C: 86,   H: 32, peso: 0.29 },
      "DN80":  { codA304: "852CS080", codA316L: "854CS080", A: 81,  B: 87,  C: 100,  H: 37, peso: 0.36 },
      "DN100": { codA304: "852CS100", codA316L: "854CS100", A: 100, B: 106, C: 121,  H: 44, peso: 0.55 },
      "DN125": { codA304: "852CS125", codA316L: "854CS125", A: 125, B: 132, C: 150,  H: 34, peso: 0.81 },
      "DN150": { codA304: "852CS150", codA316L: "854CS150", A: 150, B: 157, C: 176,  H: 37, peso: 1.11 }
    }
  },

  macho: {
    tipo: "racor",
    nombre: "Racor macho soldar DIN 11851",
    imagen: "img/racor_macho.png",
    datos: {
      "DN10":  { codA304: "852MS010", codA316L: "854MS010", A: 10,  B: 15,  C: "Rd28×1/8\"",  H: 21, peso: 0.04 },
      "DN15":  { codA304: "852MS015", codA316L: "854MS015", A: 16,  B: 21,  C: "Rd34×1/8\"",  H: 21, peso: 0.05 },
      "DN20":  { codA304: "852MS020", codA316L: "854MS020", A: 20,  B: 25,  C: "Rd44×1/6\"",  H: 24, peso: 0.09 },
      "DN25":  { codA304: "852MS025", codA316L: "854MS025", A: 26,  B: 31,  C: "Rd52×1/6\"",  H: 29, peso: 0.12 },
      "DN32":  { codA304: "852MS032", codA316L: "854MS032", A: 32,  B: 37,  C: "Rd58×1/6\"",  H: 32, peso: 0.15 },
      "DN40":  { codA304: "852MS040", codA316L: "854MS040", A: 38,  B: 43,  C: "Rd65×1/6\"",  H: 33, peso: 0.17 },
      "DN50":  { codA304: "852MS050", codA316L: "854MS050", A: 50,  B: 55,  C: "Rd78×1/6\"",  H: 35, peso: 0.22 },
      "DN65":  { codA304: "852MS065", codA316L: "854MS065", A: 66,  B: 72,  C: "Rd95×1/6\"",  H: 40, peso: 0.37 },
      "DN80":  { codA304: "852MS080", codA316L: "854MS080", A: 81,  B: 87,  C: "Rd110×1/4\"", H: 45, peso: 0.54 },
      "DN100": { codA304: "852MS100", codA316L: "854MS100", A: 100, B: 106, C: "Rd130×1/4\"", H: 54, peso: 0.65 },
      "DN125": { codA304: "852MS125", codA316L: "854MS125", A: 125, B: 132, C: "Rd160×1/4\"", H: 46, peso: 0.96 },
      "DN150": { codA304: "852MS150", codA316L: "854MS150", A: 150, B: 157, C: "Rd190×1/4\"", H: 50, peso: 1.80 }
    }
  }

};

const $ = id => document.getElementById(id);
let tipoActual = null;

/* --- Cambio de tipo (válvula o racor) --- */
$('tipoValvula').addEventListener('change', function() {
  tipoActual = this.value;

  const dnSelect = $('dn');
  const pnSelect = $('pn');
  const resDiv   = $('resultado');
  const imgDiv   = $('imagenArea');

  /* Reiniciar */
  dnSelect.innerHTML = '<option value="">— Seleccione DN —</option>';
  pnSelect.innerHTML = '<option value="">— Seleccione PN —</option>';
  dnSelect.disabled = true;
  pnSelect.disabled = true;
  resDiv.classList.remove('visible');
  resDiv.innerHTML = '';

  if (!tipoActual || !baseDatos[tipoActual]) {
    imgDiv.innerHTML = '<p>Seleccione una válvula o racor para ver su imagen</p>';
    return;
  }

  const info = baseDatos[tipoActual];

  /* Rellenar DN */
  Object.keys(info.datos).forEach(dn => {
    const opt = document.createElement('option');
    opt.value = dn;
    opt.textContent = dn;
    dnSelect.appendChild(opt);
  });
  dnSelect.disabled = false;

  /* Mostrar/ocultar PN según tipo */
  const pnLabel = document.querySelector('label[for="pn"]');
  if (info.tipo === 'valvula') {
    pnSelect.style.display = '';
    if (pnLabel) pnLabel.style.display = '';
    pnSelect.disabled = false;
  } else {
    pnSelect.style.display = 'none';
    if (pnLabel) pnLabel.style.display = 'none';
    pnSelect.disabled = true;
  }

  /* Mostrar imagen */
  imgDiv.innerHTML = '';
  const img = document.createElement('img');
  img.src = info.imagen;
  img.alt = info.nombre;
  img.onerror = function() {
    imgDiv.innerHTML = '<p>Imagen no disponible (' + info.imagen + ')</p>';
  };
  imgDiv.appendChild(img);
});

/* --- Cambio de DN --- */
$('dn').addEventListener('change', function() {
  const tipo = baseDatos[tipoActual];
  const resDiv = $('resultado');
  const pnSelect = $('pn');

  resDiv.classList.remove('visible');
  resDiv.innerHTML = '';

  if (!this.value || !tipoActual) return;

  if (tipo.tipo === 'racor') {
    /* Racor: tabla con solo A, B, C y H */
    const d = tipo.datos[this.value];
    if (!d) return;

    const tieneRosca = (typeof d.C === 'string');

    let html = '';
    html += '<div style="font-weight:700;margin-bottom:6px">' + tipo.nombre + ' — ' + this.value + '</div>';
    html += '<table style="border-collapse:collapse;width:100%;font-size:.95rem">';
    html += '<thead><tr>' +
              '<th style="background:var(--azul-claro);padding:8px 14px;border:1px solid var(--borde);color:var(--azul);text-align:left">Cota</th>' +
              '<th style="background:var(--azul-claro);padding:8px 14px;border:1px solid var(--borde);color:var(--azul);text-align:left">Valor</th>' +
            '</tr></thead><tbody>';
    html += fila('Ø A', d.A + ' mm');
    html += fila('Ø B', d.B + ' mm');
    html += fila(tieneRosca ? 'C (rosca)' : 'C', tieneRosca ? d.C : d.C + ' mm');
    html += fila('H', d.H + ' mm');
    html += '</tbody></table>';

    resDiv.innerHTML = html;
    resDiv.classList.add('visible');
    return;
  }

  /* Válvula: rellenar PN */
  pnSelect.innerHTML = '<option value="">— Seleccione PN —</option>';
  pnSelect.disabled = true;

  Object.keys(tipo.datos[this.value]).forEach(pn => {
    const opt = document.createElement('option');
    opt.value = pn;
    opt.textContent = pn;
    pnSelect.appendChild(opt);
  });
  pnSelect.disabled = false;
});

/* --- Cambio de PN (solo válvulas) --- */
$('pn').addEventListener('change', function() {
  const resDiv = $('resultado');
  resDiv.classList.remove('visible');
  resDiv.innerHTML = '';

  if (!this.value || !tipoActual || !$('dn').value) return;

  const tipo = baseDatos[tipoActual];
  if (tipo.tipo !== 'valvula') return;

  const valor = tipo.datos[$('dn').value][this.value];

  if (valor) {
    resDiv.innerHTML =
      'Distancia entre caras (FTF)' +
      '<span class="valor">' + valor + ' mm</span>';
    resDiv.classList.add('visible');
  } else {
    resDiv.textContent = 'No hay datos para esta combinación.';
    resDiv.classList.add('visible');
  }
});

/* ---------- Utilidad: fila de tabla ---------- */
function fila(etiq, valor){
  return '<tr>' +
    '<td style="border:1px solid var(--borde);padding:6px 14px">' + etiq + '</td>' +
    '<td style="border:1px solid var(--borde);padding:6px 14px;text-align:right">' + valor + '</td>' +
  '</tr>';
}