// Ionic Starter App

angular.module('wearmeat', [
  'ionic',
  'wearmeat.controllers',
  'wearmeat.services',
  'google-maps'.ns()
])

.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
  GoogleMapApi.configure({
   key: 'AIzaSyDaSjblGoTBuFMHGH170IjboB7Pw3KQUtg',
    v: '3.17',
    // libraries: 'weather,geometry,visualization'
  });
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('map', {
    url: '/map?groupId?share',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl',
    resolve: {
      googleMapApi: ['GoogleMapApi'.ns(), function(GoogleMapApi) {
        return GoogleMapApi;
      }],

      joinedGroup: function ($q, socket, clientId, $stateParams,
      handleError, getName) {
        var deferred = $q.defer();

        console.debug('joining group ' + $stateParams.groupId);

        getName()
        .then(function(name) {
          if (!name) return deferred.reject({error: "Could not get name"});

          console.debug('emitting join');
          socket.emit('join', {
            clientId: clientId,
            name: name,
            groupId: $stateParams.groupId

          }, function (response) {

            if (response.error) {
              handleError(response.error);
              return deferred.reject(response.error);
            }

            console.debug('Joined room ' + response.groupId, response);

            return deferred.resolve({
              groupId: response.groupId,
              members: response.members,
              destinations: response.destinations
            });

          });

        })

        return deferred.promise;
      }
    }
  })

  .state('create', {
    url: '/',
    templateUrl: 'templates/create.html',
    controller: 'CreateCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})