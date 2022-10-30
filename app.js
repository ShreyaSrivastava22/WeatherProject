const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname +"/index.html");

});


app.post("/",function(req,res){

  const query = req.body.cityName;
    const apiKey = "2ac110b350732270837e496c0ca07fef";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid="+apiKey+"&units="+units;
    https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const desc = weatherData.weather[0].description;
        const location = weatherData.name;
        const icon = weatherData.weather[0].icon;
        const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently "+ weatherDescription +"<p>");
      res.write("<h1>The Temperature in "+ location + " is "+ temp +" degrees</h1>");
      res.write("<img src=" + imageURL +">");
        res.send();

        //res.send("<h1>The Temperature in the "+ location + " is "+ temp +" degrees</h1>");

      });
    });


});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
