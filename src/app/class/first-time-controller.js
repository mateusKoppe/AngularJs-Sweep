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
