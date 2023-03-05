const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setNameLocalization('fr', 'serveur')
        .setDescription('Provides information about the server.')
        .setDescriptionLocalization('fr', 'Fournit des informations sur le serveur.'),
    async execute(interaction) {
        await interaction.reply({ content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`, ephemeral: true });
    },
};