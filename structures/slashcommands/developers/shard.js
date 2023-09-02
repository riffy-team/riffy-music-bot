const { Client, CommandInteraction } = require("discord.js");
const ascii = require("ascii-table");
const ms = require("ms");

module.exports = {
    name: "shard",
    description: "Get shard of bot",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
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

                return await interaction.reply({
                    content: `\`\`\`\n${table.toString()}\`\`\``
                })
            })
        } catch (err) {
            return interaction.reply(`:x: Shard is not enabled!`)
        }
    }
}