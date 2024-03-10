module.exports = {
    name: 'disconnect',
    description: 'Disconnect the bot from your voice channel',
    inVc: true,
    sameVc: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guildId);
        player.destroy();

        return interaction.reply(`Disconnected from the voice channel.`);
    },
};