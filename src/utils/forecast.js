const request = require("postman-request");

const foreCast = (latitude,longitude,callback)=>{
    const weatherUrl = "http://api.weatherstack.com/current?access_key=928a604782f5b1b3469b6c6076296023&query=" + latitude + "," + longitude;

    request({url:weatherUrl,json:true},(error,response)=>{
        const weather = response.body; 
        if(error) {
            callback("There is an error connecting to weather server??",undefined);
        }else if(response.body.error) {
            callback("Invalid location.Please give the correct the searching???",undefined);
        }else {
            const temperature = weather.current.temperature;
            const report = "It is cuurently " + temperature + " degrees!!";
            callback(undefined,report);
        }
    });
}

module.exports = foreCast;