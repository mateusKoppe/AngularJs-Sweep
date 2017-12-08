(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);

    SignController.$inject = ['$rootScope', '$scope','userFactory', 'loginFactory'];
    function SignController($rootScope, $scope, userFactory, loginFactory){
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
                success(userData);
            });
        }

        function login(user, form, success, error){
            var userData = angular.copy(user);
            angular.copy({}, user)
            userFactory.login(userData).then(function(result){
                if(result.data){
                    if($scope[form]){
                        $scope[form].$setUntouched();
                        $scope[form].$setPristine();
                    }
                    loginFactory.setUser(result.data);
                    success(result.data);
                }
            });
        }

        function logout(callback){
            loginFactory.cleanUser();
            callback();
        }
    }
})();
