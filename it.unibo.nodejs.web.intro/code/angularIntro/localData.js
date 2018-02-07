angular.module('localDataApp', []);	//setter statement

var localDataController = function($scope) {
	console.log("localDataController init data model");
	$scope.data = {
	locations: [{
		name: 'Burger Queen',
		address: '125 High Street, Reading, RG6 1PS',
		rating: 3,
		facilities: ['Hot drinks', 'Food', 'Premium wifi'],
		distance: '0.296456',
		_id: '1'
	},
	{
		name: 'Costy',
		address: '125 High Street, Reading, RG6 1PS',
		rating: 5,
		facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
		distance: '0.7865456',
		_id: '2'
	}]};
};


var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
var formatDistance = function () {
	return function (distance) {
	var numDistance, unit;
		if (distance && _isNumeric(distance)) {
		if (distance > 1) {
			numDistance = parseFloat(distance).toFixed(1);
			unit = 'km';
		} else {
			numDistance = parseInt(distance * 1000,10);
			unit = 'm';
		}
		return numDistance + unit;
			} else {
			return "?";
		}
	};
};

//-----------------------------------------------------------------
var localData  = function( ) {
       return [{
		name:    'Name1',
		address: 'Address1',
 		distance: '0.296456',
		_id: '1'
	},
	{
		name:    'Name2',
		address: 'Address2',
  		distance: '0.7865456',
		_id: '2'
	}];
};
var controllerWithService = function($scope, localData){
	$scope.data = { locations: localData };
};

//-----------------------------------------------------------------
 

var controllerRemoteData = function( $scope , $http ){
	console.log("controllerRemoteData coming soon");
	$http.get("http://dbapi.io/db/coll/docid")
		.success( function(mydata) {
			$scope.data =  mydata ;
		})
		.error(function (e) {
			console.log(e);
		});	
};

angular
.module('localDataApp')
.controller('localDataController',   localDataController)
.controller('controllerWithService', controllerWithService)
.controller('controllerRemoteData',  controllerRemoteData)
.service("localData", localData)
.filter("formatDistance", formatDistance);

//alert("hello.js done");