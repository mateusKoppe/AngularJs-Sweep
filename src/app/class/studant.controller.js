(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('StudantController', StudantController);

    StudantController.$inject = ['loginFactory'];

    function StudantController(loginFactory) {
        var vm = this;
        vm.notSelected = notSelected;
        vm.studants = loginFactory.getUser().studants;



        function notSelected(swepper, value) {
            return swepper != value;
        }
    }
})();
