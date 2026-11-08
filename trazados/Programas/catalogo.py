import webview

if __name__ == '__main__':
    #  Abre tu catálogo en una ventana de escritorio independiente
    window = webview.create_window(
        title='Catálogo de Piezas 3D', 
        url='http://localhost:8000/pid.html',
        width=1200, 
        height=800,
        resizable=True
    )
    webview.start()
