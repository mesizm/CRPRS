(function () {
    "use strict";

    function loginController($http, $scope, $rootScope, $state, TokenService, principalService, $translate) {
        var vm = this;
        vm.username = "";
        vm.password = "";
        vm.message = "";
        vm.lang = "";

        function login() {
            var loginData = { username: vm.username, password: vm.password };
            TokenService.authenticate(loginData).then(function () {
                principalService.identity(true).then(function (response2) {
                    principalService.authenticate(response2);
                    $translate.use($scope.culture);
                    if ($rootScope.role === "Front_Desk_Officer") {
                        $state.go("application");
                    } else if ($rootScope.role === "Registration_Officer") {
                        $state.go("applicationTransactionList");

                    } else if ($rootScope.role === "Senior_Registration_Officer") {
                        $state.go("transactionList");
                    } else if ($rootScope.role === "Digitalization_Officer") {
                        $state.go("documentList");

                    } else if ($rootScope.role === "SystemAdministrator") {
                        $state.go("userList");

                    } else {
                        vm.message = "Your password Invalid. please use a correct password";
                        $state.go("login");
                    }
                }
                );
            },
                function () {
                    if (vm.message === "") {
                        vm.message = "user name or password not correct";
                    }
                });
        }
        vm.login = login;
    }

    angular
        .module("mainRPRS")
        .controller("loginController", loginController);

    loginController.$inject = ["$http", "$scope", "$rootScope", "$state", "TokenService", "PrincipalService", "$translate"];

})();