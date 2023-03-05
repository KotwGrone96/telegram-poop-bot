const { Sequelize } = require('sequelize');

const sequelize =
  process.env.NODE_ENV == 'production'
    ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DN_HOST,
        dialect: 'mysql',
      })
    : new Sequelize('poops_telegram_bot', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
      });

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

module.exports = sequelize;
