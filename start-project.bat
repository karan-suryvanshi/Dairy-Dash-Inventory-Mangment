@echo off
title DairyDash AI - Full Stack Launcher
echo ===================================================
echo        Starting DairyDash AI Full Stack System
echo ===================================================
echo.
echo 1. Launching Spring Boot Backend on http://localhost:8080 ...
start "DairyDash Backend (Spring Boot)" cmd /k "cd /d %~dp0backend && mvnw.cmd spring-boot:run"

echo 2. Launching React Vite Frontend on http://localhost:5173 ...
start "DairyDash Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:8080
echo.
pause

