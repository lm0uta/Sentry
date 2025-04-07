@echo off
echo Vérification des modules Node.js...
if not exist "node_modules" (
    echo Modules manquants, installation en cours...
    npm i
) else (
    echo Les modules sont déjà installés.
)

timeout /t 5 >nul

echo Lancement du bot...
node bot.js
pause
