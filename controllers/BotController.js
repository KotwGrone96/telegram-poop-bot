const flor = process.env.FLOR_ID;
const nelson = process.env.NELSON_ID;
const paula = process.env.PAULA_ID;

const dbCount = [
  { id: flor, poops: 0 },
  { id: nelson, poops: 0 },
  { id: paula, poops: 0 },
];

const Start = (ctx) => {
  ctx.reply('HOLA GENTE!!!');
};

const Hears = (ctx) => {
  console.log(ctx.message.from);
  const { id, username } = ctx.message.from;
  console.log(`${username} mandó un poop`);
  dbCount.forEach((db) => {
    if (db.id == id) {
      db.poops = db.poops + 1;
    }
  });
  ctx.reply(`Que buen cago te mandaste ${username}`);
};

const Score = (ctx) => {
  const { id, username } = ctx.message.from;
  const user = dbCount.find((db) => db.id == id);
  if (user == undefined) {
    ctx.reply(`Y vos quién chota sos ${username}?`);
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
};

module.exports = { Start, Score, Hears };
