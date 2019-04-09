const socket = io();


const $form = document.querySelector('form');
const $messages = document.querySelector('.messageBox');
const messageTemplate = document.querySelector('#messageTemplate').innerHTML;
const messageTemplateSelf = document.querySelector('#messageTemplateSelf').innerHTML;
const messageTemplateServer = document.querySelector('#messageTemplateServer').innerHTML;

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', ({ message, oUsername }) => {
  let html;
  if (username === oUsername) {
    html = Mustache.render(messageTemplateSelf, {
      message,
    });
  } else if (oUsername === 'Server') {
    html = Mustache.render(messageTemplateServer, {
      message,
    });
  } else {
    console.log(username, oUsername);
    html = Mustache.render(messageTemplate, {
      message,
      oUsername,
    });
  }
  $messages.insertAdjacentHTML('beforeend', html);
  $messages.scrollTop = $messages.scrollHeight - $messages.clientHeight;
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.querySelector('#messageBox').value;
  socket.emit('newMessage', { message, username });
  $form.reset();
});

socket.emit('join', { username, room });
socket.emit('leave', { username, room });
