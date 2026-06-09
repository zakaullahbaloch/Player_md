const { bot } = require('../lib/');

bot({
    pattern: 'pair ?(.*)',
    desc: 'Generate pairing code: .pair 923033065965',
    type: 'owner',
    owner: true
}, async (message, match) => {
    const number = match.trim();
    if (!number || !/^\d+$/.test(number)) return await message.send('Usage: .pair 923001234567 (without +)');
    await message.send(`🔐 Generating pairing code for +${number}...`);
    const code = await message.client.requestPairingCode(number);
    await message.send(`✅ Pairing Code: *${code}*\nOpen WhatsApp → Linked Devices → Link with Phone Number → Enter code.`);
});
