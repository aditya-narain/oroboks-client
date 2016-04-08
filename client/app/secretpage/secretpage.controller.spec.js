'use strict';

describe('Controller: SecretpageCtrl', function () {

  // load the controller's module
  beforeEach(module('oroboksApp'));

  var SecretpageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SecretpageCtrl = $controller('SecretpageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
