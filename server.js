require('dotenv').config();
require('./db/connection');
const { bot } = require('./bot');
const express = require('express');

const router = require('./routes/router');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const main = async () => {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.use('/poops', router);

  app.use((req, res) => {
    res.send('RUTA NO ENCONTRADA');
  });

  if (process.env.NODE_ENV == 'production') {
    app.use(await bot.createWebhook({ domain: process.env.WEBHOOK }));
  } else {
    bot.launch();
  }

  app.listen(port, () => console.log(`Bot ready on port ${port}`));
};

main();
