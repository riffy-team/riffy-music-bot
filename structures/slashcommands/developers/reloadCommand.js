const { ApplicationCommandOptionType } = require("discord.js");
const { reloadCommands } = require("../../functions/control");

module.exports = {
    name: "reloadcommand",
    description: "Reloads a command",
    developerOnly: true,
    options: [
        {
            name: "command",
            description: "The command to reload",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        const command = interaction.options.getString("command");
        const output = await reloadCommands(command);

        interaction.reply(output);
    }
}