(function () {
    "use strict";

    function applicantCreate($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = "applicant_create";

        function activate() { }

        activate();
    }

    angular
        .module("mainRPRS")
        .controller("applicantCreate", applicantCreate);

    applicantCreate.$inject = ["$location"];
})();
