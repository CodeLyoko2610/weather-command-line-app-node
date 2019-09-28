//Require modules
const profile = require('./modules/profile');

 //Set users as arguments and put to an array
 const users = process.argv.slice(2);
 users.forEach(profile.get);

