(function(){
    'use strict';
    
    angular
        .module('app.user')
        .factory('loginFactory', loginFactory);
    
    loginFactory.$inject = [];
    function loginFactory(){
        var user = false;
        
        var service = {
            getUser: getUser,
            setUser: setUser,
            cleanUser: cleanUser
        }
        return service;
        
        function getUser(){
            return user;
        }
        
        function setUser(newUser){
            user = newUser;
        }
        
        function cleanUser(){
            setUser(false);
        }

    }
})();
