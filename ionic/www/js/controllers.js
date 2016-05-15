utanger
.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal){
	// slide menu function
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	//modal add utang
	$ionicModal.fromTemplateUrl('templates/add_utang.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	
	$scope.openModal = function() {
		$scope.modal.show();
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
   	$scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
  });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
  });
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
.controller('ProfileCtrl', function(){})
.controller('ChatCtrl', function(){});
