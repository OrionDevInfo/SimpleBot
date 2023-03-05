const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Developer access.')
        .setDescriptionLocalization('fr', 'Accès developpeur.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('restart')
                .setNameLocalization('fr', 'redémarrer')
                .setDescription('Kills bot process and restart it with PM2.')
                .setDescriptionLocalization('fr', 'Supprime le processus et le relance avec PM2.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('presence')
                .setNameLocalization('fr', 'presence')
                .setDescription('Set the bot status and activity.')
                .setDescriptionLocalization('fr', 'Définit le statut et l\'activité du bot.')
                .addStringOption(option =>
                    option
                        .setName('status')
                        .setNameLocalization('fr', 'statut')
                        .setDescription('Status of the bot')
                        .setDescriptionLocalization('fr', 'Statut du bot.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Online', value: 'online' },
                            { name: 'Idle', value: 'idle' },
                            { name: 'Invisible', value: 'invisible' },
                            { name: 'Do Not Disturb', value: 'dnd' },
                        ))
                .addStringOption(option =>
                    option
                        .setName('activitytype')
                        .setNameLocalization('fr', 'typeactvité')
                        .setDescription('Activity type of the bot')
                        .setDescriptionLocalization('fr', 'Type d\'activité du bot.')
                        .setRequired(false)
                        .addChoices(
                            { name: 'Competing', value: 'competing' },
                            { name: 'Listening', value: 'listening' },
                            { name: 'Playing', value: 'playing' },
                            { name: 'Watching', value: 'watching' },
                        ))
                .addStringOption(option =>
                    option
                        .setName('activityname')
                        .setNameLocalization('fr', 'nomactvité')
                        .setDescription('Activity name of the bot')
                        .setDescriptionLocalization('fr', 'Nom de l\'activité du bot.')
                        .setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('profilepicture')
                .setNameLocalization('fr', 'photodeprofil')
                .setDescription('Changes bot\'s profile picture.')
                .setDescriptionLocalization('fr', 'Change la photo de profil du bot')
        ),
    async execute(interaction, client) {
        if (!interaction.user.id === '290954849275609098') return;

        if (interaction.options.getSubcommand() == 'restart') {
            await interaction.reply({ content: 'Restarting …', ephemeral: true });
            process.exit();
        }
        else if (interaction.options.getSubcommand() == 'presence') {
            const status = interaction.options.getString('status');
            const activityname = interaction.options.getString('activityname');
            const activitytype = interaction.options.getString('activitytype');
            await client.user.setPresence({ activities: [{ name: activityname, type: activitytype }], status: status });
            await interaction.reply({ content: 'Updated the presence. This change may take a while to apply.', ephemeral: true });
        }
        else if (interaction.options.getSubcommand() == 'profilepicture') {
            if (client.user.avatar == 'c443c8cb121e655f6e3b8c375e17e2ca') await client.user.setAvatar(process.env.PP2);
            else await client.user.setAvatar(process.env.PP1);
            await interaction.reply({ content: 'Updated the profile picture. This change may take a while to apply.', ephemeral: true });
        }
        else await interaction.reply({ content: `Are you sure of what you tried ?`, ephemeral: true });
    },
};