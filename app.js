const express = require("express");
const https = require("https");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended : true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

})
app.post("/",function(req,res){
  const query = req.body.cityname;
  const apikey = "bc6b51e61609cfdb0a2388be0f5255a4"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(temp);
      res.write("<h1>The temperature of" + query +" is " + temp +" celcius</h1>");
      res.write("<p1>The description is " + description + "</p>");
      res.write("<img src ="+imageURL+">");
      res.send();
    })
  })
})



app.listen(4000, function(){
  console.log("Server 4000 is running");
});
