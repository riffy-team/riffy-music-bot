const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'Pauses the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (player.paused) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`The player is already paused`);
            return interaction.reply({ embeds: [embed] });
        }

        player.pause(true);

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`Paused the current track`);

        return interaction.reply({ embeds: [embed] });
    },
};