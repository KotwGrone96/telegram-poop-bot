const { Telegraf } = require('telegraf');
const { Hears, Score, Start } = require('./controllers/BotController');

const bot = new Telegraf(process.env.BOT_KEY);

bot.start((ctx) => Start(ctx));

bot.hears('💩', (ctx) => Hears(ctx));

bot.command('/score', (ctx) => Score(ctx));

bot.command('/poops', (ctx) => {
  ctx.replyWithHTML('https://nelsongamerodev.com/');
});

console.log('BOT TELEGRAM READY');

bot.launch();
