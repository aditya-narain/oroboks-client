'use strict';

angular.module('oroboksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('secretpage', {
        url: '/secretpage',
        templateUrl: 'app/secretpage/secretpage.html',
        controller: 'SecretpageCtrl'
      });
  });
