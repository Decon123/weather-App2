const request = require("postman-request");

const geoCode = (address,callbackFn)=>{
    const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/+ address +.json?access_token=pk.eyJ1IjoiZGpkZXZlbG9wZXIiLCJhIjoiY2t1aWE1OHNlMHJhbDJwbm04eWp5cThpcyJ9.erAQbcg89Ak9Dsi41dgjVg";

    request({url:geoUrl,json:true},(error,response)=>{
        if(error) {
            //console.log("There is an error connecting to the geolocation serever");
            callbackFn("There is an error connecting to the geolocation serever",undefined);
        }else if(response.body.features.length === 0) {
            //console.log("There is no such loaction found???");
            callbackFn("There is no such loaction found???",undefined);
        }
        else {
            /* const latitude = response.body.features[0].center[1];
            const longtitude = response.body.features[0].center[0];
            console.log(longtitude);
            console.log(latitude); */
            const data = {
                latitude:response.body.features[0].center[1],
                longtitude:response.body.features[0].center[0],
                location:response.body.location
            }
            callbackFn(undefined,data);
        }
    });
}

/* geoCode("Kandy",(error,response)=>{
    console.log(error);
    console.log(response);
}) */

module.exports = geoCode;