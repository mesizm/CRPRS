(function () {
    "use strict";

    function applicantList($scope) {
        $scope.title = "applicant_list";

        function activate() { }

        activate();
    }

    angular
        .module("mainRPRS")
        .controller("applicantList", applicantList);
    applicantList.$inject = ["$scope"];
})();
