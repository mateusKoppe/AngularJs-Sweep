(function () {
    'use strict';
    angular
        .module('app')
        .factory('userAPI', userAPI);

    userAPI.$inject = ['$http','variables'];

    var fileApi = "user.php";
    
    function userAPI($http, variables){
        var exports = {
            checkAvailability: checkAvailability,
            create: create,
            login: login
        };
        
        return exports;

        ////////////////

        function checkAvailability(username){
            var data = {};
            data.action = "checkAvailability";
            data.username = username || "";
            return $http.post(variables.urlApi + fileApi, data);
        }
        
        function create(data) {
            data.action = "create";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function login(data){
            data.action = "login";
            return $http.post(variables.urlApi + fileApi, data);
        }
    }
})();