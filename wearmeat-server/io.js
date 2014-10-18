var io = require('socket.io')();
var events = require('./events');

// Configure global options for SocketIO here.
io.on('connection', function(socket) {
  console.log('a user connected');

  events.forEach(function(evtRegister) {

    evtRegister(socket, io);

  });

})



module.exports = io;