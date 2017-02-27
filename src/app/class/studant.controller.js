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
        vm.someoneStudant = someoneStudant;
        vm.studants = orderStudants(loginFactory.getUser().studants);
        vm.sweep = sweep;


        /* Private */
        function orderStudants(studants){
            studants = angular.forEach(studants, function(studant){
                studant.times = new Number(studant.times);
            });
            return orderByFilter(studants, ['times', 'name']);
        }

        /* Publics */
        function notSelected(swepper, value) {
            return swepper != value;
        }

        function newStudantDialog(event) {
            // Appending dialog to document.body to cover sidenav in docs app
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
                userFactory.createStudant(data).then(function(){
                    vm.studants.push({name: result, times: 0});
                    vm.studants = orderStudants(vm.studants);
                });
            });
        };

        function someoneStudant(studants){
            var studantsArray = [];
            angular.forEach(studants, function (studant) {
                studantsArray.push(studant);
            });
            return studantsArray && studantsArray.indexOf(true) != -1;
        }

        function sweep(studants) {
            userFactory.sweep(studants);
            var studantsArray = [];
            angular.forEach(studants, function (studant) {
                studantsArray.push(studant);
            });
            vm.studants = vm.studants.map(function (studant) {
                if (studantsArray.indexOf(studant) != -1) {
                    studant.times++;
                    return studant;
                }
                return studant;
            });
            vm.studants = orderStudants(vm.studants);
        }
    }
})();
