(function () {
    'use strict';
    angular
        .module('app.user')
        .service('userFactory', userFactory);

    userFactory.$inject = ['$http', 'variables', '$location', 'loginFactory'];

    function userFactory($http, variables, $location, loginFactory) {
        var fileApi = "user.php";

        var service = {
            checkAvailability: checkAvailability,
            create: create,
            createStudant: createStudant,
            defineClassName: defineClassName,
            login: login,
            removeStudants: removeStudants,
            sweep: sweep
        }
        return service;

        function checkAvailability(username) {
            var data = {};
            data.action = "checkAvailability";
            data.username = username || "";
            return $http.post(variables.urlApi + fileApi, data);
        };

        function create(data) {
            data.action = "create";
            return $http.post(variables.urlApi + fileApi, data);
        };

        function createStudant(data){
            data.action = "createStudant";
            return $http.post(variables.urlApi + fileApi, data);
        }

        function defineClassName(data) {
            data.action = "defineClass";
            data.id = loginFactory.getUser().user_id;
            return $http.post(variables.urlApi + fileApi, data);
        }

        function login(data) {
            data.action = "login";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function removeStudants(studants){
            var data = {
                studants: studants,
                action: "removeStudant"
            };
            console.log(data);
            return $http.post(variables.urlApi + fileApi, data);
        }

        function sweep(studants) {
            var data = {};
            data.action = "sweep";
            data.studants = studants;
            return $http.post(variables.urlApi + fileApi, data);
        };


    }
})();
