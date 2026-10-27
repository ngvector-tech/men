const fs = require('fs');
const path = require('path');

const CARPETA_SALIDA = './svg-procesados';
const ARCHIVO_JSON = './catalogo.json';

const catalogo = {};

// Verificar si existe la carpeta principal
if (fs.existsSync(CARPETA_SALIDA)) {
    // Leer las carpetas dentro de svg-procesados
    const carpetas = fs.readdirSync(CARPETA_SALIDA)
        .filter(f => fs.statSync(path.join(CARPETA_SALIDA, f)).isDirectory())
        .sort(); // Orden alfabético de carpetas
    
    carpetas.forEach(carpeta => {
        const rutaCarpeta = path.join(CARPETA_SALIDA, carpeta);
        
        // Leer todos los archivos .svg de la carpeta
        const archivos = fs.readdirSync(rutaCarpeta)
            .filter(f => f.endsWith('.svg'))
            .sort(); // Orden alfabético de archivos
        
        catalogo[carpeta] = archivos.map(archivo => {
            // 1. Quitar la extensión .svg
            let nombre = archivo.replace('.svg', '');
            
            // 2. Quitar el número inicial y el primer guion bajo (ej: "0_gate" -> "gate")
            nombre = nombre.replace(/^\d+_/, '');
            
            // 3. Reemplazar los guiones bajos restantes por espacios
            nombre = nombre.replace(/_/g, ' ');
            
            // 4. Limpiar espacios dobles por si acaso y poner primera letra en mayúscula
            nombre = nombre.replace(/\s+/g, ' ').trim();
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            
            return {
                nombre: nombre,
                ruta: `${CARPETA_SALIDA}/${carpeta}/${archivo}` // Ruta intacta
            };
        });
    });

    // Guardar el archivo JSON formateado
    fs.writeFileSync(ARCHIVO_JSON, JSON.stringify(catalogo, null, 4), 'utf8');
    
    console.log('✅ Catálogo generado con éxito en: ' + ARCHIVO_JSON);
    
    let total = 0;
    Object.values(catalogo).forEach(arr => total += arr.length);
    console.log(`📦 Categorías: ${carpetas.length} | Símbolos totales: ${total}`);
} else {
    console.log('❌ No se encontró la carpeta ' + CARPETA_SALIDA);
}