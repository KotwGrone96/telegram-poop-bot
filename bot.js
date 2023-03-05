const { Telegraf } = require('telegraf');
const BotController = require('./controllers/BotController');
// const User = require('./models/user');

const bot = new Telegraf(process.env.BOT_KEY);
const controller = new BotController();

bot.start((ctx) => controller.Start(ctx));

bot.hears('💩', (ctx) => controller.Hears(ctx));

bot.command('/score', (ctx) => controller.Score(ctx));

bot.command('/scores', (ctx) => controller.Scores(ctx));

bot.command('/about', (ctx) => controller.About(ctx));

bot.command('/register', (ctx) => controller.Register(ctx));

bot.command('/help', (ctx) => controller.Help(ctx));

// bot.command('/poops', (ctx) => {
//   ctx.replyWithHTML('https://nelsongamerodev.com/poops');
// });

// bot.on('message', (ctx) => {
//   console.log(ctx.message.text);
// });

console.log('BOT TELEGRAM READY');

bot.launch();
