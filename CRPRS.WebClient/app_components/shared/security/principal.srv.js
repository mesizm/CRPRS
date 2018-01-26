(function () {
	angular
       .module("mainRPRS")
       .factory("PrincipalService", principalService);

	principalService.$inject = ["$q", "$http", "rprSetting"];

	/* @ngInject */
	function principalService($q, $http, rprSetting) {
		var identity = undefined, authenticated = false;
		var authorizationServerBaseUri = rprSetting.authorizationServerBaseUri;

		return {

			isIdentityResolved: function () {
				return angular.isDefined(identity);
			},

			isAuthenticated: function () {
				return authenticated;
			},

			isInRole: function (role) {
			    if (!authenticated || !identity.roles)
			        return false;
				return identity.roles.indexOf(role) !== -1;
			},

			isInAnyRole: function (roles) {
			    if (!authenticated || !identity.roles)
			        return false;

				for (var i = 0; i < roles.length; i++) {
				    if (this.isInRole(roles[i]))
				        return true;
				}
				return false;

			},

			authenticate: function (_identity) {				
				identity = _identity;
				authenticated = _identity !== null;
			},

			identity: function (force) {
				var deferred = $q.defer();
				if (force === true)
				    identity = undefined;

				// check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
				if (angular.isDefined(identity)) {

					deferred.resolve(identity);
					return deferred.promise;

				}
				// otherwise, retrieve the identity data from the server, update the identity object, and then resolve.

				$http.get(authorizationServerBaseUri+'account/identity', { ignoreErrors: true })
				    .success(function(data) {
				        identity = data;
				        authenticated = true;
				        deferred.resolve(identity);

				    })
				    .error(function () {
				        identity = null;
				        authenticated = false;
				        deferred.resolve(identity);
				    });
				return deferred.promise;

			}

		};
	}

})();