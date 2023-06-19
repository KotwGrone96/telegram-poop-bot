const { Sequelize } = require('sequelize');
const sequelize =
  process.env.NODE_ENV == 'production'
    ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
      })
    : new Sequelize('poops_telegram_bot_v2', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
      });

module.exports = sequelize;
