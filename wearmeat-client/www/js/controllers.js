angular.module('wearmeat.controllers', [])

.controller('MapCtrl', function($scope, googleMapApi) {
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
