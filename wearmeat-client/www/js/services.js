angular.module('wearmeat.services', [])

.value('serverURL', 'http://localhost:3000')

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

// Server SocketIO transport
.factory('socket', function (socketFactory, serverURL) {
  var socket = socketFactory({
      ioSocket: io('http://localhost:3000')
  });
  // app-level config of socket
  return socket;

})


.factory('clientId', function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }

  var clientId = s4() + s4();
  return clientId;
})


.factory('handleError', function () {
  return function handleError(msg){
    alert("Error, yo:\n\n" + JSON.stringify(msg, null, ' '));
  };
})