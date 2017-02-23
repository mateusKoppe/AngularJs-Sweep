(function(){
    'use strick';

    angular
        .module('app')
        .config(routes)
    
    routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    function routes ($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state({
                name: 'home',
                url: '/',
                controller: "homeController",
                controllerAs: "homeVm",
                templateUrl: "app/pages/home.view.html" 
            });
        $urlRouterProvider.otherwise('/');
    }
    
})();