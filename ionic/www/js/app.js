// Ionic Starter App

/* change it before build */
var api = 'http://localhost:8100/api';
var pub = 'http://localhost:8100/pub';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var utanger = angular.module('starter', ['ionic', 'ngCookies','angularMoment'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/home',
    abstract: true,
    templateUrl: 'templates/home.html',
    onEnter : function(Auth,$state){
      
      Auth.isLoggedIn().success(function(data){

        $state.go('member.tabs.utang');

      });

    }
  })
  .state('home.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('home.activate', {
    url: '/activate',
    templateUrl: 'templates/activate.html',
    controller: 'ActivateCtrl'
  })
  .state('home.register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegCtrl'
  })
  .state('member', {
    url: '/member',
    abstract: true,
    templateUrl: 'templates/member.html',
    onEnter : function(Auth,$state){
      
      Auth.isLoggedIn().error(function(){
        
        $state.go('home.login');

      });

    }
  })
  .state('member.chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'ChatCtrl'
  })
  .state('member.tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('member.tabs.utang', {
    url: '/utang',
    views: {
      'utang-tab': {
        templateUrl: 'templates/utang.html',
        controller: 'UtangCtrl'
      }
    }
  })
  .state('member.tabs.chat_list', {
    url: '/chat_list',
    views: {
      'chat_list-tab': {
        templateUrl: 'templates/chat_list.html',
      }
    }
  })
  .state('member.profile', {
    url: '/profile/:id',
    templateUrl: 'templates/profile.html',
    controller : 'ProfileCtrl',
    onEnter : function($stateParams,$state){
      
      if(!$stateParams.id) $state.go('member.tabs.follower');

    }
  })
  .state('member.tabs.notif', {
    url: '/notif',
    views: {
      'notif-tab': {
        templateUrl: 'templates/notif.html',
      }
    }
  })
  .state('member.tabs.follower', {
    url: '/follower',
    views: {
      'follower-tab': {
        controller: 'FriendCtrl',
        templateUrl: 'templates/follower.html'
      }
    }
  })

  $urlRouterProvider.otherwise('/home/login');

})


.config(function($httpProvider){
  
  $httpProvider.interceptors.push('httpRequestInterceptor');

})

.constant('ApiEndpoint', {

    api: api,
    pub: pub

})

.factory('httpRequestInterceptor', function ($q,$localStorage) {

      function updateQueryStringParameter(uri, key, value) {

        if((uri.indexOf('/api/') > -1)){

          var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
          var separator = uri.indexOf('?') !== -1 ? "&" : "?";
          if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
          }
          else {
            return uri + separator + key + "=" + value;
          }

        }

        return uri;
      }

      return {
        request: function (config) {

          config.headers['Authorization'] = $localStorage.getObject('ut.token') ? $localStorage.getObject('ut.token')  : '';

          config.url = updateQueryStringParameter(config.url,'_key',$localStorage.getObject('ut.token') ? $localStorage.getObject('ut.token')  : '');

          return config || $q.when(config);
          
        }
      };

  }); 