require('dotenv').config();
require('./db/connection');
const { bot } = require('./bot');

if (process.env.NODE_ENV == 'production') {
  bot
    .launch({
      webhook: {
        domain: 'https://successful-rose-sunbonnet.cyclic.app',
        port: process.env.PORT || 8000,
      },
    })
    .then(() => {
      console.info(`The bot ${bot.botInfo.username} is running on server`);
    });
} else {
  bot.launch().then(() => {
    console.info(`The bot ${bot.botInfo.username} is running locally`);
  });
}
