import dotenv from "dotenv";
import express from "express";
const { DateTime } = require("luxon");
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';



// configures dotenv to work in your application
dotenv.config();
const app = express();

const client = axios.create({
  baseURL: 'https://v6.vbb.transport.rest',
});

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => { 
  response.status(200).send("Hello World");
}); 

app.get("/bus", async (request, response) => {

  const params = {
    poi: false,
    addresses: false,
    query:'falkensee',
  };
  
  const searchResponse: AxiosResponse = await client.get(`/locations`, { params });
  response.status(200).send(searchResponse.data)
})

app.get("/departures/:stopId", async (request, response) => { 

  const stop = request.params['stopId']

  const searchResponse: AxiosResponse = await client.get(`/stops/${stop}/departures`);
  response.status(200).send(searchResponse.data)
}); 

app.get("/journey/:fromId/:toId", async (request, response) => { 

  const params = {
    from: request.params['fromId'],
    to: request.params['toId'],
    departure: 'now',
    results: 1
  };

  const searchResponse: AxiosResponse = await client.get(`/journeys/`, { params });
  
  const origin = searchResponse.data.journeys[0].legs[0].origin.name
  const departure = DateTime.fromISO(searchResponse.data.journeys[0].legs[0].departure).toFormat('HH:mm')
  const destination = searchResponse.data.journeys[0].legs[0].destination.name
  const arrival = DateTime.fromISO(searchResponse.data.journeys[0].legs[0].arrival).toFormat('HH:mm')

  const setoffTimeRaw = DateTime.fromISO(searchResponse.data.journeys[0].legs[0].departure).minus({hours: 0, minutes: 5})
  const setoffTime = setoffTimeRaw.toFormat('HH:mm')
  const now = DateTime.now()

  var shouldLeave = true;

  if (setoffTimeRaw < now) {
    shouldLeave = false;
  }

  response.status(200).send({
    //original: searchResponse.data.journeys[0].legs[0],
    origin: origin,
    departure: departure,
    setoffTime: setoffTime,
    shouldLeave: shouldLeave,
    destination: destination,
    arrival: arrival,
  })
}); 


app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
})