const { Client, Message } = require("discord.js");
const { reload_slash } = require("../../functions/cache_clean");

module.exports = {
    name: "reloadslash",
    description: "Reloads a slash command",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        const command = args[0]
        const output = await reload_slash(command);

        return message.reply(output);
    }
}