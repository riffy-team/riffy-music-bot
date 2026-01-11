const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');
const lyricsFinder = require('lyrics-finder');

module.exports = {
    name: 'lyrics',
    description: 'Get lyrics for the currently playing song',
    player: true,
    current: true,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply();
        const player = client.riffy.players.get(interaction.guild.id);
        const track = player.current.info;

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(track.author, track.title) || "No lyrics found.";
        } catch (error) {
            lyrics = "No lyrics found.";
        }

        const embed = new EmbedBuilder()
            .setTitle(`Lyrics for ${track.title}`)
            .setDescription(lyrics.length > 4096 ? lyrics.substring(0, 4093) + "..." : lyrics)
            .setColor("#00E9B1")
            .setThumbnail(track.thumbnail)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        return interaction.editReply({ embeds: [embed] });
    },
};
