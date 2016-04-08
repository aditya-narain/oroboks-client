'use strict';

angular.module('oroboksApp')
  .controller('RegisterCtrl', function ($scope, $rootScope) {
    $scope.message = 'Hello';
    $rootScope.$on('$registered',function(e,account){
     $scope.message = 'Ruchir Choudhary';
     console.log("My Name is Anthony");
  });
  });
