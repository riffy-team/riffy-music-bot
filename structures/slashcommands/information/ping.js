const { Client, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Obtain the bot's latency reading.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        return interaction.reply(`${client.ws.ping}ms`)
    }
}