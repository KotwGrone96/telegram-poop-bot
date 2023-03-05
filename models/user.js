const { DataTypes } = require('sequelize');
const sequelize = require('./../db/connection');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    tlg_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tlg_user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    poops: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  },
  {}
);

module.exports = User;
