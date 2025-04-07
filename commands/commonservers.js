module.exports = {
    name: 'commonservers', // Nom de la commande
    description: 'Affiche les serveurs en commun avec un utilisateur spécifique.', // Description de la commande
    async execute(message, args) {
        // Vérifie si un ID utilisateur est fourni
        if (args.length === 0) {
            return message.reply('> Veuillez fournir un ID utilisateur.'); // Envoie un message si aucun ID utilisateur n'est fourni
        }

        const userId = args[0]; // Récupère l'ID utilisateur
        const commonServers = []; // Initialise un tableau pour stocker les serveurs en commun

        // Parcourir tous les serveurs auxquels le bot est connecté
        for (const guild of message.client.guilds.cache.values()) {
            try {
                // Récupère le membre dans le serveur, en s'assurant que le cache est chargé
                const member = await guild.members.fetch(userId).catch(() => null);
                if (member) {
                    commonServers.push(guild.name); // Si l'utilisateur est membre, ajoute le nom du serveur au tableau
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération du membre pour le serveur ${guild.name}:`, error);
            }
        }

        // Vérifie si des serveurs en commun ont été trouvés
        if (commonServers.length > 0) {
            // Si des serveurs en commun sont trouvés, les affiche
            message.reply(`> Serveurs en commun avec l'utilisateur <@${userId}> :\n> ${commonServers.join(', ')}`);
        } else {
            // Si aucun serveur en commun n'est trouvé, envoie un message indiquant qu'aucun serveur n'a été trouvé
            message.reply('> Aucun serveur en commun trouvé avec cet utilisateur.');
        }
    }
};
