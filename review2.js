//Require modules
const https = require('https');
const http = require('http');

//Functions
const printError = err => {
    if(err.message){
        console.error(`Errors happen: ${err.message}`);
    } else {
        console.error(`Errors happen: ${err}`);        
    }
}

function getProfile(username){
    //Handling thrown errors
    try {            
        let body = "";    
        const req = https.get(`https://teamtreehouse.com/${username}.json`, res => {
            //Handling status code errors
            if(res.statusCode === 200){
                //Functions
                const printMessage = (username, badges, jsPoint) => {
                    console.log(`${username} has total ${badges} badge(s) and ${jsPoint} point(s) in JavaScript.`);
                }     

                //Read data in
                res.on('data', data =>{
                    body += data;        
                });

                //Print out data
                res.on('end', ()=>{                
                    let profile = JSON.parse(body);                
                    let {name, badges, points } = profile;
                    printMessage(name, badges.length, points.JavaScript);
                });                        
            } else {
                let err = `Cannot find profile for ${username} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;                            
                printError(err);
            }
        })

        //Handling emitted errors
        req.on('error', error => {
            printError(error.message);
        });
    } catch (error) {
        printError(error.message);
    }
}

//Put arguments into username array
const usernames = process.argv.slice(2);

usernames.forEach(getProfile);

//DONE Generalize error printing with printError function
//Error types
//DONE emmitted errors (e.g false url)
//DONE exception errors (e.g url does not match Node standard)
//DONE status code errors (e.g profile not found)