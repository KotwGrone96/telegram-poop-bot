require('dotenv').config();
require('./db/connection');
const { bot } = require('./bot');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const main = async () => {
  if (process.env.NODE_ENV == 'production') {
    app.use(await bot.createWebhook({ domain: process.env.WEBHOOK }));
  } else {
    bot.launch();
  }

  app.listen(port, () => console.log(`Bot ready on port ${port}`));
};

main();
