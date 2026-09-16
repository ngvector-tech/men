// men-header.js
// Inserta automáticamente la cabecera MEN al inicio del <body>
(function () {
  const autor = document.currentScript.dataset.autor || "Creado por:";
  const header = document.createElement('header');
  header.className = 'men-header';
  header.innerHTML = `
   <div class="men-logo">MEN</div>
  <div class="men-des">Montajes Industriales S. L.</div>
  <div class="men-subtitle">${autor}</div>
  `;
  document.body.insertBefore(header, document.body.firstChild);
})();