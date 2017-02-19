(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$location'];

    /* @ngInject */
    function homeController($scope , $location){
        var vm = this;            
        
        //Variables
        vm.signin = {};
        vm.isUserAvailability = 1;
        vm.userAction = 'login';  
        
        //Functions
        vm.isAction = isAction;
        vm.setAction = setAction;
        vm.userCreated = userCreated;
        
        vm.test = function(){
            console.log("ok");
        }
        
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
        
        function userCreated(){
            setAction('login');
            
        }
        
    }
})();