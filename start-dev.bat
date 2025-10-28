@echo off
echo Starting CanoSolutions Integrated Application...
echo.

echo Starting Next.js Development Server...
cd Nextjs
pnpm dev

echo.
echo ✅ Development server starting...
echo 🚀 Application: http://localhost:3000
echo 📊 Health Check: http://localhost:3000/api/health
echo.
pause