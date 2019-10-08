print = (weatherObj) =>{
    let mess = `Weather for ${weatherObj.name} (${weatherObj.sys.country}): \n`;
    mess += `${weatherObj.weather[0].main}, ${weatherObj.weather[0].description} \n`;
    mess += `Current temperature: ${weatherObj.main.temp} oC \n`;
    mess += `Humidity: ${weatherObj.main.humidity} \n`;
    mess += `\n--------------------------------\n`;

    console.log(mess);
}

module.exports.print = print;