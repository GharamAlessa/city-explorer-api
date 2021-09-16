// Declared virables
const express = require("express");
require("dotenv").config();
const server = express();
const cors = require("cors");
const PORT = process.env.PORT;
server.use(cors());
const DATA = require("./data/weather.json");
const axios = require("axios");
const testHandling = require("./controllers/test.controller")
const moviesHandling = require("./controllers/movvies.controller")
const weatherHandling = require("./controllers/weather.controller")
////////////////////////////////////////////////////
// ROUTINGS

//http://localhost:3010/test
server.get("/test", testHandling);



//http://localhost:3010/movies?name=amman
server.get("/movies", moviesHandling) ;



// server.get("route",function)
//http://localhost:3010/weather?lat=323123&lon=123214
server.get("/weather", weatherHandling); 







// The server listens here
server.listen(PORT, () => {
  console.log(`Im listening on port : ${PORT}`);
});
