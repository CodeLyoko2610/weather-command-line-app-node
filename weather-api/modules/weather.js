const https = require('https');
const http = require('http');
const keys = require('../api.json');
const querystring = require('querystring');

//Require modules
const printMess = require('./printMess');
const printError = require('./printError');

const get = (query) => {
    const parameters = {
        appid: keys.APIKEY,
        units: 'metrics',
    }
    
    //Handle param
    let zipCode = parseInt(query);
    if(!isNaN(zipCode)){
        parameters.zip = zipCode;
    } else{
        parameters.q = query;
    }

    try {
        const req = https.get(`https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`, res =>{                            
            if(res.statusCode === 200){
                let body = "";
                res.on('data', data=>{
                    body += data;
                })

                res.on('end', ()=>{                
                    let weatherObj = JSON.parse(body);                
                    printMess.print(weatherObj);                
                })            
            } else{
                let errMess = `Cannot get weather status for ${query} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]}).`;
                printError.print(errMess);
            }
        })

        req.on('error', err=>{
            printError.print(err);
        })
    } catch (err) {
        printError.print(err);
    }
}

module.exports.get = get;