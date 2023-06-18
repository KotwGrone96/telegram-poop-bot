const fs = require('fs').promises;
const moment = require('moment');
const Poop = require('./../models/poops');
const User = require('./../models/user');
const Chat = require('./../models/chat');
const { Op } = require('sequelize');

const { getRandomJoke, jokes } = require('./../utils/jokes');
const getExcel = require('./../utils/excel');
class BotController {
  static lastJoke = '';

  Start(ctx) {
    ctx.reply(
      'Bienvenide a PoopBot 💩!!!\nEstás liste para empezar a contar tus cagadas diarias?\nSolamente necesitás registrar el grupo con el comando /addchat, luego agregar tu usuario con el comando /register y listo!!!\nPara saber todos los comandos y sus funciones escribí /help .\n Una vez registrado el grupo y sus usuarixs, basta con mandar un solo emoji de 💩 para ir sumando cagadas a tu vida.\n Y ahora, andate a cagar!!! 💩'
    );
  }

  Hears(ctx) {
    async function init(ctx) {
      const chatId = ctx.message.chat.id;
      const userId = ctx.message.from.id;
      const chat = await Chat.findOne({ where: { tlg_chat_id: chatId } });
      if (chat == null)
        return ctx.replyWithHTML('<b>Antes que nada registren el grupo usando /addchat 💩</b>');
      const user = await User.findOne({ where: { tlg_user_id: userId } });
      if (user == null)
        return ctx.replyWithHTML(
          '<b>El grupo está registrado, pero vos no salamín!\n Escribí /register para registrar tu usuario 💩</b>'
        );
      const poop_date = moment(new Date()).format('DD-MM-YYYY');
      const poop = await Poop.findOne({
        where: { poop_date, user_id: user.id, chat_id: chat.id },
      });
      if (poop == null) {
        try {
          await Poop.create({ user_id: user.id, chat_id: chat.id, poop_date, poop_amount: 1 });
          const joke = getRandomJoke(jokes, BotController.lastJoke);
          BotController.lastJoke = joke;
          ctx.reply(joke);
          return;
        } catch (error) {
          console.log(error);
        }
      }
      try {
        poop.poop_amount = poop.poop_amount + 1;
        await poop.save();
        const joke = getRandomJoke(jokes, BotController.lastJoke);
        BotController.lastJoke = joke;
        ctx.reply(joke);
      } catch (error) {
        console.log(error);
      }
    }
    init(ctx);
  }

  Today(ctx) {
    async function init(ctx) {
      const chatId = ctx.message.chat.id;
      const userId = ctx.message.from.id;
      const chat = await Chat.findOne({ where: { tlg_chat_id: chatId } });
      if (chat == null)
        return ctx.replyWithHTML('<b>Antes que nada registren el grupo usando /addchat 💩</b>');
      const user = await User.findOne({ where: { tlg_user_id: userId } });
      if (user == null)
        return ctx.replyWithHTML(
          '<b>El grupo está registrado, pero vos no salamín!\n Escribí /register para registrar tu usuario 💩</b>'
        );
      const poop_date = moment(new Date()).format('DD-MM-YYYY');
      const poop = await Poop.findOne({
        where: { poop_date, user_id: user.id, chat_id: chat.id },
      });
      if (poop == null)
        return ctx.replyWithHTML(
          '<b>Aún no cagaste nada en todo el día.\n Leche fría con palta y sabés qué!!!! 💩</b>'
        );
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date().toLocaleDateString('es-AR', dateOptions);
      let reply = `${date}\n`;
      reply += `- Hoy ${user.tlg_username} cagó un total de ${poop.poop_amount} 💩`;
      return ctx.replyWithHTML(`<b>${reply}</b>`);
    }
    init(ctx);
  }

  Scores(ctx) {
    async function init(ctx) {
      const chatId = ctx.message.chat.id;
      const chat = await Chat.findOne({ where: { tlg_chat_id: chatId } });
      if (chat == null)
        return ctx.replyWithHTML('<b>Antes que nada registren el grupo usando /addchat 💩</b>');
      const currentMonth = moment(new Date()).format('MM');
      const poops = await Poop.findAll({
        include: [
          {
            model: User,
            attributes: ['tlg_username'],
          },
        ],
        where: {
          poop_date: {
            [Op.like]: `%-${currentMonth}-%`,
          },
        },
      });

      if (poops.length == 0)
        return ctx.replyWithHTML('<b>Nadie cagó aún, seguro es 1ero de mes 💩</b>');

      let results = {};
      poops.forEach((poop) => {
        const lastPoopNumber = results[poop.User.tlg_username];
        if (!lastPoopNumber) {
          results = {
            ...results,
            [poop.User.tlg_username]: {
              user_name: poop.User.tlg_username,
              poops: poop.poop_amount,
            },
          };
        } else {
          results = {
            ...results,
            [poop.User.tlg_username]: {
              user_name: poop.User.tlg_username,
              poops: lastPoopNumber.poops + poop.poop_amount,
            },
          };
        }
      });
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date().toLocaleDateString('es-AR', dateOptions);
      let reply = `${date}\n`;
      Object.values(results).forEach((res) => {
        reply += `${res.user_name} ha cagado un total de ${res.poops} 💩\n`;
      });
      ctx.replyWithHTML(`<b>${reply}</b>`);
    }
    init(ctx);
  }

  About(ctx) {
    ctx.replyWithHTML(
      '<b>Este bot nace de una idea divertida sacada de un tik tok XD, no nos engañemos(?\nDado que en dicho video la dinámica del juego se llevó de manera manual, decidí crear este esclavo contador de m*erdas 💩\nNo solo contará tus cagadas diarias y mensuales, sino que podrás sacar un registro completo con el comando /excel para que tus amigues y vos se den cuenta quién tiene el estómago jodido(?</b>'
    );
  }

  Register(ctx) {
    async function init(ctx) {
      const { id, username } = ctx.message.from;
      const exist = await User.findOne({ where: { tlg_user_id: id } });
      if (exist) {
        ctx.replyWithHTML('<b>Vos ya estás registrade, salame!!!</b>');
        return;
      }
      await User.create({ tlg_username: username, tlg_user_id: id });
      //console.log(`${username} se ha registrado correctamente`);
      ctx.replyWithHTML(`<b>Gracias por registrarte ${username}, andá a cagar, dale! 💩</b>`);
    }
    init(ctx);
  }

  AddChat(ctx) {
    async function init(ctx) {
      const { id, title } = ctx.message.chat;
      const chat = await Chat.findOne({ where: { tlg_chat_id: id } });
      if (chat) return ctx.replyWithHTML('<b>Este chat ya está registrado, papanatas! 💩</b>');
      try {
        await Chat.create({ tlg_chat_id: id, tlg_chat_name: title });
        ctx.replyWithHTML(
          `<b>El chat fue registrado correctamente, ahora todes les que están en ${title} pueden empezar a cagar!\nRecordá que antes de empezar tenés que estar registrade! \nPara eso utilizá el comando /register 💩</b>`
        );
      } catch (error) {
        console.log(error);
        ctx.replyWithHTML('<b>Ocurrió un error al registrar el chat, prueba más tarde!</b>');
      }
    }
    init(ctx);
  }

  Help(ctx) {
    ctx.reply(
      '/about te contará un poco sobre el bot 💩\n /addchat registará el grupo para poder jugar 💩\n /register hará que el bot te registre y puedas empezar a acumular cagadas en el grupo 💩\n /today te mostrará el total de tus cagadas acumuladas ese mismo día 💩\n /scores te mostrará el total de cagadas de todes les registrades 💩'
    );
  }

  Less(ctx) {
    async function init(ctx) {
      const { id, username } = ctx.message.from;
      const user = await User.findOne({ where: { tlg_user_id: id } });
      if (user == null) {
        ctx.reply('Amigue, te falta registrarte.\n Hacete un favor y escribí /register, gracias.');
        return;
      }
      await User.update({ poops: user.poops - 1 }, { where: { tlg_user_id: id } });
      ctx.reply(`${username} ha restado un poop 💩`);
    }
    init(ctx);
  }

  Excel(ctx) {
    async function init(ctx) {
      const chatId = ctx.message.chat.id;
      const userId = ctx.message.from.id;
      const chat = await Chat.findOne({ where: { tlg_chat_id: chatId } });
      if (chat == null)
        return ctx.replyWithHTML('<b>Antes que nada registren el grupo usando /addchat 💩</b>');
      const user = await User.findOne({ where: { tlg_user_id: userId } });
      if (user == null)
        return ctx.replyWithHTML(
          '<b>Solo usuarios registrados pueden descargar el excel!\n Escribí /register para registrar tu usuario 💩</b>'
        );
      const poops = await Poop.findAll({
        include: [
          {
            model: User,
            attributes: ['tlg_username'],
          },
          {
            model: Chat,
            attributes: ['tlg_chat_name'],
          },
        ],
        where: {
          chat_id: chat.id,
        },
      });
      const excelName = getExcel(poops, (err, stats) => {
        if (err) {
          console.error(err);
          ctx.reply('No se pudo generar el Excel!!!');
          return;
        }
        ctx.reply('Excel generado correctamente!!! 💩');
        ctx.sendDocument({ source: `${excelName}` });
        setTimeout(async () => {
          await fs.unlink(`./${excelName}`);
        }, 3000);
      });
    }
    init(ctx);
  }
}

module.exports = BotController;
