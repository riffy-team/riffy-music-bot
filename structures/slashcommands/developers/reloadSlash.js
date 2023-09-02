const { ApplicationCommandOptionType, Client, CommandInteraction } = require("discord.js");
const { reloadSlash } = require("../../functions/control");

module.exports = {
    name: "reloadslash",
    description: "Reloads a slash command",
    developerOnly: true,
    options: [
        {
            name: "command",
            description: "The slash command to reload",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const command = interaction.options.getString("command");
        const output = await reloadSlash(command);

        return interaction.reply(output);
    }
}