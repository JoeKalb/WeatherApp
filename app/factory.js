(function() {
    'use strict';
    angular
        .module('weatherModule')
        .factory('weatherFactory', weatherFactory);
    weatherFactory.$inject = ['$http'];
    /* @ngInject */
    function weatherFactory($http) {
        var service = {
            getWeather: getWeather
        };
        return service;
        ////////////////
        function getWeather(place) {
        	return $http({
        		method: 'GET',
        		url: 'http://api.openweathermap.org/data/2.5/weather?q=' + place +  '&APPID=7b2cfaaa74568f2cc3165460db7eba8c'
        	}).then(function(response) {
        		return response.data;
        	});
        }
    }
})();