'use strict';

angular.module('oroboksApp')
.controller('NavbarController', function ($scope, $auth, $state, $rootScope, $http, $user, OROServicesUrl, OROServices) {
  
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

 // When user has signed in
 $rootScope.$on('$authenticated',function(e,response){
    // Setting stormpath orouser scope get user data to populate navbar during login
    $scope.sp_orouser = {
       firstname: response.givenName,
       fullname: response.fullName,
       username: response.username
    };

    // Calling user service to get token
    var req = {
      method:'POST',
      url:OROServicesUrl.getUserWithTokenURL(),
      params:{
        emailId: response.email
      },
      headers: {
        'Authorization': 'Oro@AdiRuchir&20150622@19881989&skJunGy97j'
      }
    }

    $http(req).then(function successCallback(o_user) {
        console.log(o_user);
        $scope.o_user = o_user;
        OROServices.setOROUser(o_user);
        angular.element('#modal-login').modal('hide');
    }, function errorCallback(e) {
        console.log("NavbarController: User does not Exist!!");
    });
  });

  // Validation for user and also get user data to populate navbar
  $user.get()
  .then(function (user) {
     $scope.sp_orouser = {
       firstname: user.givenName,
       fullname: user.fullName,
       username: user.username
     };
     $scope.o_user = OROServices.getOROUser();
     console.log('NavbarController: The current user is', user);
  })
  .catch(function (error) {
     console.log('NavbarController: Error getting user', error);
  });

  // When the user has ended their session or logged out
  $rootScope.$on('$sessionEnd',function(e){
     $scope.sp_orouser = undefined;
     $scope.o_user = undefined;
     var clearAll = OROServices.clearAllData();
     console.log('NavbarController: '+clearAll+'');
  });

});
