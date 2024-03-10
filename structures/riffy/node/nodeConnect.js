const client = require("../../client")
const { logger } = require("../../functions/logger")

client.riffy.on("nodeConnect", async (node) => {
    console.log("\n---------------------")
    logger(`Node ${node.name} has connected.`, "info")
    console.log("---------------------")
})