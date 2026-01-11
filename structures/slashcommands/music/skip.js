const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'Skips the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        player.stop();

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`Skipped the current track.`);

        return interaction.reply({ embeds: [embed] });
    },
};