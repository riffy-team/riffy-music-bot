const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Change the volume of the music',
    inVoice: true,
    sameVoice: true,
    player: true,
    options: [
        {
            name: 'amount',
            description: 'The volume amount (0-100)',
            type: ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 0,
            max_value: 100,
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        const amount = interaction.options.getInteger('amount');

        player.setVolume(amount);

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`Volume set to: **${amount}%**`);

        return interaction.reply({ embeds: [embed] });
    },
};
