const { PermissionsBitField, MessageFlags, EmbedBuilder } = require("discord.js");
const client = require("../../client");
const { developers } = require("../../configuration/index");
const { logger } = require("../../functions/logger");


client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName);

        if (!command) {
            const embed = new EmbedBuilder()
                .setColor("#FF0000")
                .setDescription(`${interaction.commandName} is not a valid command`);
            return interaction.reply({
                embeds: [embed],
                flags: [MessageFlags.Ephemeral],
            });
        }

        try {
            const player = client.riffy.players.get(interaction.guildId);
            const memberChannel = interaction.member.voice.channelId;
            const clientChannel = interaction.guild.members.me.voice.channelId;

            if (command.developerOnly && !developers.includes(interaction.user.id)) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`${interaction.commandName} is a developer only command`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.userPermissions && !interaction.channel.permissionsFor(interaction.member).has(PermissionsBitField.resolve(command.userPermissions))) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`You do not have the required permissions to use this command. You need: ${command.userPermissions.join(", ")}`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.clientPermissions && !interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve(command.clientPermissions))) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`I do not have the required permissions. I need: ${command.clientPermissions.join(", ")}`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.guildOnly && !interaction.guildId) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`${interaction.commandName} is a guild only command`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.inVoice && !memberChannel) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`You must be in a voice channel to use this command.`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.sameVoice && clientChannel && memberChannel !== clientChannel) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`You must be in the same voice channel as me to use this command.`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.player && !player) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`No music is currently playing.`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            if (command.current && !player.current) {
                const embed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`I am not playing anything right now.`);
                return interaction.reply({
                    embeds: [embed],
                    flags: [MessageFlags.Ephemeral],
                });
            }

            await command.run(client, interaction);
        } catch (err) {
            logger("An error occurred while processing a slash command:", "error");
            console.error(err);

            if (err.code === 10062) return;

            const embed = new EmbedBuilder()
                .setColor("#FF0000")
                .setDescription(`An error occurred: ${err.message}`);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            } else {
                await interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
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