utanger.factory('Auth', function($q, $localStorage,$http,ApiEndpoint) {

       var user = $localStorage.getObject('ut.user');
       var config = $localStorage.getObject('ut.config');
       var userData = [];

       var setUser = function (user) {
          userData = user;
          $localStorage.setObject('ut.user', user);
       }

       var setToken = function (token) {
          $localStorage.setObject('ut.token', token);
       }

       return {
          setUser: setUser,
          setToken: setToken,
          isLoggedIn: function () {

            var deferred = $q.defer();
            var promise = deferred.promise;

            var local = $localStorage.getObject('ut.user') ? true : false;

            if(local){

              deferred.resolve(true);

            }else{

              deferred.reject(false);

            }

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return promise;
          
          },
          getUserData : function(){
            
            return userData;

          },
          getUser: function () {
             return $localStorage.getObject('ut.user');
          },
          getToken: function () {
             return $localStorage.getObject('ut.token');
          },
          getConfig: function () {
             return $localStorage.getObject('ut.config');
          },
          removeBrand: function () {
             window.localStorage.removeItem('ut.brand');
          },
          logout: function () {
            
             window.localStorage.removeItem('ut.user');  
             window.localStorage.removeItem('ut.token');   

             user = null;
          }
       }
}).factory('$localStorage', ['$window', function ($window) {

      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      }

}]).factory('User', function($http,ApiEndpoint) {

      return {

        login : function(data) {

              return $http.post(ApiEndpoint.local+'/login',data);
        
        }

      }

  });