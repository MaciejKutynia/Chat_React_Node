const express = require('express');
const socketIO = require('socket.io');

const app = express();

const PORT = 3200 || process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

const users = [];
let checkUser = true;
let usersList = [];

io.on('connection', (socket) => {
  console.log(`connected with id ${socket.id}`);
  socket.on('join', ({ name, room }) => {
    name = name.trim();
    const user = {
      name,
      room,
      id: socket.id,
    };
    socket.join(user.room);
    const exist = users.find((usr) => usr.name === name && usr.room === room);
    if (!exist) {
      users.push(user);
      checkUser = false;
    } else {
      checkUser = true;
    }
    socket.emit('checkUser', checkUser);
    if (!checkUser) {
      socket.emit('botMsg', {
        user: 'Admin',
        msg: `Witaj ${user.name} w pokoju ${user.room}`,
      });
      socket.to(user.room).emit('newUser', {
        user: 'Admin',
        msg: `Użytkownik ${user.name} dołączył do pokoju`,
      });
    }
    socket.on('sendMessage', (message) => {
      socket
        .to(user.room)
        .emit('newMessage', { user: user.name, msg: message });
    });
  });
  socket.on('disconnect', () => {
    const user = users.find((user) => user.id === socket.id);
    if (user) {
      socket.to(user.room).emit('userLeft', {
        user: 'Admin',
        msg: `Użytkownik ${user.name} opuścił pokój`,
      });
    }
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    console.log('user has left');
  });
});
