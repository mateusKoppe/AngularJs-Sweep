(function () {
    'use strict';

    angular
        .module('app')
        .directive('passwordCheck', passwordCheck);

    function passwordCheck() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
            scope: {
                passwordCheck: "=passwordCheck"
            },
        };
        return directive;

        function link(scope, element, attrs, controller) {
            controller.$validators.passwordCheck = function (modelValue, viewValue) {
                return scope.passwordCheck === modelValue;
            }
        }
    }
})();
