import re

# Nombre de los archivos de entrada y salida
archivo_entrada = "articulos.txt"
archivo_salida = "articulos_modificado.txt"

# Palabras clave en plural a buscar
palabras_clave = ["arandelas", "tornillos", "tuercas", "remaches"]
patron_palabras = re.compile("|".join(palabras_clave), re.IGNORECASE)

# Expresión regular para capturar el primer campo entrecomillado de la línea
# Ejemplo: "Nombre del articulo", "otro_campo", ...
patron_primer_comillas = re.compile(r'^"([^"]*)"')

lineas_modificadas = []

with open(archivo_entrada, "r", encoding="utf-8") as f:
    for linea in f:
        # Extraemos el contenido del primer par de comillas
        match = patron_primer_comillas.search(linea)
        if match:
            primer_campo = match.group(1)
            # Verificamos si alguna palabra clave en plural está dentro del primer entrecomillado
            if patron_palabras.search(primer_campo):
                # Reemplazamos los códigos en toda la línea
                linea = linea.replace('"304"', '"A2"')
                linea = linea.replace('"316"', '"A4"')
        
        lineas_modificadas.append(linea)

# Guardar los cambios en el archivo resultante
with open(archivo_salida, "w", encoding="utf-8") as f:
    f.writelines(lineas_modificadas)

print(f"Proceso completado. Archivo generado: {archivo_salida}")
