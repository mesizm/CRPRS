(function () {
    "use strict";
    angular
        .module("mainRPRS", [
            "mainRPRS.frontDeskOfficer",
            "ngSanitize",
            "angular.filter",
            "ui.router",
            "ngResource",
            "LocalStorageModule",
            "pascalprecht.translate"
        ]);

})();