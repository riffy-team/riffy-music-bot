const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'status',
    description: 'Check the bot and nodes status',
    developerOnly: true,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const nodes = client.riffy.nodes;
        const embed = new EmbedBuilder()
            .setTitle('Bot Status')
            .setColor('#00E9B1')
            .setTimestamp();

        let nodeInfo = '';
        nodes.forEach(node => {
            nodeInfo += `**Node:** ${node.name}\n**Status:** ${node.connected ? 'Connected' : 'Disconnected'}\n**Players:** ${node.stats.players}\n**Uptime:** ${new Date(node.stats.uptime).toISOString().substr(11, 8)}\n\n`;
        });

        embed.addFields([
            { name: 'Nodes', value: nodeInfo || 'No nodes connected' },
            { name: 'Bot Latency', value: `${client.ws.ping}ms`, inline: true },
            { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true }
        ]);

        return interaction.reply({ embeds: [embed] });
    },
};
