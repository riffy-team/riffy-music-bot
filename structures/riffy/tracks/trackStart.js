const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Bloom } = require("musicard");
const client = require("../../client")

client.riffy.on('trackStart', async (player, track) => {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('disconnect')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏺'),

            new ButtonBuilder()
                .setCustomId('pause')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏸'),

            new ButtonBuilder()
                .setCustomId('skip')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏭')
        );

    const channel = client.channels.cache.get(player.textChannel);

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const musicLength = track.info.length;
    const formattedLength = formatTime(Math.round(musicLength / 1000));

    const musicard = await Bloom({
        trackName: track.info.title,
        artistName: track.info.author,
        albumArt: track.info.thumbnail,
        isExplicit: false,
        timeAdjust: {
            timeStart: "0:00",
            timeEnd: formattedLength,
        },
        progressBar: 0,
        volumeBar: player.volume,
    });

    const msg = await channel
        .send({
            files: [{ attachment: musicard, name: "musicard.png" }],
            components: [row]
        })
        .then((x) => (player.message = x));
});