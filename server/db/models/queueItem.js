const Sequelize = require('sequelize');
const db = require('../db');

const QueueItem = db.define('queueItem', {
  voters: Sequelize.ARRAY({
    type: Sequelize.STRING
  }),
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  addedBy: Sequelize.INTEGER,
  startTimeStamp: Sequelize.DATE,
  spotifyLink: {
    type: Sequelize.STRING,
    allowNull: false
  },
  currentPlayingTime: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isPlaying: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://icons-for-free.com/free-icons/png/512/1871847.png'
  },
  trackName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artistName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  upVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  downVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

QueueItem.prototype.addVote = () => {
  let votes = (this.votes += 1);
  return votes;
};

module.exports = QueueItem;
