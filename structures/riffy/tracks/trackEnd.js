const client = require("../../client")

client.riffy.on('trackEnd', async (player) => {
    if (!player) return;

    if (player.message) await player.message.delete();
})