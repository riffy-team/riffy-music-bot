const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'queue',
    description: 'Shows the current queue',
    inVoice: true,
    sameVoice: true,
    player: true,

    run: (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        const queue = player.queue.length > 10 ? player.queue.slice(0, 10) : player.queue;

        const totalDuration = player.queue.reduce((acc, curr) => acc + curr.info.length, 0);

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎶 Current Queue')
            .setThumbnail(player.current.info.thumbnail)
            .addFields([
                {
                    name: 'Now Playing',
                    value: `[${player.current.info.title}](${player.current.info.uri}) - \`${ms(player.current.info.length)}\``,
                }
            ])
            .setFooter({ text: `Tracks in queue: ${player.queue.length} | Total Duration: ${ms(totalDuration)}` });

        if (queue.length) {
            embed.addFields([
                {
                    name: 'Up Next',
                    value: queue
                        .map(
                            (track, index) =>
                                `**${index + 1}.** [${track.info.title}](${track.info.uri}) - \`${ms(track.info.length)}\``,
                        )
                        .join('\n'),
                },
            ]);
        } else {
            embed.setDescription('The queue is currently empty.');
        }

        return interaction.reply({ embeds: [embed] });
    },
};