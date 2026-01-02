const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Control the loop mode',
    inVoice: true,
    sameVoice: true,
    player: true,
    options: [
        {
            name: 'mode',
            description: 'The loop mode',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Off', value: 'none' },
                { name: 'Track', value: 'track' },
                { name: 'Queue', value: 'queue' },
            ],
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        const mode = interaction.options.getString('mode');

        player.setLoop(mode);

        return interaction.reply(`Loop mode set to: **${mode}**`);
    },
};
