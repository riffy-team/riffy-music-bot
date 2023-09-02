const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "serverstats",
    description: "Get shard of server",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const shard = interaction.guild.shardId;

        return interaction.reply({
            content: `This server is on shard #${shard}`
        })
    }
}