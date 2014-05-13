var myApp = angular.module('myApp', [
	'ngRoute',
	'myServices',
	'myControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/wines', {
      	  		templateUrl: 'partials/wine-list.html',
       			controller: 'WineListCtrl'
      		}).
     		when('/wines/:_id', {
       			templateUrl: 'partials/wine-detail.html',
			controller: 'WineDetailCtrl'
      		}).
      		otherwise({
       			redirectTo: '/wines'
      		});
}]);
