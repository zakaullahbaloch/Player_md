// pair.js - Generate WhatsApp pairing code without running full bot
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');

async function getPairingCode(number) {
    if (!number || !number.match(/^\d+$/)) {
        console.log('❌ Usage: node pair.js 923033065965');
        process.exit(1);
    }

    const { state, saveCreds } = await useMultiFileAuthState('./pair_auth');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ['PLAYER MD Pair Tool', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            console.log('✅ Connected, requesting pairing code...');
            const code = await sock.requestPairingCode(number);
            console.log(`\n🔐 YOUR PAIRING CODE: ${code}\n`);
            console.log(`📱 Open WhatsApp → Linked Devices → Link with Phone Number → Enter: ${code}`);
            process.exit(0);
        }
        if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== 401) {
                console.log('❌ Failed. Re-run with correct number.');
                process.exit(1);
            }
        }
    });
}

const args = process.argv.slice(2);
getPairingCode(args[0]);
