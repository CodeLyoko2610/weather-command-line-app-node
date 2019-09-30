const https = require('https');
const http = require('http');

//import modules
const keys = require('../api');
const printMess = require('./printMess');
const printError = require('./printError');


const get = (city) =>{    
    try {            
        const req = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.APIKEY}`, res=>{  
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
                let error = `Cannot get weather status for ${city}. Error ${res.statusCode} - ${http.STATUS_CODES[res.statusCode]}.`
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