const https = require('https');
const http = require('http');

//Import modules
const printError2 = require('./printError2');
const printMess2 = require('./printMess2');


const getProfile = (username)=>{
    try {            
        const req = https.get(`https://teamtreehouse.com/${username}.json`, res=>{
            if(res.statusCode === 200){
                let body = "";        

                res.on('data', data=>{
                    body += data.toString();                  
                })
                
                res.on('end', ()=>{
                    let profile = JSON.parse(body);
                    let {name, badges, points} = profile;
                    printMess2.print(name, badges.length, points.JavaScript);                
                })
            } else{
                let errMess = `Cannot get profile for ${username} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;                
                printError2.print(errMess);
            }
        })

        req.on('error', err=>{
            printError2.print(err);
        })
    } catch (err) {
        printError2.print(err);
    }
}

module.exports.getProfile = getProfile;