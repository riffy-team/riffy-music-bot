const client = require("../../client")
const { logger } = require("../../functions/logger")

client.riffy.on("nodeError", async (node, error) => {
    console.log("\n---------------------")
    logger(`Node ${node.name} encountered an error: ${error.message}`, "error")
    console.log("---------------------")
})