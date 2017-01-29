angular.module('oroDirective', [])
	.directive('ifOroUser', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope.$watch("o_user", function() {
					if (scope.o_user) {
						element.show();	
					}
					else {
						element.hide();
					}
            	});
			}
		};
	})
	.directive('ifNotOroUser', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				scope.$watch("o_user", function() {
					if (scope.o_user) {
						element.hide();	
					}
					else {
						element.show();
					}
            	});
			}
		};
	})
	.directive('oroListElement', function() {
		return {
			restrict: 'A',
			scope: {
				orolistelement: '=',
				orolistelementavailabledate: '='
			},
			templateUrl: "app/templates/orolisttemplate.html",
			controller: function($scope) {
				if ($scope.orolistelement) {
					$scope.orolistelement.availabledate = $scope.orolistelementavailabledate;
					console.log("Orolist: "+ $scope.orolistelement);
				}

				if ($scope.orolistelementavailabledate) {
					console.log("Orolist available date: "+ $scope.orolistelementavailabledate);
				}

				$scope.addToOrderSummary = function() {
					$scope.$emit('AddingComboToOrderSummary', $scope.orolistelement);
				};

				$scope.openComboModal = function() {
					$scope.$emit('OpenComboModal', $scope.orolistelement);
				};
			}
		};
	})
	.directive('oroOrderSummaryElement', function() {
		return {
			restrict: 'A',
			scope: {
				oroordersummaryelement: '='
			},
			templateUrl: "app/templates/ordersummary.html",
			controller: function($scope) {
				if ($scope.oroordersummaryelement) {
					console.log("Orolist: "+ $scope.oroordersummaryelement);
				}

				$scope.incrementOrderSummaryCount = function() {
					$scope.$emit('AddingComboToOrderSummary', $scope.oroordersummaryelement);
				};

				$scope.decrementOrderSummaryCount = function() {
					$scope.$emit('DecrementingOrderSummaryCount', $scope.oroordersummaryelement);
				};
			}
		};
	});





