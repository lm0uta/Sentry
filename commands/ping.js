module.exports = {
    name: 'ping', // Nom de la commande
    description: 'Ping command', // Description de la commande
    async execute(message) {
        console.log('Executing ping command...'); // Vérifie que la commande est exécutée
        const userName = message.author.username; // Récupère le nom d'utilisateur de l'auteur du message
        const wsPing = message.client.ws.ping; // Récupère le ping du WebSocket du client (la latence avec le serveur Discord)

        // Envoie un message avec le nom de l'utilisateur et le ping actuel du bot
        try {
            await message.channel.send(
                `> Coucou \`${userName}\` ❤ \n` +
                `> Mon ping est de \`${wsPing}ms\` !` // Affiche le ping sous forme de message
            );
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message de ping:', error);
        }
    }
};
