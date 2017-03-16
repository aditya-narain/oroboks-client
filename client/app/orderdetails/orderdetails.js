'use strict';

angular.module('oroboksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orderdetails', {
        url: '/orderdetails',
        templateUrl: 'app/orderdetails/orderdetails.html',
        controller: 'OrderdetailsCtrl'
      });
  });
