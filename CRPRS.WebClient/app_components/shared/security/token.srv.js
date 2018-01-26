(function () {
    angular
       .module('mainRPRS')
       .factory('TokenService', TokenService);

    TokenService.$inject = ['$q', '$http', 'AuthDataStorageService', 'rprSetting'];

    /* @ngInject */
    function TokenService($q, $http, AuthDataStorageService, rprSetting) {
        var authorizationServerBaseUri = rprSetting.authorizationServerBaseUri, clientId = rprSetting.clientId;
        var service = {};

        var _authenticate = function (loginData) {
            var deferred = $q.defer();
            var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password + "&client_id=" + rprSetting.clientId;
            $http.post(authorizationServerBaseUri + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(authenticateComplete)
               .error(authenticateFailed);

            return deferred.promise;

            function authenticateComplete(response) {
                AuthDataStorageService.save(response);
                deferred.resolve(response);

            }
            function authenticateFailed(err) {
                AuthDataStorageService.clear();
                deferred.reject(err);
            }
        }
        var _refreshToken = function () {
            var deferred = $q.defer();
            var authData = AuthDataStorageService.get();
            var data = "grant_type=refresh_token&refresh_token=" + authData.refresh_token + "&client_id=" + clientId;
            $http.post(authorizationServerBaseUri + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(refreshTokenComplete)
                .error(refreshTokenFailed);

            return deferred.promise;

            function refreshTokenComplete(response) {
                AuthDataStorageService.save(response);
                deferred.resolve(response);

            }
            function refreshTokenFailed(err) {
                AuthDataStorageService.clear();
                deferred.reject(err);
            }
        }
        service.authenticate = _authenticate;
        service.refreshToken = _refreshToken;
        return service;
    }
})();