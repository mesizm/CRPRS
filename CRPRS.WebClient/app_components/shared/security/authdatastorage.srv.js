(function () {
	'use strict';
	angular
        .module('mainRPRS')
        .factory('AuthDataStorageService', AuthDataStorageService);

	AuthDataStorageService.$inject = ['localStorageService'];

	/* @ngInject */
	function AuthDataStorageService(localStorageService) {
		var dataFactory = {};
		var _save = function(data) {
		    localStorageService.set('authorizationData', data);
		}

		var _clear = function() {
			localStorageService.remove('authorizationData');
		}

		var _get = function() {
		    var authData = localStorageService.get('authorizationData');
		    return authData;
		}
		dataFactory.save = _save;
		dataFactory.clear = _clear;
		dataFactory.get = _get;
		return dataFactory;
	}

})();