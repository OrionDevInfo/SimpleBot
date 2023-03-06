const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setNameLocalization('fr', 'débannir')
        .setDescription('Unbans the user.')
        .setDescriptionLocalization('fr', 'Débannit l\'utilisateur.')
        .addUserOption(option =>
            option
                .setName('target')
                .setNameLocalization('fr', 'cible')
                .setDescription('Select the member to unban.')
                .setDescriptionLocalization('fr', 'Selectionner le membre à débannir.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setNameLocalization('fr', 'raison')
                .setDescription('Reason of the unban.')
                .setDescriptionLocalization('fr', 'Raison du débannissement.')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = `${interaction.user.tag}:\n` + (interaction.options.getString('reason') ?? 'No reason provided.');

        await interaction.guild.members.unban(target, reason);
        await interaction.reply({ content: `Unbanned <@${target.id}>.`, ephemeral: true });
    },
};