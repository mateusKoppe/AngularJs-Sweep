(function(){
    'use strick';

    angular
        .module('app')
        .config(routes)

    function routes ($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state({
                name: 'home',
                url: '/',
                controller: "homeController",
                controllerAs: "homeVm",
                templateUrl: "app/pages/home.html"
            });
        $urlRouterProvider.otherwise('/');
    }

})();
