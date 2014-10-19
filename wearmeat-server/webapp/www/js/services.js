angular.module('wearmeat.services', [
  'geolocation',
  'btford.socket-io'
])

.value('serverURL', '/')

// Server SocketIO transport
.factory('socket', function (socketFactory, serverURL) {

  var socket = socketFactory({
    ioSocket: io(serverURL)
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
      handleError("Wearmeat requires your location, so that we can show you on the map.")
    })
  }

})

.factory('distance', function(){
	
	function getLong (loc){
		return loc.longitude;
	}
	function getLat (loc){
		return loc.latitude;
	}
	function toRad( deg ){
		return deg * Math.PI / 180;
	}
	
	return function(loc1, loc2){
		var R = 3963.1676;
		var lat1 = toRad( getLat(loc1) );
		var lat2 = toRad( getLat(loc2) );
		var dLat = lat1 - lat2;
		var dLong = toRad( getLong(loc1)-getLong(loc2) );
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1) * Math.cos(lat2) *
			Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a) );
		return c*R;
	}
})
