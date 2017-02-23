(function () {
    'use strict';
    angular
        .module('app.user')
        .service('userFactory', userFactory);

    userFactory.$inject = ['$http','variables','$location', 'loginFactory'];

    function userFactory($http, variables, $location, loginFactory){
        var fileApi = "user.php";
        
        var service = {
            checkAvailability: checkAvailability,
            create: create,
            defineClassName: defineClassName, 
            login: login
        }
        return service;
        
        function checkAvailability(username){
            var data = {};
            data.action = "checkAvailability";
            data.username = username || "";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function create(data) {
            data.action = "create";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function defineClassName(data){
            data.action = "defineClass";
            data.id = loginFactory.getUser().user_id;
            console.log(data);
            return $http.post(variables.urlApi + fileApi, data);
        }
        
        function login(data){
            data.action = "login";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
    }
})();