(function () {
    'use strict';

    angular
        .module('app.studants')
        .service('studantsFactory', studantsFactory);

    function studantsFactory($http, variables, classFactory) {
        var service = {
            create: create,
            editStudants: editStudants,
            getStudantsByClass: getStudantsByClass
        };
        return service;

        function create(data){
            var url = variables.urlApi + "/class/" + classFactory.getActualClass().class_id + "/studants";
            return $http.post(url, data);
        }

        function editStudants(studants){
            var data = {studants: studants};
            var url = variables.urlApi + "/class/" + classFactory.getActualClass().class_id + "/studants";
            return $http.put(url, data);
        }

        function getStudantsByClass(classData){
            var url = variables.urlApi + "/class/" + classData.class_id + "/studants";
            return $http.get(url);
        }
    }
})();
