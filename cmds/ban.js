const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setNameLocalization('fr', 'bannir')
        .setDescription('Bans the member out of the server.')
        .setDescriptionLocalization('fr', 'Bannit le membre du serveur.')
        .addUserOption(option =>
            option
                .setName('target')
                .setNameLocalization('fr', 'cible')
                .setDescription('Select the member to ban.')
                .setDescriptionLocalization('fr', 'Selectionner le membre à bannir.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setNameLocalization('fr', 'raison')
                .setDescription('Reason of the ban.')
                .setDescriptionLocalization('fr', 'Raison du bannissement.')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
        const reason = `${interaction.user.tag}:\n` + (interaction.options.getString('reason') ?? 'No reason provided.');

        await client.users.send(target.id, `You were banned from ${interaction.guild.name}.\n\`${reason}\`\n||*If you're still on the server, it's your lucky day: the command failed!*||`);
        await interaction.guild.members.ban(target, { reason: reason });
        await interaction.reply({ content: `Banned <@${target.id}>.`, ephemeral: true });
    },
};