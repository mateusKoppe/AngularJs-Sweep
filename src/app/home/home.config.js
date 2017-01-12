(function(){
    'use strick';

    angular
        .module('app')
        .config(routes)
    
    routes.$inject = ['$routeProvider'];
    function routes ($routeProvider) {
        $routeProvider
        .when('/home', {
            controller: "homeController",
            controllerAs: "homeVm",
            templateUrl: "home/home.view.html"
        })
    }
    
})();