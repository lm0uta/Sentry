const fs = require('fs');
const path = './whitelist.json';

// Fonction pour charger la whitelist depuis le fichier
function loadWhitelist() {
    if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

// Fonction pour enregistrer la whitelist dans le fichier
function saveWhitelist(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
    name: 'whitelist',
    description: 'Ajoute, retire ou liste des utilisateurs dans la whitelist d\'une commande.',
    async execute(message, args) {
        // Vérifie que le message provient du bot lui-même
        if (message.author.id !== message.client.user.id) {
            return message.reply('> 🚫 Seul le bot peut gérer la whitelist.');
        }

        // Vérifie la validité des arguments
        if (args.length < 2) {
            return message.reply('> Utilisation : `!whitelist <add|remove|list> <commande> [@user]`');
        }

        const action = args[0].toLowerCase(); // action (add, remove, list)
        const commandName = args[1].toLowerCase(); // nom de la commande
        const userId = args[2]?.replace(/[<@!>]/g, ''); // ID de l'utilisateur (s'il y en a un)
        const whitelist = loadWhitelist(); // Chargement de la whitelist

        // Vérifie si la commande existe
        const command = message.client.commands.get(commandName);
        if (!command) {
            return message.reply(`> La commande \`${commandName}\` n'existe pas.`);
        }

        // Action selon le type de commande
        switch (action) {
            case 'add':
                if (!userId) return message.reply('> Mentionne un utilisateur à ajouter.');
                if (!whitelist[commandName]) whitelist[commandName] = [];
                if (!whitelist[commandName].includes(userId)) {
                    whitelist[commandName].push(userId); // Ajoute l'utilisateur à la whitelist
                    saveWhitelist(whitelist);
                    return message.reply(`✅ <@${userId}> ajouté à la whitelist de \`${commandName}\``);
                } else {
                    return message.reply('> Cet utilisateur est déjà whitelisté.');
                }

            case 'remove':
                if (!userId) return message.reply('> Mentionne un utilisateur à retirer.');
                if (!whitelist[commandName]) whitelist[commandName] = [];
                const initialLength = whitelist[commandName].length;
                whitelist[commandName] = whitelist[commandName].filter(id => id !== userId); // Retire l'utilisateur de la whitelist
                if (whitelist[commandName].length === initialLength) {
                    return message.reply('> Cet utilisateur n\'était pas dans la whitelist.');
                }
                saveWhitelist(whitelist);
                return message.reply(`🗑️ <@${userId}> retiré de la whitelist de \`${commandName}\``);

            case 'list':
                const list = whitelist[commandName] || [];
                if (list.length === 0) return message.reply(`> Aucune whitelist pour \`${commandName}\``);
                return message.reply(`👥 Whitelist de \`${commandName}\` :\n${list.map(id => `<@${id}>`).join(', ')}`);

            default:
                return message.reply('> Action inconnue. Utilise `add`, `remove` ou `list`.');
        }
    }
};
