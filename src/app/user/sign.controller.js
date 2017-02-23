(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);


    /* @ngInject */
    SignController.$inject = ['$rootScope', '$state', '$scope','userFactory','loginFactory'];
    function SignController($rootScope, $state, $scope, userFactory, loginFactory){
        var vm = this;
        
        vm.create = create;
        vm.login = login;
        
        function create(user, form){
            userFactory.create(user).then(function(result){
                angular.copy({}, user);
                $rootScope.$broadcast('userCreate');
                $scope[form].$setUntouched();
                $scope[form].$setPristine();
            });
        }
        
        function login(user, form, redirect){
            userFactory.login(user).then(function(result){
                if(result.data){
                    angular.copy({}, user);
                    loginFactory.setUser(result.data);
                    if($scope[form]){ 
                        $scope[form].$setUntouched();
                        $scope[form].$setPristine();
                    }
                    $state.go(redirect);
                }
            });
        }
    }
})();