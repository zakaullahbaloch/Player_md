const config = require('../config');

module.exports = {
    promote: {
        name: 'promote',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: 'Group only.' });
            const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!target) return sock.sendMessage(chatId, { text: 'Mention a user.' });
            await sock.groupParticipantsUpdate(chatId, [target], 'promote');
            await sock.sendMessage(chatId, { text: `✅ Promoted @${target.split('@')[0]}`, mentions: [target] });
        }
    },
    demote: {
        name: 'demote',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!chatId.endsWith('@g.us')) return;
            const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!target) return sock.sendMessage(chatId, { text: 'Mention a user.' });
            await sock.groupParticipantsUpdate(chatId, [target], 'demote');
            await sock.sendMessage(chatId, { text: `📉 Demoted @${target.split('@')[0]}`, mentions: [target] });
        }
    },
    kick: {
        name: 'kick',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!chatId.endsWith('@g.us')) return;
            const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!target) return sock.sendMessage(chatId, { text: 'Mention a user.' });
            await sock.groupParticipantsUpdate(chatId, [target], 'remove');
            await sock.sendMessage(chatId, { text: `👢 Removed @${target.split('@')[0]}`, mentions: [target] });
        }
    },
    add: {
        name: 'add',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!chatId.endsWith('@g.us')) return;
            const number = args.trim();
            if (!number) return sock.sendMessage(chatId, { text: 'Usage: .add 923001234567' });
            const jid = number.includes('@') ? number : number + '@s.whatsapp.net';
            await sock.groupParticipantsUpdate(chatId, [jid], 'add');
            await sock.sendMessage(chatId, { text: `➕ Added ${number}` });
        }
    },
    tagall: {
        name: 'tagall',
        ownerOnly: false,
        async execute(sock, msg, args, chatId, sender) {
            if (!chatId.endsWith('@g.us')) return;
            const meta = await sock.groupMetadata(chatId);
            const mentions = meta.participants.map(p => p.id);
            await sock.sendMessage(chatId, { text: args || '@everyone', mentions });
        }
    },
    menu: {
        name: 'menu',
        ownerOnly: false,
        async execute(sock, msg, args, chatId, sender) {
            const text = `╔══ *PLAYER MD MENU* ══╗\n║ 👑 Owner: ${config.OWNER_NAME}\n║ 🤖 Bot: ${config.BOT_NAME}\n║\n║ ✨ Group Mgmt\n║ .promote, .demote\n║ .kick, .add\n║ .tagall, .antipromote\n║ .antidemote\n║\n║ 📥 Downloaders\n║ .yt, .insta, .tt, .fb, .dl\n║\n║ 🎮 Utility\n║ .ping, .owner, .menu\n║ 🔐 Pair: .pair 92300xxxxxx\n║ 💾 Getsession: .getsession\n╚═══════════════════╝`;
            await sock.sendMessage(chatId, { text });
        }
    },
    owner: {
        name: 'owner',
        ownerOnly: false,
        async execute(sock, msg, args, chatId, sender) {
            await sock.sendMessage(chatId, { text: `👑 *Owner:* ${config.OWNER_NAME}\n📞 *Contact:* wa.me/${config.OWNER_NUMBER}` });
        }
    },
    ping: {
        name: 'ping',
        ownerOnly: false,
        async execute(sock, msg, args, chatId, sender) {
            const start = Date.now();
            await sock.sendMessage(chatId, { text: '🏓 Pong!' });
            const end = Date.now();
            await sock.sendMessage(chatId, { text: `Latency: ${end - start}ms` });
        }
    }
};
