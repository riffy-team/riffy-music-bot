const { Client, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Pong!",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        return interaction.reply(`Pong! ${client.ws.ping}ms`)
    }
}