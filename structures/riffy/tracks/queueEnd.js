const { EmbedBuilder } = require("discord.js");
const client = require("../../client")

client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    
    if (player.message) await player.message.delete().catch(() => {});

    if (player.isAutoplay) {
        player.autoplay(player);
    } else {
        if (player.twentyFourSeven) return;
        player.destroy();
        const embed = new EmbedBuilder()
            .setColor("#00E9B1")
            .setDescription("Queue has ended.");
        channel.send({ embeds: [embed] });
    }
})