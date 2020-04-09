const Sequelize = require('sequelize');
const sequelize = require('./index');

const Token = sequelize.define('token', {
  data: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {});

module.exports = Token;
