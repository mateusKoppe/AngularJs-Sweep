(function () {
  angular
    .module("app.class")
    .config(routes);

  function routes($stateProvider) {
    $stateProvider
      .state("class", {
        url: "/turma",
        templateUrl: "app/class/class.html",
        controller: "ClassController",
        controllerAs: "vm",
        resolve: {
          userRoute($state, userFactory, classFactory) {
            return userFactory.loadUser()
              .then(user => classFactory.getClassByUser(user))
              .then((response) => {
                if (!response.data.class_name) {
                  $state.go("firstTime");
                }
                return response.data;
              })
              .catch(() => {
                $state.go("home");
              });
          },
        },
      })
      .state("firstTime", {
        url: "/turma/primeiravisita",
        templateUrl: "app/class/first-time.html",
        controller: "FirstTimeController",
        controllerAs: "vm",
        resolve: {
          userRoute($state, userFactory, $q, $timeout) {
            let timeout;
            if (!userFactory.getUser()) {
              timeout = $timeout(() => {
                $state.go("home");
              });
            } else {
              return userFactory.getUser();
            }
            return timeout;
          },
        },
      });
  }
}());
