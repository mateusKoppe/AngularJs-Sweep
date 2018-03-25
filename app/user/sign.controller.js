(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);

    function SignController($rootScope, $scope, userFactory){
        var vm = this;
        vm.create = create;
        vm.login = login;
        vm.logout = logout;

        function create(user, form, success, error){
            var userData = angular.copy(user);
            angular.copy({}, user);
            userFactory.create(userData).then(function(result){
                if($scope[form]){
                    $scope[form].$setUntouched();
                    $scope[form].$setPristine();
                }
                success(result.data);
            });
        }

        function login(user, form, success, error){
            var userData = angular.copy(user);
            angular.copy({}, user)
            userFactory.login(userData)
                .then(user => {
                    if($scope[form]){
                        $scope[form].$setUntouched();
                        $scope[form].$setPristine();
                    }
                    success(user);
                });
        }

        function logout(callback){
            userFactory.cleanUser();
            callback();
        }
    }
})();
