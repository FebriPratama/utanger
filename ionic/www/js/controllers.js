utanger
.controller('AppCtrl', function(){})
.controller('HomeCtrl', function(){})
.controller('LoginCtrl', function($scope,$state,User){

	$scope.loading = { name : 'Log In', status : false};
	$scope.user = {};

	$scope.login = function(){

		console.log($scope.user);

		User.login($scope.user).success(function(data){
			
			console.log(data);

		}).error(function(data){
			
			console.log(data);

		});

	}

})
.controller('RegCtrl', function(){

})
.controller('ChatCtrl', function(){})
