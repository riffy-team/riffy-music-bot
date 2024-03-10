const { Client, Message } = require("discord.js");

module.exports = {
    name: "stats",
    description: "Get the server's shard ID.",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        const shard = message.guild.shardId;

        return message.channel.send({
            content: `This server is on shard #${shard}`
        })
    }
}