(function () {
  angular
    .module("app")
    .directive("passwordCheck", passwordCheck);

  function passwordCheck() {
    const directive = {
      require: "ngModel",
      link,
      restrict: "A",
      scope: {
        passwordCheck: "=passwordCheck",
      },
    };
    return directive;

    function link(scope, element, attrs, controller) {
      controller.$validators.passwordCheck = function (modelValue) {
        return scope.passwordCheck === modelValue;
      };
    }
  }
}());
