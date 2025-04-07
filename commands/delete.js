// commands/delete.js
module.exports = {
    name: 'delete', // Nom de la commande
    description: 'Supprime les messages précédents du bot', // Description de la commande
    async execute(message, args) {
        const userName = message.author.username; // Récupère le nom d'utilisateur de l'auteur du message
        try {
            // Obtenir le nombre de messages à supprimer (1 par défaut si aucun nombre n'est fourni)
            const amount = args.length > 0 ? parseInt(args[0]) : 1;

            // Validation : s'assurer que le nombre fourni est valide (entre 1 et 100)
            if (isNaN(amount) || amount < 1 || amount > 100) {
                // Envoie un message d'erreur si le nombre est invalide
                return await message.channel.send(`> Coucou \`${userName}\` ❤ \n> Veuillez fournir un nombre valide entre 1 et 100 !`);
            }

            // Récupérer les messages dans le canal (maximum 100 messages)
            const messages = await message.channel.messages.fetch({ limit: 100 });

            // Filtrer pour ne garder que les messages envoyés par le bot
            const botMessages = messages.filter(m => m.author.id === message.client.user.id);

            // Sélectionner uniquement les messages à supprimer (selon le nombre spécifié)
            const messagesToDelete = Array.from(botMessages.values())
                .slice(0, amount);

            // Vérifie si des messages à supprimer ont été trouvés
            if (messagesToDelete.length === 0) {
                // Si aucun message n'a été trouvé à supprimer, envoie un message d'erreur
                return await message.channel.send(`> Coucou \`${userName}\` ❤ \n> Aucun message trouvé à supprimer !`);
            }

            // Supprimer chaque message
            for (const msg of messagesToDelete) {
                await msg.delete(); // Suppression du message
            }

            // Envoie une confirmation de la suppression, qui s'auto-supprime après 5 secondes
            const confirmation = await message.channel.send(`> Coucou \`${userName}\` ❤ \n> J'ai supprimé \`${messagesToDelete.length}\` message(s) !`);
            setTimeout(() => confirmation.delete(), 5000); // Auto-suppression du message de confirmation après 5 secondes

        } catch (error) {
            console.error(error); // Affiche l'erreur dans la console si une erreur survient
            // Envoie un message d'erreur générique si une exception est levée
            await message.channel.send(`> Coucou \`${userName}\` ❤ \n> Erreur lors de la suppression des messages !`);
        }
    }
};
