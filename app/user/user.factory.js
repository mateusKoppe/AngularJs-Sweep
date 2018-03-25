(function () {
    'use strict';
    
    angular
        .module('app.user')
        .service('userFactory', userFactory);

    function userFactory($http, $q, variables, $location) {
        const vm = this;
        vm.user = false;

        function checkAvailability(username) {
            return $http.get(variables.urlApi + '/users/checkAvailability/' + username);
        }

        function create(data) {
            return $http.post(variables.urlApi + '/users', data);
        }

        function login(data) {
            return $http.post(variables.urlApi + '/login', data)
                .then(response => {
                    const user = response.data;
                    localStorage.setItem('auth', user.user_token)
                    vm.user = user;
                    return user;
                });
        }

        function loadUser() {
            const deferred = $q.defer();
            if(vm.user) {
                deferred.resolve(vm.user)
                return deferred.promise;
            }
            const token = localStorage.getItem('auth');
            if(token) {
                return $http.get(variables.urlApi + '/login?token=' + token)
                    .then(response => {
                        vm.user = response.data;
                        return vm.user
                    })
            }
            deferred.reject()
            return deferred.promise;
        }

        function getUser(){
            return vm.user;
        }

        function cleanUser(){
            vm.user = false;
        }

        return {
            getUser,
            cleanUser,
            login,
            checkAvailability,
            create,
            loadUser
        };

    }
})();
