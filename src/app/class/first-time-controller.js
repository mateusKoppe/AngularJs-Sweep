(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('FirstTimeController', FirstTimeController);

    FirstTimeController.$inject = ['userFactory'];

    function FirstTimeController(userFactory) {
        var vm = this;
        vm.setClass = setClass;

        function setClass(className) {
            var data = {
                className: className
            }
            console.log(className);
            userFactory.defineClassName(data);
        }
    }
})();
