module.exports = {
    name: 'pause',
    description: 'Pauses the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (player.paused) {
            return interaction.reply(`The player is already paused`);
        }

        player.pause(true);

        return interaction.reply(`Paused the current track`);
    },
};