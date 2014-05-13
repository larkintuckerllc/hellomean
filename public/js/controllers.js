var myControllers = angular.module('myControllers', []);

myControllers.controller('WineListCtrl', ['$scope', 'Wine', function ($scope, Wine) {
	$scope.wines = Wine.query();
	$scope.addWine = function() {
		var newWine = new Wine({name: $scope.wineName});
		newWine.$save({},
			function() {
				// SUCCESS
				$scope.wines.push(newWine);
			},
			function() {
				// ERROR
				// TODO Generate some network error message;
			}
		);
		$scope.wineName = '';
	};
	$scope.deleteWine = function(index) {
		Wine.delete({_id: $scope.wines[index]._id}, 
			function() {
				// SUCCESS
				$scope.wines.splice(index,1);
			},
			function() {
				// ERROR
				// TODO Generate some network error message;
			}
		);
	};
}]);

myControllers.controller('WineDetailCtrl', ['$scope', '$routeParams', 'Wine', function($scope, $routeParams, Wine) {
	$scope.wine = Wine.get({_id: $routeParams._id}, 
		function() {
			// SUCCESS
		},
		function() {
			// ERROR
			// TODO Generate some network error message;
		}
	);
	$scope.updateWine = function() {
		$scope.wine.$update({}, 
			function() {
				// SUCCESS
			},
			function() {
				// ERROR
				// TODO Generate some network error message;
			}
		);
	};
}]);
