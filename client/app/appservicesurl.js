'use strict';

angular.module('oroboksApp')
.factory('OROServicesUrl', function () {
  
  // Service URLs
  var getCombosDataURL = function() {
    return 'https://oroboks.herokuapp.com/combos/locations';
  };

  var getUsersURL = function() {
  	return 'https://oroboks.herokuapp.com/users';
  };

  var getUserWithTokenURL = function() {
    return 'https://oroboks.herokuapp.com/users/getToken'
  }

  // Service URLs api
  return {
      getCombosDataURL:getCombosDataURL,
      getUsersURL:getUsersURL,
      getUserWithTokenURL:getUserWithTokenURL
  };
});