const config = require('../config');

let antiPromote = new Set();
let antiDemote = new Set();

module.exports = {
    setup: (client) => {
        client.ev.on('group-participants.update', async (update) => {
            const { id, action, participants, who } = update;
            const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net';
            const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
            if (action === 'promote' && antiPromote.has(id)) {
                if (who !== ownerNumber && who !== botNumber) {
                    for (let user of participants) await client.groupParticipantsUpdate(id, [user], 'demote');
                    await client.sendMessage(id, { text: `🛡️ Anti-Promote: ${who?.split('@')[0]} tried to promote. Reverted.` });
                }
            }
            if (action === 'demote' && antiDemote.has(id)) {
                if (who !== ownerNumber && who !== botNumber) {
                    for (let user of participants) await client.groupParticipantsUpdate(id, [user], 'promote');
                    await client.sendMessage(id, { text: `🛡️ Anti-Demote: ${who?.split('@')[0]} tried to demote. Reverted.` });
                }
            }
        });
    },
    commands: {
        antipromote: {
            name: 'antipromote',
            ownerOnly: true,
            async execute(sock, msg, args, chatId, sender) {
                const arg = args.toLowerCase();
                if (arg === 'on') { antiPromote.add(chatId); await sock.sendMessage(chatId, { text: '✅ Anti-Promote ON.' }); }
                else if (arg === 'off') { antiPromote.delete(chatId); await sock.sendMessage(chatId, { text: '❌ Anti-Promote OFF.' }); }
                else await sock.sendMessage(chatId, { text: `Status: ${antiPromote.has(chatId) ? 'ON' : 'OFF'}\n.antipromote on/off` });
            }
        },
        antidemote: {
            name: 'antidemote',
            ownerOnly: true,
            async execute(sock, msg, args, chatId, sender) {
                const arg = args.toLowerCase();
                if (arg === 'on') { antiDemote.add(chatId); await sock.sendMessage(chatId, { text: '✅ Anti-Demote ON.' }); }
                else if (arg === 'off') { antiDemote.delete(chatId); await sock.sendMessage(chatId, { text: '❌ Anti-Demote OFF.' }); }
                else await sock.sendMessage(chatId, { text: `Status: ${antiDemote.has(chatId) ? 'ON' : 'OFF'}\n.antidemote on/off` });
            }
        }
    }
};
