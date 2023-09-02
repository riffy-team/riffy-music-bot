module.exports = {
    name: 'resume',
    description: 'Resumes the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (!player.paused) {
            return interaction.reply(`:x: The player is already playing song`);
        } else {
            player.pause(false);
            return interaction.reply(`:play_pause: Resumed the current track.`);
        }
    },
};