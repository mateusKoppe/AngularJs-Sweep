(function () {
  angular
    .module("app.class")
    .controller("ClassController", ClassController);

  function ClassController(
    $state,
    $mdDialog,
    userFactory,
    orderByFilter,
    classFactory,
    studantsFactory,
  ) {
    const vm = this;
    vm.editStudants = editStudants;
    vm.editStudantDialog = editStudantDialog;
    vm.exit = exit;
    vm.newStudantDialog = newStudantDialog;
    vm.notSelected = notSelected;
    vm.removeStudant = removeStudant;
    vm.someoneStudant = someoneStudant;
    vm.sweep = sweep;
    vm.toggleSelecteds = toggleSelecteds;
    vm.className = "";
    vm.studants = [];

    vm.$onInit = () => {
      vm.className = classFactory.getActualClass().class_name;
      loadStudants();
    };

    /* Private */
    function loadStudants() {
      studantsFactory.getStudantsByClass()
        .then((request) => {
          vm.studants = request.data;
        });
    }

    function exit() {
      $state.go("home");
    }

    function convertSelectsStudants(selecteds) {
      const studantsKeys = [];
      for (const key in selecteds) {
        if (selecteds[key]) {
          studantsKeys.push(+key);
        }
      }
      const studantsSelects = [];
      for (const key in studantsKeys) {
        if (vm.studants[studantsKeys[key]]) {
          studantsSelects.push(vm.studants[studantsKeys[key]]);
        }
      }
      return studantsSelects;
    }

    function orderStudants(studants) {
      const editedStudants = angular.forEach(studants, (studant) => {
        studant.times = +studant.times;
      });
      return orderByFilter(editedStudants, ["times", "name"]);
    }

    function objectToArray(object) {
      const array = [];
      angular.forEach(object, (item) => {
        array.push(item);
      });
      return array;
    }

    /* Publics */
    function editStudantDialog($event, studants, callback) {
      const body = angular.element(document.body);
      const covnertedStudants = convertSelectsStudants(studants);
      $mdDialog.show({
        parent: body,
        targetEvent: $event,
        templateUrl: "app/class/dialogs/edit-studant.html",
        locals: {
          studants: angular.copy(covnertedStudants),
          callback,
        },
        controller: "EditStudantController",
        controllerAs: "vm",
      });
    }

    /* Publics */
    function editStudants(studants) {
      studants.forEach((editStudant) => {
        const studantIndex = vm.studants.findIndex(studant => studant.id === editStudant.id);
        vm.studants[studantIndex] = editStudant;
      });
      $mdDialog.hide();
    }

    function notSelected(swepper, value) {
      return swepper !== value;
    }

    function newStudantDialog(event) {
      const confirm = $mdDialog.prompt()
        .title("Cadastro")
        .textContent("Preencha o campo abaixo para cadastrar um aluno.")
        .placeholder("Aluno")
        .ariaLabel("Aluno")
        .targetEvent(event)
        .ok("Adicionar")
        .cancel("Cancelar");

      $mdDialog.show(confirm)
        .then(result =>
          studantsFactory.create({
            class: userFactory.getUser().user_id,
            name: result,
          }))
        .then((result) => {
          const studant = result.data;
          vm.studants.push({
            id: studant.studant_id,
            name: studant.studant_name,
            times: studant.studant_times,
          });
          vm.studants = orderStudants(vm.studants);
        });
    }

    function removeStudant(studants) {
      const studantsSelects = convertSelectsStudants(studants);
      vm.selectedStudantes = [];
      const promises = studantsFactory.removeStudants(studantsSelects);
      promises.forEach((promise) => {
        promise.then((result) => {
          const { id } = result.data;
          const index = vm.studants.findIndex(studant => +studant.id === +id);
          vm.studants.splice(index, 1);
        });
      });
    }

    function someoneStudant(studants) {
      const studantsList = objectToArray(studants);
      return studantsList && studantsList.indexOf(true) !== -1;
    }

    function sweep() {
      const studantsList = objectToArray(vm.swepper);
      studantsFactory.sweep(studantsList)
        .then((studantsEditeds) => {
          studantsEditeds.forEach((editStudant) => {
            const studantIndex = vm.studants.findIndex(studant => studant.id === editStudant.id);
            vm.studants[studantIndex] = editStudant;
          });
          vm.studants = orderStudants(vm.studants);
          [vm.swepper[0], vm.swepper[1]] = vm.studants;
        });
    }

    function toggleSelecteds(studants, selected) {
      if (selected) {
        angular.copy({}, studants);
      } else {
        let i = 0;
        const newSelect = {};
        angular.forEach(vm.studants, () => {
          newSelect[i++] = true;
        });
        angular.copy(newSelect, studants);
      }
    }
  }
}());
