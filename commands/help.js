module.exports = {
    name: 'help', // Nom de la commande
    description: 'Affiche la liste des commandes disponibles.', // Description de la commande
    async execute(message, args) {
        console.log('Commande help exécutée'); // Log pour le débogage
        const userName = message.author.username; // Récupère le nom d'utilisateur de l'auteur du message

        // Crée une liste des commandes disponibles en utilisant .entries() pour accéder à la paire clé-valeur
        const commandsList = [];
        message.client.commands.forEach((command) => {
            commandsList.push(`\`${command.name}\`: ${command.description}`);
        });

        // Envoie un message avec la liste des commandes
        await message.reply(
            `> Coucou \`${userName}\` ❤ \n` +
            `> Voici la liste des commandes disponibles :\n` +
            `${commandsList.join('\n')}`
        );
    }
};
