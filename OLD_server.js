require('dotenv').config();
require('./db/connection');
const express = require('express');

const router = require('./routes/router');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const host = 'poopscores.com';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use('/poops', router);

app.use((req, res) => {
  res.send('RUTA NO ENCONTRADA');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${host}:${port}`);
  require('./bot');
});
