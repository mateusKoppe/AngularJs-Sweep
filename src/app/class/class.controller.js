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
