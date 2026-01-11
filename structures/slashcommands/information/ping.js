const { Client, CommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Obtain the bot's latency reading.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor("#00E9B1")
            .setDescription(`🏓 Pong! Bot latency is **${client.ws.ping}ms**`);
        return interaction.reply({ embeds: [embed] });
    }
}