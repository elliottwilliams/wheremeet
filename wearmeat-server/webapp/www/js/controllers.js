angular.module('wearmeat.controllers', [])

.controller('MapCtrl', function($scope, $stateParams, googleMapApi,
socket, clientId, handleError, getLocation, joinedGroup, distance) {

  $scope.options = {
    disableDefaultUI: true
  }

  console.debug('controller initiated with group: ', joinedGroup);

  $scope.groupId = joinedGroup.groupId;
  $scope.destinations = joinedGroup.destinations;
  $scope.members = joinedGroup.members;
  $scope.chosenDestination = null;
  $scope.distanceFromChosen = 'X.XX';
  $scope.myLocation = {};
  $scope.me = joinedGroup.members.filter(
    function(m) { return m.id == clientId })[0];


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

  function updateChosenDestinationEvent (msg) {
    console.debug('updateChosenDestinationEvent', msg);
    if (msg.error) return handleError(msg.error);

    var dest = msg.chosenDestination;
    $scope.chosenDestination = dest;
    $scope.distanceFromChosen = distance(dest.location, $scope.myLocation);
  }

  // DEMO DATA <3
  $scope.map = {
      center: {
          latitude: '40.428657',
          longitude: '-86.920836'
      },
      zoom: 15
  };


  getLocation($stateParams.groupId).then(function (loc) {
    $scope.myLocation = loc;
  });


  socket.forward('updateMembers');
  socket.forward('updateChosenDestination');
  socket.forward('getDestinations');

  $scope.$on('socket:updateMembers', function(ev, data) {
    updateMembersEvent(data);
  });
  $scope.$on('socket:updateChosenDestination', function(ev, data) {
    updateChosenDestinationEvent(data);
  });
  $scope.$on('socket:getDestinations', function(ev, data) {
    getDestinationsEvent(data);
  });


})

.controller('MapSharePopupCtrl', function ($scope, serverAbsoluteURL,
$ionicPopup, $stateParams) {

  $scope.serverURL = serverAbsoluteURL;

  $scope.showSharePopup = function showSharePopup () {
    console.debug('opening map share popup');

    $ionicPopup.show({
      title: 'Share this URL',
      templateUrl: 'map-share-popup.html',
      scope: $scope,
      buttons: [
      {
          text: 'GOTCHA',
          type: 'button-positive',
          onTap: function(e) {
            // Returning a value will cause the promise to resolve with the given value.
            return true;
          }
        }
      ]
    });

  };

  if ($stateParams.share) {
    $scope.showSharePopup();
  }

})

.controller('selfMapMarker', function($scope, getName){
  $scope.getName = getName;
})

.controller('CreateCtrl', function ($scope, $http, $state) {

  $scope.diningCourts = [];
  $scope.decisionAlgorithm = 'linear';

  $http.get('/public/diningCourts.json').success(function (courts) {
    courts = courts.map(function (c) {
      c.selected = true;
      return c;
    });
    $scope.diningCourts = courts;
  });

  $scope.createGroup = function createGroup () {

    var data = {};
    var selectedCourts = $scope.diningCourts.filter(function (c) {
      return c.selected; }).map(function (c) { return c.name });

    selectedCourts.forEach(function (c) {
      data[c] = true;
    });

    data.decisionAlgorithm = $scope.decisionAlgorithm;
    data.json = true;

    console.debug('creating group with these parameters: ', data);

    $http.post('/create', data).success(function (response) {
      $state.go('map', {groupId: response.groupId, share: true});
    });

  };

})