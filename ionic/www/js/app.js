// Ionic Starter App

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
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegCtrl'
  })
  $urlRouterProvider.otherwise('/home');

})


.config(function($httpProvider){
  
  $httpProvider.interceptors.push('httpRequestInterceptor');

})

.constant('ApiEndpoint', {

    url: 'http://localhost:8000/api',
    main: 'http://localhost:8000/',
    local: 'http://localhost:8100/pub'

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