const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'filter',
    description: 'Apply a filter to the music',
    player: true,
    inVoice: true,
    sameVoice: true,
    options: [
        {
            name: 'type',
            description: 'The filter type',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Clear', value: 'clear' },
                { name: 'Bassboost', value: 'bassboost' },
                { name: 'Nightcore', value: 'nightcore' },
                { name: 'Vaporwave', value: 'vaporwave' },
                { name: 'Pop', value: 'pop' },
                { name: 'Soft', value: 'soft' },
                { name: 'Treblebass', value: 'treblebass' },
                { name: '8D', value: '8d' },
                { name: 'Karaoke', value: 'karaoke' },
                { name: 'Vibrato', value: 'vibrato' },
                { name: 'Tremolo', value: 'tremolo' }
            ]
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        const filter = interaction.options.getString('type');

        if (filter === 'clear') {
            player.filters.clear();
            const embed = new EmbedBuilder()
                .setColor('#00E9B1')
                .setDescription("Cleared all filters.");
            return interaction.reply({ embeds: [embed] });
        }

        if (filter === 'bassboost') {
            player.filters.setEqualizer([
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.67 },
                { band: 2, gain: 0.67 },
                { band: 3, gain: 0 },
                { band: 4, gain: -0.5 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.45 },
                { band: 7, gain: 0.23 },
                { band: 8, gain: 0.35 },
                { band: 9, gain: 0.45 },
                { band: 10, gain: 0.55 },
                { band: 11, gain: 0.6 },
                { band: 12, gain: 0.55 },
                { band: 13, gain: 0 }
            ]);
        } else if (filter === 'nightcore') {
            player.filters.setTimescale({ speed: 1.1, pitch: 1.2, rate: 1.0 });
        } else if (filter === 'vaporwave') {
            player.filters.setTimescale({ speed: 0.85, pitch: 0.8 });
        } else if (filter === '8d') {
            player.filters.setRotation({ rotationHz: 0.2 });
        } else if (filter === 'karaoke') {
            player.filters.setKaraoke({ level: 1.0, monoLevel: 1.0, filterBand: 220, filterWidth: 100 });
        } else if (filter === 'vibrato') {
            player.filters.setVibrato({ frequency: 2.0, depth: 0.5 });
        } else if (filter === 'tremolo') {
            player.filters.setTremolo({ frequency: 2.0, depth: 0.5 });
        } else if (filter === 'pop') {
            player.filters.setEqualizer([
                { band: 0, gain: -0.25 },
                { band: 1, gain: 0.48 },
                { band: 2, gain: 0.59 },
                { band: 3, gain: 0.72 },
                { band: 4, gain: 0.3 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.1 },
                { band: 7, gain: -0.1 },
                { band: 8, gain: -0.1 },
                { band: 9, gain: -0.1 },
                { band: 10, gain: -0.1 },
                { band: 11, gain: -0.1 },
                { band: 12, gain: -0.1 },
                { band: 13, gain: -0.1 }
            ]);
        } else if (filter === 'soft') {
            player.filters.setEqualizer([
                { band: 0, gain: 0 },
                { band: 1, gain: 0 },
                { band: 2, gain: 0 },
                { band: 3, gain: 0 },
                { band: 4, gain: 0 },
                { band: 5, gain: 0 },
                { band: 6, gain: 0 },
                { band: 7, gain: 0 },
                { band: 8, gain: -0.25 },
                { band: 9, gain: -0.25 },
                { band: 10, gain: -0.25 },
                { band: 11, gain: -0.25 },
                { band: 12, gain: -0.25 },
                { band: 13, gain: -0.25 }
            ]);
        } else if (filter === 'treblebass') {
            player.filters.setEqualizer([
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.67 },
                { band: 2, gain: 0.67 },
                { band: 3, gain: 0 },
                { band: 4, gain: -0.5 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.45 },
                { band: 7, gain: 0.23 },
                { band: 8, gain: 0.35 },
                { band: 9, gain: 0.45 },
                { band: 10, gain: 0.55 },
                { band: 11, gain: 0.6 },
                { band: 12, gain: 0.55 },
                { band: 13, gain: 0 }
            ]);
        }

        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setDescription(`Applied **${filter}** filter.`);

        return interaction.reply({ embeds: [embed] });
    },
};
