utanger
.controller('AppCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})
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
.controller('UtangCtrl', function(){})
.controller('ChatCtrl', function(){});
