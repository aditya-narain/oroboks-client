'use strict'

angular.module('oroboksApp')
  .factory('OROServices', ['localStorageService', function(localStorageService) {

    // Service definition
    // Combo service
    var setCombos = function(c) {
      localStorageService.set('s_combos', c);
    };

    var getCombos = function() {
      var s_combos = localStorageService.get('s_combos');
      return s_combos;
    };

    // ORO User service
    var setOROUser = function(user) {
      localStorageService.set('s_orouser', user);
    };

    var getOROUser = function() {
      var s_orouser = localStorageService.get('s_orouser');
      return s_orouser;
    };

    // ORO Formatted Address
    var setFormattedAddr = function(faddr) {
      localStorageService.set('s_faddress', faddr);
    };

    var getFormattedAddr = function() {
      var s_faddress = localStorageService.get('s_faddress');
      return s_faddress;
    };

    // ORO Cuisine Object service
    var setCuisineObject = function(co) {
      localStorageService.set('s_cuisineobject', co);
    };

    var getCuisineObject = function() {
      var s_cuisineobject = localStorageService.get('s_cuisineobject');
      return s_cuisineobject;
    };

    // ORO set items to add to order summary
    var setItemsToAddInOrderSummary = function(itos) {
      localStorageService.set('s_itemstoadd', itos);
    };

    var getItemsToAddInOrderSummary = function() {
      var s_itemstoadd = localStorageService.get('s_itemstoadd');
      if(!s_itemstoadd) {
        var arr = [];
        return arr;
      }
      return s_itemstoadd;
    };
 
    // Remove specific item from local storage
    var removeItem = function(item) {
      localStorageService.remove(item);
    };

    // Clear all the Data from local storage
    var clearAllData = function() {
      return localStorageService.clearAll();
    };

    // Service apis
    return {
      setCombos: setCombos,
      getCombos: getCombos,
      setOROUser: setOROUser,
      getOROUser: getOROUser,
      setFormattedAddr: setFormattedAddr,
      getFormattedAddr: getFormattedAddr,
      setCuisineObject: setCuisineObject,
      getCuisineObject: getCuisineObject,
      setItemsToAddInOrderSummary: setItemsToAddInOrderSummary,
      getItemsToAddInOrderSummary: getItemsToAddInOrderSummary,
      removeItem: removeItem,
      clearAllData: clearAllData
    }
}]);