(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);

    SignController.$inject = ['$rootScope', '$scope','userFactory'];
    function SignController($rootScope, $scope, userFactory){
        var vm = this;        
        vm.create = create;
        vm.login = login;
        
        function create(user, form, success, error){
            var userData = angular.copy(user);
            angular.copy({}, user)
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
                    success(result.data);
                }
            });
        }
    }
})();