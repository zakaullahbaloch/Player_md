const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const Pino = require('pino');
const fs = require('fs');
const config = require('./config');
const { handleCommand } = require('./plugins/commands');
const antiPlugin = require('./plugins/antipromote');

let sock;

async function startBot(pairNumber = null) {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: !pairNumber,
        logger: Pino({ level: 'silent' }),
        browser: ['PLAYER MD', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    if (pairNumber) {
        const code = await sock.requestPairingCode(pairNumber);
        console.log(`\n🔐 Pairing Code for ${pairNumber}: ${code}\n`);
        fs.writeFileSync('./pair_code.txt', code);
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            console.log(`✅ ${config.BOT_NAME} online!`);
            const creds = fs.readFileSync('./auth_info/creds.json', 'utf8');
            const sessionId = Buffer.from(creds).toString('base64');
            fs.writeFileSync('./session_id.txt', sessionId);
        }
        if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) startBot();
        }
    });

    antiPlugin.setup(sock);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        const chatId = msg.key.remoteJid;
        const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const sender = msg.key.participant || chatId.split('@')[0];
        if (messageText.startsWith(config.PREFIX)) {
            const command = messageText.slice(config.PREFIX.length).trim().split(/\s+/)[0].toLowerCase();
            const args = messageText.slice(config.PREFIX.length + command.length).trim();
            await handleCommand(sock, msg, command, args, chatId, sender);
        }
        if (config.AUTO_STATUS_VIEW && (msg.message?.imageMessage || msg.message?.videoMessage)) {
            await sock.readMessages([msg.key]);
        }
    });
}

const args = process.argv.slice(2);
const pairArg = args.find(a => a.startsWith('--pair'));
if (pairArg) startBot(pairArg.split('=')[1]);
else startBot();
