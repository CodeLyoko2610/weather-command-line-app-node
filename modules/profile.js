const https = require('https');
const http = require('http');

const printError = require('./printError');
//import {printError} from './printError';


const getProfile = (username)=>{
//function getProfile(username){ 
    //Handling exceptions (e.g invalid urls - does not fit node specification)
    try {
        const req = https.get(`https://teamtreehouse.com/${username}.json`, res => {
            //Handling status code errors
            if(res.statusCode === 200){
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
                    console.error(error.message);                
                    //printError(error);
                }                               
            });
        } else{
            let err = `Cannot get profile for ${username} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;
            //printError(err);
            console.error(err);
        }
    });

        //Handling error with the Request / Emitted errors (e.g false url)
        req.on('error', error=>{
            console.error(`Error with the request: ${error.message}`);
            //printError(error);
        });
    } catch (error) {
        console.error(error.message);
        //printError(error);
    }
}

module.exports.get = getProfile;