(function () {
  angular
    .module("app.class")
    .controller("EditStudantController", EditStudantController);

  function EditStudantController(studants, callback, $mdDialog, studantsFactory) {
    const vm = this;
    vm.close = close;
    vm.editStudants = editStudants;
    vm.callbackEditStudant = callback;
    vm.studants = studants;

    function close() {
      $mdDialog.hide();
    }

    function editStudants(selectedStudants, editCallback) {
      studantsFactory.editStudants(selectedStudants).then((result) => {
        editCallback(result.data);
      });
    }
  }
}());
