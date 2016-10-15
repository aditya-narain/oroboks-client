'use strict';

angular.module('oroboksApp')
.controller('MainController', function ($scope, $http, $user, OROServicesUrl, OROServices, $location) {
    // Setting options for place search
    $scope.options = {
        country: 'us',
        types: ['(regions)']
    };
    // getRestaurant function
    $scope.getCombosData = function(lat, lng, faddr) {
      $scope.lat = lat;
      $scope.lng = lng;

      // Call the restaurant service service
      var req = {
        method:'GET',
        url:OROServicesUrl.getCombosDataURL(),
        params:{
          latitude:lat,
          longitude:lng
        }
      }

      $http(req).then(function successCallback(response) {
        // Call ORO Services
        OROServices.removeItem('s_cuisineobject');
        OROServices.removeItem('s_itemstoadd');
        OROServices.setCombos(response);
        OROServices.setFormattedAddr(faddr);

        console.log(response);
        console.log("MainController: Success");
        $location.path( "/selectcombo" );
      }, function errorCallback(response) {
        console.log("MainController: Failure");
      });
    };
});
