const axios = require("axios");
require("dotenv").config();
const Movies = require("../modules/Movies.modules")

async function moviesHandling(request, response){
    const name = request.query.name;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&query=${name}`
      )
      .then((result) => {
        let movieArr = [];
        result.data.results.map((item) => {
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
          );
        });
        response.send(movieArr);
      });
  }

  module.exports =moviesHandling;