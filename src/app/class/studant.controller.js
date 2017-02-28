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
