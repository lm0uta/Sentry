module.exports = {
    name: 'commonservers',
    description: 'Affiche les serveurs en commun avec un utilisateur spécifique.',
    async execute(message, args) {
        // Vérifie si un utilisateur a été mentionné ou si un ID utilisateur est fourni
        if (args.length === 0) {
            return message.reply('> Veuillez fournir une mention d\'utilisateur ou un ID utilisateur.');
        }

        let userId;

        // Vérifie si le premier argument est une mention d'utilisateur
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            // Extrait l'ID de l'utilisateur à partir de la mention
            userId = args[0].slice(2, -1);
            // Si l'ID mentionné est un bot, on le filtre (si nécessaire)
            if (userId.startsWith('!')) {
                userId = userId.slice(1);
            }
        } else {
            // Si l'argument est un ID utilisateur direct, on l'utilise
            userId = args[0];
        }

        const commonServers = []; // Initialise un tableau pour stocker les serveurs en commun

        // Vérifie si l'ID utilisateur est valide
        if (!/^\d{17,19}$/.test(userId)) {
            return message.reply('> Veuillez fournir une mention d\'utilisateur ou un ID valide.');
        }

        // Parcourir tous les serveurs auxquels le bot est connecté
        for (const guild of message.client.guilds.cache.values()) {
            try {
                // Récupérer le membre depuis le cache
                let member = guild.members.cache.get(userId);

                // Si le membre n'est pas dans le cache, tente de le récupérer via fetch
                if (!member) {
                    member = await guild.members.fetch(userId).catch(() => null);
                }

                // Si le membre existe dans le serveur, on l'ajoute à la liste des serveurs en commun
                if (member) {
                    commonServers.push(guild.name);
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération du membre pour le serveur ${guild.name}:`, error);
            }
        }

        // Vérifie si des serveurs en commun ont été trouvés
        if (commonServers.length > 0) {
            message.reply(`> Serveurs en commun avec l'utilisateur <@${userId}> :\n> ${commonServers.join(', ')}`);
        } else {
            message.reply('> Aucun serveur en commun trouvé avec cet utilisateur.');
        }
    }
};
