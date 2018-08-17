const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This room does not have a description yet'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR8tcZONgfXI3h4m9BuCi6hg3K84kk7TU_lI6YqgsaoJFhGztOZg'
  }
});

module.exports = Room;
