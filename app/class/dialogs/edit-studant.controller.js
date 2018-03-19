(function () {
    'use strict';

    angular
        .module('app.class')
        .controller('EditStudantController', EditStudantController);

    function EditStudantController(studants, callback, $mdDialog, studantsFactory) {
        var vm = this;
        vm.close = close;
        vm.editStudants = editStudants;
        vm.callbackEditStudant = callback;
        vm.studants = studants;

        function close() {
            $mdDialog.hide();
        }

        function editStudants(editStudants, callback) {
            studantsFactory.editStudants(editStudants).then(function(result) {
                callback(result.data);
            });
        }

    }

})();
