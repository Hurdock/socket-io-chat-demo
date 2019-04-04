var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081, () => {
  console.log('Sockets server is now running on port 8081');
});

let chat_messages = [{
  author: 'AdminBot', text: 'Welcome to this chat.'
}];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('loadMessages', { messages: chat_messages }); // When users connects for the first time it loads the old messages.
  socket.on('sendMessage', function (data) {
    chat_messages.push(data); // Adds the message to the array
    socket.emit('receiveMessage', data); // Sends it to yourself 
    socket.broadcast.emit('receiveMessage', data); // Sends it to everyone else beside you
  });
});