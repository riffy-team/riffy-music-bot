const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'play a track',
    inVoice: true,
    options: [
        {
            name: 'query',
            description: 'The query to search for',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply();
        const query = interaction.options.getString('query');

        const player = client.riffy.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            deaf: true,
        })

        const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === 'playlist') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.member;
                player.queue.add(track);
            }

            await interaction.editReply(`Added ${tracks.length} songs from ${playlistInfo.name} playlist.`);

            if (!player.playing && !player.paused) return player.play();

        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            track.info.requester = interaction.member;

            player.queue.add(track);

            await interaction.editReply(`Added **${track.info.title}** to the queue.`);

            if (!player.playing && !player.paused) return player.play();

        } else {
            return interaction.editReply(`There were no results found for your query.`);
        }
    },

    autocomplete: async (client, interaction) => {
        const query = interaction.options.getFocused();
        if (!query || query.length < 3) return interaction.respond([]);
        if (query.startsWith("http")) return interaction.respond([]);

        try {
            const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });
            const { loadType, tracks } = resolve;

            if (loadType === 'search' || loadType === 'track') {
                const results = tracks.slice(0, 10).map(track => ({
                    name: track.info.title.length > 100 ? track.info.title.substring(0, 97) + "..." : track.info.title,
                    value: track.info.uri
                }));

                return interaction.respond(results);
            } else {
                return interaction.respond([]);
            }
        } catch (err) {
            // Silently catch autocomplete errors like "Unknown interaction"
            // as they are common when users type quickly.
        }
    }
};