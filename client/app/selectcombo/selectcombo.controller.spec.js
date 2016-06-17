'use strict';

describe('Controller: SelectcomboCtrl', function () {

  // load the controller's module
  beforeEach(module('oroboksApp'));

  var SelectcomboCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectcomboCtrl = $controller('SelectcomboCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
