@echo off
set "PATH=C:\Users\Pat\.gemini\antigravity\scratch\_tools\node-v22.12.0-win-x64;%PATH%"
cd /d "%~dp0"
echo Starting Chinese Review Web App at http://localhost:5173 ...
call node_modules\.bin\vite.cmd
