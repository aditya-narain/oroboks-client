'use strict';

angular.module('oroboksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verify', {
        url: '/verify?sptoken',
        templateUrl: 'app/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  });
