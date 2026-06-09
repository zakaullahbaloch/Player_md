const fs = require('fs');
const { bot } = require('../lib/');

bot({
    pattern: 'getsession',
    desc: 'Send session ID file for backup/deploy',
    type: 'owner',
    owner: true
}, async (message) => {
    if (!fs.existsSync('./session_id.txt')) return await message.send('❌ Session ID not found. Bot must be connected first.');
    await message.client.sendMessage(message.jid, {
        document: fs.readFileSync('./session_id.txt'),
        mimetype: 'text/plain',
        filename: 'session_id.txt',
        caption: '🔐 Your PLAYER MD Session ID\nKeep secret!\nUse on Heroku/Railway as SESSION_ID'
    });
    await message.send('✅ Session ID sent.');
});
