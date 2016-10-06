(function() {
    'use strict';

    angular
        .module('weatherModule')
        .controller('weatherController', weatherController);

    weatherController.$inject = ['$http', 'weatherFactory', 'toastr'];
    
    /* @ngInject */
    // start out with making the controller
    function weatherController($http, weatherFactory, toastr) {
        var vm = this;
        vm.title = 'weatherController';
        vm.history = [{}]; // have a history for all the previous inputs
        vm.placeInput;
        vm.name = ''; // use a blank as a starting point to hide the class="panel-body"
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
        vm.icon = '10d'; // give a base line to make the <img> not throw an error
        
        activate();

        ////////////////

        function activate() {
        }
        // creating the function that will grab all of the user data
        vm.showWeather = function(newPlace){
        	weatherFactory.getWeather(newPlace).then(
                function(result){
        		  vm.name = result.name;
        		  vm.desc = result.weather[0].description; // why is .weather an array?... 
        		  vm.temp = result.main.temp;
        		  vm.lat = result.coord.lat;
        		  vm.long = result.coord.lon;
        		  vm.pressure = result.main.pressure;
        		  vm.humid = result.main.humidity;
        		  vm.low =result.main.temp_min;
        		  vm.high =result.main.temp_max;
        		  vm.speed = result.wind.speed;
        		  vm.dt = Date(result.dt * 1000).replace(' GMT-0700 (PDT)', ''); // convert to human readable
        		  vm.icon = result.weather[0].icon;
        		  // add the new place to the history array
        		  vm.history.push({
        		      'place': vm.name,
        		      'dt' : vm.dt
        		  });
                  toastr.success('It works!');
                }, 
                function(error){
                    toastr.error('Oh NOOOO Controller error: ' + error.data);
                }
            )
        }
    }    
})();

