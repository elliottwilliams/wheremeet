angular.module('wearmeat.controllers', [])

.controller('MapCtrl', function($scope, $stateParams, googleMapApi,
socket, clientId, handleError, getLocation, joinedGroup, distance) {
  console.debug('loaded with googleMapApi', googleMapApi);
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

.controller('CreateCtrl', function ($scope) {

})