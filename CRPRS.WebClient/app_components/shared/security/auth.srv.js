(function () {
    function authenticationService($rootScope, $state, principalService) {
        return {
            authorize: function () {
                return principalService.identity(true)
                    .then(function () {
                        var isAuthenticated = principalService.isAuthenticated();
                        if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principalService.isInAnyRole($rootScope.toState.data.roles)) {
                            if (isAuthenticated)
                                $state.go("accessdenied"); // user is signed in but not authorized for desired state
                            else {
                                // user is not authenticated. stow the state they wanted before you
                                // send them to the signin state, so you can return them when you're done
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;
                                // now, send them to the signin state so they can log in
                                $state.go("login");
                            }
                        }
                    });
            }
        };
    }

    angular
        .module("mainRPRS")
    .factory("AuthenticationService", authenticationService);
    authenticationService.$inject = ["$rootScope", "$state", "PrincipalService"];
})();