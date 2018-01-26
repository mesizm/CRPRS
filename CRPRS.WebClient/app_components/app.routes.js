(function () {
    "use strict";

    function configure($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlRouterProvider.otherwise("/");
        $stateProvider
            //Login
            .state("root", {
                'abstract': true,
                resolve: {
                    authorize: [
                        "AuthenticationService",
                        function (authenticationService) {
                            return authenticationService.authorize();
                        }
                    ]
                }
            })
            .state("login", {
                parent: "root",
                url: "/",
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: "app_components/shared/login/login.tpl.html",
                        controller: "loginController",
                        controllerAs: "vm"
                    }
                }
            })
            //Front_Desk_Officer
            .state("dasboard",
            {
                url: "/dasboard",
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/dasboard/dashboard.tpl.html",
                        controller: "dasboardList",
                        controllerAs: "vm"
                    }
                }
            })
            .state("applicantList",
            {
                url: "/applicantList",
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/application/applicant-list.tpl.html",
                        controller: "applicantList",
                        controllerAs: "vm"
                    }
                }
            })
            .state("createApplicant",
            {
                url: "/createApplicant",
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/application/applicant-create.tpl.html",
                        controller: "applicantCreate",
                        controllerAs: "vm"
                    }
                }
            });
    }

    angular
        .module("mainRPRS")
        .config(configure);
    configure.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider"];
})();