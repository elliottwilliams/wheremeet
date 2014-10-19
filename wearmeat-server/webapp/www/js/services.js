angular.module('wearmeat.services', [
  'geolocation',
  'btford.socket-io'
])

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

  var clientId = localStorage.getItem('wearmeat-clientId');

  if (!clientId) {
    clientId = s4() + s4();
    localStorage.setItem('wearmeat-clientId', clientId);
  }

  return clientId;
})


.factory('handleError', function () {
  return function handleError(msg){
    alert("Error, yo:\n\n" + JSON.stringify(msg, null, ' '));
  };
})


.factory('getLocation', function (geolocation, socket, handleError,
  clientId) {

  return function (groupId) {
    return geolocation.getLocation()
    .then(function(loc) {

      var myLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      };

      console.debug('got location', myLocation);

      console.debug('emitting updateLocation');
      socket.emit('updateLocation', {
        clientId: clientId,
        name: 'name' + clientId,
        groupId: groupId,
        location: myLocation
      });

      return myLocation;

    }, function() {
      handleError("Wheremeet requires your location, so that we can show you on the map.")
    })
  }

})