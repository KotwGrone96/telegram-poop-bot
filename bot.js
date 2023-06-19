const { Telegraf } = require('telegraf');
const BotController = require('./controllers/BotController');

const botKey = process.env.NODE_ENV == 'production' ? process.env.BOT_KEY : process.env.BOT_DEV_KEY;

export const bot = new Telegraf(botKey);
const controller = new BotController();

const isPrivate = async (ctx, next) => {
  const { type } = ctx.message.chat;
  if (type == 'private') return ctx.reply('PoopBot solo puede usarse en grupos de telegram 💩');
  await next();
};

bot.start((ctx) => controller.Start(ctx));

bot.hears('💩', isPrivate, (ctx) => controller.Hears(ctx));

bot.command('/today', isPrivate, (ctx) => controller.Today(ctx));

bot.command('/scores', isPrivate, (ctx) => controller.Scores(ctx));

bot.command('/about', (ctx) => controller.About(ctx));

bot.command('/register', isPrivate, (ctx) => controller.Register(ctx));

bot.command('/help', (ctx) => controller.Help(ctx));

// bot.command('/less', isPrivate, (ctx) => controller.Less(ctx));

bot.command('/excel', isPrivate, (ctx) => controller.Excel(ctx));

bot.command('/addchat', isPrivate, (ctx) => controller.AddChat(ctx));

console.log('BOT TELEGRAM READY');
