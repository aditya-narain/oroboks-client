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

  var getOrdersURL = function() {
    return 'https://oroboks.herokuapp.com/users/currentuser/orders'
  }

  // Service URLs api
  return {
      getCombosDataURL:getCombosDataURL,
      getUsersURL:getUsersURL,
      getUserWithTokenURL:getUserWithTokenURL,
      getOrdersURL:getOrdersURL
  };
});