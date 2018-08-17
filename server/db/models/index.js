const User = require('./user');
const Room = require('./room');
const QueueItem = require('./queueItem');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Room, {through: 'RoomListeners'});
Room.belongsToMany(User, {through: 'RoomListeners'});
QueueItem.belongsTo(Room);
Room.hasMany(QueueItem);
//  Room.belongsTo(User);

module.exports = {
  User,
  Room,
  QueueItem
};
