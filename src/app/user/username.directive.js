(function () {
    'use strict';

    angular
        .module('app')
        .directive('username', username);

    username.$inject = ['userService', '$timeout', '$q'];

    function username(userService, $timeout, $q) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs, controller) {
            controller.$asyncValidators.username = function (modelValue, viewValue) {
                
                var defer = $q.defer();
                
                userService.checkAvailability(modelValue).then(function (result) {
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
