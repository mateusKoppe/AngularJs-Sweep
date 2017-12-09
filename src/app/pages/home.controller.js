(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($state, loginFactory, userFactory){
        var vm = this;

        //Variables
        vm.signin = {};
        vm.isUserAvailability = 1;
        vm.userAction = 'login';

        //Functions
        vm.isAction = isAction;
        vm.setAction = setAction;
        vm.userCreated = userCreated;
        vm.userLogged = userLogged;

        //Publics
        function isAction(action){
            return vm.userAction === action;
        }

        function setAction(action){
            vm.userAction = action;
        }

        function userCreated(user){
            userFactory.login(user).then(function(result){
                userLogged(result.data);
            });
        }

        function userLogged(){
            $state.go("class");
        }

    }
})();
