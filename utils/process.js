module.exports = {
    on: async function () {
        const fs = require('node:fs');
        const path = require('node:path');
        const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
        require('dotenv').config();

        const client = new Client({ intents: [GatewayIntentBits.Guilds] });

        client.cmds = new Collection();
        const cmds = [];

        const eventsPath = path.join('events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = `../events/${file}`;
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }

        const cmdsPath = path.join('cmds');
        const cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith('.js'));

        for (const file of cmdFiles) {
            const filePath = `../cmds/${file}`;
            const cmd = require(filePath);
            if ('data' in cmd && 'execute' in cmd) {
                client.cmds.set(cmd.data.name, cmd);
                cmds.push(cmd.data.toJSON());
            } else {
                console.log('\x1b[33m%s\x1b[0m', `[WARNING] The cmd at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.T);
        (async () => {
            try {
                console.log('\x1b[30m%s\x1b[0m', `Started refreshing ${cmds.length} application (/) cmds.`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(process.env.cID, process.env.gID),
                    { body: cmds },
                );
                // const data = await rest.put(
                //     Routes.applicationCommands(process.env.cID),
                //     { body: commands },
                // );

                console.log('\x1b[32m%s\x1b[0m', `Successfully reloaded ${data.length} application (/) cmds.`);
            } catch (error) {
                console.error(error);
            }
        })();

        client.login(process.env.T);
    }
}