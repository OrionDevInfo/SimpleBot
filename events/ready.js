const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log('\x1b[32m%s\x1b[0m', `[READY] Logged in as ${client.user.tag}`);
    },
};