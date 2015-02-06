var morg = angular.module('morg', []);

morg.factory('morgAPI', function ($http, $timeout, $rootScope) {
    var _getNotes = function()  {
	return $http({ url: "/getnotes", method: "GET" });
    };
    
    return {
	getNotes: _getNotes
    };
});

var noteController = function ($scope, $interval, morgAPI) {
    $scope.notes = [];
    
    morgAPI.getNotes().success(function (data, status, headers, config) {
	$scope.notes = data;
    }).error(function (data, status, headers, config) {
	alert(data);
    });
    
    $interval(function () {
	morgAPI.getNotes().success(function (data, status, headers, config) {
	    $scope.notes = data;
	}).error(function (data, status, headers, config) {
	    alert(data);
	});
    }, 3000);
};

morg.controller("noteController", noteController);
