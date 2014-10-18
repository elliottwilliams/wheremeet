module.exports = function(socket) {

  socket.on('join', function(data) {
    // do whatever
    console.log('join', data);
  });

}