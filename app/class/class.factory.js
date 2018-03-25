(function () {
  angular
    .module("app.class")
    .service("classFactory", classFactory);

  function classFactory($http, variables) {
    let classData = false;

    function getClassByUser(user) {
      return $http.get(`${variables.urlApi}/classByUser/${user.user_id}`)
        .then((response) => {
          setActualClass(response.data);
          return response;
        });
    }

    function updateClass(update) {
      return $http.put(`${variables.urlApi}/class/${update.class_id}`, update)
        .then((response) => {
          setActualClass(response.data);
          return response;
        });
    }

    function setActualClass(newClass) {
      classData = newClass;
    }

    function getActualClass() {
      return classData;
    }

    return {
      getClassByUser,
      updateClass,
      setActualClass,
      getActualClass,
    };
  }
}());
