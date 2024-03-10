const client = require("../../client");
const { PermissionsBitField } = require("discord.js");
const { client_prefix, developers } = require("../../configuration/index");
const { logger } = require("../../functions/logger");

client.on("messageCreate", async (message) => {
    try {
        if (message.author.bot || !message.guild || !message.content.startsWith(client_prefix)) {
            return;
        }

        const args = message.content.slice(client_prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd)

        if (!command) command = client.commands.get(client.aliases.get(cmd))

        if (command) {
            if (command.developerOnly) {
                if (!developers.includes(message.author.id)) {
                    return message.channel.send(`:x: ${command.name} is a developer only command`)
                }
            }

            if (command.userPermissions) {
                if (!message.channel.permissionsFor(message.member).has(PermissionsBitField.resolve(command.userPermissions || []))) {
                    return message.channel.send(`You do not have the required permissions to use this command. You need the following permissions: ${command.userPermissions.join(", ")}`)
                }
            }

            if (command.clientPermissions) {
                if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve(command.clientPermissions || []))) {
                    return message.channel.send(`I do not have the required permissions to use this command. I need the following permissions: ${command.clientPermissions.join(", ")}`)
                }
            }

            if (command.guildOnly && !message.guildId) {
                return message.channel.send(`${command.name} is a guild only command`)
            }

            if (command) command.run(client, message, args);
        }
    } catch (err) {
        logger("An error occurred while executing the messageCreate event:", "error")
        console.log(err)

        return message.channel.send(`An error occurred while executing the messageCreate event:\n${err}`)
    }
})