const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Poop Scores',
    message: 'APP DE BOT TELEGRAM POOPS',
    layout: false,
  });
});

router.post('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Webhook exitoso',
  });
});

module.exports = router;
