(function() {
    'use strict';

    angular
        .module('weatherModule')
        .controller('weatherController', weatherController);

    weatherController.$inject = ['$http', 'weatherFactory'];
    
    /* @ngInject */
    function weatherController($http, weatherFactory) {
        var vm = this;
        vm.title = 'weatherController';
        vm.history = [{}];
        vm.placeInput;
        vm.name = '';
        vm.temp;
        vm.desc;
        vm.lat;
        vm.long;
        vm.pressure;
        vm.humid;
        vm.low;
        vm.high;
        vm.speed;
        vm.dt;
        vm.icon = '04n';
        

        activate();

        ////////////////

        function activate() {
        }

        vm.showWeather = function(newPlace){
        	weatherFactory.getWeather(newPlace).then(function(result){
        		vm.name = result.name;
        		vm.desc = result.weather[0].description;
        		vm.temp = Math.round(result.main.temp * 9/5 - 459.67);
        		vm.lat = result.coord.lat;
        		vm.long = result.coord.lon;
        		vm.pressure = result.main.pressure;
        		vm.humid = result.main.humidity;
        		vm.low = Math.round(result.main.temp_min * 9/5 - 459.67);
        		vm.high = Math.round(result.main.temp_max * 9/5 - 459.67);
        		vm.speed = result.wind.speed;
        		vm.dt = Date(result.dt * 1000).replace(' GMT-0700 (PDT)', '');
        		vm.icon = result.weather[0].icon;
        		// add the new place to the history array
        		vm.history.push({
        		'place': vm.name,
        		'dt' : vm.dt
        		});
        	});
        }  
    }
})();

