'use strict';

angular.module('oroboksApp')
.controller('NavbarController', function ($scope, $auth, $state, $rootScope, $http, $user, OROServicesUrl, OROServices) {
  
 // When user has signed in
 $rootScope.$on('$authenticated',function(e,response){
    console.log(response);

    // Setting orouser scope get user data to populate navbar during login
    $scope.orouser = {
       firstname: response.givenName,
       fullname: response.fullName,
       username: response.username
    };

    // Calling user service with token
    var req = {
      method:'POST',
      url:OROServicesUrl.getUserWithTokenURL(),
      params:{
        emailId: response.email
      }
    }

    $http(req).then(function successCallback(currentorouser) {
        console.log(currentorouser);
        OROServices.setOROUser(currentorouser);
        angular.element('#modal-login').modal('hide');
    }, function errorCallback(currentorouser) {
        console.log("NavbarController: User does not Exist!!");
    });
  });

 // When user has signed up
 $rootScope.$on('$registered',function(e,account){
    // Send the user information to our database
      var req = {
        method:'POST',
        url:OROServicesUrl.getUsersURL(),
        data:{
          userId:account.username,
          roleName:'customer'
        }
      }

      $http(req).then(function successCallback(response) {
        console.log("NavbarController: Success");
      }, function errorCallback(response) {
        console.log("NavbarController: Failure");
      });
  });

  // Validation for user and also get user data to populate navbar
  $user.get()
  .then(function (user) {
     $scope.orouser = {
       firstname: user.givenName,
       fullname: user.fullName,
       username: user.username
     };
     console.log('NavbarController: The current user is', user);
  })
  .catch(function (error) {
     console.log('NavbarController: Error getting user', error);
  });

  $rootScope.$on('$sessionEnd',function(e){
     var clearAll = OROServices.clearAllData();
     console.log('NavbarController: '+clearAll+'');
  });

});
