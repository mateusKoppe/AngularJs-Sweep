(function(){
    'use strict';

    angular
        .module('app.class')
        .config(routes)

        routes.$inject = ['$stateProvider'];
        function routes($stateProvider){
            $stateProvider
                .state('class', {
                    url: '/turma',
                    templateUrl: 'app/class/class.html',
                    controller: 'ClassController',
                    controllerAs: 'vm',
                    onEnter: ['$state', 'loginFactory',function($state, loginFactory){
                        if(loginFactory.getUser() == {}) $state.go("home");
                        if(!loginFactory.getUser().user_id) $state.go("home");
                        if(!loginFactory.getUser().user_class) $state.go("firstTime");
                    }]
                })
                .state('firstTime', {
                    url: '/turma/primeiravisita',
                    templateUrl: 'app/class/first-time.html',
                    controller: 'FirstTimeController',
                    controllerAs: 'vm',
                    onEnter: ['$state', 'loginFactory',function($state, loginFactory){
                        if(loginFactory.getUser() == {}) $state.go("home");
                        if(!loginFactory.getUser().user_id) $state.go("home");
                        if(loginFactory.getUser().user_class) $state.go("class");
                    }]
                })
        }

})();
