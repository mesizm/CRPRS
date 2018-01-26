(function () {
    "use strict";

    function configure($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $translateProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlRouterProvider.otherwise("/");
        $stateProvider
           //Registration_Officer
            .state("transaction",
            {
                parent: "root",
                url: "/applicant",
                data: {
                    roles: ["Front_Desk_Officer"]
                },
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/task/applicant/applicant-create.tpl.html",
                        controller: "applicantCreate",
                        authenticate: true,
                        controllerAs: "vm"
                    }
                }
            });
    }

    angular
        .module("mainRPRS.userManagement")
        .config(configure);
    configure.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider", "$translateProvider"];
})();