//comodules
const path = require("path")
//npm modules
const express = require("express")
//handle bars
const hbs = require("hbs")
//own modules
const forecast = require("./utils/forecast")
const geoCode = require("./utils/geocode")
//get the express server
const app = express()

//console.log(process.env.PORT);

//const port = process.env.PORT || 3000;
var port = 3000;
if(process.env.PORT) {
    port = process.env.PORT;
}


//set the express server to use hbs engine
app.set("view engine","hbs");

//join a path to the current directory
const publicDirectoryPath = path.join(__dirname,"../public");
//register the views path
const viewsPath = path.join(__dirname,"../templates/views");
//register the partials path
const partialsPath = path.join(__dirname,"../templates/partials")

app.set("views",viewsPath)  //partials
hbs.registerPartials(partialsPath);

//Register the static files path
app.use(express.static(publicDirectoryPath));

const author = "Decon";
//cafekumbuk.com
//cafekumbuk.com/about      //these are called routes 
//cafecumbuk.com/help 

//root url
app.get("/",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:author
    });
})

//about route
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:author
    })
})

//help route
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:author
    })
})

//weather route
app.get("/weather",(req,res)=>{
    /* console.log(req);
    console.log(req.query);
    console.log(req.query.address);
 */
    if(!req.query.address) {
        //console.log("Address is not provided??")
        return res.send({
            error:"You must provide an address"
        })
    }

    geoCode(req.query.address,(error,response)=>{
        if(error) {
            return res.send({
                error:error
            })
        }

        forecast(response.latitude,response.longitude,(error,forecastData)=>{
            if(error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

})


app.get("*",(req,res)=>{
    res.render("404",{
        title:404,
        error:"404 page not found",
        name:author
    })
})

app.listen(port,()=>{
    console.log("Server is runnong on port 3000");
})