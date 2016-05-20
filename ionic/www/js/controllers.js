utanger
.controller('AppCtrl', function($ionicSideMenuDelegate, $ionicModal,$scope,$state,User,$ionicPopup,Auth,Utang){
	// slide menu function
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	//modal add utang
	// modal 1
	 $ionicModal.fromTemplateUrl('templates/add_utang.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });
    // modal 2
     // Modal 2
    $ionicModal.fromTemplateUrl('templates/new_msg.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      // backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });
    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });

    // map 
  /*
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
	*/
    $scope.clickTest = function() {
    	alert('Example of infowindow with ng-click')
    };
   // end
	$scope.loading = { name : 'Log In', status : false};
	$scope.friends = [];
	$scope.utangs = [];
	$scope.user = Auth.getUser().user;
	
	/* monitors total item */
	$scope.$watch(function(){ return User.getFriendData();},function(val){

		$scope.friends = val;
		
	});

	$scope.submitCreateUtang = function(valid,data){

		if(valid){

			Utang.saveUtang($scope.user.user_id,data.to,data).success(function(data){
				
				if(data.status){
					
					Utang.setDataSingle(data.data);
					$scope.modal.hide();

				}

				$ionicPopup.alert({
				     title: data.status ? 'Success' : 'Warning',
				     template: data.message
				   });

			}).error(function(data){

				$scope.loading = { name : 'Log In', status : false};
				$ionicPopup.alert({
				     title: 'Warning',
				     template: 'Please check your internet connection'
				   });

			});

		}

	}

	/* monitors total item */
	$scope.$watch(function(){ return Utang.getData();},function(val){

		$scope.utangs = val;
		
	});

})
.controller('AddUtangCtrl', function($scope,$state,User,$ionicPopup,Auth,Utang){

	$scope.loading = { name : 'Log In', status : false};
	$scope.friends = [];
	$scope.user = Auth.getUser().user;
	
	/* monitors total item */
	$scope.$watch(function(){ return User.getFriendData();},function(val){

		$scope.friends = val;
		
	});

	$scope.submitCreateUtang = function(valid,data){

		if(valid){

			Utang.saveUtang($scope.user.user_id,data.to,data).success(function(data){
				
			}).error(function(data){

			});

		}

	}

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
				$state.go('member.tabs.utang');			

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
	$scope.errors = [];

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
.controller('NavCtrl', function($scope,$state,User,Auth,Utang){
	
	$scope.user = Auth.getUser().user;

	if(Auth.getUser().user){
		User.setFriendData(Auth.getUser().user.user_friends);
		Utang.setData(Auth.getUser().user.user_utangs);
	}	

	$scope.logout = function(){

		Auth.logout();
		$state.go('home.login');	
			
	}

	/* monitors total item */
	$scope.$watch(function(){ return Auth.getUserData();},function(val){

		if(val.user){
			
			User.setFriendData(val.user.user_friends);
			Utang.setData(val.user.user_utangs);

		}		
		
	});
	
})
.controller('FriendCtrl', function($scope,$state,User,Auth,$ionicPopup){

	$scope.loading = { name : 'SIGN UP', status : false};
	$scope.errors = [];
	$scope.users = [];
	$scope.friends = [];

	$scope.user = Auth.getUser().user;

	/* monitors total item */
	$scope.$watch(function(){ return User.getFriendData();},function(val){

		$scope.friends = val;
		
	});

	$scope.submitUserSearch = function(valid,data){

		if(valid){
			$scope.loading = { name : 'Loading . .', status : true};

			User.search({ email : data }).success(function(data){

				$scope.loading = { name : 'SIGN UP', status : false};

				$scope.users = data.data

			}).error(function(data){

				$scope.loading = { name : 'SIGN UP', status : false};
				$ionicPopup.alert({
				     title: 'Warning',
				     template: 'Please check your internet connection'
				   });

			});			
		}


	}

})
.controller('UtangCtrl', function(){})
.controller('ProfileCtrl', function($scope,Auth,$state,User,$timeout,$stateParams,$ionicPopup){

	$scope.profile = {};
	$scope.user = Auth.getUser().user;

	if($stateParams.id){
		User.singleUser($stateParams.id).success(function(data){

			$scope.profile = data.user;

		}).error(function(data){

			$ionicPopup.alert({
			     title: 'Warning',
			     template: 'Please check your internet connection'
			   });

		});
	}
	
	$scope.addFriend = function(data){

		$ionicPopup.confirm({

		     title: 'Confirmation',
		     template: 'Are you sure you want to add' + data.user_fullname + ' as friend ?'

		   }).then(function(res) {

		     if(res) {

				User.addFriend($scope.user.user_id,{ friend : data.user_id }).success(function(data){

					$ionicPopup.alert({
					     title: data.status ? 'Success' : 'Warning',
					     template: data.message
					   });
					
					if(data.status){

						User.setFriendDataSingle(data.data);
						$timeout(function(){ $state.go('member.tabs.follower') },500);

					} 

				}).error(function(){

					$ionicPopup.alert({
					     title: 'Warning',
					     template: 'Please check your internet connection'
					   });

				});

		     }

		   });

	}

})
.controller('ChatCtrl', function($scope,Auth,$state,User,$timeout,$stateParams,$ionicPopup){

	$scope.convs = [];

	User.getConversations(Auth.getUser().user.user_id).success(function(data){

		$scope.convs= data.aaData;

	}).error(function(data){

		$ionicPopup.alert({
		     title: 'Warning',
		     template: 'Please check your internet connection'
		   });

	});

});
