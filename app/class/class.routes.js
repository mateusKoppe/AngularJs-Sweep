(function(){
    'use strict';

    angular
        .module('app.class')
        .config(routes)

        function routes($stateProvider){
            $stateProvider
                .state('class', {
                    url: '/turma',
                    templateUrl: 'app/class/class.html',
                    controller: 'ClassController',
                    controllerAs: 'vm',
                    resolve: {
                        userRoute: function($state, loginFactory, $q){
                            if(!loginFactory.getUser()) $state.go('home');
                            return loginFactory.getUser();
                        },
                        classRoute: function($state, classFactory, loginFactory){
                            if(classFactory.getActualClass()){
                                return classFactory.getActualClass();
                            }
                            return classFactory.getClassByUser(loginFactory.getUser())
                                .then(response => {
                                    if(!response.data.class_name){
                                        $state.go('firstTime');
                                    }
                                    return response.data;
                                });
                        }
                    }
                })
                .state('firstTime', {
                    url: '/turma/primeiravisita',
                    templateUrl: 'app/class/first-time.html',
                    controller: 'FirstTimeController',
                    controllerAs: 'vm',
                    resolve: {
                        userRoute: function($state, loginFactory, $q, $timeout){
                            if(!loginFactory.getUser()) {
                                $timeout(function(){
                                    $state.go('home');
                                });
                            } else {
                                return loginFactory.getUser();
                            }
                        }
                    }
                })
        }

})();
