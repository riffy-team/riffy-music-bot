const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: '247',
    description: 'Toggle 24/7 mode for the player',
    inVoice: true,
    sameVoice: true,
    player: true,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        player.twentyFourSeven = !player.twentyFourSeven;

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`24/7 mode is now **${player.twentyFourSeven ? 'enabled' : 'disabled'}**.`);

        return interaction.reply({ embeds: [embed] });
    },
};
