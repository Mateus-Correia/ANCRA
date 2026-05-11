@echo off
echo ==============================================
echo Iniciando Servidores da Acapra - Pet Adoption
echo ==============================================

echo [1/2] Iniciando Servidor API Backend (Python FastAPI) na porta 8000...
start "Backend Acapra API" cmd /k "cd backend && py -m uvicorn main:app --reload"

timeout /t 3 /nobreak >nul

echo [2/2] Iniciando Interface Web (React Vite) na porta 5173...
start "Frontend Acapra Web" cmd /k "npm run dev"

echo Tudo pronto! O site sera aberto automaticamente em instantes se voce definiu assim, senao acesse:
echo Site: http://localhost:5173
echo.
echo Pressione qualquer tecla para sair deste console (os servidores continuarão abertos nas outras janelas).
pause >nul
