(function () {
    'use strict';

    angular
        .module('app')
        .config(materialTheme)

    function materialTheme($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('indigo');
    };
})();
