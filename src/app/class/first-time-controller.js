(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('FirstTimeController', FirstTimeController);

    function FirstTimeController($state, loginFactory, classFactory) {
        var vm = this;
        vm.setClass = setClass;

        vm.$onInit = function(){
            classFactory.getClassByUser(loginFactory.getUser())
                .then(response => {
                    vm.class = response.data;
                });
        }

        function setClass(className) {
            vm.class.class_name = className;
            classFactory.updateClass(vm.class);
            $state.go('class');
        }
    }
})();
