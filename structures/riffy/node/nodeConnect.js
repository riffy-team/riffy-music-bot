const client = require("../../Client")

client.riffy.on("nodeConnect", async (node) => {
    console.log(`\n🟩 Node ${node.name} has connected.`)
})