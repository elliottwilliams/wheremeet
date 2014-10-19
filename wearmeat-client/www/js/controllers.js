angular.module('wearmeat.controllers', [])

.controller('MapCtrl', function($scope, $stateParams, googleMapApi,
socket, clientId, handleError) {
  console.debug('loaded with googleMapApi', googleMapApi);
  $scope.options = {
    disableDefaultUI: true
  }

  $scope.destinations = {};
  $scope.chosenDestination = null;
  $scope.distanceFromChosen = 'X.XX';
  $scope.members = {};


  function getDestinationsEvent (msg) {
    console.debug('getDestinationsEvent', msg);
    if (msg.error) return handleError(msg.error);
    $scope.destinations = msg.destinations;
  }

  function updateMembersEvent (msg) {
    console.debug('updateMembersEvent', msg);
    if (msg.error) return handleError(msg.error);
    $scope.members = msg.members;
  }

  function updateChosenDestination (msg) {
    console.debug('updateChosenDestination', msg);
    if (msg.error) return handleError(msg.error);
    $scope.chosenDestination = msg.chosenDestination;
  }

  // DEMO DATA <3
  $scope.map = {
      center: {
          latitude: '40.428657',
          longitude: '-86.920836'
      },
      zoom: 15
  };

  getDestinationsEvent({
    groupId: 1337,
    destinations: [
      {
        id: '1',
        name: 'Wiley',
        location: {
          latitude: '40.428657', longitude: '-86.920836'
        }
      },
      {
        id: '2',
        name: 'Hillenbrand',
        location: {
          latitude: '40.426729', longitude: '-86.926777'
        }
      },
      {
        id: '3',
        name: 'Earhart',
        location: {
          latitude: '40.425598', longitude: '-86.925125'
        }
      }
    ]
  });

  updateMembersEvent({
    groupId: 1337,
    members: [
      {
        id: '123',
        name: 'Ada',
        location: {
          latitude: '40.427816', longitude: '-86.916663'
        }
      },
      {
        id: '456',
        name: 'Alan',
        location: {
          latitude: '40.424287', longitude: '-86.921084'
        }
      }
    ]
  })

  updateChosenDestination({
    groupId: 1337,
    chosenDestination: $scope.destinations[0]
  })





  // Join the server at the specified channel
  socket.emit('join', {
    clientId: clientId,
    groupId: $stateParams.groupId

  }, function (response) {

    if (response.error) return handleError(response);

    console.debug('Joined room ' + response.groupId, response);

  });


})

.controller('DashCtrl', ['$scope', 'GoogleMapApi'.ns(), function ($scope, GoogleMapApi) {
  GoogleMapApi.then(function(maps) {
    console.debug('Google Map ready');
  });

  $scope.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
  };
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
