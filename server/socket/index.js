const rooms = {};

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });

    socket.on('joined', (user, room) => {
      console.log('A user has joined a room');
      console.log('his props were: ', user, room);
      // rooms[room][user] = user;
      if (!rooms[room]) {
        rooms[room] = {};
        rooms[room][user] = user;
      } else {
        rooms[room][user.id] = user;
      }
      let tempListeners = [];
      for (var key in rooms[room]) {
        if (rooms[room].hasOwnProperty(key)) {
          tempListeners.push(rooms[room][key]);
        }
      }
      console.log(tempListeners);
      socket.broadcast.emit('joined', user, room, tempListeners);
    });
  });
};
