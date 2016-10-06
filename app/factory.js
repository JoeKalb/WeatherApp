(function() {
    'use strict';
    angular
        .module('weatherModule')
        .factory('weatherFactory', weatherFactory);
    weatherFactory.$inject = ['$http', '$q'];
    /* @ngInject */
    function weatherFactory($http, $q) {
        var service = {
            getWeather: getWeather
        };
        return service;
        ////////////////
        function getWeather(place) {
            // using toastr
            var defer = $q.defer();

        	$http({ // grab the weather api
        		method: 'GET',
        		url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                    APPID: '7b2cfaaa74568f2cc3165460db7eba8c', 
                    q: place, 
                    units: 'imperial'
                }
        	}).then(function(result) { // make sure the data is good through toastr
                if(typeof result.data === 'object') {
        	       defer.resolve(result.data);
                } else {
                    defer.reject('oh no factory problem!!!');
                }
            },
            function(error) {
                defer.reject(error);
        	});
            return defer.promise;
        }
    }
})();
