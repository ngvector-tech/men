@echo off
cd /d "%~dp0"
taskkill /f /im python.exe >nul 2>&1
echo Iniciando servidor local en http://localhost:8000 ...
python -m http.server 8000
pause