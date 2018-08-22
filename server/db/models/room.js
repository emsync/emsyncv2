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
      'https://banner2.kisspng.com/20180423/uje/kisspng-computer-icons-dance-party-crazy-celebration-5adda0d3871471.1179835315244740675533.jpg' 
     },
  createdBy: {
    type: Sequelize.INTEGER
  },
  allowAdd: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  isDemocratic: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Room;
