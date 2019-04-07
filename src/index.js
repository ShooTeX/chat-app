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

  socket.emit('message', 'Welcome!');
  socket.broadcast.emit('message', 'A new user has joined!');

  socket.on('newMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  });
});
server.listen(3000, () => console.log(`Server is up on ${port}`));