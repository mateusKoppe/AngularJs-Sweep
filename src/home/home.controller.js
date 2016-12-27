(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','userAPI'];

    /* @ngInject */
    function homeController($scope ,userAPI){
        var vm = this;            
        
        //Variables
        vm.signin = {};
        vm.isUserAvailability = 1;
        vm.userAction = 'login';  
        
        //Functions
        vm.isAction = isAction;
        vm.setAction = setAction;
        vm.userCreate = userCreate;
        vm.userLogin = userLogin;
        
        activate();

        ////////////////

        // Init function
        function activate() {
        }
        
        //Publics
                
        function isAction(action){
            return vm.userAction === action;
        }
        
        function setAction(action){
            vm.userAction = action;
        }
        
        function userCreate(){
            userAPI.create(vm.signin).then(function(result){
                vm.signin = {};
                $scope.signinForm.$setUntouched();
                vm.userAction = 'login';
                $scope.apply();
            });
        }
        
        function userLogin(){
            userAPI.login(vm.login).then(function(result){
                vm.login = {};
                console.log(result.data);
            });
        }
    }
})();