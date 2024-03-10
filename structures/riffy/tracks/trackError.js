const client = require("../../client")

client.riffy.on('trackError', async (player, track, payload) => {
    console.log(payload);
})