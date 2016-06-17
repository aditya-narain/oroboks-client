'use strict';

angular.module('oroboksApp')
  .controller('SelectcomboCtrl', function ($scope, OROServices) {
  	$scope.combos = OROServices.getCombos();
  	console.log($scope.combos);
  });
