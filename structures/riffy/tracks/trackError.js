const client = require("../../Client")

client.riffy.on('trackError', async (player, track, payload) => {
    console.log(payload)
})