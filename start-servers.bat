@echo off
echo Starting CanoSolutions Full Stack Application...
echo.

echo Starting Express Backend Server...
start "Express Backend" cmd /k "cd express-backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Next.js Frontend...
start "Next.js Frontend" cmd /k "cd Node-Sample && pnpm dev"

echo.
echo ✅ Both servers are starting...
echo 🚀 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo 📊 Health Check: http://localhost:5000/api/health
echo 📋 Admin Panel: http://localhost:3000/admin/dashboard
echo.
pause