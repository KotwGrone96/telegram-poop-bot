const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Poop Scores',
    message: 'APP DE BOT TELEGRAM POOPS',
    layout: false,
  });
});

module.exports = router;
