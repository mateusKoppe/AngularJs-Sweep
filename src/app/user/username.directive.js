(function () {
    'use strict';

    angular
        .module('app.user')
        .directive('username', username);

    username.$inject = ['userFactory', '$timeout', '$q'];

    function username(userFactory, $timeout, $q) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs, controller) {
            controller.$asyncValidators.username = function (modelValue, viewValue) {

                var defer = $q.defer();

                userFactory.checkAvailability(modelValue)
                  .then(function (result) {
                      if(result.data.available){
                          defer.resolve();
                      }else{
                          defer.reject();
                      }
                  })

                return defer.promise;
            };
        }
    }
})();
