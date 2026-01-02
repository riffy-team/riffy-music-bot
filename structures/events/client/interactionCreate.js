const { PermissionsBitField, MessageFlags } = require("discord.js");
const client = require("../../client");
const { developers } = require("../../configuration/index");
const { logger } = require("../../functions/logger");


client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({
                content: `${interaction.commandName} is not a valid command`,
                flags: [MessageFlags.Ephemeral],
            });
        }

        try {
            const player = client.riffy.players.get(interaction.guildId);
            const memberChannel = interaction.member.voice.channelId;
            const clientChannel = interaction.guild.members.me.voice.channelId;

            if (command.developerOnly && !developers.includes(interaction.user.id)) {
                return interaction.reply({
                    content: `${interaction.commandName} is a developer only command`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.userPermissions && !interaction.channel.permissionsFor(interaction.member).has(PermissionsBitField.resolve(command.userPermissions))) {
                return interaction.reply({
                    content: `You do not have the required permissions to use this command. You need: ${command.userPermissions.join(", ")}`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.clientPermissions && !interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve(command.clientPermissions))) {
                return interaction.reply({
                    content: `I do not have the required permissions. I need: ${command.clientPermissions.join(", ")}`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.guildOnly && !interaction.guildId) {
                return interaction.reply({
                    content: `${interaction.commandName} is a guild only command`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.inVoice && !memberChannel) {
                return interaction.reply({
                    content: `You must be in a voice channel to use this command.`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.sameVoice && clientChannel && memberChannel !== clientChannel) {
                return interaction.reply({
                    content: `You must be in the same voice channel as me to use this command.`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.player && !player) {
                return interaction.reply({
                    content: `No music is currently playing.`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.current && !player.current) {
                return interaction.reply({
                    content: `I am not playing anything right now.`,
                    flags: [MessageFlags.Ephemeral],
                });
            }

            await command.run(client, interaction);
        } catch (err) {
            logger("An error occurred while processing a slash command:", "error");
            console.error(err);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: `An error occurred: ${err.message}`, flags: [MessageFlags.Ephemeral] });
            } else {
                await interaction.reply({ content: `An error occurred: ${err.message}`, flags: [MessageFlags.Ephemeral] });
            }
        }
    } else if (interaction.isAutocomplete()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command || !command.autocomplete) return;

        try {
            await command.autocomplete(client, interaction);
        } catch (err) {
            // Ignore "Unknown interaction" errors (10062) for autocomplete as they are harmless
            if (err.code === 10062) return;
            console.error("Autocomplete Error:", err);
        }
    }
});