const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'Resumes the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (!player.paused) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`The player is already playing song`);
            return interaction.reply({ embeds: [embed] });
        } else {
            player.pause(false);
            const embed = new EmbedBuilder()
                .setColor('#00E9B1')
                .setDescription(`Resumed the current track.`);
            return interaction.reply({ embeds: [embed] });
        }
    },
};