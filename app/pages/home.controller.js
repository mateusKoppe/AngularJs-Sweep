(function () {
  angular
    .module("app")
    .controller("homeController", homeController);

  function homeController($state) {
    const vm = this;

    // Variables
    vm.signin = {};
    vm.isUserAvailability = 1;
    vm.userAction = "login";

    // Functions
    vm.isAction = isAction;
    vm.setAction = setAction;
    vm.userCreated = userCreated;
    vm.userLogged = userLogged;

    // Publics
    function isAction(action) {
      return vm.userAction === action;
    }

    function setAction(action) {
      vm.userAction = action;
    }

    function userCreated() {
      $state.go("firstTime");
    }

    function userLogged() {
      $state.go("class");
    }
  }
}());
