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
            'ui.router',
            'app.user'
        ])
})();

(function(){
    'use strict';
    
    angular
        .module('app.user', [
            'ui.router'
        ])
})();
(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('ClassController', ClassController);

    ClassController.$inject = ['loginFactory', '$state'];
    function ClassController(loginFactory, $state) {
        var vm = this;
        vm.exit = exit;
        vm.className = loginFactory.getUser().user_class;

        function exit() {
            $state.go('home');
        }
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

(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('StudantController', StudantController);

    StudantController.$inject = ['loginFactory', 'userFactory', '$mdDialog', 'orderByFilter'];

    function StudantController(loginFactory, userFactory, $mdDialog, orderByFilter) {
        var vm = this;
        vm.newStudantDialog = newStudantDialog;
        vm.notSelected = notSelected;
        vm.removeStudant = removeStudant;
        vm.someoneStudant = someoneStudant;
        vm.studants = orderStudants(loginFactory.getUser().studants);
        vm.sweep = sweep;

        vm.$onInit = function(){
            if(!vm.studants){
                vm.studants = [];
            }
        }

        /* Private */
        function orderStudants(studants){
            studants = angular.forEach(studants, function(studant){
                studant.times = new Number(studant.times);
            });
            return orderByFilter(studants, ['times', 'name']);
        }

        function objectToArray(object){
            var array = [];
            angular.forEach(object, function (item) {
                array.push(item);
            });
            return array;
        }

        /* Publics */
        function notSelected(swepper, value) {
            return swepper != value;
        }

        function newStudantDialog(event) {
            var confirm = $mdDialog.prompt()
                .title('Cadastro')
                .textContent('Preencha o campo abaixo para cadastrar um aluno.')
                .placeholder('Aluno')
                .ariaLabel('Aluno')
                .targetEvent(event)
                .ok('Adicionar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function (result) {
                var data = {
                    class: loginFactory.getUser().user_id,
                    name: result
                };
                userFactory.createStudant(data).then(function(result){
                    var studant = result.data;
                    vm.studants.push({
                        id: studant.studant_id,
                        name: studant.studant_name,
                        times: studant.studant_times,
                    });
                    vm.studants = orderStudants(vm.studants);
                });
            });
        };

        function removeStudant(studants){
            var studantsKeys = [];
            for(var key in studants){
                if(studants[key]){
                    studantsKeys.push(new Number(key));
                }
            }
            var studantsSelects = [];
            for(var key in studantsKeys){
                studantsSelects.push(vm.studants[studantsKeys[key]]);
            }
            userFactory.removeStudants(studantsSelects).then(function(){
               vm.studants = vm.studants.filter(function(studant){
                    return studantsSelects.indexOf(studant) == -1;
                });
            });
        }

        function someoneStudant(studants){
            studants = objectToArray(studants);
            return studants && studants.indexOf(true) != -1;
        }

        function sweep(studants) {
            userFactory.sweep(studants);
            studants = objectToArray(studants);
            vm.studants = vm.studants.map(function (studant) {
                if (studants.indexOf(studant) != -1) {
                    studant.times++;
                    return studant;
                }
                return studant;
            });
            vm.studants = orderStudants(vm.studants);
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

    homeController.$inject = ['$state','loginFactory', 'userFactory'];
    function homeController($state, loginFactory, userFactory){
        var vm = this;            
        
        //Variables
        vm.signin = {};
        vm.isUserAvailability = 1;
        vm.userAction = 'login';  
        
        //Functions
        vm.isAction = isAction;
        vm.setAction = setAction;
        vm.userCreated = userCreated;
        vm.userLogged = userLogged;
        
        //Publics
        function isAction(action){
            return vm.userAction === action;
        }
        
        function setAction(action){
            vm.userAction = action;
        }
        
        function userCreated(user){
            userFactory.login(user).then(function(result){
                userLogged(result.data);
            });
        }

        function userLogged(){
            $state.go("class");
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
            setUser: setUser,
            cleanUser: cleanUser
        }
        return service;
        
        function getUser(){
            return user;
        }
        
        function setUser(newUser){
            user = newUser;
        }
        
        function cleanUser(){
            setUser(false);
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('SignController', SignController);

    SignController.$inject = ['$rootScope', '$scope','userFactory', 'loginFactory'];
    function SignController($rootScope, $scope, userFactory, loginFactory){
        var vm = this;        
        vm.create = create;
        vm.login = login;
        vm.logout = logout;
        
        function create(user, form, success, error){
            var userData = angular.copy(user);
            angular.copy({}, user)
            userFactory.create(userData).then(function(result){
                if($scope[form]){ 
                    $scope[form].$setUntouched();
                    $scope[form].$setPristine();
                }
                success(userData);
            });
        }
        
        function login(user, form, success, error){
            var userData = angular.copy(user);
            angular.copy({}, user)
            userFactory.login(userData).then(function(result){
                if(result.data){
                    if($scope[form]){ 
                        $scope[form].$setUntouched();
                        $scope[form].$setPristine();
                    }
                    loginFactory.setUser(result.data);
                    success(result.data);
                }
            });
        }

        function logout(callback){
            loginFactory.cleanUser();
            callback();
        }
    }
})();

(function () {
    'use strict';
    angular
        .module('app.user')
        .service('userFactory', userFactory);

    userFactory.$inject = ['$http', 'variables', '$location', 'loginFactory'];

    function userFactory($http, variables, $location, loginFactory) {
        var fileApi = "user.php";

        var service = {
            checkAvailability: checkAvailability,
            create: create,
            createStudant: createStudant,
            defineClassName: defineClassName,
            login: login,
            removeStudants: removeStudants,
            sweep: sweep
        }
        return service;

        function checkAvailability(username) {
            var data = {};
            data.action = "checkAvailability";
            data.username = username || "";
            return $http.post(variables.urlApi + fileApi, data);
        };

        function create(data) {
            data.action = "create";
            return $http.post(variables.urlApi + fileApi, data);
        };

        function createStudant(data){
            data.action = "createStudant";
            return $http.post(variables.urlApi + fileApi, data);
        }

        function defineClassName(data) {
            data.action = "defineClass";
            data.id = loginFactory.getUser().user_id;
            return $http.post(variables.urlApi + fileApi, data);
        }

        function login(data) {
            data.action = "login";
            return $http.post(variables.urlApi + fileApi, data);
        };
        
        function removeStudants(studants){
            var data = {
                studants: studants,
                action: "removeStudant"
            };
            console.log(data);
            return $http.post(variables.urlApi + fileApi, data);
        }

        function sweep(studants) {
            var data = {};
            data.action = "sweep";
            data.studants = studants;
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
