
const https = require('https');
const http = require('http');


//Functions
const printMessage = (username, badgeNumb, jsPoint) =>{
    console.log(`${username} has in total ${badgeNumb} badge(s) and ${jsPoint} point(s) in JavaScript.`);
}
const printError = (err)=>{
    if(err.message) console.error(`Errors here: ${err.message}`);
    else{
        console.error(`Errors here: ${err}`);
    }
}

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
                    printMessage(name, badges.length, points.JavaScript);                
                })
            } else{
                let errMess = `Cannot get profile for ${username} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;
                printError(errMess);
            }
        })

        req.on('error', err=>{
            printError(err);
        })
    } catch (err) {
        printError(err);
    }
}

let names = process.argv.slice(2);

names.forEach(getProfile);
//Print out data from API [DONE]
//Handle errors [DONE]
//Take params as username
//Create printing functions
//Export to own modules