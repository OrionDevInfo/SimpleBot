const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDescriptionLocalization('fr', 'Réponds avec Pong!'),
    async execute(interaction, client) {
        await interaction.reply({ content: `Pong!\nWebsocket heartbeat: ${client.ws.ping}ms.`, ephemeral: true });
    },
};