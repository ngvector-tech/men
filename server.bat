@echo off
cd /d "%~dp0"

:: Crear un script temporal en VBScript
echo Set WshShell = CreateObject("WScript.Shell") > "%temp%\servidor_oculto.vbs"
echo WshShell.Run "cmd /c python -m http.server 8000", 0, False >> "%temp%\servidor_oculto.vbs"

:: Ejecutar el script oculto y borrarlo
cscript //nologo "%temp%\servidor_oculto.vbs"
del "%temp%\servidor_oculto.vbs"

:: Esperar a que arranque el servidor
timeout /t 1 /nobreak >nul

:: Abrir el navegador
start "" "http://localhost:8000/index.html"

:: Salir de este archivo bat inmediatamente
exit