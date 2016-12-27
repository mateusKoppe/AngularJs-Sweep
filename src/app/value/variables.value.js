(function () {
    'use strict';

    angular
        .module('app')
        .value('variables', {
            "urlBase": 'http://localhost/sweep/src/',
            "urlApi": 'http://localhost/sweep/API/',
        });
})();
