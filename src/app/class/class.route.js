(function(){
    'use strict';
    
    angular
        .module('app.class')
        .config(routes)
    
        routes.$inject = ['$stateProvider'];
        function routes($stateProvider){
            $stateProvider
                .state('class', {
                    url: '/class',
                    templateUrl: 'app/class/list.template.html',
                })
        }
    
})();