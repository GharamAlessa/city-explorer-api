const express = require("express");
require("dotenv").config();
const server = express();
const cors = require("cors");
const PORT = process.env.PORT;
server.use(cors());
const DATA = require("./data/weather.json");
const axios = require("axios");

server.get("/test", (request, response) => {
  response.send("Hello I am working");
});
server.get('/movies',async (request,response)=>{
    const name = request.query.name;
   await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&query=${name}`)
    .then((result)=>{
        let movieArr=[];
        result.data.results.map((item)=>{
movieArr.push(
    new Movies(
        item.title,
        item.overview,
        item.vote_average,
        item.vote_count,
        item.poster_path,
        item.release_date,
        item.popularity
    )
)
        })
        response.send(movieArr)
    
    })
  
})
class Movies{
constructor(title,overViwe,avgVotes,total,img,date,pop){
this.title= title;
this.overView=overViwe;
this.avgVotes=avgVotes;
this.total=total;
this.img=`https://image.tmdb.org/t/p/w500${img}`;
this.date=date;
this.pop=pop;
}
}


server.get("/weather", (request, response) => {
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
});

class Forecast {
  constructor(date, low, high, desc) {
    this.date = date;
    this.description = `Low of ${low}, high of ${high} with ${desc} `;
  }
}

server.listen(PORT, () => {
  console.log(`Im listening on port : ${PORT}`);
});
