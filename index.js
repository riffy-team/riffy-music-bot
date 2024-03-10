const config = require("./structures/configuration/index");
const { ShardingManager, ShardEvents } = require("discord.js");
const { logger } = require("./structures/functions/logger")

if (config.sharding) {
    const manager = new ShardingManager("./structures/client.js", { token: config.client_token, totalShards: "auto" });

    manager.on("shardCreate", shard => {
        logger(`Launched shard ${shard.id}`, "info")
    })
    manager.on(ShardEvents.Error, (shard, error) => {
        logger(`Shard ${shard.id} encountered an error : ${error.message}`, "error")
    })
    manager.on(ShardEvents.Reconnecting, (shard) => {
        logger(`Shard ${shard.id} is reconnecting.`, "info")
    })
    manager.on(ShardEvents.Death, (shard) => {
        logger(`Shard ${shard.id} has died.`, "error")
    })

    manager.spawn()
} else {
    require("./structures/client")
}

if (config.database) {
    require("./structures/database/connect").connect()
}

/**
 * Enable sharding only if your bot is large, or wait until Discord officially notifies you to shard your bot.
 */