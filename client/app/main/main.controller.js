'use strict';

angular.module('oroboksApp')
.controller('MainController', function ($scope, $http, $user, OROServicesUrl, OROServices, $location) {
    // Setting options for place search
    $scope.options = {
        country: 'us',
        types: ['(regions)']
    };

    // Testing if we got the orouser
    $user.get()
    .then(function (user) {
       console.log(OROServices.getOROUser());
       console.log('MainController: user exists', user);
    })
    .catch(function (error) {
       console.log('MainController: user does not exist', error);
    });

    // getRestaurant function
    $scope.getRestaurant = function(lat, lng) {
      $scope.lat = lat;
      $scope.lng = lng;

      // Call the restaurant service service
      var req = {
        method:'GET',
        url:OROServicesUrl.getRestaurantURL(),
        params:{
          latitude:lat,
          longitude:lng
        }
      }

      $http(req).then(function successCallback(response) {
        // Call ORO Services
        OROServices.setCombos(response);
        console.log(response);
        console.log("MainController: Success");
        $location.path( "/selectcombo" );
      }, function errorCallback(response) {
        console.log("MainController: Failure");
      });
    };
});
