// Include dotenv NPM package
require("dotenv").config();

// Include keys for Spotify to run
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Include file system NPM package
var fs = require('fs');

// Load required Node Modules
var axios = require('axios');
var moment = require('moment');

// Command line arguments
var cmd = process.argv;

// LIRI command & param
var action = cmd[2];
var search = cmd.slice(3).join(" ");

// Switch case for each LIRI action, using break to prevent looping through the same action.
function switchCase() {
    switch(action) {
        case 'concert-this':
        getConcert();
        break;

        case 'spotify-this-song':
        getSong();
        break;

        case 'movie-this':
        getMovie();
        break;

        case 'do-what-it-says':
        getReadme();
        break;

        default:                    // Used if there is a missing break
        console.log("Cannot process. Something is missing!");
        break;
    }
};

/*------------------------------------------------LIRI SEARCH FUNCTIONS--------------------------------------------------*/

// Bands in Town Artist Events API - Concert Search
function getConcert() {

    var bandsUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    console.log(bandsUrl);

    axios.get(bandsUrl).then(
        function(response, error) {
        // console.log(response.data);
        console.log((error ? "Errors occurred: " + error : "")); // Using ternary operator to show/hide if there is an error.
            for (show of response.data) {
            // console.log(show);
            var dateTime = show.datetime; 
            var timeConvert = dateTime.split('T');
            var newTime = moment(timeConvert[0]).format("MM/DD/YYYY");

            console.log("***************************************\r\n");
            console.log(
                "Venue: " + (show.venue.name) +
                "\nLocation: " + (show.venue.city) + ", " + (show.venue.region ? show.venue.region + ", " : "") + (show.venue.country) +
                "\nDate: " + newTime + "\n");
             }
        }
    )
};

// Spotify API - Song Search
function getSong() {
    // Check to see if search field is empty, if so, it will default to search for The Sign by Ace of Base
    search = !search ? 'The Sign - Ace of Base' : search;

    // Run the API request from Spotify
    spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
        console.log(err ? 'Errors occurred: ' + err : "");

        console.log("***************************************\r\n\r\n");
        console.log(
            "Artist: " + (data.tracks.items[0].artists[0].name) +
            "\nSong Title: " + (data.tracks.items[0].name) +
            "\nPreview: " + (data.tracks.items[0].preview_url) +
            "\nAlbum: " + (data.tracks.items[0].album.name));
        console.log("\r\n\r\n***************************************");
    })
};

// OMDB API - Movie Search
function getMovie() {
    // console.log(omdbUrl);
        // Check to see if search field is empty, if so, it will default to search for movie "Mr. Nobody"
        search = !search ? 'Mr. Nobody' : search;

    var omdbUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    axios.get(omdbUrl).then(
    function(res, err) {
        // console.log(res);
        console.log(err ? 'Errors occurred: ' + err : "");

            console.log("***************************************\r\n\r\n");
            console.log(
                "Title: " + res.data.Title +
                "\nYear: " + res.data.Year +
                "\nIMDB Rating: " + res.data.Ratings[0].Value +
                "\nRotten Tomatoes Rating: " + res.data.Ratings[1].Value +
                "\nProduction Location: " + res.data.Country +
                "\nLanguage: " + res.data.Language +
                "\nPlot: " + res.data.Plot +
                "\nActors: " + res.data.Actors);        
            console.log("\r\n\r\n***************************************");
        }
    )
};

// Run "ReadMe"
function getReadme() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log("Errors occurred: " + err);
        } else {
            var toDo = data.split(",");
            cmd = toDo[0];
            search = toDo[1];

            if (cmd === "spotify-this-song") {
                getSong(cmd, search);
            }
        }
    })
};
switchCase();