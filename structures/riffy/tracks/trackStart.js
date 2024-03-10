const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Dynamic } = require("musicard");
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
    const [minutesStr, secondsStr] = formattedLength.split(":");
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;

    //disabling buttons when the song ends
    const rowDisabled = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('disconnect')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏺')
                .setDisabled(true),

            new ButtonBuilder()
                .setCustomId('pause')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏸')
                .setDisabled(true),

            new ButtonBuilder()
                .setCustomId('skip')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏭')
                .setDisabled(true)
        );

    const musicard = await Dynamic({
        thumbnailImage: track.info.thumbnail,
        name: track.info.title,
        author: track.info.author
    });

    const msg = await channel.send({
        files: [{
            attachment: musicard
        }],
        components: [row]
    });

    setTimeout(async () => {
        return await msg.edit({
            components: [rowDisabled]
        });
    }, totalMilliseconds);
})