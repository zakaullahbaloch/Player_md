const axios = require('axios');
const WATERMARK = '✨ Downloaded by SHAHZU PLAYER\n🟢 PLAYER MD Bot';

module.exports = {
    yt: {
        name: 'yt',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!args) return sock.sendMessage(chatId, { text: 'Usage: .yt <YouTube link>' });
            await sock.sendMessage(chatId, { text: '⏳ Processing...' });
            try {
                const res = await axios.get(`https://api.giftedtech.my.id/api/download/ytdl?url=${args}`);
                const data = res.data.result;
                await sock.sendMessage(chatId, { video: { url: data.video }, caption: `🎥 YouTube\n${WATERMARK}` });
                await sock.sendMessage(chatId, { audio: { url: data.audio }, mimetype: 'audio/mpeg', caption: `🎵 Audio\n${WATERMARK}` });
                await sock.sendMessage(chatId, { text: '✅ Done.' });
            } catch { await sock.sendMessage(chatId, { text: '❌ Failed.' }); }
        }
    },
    insta: {
        name: 'insta',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!args) return sock.sendMessage(chatId, { text: 'Usage: .insta <Instagram link>' });
            await sock.sendMessage(chatId, { text: '⏳ Fetching...' });
            try {
                const res = await axios.post('https://v3.instasave.io/api/v1/post', { url: args });
                const url = res.data.media;
                await sock.sendMessage(chatId, { video: { url }, caption: `📸 Instagram\n${WATERMARK}` });
                await sock.sendMessage(chatId, { text: '✅ Done.' });
            } catch { await sock.sendMessage(chatId, { text: '❌ Failed.' }); }
        }
    },
    tt: {
        name: 'tt',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!args) return sock.sendMessage(chatId, { text: 'Usage: .tt <TikTok link>' });
            await sock.sendMessage(chatId, { text: '⏳ Removing watermark...' });
            try {
                const res = await axios.get(`https://api.tikmate.app/api/lookup?url=${args}`);
                const url = res.data.video;
                await sock.sendMessage(chatId, { video: { url }, caption: `🎵 TikTok (No WM)\n${WATERMARK}` });
                await sock.sendMessage(chatId, { text: '✅ Done.' });
            } catch { await sock.sendMessage(chatId, { text: '❌ Failed.' }); }
        }
    },
    fb: {
        name: 'fb',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!args) return sock.sendMessage(chatId, { text: 'Usage: .fb <Facebook link>' });
            await sock.sendMessage(chatId, { text: '⏳ Fetching...' });
            try {
                const res = await axios.get(`https://api.fbvid.net/api/v2?url=${args}`);
                const url = res.data.hd_link || res.data.sd_link;
                await sock.sendMessage(chatId, { video: { url }, caption: `📘 Facebook\n${WATERMARK}` });
                await sock.sendMessage(chatId, { text: '✅ Done.' });
            } catch { await sock.sendMessage(chatId, { text: '❌ Failed.' }); }
        }
    },
    dl: {
        name: 'dl',
        ownerOnly: true,
        async execute(sock, msg, args, chatId, sender) {
            if (!args) return sock.sendMessage(chatId, { text: 'Usage: .dl <any link>' });
            await sock.sendMessage(chatId, { text: '⏳ Universal download...' });
            try {
                const res = await axios.get(`https://api.neoxr.eu.org/api/download/url?url=${args}`);
                const data = res.data.data;
                if (data.video) {
                    await sock.sendMessage(chatId, { video: { url: data.video }, caption: `🌐 Universal\nPlatform: ${data.platform}\n${WATERMARK}` });
                } else {
                    await sock.sendMessage(chatId, { text: `Link: ${data.url}\n\n${WATERMARK}` });
                }
                await sock.sendMessage(chatId, { text: '✅ Done.' });
            } catch { await sock.sendMessage(chatId, { text: '❌ Failed.' }); }
        }
    }
};
