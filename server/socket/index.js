const rooms = {};

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    // user disconnected from server
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });

    //user joined room
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

    // user left room
    socket.on('left', (user, room) => {
      console.log('A user has left a room', user, room);
      rooms[room][user.id] = undefined;
      updateListeners(room);
    });

    // error handling
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
