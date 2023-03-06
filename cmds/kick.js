const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setNameLocalization('fr', 'exclure')
        .setDescription('Kicks the member out of the server.')
        .setDescriptionLocalization('fr', 'Exclut le membre du serveur.')
        .addUserOption(option =>
            option
                .setName('target')
                .setNameLocalization('fr', 'cible')
                .setDescription('Select the member to kick.')
                .setDescriptionLocalization('fr', 'Selectionner le membre à exclure.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setNameLocalization('fr', 'raison')
                .setDescription('Reason of the kick.')
                .setDescriptionLocalization('fr', 'Raison de l\'exclusion.')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
        const reason = `${interaction.user.tag}:\n` + (interaction.options.getString('reason') ?? 'No reason provided.');

        await client.users.send(target.id, `You were kicked from ${interaction.guild.name}.\n\`${reason}\`\n||*If you're still on the server, it's your lucky day: the command failed!*||`);
        await interaction.guild.members.kick(target, reason);
        await interaction.reply({ content: `Kicked <@${target.id}>.`, ephemeral: true });
    },
};