// commands/info.js
module.exports = {
    name: 'info', // Nom de la commande
    description: 'Récupère des informations sur l\'utilisateur', // Description de la commande
    async execute(message) {
        const userName = message.author.username; // Récupère le nom d'utilisateur de l'auteur du message
        const userId = message.author.id; // Récupère l'ID de l'utilisateur
        const userTag = message.author.tag; // Récupère le tag de l'utilisateur
        const userAvatar = message.author.displayAvatarURL(); // Récupère l'URL de l'avatar de l'utilisateur
        const userCreatedAt = message.author.createdAt.toLocaleDateString('fr-FR', {
            year: 'numeric', // Affiche l'année
            month: 'long', // Affiche le mois en texte long (ex : janvier)
            day: 'numeric' // Affiche le jour du mois
        });

        // Envoie les informations de l'utilisateur sous forme de message formaté
        await message.reply(
            `> Coucou \`${userName}\` ❤ \n` +
            `> Voici tes informations :\n` +
            `> **ID** : \`${userId}\`\n` +
            `> **Tag** : \`${userTag}\`\n` +
            `> **Avatar** : [Clique ici](${userAvatar})\n` + // Lien cliquable vers l'avatar
            `> **Compte créé le** : \`${userCreatedAt}\`` // Date de création du compte
        );
    }
};
