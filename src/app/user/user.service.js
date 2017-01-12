(function () {
    'use strict';
    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http','variables'];

    function userService($http, variables){
        this.checkAvailability = checkAvailability;
        this.create = create;
        this.login = login;

        var fileApi = "user.php";
        
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