const { Client, Message } = require("discord.js");
const ascii = require("ascii-table");
const ms = require("ms");

module.exports = {
    name: "shard",
    description: "Obtain bot's shard statistics.",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        try {
            const shard = client.shard.fetchClientValues("guilds.cache.size");

            const users = await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
            const getuptime = await client.shard.fetchClientValues("uptime")

            shard.then(async (results) => {
                const table = new ascii("Shard Status");
                table.setHeading("Shard", "Guilds", "Users", "Uptime");

                table.setAlign(0, ascii.CENTER);
                table.setAlign(1, ascii.CENTER);
                table.setAlign(2, ascii.CENTER);
                table.setAlign(3, ascii.CENTER);

                results.forEach(async (result, shardId) => {
                    const uptime = getuptime[shardId];
                    const shardUptime = ms(uptime, { long: true });

                    table.addRow(shardId, result, users[shardId], shardUptime);
                });

                return await message.channel.send({
                    content: `\`\`\`\n${table.toString()}\`\`\``
                })
            })
        } catch (err) {
            return message.channel.send(`Sharding is not activated.`)
        }
    }
}