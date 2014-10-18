// var io = require('../io');

module.exports = function(socket, io) {

  socket.on('join', function(data) {
    // do whatever
    console.log('join in room ' + data.room, data);

    socket.join(data.room);

    io.to(data.room).emit('joined', data);
  });

}