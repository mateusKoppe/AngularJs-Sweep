(function () {
    'use strict';

    angular
        .module('app')
        .value('variables', {
            "urlBase": 'http://localhost:3000',
            "urlApi": 'http://localhost/sweep/API/',
        });
})();
