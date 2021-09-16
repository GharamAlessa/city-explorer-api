
const axios = require("axios");
require("dotenv").config();
const Forecast= require("../modules/Forcast.modules")


function weatherHandling (request, response){
  const lat = request.query.lat;
  const lon = request.query.lon;
  //    const searchQuery = request.query.q
  axios
    .get(
      `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
    )
    .then((result) => {
      let finalArr = [];
      result.data.data.map((item) => {
        finalArr.push(
          new Forecast(
            item.datetime,
            item.low_temp,
            item.max_temp,
            item.weather.description
          )
        );
      });
      response.send(finalArr);
    })
    .catch((error) => {
      response.send(error);
    });
}
module.exports=weatherHandling;