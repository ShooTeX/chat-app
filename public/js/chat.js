const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

document.querySelector('#sendButton').addEventListener('click', (e) => {
  e.preventDefault();
  const message = document.querySelector('#messageBox').value;
  socket.emit('newMessage', message);
});
