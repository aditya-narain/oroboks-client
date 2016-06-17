'use strict'

angular.module('oroboksApp')
  .factory('OROServices', ['localStorageService', function(localStorageService) {

    // Service definition
    // Combo service
    var setCombos = function(c) {
      localStorageService.set('combos', c);
    };

    var getCombos = function() {
      var combos = localStorageService.get('combos');
      return combos;
    };

    // ORO User service
    var setOROUser = function(user) {
      var orouser = localStorageService.set('orouser', user);
    };

    var getOROUser = function() {
      var orouser = localStorageService.get('orouser');
      return orouser;
    };

    var clearAllData = function() {
      return localStorageService.clearAll();
    };

    // Service apis
    return {
      setCombos: setCombos,
      getCombos: getCombos,
      setOROUser: setOROUser,
      getOROUser: getOROUser,
      clearAllData: clearAllData
    }
}]);