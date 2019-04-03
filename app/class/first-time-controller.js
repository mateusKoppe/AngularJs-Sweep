(function () {
  angular
    .module("app.class")
    .controller("FirstTimeController", FirstTimeController);

  function FirstTimeController($state, userFactory, classFactory) {
    const vm = this;
    vm.setClass = setClass;
    vm.class = {};

    vm.$onInit = function () {
      classFactory.getClassByUser(userFactory.getUser())
        .then((response) => {
          vm.class = response.data;
        });
    };

    function setClass(className) {
      vm.class.class_name = className;
      classFactory.updateClass(vm.class)
        .then(() => {
          $state.go("class");
        });
    }
  }
}());
