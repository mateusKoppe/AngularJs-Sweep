(function () {
    'use strict';

    angular
        .module('app.class')
        .service('classFactory', classFactory);

    function classFactory($http, variables) {
        var _class = false;
        var service = {
            getClassByUser: getClassByUser,
            updateClass: updateClass,
            setActualClass: setActualClass,
            getActualClass: getActualClass,
        };
        return service;

        function getClassByUser(user) {
            console.log(user)
            return $http.get(variables.urlApi + '/classByUser/' + user.user_id)
                .then(function(response) {
                    setActualClass(response.data);
                    return response;
                });
        }

        function updateClass(update) {
            return $http.put(variables.urlApi + '/class/' + update.class_id, update)
                .then(function(response) {
                    setActualClass(response.data);
                    return response;
                });
        }

        function setActualClass(newClass){
            _class = newClass;
        }

        function getActualClass(){
            return _class;
        }
    }
})();
