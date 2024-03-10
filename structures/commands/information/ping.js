const { Client, Message } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Obtain the bot's latency reading.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    run: async (client, message) => {
        return message.reply(`${client.ws.ping}ms`)
    }
}