const client = require("../../Client");

client.on("raw", (raw) => {
    client.riffy.updateVoiceState(raw)
});