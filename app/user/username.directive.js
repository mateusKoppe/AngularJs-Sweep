(function () {
  angular
    .module("app.user")
    .directive("username", username);

  function username(userFactory, $timeout, $q) {
    const directive = {
      require: "ngModel",
      link,
      restrict: "A",
    };
    return directive;

    function link(scope, element, attrs, controller) {
      controller.$asyncValidators.username = function (modelValue) {
        const defer = $q.defer();

        userFactory.checkAvailability(modelValue)
          .then((result) => {
            if (result.data.available) {
              defer.resolve();
            } else {
              defer.reject();
            }
          });

        return defer.promise;
      };
    }
  }
}());
