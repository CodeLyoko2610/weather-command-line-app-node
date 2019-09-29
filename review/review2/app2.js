
const profile2 = require('./modules2/profile2');

let names = process.argv.slice(2);
names.forEach(profile2.getProfile);
//Print out data from API [DONE]
//Handle errors [DONE]
//Take params as username [DONE]
//Create printing functions [DONE]
//Export to own modules [DONE]