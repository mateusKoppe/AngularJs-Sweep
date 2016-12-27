(function () {
    'use strict';

    angular
        .module('app')
        .directive('username', username);

    username.$inject = ['userAPI', '$timeout', '$q'];

    function username(userAPI, $timeout, $q) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs, controller) {
            controller.$asyncValidators.username = function (modelValue, viewValue) {
                
                var defer = $q.defer();
                
                userAPI.checkAvailability(modelValue).then(function (result) {
                    if(result.data){
                        defer.resolve();
                    }else{
                        defer.reject();
                    }
                })
                
                return defer.promise;
            };
        }
    }
})();
