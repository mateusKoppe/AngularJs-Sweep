(function () {
    'use strict';

    angular
        .module('app.user')
        .directive('userSingup', userSingup);

    userSingup.$inject = [];

    /* @ngInject */
    function userSingup() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                userSingup: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {      
            scope.$on('userCreate', function(){
                scope.userSingup();
            });
        }
    }

})();