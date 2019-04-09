const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ username, room }) => {
    socket.join(room);

    socket.emit('message', { message: 'Welcome!', oUsername: 'Server' });
    socket.broadcast.to(room).emit('message', { message: `${username} has joined!`, oUsername: 'Server' });

    socket.on('newMessage', ({ message, username: oUsername }) => {
      console.log(oUsername);
      io.to(room).emit('message', { message, oUsername });
    });
  });
  socket.on('disconnect', (socket) => {

  });
});
server.listen(port, () => console.log(`Server is up on ${port}`));
