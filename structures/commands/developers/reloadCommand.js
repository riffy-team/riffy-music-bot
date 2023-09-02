const { Client, Message } = require("discord.js");
const { reloadCommands } = require("../../functions/control");

module.exports = {
    name: "reloadcommand",
    description: "Reloads a command",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const command = args[0]
        const output = await reloadCommands(command);

        return message.reply(output);
    }
}