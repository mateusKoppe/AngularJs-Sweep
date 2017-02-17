(function(){
    'use strick';

    angular
        .module('app')
        .config(routes)
    
    routes.$inject = ['$stateProvider'];
    function routes ($stateProvider) {
        $stateProvider
            .state({
                name: 'home',
                url: '',
                controller: "homeController",
                controllerAs: "homeVm",
                templateUrl: "app/home/home.view.html" 
            });
    }
    
})();