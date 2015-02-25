angular.module('wearmeat.services', [
  'geolocation',
  'btford.socket-io'
])

.value('serverURL', '')
.value('serverAbsoluteURL', 'http://wheremeet.me/')

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

/*
.factory('updateName', function(){
  return function(socket, clientId){
    console.debug('emitting updateMembers (updateName)');
    socket.emit('updateMembers', {
      clientId: clientId,
      name: getName(true) + clientId,
      groupId: groupId
    });
  }
})*/

.factory('getName', function ($q, $ionicPopup, $rootScope) {

  /**
   * Get the user's name, either by displaying a prompt asking for it, or by
   * reading the name in localStorage
   * @param  {Boolean} forceReprompt always prompt for name, even if a name
   *                                 exists in localStorage
   * @return {Promise}               resolved with name when action completed,
   *                                 rejected if user cancels the prompt
   */
  return function getName(forceReprompt) {

    var deferred = $q.defer();
    var modalScope = $rootScope.$new();

    modalScope.name = localStorage.getItem('wearmeat-name');
    modalScope.errorText = null;

    if (forceReprompt || !modalScope.name) {
      var title = "Enter your name to join the group";
      var buttonNegative = "Leave";
      var buttonPositive = "Join";
      var errorText = "You'll need to enter your name before you can join.";

      if(forceReprompt){
        title = "Enter your new name";
        buttonNegative = "Cancel";
        buttonPositive = "Change it";
        errorText = "Please enter a name, yo.";
      }

      $ionicPopup.show({
        title: title,
        scope: modalScope,
        templateUrl: 'name-prompt.html',
        buttons: [
          {
            text: buttonNegative,
            type: 'button-default',
            onTap: function (e) {
              return false;
            }
          },
          {
            text: buttonPositive,
            type: 'button-positive',
            onTap: function (e) {
              if (!modalScope.name) {
                modalScope.errorText = errorText;
                e.preventDefault();
              } else {
                return modalScope.name;
              }
            }
          }
        ]
      })
      .then(function (name) {
        if (name) {
          localStorage.setItem('wearmeat-name', name);
          deferred.resolve(name);
        } else {
          deferred.reject();
        }
      });

    } else {
      deferred.resolve(modalScope.name);
    }

    return deferred.promise;

  }
})
