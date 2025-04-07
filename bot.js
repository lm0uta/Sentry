// Importation des dépendances
const { Client } = require('discord.js-selfbot-v13'); // Importation du client Discord pour un selfbot
const fs = require('fs'); // Importation du module 'fs' pour la gestion des fichiers
require('dotenv').config(); // Chargement des variables d'environnement depuis un fichier '.env'

// Création d'une nouvelle instance du client Discord
const client = new Client({
    checkUpdate: false // Désactive la vérification des mises à jour
});

// Initialisation d'une Map pour stocker les commandes
client.commands = new Map();

// Fonction pour charger les commandes à partir du dossier './commands'
const loadCommands = () => {
    const commandFiles = fs.readdirSync('./commands') // Récupère les fichiers dans le dossier 'commands'
        .filter(file => file.endsWith('.js')); // Filtre pour ne garder que les fichiers '.js'

    // Pour chaque fichier de commande, on les charge et on les ajoute à la Map
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`); // Charge la commande depuis le fichier
        client.commands.set(command.name, command); // Ajoute la commande à la Map avec son nom comme clé
    }
    console.log(`Loaded ${commandFiles.length} commands`); // Affiche combien de commandes ont été chargées
};

// Fonction pour récupérer la whitelist à partir du fichier JSON
const whitelistPath = './whitelist.json'; // Chemin vers le fichier whitelist
const getWhitelist = () => {
    // Si le fichier whitelist n'existe pas, crée-le avec un contenu vide '{}'
    if (!fs.existsSync(whitelistPath)) fs.writeFileSync(whitelistPath, '{}');
    // Parse le fichier JSON et renvoie le contenu
    return JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
};

// Gérer l'événement 'ready' lorsque le bot est connecté et prêt
client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`); // Affiche que le bot est prêt
    // Charger les commandes au démarrage
    loadCommands();
});

// Gérer l'événement 'messageCreate' pour recevoir les messages
client.on('messageCreate', async (message) => {
    const prefix = '!'; // Préfixe des commandes

    // Ignore les messages qui ne commencent pas par le préfixe
    if (!message.content.startsWith(prefix)) return;

    // Découpe le message en arguments après avoir enlevé le préfixe
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase(); // Récupère le nom de la commande

    // Récupère la commande correspondante à partir de la Map
    const command = client.commands.get(commandName);
    if (!command) return; // Si la commande n'existe pas, on arrête l'exécution

    // Récupérer la whitelist et vérifier si l'utilisateur est autorisé à utiliser la commande
    const whitelist = getWhitelist();
    const allowed = !whitelist[commandName] || whitelist[commandName].includes(message.author.id);

    // Si l'utilisateur n'est pas autorisé, on arrête l'exécution
    if (!allowed) {
        return; // Pas de message d'erreur ici pour éviter de révéler si l'utilisateur est sur la whitelist
    }

    try {
        // Exécute la commande avec les arguments
        await command.execute(message, args);
    } catch (error) {
        console.error(error); // Affiche l'erreur dans la console
        await message.reply('There was an error executing that command!'); // Informe l'utilisateur en cas d'erreur
    }
});

// Connexion à Discord avec le token depuis les variables d'environnement
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Failed to login:', error); // Affiche une erreur si la connexion échoue
});
