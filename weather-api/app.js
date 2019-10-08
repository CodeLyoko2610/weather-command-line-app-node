//import modules
const weather = require('./modules/weather');
const querystring = require('querystring');

let cities = process.argv.slice(2);

//test zipcode: 90201
//console.dir(cities);
cities.forEach(weather.get);
