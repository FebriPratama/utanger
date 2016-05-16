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
    // map 
   function initialize() {
   	var myLatlng = new google.maps.LatLng(-7.79009,110.3618989);

   	var mapOptions = {
   		center: myLatlng,
   		zoom: 16,
   		mapTypeId: google.maps.MapTypeId.ROADMAP
   	};
   	var map = new google.maps.Map(document.getElementById("map"),
   		mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
        	content: compiled[0]
        });

        var marker = new google.maps.Marker({
        	position: myLatlng,
        	map: map,
        	title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
        	infowindow.open(map,marker);
        });

        $scope.map = map;
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
    	if(!$scope.map) {
    		return;
    	}

    	$scope.loading = $ionicLoading.show({
    		content: 'Getting current location...',
    		showBackdrop: false
    	});

    	navigator.geolocation.getCurrentPosition(function(pos) {
    		$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    		$scope.loading.hide();
    	}, function(error) {
    		alert('Unable to get location: ' + error.message);
    	});
    };

    $scope.clickTest = function() {
    	alert('Example of infowindow with ng-click')
    };
   // end
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
