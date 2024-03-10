const client = require("../../client");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const player = client.riffy.players.get(interaction.guild.id);

    if (interaction.customId === 'pause') {
        await interaction.deferUpdate();

        if (!player) return interaction.followUp({ content: `The player doesn't exist`, ephemeral: true });

        player.pause(true);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺'),

                new ButtonBuilder()
                    .setCustomId('play')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('▶'),

                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
            );

        return await interaction.message.edit({
            components: [row]
        })
    } else if (interaction.customId === 'play') {
        await interaction.deferUpdate();

        if (!player) return interaction.followUp({ content: `The player doesn't exist`, ephemeral: true });

        player.pause(false);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺'),

                new ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸'),

                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
            )

        return await interaction.message.edit({
            components: [row]
        })

    } else if (interaction.customId === 'skip') {
        await interaction.deferUpdate();

        if (!player) return interaction.followUp({ content: `The player doesn't exist`, ephemeral: true });
        player.stop();

        const rowDisabled = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺')
                    .setDisabled(true),

                new ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸')
                    .setDisabled(true),

                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
                    .setDisabled(true),

                new ButtonBuilder()
                    .setCustomId('skiped')
                    .setStyle(ButtonStyle.Success)
                    .setLabel('Skiped')
                    .setDisabled(true)
            );

        return await interaction.message.edit({
            components: [rowDisabled]
        })
    } else if (interaction.customId === 'disconnect') {
        await interaction.deferUpdate();

        if (!player) return interaction.followUp({ content: `The player doesn't exist`, ephemeral: true });
        player.destroy();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺')
                    .setDisabled(true),

                new ButtonBuilder()
                    .setCustomId('play')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('▶')
                    .setDisabled(true),

                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
                    .setDisabled(true),

                new ButtonBuilder()
                    .setCustomId('skiped')
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('Disconnected')
                    .setDisabled(true)
            )

        return await interaction.message.edit({
            components: [row]
        })
    }
});