const User = require('./user')
const Room  = require('./room');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 User.hasMany(Room);
 Room.hasMany(User);
 Room.belongsTo(User);


module.exports = {
  User , Room
}
