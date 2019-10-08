const https = require('https');
const http = require('http');
const querystring = require('querystring');

//import modules
const keys = require('../api');
const printMess = require('./printMess');
const printError = require('./printError');


const get = (query) =>{    
    try {            
        const parameters = {
            appid: keys.APIKEY,
            units: 'metric'
        };

        let zipCode = parseInt(query);
        if(!isNaN(zipCode)){
            parameters.zip = zipCode;
        } else{
            parameters.q = query;
        }
        
        const req = https.get(`https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`, res=>{  
            if(res.statusCode === 200){
                let body = "";
                
                res.on('data', data=>{
                    body += data.toString();
                });

                res.on('end', ()=>{
                    let result = JSON.parse(body);
                    printMess.print(result);                       
                });
            }else{
                let error = `Cannot get weather status for ${query}. Error ${res.statusCode} - ${http.STATUS_CODES[res.statusCode]}.`
                printError.print(error);
            }     
        })
    
        req.on('error', error=>{
            printError.print(error);
        });           
    } catch (error) {
        printError.print(error);
    }
}

module.exports.get = get;