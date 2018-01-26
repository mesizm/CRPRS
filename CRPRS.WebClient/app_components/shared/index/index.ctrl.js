(function () {
    "use strict";
    function indexController($scope, $http, $rootScope, $location, $window, $state, principalService, authDataStorageService, $translate, rprSetting) {
        $scope.getClass = function () {

            if ($location.path().substr(0, path.length) === path) {
                return true;
            }
            else {
                return false;
            }
        }
        var authorizationServerBaseUri = rprSetting.authorizationServerBaseUri;
        var vm = this;
        $scope.user = {};
        $scope.changPwd = {};
        function logstatuschange() {
            $scope.logStatus = {
                "LogStatus": 'LogOut',
                "IsOnLine": false
            };
            $http({
                url: authorizationServerBaseUri + "UserManagement/logUserActivity",
                dataType: "json",
                method: "POST",
                data: $scope.logStatus,
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(
                function () {
                    principalService.authenticate(null);
                    authDataStorageService.clear();
                    $rootScope.isAuthenticated = false;
                    $state.go("login");
                    $window.location.reload(true);
                }).error(function () {
                    principalService.authenticate(null);
                    authDataStorageService.clear();
                    $rootScope.isAuthenticated = false;
                    $state.go("login");
                    $window.location.reload(true);
                });;
        }

        function logOut() {
            logstatuschange();
        }

        $scope.logOut = logOut;
        function changePassword() {
            $state.go("changePassword", { 'userName': $scope.assignedBy });
        }
        $scope.changePassword = changePassword;
        $translate.use($scope.culture);
        $scope.logStatus = {};
        $scope.languegeCulture = function (culture) {
            location.reload();
            $translate.use(culture);
        }
        $scope.changepassword = function () {
            $scope.changPwd = {
                "UserName": $scope.assignedBy,
                "OldPassword": $scope.user.OldPassword,
                "NewPassword": $scope.user.password,
                "IsFirstLogIn": false
            }
            $http({
                url: authorizationServerBaseUri + "UserManagement/changepassword",
                dataType: "json",
                method: "POST",
                data: $scope.changPwd,
                headers: { "Content-Type": "application/json" }
            }).success(function (data) {
                $scope.successmessage = data.Message;
            }).error(function (data) {
                $scope.errormessage = data.Message;
            });
        }
        $scope.refresh = function () {
            location.reload();
            $state.go('login');
        }
    }

    angular
        .module("mainRPRS")
    .controller("indexController", indexController);
    indexController.$inject = ["$scope", "$http", "$location", "$rootScope", "$window", "$state", "PrincipalService", "AuthDataStorageService", "$translate", "rprSetting"];
})();
