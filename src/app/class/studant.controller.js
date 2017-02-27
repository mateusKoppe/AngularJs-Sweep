(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('StudantController', StudantController);

    StudantController.$inject = ['loginFactory', 'userFactory'];

    function StudantController(loginFactory, userFactory) {
        var vm = this;
        vm.notSelected = notSelected;
        vm.studants = loginFactory.getUser().studants;
        vm.sweep = sweep;

        function notSelected(swepper, value) {
            return swepper != value;
        }

        function sweep(studants) {
            userFactory.sweep(studants);
            var studantsArray = [];
            angular.forEach(studants, function(studant){
                studantsArray.push(studant);
            });
            vm.studants = vm.studants
                .map(function(studant){
                    if(studantsArray.indexOf(studant) != -1){
                        studant.times++;
                        return studant;
                    }
                    return studant;
                });
        }

    }
})();
