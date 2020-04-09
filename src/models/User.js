const Sequelize = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required',
      },
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
}, {});

module.exports = User;
