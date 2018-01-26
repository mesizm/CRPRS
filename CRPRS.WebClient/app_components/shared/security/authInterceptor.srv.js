(function () {
    angular
       .module('mainRPRS')
       .factory('AuthInterceptorService', AuthInterceptorService);

    AuthInterceptorService.$inject = ['$q', 'AuthDataStorageService', '$rootScope'];

    function AuthInterceptorService($q, AuthDataStorageService, $rootScope) {

        var AuthInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = AuthDataStorageService.get();

            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.access_token;
                $rootScope.assignedBy = authData.userName;
                $rootScope.fullName = authData.fullName;
                $rootScope.role = authData.roles;
                $rootScope.culture = "en";
                $rootScope.LocationCode = authData.locationCode;
                $rootScope.isAuthenticated = true;
            }
            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                AuthDataStorageService.get();


            }
            return $q.reject(rejection);
        }

        AuthInterceptorServiceFactory.request = _request;
        AuthInterceptorServiceFactory.responseError = _responseError;

        return AuthInterceptorServiceFactory;
    }
})();