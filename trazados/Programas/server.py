from http.server import SimpleHTTPRequestHandler, HTTPServer
import json
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/config_puertos.json':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Sobrescribe directamente el archivo original en el directorio
            with open('config_puertos.json', 'wb') as f:
                f.write(post_data)
                
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"status": "ok"}')
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server_address = ('', 8000)
    print("Servidor local corriendo en http://localhost:8000 con soporte de escritura directa.")
    HTTPServer(server_address, CORSRequestHandler).serve_forever()
