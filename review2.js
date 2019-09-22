//Require modules
const https = require('https');



function getProfile(username){
        let body = "";    
        https.get(`https://teamtreehouse.com/${username}.json`, res => {
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
    })
}

getProfile("dangchuongpham");
getProfile("chalkers");