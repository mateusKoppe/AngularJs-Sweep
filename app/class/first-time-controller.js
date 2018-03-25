(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('FirstTimeController', FirstTimeController);

    function FirstTimeController($state, userFactory, classFactory) {
        var vm = this;
        vm.setClass = setClass;
        vm.class = {};

        vm.$onInit = function(){
            classFactory.getClassByUser(userFactory.getUser())
                .then(function(response) {
                    vm.class = response.data;
                });
        }

        function setClass(className) {
            vm.class.class_name = className;
            classFactory.updateClass(vm.class)
                .then(function() {
                    $state.go('class');
                });
        }
    }
})();
