'use strict';

angular.module('oroboksApp')
.controller('NavbarController', function ($scope, $auth, $state, $rootScope, $http) {
  
 $rootScope.$on('$authenticated',function(e,response){
     window.location.reload();
  });

 $rootScope.$on('$registered',function(e,account){
      var req = {
        method:'POST',
        url:'https://oroboks.herokuapp.com/users',
        data:{
          userId:account.username,
          roleName:'customer'
        }
      }

      $http(req).then(function successCallback(response) {
        console.log("Success");
    }, function errorCallback(response) {
        console.log("Failure");
    });
  });
});
