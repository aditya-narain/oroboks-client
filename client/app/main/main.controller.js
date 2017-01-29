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
          longitude:lng,
          sortby:'date'
        }
      }

      $http(req).then(function successCallback(response) {
        // Call ORO Services
        OROServices.removeItem('s_cuisineobject');
        OROServices.removeItem('s_itemstoadd');
        OROServices.removeItem('s_summaryavailabledates');
        OROServices.setCombos(response);
        OROServices.setFormattedAddr(faddr);

        console.log(response);
        console.log("MainController: Success");
        $location.path( "/selectcombo" );
      }, function errorCallback(response) {
        console.log("MainController: Failure");
      });
    };

    // Press enter to fill in full address automatically
    $scope.form = {
      type: 'geocode',
      bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
      country: 'ca',
      typesEnabled: false,
      boundsEnabled: false,
      componentEnabled: false,
      watchEnter: true
    }

    // watch form for changes
    $scope.watchForm = function () {
      return $scope.form
    };
    $scope.$watch($scope.watchForm, function () {
      $scope.checkForm()
    }, true);


    //set options from form selections
    $scope.checkForm = function() {

      $scope.options = {};

      $scope.options.watchEnter = $scope.form.watchEnter

      if ($scope.form.typesEnabled) {
        $scope.options.types = $scope.form.type
      }
      if ($scope.form.boundsEnabled) {

        var SW = new google.maps.LatLng($scope.form.bounds.SWLat, $scope.form.bounds.SWLng)
        var NE = new google.maps.LatLng($scope.form.bounds.NELat, $scope.form.bounds.NELng)
        var bounds = new google.maps.LatLngBounds(SW, NE);
        $scope.options.bounds = bounds

      }
      if ($scope.form.componentEnabled) {
        $scope.options.country = $scope.form.country
      }
    };
});
