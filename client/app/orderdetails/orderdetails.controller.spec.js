'use strict';

describe('Controller: OrderdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('oroboksApp'));

  var OrderdetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderdetailsCtrl = $controller('OrderdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
