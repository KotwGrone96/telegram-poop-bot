const { DataTypes } = require('sequelize');
const sequelize = require('./../db/dbconfig');
// const Poop = require('./poops');

const Chat = sequelize.define(
  'Chat',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tlg_chat_id: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      unique: true,
    },
    tlg_chat_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Chat;
