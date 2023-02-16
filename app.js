const express = require("express");
const https = require("https"); // native node module


const app = express();
// application programming interface

app.use(express.urlencoded({exended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
 
});

app.post("/", function (req, res) {
    const query = req.body.cityName; // otetaan CityName input
    const apiKey = "bxxxxxxxxxxxxxxxxxxxxx9de";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    // manipuloidaan URLia 

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data); // turn into JS object
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description; // weatherData.weather is a list :D
            const weatherIcon = weatherData.weather[0].icon; 
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";

            res.write(`<h1>The temperature in ${query} is ${temp} C</h1>`); // cant send too many
            res.write(`<p>The weather is currently ${weatherDesc}<p>`); // can sen as many res.write(); as i want
            res.write("<img src = " + imageUrl + ">"); // creat corresponding image

        });
    }); 
})


app.listen(3000, function () {
    console.log("Server run");
});

