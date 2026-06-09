<!-- ANIMATED HEADER -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=30&pause=1000&color=00FF00&center=true&vCenter=true&width=600&lines=🔥+PLAYER+MD+🔥;WhatsApp+Multi-Device+Bot;Ultimate+WhatsApp+Assistant" alt="Typing Animation" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/WhatsApp-MultiDevice-25D366?logo=whatsapp&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" />
  <img src="https://komarev.com/ghpvc/?username=zakaullahbaloch&label=VIEWS&style=for-the-badge&color=orange" alt="Views" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Online-brightgreen?style=for-the-badge&logo=statuspal" />
  <img src="https://img.shields.io/badge/Version-2.0.0-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deploy-Koyeb%20%7C%20Railway%20%7C%20Termux-blue?style=for-the-badge" />
</p>

<!-- ANIMATED BOT DEMO (place a GIF in your repo or use online) -->
<p align="center">
  <img src="https://media.giphy.com/media/3o7abB06u9bNzA8LC8/giphy.gif" width="300" />
  <br />
  <em>PLAYER MD – Your WhatsApp Sidekick</em>
</p>

---

## 🎮 ABOUT PLAYER MD

**PLAYER MD** is a powerful, multi-device WhatsApp bot built with **Baileys** and **Node.js**. It comes packed with:

- ⚡ **Ultra-fast commands**
- 🔒 **Session persistence** (no re‑scanning every time)
- 🤖 **AI chat & image recognition**
- 🎨 **Sticker maker, group tools, downloader, games**
- 🔄 **Auto‑status view, anti‑delete, and more**

---

## ✨ FEATURES – ANIMATED LIST

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=2000&pause=500&color=F75C7E&center=true&vCenter=true&width=435&lines=🌟+AI+Chat+System;📸+Instagram+Downloader;🎵+YouTube+Music+Download;👥+Group+Management;🃏+Fun+Games;🛡️+Anti‑Delete+Messages" />
</p>

| Category | Commands |
|----------|----------|
| **📁 Downloaders** | `.ytmp3`, `.ytmp4`, `.ig`, `.fb`, `.twitter` |
| **🎨 Media** | `.sticker`, `.toimage`, `.tomp3`, `.take` |
| **👥 Group** | `.add`, `.kick`, `.promote`, `.demote`, `.tagall` |
| **🎮 Games** | `.trivia`, `.tictactoe`, `.guess` |
| **🤖 AI** | `.ai [question]`, `.gpt [prompt]`, `.imagine [text]` |
| **⚙️ Owner** | `.broadcast`, `.restart`, `.leave`, `.getses` |

> 💡 Type `.menu` to see the full command list!

---

## 🚀 DEPLOYMENT – GET YOUR BOT ONLINE

### Option 1: Deploy on Koyeb (Recommended – Free)

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/yourusername/player-md&branch=main)

1. Fork this repository.
2. Click the button above.
3. Add environment variables: `SESSION_ID` (get from [session generator](https://session-generator.com)) and other configs.
4. Deploy – done!

### Option 2: Run on Termux (Android)

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts ffmpeg -y
git clone https://github.com/yourusername/player-md
cd player-md
npm install
npm start
