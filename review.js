//require modules
const https = require('https');

const username = 'dangchuongpham';
https.get(`https://teamtreehouse.com/${username}.json`, res=>{
    let body = "";
    
    const printMessage = (username, badges, javascript) => {
        console.log(`${username} has total ${badges} badges and ${javascript} JavaScript points.`);
    }
    
    //Read data in
    res.on('data', data => {
        body += data.toString();            
    })

    //Print data when finish reading
    res.on('end', ()=>{
        //Parse data into object
        const profile = JSON.parse(body);            
        //console.dir(profile);

        //Print out the message
        printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
    })
})

