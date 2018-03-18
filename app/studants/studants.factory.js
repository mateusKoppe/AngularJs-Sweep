(function () {
    'use strict';

    angular
        .module('app.studants')
        .service('studantsFactory', studantsFactory);

    function studantsFactory($http, variables) {
        var service = {
            getStudantsByClass: getStudantsByClass,
            create: create,
        };
        return service;

        function create(data){
            var url = variables.urlApi + "/class/" + data.class + "/studants";
            return $http.post(url, data);
        }

        function getStudantsByClass(classData){
            var url = variables.urlApi + "/class/" + classData.class_id + "/studants";
            return $http.get(url);
        }
    }
})();
