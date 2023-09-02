const client = require("../../Client")

client.riffy.on("nodeError", async (node, error) => {
    console.log(`🟥 Node ${node.name} encountered an error: ${error.message}`)
})