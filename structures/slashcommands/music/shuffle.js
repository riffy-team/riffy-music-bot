const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    player: true,
    inVoice: true,
    sameVoice: true,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (player.queue.size <= 1) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription("Not enough songs in the queue to shuffle.");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.queue.shuffle();

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription("Shuffled the queue!");

        return interaction.reply({ embeds: [embed] });
    },
};
