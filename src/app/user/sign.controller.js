(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);

    SignController.$inject = ['$scope','$rootScope','userService'];

    /* @ngInject */
    function SignController($scope, $rootScope, userService){
        var vm = this;
        
        vm.create = create;
        vm.userLogin = userLogin;
        
        function create(data, form){
            var userData = data;
            userService.create(userData).then(function(result){
                angular.copy({}, data);
                $rootScope.$broadcast('userCreate');
                $scope[form].$setUntouched();
                $scope[form].$setPristine();
            });
        }
        
        function userLogin(){
            userService.login(vm.login).then(function(result){
                vm.login = {};
                if(result.data){
                    console.log(result.data);
                    console.log("testafter");
                    $location.path('/turma');
                }
            });
        }
    }
})();