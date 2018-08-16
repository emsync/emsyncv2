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
      console.log('A user has joined a room', user, room);
      // console.log('his props were: ', user, room);
      // rooms[room][user] = user;
      if (user !== {}) {
        if (!rooms[room]) {
          rooms[room] = {};
        }
        if (!rooms[room][user.id]) {
          rooms[room][user.id] = user;
        }
        updateListeners(room);
      }
    });

    socket.on('error', function(err) {
      console.log(err);
    });

    updateListeners = room => {
      let tempListeners = [];
      for (var key in rooms[room]) {
        console.log('the key is', key);
        if (rooms[room].hasOwnProperty(key)) {
          // console.log('users name is', rooms[room][key].name);
          if (rooms[room][key]) {
            tempListeners.push(rooms[room][key]);
          }
        }
      }
      console.log('ROOM ID: ', room);
      console.log('ROOM LISTENERS: ', tempListeners);
      io.sockets.emit('update-listeners', room, tempListeners);
    };
  });
};
