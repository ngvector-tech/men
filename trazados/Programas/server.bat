@echo off
title Servidor Local - Isometrico MEN
echo ===================================================
echo   Iniciando Servidor Python para Isometrico.html
echo ===================================================
echo.

:: Abre el navegador por defecto en la ruta de tu archivo (asegúrate de que el nombre coincide)
:: El comando "start" abre el navegador, y el "timeout" da 2 segundos para que arranque el servidor
start http://localhost:8000/isometrico.html
timeout /t 2 /nobreak >nul

:: Inicia el servidor Python en el puerto 8000
python -m http.server 8000

:: Si el servidor se cierra o da error, pausa para que puedas leer el mensaje
pause