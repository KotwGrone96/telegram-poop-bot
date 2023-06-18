const sequelize = require('./dbconfig');
require('./../models/user');
require('./../models/chat');
require('./../models/poops');

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Conexión exitosa base de datos de ${
        process.env.NODE_ENV == 'production' ? 'producción' : 'desarrollo'
      }`
    );
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

connect();
