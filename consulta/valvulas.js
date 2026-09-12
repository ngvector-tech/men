/* =========================================================
   Base de datos de dimensiones (face-to-face) en mm
   Valores orientativos según EN 558 y catálogos habituales.
   Sustitúyalos por los de sus catálogos reales si es necesario.
   ========================================================= */
const baseDatos = {

  globo: {
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
  }

};

const $ = id => document.getElementById(id);
let tipoActual = null;

/* --- Cambio de tipo de válvula --- */
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
  resDiv.textContent = '';

  if (!tipoActual || !baseDatos[tipoActual]) {
    imgDiv.innerHTML = '<p>Seleccione una válvula para ver su imagen</p>';
    return;
  }

  /* Rellenar DN */
  Object.keys(baseDatos[tipoActual].datos).forEach(dn => {
    const opt = document.createElement('option');
    opt.value = dn;
    opt.textContent = dn;
    dnSelect.appendChild(opt);
  });
  dnSelect.disabled = false;

  /* Mostrar imagen */
  const info = baseDatos[tipoActual];
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
  const pnSelect = $('pn');
  pnSelect.innerHTML = '<option value="">— Seleccione PN —</option>';
  pnSelect.disabled = true;
  $('resultado').classList.remove('visible');

  if (!this.value || !tipoActual) return;

  Object.keys(baseDatos[tipoActual].datos[this.value]).forEach(pn => {
    const opt = document.createElement('option');
    opt.value = pn;
    opt.textContent = pn;
    pnSelect.appendChild(opt);
  });
  pnSelect.disabled = false;
});

/* --- Cambio de PN: mostramos el resultado --- */
$('pn').addEventListener('change', function() {
  const resDiv = $('resultado');
  resDiv.classList.remove('visible');

  if (!this.value || !tipoActual || !$('dn').value) return;

  const valor = baseDatos[tipoActual].datos[$('dn').value][this.value];

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