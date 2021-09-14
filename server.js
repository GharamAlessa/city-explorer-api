const express = require("express")
require("dotenv").config();
const server = express();
const cors = require("cors");
const PORT = process.env.PORT
server.use(cors())
const DATA = require("./data/weather.json")

server.get("/test",(request,response)=>{
response.send("Hello I am working")
})

server.get("/weather",(request,response)=>{
   
   const lat = request.query.lat
   const lon = request.query.lon
   const searchQuery = request.query.q
   let newData = DATA.find(item=>item.city_name.toUpperCase() == searchQuery.toUpperCase())
   if (newData) {
       let finalArr = []
        newData.data.map(item=>{
        finalArr.push(new Forecast(item.datetime,item.low_temp,item.max_temp,item.weather.description))
    })
    response.send(finalArr)
   }else
   response.status(404).send("Results not found")

    })

class Forecast {
    constructor(date,low,high,desc){
        this.date = date
        this.description = `Low of ${low}, high of ${high} with ${desc} `
    }
}

server.listen(PORT,()=>{
    console.log(`Im listening on port : ${PORT}`)
})
