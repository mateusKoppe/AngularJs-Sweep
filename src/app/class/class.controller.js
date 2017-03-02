(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('ClassController', ClassController);

    ClassController.$inject = ['loginFactory', 'userFactory', '$mdDialog', 'orderByFilter', '$state'];

    function ClassController(loginFactory, userFactory, $mdDialog, orderByFilter, $state) {
        var vm = this;
        vm.className = loginFactory.getUser().user_class;
        vm.editStudantDialog = editStudantDialog;
        vm.exit = exit;
        vm.newStudantDialog = newStudantDialog;
        vm.notSelected = notSelected;
        vm.removeStudant = removeStudant;
        vm.someoneStudant = someoneStudant;
        vm.studants = orderStudants(loginFactory.getUser().studants);
        vm.sweep = sweep;
        vm.toggleSelecteds = toggleSelecteds;


        vm.$onInit = function () {
            if (!vm.studants) {
                vm.studants = [];
            }
        }

        /* Private */
        function exit() {
            $state.go('home');
        }

        function convertSelectsStudants(selecteds){
            var studantsKeys = [];
            for (var key in selecteds) {
                if (selecteds[key]) {
                    studantsKeys.push(new Number(key));
                }
            }
            var studantsSelects = [];
            for (var key in studantsKeys) {
                studantsSelects.push(vm.studants[studantsKeys[key]]);
            }
            return studantsSelects;
        }
        
        function orderStudants(studants) {
            studants = angular.forEach(studants, function (studant) {
                studant.times = new Number(studant.times);
            });
            return orderByFilter(studants, ['times', 'name']);
        }

        function objectToArray(object) {
            var array = [];
            angular.forEach(object, function (item) {
                array.push(item);
            });
            return array;
        }

        /* Publics */
        function editStudantDialog($event, studants) {
            var body = angular.element(document.body);
            $mdDialog.show({
                parent: body,
                targetEvent: $event,
                templateUrl: 'app/class/edit-studant-dialog.html',
                locals: {
                    studants: angular.copy(studants)
                },
                controller: EditStudantDialogController,
                controllerAs: 'vm'
            });

            function EditStudantDialogController(studants, $mdDialog) {
                var vm = this;
                vm.close = close;
                vm.editStudants = editStudants;
                vm.studants = angular.copy(convertSelectsStudants(studants));

                function close(){
                    $mdDialog.hide();
                }

                function editStudants(studants) {
                    console.log(studants);
                }

            }

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
                userFactory.createStudant(data).then(function (result) {
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

        function removeStudant(studants) {
            var studantsSelects = convertSelectsStudants(studants);
            userFactory.removeStudants(studantsSelects).then(function () {
                vm.studants = vm.studants.filter(function (studant) {
                    return studantsSelects.indexOf(studant) == -1;
                });
            });
        }

        function someoneStudant(studants) {
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

        function toggleSelecteds(studants, selected) {
            if (selected) {
                angular.copy({}, studants);
            } else {
                var i = 0;
                var newSelect = {};
                angular.forEach(vm.studants, function (studant) {
                    newSelect[i++] = true;
                });
                angular.copy(newSelect, studants);
            }
        }
    }
})();
