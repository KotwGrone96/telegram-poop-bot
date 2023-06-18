const { DataTypes } = require('sequelize');
const sequelize = require('./../db/dbconfig');
const User = require('./user');
const Chat = require('./chat');

const Poop = sequelize.define(
  'Poop',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Chat,
        key: 'id',
      },
    },
    poop_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poop_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.hasMany(Poop, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

Poop.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

Chat.hasMany(Poop, {
  foreignKey: 'chat_id',
  sourceKey: 'id',
});

Poop.belongsTo(Chat, {
  foreignKey: 'chat_id',
  targetKey: 'id',
});

module.exports = Poop;
