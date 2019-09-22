const https = require('https');

console.log('Hello World');
console.error('This is an error');
console.dir({name: "Chuong Pham", age: 21});

const username = 'dangchuongpham';      
//Prob: print out user's badge count and JS point
//Solution: Use NodeJS to connect Treehouse's API -> Get profile information -> Print out

//Print message to the console
function printMessage(username, badgeCount, points){
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;

    console.log(message);
}

printMessage('Chuong Pham', 20, 100);
//Connect to API url (https://teamtreehouse.username.json)
function getProfile(username){ 
    https.get(`https://teamtreehouse.com/${username}.json`, res => {
    //Read the data
    res.on('data', data => console.log(`Data: ${data}`))
    //console.dir(res);
     console.log(res.statusCode);
    //Parse the data
    //Print the data
    })
}










