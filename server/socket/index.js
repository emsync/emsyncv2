const rooms = {};
const users = {};

module.exports = io => {
  io.on('connection', socket => {
    users[socket.id] = [];
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    // user disconnected from server
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
      removeUser(socket.id);
      if (users[socket.id]) {
        users[socket.id].forEach(room => {
          removeUser(socket.id, room);
        });
      }
      users[socket.id] = undefined;
    });

    //user joined room
    socket.on('joined', (user, room) => {
      console.log('A user has joined a room', user, room);
      if (user !== {}) {
        if (!rooms[room]) {
          rooms[room] = {};
        }
        if (!rooms[room][socket.id]) {
          rooms[room][socket.id] = user;
          users[socket.id].push(room);
        }
        updateListeners(room);
      }
    });

    // user left room
    socket.on('left', (user, room) => {
      users[socket.id].splice(users[socket.id].indexOf(room), 1);
      console.log('status: ', users[socket.id], rooms[room]);
      removeUser(user, room);
    });

    socket.on('next_track', () => {
      socket.broadcast.emit('next_track');
    });

    // error handling
    socket.on('error', function(err) {
      console.log(err);
    });

    updateListeners = room => {
      let tempListeners = [];
      for (var key in rooms[room]) {
        // console.log('the key is', key);
        if (rooms[room].hasOwnProperty(key)) {
          if (rooms[room][key]) {
            tempListeners.push(rooms[room][key]);
          }
        }
      }
      io.sockets.emit('update-listeners', room, tempListeners);
    };

    removeUser = (socketId, room) => {
      console.log('this is the room', room);
      if (room) {
        if (rooms[room][socketId]) {
          rooms[room][socketId] = undefined;
        }
      }
      updateListeners(room);
    };
  });
};
