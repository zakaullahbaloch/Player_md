{
  "name": "PLAYER MD",
  "description": "Advanced WhatsApp Bot by SHAHZU PLAYER",
  "repository": "https://github.com/yourusername/player-md",
  "keywords": ["whatsapp", "bot", "player-md"],
  "env": {
    "SESSION_ID": {
      "description": "Base64 encoded session (get via .getsession)",
      "required": true
    },
    "OWNER_NUMBER": {
      "value": "923033065965",
      "required": true
    },
    "OWNER_NAME": {
      "value": "SHAHZU PLAYER",
      "required": true
    },
    "PREFIX": {
      "value": ".",
      "required": false
    }
  },
  "buildpacks": [
    { "url": "heroku/nodejs" }
  ]
} 
