(function () {
    'use strict';

    angular
        .module('app.studants')
        .service('studantsFactory', studantsFactory);

    function studantsFactory($http, variables, classFactory) {
        var service = {
            create: create,
            editStudants: editStudants,
            getStudantsByClass: getStudantsByClass,
            removeStudants: removeStudants 
        };
        return service;

        function create(data){
            var classId = classFactory.getActualClass().class_id;
            var url = variables.urlApi + "/class/" + classId + "/studants";
            return $http.post(url, data);
        }

        function editStudants(studants){
            var classId = classFactory.getActualClass().class_id;
            var data = {studants: studants};
            var url = variables.urlApi + "/class/" + classId + "/studants";
            return $http.put(url, data);
        }

        function getStudantsByClass(classData){
            var classId = classFactory.getActualClass().class_id;
            var url = variables.urlApi + "/class/" + classId + "/studants";
            return $http.get(url);
        }

        function removeStudants(studants){
            var classId = classFactory.getActualClass().class_id;
            return studants.map(function(studant) {
                var url = variables.urlApi + "/class/" + classId + "/studants/" + studant.id;
                return $http.delete(url);
            });
        }

    }
})();
