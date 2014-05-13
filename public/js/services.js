var myServices = angular.module('myServices', ['ngResource']);

myServices.factory('Wine', ['$resource', function($resource){
	return $resource('wines/:_id',{},{update: {method: 'PUT', params: {_id:'@_id'}}});
}]);
