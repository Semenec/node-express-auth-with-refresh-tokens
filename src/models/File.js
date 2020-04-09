const Sequelize = require('sequelize');
const sequelize = require('./index');

const File = sequelize.define('file', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mimetype: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

}, {});

module.exports = File;
