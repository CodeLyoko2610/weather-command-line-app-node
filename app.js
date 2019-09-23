const https = require('https');

const printError = (err)=>{
    console.error(err.message);
}

const getProfile = (username)=>{
//function getProfile(username){ 
    //Handling exceptions (e.g invalid urls - does not fit node specification)
    try {
        const req = https.get(`https://teamtreehouse.com/${username}.json`, res => {
            let body = "";

            //Functions
            const printMessage = (name, badgesNumb, jsPoints) => {
                console.log(`${name} has total ${badgesNumb} badge(s) and ${jsPoints} point(s) in JavaScript.`);
            };

            res.on('data', data => {
                body += data;
            });

            res.on('end', ()=>{
                //Handling errors from not able to parse the response from API
                try {
                    let profile = JSON.parse(body);
                    const {name, badges, points} = profile;
                    printMessage(name, badges.length, points.JavaScript);                    
                } catch (error) {
                    //console.error(error.message);                
                    printError(error);
                }                               
            });
        });

        //Handling error with the Request / Emitted errors (e.g false url)
        req.on('error', error=>{
            //console.error(`Error with the request: ${error.message}`);
            printError(error);
        });
    } catch (error) {
        //console.error(error.message);
        printError(error);
    }
}

 //Set users as arguments and put to an array
 const users = process.argv.slice(2);

 users.forEach(getProfile);

