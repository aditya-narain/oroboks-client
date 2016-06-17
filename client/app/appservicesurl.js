'use strict';

angular.module('oroboksApp')
.factory('OROServicesUrl', function () {
  
  // Service URLs
  var getRestaurantURL = function() {
    return 'https://oroboks.herokuapp.com/restaurants/locations';
  };

  var getUsersURL = function() {
  	return 'https://oroboks.herokuapp.com/users';
  };

  var getUserWithTokenURL = function() {
    return 'https://oroboks.herokuapp.com/users/getToken'
  }

  // Service URLs api
  return {
      getRestaurantURL:getRestaurantURL,
      getUsersURL:getUsersURL,
      getUserWithTokenURL:getUserWithTokenURL
  };
});