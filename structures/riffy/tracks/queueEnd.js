const client = require("../../client")

client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    
    if (player.message) await player.message.delete();

    if (player.isAutoplay) {
        player.autoplay(player)
    } else {
        player.destroy();
        channel.send("Queue has ended.");
    }
})