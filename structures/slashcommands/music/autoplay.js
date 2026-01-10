const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'autoplay',
    description: 'Toggle autoplay mode',
    inVoice: true,
    sameVoice: true,
    player: true,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        player.isAutoplay = !player.isAutoplay;

        return interaction.reply(`Autoplay is now **${player.isAutoplay ? 'enabled' : 'disabled'}**.`);
    },
};