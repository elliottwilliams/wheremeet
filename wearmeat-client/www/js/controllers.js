angular.module('wearmeat.controllers', [])

.controller('MapCtrl', function($scope, $stateParams, googleMapApi,
socket, clientId, handleError) {
  console.debug('loaded with googleMapApi', googleMapApi);
  $scope.options = {
    disableDefaultUI: true
  }
  $scope.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
  };

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
