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

            var local = $localStorage.getObject('ut.user').user ? true : false;

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

      var friendData = [];

      return {
        setFriendData : function(data){
          friendData = data;
        },
        setFriendDataSingle : function(data){
          friendData.unshift(data);
        },
        getFriendData : function(){
          return friendData;
        },
        removeFriendData : function(data){
          for(var i; i < friendData.length; i++){
            
            if(friendData[i].id == data.id) friendData.splice(i,1);

          }
        },
        updateFriendData : function(data){
          for(var i; i < friendData.length; i++){
            
            if(friendData[i].id == data.id) friendData[i] = data;

          }
        },
        search : function(data) {

              return $http.get(ApiEndpoint.api+'/data/user',{ params : data });
        
        },
        singleUser : function(token) {

              return $http.get(ApiEndpoint.api+'/user/'+token);
        
        },
        getFriend : function(token) {

              return $http.get(ApiEndpoint.api+'/friend/'+token);
        
        },

        getConversations : function(token) {

              return $http.get(ApiEndpoint.api+'/message/'+token);
        
        },

        addFriend : function(token,data) {

              return $http.post(ApiEndpoint.api+'/friend/'+token+'/add',data);
        
        },
        login : function(data) {

              return $http.post(ApiEndpoint.pub+'/login',data);
        
        },
        register : function(data) {

              return $http.post(ApiEndpoint.pub+'/register',data);
        
        },
        notifications : function(token) {

              return $http.get(ApiEndpoint.api+'/user/'+token+'/notif');
        
        },
        activate : function(data) {

              return $http.post(ApiEndpoint.pub+'/validation',data);
        
        }
      }

  }).factory('Utang', function($http,ApiEndpoint) {

      var utangData = [];

      return {
        setData : function(data){
          utangData = data;
        },
        setDataSingle : function(data){
          utangData.unshift(data);
        },
        getData : function(){
          return utangData;
        },
        removeData : function(data){
          for(var i; i < utangData.length; i++){
            
            if(utangData[i].id == data.id) utangData.splice(i,1);

          }
        },
        updateData : function(data){
          for(var i; i < utangData.length; i++){
            
            if(utangData[i].id == data.id) utangData[i] = data;

          }
        },
        setDone : function(){
            
            return $http.post(ApiEndpoint.pub+'/validation',data);

        },
        getUtang : function(from) {

              return $http.get(ApiEndpoint.api+'/utang/'+from);
        
        },
        saveUtang : function(from,to,data) {

              return $http.post(ApiEndpoint.pub+'/utang/'+from+'/store/'+to,data);
        
        }
      }

  });