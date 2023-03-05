const controller = require('./../controllers/BotController');

const jokes = [
  'con ese cago te invito a cagar a casa',
  'no te molesta el qlo de tanto cagar?',
  'el papel higiénico grita por ayuda',
  'ojo con las palometas',
  'ese garco deja una frenada de camión en tus calzones',
  'ese inodoro deberá ser reemplazado pronto',
  'ni el agua del nilo puede limpiar ese cagadón',
  'alto garco. comiste picante?',
  'fuiste contratadx para una propaganda de activia',
  'cagamos, perdimos, igual nos divertimos(?',
  'te recibiste de somelier de papel higiénico',
];

const getRandomJoke = (arr = [], lastJoke) => {
  let index = Math.floor(Math.random() * arr.length);
  let joke = arr[index];

  while (joke == lastJoke) {
    index = Math.floor(Math.random() * arr.length);
    joke = arr[index];
  }

  return joke;
};

module.exports = { jokes, getRandomJoke };
