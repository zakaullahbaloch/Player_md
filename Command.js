const fs = require('fs');
const path = require('path');
const config = require('../config');

const plugins = {};
const pluginsDir = __dirname;
fs.readdirSync(pluginsDir).forEach(file => {
    if (file !== 'commands.js' && file.endsWith('.js')) {
        const plugin = require(path.join(pluginsDir, file));
        if (plugin.name) plugins[plugin.name] = plugin;
        // also support multiple commands exported
        if (plugin.commands) {
            for (let cmd in plugin.commands) plugins[cmd] = plugin.commands[cmd];
        }
    }
});

async function handleCommand(sock, msg, command, args, chatId, sender) {
    if (plugins[command]) {
        if (plugins[command].ownerOnly && sender !== config.OWNER_NUMBER) {
            return sock.sendMessage(chatId, { text: `❌ Only owner ${config.OWNER_NAME} can use this.` });
        }
        try {
            await plugins[command].execute(sock, msg, args, chatId, sender);
        } catch (err) {
            console.error(err);
            await sock.sendMessage(chatId, { text: '⚠️ Command error.' });
        }
    }
}

module.exports = { handleCommand };
