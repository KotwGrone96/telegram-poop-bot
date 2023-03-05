const { Telegraf } = require('telegraf');
const BotController = require('./controllers/BotController');
// const User = require('./models/user');

const botKey = process.env.NODE_ENV == 'production' ? process.env.BOT_KEY : process.env.BOT_DEV_KEY;

const bot = new Telegraf(botKey);
const controller = new BotController();

bot.use(async (ctx, next) => {
  const { id, username } = ctx.message.from;
  if (id == process.env.FLOR_ID || id == process.env.NELSON_ID || id == process.env.PAULA_ID) {
    await next();
  } else {
    ctx.reply(`Y vos quién chota sos? ${username}`);
  }
});

bot.start((ctx) => controller.Start(ctx));

bot.hears('💩', (ctx) => controller.Hears(ctx));

bot.command('/score', (ctx) => controller.Score(ctx));

bot.command('/scores', (ctx) => controller.Scores(ctx));

bot.command('/about', (ctx) => controller.About(ctx));

bot.command('/register', (ctx) => controller.Register(ctx));

bot.command('/help', (ctx) => controller.Help(ctx));

bot.command('/less', (ctx) => controller.Less(ctx));

bot.command('/excel', (ctx) => controller.Excel(ctx));

// bot.command('/poops', (ctx) => {
//   ctx.replyWithHTML('https://nelsongamerodev.com/poops');
// });

// bot.on('message', (ctx) => {
//   console.log(ctx.message.text);
// });

console.log('BOT TELEGRAM READY');

bot.launch();
