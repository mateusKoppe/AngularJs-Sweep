(function () {
    'use strict';

    angular
        .module('app')
        .config(materialTheme)

    materialTheme.$inject = ['$mdThemingProvider'];

    function materialTheme($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('indigo');
    };
})();
