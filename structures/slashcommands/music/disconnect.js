const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'disconnect',
    description: 'Disconnect the bot from your voice channel',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guildId);
        player.destroy();

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`Disconnected from the voice channel.`);

        return interaction.reply({ embeds: [embed] });
    },
};