const User = require('./../models/user');
const { getRandomJoke, jokes } = require('./../jokes/jokes');
class BotController {
  flor = process.env.FLOR_ID;
  nelson = process.env.NELSON_ID;
  paula = process.env.PAULA_ID;
  static lastJoke = '';

  Start(ctx) {
    ctx.reply(
      'Bienvenide a PoopBot 💩!!!\nEstás liste para empezar a contar tus cagadas diarias?\nSolamente necesitás registrarte usando el comando /register y listo!!!\nPara saber todos los comandos y sus funciones escribí /help .\n Una vez registrade, basta con mandar un solo emoji de 💩 para ir sumando cagadas a tu vida.\n Y ahora, andate a cagar!!! 💩'
    );
  }

  Hears(ctx) {
    async function init(ctx) {
      console.log(ctx.message.from);
      const { id, username } = ctx.message.from;
      console.log(`${username} mandó un poop`);
      const user = await User.findOne({ where: { tlg_user_id: id } });
      if (user == null) {
        ctx.reply('Amigue, te falta registrarte.\n Hacete un favor y escribí /register, gracias.');
        return;
      }
      await User.update({ poops: user.poops + 1 }, { where: { tlg_user_id: id } });

      const joke = getRandomJoke(jokes, BotController.lastJoke);
      BotController.lastJoke = joke;
      ctx.reply(joke);
    }
    init(ctx);
  }

  Score(ctx) {
    async function init(ctx) {
      const { id, username } = ctx.message.from;
      const user = await User.findOne({ where: { tlg_user_id: id } });
      if (user == null) {
        ctx.reply('Amigue, te falta registrarte.\n Hacete un favor y escribí /register, gracias.');
        return;
      }
      if (user.poops == 0) {
        ctx.reply(`${username} no cagaste nada aún 💩`);
        return;
      }
      ctx.reply(
        user.poops == 1
          ? `${username} ha cagado solo una vez 💩`
          : `${username} ha cagado un total de ${user.poops} veces 💩`
      );
    }
    init(ctx);
  }

  Scores(ctx) {
    async function init(ctx) {
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date().toLocaleDateString('es-AR', dateOptions);
      let reply = `${date}\n`;
      const users = await User.findAll();
      if (users.length == 0) {
        ctx.reply(
          'Aún no hay usuarios registrados.\n Escribí /register para comenzar con tus cagadas 💩'
        );
        return;
      }
      users.forEach((user) => {
        reply += `- ${user.tlg_username} tiene un total de ${user.poops} 💩\n`;
      });
      ctx.reply(reply);
    }
    init(ctx);
  }

  About(ctx) {
    ctx.reply(
      'Alguna vez pensaste en llevar registros de tu 💩?\n Con este bot podés desafiar a tus amigues y llevar registro de sus cagadas.\n Escribí /register para verificarte y empezar a sumar 💩.\n Para listar todos los comandos escribí /help.'
    );
  }

  Register(ctx) {
    async function init(ctx) {
      const { id, username } = ctx.message.from;
      const exist = await User.findOne({ where: { tlg_user_id: id } });
      if (exist) {
        ctx.reply('Vos ya estás registrade, salame!!!');
        return;
      }
      await User.create({ tlg_username: username, tlg_user_id: id, poops: 0 });
      console.log(`${username} se ha registrado correctamente`);
      ctx.reply(`Gracias por registrarte ${username}, andá a cagar, dale! 💩`);
    }
    init(ctx);
  }

  Help(ctx) {
    ctx.reply(
      '/about te contará un poco sobre el bot 💩\n /register hará que el bot te registre y puedas empezar a acumular cagadas 💩\n /score te mostrará el total de tus cagadas acumuladas hasta el momento 💩\n /scores te mostrará el total de cagadas de todos les personas registrades 💩'
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
}

module.exports = BotController;
