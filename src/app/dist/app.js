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
(function(){
    'use strict';
    
    angular
        .module('app.class', [
            'ui.router' 
        ])
})();
(function(){
    'use strict';
    
    angular
        .module('app.user', [
            'ui.router'
        ])
})();
(function(){
    'use strict';
    
    angular
        .module('app.class')
        .controller('ClassController', ClassController);
    
        ClassController.$inject = ['loginFactory'];
        function ClassController(loginFactory){
            var vm = this;
            vm.test = "test";
            vm.className = loginFactory.getUser().user_class;
            
        }
})();
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
                    templateUrl: 'app/class/list.html',
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
(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('FirstTimeController', FirstTimeController);

    FirstTimeController.$inject = ['userFactory', 'loginFactory', '$state'];

    function FirstTimeController(userFactory, loginFactory, $state) {
        var vm = this;
        vm.setClass = setClass;

        function setClass(className) {
            var data = {
                className: className
            }
            userFactory.defineClassName(data);
            loginFactory.getUser().user_class = className;
            $state.go('class');
        }
    }
})();

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
                templateUrl: "app/pages/home.html" 
            });
        $urlRouterProvider.otherwise('/');
    }
    
})();
(function () {
    'use strict';

    angular
        .module('app')
        .config(materialTheme)

    materialTheme.$inject = ['$mdThemingProvider'];

    function materialTheme($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('indigo');
    };
})();

(function () {
    'use strict';

    angular
        .module('app')
        .directive('passwordCheck', passwordCheck);

    passwordCheck.$inject = [];

    /* @ngInject */
    function passwordCheck() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
            scope: {
                passwordCheck: "=passwordCheck"
            },
        };
        return directive;

        function link(scope, element, attrs, controller) {
            controller.$validators.passwordCheck = function (modelValue, viewValue) {
                return scope.passwordCheck === modelValue;
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$location'];

    function homeController($scope , $location){
        var vm = this;            
        
        //Variables
        vm.signin = {};
        vm.isUserAvailability = 1;
        vm.userAction = 'login';  
        
        //Functions
        vm.isAction = isAction;
        vm.setAction = setAction;
        vm.userCreated = userCreated;
        
        //Publics
        function isAction(action){
            return vm.userAction === action;
        }
        
        function setAction(action){
            vm.userAction = action;
        }
        
        function userCreated(){
            setAction('login');
        }
        
    }
})();
(function(){
    'use strict';
    
    angular
        .module('app.user')
        .factory('loginFactory', loginFactory);
    
    loginFactory.$inject = [];
    function loginFactory(){
        var user = false;
        
        var service = {
            getUser: getUser,
            setUser: setUser
        }
        return service;
        
        function getUser(){
            return user;
        }
        
        function setUser(newUser){
            user = newUser;
        }
        
    }
})();
(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);


    /* @ngInject */
    SignController.$inject = ['$rootScope', '$state', '$scope','userFactory','loginFactory'];
    function SignController($rootScope, $state, $scope, userFactory, loginFactory){
        var vm = this;
        
        vm.create = create;
        vm.login = login;
        
        function create(user, form){
            userFactory.create(user).then(function(result){
                angular.copy({}, user);
                $rootScope.$broadcast('userCreate');
                $scope[form].$setUntouched();
                $scope[form].$setPristine();
            });
        }
        
        function login(user, form, redirect){
            userFactory.login(user).then(function(result){
                if(result.data){
                    angular.copy({}, user);
                    loginFactory.setUser(result.data);
                    if($scope[form]){ 
                        $scope[form].$setUntouched();
                        $scope[form].$setPristine();
                    }
                    $state.go(redirect);
                }
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.user')
        .directive('userSingup', userSingup);

    userSingup.$inject = [];

    /* @ngInject */
    function userSingup() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                userSingup: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {      
            scope.$on('userCreate', function(){
                scope.userSingup();
            });
        }
    }

})();
(function () {
    'use strict';
    angular
        .module('app.user')
        .service('userFactory', userFactory);

    userFactory.$inject = ['$http','variables','$location', 'loginFactory'];

    function userFactory($http, variables, $location, loginFactory){
        var fileApi = "user.php";
        
        var service = {
            checkAvailability: checkAvailability,
            create: create,
            defineClassName: defineClassName, 
            login: login
        }
        return service;
        
        function checkAvailability(username){
            var data = {};
            data.action = "checkAvailability";
            data.username = username || "";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function create(data) {
            data.action = "create";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function defineClassName(data){
            data.action = "defineClass";
            data.id = loginFactory.getUser().user_id;
            return $http.post(variables.urlApi + fileApi, data);
        }
        
        function login(data){
            data.action = "login";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
    }
})();
(function () {
    'use strict';

    angular
        .module('app.user')
        .directive('username', username);

    username.$inject = ['userFactory', '$timeout', '$q'];

    function username(userFactory, $timeout, $q) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs, controller) {
            controller.$asyncValidators.username = function (modelValue, viewValue) {
                
                var defer = $q.defer();
                
                userFactory.checkAvailability(modelValue).then(function (result) {
                    if(result.data){
                        defer.resolve();
                    }else{
                        defer.reject();
                    }
                })
                
                return defer.promise;
            };
        }
    }
})();

//# sourceMappingURL=app.js.map
