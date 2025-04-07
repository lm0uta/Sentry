// commands/ping.js
module.exports = {
    name: 'ping', // Nom de la commande
    description: 'Ping command', // Description de la commande
    async execute(message) {
        const userName = message.author.username; // Récupère le nom d'utilisateur de l'auteur du message
        const restPing = message.client.ws.ping; // Récupère le ping du WebSocket du client (la latence avec le serveur Discord)

        // Envoie un message avec le nom de l'utilisateur et le ping actuel du bot
        await message.reply(
            `> Coucou \`${userName}\` ❤ \n` +
            `> Mon ping est de \`${restPing}ms\` !` // Affiche le ping sous forme de message
        );
    }
};
