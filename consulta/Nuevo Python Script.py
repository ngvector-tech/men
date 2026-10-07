from pathlib import Path
from rembg import remove, new_session
from PIL import Image

#Crear una sesión para reutilizarla y que sea más rápido
session = new_session()

carpeta = Path("imagenes/")
for archivo in carpeta.glob("*.jpg"):
    img = Image.open(archivo)
    # Usar la sesión ya creada
    resultado = remove(img, session=session)
    ruta_salida = archivo.with_suffix(".png")
    resultado.save(ruta_salida)
    print(f"Procesado: {archivo.name}")
