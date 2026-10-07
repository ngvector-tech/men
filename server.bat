@echo off
cd /d "%~dp0"

echo Iniciando servidor local en http://localhost:8000 ...
start "" /min cmd /c "python -m http.server 8000"

timeout /t 2 /nobreak >nul

start "" "http://localhost:8000/index.html"

echo Servidor iniciado. Cierra la ventana minimizada para detenerlo.
pause