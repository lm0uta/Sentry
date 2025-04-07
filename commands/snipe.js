module.exports = {
    name: 'snipe',
    description: 'Trouve un utilisateur dans les salons vocaux de tous les serveurs.',
    async execute(message, args) {
        if (args.length === 0) return message.reply('> Veuillez fournir un ID utilisateur ou une mention.');

        const userId = args[0].replace(/[<@!>]/g, '');
        const user = await message.client.users.fetch(userId).catch(() => null);
        if (!user) return message.reply('> Utilisateur non trouvé.');

        let foundInVoice = false;
        message.client.guilds.cache.forEach(guild => {
            const member = guild.members.cache.get(userId);
            if (member && member.voice.channel) {
                foundInVoice = true;
                message.reply(`> L'utilisateur <@${userId}> est dans un salon vocal sur ${guild.name}.\n> ID du salon vocal : <#${member.voice.channel.id}>`);
            }
        });

        if (!foundInVoice) message.reply('> L\'utilisateur n\'est dans aucun salon vocal.');
    },

    async join(message, args) {
        if (args.length === 0) return message.reply('> Veuillez fournir un ID utilisateur ou une mention.');

        const userId = args[0].replace(/[<@!>]/g, '');

        let foundVoiceInfo = null;
        message.client.guilds.cache.forEach(guild => {
            const member = guild.members.cache.get(userId);
            if (member && member.voice.channel) {
                foundVoiceInfo = member.voice.channel;
                message.reply(`> J'ai trouvé l'utilisateur dans le salon vocal <#${foundVoiceInfo.id}> sur ${guild.name}.`);
            }
        });

        if (!foundVoiceInfo) return message.reply('> Aucune information de salon vocal trouvée pour cet utilisateur.');

        try {
            await foundVoiceInfo.join();
            message.reply(`> J'ai rejoint le salon vocal <#${foundVoiceInfo.id}>.`);
        } catch (error) {
            console.error(error);
            message.reply('> Impossible de rejoindre le salon vocal.');
        }
    }
};
