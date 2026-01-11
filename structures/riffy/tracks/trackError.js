const client = require("../../client")
const { logger } = require("../../functions/logger")

client.riffy.on('trackError', async (player, track, payload) => {
    logger(`Track ${track.info.title} encountered an error: ${payload.error}`, "error");
    
    const channel = client.channels.cache.get(player.textChannel);
    if (channel) {
        channel.send(`An error occurred while playing **${track.info.title}**. Skipping...`);
    }

    if (player.queue.size > 0) {
        player.play();
    } else {
        player.destroy();
    }
})