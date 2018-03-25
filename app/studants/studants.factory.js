(function () {
    'use strict';

    angular
        .module('app.studants')
        .service('studantsFactory', studantsFactory);

    function studantsFactory($http, variables, classFactory, userFactory) {
        var service = {
            create: create,
            editStudants: editStudants,
            getStudantsByClass: getStudantsByClass,
            removeStudants: removeStudants,
            sweep: sweep
        };
        return service;

        function create(data){
            var classId = classFactory.getActualClass().class_id;
            var token = userFactory.getUser().user_token;
            var url = variables.urlApi + "/class/" + classId + "/studants?token=" + token;
            return $http.post(url, data);
        }

        function editStudants(studants){
            var classId = classFactory.getActualClass().class_id;
            var token = userFactory.getUser().user_token;
            var data = {studants: studants};
            var url = variables.urlApi + "/class/" + classId + "/studants?token=" + token;
            return $http.put(url, data);
        }

        function getStudantsByClass(){
            var classId = classFactory.getActualClass().class_id;
            var token = userFactory.getUser().user_token;
            var url = variables.urlApi + "/class/" + classId + "/studants?token=" + token;
            return $http.get(url);
        }

        function removeStudants(studants){
            var classId = classFactory.getActualClass().class_id;
            var token = userFactory.getUser().user_token;
            return studants.map(function(studant) {
                var url = variables.urlApi + "/class/" + classId + "/studants/" + studant.id;
                url += "?token=" + token;
                return $http.delete(url);
            });
        }

        function sweep(studants){
            var sweepers = angular.copy(studants);
            sweepers = sweepers.map(function(studant){
                studant.times = (+studant.times) + 1;
                return studant;
            });
            return editStudants(sweepers)
                .then(function(response){
                    return response.data;
                });
        }

    }
})();
