(function () {
  angular
    .module("app.studants")
    .service("studantsFactory", studantsFactory);

  function studantsFactory($http, variables, classFactory, userFactory) {
    function create(data) {
      const classId = classFactory.getActualClass().class_id;
      const token = userFactory.getUser().user_token;
      const url = `${variables.urlApi}/class/${classId}/studants?token=${token}`;
      return $http.post(url, data);
    }

    function editStudants(studants) {
      const classId = classFactory.getActualClass().class_id;
      const token = userFactory.getUser().user_token;
      const data = { studants };
      const url = `${variables.urlApi}/class/${classId}/studants?token=${token}`;
      return $http.put(url, data);
    }

    function getStudantsByClass() {
      const classId = classFactory.getActualClass().class_id;
      const token = userFactory.getUser().user_token;
      const url = `${variables.urlApi}/class/${classId}/studants?token=${token}`;
      return $http.get(url);
    }

    function removeStudants(studants) {
      const classId = classFactory.getActualClass().class_id;
      const token = userFactory.getUser().user_token;
      return studants.map((studant) => {
        let url = `${variables.urlApi}/class/${classId}/studants/${studant.id}`;
        url += `?token=${token}`;
        return $http.delete(url);
      });
    }

    function sweep(studants) {
      let sweepers = angular.copy(studants);
      sweepers = sweepers.map((studant) => {
        studant.times = (+studant.times) + 1;
        return studant;
      });
      return editStudants(sweepers)
        .then(response => response.data);
    }

    return {
      create,
      editStudants,
      getStudantsByClass,
      removeStudants,
      sweep,
    };
  }
}());
