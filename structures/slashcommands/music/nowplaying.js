const { Client, CommandInteraction } = require('discord.js');
const { Bloom } = require("musicard");

module.exports = {
    name: 'nowplaying',
    description: 'Show details about the currently playing song',
    player: true,
    current: true,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        const { info } = player.current;

        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }

        const progressPercent = Math.round((player.position / info.length) * 100);

        const musicard = await Bloom({
            trackName: info.title,
            artistName: info.author,
            albumArt: info.thumbnail,
            isExplicit: false,
            timeAdjust: {
                timeStart: formatTime(Math.round(player.position / 1000)),
                timeEnd: formatTime(Math.round(info.length / 1000)),
            },
            progressBar: progressPercent,
            volumeBar: player.volume,
        });

        return interaction.reply({
            files: [{ attachment: musicard, name: "nowplaying.png" }]
        });
    },
};
