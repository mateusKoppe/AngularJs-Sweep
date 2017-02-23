(function(){
    'use strict';
    
    angular
        .module('app.class')
        .controller('ClassController', ClassController);
    
        ClassController.$inject = ['loginFactory'];
        function ClassController(loginFactory){
            var vm = this;
            vm.test = "test";
            vm.className = loginFactory.getUser().user_class;
            
        }
})();