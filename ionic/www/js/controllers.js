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
.controller('LoginCtrl', function($scope,$state,User,$ionicPopup,Auth){

	$scope.loading = { name : 'Log In', status : false};

	$scope.submitLogin = function(data){

		$scope.loading = { name : 'Loading . .', status : true};

		User.login(data).success(function(data){

			$scope.loading = { name : 'Log In', status : false};

			$ionicPopup.alert({
			     title: data.status ? 'Success' : 'Warning',
			     template: data.message
			   });

			if(data.status){

				Auth.setUser(data.data);
				Auth.setToken(data.token);
				if(data.status) $state.go('member.tabs.utang');

			}			

		}).error(function(data){

			$scope.loading = { name : 'Log In', status : false};
			$ionicPopup.alert({
			     title: 'Warning',
			     template: 'Please check your internet connection'
			   });


		});

	}

})
.controller('ActivateCtrl', function($scope,$state,User,$ionicPopup){

	$scope.loading = { name : 'Submit', status : false};

	$scope.submitActivate = function(data){

		$scope.loading = { name : 'Loading . .', status : true};

		User.activate(data).success(function(data){

			$scope.loading = { name : 'Submit', status : false};

			$ionicPopup.alert({
			     title: data.status ? 'Success' : 'Warning',
			     template: data.message
			   });

			if(data.status) $state.go('home.login');

		}).error(function(data){

			$scope.loading = { name : 'Submit', status : false};
			$ionicPopup.alert({
			     title: 'Warning',
			     template: 'Please check your internet connection'
			   });

		});

	}

})
.controller('RegCtrl', function($scope,$state,User,$ionicPopup){

	$scope.loading = { name : 'SIGN UP', status : false};
	$scope.erros = [];

	$scope.submitRegister = function(data){

		$scope.loading = { name : 'Loading . .', status : true};

		User.register(data).success(function(data){

			$scope.loading = { name : 'SIGN UP', status : false};

			$ionicPopup.alert({
			     title: data.status ? 'Success' : 'Warning',
			     template: data.message
			   });

			if(data.errors) $scope.errors = data.errors;
			if(data.status) $state.go('home.activate');

		}).error(function(data){

			$scope.loading = { name : 'SIGN UP', status : false};
			$ionicPopup.alert({
			     title: 'Warning',
			     template: 'Please check your internet connection'
			   });

		});

	}

})
.controller('NavCtrl', function($scope,$state,User,Auth){
	
	$scope.user = Auth.getUser().user;

	$scope.logout = function(){

		Auth.logout();
		$state.go('home.login');	
			
	}


})
.controller('UtangCtrl', function(){})
.controller('ProfileCtrl', function(){})
.controller('ChatCtrl', function(){});
