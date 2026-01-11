const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get help with the bot commands',

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor('#00E9B1')
            .setTitle('📚 Bot Help')
            .setDescription('Here are the available slash commands for the Riffy Music Bot:')
            .addFields([
                {
                    name: '🎵 Music Commands',
                    value: '`/play` - Play a song or playlist\n`/pause` - Pause the current music\n`/nowplaying` - Show current song info\n`/resume` - Resume paused music\n`/skip` - Skip the current song\n`/queue` - Show the current queue\n`/disconnect` - Stop and leave the voice channel\n`/volume` - Set the volume\n`/loop` - Set loop mode\n`/filter` - Apply audio filters\n`/lyrics` - Get song lyrics\n`/seek` - Seek to a time\n`/shuffle` - Shuffle the queue\n`/autoplay` - Toggle autoplay\n`/247` - Toggle 24/7 mode'
                },
                {
                    name: 'ℹ️ Information',
                    value: '`/ping` - Check the bot latency\n`/status` - Check the bot status\n`/help` - Show this message'
                }
            ])
            .setFooter({ text: 'Riffy Music Bot', iconURL: client.user.displayAvatarURL() });

        return interaction.reply({ embeds: [embed] });
    },
};