const client = require("../../Client")

client.riffy.on('queueEnd', async (player, track) => {
    return player.autoplay(player)
})