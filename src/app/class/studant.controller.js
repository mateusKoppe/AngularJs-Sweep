(function(){
    'use strict';

    angular
        .module('app.class')
        .controller('StudantController', StudantController);

    StudantController.$inject = ['loginFactory'];
    function StudantController(loginFactory){
        var vm = this;

        vm.studants = loginFactory.getUser().studants;
        console.log(vm.studants);
    }
})();
