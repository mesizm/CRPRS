(function () {
    "use strict";

    function dasboardList($scope) {
        $scope.title = "dasboard";

        function activate() { }

        activate();
    }

    angular
        .module("mainRPRS")
        .controller("dasboardList", dasboardList);
    dasboardList.$inject = ["$scope"];
})();
