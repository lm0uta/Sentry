@echo off
echo Vérification des modules Node.js...
if not exist "node_modules" (
    echo Modules manquants, installation en cours...
    npm install
) else (
    echo Les modules sont déjà installés.
)

echo Lancement du bot...
node index.js
pause
