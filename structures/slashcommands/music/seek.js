const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'seek',
    description: 'Seek to a specific time in the song',
    player: true,
    current: true,
    inVoice: true,
    sameVoice: true,
    options: [
        {
            name: 'time',
            description: 'The time to seek to (e.g. 1m, 30s)',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        const time = interaction.options.getString('time');
        const mstime = ms(time);

        if (!mstime || isNaN(mstime)) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription("Invalid time format.");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (mstime >= player.current.info.length) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription("Seek time is longer than the song duration.");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.seek(mstime);

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`Seeked to **${time}**.`);

        return interaction.reply({ embeds: [embed] });
    },
};
