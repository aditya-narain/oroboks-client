'use strict';

angular.module('oroboksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('selectcombo', {
        url: '/selectcombo',
        templateUrl: 'app/selectcombo/selectcombo.html',
        controller: 'SelectcomboCtrl'
      });
  });
