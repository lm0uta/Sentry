module.exports = {
    name: 'info', // Nom de la commande
    description: 'Récupère des informations sur un utilisateur spécifié.', // Description de la commande
    async execute(message, args) {
        // Si aucun argument n'est fourni, on prend l'auteur du message
        const user = args.length > 0
            ? message.mentions.users.first() || message.client.users.cache.get(args[0])
            : message.author;

        // Récupère les informations de l'utilisateur
        const userName = user.username; // Nom d'utilisateur
        const userId = user.id; // ID de l'utilisateur
        const userTag = user.tag; // Tag de l'utilisateur
        const userAvatar = user.displayAvatarURL(); // URL de l'avatar
        const userCreatedAt = user.createdAt.toLocaleDateString('fr-FR', {
            year: 'numeric', // Affiche l'année
            month: 'long', // Affiche le mois en texte long (ex : janvier)
            day: 'numeric' // Affiche le jour du mois
        });

        // Envoie les informations de l'utilisateur sous forme de message formaté
        await message.reply(
            `> Coucou \`${userName}\` ❤ \n` +
            `> Voici les informations de l'utilisateur :\n` +
            `> **ID** : \`${userId}\`\n` +
            `> **Tag** : \`${userTag}\`\n` +
            `> **Avatar** : [Clique ici](${userAvatar})\n` + // Lien cliquable vers l'avatar
            `> **Compte créé le** : \`${userCreatedAt}\`` // Date de création du compte
        );
    }
};
