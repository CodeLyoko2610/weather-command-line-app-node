//import modules
const weather = require('./modules/weather');

let cities = process.argv.slice(2);

cities.forEach(weather.get);


//Modules-------------------------------
//Weather module
//printMess
//printErrors