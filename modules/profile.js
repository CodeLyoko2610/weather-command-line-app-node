const https = require('https');
const http = require('http');

//Import modules
const printError = require('./printError');
const printMess = require('./printMess');

const getProfile = (username)=>{
    //Handling exceptions (e.g invalid urls - does not fit node specification)
    try {
        const req = https.get(`https://teamtreehouse.com/${username}.json`, res => {
            //Handling status code errors
            if(res.statusCode === 200){
                let body = "";

                res.on('data', data => {
                    body += data;
                });

                res.on('end', ()=>{
                    //Handling errors from not able to parse the response from API
                    try {
                        let profile = JSON.parse(body);
                        const {name, badges, points} = profile;
                        printMess.print(name, badges.length, points.JavaScript);                    
                    } catch (error) {                    
                        printError.print(error);
                    }                               
                });
            } else{
                let err = `Cannot get profile for ${username} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;
                printError.print(err);                
            }
        }
    );

        //Handling error with the Request / Emitted errors (e.g false url)
        req.on('error', error=>{            
            printError.print(error);
        });
    } catch (error) {        
        printError.print(error);
    }
}

module.exports.get = getProfile;