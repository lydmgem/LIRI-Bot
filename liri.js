require("dotenv").config();

// Load required Node Modules
var spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs'); // file system
var moment = require('moment');

// Load Spotify keys
var keys = require('./keys.js');

// Command line arguments
var cmd = process.argv;

// LIRI command & param
var action = cmd[2];
var parameter = cmd[3];

// Creating an empty variable to hold user input for each module
var bandSearch = "";
var spotifySearch = "";
var movieSearch = "";

// OMDb Search
for (var i = 2; i <cmd.length; i++) {
    if (i > 2 && i < cmd.length) {
        movieSearch = movieSearch + "+" + cmd[i];
    }
    else {
        movieSearch += cmd[i];
    }
}
// Request with axios to the OMDB API with the movie specified
function getOMDB() {

var omdbUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
console.log(omdbUrl);

axios.get(omdbUrl).then(
    function(response, error) {
        // console.log(response);

        if (!error) {
        console.log("\r\n\r\n");
        
        console.log(
            "Year: " + response.data.Year +
            "\nIMDB Rating: " + response.data.Ratings[0].Value +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nProduction Location: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors: " + response.data.Actors
            );
        console.log("\r\n\r\n");
        }
        else {
            console.log("Errors occurred: " + error);
        }   
    }
)}
getOMDB();
