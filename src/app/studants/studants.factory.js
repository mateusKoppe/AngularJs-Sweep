(function () {
    'use strict';

    angular
        .module('app.studants')
        .service('studantsFactory', studantsFactory);

    function studantsFactory($http, variables) {
        var service = {
            getStudantsByClass: getStudantsByClass
        };
        return service;

        function getStudantsByClass(classData){
            
        }
    }
})();
