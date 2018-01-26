(function () {
    "use strict";

    function configure($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $translateProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlRouterProvider.otherwise("/");
        $stateProvider
              //Front_Desk_Officer
            .state("applicantList",
            {
                parent: "root",
                url: "/applicantList",
                data: {
                    roles: ["Front_Desk_Officer"]
                },
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/application/applicant-list.tpl.html",
                        controller: "applicantList",
                        authenticate: true,
                        controllerAs: "vm"
                    }
                }
            })
            .state("applicant",
            {
                parent: "root",
                url: "/applicant",
                data: {
                    roles: ["Front_Desk_Officer"]
                },
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/application/applicant-create.tpl.html",
                        controller: "applicantCreate",
                        authenticate: true,
                        controllerAs: "vm"
                    }
                }
            })
            .state("transactionList",
            {
                parent: "root",
                url: "/transactionList",
                data: {
                    roles: ["Front_Desk_Officer"]
                },
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/transaction/transaction-list.tpl.html",
                        controller: "transactionList",
                        authenticate: true,
                        controllerAs: "vm"
                    }
                }
            })
            .state("deliveryList",
            {
                parent: "root",
                url: "/deliveryList",
                data: {
                    roles: ["Front_Desk_Officer"]
                },
                views: {
                    'content@': {
                        templateUrl: "app_components/front-desk-officer/application/applicant-create.tpl.html",
                        controller: "applicantCreate",
                        authenticate: true,
                        controllerAs: "vm"
                    }
                }
            });
    }

    angular
        .module("mainRPRS.frontDeskOfficer")
        .config(configure);
    configure.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider", "$translateProvider"];
})();