const { shard, database } = require("./structures/configuration/index");

if (shard) {
    const { ShardingManager, ShardEvents } = require("discord.js");
    const { clientToken } = require("./structures/configuration/index");

    const manager = new ShardingManager("./structures/Client.js", {
        token: clientToken,
        totalShards: "auto",
    });

    manager.on("shardCreate", shard => console.log(`\n🟨 Launched shard ${shard.id}`))

    manager.on(ShardEvents.Error, (shard) => {
        console.log(`🟥 Shard ${shard.id} encountered an error: ${error.message}`);
    })

    manager.on(ShardEvents.Reconnecting, (shard) => {
        console.log(`🟨 Shard ${shard.id} is reconnecting...`);
    })

    manager.on(ShardEvents.Death, (shard) => {
        console.log(`🟥 Shard ${shard.id} has died`);
    })

    manager.spawn()
} else {
    require("./structures/Client")
}

if (database) {
    require("./structures/database/connect").connect()
}