const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.cmds.get(interaction.commandName);

        if (!command) {
            console.log('\x1b[31m%s\x1b[0m', `No command matching ${interaction.commandName} was found for ${client.user.tag}.`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', `Error executing ${interaction.commandName} for ${client.user.tag}.`);
            console.error(error);
        }
    },
};