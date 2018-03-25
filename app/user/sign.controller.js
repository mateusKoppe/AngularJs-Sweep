(function () {
  angular
    .module("app.user")
    .controller("SignController", SignController);

  function SignController($rootScope, $scope, userFactory) {
    const vm = this;
    vm.create = create;
    vm.login = login;
    vm.logout = logout;

    function create(user, form, success) {
      const userData = angular.copy(user);
      angular.copy({}, user);
      userFactory.create(userData).then((result) => {
        if ($scope[form]) {
          $scope[form].$setUntouched();
          $scope[form].$setPristine();
        }
        success(result.data);
      });
    }

    function login(user, form, success) {
      const userData = angular.copy(user);
      angular.copy({}, user);
      userFactory.login(userData)
        .then((userResponse) => {
          if ($scope[form]) {
            $scope[form].$setUntouched();
            $scope[form].$setPristine();
          }
          success(userResponse);
        });
    }

    function logout(callback) {
      userFactory.cleanUser();
      callback();
    }
  }
}());
