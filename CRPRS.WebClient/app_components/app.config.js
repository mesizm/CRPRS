(function () {
    "use strict";

    angular
        .module("mainRPRS")
        .constant("rprSetting", {
            clientId: "RPRWebClient",

            authorizationServerBaseUri: "http://localhost/NCRPRS.Authorization.API/api/",
            apiRightServiceBaseUri: "http://localhost/NCRPRS.CPF.API/api/rprs/",
            apiCPFServiceBaseUri: "http://localhost/NCRPRS.CPF.API/api/"

        })

        .run(["$rootScope", "$stateParams", "PrincipalService", "AuthenticationService",
           function ($rootScope, $stateParams, principalService, authenticationService) {
               $rootScope.$on("$stateChangeStart", function (event, toState, toStateParams) {
                   $rootScope.toState = toState;
                   $rootScope.toStateParams = toStateParams;
                   if (principalService.isIdentityResolved()) {
                       authenticationService.authorize();
                   }
               });
           }
        ]);

})();