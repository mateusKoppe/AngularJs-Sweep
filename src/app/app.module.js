(function(){
    'use strick';
    
    angular.module('app', [
        'ngMaterial',
        'ngMessages',
        'ngAnimate',
        'ui.router',
        'app.user',
        'app.class'
    ])
    .value('variables', {
        "urlBase": 'http://localhost:3000',
        "urlApi": 'http://localhost/sweep/API/',
    });;
    
})();