(function () {
    'use strict';
    angular
        .module('app.user')
        .service('userFactory', userFactory);

    function userFactory($http, variables, $location, loginFactory) {
        var service = {
            checkAvailability: checkAvailability,
            create: create,
            createStudant: createStudant,
            editStudants: editStudants,
            defineClassName: defineClassName,
            login: login,
            removeStudants: removeStudants,
            sweep: sweep
        }
        return service;

        function checkAvailability(username) {
            return $http.get(variables.urlApi + '/users/checkAvailability/' + username);
        };

        function create(data) {
            return $http.post(variables.urlApi + '/users', data);
        };

        function createStudant(data){
            data.action = "createStudant";
            return $http.post(variables.urlApi + '/users', data);
        }

        function editStudants(studants){
            var data = {
                action: 'editStudants',
                studants: studants
            };
            return $http.post(variables.urlApi + '/users', data);
        }

        function defineClassName(data) {
            data.action = "defineClass";
            data.id = loginFactory.getUser().user_id;
            return $http.post(variables.urlApi + '/users', data);
        }

        function login(data) {
            return $http.post(variables.urlApi + '/login', data);
        };

        function removeStudants(studants){
            var data = {
                studants: studants,
                action: "removeStudant"
            };
            return $http.post(variables.urlApi + '/users', data);
        }

        function sweep(studants) {
            var data = {};
            data.action = "sweep";
            data.studants = studants;
            return $http.post(variables.urlApi + '/users', data);
        };


    }
})();
